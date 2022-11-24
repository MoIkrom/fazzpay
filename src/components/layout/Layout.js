import React from "react";
import Head from "next/head";

function Layout({ children, title = "FazzPay" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
}

export default Layout;
