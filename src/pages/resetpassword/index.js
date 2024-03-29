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

function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [input, setInput] = useState(true);
  const [inputpending, setInputpending] = useState(true);

  const handleEmail = (e) => {
    setInputpending(false), setInput(true), setEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(`https://fazzpay-rose.vercel.app/auth/forgot-password`, {
        email,
        linkDirect: "http://localhost:3000/resetpassword",
      })
      .then((response) => {
        console.log(response);

        toast.success("Please check your Email", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        // setTimeout(() => router.push("/users/resetPassword"), 3000);
      })
      .catch((err) => {
        toast.error("Email is wrong", {
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
          <p className={`${styles["desc-form"]}`}>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
          <form className={`${styles["form"]}`} onSubmit={submitHandler}>
            <div className="input-group flex-nowrap mb-3">
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                <i className={`bi bi-envelope ${styles["addon-wrapping"]}`}></i>
              </span>
              <input type="text" className={`form-control ${styles["border-input"]} `} required="true" placeholder="Enter your e-mail" aria-label="Username" aria-describedby="addon-wrapping" onChange={handleEmail} />
            </div>

            <div className="mb-3 form-check">
              <label className={`${styles["forgot"]} ${styles["cursor"]} form-check-label`} for="exampleCheck1"></label>
            </div>
            {email === "" ? (
              <button disabled className={` btn ${styles["login-btn-off"]}`}>
                <p className={` ${styles["login-text-disabled"]}`}>Confirm</p>
              </button>
            ) : (
              <button type="submit" className={` btn  ${styles["login-btn"]}`}>
                <p className={` ${styles["login-text"]}`}>Confirm</p>
              </button>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default ForgotPassword;
