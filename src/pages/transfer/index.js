import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import css from "../../styles/transfer/Transfer.module.css";
// import styles from "../transfer/transfer.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";

import Footer from "../../components/footer/index";
import Layout from "../../components/layout/Layout";
import Header from "../../components/header/index";
import Sidebar from "../../components/sidebar/index";
import Receiver from "../../components/receiver/index";

import search from "../../assets/search.png";

function index() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`https://fazzpay-rose.vercel.app/user?page=13&limit=5&filter=MONTH&search=${search}`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);
  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  return (
    <>
      <Layout title="Transfer" />

      <Header />

      {/* <div className="container d-flex">
      
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
                  // const images = data.image;
                  // const imageProfile = images.replace("Fazzpay", "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/Fazzpay");
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
      </div> */}

      <div className="container d-flex">
        <Sidebar />
        <div className={`col-lg-9 col-md-12 col-sm-12 ${css.content_right}`}>
          <div className={""}>
            <p className={css.search_receiver}>Search Receiver</p>
            {/* search box */}
            <div className={css.search_box}>
              <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
              <input type="text" name="" id="" placeholder="Search receiver here" onChange={searchHandler} />
            </div>
            {/* profile */}
            <div className={css.scroll_bar}>
              <div className={css.scroll}>
                <div className="col-12">
                  {data.length > 0 ? (
                    data.map((data, index) => {
                      return (
                        <Receiver key={index} firstName={data.firstName} lastName={data.lastName} images={data.image === null ? `${process.env.CLOUDINARY_LINK}` : `${process.env.CLOUD}${data.image}`} noTelp={data.noTelp} id={data.id} />
                      );
                    })
                  ) : (
                    // <Loader />
                    <p>Loading</p>
                  )}
                </div>
                {/* {data.map((data) => {
                // console.log(`${process.env.CLOUDINARY_LINK}`),
                return <CardProfileTransfer key={user.id} idUser={user.id} images={user.image === null ? `${process.env.CLOUDINARY_LINK}` : `${process.env.CLOUD}${user.image}`} name={user.firstName} noTelp={user.noTelp} />;
              })} */}
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
