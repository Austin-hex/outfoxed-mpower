const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const HomeIcon = () => (
  <svg {...common}><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></svg>
)
export const TeamIcon = () => (
  <svg {...common}><circle cx="9" cy="8" r="3.2" /><circle cx="17" cy="9.5" r="2.4" /><path d="M3.5 20c.6-3.4 2.8-5.4 5.5-5.4s4.9 2 5.5 5.4" /><path d="M15.5 15.2c2 .3 3.5 2 4 4.8" /></svg>
)
export const GalleryIcon = () => (
  <svg {...common}><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="m4 17 5-5 3.5 3.5L17 11l3.5 3.5" /></svg>
)
export const MarksIcon = () => (
  <svg {...common}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 9h8M8 13h5" /></svg>
)
export const AdminIcon = () => (
  <svg {...common}><path d="M12 3 4.5 6v5.5c0 4.4 3.1 7.4 7.5 9.5 4.4-2.1 7.5-5.1 7.5-9.5V6L12 3Z" /><path d="m9.5 12 1.8 1.8L14.5 10" /></svg>
)
