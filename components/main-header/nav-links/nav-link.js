"use client";

import React from "react";
import classes from "./nav-link.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cx from "classnames";

const NavLink = ({ href, children }) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cx(
        classes["link"],
        classes[`${path.startsWith(href) ? "active" : ""}`]
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
