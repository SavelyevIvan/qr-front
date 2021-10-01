import QRCode from "qrcode.react";
import React, { useState } from "react";
import { Typography } from "antd";

import styles from "../QRCard.module.css";

const { Title } = Typography;

export default function FrontCard({ refOnCard, name, _id }) {
  return (
    <div ref={refOnCard} className={styles.flipCardFront}>
      <QRCode
        value={`${process.env.REACT_APP_BACKEND_HOST}/${_id}`}
        size={200}
      />
      <Title level={3} style={{ marginTop: "80px" }}>
        {name}
      </Title>
    </div>
  );
}
