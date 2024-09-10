import React from 'react';

const TopBar = ({title}) => {
    return (
        <div className="main bar">
            <span className="main bar content">{title}</span>
        </div>
    );
}

export default TopBar;
