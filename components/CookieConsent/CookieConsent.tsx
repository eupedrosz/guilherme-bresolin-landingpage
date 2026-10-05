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
    setIsVisible(!hasConsentChoice());

    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('cookie-consent-is-visible', isVisible);

    return () => document.body.classList.remove('cookie-consent-is-visible');
  }, [isVisible]);

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
