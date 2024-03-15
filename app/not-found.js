import Link from "next/link";
import React from "react";

import classes from "./not-found.module.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Not Found</h1>
      <p>
        <Link className={classes["home-link"]} href="/">
          {" "}
          Go to Home Page -{">"}{" "}
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
