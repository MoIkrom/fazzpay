import React, { useEffect, useState } from "react";
import styles from "../../styles/profile/personal-info.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import Layout from "../../components/layout/Layout";
import Header from "../../components/header/index";
import Sidebar from "../../components/sidebar/index";
import Footer from "../../components/footer/index";

function personalInformation() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`https://fazzpay-rose.vercel.app/user/profile/${user_id}`, {
        firstName,
        lastName,
        phoneNumber,
        email,
      })
      .then((response) => {
        // setfirstName: response.data.data.firstName;
        // lastName: response.data.data.lastName;
        // const lastName = ;
        setFirstName(response.data.data.firstName);
        setLastName(response.data.data.lastName);
        setPhoneNumber(response.data.data.noTelp);
        setImage(response.data.data.image);
        setEmail(response.data.data.email);
        console.log(response.data.data);
        // console.log(user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Layout title="Profile-Personal-Information" />
      <Header />
      <div className="container d-flex">
        <Sidebar />
        <div className={`container ${styles["cont-right"]} `}>
          <div className={`card d-flex  ${styles["cards"]}`}>
            <div className="container p-4">
              <div className={`${styles["person"]}`}>
                <p className={`mb-0 ${styles["desc"]}`}>Personal Information</p>
                <p className={` ${styles["desc-1"]}`}>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
              </div>
              <div className={`${styles["cont-card"]}`}>
                <div className="rounded shadow-sm p-3 mb-2 ">
                  <p className={` ${styles["title"]}`}>First Name</p>
                  <p className={`mb-0 ${styles["desc"]} `}>{firstName}</p>
                </div>
                <div className="rounded shadow-sm p-3 mb-2 ">
                  <p className={` ${styles["title"]}`}>Last Name</p>
                  <p className={`mb-0 ${styles["desc"]} `}>{lastName}</p>
                </div>
                <div className="rounded shadow-sm p-3 mb-2 ">
                  <p className={` ${styles["title"]}`}>Verified E-mail</p>
                  <p className={`mb-0 ${styles["desc"]} `}>{email}</p>
                </div>
                <div className={`rounded shadow-sm p-3 mb-2 d-flex ${styles["cont-manage"]}`}>
                  <div>
                    <p className={` ${styles["title"]}`}>Phone Number </p>
                    <p className={`mb-0 ${styles["desc"]} `}>{phoneNumber}</p>
                  </div>
                  <p className={`mb-0 ${styles["manage"]} ${styles["cursor"]}`} onClick={() => router.push("/profile/update-phone-number")}>
                    Manage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default personalInformation;
