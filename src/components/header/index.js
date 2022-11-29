import React, { useState, useEffect } from "react";
import Image from "next/image";
import imageDefault from "../../../public/profile.jpg";
import axios from "axios";
import styles from "./Header.module.css";

import bell from "../../assets/bell.png";

function index() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`https://fazzpay-rose.vercel.app/user/profile/${user_id}`, {
        firstName,
        lastName,
        phoneNumber,
      })
      .then((response) => {
        // setfirstName: response.data.data.firstName;
        // lastName: response.data.data.lastName;
        // const lastName = ;
        setFirstName(response.data.data.firstName);
        setLastName(response.data.data.lastName);
        setPhoneNumber(response.data.data.noTelp);
        setImage(response.data.data.image);
        // console.log(response.data.data);
        // console.log(user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container-fluid bg-white  shadow py-2 fixed-top">
        <div className="container-lg d-flex align-items-center position-relative">
          <h1 className={`${styles["title"]}`}>FazzPay</h1>
          <div className="d-flex align-items-center flex-grow-1 flex-md-grow-0">
            <div className={`d-flex align-items-center me-auto ${styles["icon-user"]}`}>
              <div className="profile-picture me-3">
                <Image src={setImage === null ? setImage : imageDefault} alt="profile picture" width={48} height={48} style={{ borderRadius: "8px" }} objectFit="cover" />
                {/* <div className="profile-picture me-3">
              <Image src={image ? process.env.URL_CLOUDINARY + image : imageDefault} alt="profile picture" width={48} height={48} style={{ borderRadius: "8px" }} objectFit="cover" /> */}
              </div>
            </div>
            <div className="me-2">
              <p className={`fs-6 fw-bold m-0 ${styles["name"]}`}>{`${firstName} ${lastName}`}</p>
              <p className="fs-7 m-0">{phoneNumber}</p>
            </div>
            <Image src={bell} Alt="/" />
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
