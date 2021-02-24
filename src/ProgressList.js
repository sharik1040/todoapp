import './style.css';

const ProgressList = ({content}) => {
    const isProgress = content ? true : false;
    const progressListClassName = isProgress ? "progress-list" : "progress-list--hidden";
    const progressHeader = content.length !== 0 ? "Progress:" : "No progress";
    const progressBody = content.map(item =>
        <ProgressItem date={item.date}
                      status={item.status}
                      key={item.id}/>
    );
    
    return (
        <div className={progressListClassName}>
            <div className="progress-list__header">{progressHeader}</div>
            <div className="progress-list__body">
                {progressBody}
            </div>
        </div>
    );
}

const ProgressItem = ({date, status}) => {
    return (
        <div className="progress-item">
            <span className="progress-item__date">{date}</span>
            <span className="progress-item__delimeter">-</span>
            <span className="progress-item__value">{status}%</span>
        </div>
    );
}

export default ProgressList;