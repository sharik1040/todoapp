import './style.css';

const TodoDates = ({incomeDate, completedDate}) => {
    return (
        <div className="tododates">
            <DateInfo title="Income:"
                      date={incomeDate}/>
            <DateInfo title="Complete:"
                      date={completedDate}/>
        </div>
    );
}

const DateInfo = ({title, date}) => {
    return (
        <div className="date-info">
            <div className="block-title">{title}</div>
            <div>{date}</div>
        </div>
    );
}

export default TodoDates;