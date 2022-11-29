import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
import { useRouter } from "next/router";
// import axios from "axios";

// import profile from "../../assets/profile.jpg";

function index(props) {
  const router = useRouter();
  return (
    <div className={`${styles["cursor"]}`}>
      <div className={`card d-flex justify-content-around align-items-center ${styles["cards"]}`}>
        <div className="d-flex">
          <Image src={props.image} alt="/" width={48} height={48} style={{ borderRadius: "8px" }} />
          <div>
            <p className={`${styles["margin"]} ${styles["name"]} mb-0`}>
              {props.firstName} {props.lastName}
            </p>
            <p className={`${styles["margin"]} ${styles["status"]} mb-0`}> {props.status}</p>
          </div>
        </div>
        <p className="mb-0">{props.nominal}</p>
      </div>
    </div>
  );
}
// onClick={() => props.router}

export default index;
