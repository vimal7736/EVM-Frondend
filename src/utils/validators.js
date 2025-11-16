export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateMinLength = (value, min) => {
  return value.length >= min;
};

export const validateMaxLength = (value, max) => {
  return value.length <= max;
};

export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return end > start;
};

export const validateFutureDate = (date) => {
  const selectedDate = new Date(date);
  const now = new Date();
  return selectedDate >= now;
};

export const formValidators = {
  
  profile: {
    name: (value) => {
      if (!validateRequired(value)) return 'Name is required';
      if (!validateMinLength(value, 2)) return 'Name must be at least 2 characters';
      if (!validateMaxLength(value, 50)) return 'Name cannot exceed 50 characters';
      return null;
    },
    timezone: (value) => {
      if (!validateRequired(value)) return 'Timezone is required';
      return null;
    },
  },

  event: {
    title: (value) => {
      if (!validateRequired(value)) return 'Title is required';
      if (!validateMinLength(value, 3)) return 'Title must be at least 3 characters';
      if (!validateMaxLength(value, 100)) return 'Title cannot exceed 100 characters';
      return null;
    },
    profiles: (value) => {
      if (!value || value.length === 0) return 'At least one profile must be selected';
      return null;
    },
    timezone: (value) => {
      if (!validateRequired(value)) return 'Timezone is required';
      return null;
    },
    startDateTime: (value) => {
      if (!validateRequired(value)) return 'Start date and time is required';
      return null;
    },
    endDateTime: (value, startDateTime) => {
      if (!validateRequired(value)) return 'End date and time is required';
      if (startDateTime && !validateDateRange(startDateTime, value)) {
        return 'End date/time must be after start date/time';
      }
      return null;
    },
  },
};