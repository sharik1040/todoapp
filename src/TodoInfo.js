import React, {useEffect, useState} from 'react';

const TodoInfo = ({title, notes, isUpdate, onValueUpdate}) => {
    const [info, setInfo] = useState({"title": title, "notes": notes});

    const handleValueChange = (value) => {
        const key = Object.keys(value) && Object.keys(value)[0];
        if(key){
            onValueUpdate({...info, [key]: value[key]});
            setInfo({...info, [key]: value[key]});
        }

    }

    return (
        <div className="todoitem-info">
            <TodoInfoItem isUpdate={isUpdate}
                          content={info.title}
                          onValueChange={handleValueChange}
                          name="title"
                          className="todoitem-info__item todoitem-info__title"/>
            <TodoInfoItem isUpdate={isUpdate}
                          content={info.notes}
                          className="todoitem-info__item todoitem-info__note"
                          onValueChange={handleValueChange}
                          name="notes"/>

        </div>
    );
}

const TodoInfoItem = ({className, isUpdate, content, onValueChange, name}) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(content);
    },[content]);

    const handleChange = (newValue) => {
        onValueChange({[name]: newValue});
        setValue(newValue);
    }

    return (
        <div>
            {isUpdate ? <textarea type="text" value={value}
                                           className="todoinfo-item__input"
                                           onChange={(e) => handleChange(e.target.value)} /> : <div className={className}>{content}</div>}
        </div>
    )
}

export default TodoInfo;