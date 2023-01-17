import React from "react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../../styles/users/register.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// import redux
import { useDispatch, useSelector } from "react-redux";
import registerActions from "../../redux/actions/register";

// Import Image
import hp from "../../assets/phone-login.png";

function Register() {
  const router = useRouter();
  const dispacth = useDispatch();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPwdshown, setIsPwdShown] = useState(false);

  const togglePassword = () => {
    setIsPwdShown(!isPwdshown);
  };

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const handleLastname = (e) => {
    setLastname(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`https://fazzpay-rose.vercel.app/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        console.log(response);

        toast.success("Sign Up success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        dispacth(
          registerActions.registerThunk({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          })
        );
        setTimeout(() => router.push("/auth/login"), 3000);
      })
      .catch((err) => {
        toast.error("Invalid Email", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(err);
      });
  };

  return (
    <Layout title="Register">
      <div className={`d-flex ${styles["cont-left"]}`}>
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
          <h2 className={`${styles["fazzpay"]} ${styles["title-form"]}`}>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h2>
          <p className={`${styles["desc-form"]}`}>Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
          <form className={`${styles["form"]}`} onSubmit={submitHandler}>
            <div className="input-group flex-nowrap mb-2">
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                <i className={`bi bi-person ${styles["addon-wrapping"]}`}></i>
              </span>
              <input type="text" className={`form-control ${styles["border-input"]} `} required="true" placeholder="Enter your firstname" aria-label="Username" aria-describedby="addon-wrapping" onChange={handleFirstname} />
            </div>
            <div className="input-group flex-nowrap mb-2">
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                <i className={`bi bi-person ${styles["addon-wrapping"]}`}></i>
              </span>
              <input type="text" className={`form-control ${styles["border-input"]} `} required="true" placeholder="Enter your lastname" aria-label="Username" aria-describedby="addon-wrapping" onChange={handleLastname} />
            </div>
            <div className="input-group flex-nowrap mb-2">
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                <i className={`bi bi-envelope ${styles["addon-wrapping"]}`}></i>
              </span>
              <input type="text" className={`form-control ${styles["border-input"]} `} required="true" placeholder="Enter your e-mail" aria-label="Username" aria-describedby="addon-wrapping" onChange={handleEmail} />
            </div>
            <div className=" input-group flex-nowrap mb-2">
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                <i className={`bi bi-lock `}></i>
              </span>
              <input type={isPwdshown ? "text" : "password"} className={`form-control ${styles["border-input"]} `} placeholder="Enter your password" onChange={handlePassword} />
              <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                {isPwdshown ? <i className={` bi bi-eye ${styles["eyeslash"]} ${styles["cursor"]}`} onClick={togglePassword}></i> : <i className={` bi bi-eye-slash ${styles["eyeslash"]} ${styles["cursor"]}`} onClick={togglePassword}></i>}
              </span>
            </div>
            <div className="mb-3 form-check">
              <label className={`${styles["forgot"]} form-check-label`} for="exampleCheck1"></label>
            </div>
            {(email && password && firstName && lastName) === "" ? (
              <button disabled className={` btn ${styles["login-btn-off"]}`}>
                <p className={` ${styles["login-text-disabled"]}`}>Sign Up</p>
              </button>
            ) : (
              <button type="submit" className={` btn  ${styles["login-btn"]}`}>
                <p className={` ${styles["login-text"]}`}>Sign Up</p>
              </button>
            )}
            {/* <button type="submit" className={` btn  ${styles["login-btn"]}`}>
            <p className={` ${styles["login-text"]}`}>Login</p>
          </button> */}
          </form>
          <p className={`${styles["sign-up"]}`}>
            Already have an account? Let’s &nbsp;
            <strong
              className={`${styles["text-sign-up"]} ${styles["cursor"]}`}
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Login
            </strong>
          </p>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Register;
