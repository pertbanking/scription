/// -*- encoding: utf-8 -*-
///
/// (c) Joshua Petrin, 2024. All rights reserved.
///
/// File creation date: 13 October 2024
/// File creator: Joshua Petrin

import React from "react";

const NavBar = ({ logo, text }) => {
  return (
    <div className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <img width={100} height={100} src={logo} alt="img" />
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <span className="navbar-item">Home</span>
          <span className="navbar-item">{text}</span>
        </div>
        <div className="navbar-end"></div>
      </div>
    </div>
  );
};

export default NavBar;
