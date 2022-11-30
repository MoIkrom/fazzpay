import React, { useEffect, useState } from "react";

import styles from "../../styles/profile/profile.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import authActions from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import defaultImage from "../../assets//profile.jpg";
import pencil from "../../assets//pencil.png";
import panah from "../../assets//arrow-right.png";

// import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/index";
import Sidebar from "../../components/Sidebar/sidebar";
import Footer from "../../components/Footer/index";
import offCanvas from "../../components/offCanvas/offCanvas";
const myLoader = ({ src, width, quality }) => {
  return `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${src}?w=${width}&q=${quality || 75}`;
};

function index() {
  const router = useRouter();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);
  const [display, setDisplay] = useState(profile.image);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [patchimage, setPatchImage] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [btnsave, setBtnsave] = useState(false);
  const [ischange, setIschange] = useState(false);

  // Get user by id
  const Editimage = () => {
    const getId = Cookies.get("id");
    const getToken = Cookies.get("token");
    const formData = new FormData();
    if (image) formData.append("image", image);
    axios
      .patch(`https://fazzpay-rose.vercel.app/user/image/${getId}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(
        (res) => {
          setIschange(true);
          router.reload(window.location.pathname);
          console.log(res);
        }

        // toast.success(res.data.msg),
        // dispatch(authActions.userThunk(getToken, getId))
      )
      .catch((err) => {
        console.log(err), toast.error(err.response.data.msg);
      });
  };

  // inputImage => preview image
  const inputImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPatchImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleLogout = () => {
    const urlLogout = `https://fazzpay-rose.vercel.app/auth/logout`;
    const getToken = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken}`;
    axios
      .post(urlLogout)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteToken = () => {
    const getToken = Cookies.get("token");
    dispatch(authActions.logoutThunk(getToken)), Cookies.remove("id"), Cookies.remove("token");
    toast.success("Logout Success"),
      setTimeout(() => {
        router.push("/");
      }, 2000);

    // ---------- Cara Delete Pakai Locadtorage ----------
    // localStorage.removeItem("token");
    // localStorage.removeItem("id");
  };
  const handleCloseLogOut = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);
  const handleCancel = () => {
    setDisplay(profile.image), setBtnsave(false);
  };

  const handleSaveShow = () => {
    setBtnsave(true);
  };

  useEffect(() => {
    const getToken = Cookies.get("token");
    const getId = Cookies.get(`id`);
    dispatch(authActions.userThunk(getToken, getId));
    console.log(display);
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    const user_id = Cookies.get("id");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`https://fazzpay-rose.vercel.app/user/profile/${user_id}`)
      .then((response) => {
        setImage(response.data.data.image);
        setLastName(response.data.data.lastName);
        setFirstName(response.data.data.firstName);
        setPhoneNumber(response.data.data.noTelp);
        console.log(image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // --------- Ini codingan punya Lama --------------
  // useEffect(() => {
  //   const user_id = localStorage.getItem("id");
  //   const token = localStorage.getItem("token");
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   axios
  //     .get(`https://fazzpay-rose.vercel.app/user/profile/${user_id}`, {
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //     })
  //     .then((response) => {
  //       // setfirstName: response.data.data.firstName;
  //       // lastName: response.data.data.lastName;
  //       // const lastName = ;
  //       setFirstName(response.data.data.firstName);
  //       setLastName(response.data.data.lastName);
  //       setPhoneNumber(response.data.data.noTelp);
  //       setImage(response.data.data.image);
  //       console.log(response.data.data.image);
  //       // console.log(user_id);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const imageProfile = `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${image}`;

  return (
    <>
      <Layout title="Profile" />

      <Header />
      <div className="container d-flex">
        <Sidebar />

        <div className={`container ${styles["cont-right"]} `}>
          <div className={`card d-flex justify-content-center align-items-center ${styles["cards"]}`}>
            {/* <Image
              className={`${styles["profile-picture"]}`}
              src={display === "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/null" ? `${process.env.CLOUDINARY_LINK}` : display}
              alt="image"
              width={90}
              height={90}
              border-radius={20}
            /> */}
            {/* <Image
              className={`${styles["profile-picture"]}`}
              src={display === "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/null" ? `${process.env.CLOUDINARY_LINK}` : display}
              alt="image"
              width={90}
              height={90}
              border-radius={20}
            /> */}

            {/* _------ INi Punya Lama */}
            <Image className={`${styles["profile-picture"]}`} src={ischange ? image : image === null ? defaultImage : imageProfile} alt="/" width={90} height={90} border-radius={20} />

            {/* --------------------------------- */}

            {/* <Image className={`${styles["profile-picture"]}`} src={imageProfile} alt="/" width={48} height={48} style={{ borderRadius: "8px" }} /> */}
            {/* ______________________________________ */}

            <div className={btnsave ? "d-none" : `${styles.profile_edit}`} onClick={handleSaveShow}>
              {/* <i className="fa-solid fa-pencil"></i> */}
              <label className={`${styles["cursor"]}`} htmlFor="file">
                Edit
              </label>
              <input type="file" name="file" id="file" onChange={inputImage} className="d-none" />
            </div>
            <div className={btnsave ? `${styles.profile_button}` : "d-none"}>
              <button className={styles.btn_save_profile} onClick={() => (Editimage(), setBtnsave(false))}>
                Save Profile
              </button>
              <button className={styles.btn_cancel_profile} onClick={handleCancel}>
                Cancel
              </button>
            </div>

            {/* ---------- INi edit versi Lama */}
            {/* <div className={`d-flex align-items-center gap-2 ${styles["cursor"]} `}>
              <Image className={`${styles["pencil"]}  ${styles["cursor"]}`} src={pencil} alt="/" />
              <p className="mb-0">Edit</p>
            </div> */}

            {/* ---------------------- */}
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
              <p className={`mb-0 ${styles["text"]}`} onClick={handleShowLogout}>
                {" "}
                Logout{" "}
              </p>
            </div>
          </div>
        </div>
        <Modal show={showLogout} onHide={handleCloseLogOut} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to Log Out?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              className="fw-bold text-bg-success text-white"
              onClick={() => {
                deleteToken();
                handleLogout();
                setTimeout(() => {
                  router.push("/");
                }, 1000);
              }}
            >
              Yes
            </Button>
            <Button variant=" secondary" className="fw-bold text-bg-secondary  text-white" onClick={handleCloseLogOut}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default index;
