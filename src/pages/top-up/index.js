import React, { useEffect, useState } from "react";
import Header from "../../components/header/index";
import Sidebar from "../../components/sidebar/index";
import styles from "../top-up/topUp.module.css";
import Image from "next/image";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// import { useRouter } from "next/router";
import Footer from "../../components/footer/index";
import Layout from "../../components/layout/Layout";

function index() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(true);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`https://fazzpay-rose.vercel.app/user/profile/${user_id}`, {
        firstName,
        lastName,
        phoneNumber,
      })
      .then((response) => {
        // setfirstName: response.data.data.firstName;
        // lastName: response.data.data.lastName;
        // const lastName = ;
        setFirstName(response.data.data.firstName);
        setLastName(response.data.data.lastName);
        setPhoneNumber(response.data.data.noTelp);
        // console.log(response.data.data);
        // console.log(user_id);

        setShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Layout title="Profile" />

      <Header />
      <div className="container d-flex">
        <Sidebar />
        <div className={`container ${styles["cont-right"]} `}>
          <div className={`card d-flex justify-content-center align-items-center ${styles["cards"]}`}></div>
        </div>
        {/* <Modal show={show} onHide={setShow} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Topup</Modal.Title>
          </Modal.Header>
          <Modal.Body>Enter the amount of money, and click submit</Modal.Body>

          <input type="text" className="form-control form-control-sm validate ml-0" />

          <Modal.Footer>
            <Button variant="secondary" className="fw-bold text-bg-secondary text-white" onClick={() => router.push("/home")}>
              submit
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>

      <Footer />
    </>
  );
}

export default index;
