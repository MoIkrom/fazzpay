import React from "react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../../styles/users/forgotPassword.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// Import Image
import hp from "../../assets/phone-login.png";

function newPassword() {
  const router = useRouter();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [keysChangePassword, setKeysChangePassword] = useState("");
  const [isPwdshown, setIsPwdShown] = useState(false);

  const togglePassword = () => {
    setIsPwdShown(!isPwdshown);
  };

  const handleOTP = (e) => {
    setKeysChangePassword(e.target.value);
  };
  const handlePassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .patch(`https://fazzpay-rose.vercel.app/auth/reset-password`, {
        newPassword,
        confirmPassword,
        keysChangePassword,
      })
      .then((response) => {
        console.log;
        toast.success("Reset Password success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => router.push("/users/login"), 3000);
      })
      .catch((err) => {
        toast.error("Confirm password is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(err);
      });
  };

  return (
    <Layout title="Forgot Password">
      <div className={`d-flex ${styles["cont-left"]}`}>
        <div className={` container p-0 col-lg-7 ${styles["cont-main"]}`}>
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
          <h2 className={`${styles["fazzpay"]} ${styles["title-form"]}`}>Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</h2>
          <p className={`${styles["desc-form"]}`}>Now you can create a new password for your FazzPay account. Type your password twice so we can confirm your new passsword.</p>
          <form className={`${styles["form"]}`} onSubmit={submitHandler}>
            <div className=" input-group flex-nowrap mb-3">
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                <i class="bi bi-123"></i>
              </span>
              <input type="text" className={`form-control ${styles["border-input"]} `} placeholder="Input OTP Here" onChange={handleOTP} />
            </div>
            <div className=" input-group flex-nowrap mb-3">
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                <i class="bi bi-lock"></i>
              </span>
              <input type={isPwdshown ? "text" : "password"} className={`form-control ${styles["border-input"]} `} placeholder="Confirm new password" onChange={handlePassword} />
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                {isPwdshown ? <i className={` bi bi-eye ${styles["cursor"]}`} onClick={togglePassword}></i> : <i className={` bi bi-eye-slash ${styles["cursor"]}`} onClick={togglePassword}></i>}
              </span>
            </div>
            <div className=" input-group flex-nowrap mb-3">
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                <i class="bi bi-lock"></i>
              </span>
              <input type={isPwdshown ? "text" : "password"} className={`form-control ${styles["border-input"]} `} placeholder="Confirm new password" onChange={handleNewPassword} />
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                {isPwdshown ? <i className={` bi bi-eye ${styles["cursor"]}`} onClick={togglePassword}></i> : <i className={` bi bi-eye-slash ${styles["cursor"]}`} onClick={togglePassword}></i>}
              </span>
            </div>

            <div className="mb-3 form-check">
              <label className={`${styles["forgot"]} ${styles["cursor"]} form-check-label`} for="exampleCheck1"></label>
            </div>
            {(confirmPassword && newPassword && keysChangePassword) === "" ? (
              <button disabled className={` btn ${styles["login-btn-off"]}`}>
                <p className={` ${styles["login-text-disabled"]}`}>Reset Password</p>
              </button>
            ) : (
              <button type="submit" className={` btn  ${styles["login-btn"]}`}>
                <p className={` ${styles["login-text"]}`}>Reset Password</p>
              </button>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default newPassword;
