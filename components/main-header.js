'use client';  

import Link from "next/link";
import React from "react";

import logoImg from "../assets/logo.png";
import classes from "./main-header.module.css";

const MainHeader = () => {
  return <header className={classes["container"]}>
    <Link href="/" className={classes["logo"]}>
        <img src={logoImg.src} alt="NextNibbles" className={classes["logo-image"]} />
        NextNibbles
    </Link>
    
    <nav className={classes["navlink-container"]}>
      <ul className={classes["nav-links"]}>        
        <li><Link href={"/meals"}>Meals</Link></li>
        <li><Link href={"/community"}>Community</Link></li>
      </ul>
    </nav>
  </header>
};

export default MainHeader;
