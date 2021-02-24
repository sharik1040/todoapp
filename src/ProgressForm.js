import React, { useState } from 'react';
import './style.css';

const ProgressForm = ({handleInputProgressValue}) => {
    const [progress, setProgress] = useState(1);

    const handleInputProgressValueSave = () => {
        if(progress > 0 && progress <= 100){
            handleInputProgressValue(parseInt(progress));
        }else{
            alert("Please type progress in the range [1:100]")
        }
    }

    return (
        <div className="progress-form">
            <div className="progress-form__header">
                <label htmlFor="progress"
                   className="block-title">Type progress:</label>
            </div>
            <div className="progress-form__body">
                <input type="number" id="progress" name="progress" min="1" max="100"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                    className="progress-form__input"/>
                <button onClick={handleInputProgressValueSave}
                        className="progress-form__save-btn">
                        Add
                </button>
            </div>


        </div>
    )
}

export default ProgressForm;