import { TimezoneHelper } from '../../../utils/timezoneHelper';
import './EventLog.css';


const EventLog = ({ logs = [], userTimezone, timezone = 'America/New_York' }) => {
  const getProfilesString = (profiles) => {
    return profiles?.map(p => p.name || p).join(', ') || 'none';
  };

  const isFaultyChange = (change) => {
    const oldValString = String(change.old);
    const newValString = String(change.new);
    return (
      (oldValString === 'null' && newValString === '[object Object]') ||
      (oldValString === '[object Object]' && newValString === 'null')
    );
  };

  const getLogDisplayText = (log) => {
    const timeInTz = TimezoneHelper.format(log.timestamp, timezone, 'MMM DD, YYYY hh:mm A');
    let content = [];
    let isOnlyFaultyLog = true; 

    if (log.changes && Object.keys(log.changes).length > 0) {
        Object.entries(log.changes).forEach(([field, change]) => {
            if (!isFaultyChange(change)) {
                isOnlyFaultyLog = false; 
                let changeText = '';
                if (field === 'profiles') {
                    const newProfiles = getProfilesString(change.new);
                    changeText = `Profiles changed to: ${newProfiles}`;
                } else if (field === 'startDateTime') {
                    changeText = 'Start date/time updated';
                } else if (field === 'endDateTime') {
                    changeText = 'End date/time updated';
                } else {
                    changeText = `${field} changed from ${String(change.old)} to ${String(change.new)}`;
                }
                content.push(changeText);
            }
        });
    } else {
        isOnlyFaultyLog = false; 
        content.push(`${log.action} event.`);
    }

    if (isOnlyFaultyLog && content.length === 0) {
        return { isFaulty: true }; 
    }

    return { 
        time: `${timeInTz}`, 
        change: content.join('; '),
        isFaulty: false 
    };
  };

  
  const processedLogs = logs.map(getLogDisplayText);

  const validLogCount = processedLogs.filter(log => !log.isFaulty).length;

  let finalLogsToDisplay = processedLogs;
  let showNoUpdateYet = false;

  if (validLogCount === 0 && logs.length > 0) {
    showNoUpdateYet = true;
    finalLogsToDisplay = []; 
  } else if (validLogCount > 0) {
    finalLogsToDisplay = processedLogs.filter(log => !log.isFaulty);
  }


  if (logs.length === 0 || (validLogCount === 0 && !showNoUpdateYet)) {
    return (
      <div className="event-log-empty">
        <p>No changes recorded yet</p>
      </div>
    );
  }

  if (showNoUpdateYet) {
     return (
        <div className="event-log-empty">
            <p>No update history yet</p> 
        </div>
    );
  }

  return (
    <div className="event-log">
      <div className="event-log-list">
        {finalLogsToDisplay.map((logData, index) => {
          return (
            <div key={index} className="event-log-item">
              <div className="event-log-time-header">
                <span className="event-log-date-time">{logData.time}</span>
              </div>
              <div className="event-log-content">
                {logData.change}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 

export default EventLog;