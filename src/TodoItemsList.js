import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem.js';
import './style.css';

function TodoItemList({items}){
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setTodos(items);
    },[items])

    const getProgres = (progressList) => {
        let progress = 0;
        progressList.forEach(element => {
            progress+=element.status;
        });
        return progress;
    }

    const handleSortByCompleted = () => {
        let newTodos = [...todos];
        newTodos.sort(function(a, b){
            if(a["completed_date"] !== "" && b["completed_date"] === "") return 1;
            if(a["completed_date"] === "" && b["completed_date"] === "") return -1;
            return 0;
        });
        setTodos(newTodos);
    }

    const handleSortByProgress = () => {
        let newTodos = [...todos];
        newTodos.sort(function(a, b){
            if(getProgres(a.progress) > getProgres(b.progress)) return 1;
            if(getProgres(a.progress) < getProgres(b.progress)) return -1;
            return 0;
        });
        setTodos(newTodos);
    }
    
    return (
        <ul className="todoitemlist">
            <div className="sort-panel">
                <button className="sort-panel__item sort-panel_completed"
                        onClick={handleSortByCompleted}>
                    by completed
                </button>
                <button className="sort-panel__item sort-panel_progress"
                        onClick={handleSortByProgress}>
                    by progress(по убыванию)
                </button>
            </div>
            {   
                todos && todos.map(item => {
                    const {id, title, notes, income_date, completed_date, progress} = item;
                    return (
                    <li key={id}>
                        <TodoItem title={title}
                                notes={notes}
                                incomeDate={income_date}
                                completedDate={completed_date}
                                progress={progress}
                                id={id}/>
                    </li>)
                })
            }
        </ul>
    );
}

export default TodoItemList;