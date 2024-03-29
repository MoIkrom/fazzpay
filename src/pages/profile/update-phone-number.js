import React, { useEffect, useState } from "react";
import styles from "../../styles/profile/update-phone-number.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

import Layout from "../../components/layout/Layout";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/Footer/Footer";

function PersonalInformation() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [noTelp, setNoTelp] = useState("");

  const handleNoHp = (e) => {
    setNoTelp(e.target.value);
  };
  const inputNumber = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const user_id = Cookies.get("id");
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`https://fazzpay-rose.vercel.app/user/profile/${user_id}`, {
        firstName,
        lastName,
        phoneNumber,
        email,
      })
      .then((response) => {
        setFirstName(response.data.data.firstName);
        setLastName(response.data.data.lastName);
        setPhoneNumber(response.data.data.noTelp);
        setImage(response.data.data.image);
        setEmail(response.data.data.email);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, firstName, lastName, phoneNumber]);

  const submitNoHp = (e) => {
    e.preventDefault();
    const user_id = Cookies.get("id");
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .patch(`https://fazzpay-rose.vercel.app/user/profile/${user_id}`, {
        noTelp,
      })
      .then((response) => {
        console.log(response);
        toast.success("Change Phone Number Success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => router.replace("/profile"), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Layout title="Profile-Phone-Number" />
      <Header />
      <div className="container d-flex">
        <Sidebar />
        <div className={`container ${styles["cont-right"]} `}>
          <div className={`card d-flex  ${styles["cards"]}`}>
            <div className={`container p-4 ${styles["cont-up"]}`}>
              <div className={`${styles["person"]}`}>
                <p className={`mb-0 ${styles["desc"]}`}>Edit Phone Number</p>
                <p className={` ${styles["desc-1"]}`}>Add at least one phone number for the transfer ID so you can start transfering your money to another user.</p>
              </div>
            </div>
            <div className={`${styles["cont-password"]}`}>
              <form className={`${styles["form"]}`} onSubmit={submitNoHp}>
                <div className="input-group flex-nowrap mb-3">
                  <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                    <i className={`bi bi-telephone ${styles["addon-wrapping"]}`}></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control ${styles["border-input"]} `}
                    required="true"
                    placeholder="Enter your phone number"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    onChange={handleNoHp}
                    onKeyPress={inputNumber}
                    minLength="10"
                    maxLength="13"
                  />
                </div>

                {noTelp === "" ? (
                  <button disabled className={` btn bg-secondary ${styles["login-btn-off"]}`}>
                    <p className={` ${styles["login-text-disabled"]}`}>Phone Number</p>
                  </button>
                ) : (
                  <button type="submit" className={` btn bg-primary ${styles["login-btn"]}`}>
                    <p className={` ${styles["login-text"]}`}>Edit Phone Number</p>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default PersonalInformation;
