const ClockIcon = ({ width = 16, height = 16, className }) => (
  <svg width={width} height={height} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

export default ClockIcon;
