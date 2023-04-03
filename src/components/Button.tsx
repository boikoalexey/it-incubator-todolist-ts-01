import React from 'react';

type ButtonType = {
    name: string;
    callBack: () => void
}

const Button = (props: ButtonType) => {
    return (
        <div style={{display: "inline"}}>
            <button onClick={props.callBack}>{props.name}</button>
        </div>
    );
};

export default Button;