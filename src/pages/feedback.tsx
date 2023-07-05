import HeaderComponent from "@/components/common/Header";
import React, { Fragment } from "react";
import styles from "../styles/header.module.scss";
import Link from "next/link";
import { AiOutlineShareAlt } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
export default function Home() {
  return (
    <Fragment>
      <HeaderComponent
        rightElements={[
          <button
            onClick={() => alert("복사")}
            className={styles.box}
            style={{ marginRight: 8 }}
            key="button"
          >
            <AiOutlineShareAlt size={20} />
          </button>,
          <Link href={"/feedback"} className={styles.box} key="box">
            <VscFeedback size={20} />
          </Link>,
        ]}
      />
    </Fragment>
  );
}
