import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={` ${styles["cont-footer"]} container-fluid fixed-bottom d-none d-md-block `}>
      <div className="container-lg py-3 d-flex justify-content-between">
        <div>
          <span className={`text-white ${styles["font"]} ${styles["weight-1"]}`}>&copy; 2022 FazzPay. All right reserved.</span>
        </div>
        <div>
          <span className={`text-white me-5 ${styles["font"]} ${styles["weight-2"]}`}>+62 5637 8882 9901</span>
          <span className={`text-white ${styles["font"]}${styles["weight-2"]} `}>contact@fazzpay.com</span>
        </div>
      </div>
    </div>
  );
}
