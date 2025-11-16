import { useState } from 'react';
import { TimezoneHelper } from '../../../utils/timezoneHelper';
import { useGetEventLogsQuery } from '../../../features/events/eventsApiSlice';
import Modal from '../../common/Modal/Modal';
import EventLog from '../EventLog/EventLog';

import './EventCard.css';

import ClockIcon from '../../common/Icon/ClockIcon';
import CalendarIcon from '../../common/Icon/CalendarIcon';
import EditIcon from '../../common/Icon/EditIcon';
import LogsIcon from '../../common/Icon/LogsIcon';
import ProfileIcon from '../../common/Icon/ProfileIcon';




const EventCard = ({ event, userTimezone, onEdit }) => {
    const [showLogs, setShowLogs] = useState(false);

    const { data: logs = [] } = useGetEventLogsQuery(
        { eventId: event._id, userTimezone },
        { skip: !showLogs }
    );

    console.log(logs,"looooa");
    

    const profileNames = event.profiles?.map(p => p.name || 'Unknown').join(', ') || 'No profiles';

    const formatDate = (date) => {
        return TimezoneHelper.format(date, userTimezone, 'MMM DD, YYYY');
    };

    const formatTime = (date) => {
        return TimezoneHelper.format(date, userTimezone, 'hh:mm A');
    };

    const formatFullDateTime = (date) => {
        return TimezoneHelper.format(date, userTimezone, 'MMM DD, YYYY [at] hh:mm A');
    };

    return (
        <>
            <div className="event-card-new">
                <div className="event-profiles-row">
                    <ProfileIcon />
                    <span className="profile-names">{profileNames}</span>
                </div>

                <div className="event-datetime-row">
                    <CalendarIcon />
                    <div className="datetime-content">
                        <span className="datetime-label">Start: {formatDate(event.startDateTime)}</span>
                        <div className="time-row">
                            <ClockIcon />
                            <span className="time-value">{formatTime(event.startDateTime)}</span>
                        </div>
                    </div>
                </div>

                <div className="event-datetime-row">
                    <CalendarIcon width={20} height={20} />
                    <div className="datetime-content">
                        <span className="datetime-label">End: {formatDate(event.endDateTime)}</span>
                        <div className="time-row">
                            <ClockIcon width={16} height={16} />
                            <span className="time-value">{formatTime(event.endDateTime)}</span>
                        </div>
                    </div>
                </div>


                <div className="event-metadata">
                    <div className="metadata-line">
                        <span className="metadata-label">Created:</span>
                        <span className="metadata-value">{formatFullDateTime(event.createdAt)}</span>
                    </div>
                    <div className="metadata-line">
                        <span className="metadata-label">Updated:</span>
                        <span className="metadata-value">{formatFullDateTime(event.updatedAt)}</span>
                    </div>
                </div>

                <div className="event-actions">
                    <button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(event)}
                    >
                        <EditIcon />
                        Edit
                    </button>
                    <button
                        className="action-btn logs-btn"
                        onClick={() => setShowLogs(true)}
                    >
                        <LogsIcon />
                        View Logs
                    </button>
                </div>
            </div>

            <Modal
                isOpen={showLogs}
                onClose={() => setShowLogs(false)}
                title="Event Update History"
                size="medium"
            >
                <EventLog logs={logs} userTimezone={userTimezone} />
            </Modal>
        </>
    );
};

export default EventCard;