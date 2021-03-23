import React from 'react';


const Snake = ({snakeDots, pixelstyle}) => {
    return(
        <div>
            {snakeDots.map((dot,i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`,
                }
                return(
                    <div className={pixelstyle} key={i} style={style}></div>
                )
            })}
        </div>
    )
}

export default Snake