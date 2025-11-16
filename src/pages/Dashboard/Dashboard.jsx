import { useState } from 'react';
import {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation
} from '../../features/events/eventsApiSlice';
import Header from '../../components/layout/Header/Header';
import EventForm from '../../components/event/EventForm/EventForm';
import EventList from '../../components/event/EventList/EventList';
import Select from '../../components/common/Select/Select';
import Modal from '../../components/common/Modal/Modal';
import { TIMEZONES } from '../../utils/constants';

import './Dashboard.css';
import Toast from '../../components/common/Toast/Toast';

const Dashboard = () => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [viewTimezone, setViewTimezone] = useState('America/New_York');
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });


  const { data: events = [], isLoading: eventsLoading } = useGetEventsQuery();
  const [createEvent, { isLoading: creatingEvent }] = useCreateEventMutation();
  const [updateEvent, { isLoading: updatingEvent }] = useUpdateEventMutation();



  const handleProfileChange = (profile) => {
    setCurrentProfile(profile);
    setViewTimezone(profile.timezone);
  };



  const handleCreateEvent = async (data) => {
    try {
      await createEvent(data).unwrap();
      showToast("Event created successfully!", "success");
    } catch (error) {
      showToast("Failed to create event", "error");
    }
  };


  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEditModal(true);
  };



  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingEvent(null);
  };


  const handleUpdateEvent = async (data) => {
    try {
      await updateEvent({
        id: editingEvent._id,
        ...data,
        userTimezone: viewTimezone
      }).unwrap();
      setShowEditModal(false);
      setEditingEvent(null);
      showToast("Event updated!", "success");
    } catch (error) {
      showToast("Update failed", "error");
    }
  };



  const filteredEvents = currentProfile
    ? events.filter(event =>
      event.profiles.some(p => (p._id || p) === currentProfile._id)
    )
    : events;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };


  return (
    <div className="dashboard-page">
      <Header
        currentProfile={currentProfile}
        onProfileChange={handleProfileChange}
      />

      <div className="dashboard-container">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2 className="card-heading">Create Event</h2>
            <EventForm
              onSubmit={handleCreateEvent}
              loading={creatingEvent}
            />
          </div>

          <div className="dashboard-card">
            <div className="events-header">
              <h2 className="card-heading">Events</h2>
              <div className="timezone-selector">
                <label>View in Timezone</label>
                <Select
                  value={viewTimezone}
                  onChange={(e) => setViewTimezone(e.target.value)}
                  options={TIMEZONES}
                />
              </div>
            </div>

            <EventList
              events={filteredEvents}
              loading={eventsLoading}
              userTimezone={viewTimezone}
              onEdit={handleEditEvent}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={showEditModal}
        onClose={handleCancelEdit}
        title="Edit Event"
        size="medium"
      >
        <EventForm
          onSubmit={handleUpdateEvent}
          onCancel={handleCancelEdit}
          loading={updatingEvent}
          initialData={editingEvent}
        />
      </Modal>



      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
      
    </div>

  );
};

export default Dashboard;
