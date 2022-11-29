import React, { useEffect, useState } from "react";
import Header from "../../components/header/index";
import Sidebar from "../../components/sidebar/sidebar";
import styles from "../home/home.module.css";
import Image from "next/image";
import Transaction from "../../components/card_transaction/index";

import transfer from "../../assets/transfer.png";
import topUp from "../../assets/topUp.png";
import axios from "axios";

import { useRouter } from "next/router";
import Footer from "../../components/footer/index";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/Loader/index";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import defaultImage from "../../assets/profile.jpg";
import incomes from "../../assets/income.png";
import expenses from "../../assets/expense.png";

function index() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [data, setData] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [balance, setBalance] = useState("");
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingB, setIsLoadingB] = useState(true);

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
        setBalance(response.data.data.balance);
        setIsLoadingB(false);
        // console.log(response.data.data);
        // console.log(user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        setAmount(response.data.data.amount);
        setIsLoading(false);
        // setData(response.data.data);
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
      <Layout title="Home" />

      <Header />
      <div className="container d-flex">
        <Sidebar />
        <div className={`container ${styles["cont-right"]} `}>
          <div className={`card ${styles["cont-card"]}`}>
            <div className={`card-body d-flex justify-content-between ${styles["cont-balance"]}`}>
              <div className="col-9">
                {isLoadingB ? (
                  <div className={`${styles["loader-balance"]}`}>
                    <Loader />
                  </div>
                ) : (
                  <div>
                    <p className={` text-white  ${styles["balance"]}`}>Balance</p>
                    <h1 className={` fw-bold text-white  ${styles["balance"]}`}> {`${"IDR"} ${costing(balance)}`}</h1>
                  </div>
                )}

                {/* <h1 className={` fw-bold text-white  ${styles["balance"]}`}> IDR 1.000.000</h1> */}
                {/* <h1 className={` fw-bold text-white  ${styles["balance"]}`}> {`${"IDR"} ${costing(data.amount)}`}</h1> */}
                <p className={` text-white  ${styles["balance"]}`}>{data.noTelp} </p>
              </div>
              <div className="col-3 row d-flex align-content-around justify-content-center">
                <button className={` btn d-flex gap-1 justify-content-evenly align-items-center  fw-bold ${styles["button"]}`} onClick={() => router.push("/transfer")}>
                  <Image src={transfer} alt="/" />
                  <p className="mb-0">Transfer</p>
                </button>
                <button className={` btn d-flex gap-1 justify-content-evenly align-items-center fw-bold  ${styles["button"]}`} onClick={handleShow}>
                  <Image src={topUp} alt="/" />
                  <p className="mb-0"> Top Up</p>
                </button>
              </div>
            </div>
          </div>
          <div className="container row d-flex justify-content-between px-0 mx-0">
            <div className={`card col-6 mt-2 ${styles["cont-grafik"]}`}>
              {isLoading ? (
                <Loader />
              ) : (
                <div className={`card-body d-flex justify-content-between ${styles["height-cont-incomes"]}`}>
                  <div className={`d-flex align-items-center ${styles["incomes"]}`}>
                    <Image src={incomes} alt="/" />
                    <p className={`${styles["income"]}`}>Income</p>

                    <p> {` ${"IDR"} ${costing(income)} `} </p>
                  </div>
                  <div className={`d-flex align-items-center ${styles["incomes"]}`}>
                    <Image src={expenses} alt="/" />
                    <p className={`${styles["income"]}`}>Expense</p>
                    <p>{`${"IDR"} ${costing(expense)}`}</p>
                  </div>
                </div>
              )}
            </div>
            <div className={`card col-5 mt-2 ${styles["card-height"]}`}>
              <div className="card-body d-flex justify-content-between px-0">
                <div className="col-8">
                  <p className="fw-bold mb-0">Transaction History</p>
                </div>
                <div className="col-4">
                  <p className={`d-flex justify-content-end pe-3 mb-0 ${styles["see"]} `} onClick={() => router.push("/home/history")}>
                    See All
                  </p>
                </div>
              </div>
              <div className="col-12">
                {data.length > 0 ? (
                  data.map((data, index) => {
                    return <Transaction key={index} firstName={data.firstName} lastName={data.lastName} image={defaultImage} status={data.type} nominal={`${"IDR"} ${costing(data.amount)}`} id={data.id} />;
                  })
                ) : (
                  <Loader className={`${styles["loading"]}`} />
                  // <p>Loading</p>
                )}
              </div>
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
                <a href={url} target="_blank" class="tooltip-test" title="Tooltip">
                  {url}
                </a>
              </p>
            </Modal.Body>
          </Modal>
        )}
      </div>
      <Footer />
    </>
  );
}

export default index;
