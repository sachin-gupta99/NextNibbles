import Image from "next/image";
import Link from "next/link";
import React from "react";

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-links/nav-link";

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes["container"]}>
        <Link href="/" className={classes["logo"]}>
          <Image
            src={logoImg}
            alt="NextNibbles"
            className={classes["logo-image"]}
            priority
          />
          NextNibbles
        </Link>

        <nav className={classes["navlink-container"]}>
          <ul className={classes["nav-links"]}>
            <li>
              <NavLink href="/meals">Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
