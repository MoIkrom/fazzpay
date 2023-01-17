/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Image from "next/image";
import styles from "./receiver.module.css";
// import axios from "axios";
import { useRouter } from "next/router";

// import profile from "../../assets/profile.jpg";

function index(props) {
  const router = useRouter();
  const { ed } = router.query;
  const nav1 = () => {
    router.push(`/transfer/${props.id}`);
  };
  console.log(props);
  return (
    <div onClick={nav1}>
      <div className={`card d-flex justify-content-around align-items-center ${styles["cards"]}`}>
        <Image className="col-2" src={props.image} alt="/" width={48} height={48} style={{ borderRadius: "8px" }} />

        <div className="col-5">
          <p className={`${styles["margin"]} mb-0`}>
            {props.firstName} {props.lastName}
          </p>
          <p className="mb-0">{props.noTelp}</p>
        </div>
      </div>
    </div>
  );
}

export default index;
