/// -*- encoding: utf-8 -*-
///
/// (c) Joshua Petrin, 2024. All rights reserved.
///
/// File creation date: 13 October 2024
/// File creator: Joshua Petrin


import React from 'react';

const NavBar = ({logo, text}) => {
    return (
        <div className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <img width={300} height={300} src={logo} />
                <span className="main bar content">{text}</span>
            </div>
        </div>
    );
}

export default NavBar;
