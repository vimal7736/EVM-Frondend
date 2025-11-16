import EventCard from '../EventCard/EventCard';
import Loader from '../../common/Loader/Loader';
import './EventList.css';

const EventList = ({
  events = [],
  loading = false,
  error = null,
  userTimezone,
  onEdit,
}) => {
  if (loading) {
    return (
      <div className="event-list-loading">
        <Loader text="Loading events" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-list-error">
        <p>Error loading events: {error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="event-list-empty flex flex-col items-center gap-md">
        <svg width="57" height="57" viewBox="0 0 64 64" fill="none">
        </svg>

        <div>No events found</div>
      </div>
    );
  }


  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          userTimezone={userTimezone}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default EventList;