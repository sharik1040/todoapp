import React, {useEffect, useState, useContext} from 'react';
import { TodoApp } from './App';

const TodoItemForm = ({item}) => {
    const { handleCreation, handleCreateClick } = useContext(TodoApp);

    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [income_date, setIncomeDate] = useState(new Date().toLocaleDateString());

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreation(title, notes, income_date);
    }

    const handleClose = () => {
        handleCreateClick();
    }

    useEffect(()=>{
        if(item){
            const {title, notes, income_date} = item;
            setTitle(title);
            setNotes(notes);
            setIncomeDate(income_date);
        }
    },[item]);

    return (
        <form onSubmit={handleSubmit}
              className="todoitem-form">
            <div className="todoitem-form__wrapper">
                <div className="todoitem-form__item todoitem-form__input-block">
                    <label htmlFor="title" className="todoitem-form__label">Title:</label>
                    <input type="text" id="title" name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="todoitem-form__input"/>
                </div>
                <div className="todoitem-form__item todoitem-form__input-block">
                    <label htmlFor="notes" className="todoitem-form__label">Notes:</label>
                    <textarea type="text" id="notes" name="notes" multiple
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="todoitem-form__input"/>
                </div>
                <div className="todoitem-form__item todoitem-form__date">
                    <span>Today is </span>
                    <span>{income_date}</span>
                </div>
                <div className="todoitem-form__item todoitem-form__btns">
                    <button type="submit" className="todoitem-form__button">
                        save
                    </button>
                    <button onClick={handleClose} className="todoitem-form__button">
                        close
                    </button>
                </div>
            </div>
        </form>
    )
}

export default TodoItemForm;