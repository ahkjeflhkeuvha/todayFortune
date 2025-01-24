import React from 'react';
import {useState} from 'react';
import Input from './Input.tsx';
import axios from 'axios';

function InputForm({})
{
    const fields = ["name", "birthday", "time"]
    const [formData, setFormData] = useState({
        name : '',
        birthday : '',
        time : ''
    });

    const onChange = (fieldName : string, value : string) => {
        setFormData({
            ...formData,
            [fieldName] : value,
        })
    }

    const onSubmit = (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios.post('http://localhost:3000/test', {
            name : formData.name,
            birthday : formData.birthday,
            time : formData.time
        })
        .then(res => {
            console.log(res)
        })
        console.log(formData)
    };

    return (
        <form onSubmit={onSubmit}>
            {fields.map((field, i) => 
            <Input key={i} fieldName={field} value={formData[field]} onChange={onChange}/>
            )}

            <button type='submit'>button</button>
        </form>
    )
}

export default InputForm;