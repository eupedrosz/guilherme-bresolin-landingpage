export type SocialIconType = 'tiktok' | 'youtube' | 'instagram';

export default function SocialIcon({ type }: { type: SocialIconType }) {
  if (type === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3v11.2a4.3 4.3 0 1 1-3.5-4.2" />
      <path d="M14 3c.7 2.8 2.3 4.5 5 5" />
    </svg>
  );
}
