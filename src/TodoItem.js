import React, { useContext, useState } from 'react';
import StatusMarker from './StatusMarker.js';
import TodoDates from './TodoDates.js';
import TodoInfo from './TodoInfo.js';
import ProgressList from './ProgressList.js';
import ProgressForm from './ProgressForm';
import { TodoApp } from './App';
import './style.css';
import del from './images/delete.png';
import update from './images/update.jpg';

const TodoItem = ({title, notes, incomeDate, completedDate, progress, id}) => {
    const { handleProgressChange, handleUpdate, handleDelete } = useContext(TodoApp);

    const [isUpdate, setIsUpdate] = useState(false);
    const [newValue, setNewValue] = useState({});

    const handleAddProgress = (newValue) => {
        handleProgressChange(id, parseInt(newValue));
    }

    const handleUpdateClick = () => {
       if(Object.entries(newValue).length !== 0){
         newValue["id"] = id;
         handleUpdate(newValue);
       }
       setIsUpdate(!isUpdate);
    }

    const handleValueUpdate = (content) => {
        if(isUpdate){
            setNewValue(content);
        }
    }

    const handleDeleteClick = () => {
        handleDelete(id);
    }

    return (
        <div className="todoitem">
            <div className="todoitem__main-content">
                <div className="progress">
                    <StatusMarker completedDate={completedDate}
                                  progressList={progress}/>
                    <ProgressForm handleInputProgressValue={handleAddProgress}/>
                </div>
                <div className="todoitem__body">
                    <TodoInfo title={title}
                            notes={notes}
                            isUpdate={isUpdate}
                            onValueUpdate={handleValueUpdate}
                            />
                    <ProgressList content={progress}/>
                </div>
            </div>
            <div className="todoitem__setup">
                <div className="setup-btns">
                    <button onClick={handleUpdateClick}
                            className='setup-btns__btn setup-btns__update'>
                        <img src={update} 
                             alt="Update" 
                             className="btn-img"/>
                    </button>
                    <button onClick={handleDeleteClick}
                            className="setup-btns__btn setub-btns__delete">
                        <img src={del} 
                             alt="Delete" 
                             className="btn-img"/>
                    </button>
                </div>
                <TodoDates incomeDate={incomeDate}
                           completedDate={completedDate}/>
            </div>
        </div>
    );
}
export default TodoItem;