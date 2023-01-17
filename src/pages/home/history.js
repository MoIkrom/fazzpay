import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/sidebar";
import styles from "../home/history.module.css";
import Image from "next/image";
import Transaction from "../../components/Card_transaction/CardTransaction";
import Dropdown from "react-bootstrap/Dropdown";
import SSRProvider from "react-bootstrap/SSRProvider";

import transfer from "../../assets/transfer.png";
import topUp from "../../assets/topUp.png";
import axios from "axios";

import { useRouter } from "next/router";
import Footer from "../../components/Footer/Footer";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function History() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [data, setData] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [url, setUrl] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputNumber = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [firstName, lastName, phoneNumber]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`https://fazzpay-rose.vercel.app/transaction/history?page=1&limit=5&filter=MONTH`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
        // console.log(user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("id");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`https://fazzpay-rose.vercel.app/dashboard/${user_id}`)
      .then((response) => {
        setIncome(response.data.data.totalIncome);
        setExpense(response.data.data.totalExpense);
        // console.log(response.data.data);
        // console.log(response.data.data.totalIncome);
        // console.log(user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAmount = (e) => {
    setAmount(e.target.value);
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

  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  return (
    <>
      <SSRProvider>
        <Layout title="History" />

        <Header />
        <div className="container d-flex">
          <Sidebar />
          <div className={`card container ${styles["cont-card"]}`}>
            <div className="card-body ">
              <div className="d-flex justify-content-between align-item-center">
                <p className="mb-0">Transaction History</p>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    -- Select Filter --
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Accept</Dropdown.Item>
                    <Dropdown.Item href="#/action-2"> Top Up</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Transfer </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <div className="btn-group">
                <button className={` ${styles["button"]} btn btn-sm`} type="button">
                  <p className={` mb-0 ${styles["filter"]}`}></p>
                </button>
              </div> */}
              </div>
              <div className={`col-12 ${styles["cont-transaction"]}`}>
                {data.length > 0 ? (
                  data.map((data, index) => {
                    return <Transaction key={index} firstName={data.firstName} lastName={data.lastName} status={data.type} nominal={`${"IDR"} ${costing(data.amount)}`} id={data.id} />;
                  })
                ) : (
                  <div className={`${styles["loading"]}`}>
                    <Loader />
                  </div>
                  // <p>Loading</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </SSRProvider>
    </>
  );
}

export default History;
