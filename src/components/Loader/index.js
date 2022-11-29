import React from "react";
import styles from "../Loader/Loader.module.css";

function index() {
  return (
    <div>
      <div className={`${styles["lds-spinner"]}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default index;
