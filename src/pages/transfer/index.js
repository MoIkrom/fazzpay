import React, { useEffect, useState } from "react";
import Header from "../../components/header/index";
import Sidebar from "../../components/sidebar/index";
import styles from "../transfer/transfer.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

import Receiver from "../../components/card_receiver/index";
import search from "../../assets/search.png";
import axios from "axios";

// import { useRouter } from "next/router";
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

  const handlerouter = () => router.push("/transfer/input-amount");

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

  return (
    <>
      <Layout title="Transfer" />

      <Header />
      <div className="container d-flex">
        <Sidebar />
        <div className={`container ${styles["cont-right"]} `}>
          <div className={`card d-flex   ${styles["cards"]}`}>
            <p className="mb-0">Search Receiver </p>
            <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Search receiver here " aria-label="Search" aria-describedby="search-addon" />
              <span className="input-group-text border-0" id="search-addon"></span>
            </div>

            <div className="col-12" onclick={handlerouter}>
              {data.length > 0 ? (
                data.map((data, index) => {
                  const images = data.image;
                  const imageProfile = images.replace("Fazzpay", "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/Fazzpay");
                  // image={imageProfile}
                  // console.log(imageProfile);
                  return <Receiver key={index} firstName={data.firstName} lastName={data.lastName} status={data.status} nominal={`${"IDR"} ${costing(data.amount)}`} id={data.id} />;
                })
              ) : (
                // <Loader />
                <p>Loading</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default index;
