import React from "react";
import Image from "next/image";

import ikram from "../../assets/ikram.jpg";

function home() {
  return (
    <div>
      welcome Ikram
      <Image src={ikram} alt="/" />
    </div>
  );
}

export default home;
