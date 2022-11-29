import React, { useEffect, useState } from "react";

import styles from "../../styles/profile/home.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

import defaultImage from "../../assets//profile.jpg";
import pencil from "../../assets//pencil.png";
import panah from "../../assets//arrow-right.png";

// import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import Header from "../../components/header/index";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/index";

function index() {
  const router = useRouter();

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
        console.log(response.data.data.image);
        // console.log(user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   const imageProfile = `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${image}`;

  return (
    <>
      <Layout title="Profile" />

      <Header />
      <div className="container d-flex">
        <Sidebar />
        <div className={`container ${styles["cont-right"]} `}>
          <div className={`card d-flex justify-content-center align-items-center ${styles["cards"]}`}>
            <Image className={`${styles["profile-picture"]}`} src={defaultImage} alt="/" />
            {/* <Image className={`${styles["profile-picture"]}`} src={imageProfile} alt="/" width={48} height={48} style={{ borderRadius: "8px" }} /> */}
            <div className={`d-flex align-items-center gap-2 ${styles["cursor"]} `}>
              <Image className={`${styles["pencil"]}  ${styles["cursor"]}`} src={pencil} alt="/" />
              <p className="mb-0">Edit</p>
            </div>
            <p className="mb-0">{`${firstName} ${lastName} `} </p>
            <p className={`${styles["No-Hp"]}`}>{phoneNumber} </p>

            <div className={`card d-flex ${styles["card-information"]} ${styles["cursor"]}`} onClick={() => router.push("/profile/personal-information")}>
              <p className={`mb-0 fw-bold ${styles["text"]}`}> Personal Information </p>
              <Image className={`${styles["pencil"]}`} src={panah} alt="/" />
            </div>
            <div className={`card d-flex ${styles["card-information"]} ${styles["cursor"]}`} onClick={() => router.push("/profile/update-password")}>
              <p className={`mb-0 fw-bold ${styles["text"]}`}> Change Password </p>
              <Image className={`${styles["pencil"]}`} src={panah} alt="/" />
            </div>
            <div className={`card fw-bold d-flex ${styles["card-information"]} ${styles["cursor"]}`} onClick={() => router.push("/profile/update-pin")}>
              <p className={`mb-0 fw-bold ${styles["text"]}`}> Change PIN </p>
              <Image className={`${styles["pencil"]}`} src={panah} alt="/" />
            </div>
            <div className={`card fw-bold d-flex ${styles["card-information"]} ${styles["cursor"]}`}>
              <p className={`mb-0 ${styles["text"]}`}> Logout </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default index;
