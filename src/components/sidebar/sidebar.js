import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import grid from "../../assets/grid.png";
import arrow from "../../assets/arrow-up.png";
import user from "../../assets/user.png";
import plus from "../../assets/plus.png";
import logout from "../../assets/log-out.png";

function Sidebar(props) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [amount, setAmount] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [url, setUrl] = useState("");
  // const [url, setUrl] = useState("");

  const handleLogout = () => {
    const urlLogout = `https://fazzpay-rose.vercel.app/auth/logout`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const inputNumber = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleSubmit = () => {
    axios
      .post(`https://fazzpay-rose.vercel.app/transaction/top-up`, { amount, url })
      .then((response) => {
        setIsCreated(true);
        setUrl(response.data.data.redirectUrl);
        // console.log(response.data.data.redirectUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseLogOut = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);

  return (
    <div>
      <section className=" d-flex ">
        <div className={` ${styles["card"]} card `}>
          <div className=" card-body">
            <div className={`d-flex gap-3 mt-5 mb-4 ms-3`}>
              <Image src={grid} alt={"/"} />
              <p className={`${styles["cursor"]}`} onClick={() => router.push("/home")}>
                Dashboard
              </p>
            </div>
            <div className="d-flex gap-3 mb-4 ms-3 ">
              <Image src={arrow} alt={"/"} />
              <p className={`${styles["cursor"]}`} onClick={() => router.push("/transfer")}>
                {" "}
                Transfer
              </p>
            </div>

            <div className="d-flex gap-3 mb-4 ms-3 ">
              <Image src={plus} alt={"/"} />
              <p className={`${styles["cursor"]}`} onClick={handleShow}>
                Top Up
              </p>
            </div>
            <div className="d-flex gap-3 mb-4 ms-3 ">
              <Image src={user} alt={"/"} />
              <p className={`${styles["cursor"]}`} onClick={() => router.push("/profile")}>
                {" "}
                Profile
              </p>
            </div>
            <div className={`d-flex gap-3  ms-3 ${styles["logout-cont"]}`}>
              <Image src={logout} alt={"/"} />
              <p className={`${styles["cursor"]}`} onClick={handleShowLogout}>
                Log Out
              </p>
            </div>
          </div>
        </div>
        {!isCreated ? (
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Topup</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`  ${styles["title-topUp"]}`}>Enter the amount of money, and click submit</Modal.Body>

            <input type="text" className={`${styles["inputs"]} form-control form-control-sm validate ml-0`} onKeyPress={inputNumber} onChange={handleAmount} />

            <Modal.Footer>
              <Button variant="secondary" className="fw-bold text-bg-secondary text-white" onClick={handleSubmit}>
                submit
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Topup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Click this Link yo will be direct to payment :
              <p>
                {/* <a className="modal-close" href={url} class="tooltip-test" title="Tooltip" target="_blank"> */}
                {/* {url}
                </a> */}
              </p>
            </Modal.Body>
          </Modal>
        )}
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
      </section>
      ;
    </div>
  );
}

export default Sidebar;
