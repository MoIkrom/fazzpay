import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
// import axios from "axios";

// import profile from "../../assets/profile.jpg";

function index(props) {
  return (
    <div>
      <div className={`card d-flex justify-content-around align-items-center ${styles["cards"]}`}>
        <Image src={props.image} alt="/" width={48} height={48} style={{ borderRadius: "8px" }} />
        <div>
          <p className={`${styles["margin"]} mb-0`}>
            {props.firstName} {props.lastName}
          </p>
          <p className="mb-0"> {props.status}</p>
        </div>
        <p className="mb-0">{props.nominal}</p>
      </div>
    </div>
  );
}

export default index;
