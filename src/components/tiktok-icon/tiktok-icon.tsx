interface Props {
  size?: number;
  className?: string;
}

/** TikTok no está en Lucide: icono propio, relleno con el color del texto. */
export const TikTokIcon = ({ size = 20, className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M16.6 2h-3.4v13.3a2.9 2.9 0 1 1-2.1-2.8V9a6.4 6.4 0 1 0 5.5 6.3V8.6a8 8 0 0 0 4.6 1.5V6.7a4.6 4.6 0 0 1-4.6-4.7Z" />
  </svg>
);
