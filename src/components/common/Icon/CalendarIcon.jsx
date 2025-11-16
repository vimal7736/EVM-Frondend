const CalendarIcon = ({ width = 20, height = 20, className }) => (
  <svg width={width} height={height} viewBox="0 0 20 20" fill="none" className={className}>
    <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1"/>
    <path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export default CalendarIcon;
