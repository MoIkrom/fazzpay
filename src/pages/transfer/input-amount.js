import React, { useEffect, useState } from "react";
import Header from "../../components/header/index";
import Sidebar from "../../components/sidebar/index";
import styles from "../home/home.module.css";
import Image from "next/image";
import Transaction from "../../components/card_transaction/index";

// import defaultImage from "../../public/profile.jpg";
import axios from "axios";

import { useRouter } from "next/router";
import Footer from "../../components/footer/index";
import Layout from "../../components/layout/Layout";

function index() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [data, setData] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");

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
        // console.log(response.data.data);
        // console.log(response.data.data.totalIncome);
        // console.log(user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          <div className="card">
            <div className="card-body d-flex justify-content-between">
              <div className="col-9">
                <p>balance</p>
                <h1> Rp 120.000</h1>
                <p>+62 89372282098 </p>
              </div>
              <div className="col-3 row d-flex align-content-around justify-content-center">
                <button className={` btn btn-primary ${styles["button"]}`} onClick={() => router.push("/transfer")}>
                  {" "}
                  Transfer
                </button>
                <button className={` btn btn-primary ${styles["button"]}`} onClick={() => router.push("/top-up")}>
                  {" "}
                  Top Up
                </button>
              </div>
            </div>
          </div>
          <div className="container row d-flex justify-content-between px-0 mx-0">
            <div className="card col-6 mt-2">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <p>income</p>
                  <p>{setIncome}</p>
                </div>
                <div>
                  <p>expense</p>
                  <p>{setExpense}</p>
                </div>
              </div>
            </div>
            <div className="card col-5 mt-2">
              <div className="card-body d-flex justify-content-between">
                <div className="col-8">
                  <p>Transaction</p>
                </div>
                <div className="col-4">
                  <p>See All</p>
                </div>
              </div>
              <div className="col-12">
                {data.length > 0 ? (
                  data.map((data, index) => {
                    const images = data.image;
                    const imageProfile = images.replace("Fazzpay", "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/Fazzpay");
                    // image={imageProfile}
                    // console.log(imageProfile);
                    return <Transaction key={index} firstName={data.firstName} lastName={data.lastName} status={data.status} nominal={`${"IDR"} ${costing(data.amount)}`} id={data.id} />;
                  })
                ) : (
                  // <Loader />
                  <p>Loading</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default index;
