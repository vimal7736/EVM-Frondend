import dayjs from 'dayjs';

export const formatDate = (date, format = 'MMM DD, YYYY') => {
  return dayjs(date).format(format);
};

export const formatDateTime = (date, format = 'MMM DD, YYYY hh:mm A') => {
  return dayjs(date).format(format);
};

export const formatRelativeTime = (date) => {
  const now = dayjs();
  const target = dayjs(date);
  const diffInDays = now.diff(target, 'day');

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays === -1) return 'Tomorrow';
  if (diffInDays > 1 && diffInDays <= 7) return `${diffInDays} days ago`;
  if (diffInDays < -1 && diffInDays >= -7) return `In ${Math.abs(diffInDays)} days`;
  
  return formatDate(date);
};

export const getTimeAgo = (date) => {
  const now = dayjs();
  const target = dayjs(date);
  
  const seconds = now.diff(target, 'second');
  const minutes = now.diff(target, 'minute');
  const hours = now.diff(target, 'hour');
  const days = now.diff(target, 'day');
  
  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return formatDate(date);
};