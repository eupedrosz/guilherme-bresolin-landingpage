'use client';

import { useEffect, useRef, useState } from 'react';

const CONSENT_COOKIE = 'bresolin_cookie_consent';
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

function hasConsentChoice() {
  return document.cookie
    .split('; ')
    .some((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`));
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1051px)');

    const updateVisibility = () => {
      if (!desktopQuery.matches || hasConsentChoice()) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);
    };

    updateVisibility();
    desktopQuery.addEventListener('change', updateVisibility);

    return () => {
      desktopQuery.removeEventListener('change', updateVisibility);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const saveChoice = (choice: 'accepted' | 'rejected') => {
    const secureAttribute = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${ONE_YEAR_IN_SECONDS}; Path=/; SameSite=Lax${secureAttribute}`;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 320);
  };

  if (!isVisible) return null;

  return (
    <dialog
      open
      className={`cookie-consent${isClosing ? ' cookie-consent--closing' : ''}`}
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      aria-live="polite"
    >
      <div className="cookie-consent__mark" aria-hidden="true">109</div>
      <div className="cookie-consent__copy">
        <strong id="cookie-consent-title">Respeitamos sua privacidade</strong>
        <p id="cookie-consent-description">Usamos um cookie funcional apenas para lembrar esta escolha.</p>
      </div>
      <div className="cookie-consent__actions">
        <button className="cookie-consent__reject" type="button" onClick={() => saveChoice('rejected')}>
          Recusar
        </button>
        <button className="cookie-consent__accept" type="button" onClick={() => saveChoice('accepted')}>
          Aceitar
        </button>
      </div>
    </dialog>
  );
}
