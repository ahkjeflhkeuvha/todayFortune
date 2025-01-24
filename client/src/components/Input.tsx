import React from 'react';
import {useState} from 'react';

function InputField(props:{
    fieldName:string
    value:string
    onChange: (fieldName : string, value: string) => void;
}) {
    const [text, setText] = useState('');

    const onChange = (e : React.ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLButtonElement;
        props.onChange(props.fieldName, target.value);
    }

    return (
        <div className='inputField'>
            <label>{props.fieldName}</label>
            <input id={props.fieldName} value={props.value} onChange={onChange}/>

            <div>
                <b>값 : </b>
                {text}
            </div>
        </div>
    );
}

export default InputField;