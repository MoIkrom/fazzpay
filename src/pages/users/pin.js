import React from "react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../users/pin.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// Import Image
import hp from "../../assets/phone-login.png";

function pin() {
  const router = useRouter();

  const [pin, setPin] = useState("");

  const handlePin = (e) => {
    let valu = e.target.value;

    if (!Number(valu)) {
      return;
    }
    if (valu.length > 1) {
      return;
    }

    setPin(valu);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("id");
    axios
      .patch(`https://fazzpay-rose.vercel.app/user/pin/${user_id}`)
      .then((response) => {
        console.log(response.data.data);

        // localStorage.setItem("token", response.data.data.token);
        // localStorage.setItem("role", response.data.result.data.role);
        toast.success("Set Pin success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => router.push("/home/home"), 3000);
      })
      .catch((err) => {
        toast.error("Pin must be a number", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(err);
      });
  };

  return (
    <Layout title="Set Pin">
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
            <div className={`input-group flex-nowrap gap-3 `}>
              <input type="text" className={`form-control ${styles["border-input"]} ${styles["pin-box"]}`} required="true" onChange={handlePin} />
              <input type="text" className={`form-control ${styles["border-input"]} ${styles["pin-box"]} `} required="true" onChange={handlePin} />
              <input type="text" className={`form-control ${styles["border-input"]} ${styles["pin-box"]} `} required="true" onChange={handlePin} />
              <input type="text" className={`form-control ${styles["border-input"]} ${styles["pin-box"]} `} required="true" onChange={handlePin} />
              <input type="text" className={`form-control ${styles["border-input"]} ${styles["pin-box"]} `} required="true" onChange={handlePin} />
              <input type="text" className={`form-control ${styles["border-input"]} ${styles["pin-box"]} `} required="true" onChange={handlePin} />
            </div>

            {pin === "" ? (
              <button disabled className={` btn ${styles["login-btn-off"]}`}>
                <p className={` ${styles["login-text-disabled"]}`}>Confirm</p>
              </button>
            ) : (
              <button type="submit" className={` btn  ${styles["login-btn"]}`}>
                <p className={` ${styles["login-text"]}`}>Confirm</p>
              </button>
            )}
            {/* <button type="submit" className={` btn  ${styles["login-btn"]}`}>
              <p className={` ${styles["login-text"]}`}>Login</p>
            </button> */}
          </form>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default pin;
