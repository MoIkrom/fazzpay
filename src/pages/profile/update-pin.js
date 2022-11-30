import React, { useEffect, useState } from "react";
import styles from "../../styles/profile/update-pin.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/index";
import Sidebar from "../../components/Sidebar/sidebar";
import Footer from "../../components/Footer/index";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import PinInput from "../../components/PinInput/pinInput";

function updatePassword() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [isCurrentPinConfirmed, setIsCurrentPinConfirmed] = useState(false);
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const [formPin, setFormPin] = useState({
    pin: "",
  });
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsError(false);
    setMessage("");
    resetForm();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  const togglePassword = () => {
    setIsPwdShown(!isPwdshown);
  };

  const resetForm = () => {
    setPin({
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
    });
    setFormPin({
      pin: "",
    });
  };

  const handleCurrentPin = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const fullPin = pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
      await axios.get(`https://fazzpay-rose.vercel.app/user/pin/${fullPin}`);
      setIsLoading(false);
      setIsError(false);
      setMessage("");
      setIsCurrentPinConfirmed(true);
      resetForm();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.msg);
      resetForm();
    }
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let fullPin = pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
    fullPin = +fullPin;
    const user_id = Cookies.get("id");
    const getToken = Cookies.get("token");
    axios
      .patch(`https://fazzpay-rose.vercel.app/user/pin/${user_id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
        pin: fullPin,
      })
      .then((response) => {
        setIsLoading(false);
        setIsError(false);
        setMessage("PIN updated");
        resetForm();
        setIsCurrentPinConfirmed(false);
        setTimeout(() => router.replace("/profile"), 3000);

        // toast.success("Change Password success", {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 2000,
        // });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
        setMessage(err.response.data.msg);
        resetForm();
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
      })
      .then((response) => {
        setFirstName(response.data.data.firstName);
        setLastName(response.data.data.lastName);
        setPhoneNumber(response.data.data.noTelp);
        setImage(response.data.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Layout title="Change Pin | FazzPay" />
      <Header />
      <div className="container d-flex">
        <Sidebar />
        <div className={`container ${styles["cont-right"]} `}>
          <div className={`card d-flex  ${styles["cards"]}`}>
            <div className="container p-4">
              <div className={`${styles["person"]}`}>
                <p className={`mb-0 ${styles["desc"]}`}>Change PIN</p>
                {/* <p className={` ${styles["desc-1"]} `}>Enter your current 6 digits Fazzpay PIN below to continue to the next steps.</p> */}
              </div>
            </div>
            {isCurrentPinConfirmed ? (
              <div>
                <p className={`opacity-50 profile-text ${styles["cont-pin"]}`}>Type your new 6 digits security PIN to use in FazzPay.</p>
              </div>
            ) : (
              // <p className="opacity-50 profile-text">Type your new 6 digits security PIN to use in FazzPay.</p>
              <p className={`opacity-50 profile-text ${styles["cont-pin"]}`}>Enter your current 6 digits FazzPay PIN below to continue to the next steps.</p>
            )}
            <form onSubmit={isCurrentPinConfirmed ? handleChangePin : handleCurrentPin} className="profile-form mx-auto flex-grow-1 d-flex flex-column justify-content-between justify-content-md-center">
              <div className={`${styles["pin-column"]}`}>
                {message ? (
                  isError ? (
                    <div className="alert alert-danger py-2" role="alert">
                      {message}
                    </div>
                  ) : (
                    <div className="alert alert-success py-2" role="alert">
                      {message}
                    </div>
                  )
                ) : (
                  <div className="mt-4"></div>
                )}
                <div className="mb-3">
                  <PinInput pin={pin} setPin={setPin} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary fw-bold w-100">
                {isLoading ? (
                  <div className="spinner-border spinner-border-sm text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : isCurrentPinConfirmed ? (
                  "Change PIN"
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />

      <Footer />
    </div>
  );
}

export default updatePassword;
