import React from "react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../../styles/users/pin.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import PinInput from "../../components/pinInput";

// Import Image
import hp from "../../assets/phone-login.png";

function pin() {
  const router = useRouter();

  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  const [isCreated, setIsCreated] = useState(false);

  const isAllFormFilled = Object.keys(pin).every((el) => pin[el]);

  const submitHandler = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("id");
    let fullPin = pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
    fullPin = +fullPin;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .patch(`https://fazzpay-rose.vercel.app/user/pin/${user_id}`, {
        pin: fullPin,
      })
      .then((response) => {
        setIsCreated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout title="Set Pin">
      {!isCreated ? (
        <div className="d-flex">
          <div className={` container p-0 col-7 ${styles["cont-main"]}`}>
            <div className={`container ${styles["image-left"]}`}>
              <p className={`${styles["fazzpay"]} ${styles["title"]} `}>FazzPay </p>
              <div className="cont-image">
                <Image className={styles["images"]} src={hp} alt="background" />
                <h2 className={`${styles["fazzpay"]} ${styles["title-desc"]}`}>App that Covering Banking Needs. </h2>

                <p className={`${styles["fazzpay"]} ${styles["desc"]}`}>
                  FazzPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.
                </p>
              </div>
            </div>
          </div>

          <div className={` container bg-white col-5 ${styles["right-cont"]} `}>
            <h2 className={`${styles["fazzpay"]} ${styles["title-form"]}`}>Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h2>
            <p className={`${styles["desc-form"]}`}>Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don’t tell anyone about your FazzPay account password and the PIN.</p>
            <form className={`${styles["form"]} `} onSubmit={submitHandler}>
              <PinInput pin={pin} setPin={setPin} />
              {!isAllFormFilled ? (
                <button disabled className={`  btn ${styles["login-btn-off"]}`}>
                  <p className={` ${styles["login-text-disabled"]}`}>Confirm</p>
                </button>
              ) : (
                <button type="submit" className={`  btn  ${styles["login-btn"]}`}>
                  <p className={` ${styles["login-text"]}`}>Confirm</p>
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="d-flex">
          <div className={` container p-0 col-7 ${styles["cont-main"]}`}>
            <div className={`container ${styles["image-left"]}`}>
              <p className={`${styles["fazzpay"]} ${styles["title"]} `}>FazzPay </p>
              <div className="cont-image">
                <Image className={styles["images"]} src={hp} alt="background" />
                <h2 className={`${styles["fazzpay"]} ${styles["title-desc"]}`}>App that Covering Banking Needs. </h2>

                <p className={`${styles["fazzpay"]} ${styles["desc"]}`}>
                  FazzPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.
                </p>
              </div>
            </div>
          </div>
          <div className={`container ${styles["cont-success-pin"]}`}>
            <div className="w-100 auth-form justify-content-between">
              <div className="text-center text-md-start">
                <i className="bi bi-check-circle-fill fs-1 text-success"></i>
                <h2 className="h4 fw-bold mt-4 mt-md-3 mb-3">Your PIN Is Successfully Created</h2>
                <p className="opacity-75 mb-5">Your PIN is successfully created and you can now access all the features in FazzPay.</p>
              </div>
              <button className="btn btn-primary fw-bold w-100 shadow" onClick={() => router.push("/home")}>
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default pin;
