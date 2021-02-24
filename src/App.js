import React, { useState, useReducer } from 'react';
import TodoItemsList from './TodoItemsList.js';
import TodoItemForm from './TodoItemForm';
import Modal from './Modal';
import Sidebar from './Sidebar.js';
import {reducer} from './reducer';
import './style.css';

const getTotalProgress = (progressList) => {
    let progress = 0;
    if(progressList){
      progressList.forEach(element => progress+=element.status)
    }
    return progress;
}

const getTotalProgressValueForNow = (progressList) => {
    let now = new Date().toLocaleDateString();
    let progress = 0;
    if(progressList){
      progressList.forEach(element => {
          if(element.date === now){
            progress+=element.status;
          }
      })
    }
    return progress;
}

const defaultState = {
  isModalOpen: false,
  modalContent: "",
  items: JSON.parse(localStorage.getItem("todos"))
}

export const TodoApp = React.createContext();

const App = () => {
  const completedValue = 100;
  const [isCreate, setIsCreate] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleCreateClick = () => {
    setIsCreate(!isCreate);
  }

  const handleCreation = (title, notes, income_date) => {
    if(title){
      setIsCreate(!isCreate);
      const id = new Date().getTime().toString();
      const completed_date = "";
      const progress = [];
      dispatch({type: "ADD_TODO", payload: {id, title, notes, income_date, completed_date, progress}});
    }else{
      dispatch({type: "INCORRECT_INPUT"});
    }
  }

  const handleCloseModal = () => {
    dispatch({type: "CLOSE_MODAL"});
  }

  const handleUpdate = (newValue) => {
    dispatch({type: "UPDATE_TODO", payload: newValue});
  }

  const handleProgressChange = (id, value) => {
    const selectedTodo = state.items.find(item => item.id === id);
    const {title, progress} = selectedTodo;
    const total = getTotalProgress(progress);
    const leftToComplete = completedValue - getTotalProgress(progress);
    const currentProgressValue = getTotalProgressValueForNow(progress);
    const newProgressValue = total + value >= completedValue ? currentProgressValue + leftToComplete 
                                                             : currentProgressValue + value;
    const currentDate = new Date().toLocaleDateString();

    if(total < completedValue){
      dispatch({type: "CHANGE_PROGRESS", payload:{selectedTodo, currentProgressValue, newProgressValue, currentDate}});
      if(total + value >= completedValue){
        dispatch({type: "TASK_ALREADY_COMPLETED", payload:{id, title, currentDate}});
      }
    }else{
      dispatch({type: "TASK_ALREADY_COMPLETED", payload:{title}});
    }
  }

  const handleDelete = (id) => {
    dispatch({type: "DELETE_TODO", payload: {id}})
  }

  return (
    <TodoApp.Provider value={{handleCreation, 
                              handleProgressChange, 
                              handleUpdate, 
                              handleCreateClick,
                              handleDelete}}>
      <div className="app">
        {isCreate && <TodoItemForm />}
        <Sidebar />
        {state.isModalOpen && <Modal content={state.modalContent}
                                      onClose={handleCloseModal}/>}
          <TodoItemsList items={state.items}/>
      </div>
    </TodoApp.Provider>
  );
}

export default App;
