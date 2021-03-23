import React from 'react';

export default (props) =>{

    console.log(props);
    return(
        <div className="snake-food" style={{
            left: `${props.dot[0]}%`,
            top: `${props.dot[1]}%`
        }}>
        </div>
    )
}