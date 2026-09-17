'use client';

import { useEffect, useState } from 'react';

const IN_APP_BROWSER_PATTERN = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|MessengerForiOS|TikTok|BytedanceWebview|musical_ly/i;
const MOBILE_DEVICE_PATTERN = /Android|iPhone|iPad|iPod/i;

function isInAppMobileBrowser() {
  const userAgent = navigator.userAgent;
  const isIPadOS = /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1;

  return (MOBILE_DEVICE_PATTERN.test(userAgent) || isIPadOS) && IN_APP_BROWSER_PATTERN.test(userAgent);
}

export default function InAppBrowserNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    const wasDismissed = window.sessionStorage.getItem('bresolin_in_app_notice_dismissed') === 'true';
    setIsVisible(isInAppMobileBrowser() && !wasDismissed);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('in-app-browser-notice-is-visible', isVisible);

    return () => document.body.classList.remove('in-app-browser-notice-is-visible');
  }, [isVisible]);

  const dismissNotice = () => {
    window.sessionStorage.setItem('bresolin_in_app_notice_dismissed', 'true');
    setIsVisible(false);
  };

  const openInDefaultBrowser = () => {
    const currentUrl = window.location.href;

    if (/Android/i.test(navigator.userAgent)) {
      const destination = `${window.location.host}${window.location.pathname}${window.location.search}${window.location.hash}`;
      window.location.href = `intent://${destination}#Intent;scheme=${window.location.protocol.replace(':', '')};S.browser_fallback_url=${encodeURIComponent(currentUrl)};end`;
      return;
    }

    const externalLink = document.createElement('a');
    externalLink.href = currentUrl;
    externalLink.target = '_blank';
    externalLink.rel = 'noopener noreferrer external';
    externalLink.click();
    setShowIOSHint(true);
  };

  if (!isVisible) return null;

  return (
    <aside className="in-app-browser-notice" aria-labelledby="in-app-browser-title" aria-live="polite">
      <button className="in-app-browser-notice__close" type="button" onClick={dismissNotice} aria-label="Fechar aviso">
        <span aria-hidden="true">×</span>
      </button>

      <div className="in-app-browser-notice__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M14 4h6v6" />
          <path d="m20 4-9 9" />
          <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
        </svg>
      </div>

      <div className="in-app-browser-notice__copy">
        <strong id="in-app-browser-title">Para uma melhor experiência, abra no navegador padrão do seu celular.</strong>
        {showIOSHint ? <p>Se continuar no aplicativo, toque em ••• e escolha “Abrir no navegador”.</p> : null}
      </div>

      <button className="in-app-browser-notice__action" type="button" onClick={openInDefaultBrowser}>
        Abrir agora
      </button>
    </aside>
  );
}
