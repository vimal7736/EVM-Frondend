import { useState } from 'react';
import Select from '../../common/Select/Select';
import DatePicker from '../../common/DatePicker/DatePicker';
import TimePicker from '../../common/TimePicker/TimePicker';
import Button from '../../common/Button/Button';
import MultiSelectDropdown from '../../common/MultiSelectDropdown/MultiSelectDropdown';
import { TIMEZONES } from '../../../utils/constants';
import { formValidators } from '../../../utils/validators';

import {
  toInputDate,
  toInputTime,
  combineDateTime
} from '../../../utils/timezoneHelper.js';

import { 
  useGetProfilesQuery, 
  useCreateProfileMutation 
} from '../../../features/profiles/profilesApiSlice';
import './EventForm.css';

const EventForm = ({ onSubmit, onCancel, loading = false, initialData = null }) => {
  const { data: profiles = [], isLoading: profilesLoading } = useGetProfilesQuery();
  const [createProfile, { isLoading: creatingProfile }] = useCreateProfileMutation();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    profiles: initialData?.profiles?.map(p => p._id || p) || [],
    timezone: initialData?.timezone || 'America/New_York',
    startDate: initialData ? toInputDate(initialData.startDateTime, initialData.timezone) : '',
    startTime: initialData ? toInputTime(initialData.startDateTime, initialData.timezone) : '09:00',
    endDate: initialData ? toInputDate(initialData.endDateTime, initialData.timezone) : '',
    endTime: initialData ? toInputTime(initialData.endDateTime, initialData.timezone) : '10:00',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleProfileToggle = (profile) => {
    setFormData((prev) => {
      const isSelected = prev.profiles.includes(profile._id);
      return {
        ...prev,
        profiles: isSelected
          ? prev.profiles.filter((id) => id !== profile._id)
          : [...prev.profiles, profile._id],
      };
    });

    if (errors.profiles) {
      setErrors((prev) => ({ ...prev, profiles: null }));
    }
  };

  const handleAddProfile = async (name) => {
    try {
      const result = await createProfile({
        name,
        timezone: formData.timezone || 'America/New_York'
      }).unwrap();
      
      setFormData((prev) => ({
        ...prev,
        profiles: [...prev.profiles, result._id]
      }));
    } catch (error) {
      console.error('Failed to create profile:', error);
      alert('Failed to create profile. Please try again.');
    }
  };

  const validate = () => {
    const newErrors = {};

    const profilesError = formValidators.event.profiles(formData.profiles);
    if (profilesError) newErrors.profiles = profilesError;

    const timezoneError = formValidators.event.timezone(formData.timezone);
    if (timezoneError) newErrors.timezone = timezoneError;

    const startDateError = formValidators.event.startDateTime(formData.startDate);
    if (startDateError) newErrors.startDate = startDateError;

    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';

    if (formData.startDate && formData.startTime && formData.endDate && formData.endTime) {
      const start = combineDateTime(formData.startDate, formData.startTime, formData.timezone);
      const end = combineDateTime(formData.endDate, formData.endTime, formData.timezone);

      if (end <= start) {
        newErrors.endDate = 'End date/time must be after start date/time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const start = combineDateTime(formData.startDate, formData.startTime, formData.timezone);
      const end = combineDateTime(formData.endDate, formData.endTime, formData.timezone);

      onSubmit({
        title: formData.title,
        description: formData.description,
        profiles: formData.profiles,
        timezone: formData.timezone,
        startDateTime: start,
        endDateTime: end,
      });

      if (!initialData) {
      setFormData({
        title: '',
        description: '',
        profiles: [],
        timezone: 'America/New_York',
        startDate: '',
        startTime: '09:00',
        endDate: '',
        endTime: '10:00',
      });

      setErrors({});
    }
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <MultiSelectDropdown
        label="Profiles"
        options={profiles}
        selectedIds={formData.profiles}
        onToggle={handleProfileToggle}
        onAddNew={handleAddProfile}
        placeholder="Select profiles..."
        searchPlaceholder="Search profiles..."
        addNewPlaceholder="Profile name"
        loading={profilesLoading || creatingProfile}
        error={errors.profiles}
        required
      />

      <Select
        label="Timezone"
        name="timezone"
        value={formData.timezone}
        onChange={handleChange}
        options={TIMEZONES}
        error={errors.timezone}
        required
      />

      <div className="event-form-datetime">
        <div className="event-form-datetime-group">
          <label className="event-form-label">Start Date & Time</label>
          <div className="event-form-datetime-inputs">
            <DatePicker
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              error={errors.startDate}
              required
            />
            <TimePicker
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              error={errors.startTime}
              required
            />
          </div>
        </div>

        <div className="event-form-datetime-group">
          <label className="event-form-label">End Date & Time</label>
          <div className="event-form-datetime-inputs">
            <DatePicker
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              error={errors.endDate}
              required
            />
            <TimePicker
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              error={errors.endTime}
              required
            />
          </div>
        </div>
      </div>

      <div className="event-form-actions">
        <Button type="submit" variant="primary" fullWidth loading={loading}>
          {initialData ? 'Update Event' : ' +  Create Event'}
        </Button>
        {initialData && onCancel && (
          <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default EventForm;