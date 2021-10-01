import React from "react";
import styles from "../QRCard.module.css";
import { ReactComponent as IconAdding } from "../../../Assets/Images/adding128*128.svg";

export default function FrontAdding({ onTurn }) {
  return (
    <div
      className={styles.flipCardFront}
      onClick={onTurn}
      style={{ cursor: "pointer" }}
    >
      <IconAdding />
    </div>
  );
}
