const saveToLocalStorage = (content) => {
  const strContent = JSON.stringify(content);
  localStorage.setItem('todos', strContent);
}

export const reducer = (state, action) => {
  if(action.type === "ADD_TODO"){
    const newItems = state.items ? [...state.items, action.payload] : [action.payload];
    saveToLocalStorage(newItems);
    return {
      ...state,
      isModalOpen: true,
      modalContent: "We wish this task will be completed as fast as it possible!",
      items: newItems
    }
  }
  if(action.type === "INCORRECT_INPUT"){
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Please add title and try again."
    }
  }
  if(action.type === "UPDATE_TODO"){
    const {title, notes, id} = action.payload;
    const newItems = state.items.map(item => {
      if(item.id === id){
        return {...item, title, notes}
      }
      return item;
    })
    saveToLocalStorage(newItems);
    return {
      ...state,
      isModalOpen: true,
      modalContent:  `Task with was updated successfully`,
      items: newItems
    }
  }
  if(action.type === "CHANGE_PROGRESS"){
    const progressChangeModalContent = `Progres for task was changed.Keep on.`;
    const {selectedTodo, newProgressValue, currentDate} = action.payload;
    let newItems, isProgressChanged = false;

    let newProgress = selectedTodo.progress && selectedTodo.progress.map(progress_item => {
      if(progress_item.date === currentDate){
        isProgressChanged= true;
        return {...progress_item, "status": newProgressValue}
      }
      return progress_item;
    })

    if(!isProgressChanged){
      newProgress = [...selectedTodo.progress, {
        "id": new Date().getTime().toString(),
        "date": currentDate,
        "status": newProgressValue
      }]
    }

    newItems = state.items.map(item => {
      if(item.id === selectedTodo.id){
        return {...item, progress: newProgress}
      }
      return item;
    })

    saveToLocalStorage(newItems);
    return {
      ...state,
      items: newItems,
      isModalOpen: newProgressValue !== 100 ? true: false,
      modalContent: newProgressValue !== 100 ? progressChangeModalContent : ""
    }
  }
  if(action.type === "TASK_ALREADY_COMPLETED"){
    const {id, title, currentDate} = action.payload;
    let newItems;
    if(currentDate){
      newItems = state.items.map(item => {
        if(item.id === id){
          return {...item, completed_date: currentDate};
        }
        return item;
      });
      saveToLocalStorage(newItems);
    }
    return {
      ...state,
      items: newItems ? newItems : state.items,
      isModalOpen: true,
      modalContent: `Our congratulations.You have completed the task`
    }
  }
  if(action.type === "DELETE_TODO"){
    const {id} = action.payload;
    const newItems = state.items.filter(item => item.id !== id);
    saveToLocalStorage(newItems);
    return {
      ...state,
      items: newItems,
      isModalOpen: true,
      modalContent: "Task was successfully deleted."
    }
  }
  if(action.type === "CLOSE_MODAL"){
    return {
      ...state,
      isModalOpen: false,
      modalContent: ""
    }
  }
}