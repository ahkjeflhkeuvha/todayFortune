import React from 'react';
import {useState} from 'react';

function MyButton(props:{
    defaultColor:string
}) {
    const [color, setColor] = useState(props.defaultColor)

    const changeColor = () => {
        if(color == props.defaultColor) {
            setColor("text-teal-500");
        } else {
            setColor(props.defaultColor);
        }
    }

    return (
        <button className={color} onClick={() => {
            changeColor()
        }}>button</button>
    );
}

export default MyButton