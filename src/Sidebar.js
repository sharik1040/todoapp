import { useContext } from 'react';
import { TodoApp } from './App';
import logoheart from './icons/logoheart.png';
import './style.css';

const Sidebar = () => {
    const { handleCreateClick } = useContext(TodoApp);

    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <div className="logo">
                    <img className="logo__img" src={logoheart} alt="Self Care Logo"/>
                </div>
            </div>
            <div className="sidebar__acion">
                <div className="action-wrapper">
                    <button onClick={handleCreateClick} className="action-wrapper__add-btn">
                        New Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;