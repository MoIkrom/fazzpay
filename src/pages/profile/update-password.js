import React, { useEffect, useState } from "react";
import styles from "../../styles/profile/update-password.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/index";
import Sidebar from "../../components/Sidebar/sidebar";
import Footer from "../../components/Footer/index";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

function updatePassword() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [isPwdshown, setIsPwdShown] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const togglePassword = () => {
    setIsPwdShown(!isPwdshown);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const user_id = Cookies.get("id");
    const getToken = Cookies.get("token");
    axios
      .patch(`https://fazzpay-rose.vercel.app/user/password/${user_id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
        oldPassword,
        newPassword,
        confirmPassword,
      })
      .then((response) => {
        toast.success("Change Password success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => router.replace("/profile"), 3000);
      })
      .catch((err) => {
        toast.error("Confirm password is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(err);
      });
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
                <p className={`mb-0 ${styles["desc"]}`}>Change Password</p>
                <p className={` ${styles["desc-1"]}`}>We You must enter your current password and then type your new password twice.</p>
              </div>
            </div>

            <div className={`container ${styles["cont-password"]}`}>
              <form className={`${styles["form"]}`} onSubmit={submitHandler}>
                <div className=" input-group flex-nowrap mb-3">
                  <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                    <i class="bi bi-lock"></i>
                  </span>
                  <input type={isPwdshown ? "text" : "password"} className={`form-control ${styles["border-input"]} `} onChange={handleOldPassword} placeholder="Current password" />
                  <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                    {isPwdshown ? (
                      <i className={` bi bi-eye ${styles["eyeslash"]} ${styles["cursor"]}`} onClick={togglePassword}></i>
                    ) : (
                      <i className={` bi bi-eye-slash ${styles["eyeslash"]} ${styles["cursor"]}`} onClick={togglePassword}></i>
                    )}
                  </span>
                </div>
                <div className=" input-group flex-nowrap mb-3">
                  <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                    <i class="bi bi-lock"></i>
                  </span>
                  <input type={isPwdshown ? "text" : "password"} className={`form-control ${styles["border-input"]} `} placeholder="New password" onChange={handleNewPassword} />
                  <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                    {isPwdshown ? (
                      <i className={` bi bi-eye ${styles["eyeslash"]} ${styles["cursor"]}`} onClick={togglePassword}></i>
                    ) : (
                      <i className={` bi bi-eye-slash ${styles["eyeslash"]} ${styles["cursor"]}`} onClick={togglePassword}></i>
                    )}
                  </span>
                </div>
                <div className=" input-group flex-nowrap mb-3">
                  <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                    <i class="bi bi-lock"></i>
                  </span>
                  <input type={isPwdshown ? "text" : "password"} className={`form-control ${styles["border-input"]} `} placeholder="Repeat new password" onChange={handleConfirmPassword} />
                  <span className={`input-group-text ${styles["email"]}`} id="addon-wrapping">
                    {isPwdshown ? (
                      <i className={` bi bi-eye ${styles["eyeslash"]} ${styles["cursor"]}`} onClick={togglePassword}></i>
                    ) : (
                      <i className={` bi bi-eye-slash ${styles["eyeslash"]} ${styles["cursor"]}`} onClick={togglePassword}></i>
                    )}
                  </span>
                </div>
                {(oldPassword && newPassword && confirmPassword) === "" ? (
                  <button disabled className={` btn ${styles["login-btn-off"]}`}>
                    <p className={` ${styles["login-text-disabled"]}`}>Change Password</p>
                  </button>
                ) : (
                  <button type="submit" className={` btn  ${styles["login-btn"]}`}>
                    <p className={` ${styles["login-text"]}`}>Change Password</p>
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

export default updatePassword;
