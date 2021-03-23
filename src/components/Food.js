import React from 'react';

const Food = ({dot,pixelstyle}) => {
    return(
        <div className={pixelstyle} style={{
            left: `${dot[0]}%`,
            top: `${dot[1]}%`
        }}>
        </div>
    )
}

export default Food