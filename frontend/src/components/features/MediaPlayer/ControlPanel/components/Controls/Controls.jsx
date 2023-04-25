import React from 'react';
import MoveBackButton from "./buttons/MoveBackButton";

const Controls = ({onMoveBack}) => {
    return (
        <div>
            <MoveBackButton callback={onMoveBack}/>
        </div>
    );
};

export default Controls;