import React from "react";
import { Button, Card } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import styles from "../QRCard.module.css";
import { ReactComponent as LogoPlayMarket } from "../../../Assets/Images/playMarket64*64.svg";
import { ReactComponent as LogoAppStore } from "../../../Assets/Images/appStore64*64.svg";
import { ReactComponent as LogoInternet } from "../../../Assets/Images/internet64*64.svg";

export default function BackCard({
  _id,
  name,
  onExport,
  onDelete,
  onEdit,
  payload,
}) {
  return (
    <div className={styles.flipCardBack}>
      <Card
        title={name}
        className={styles.cardBack}
        actions={[
          <div onClick={onExport} className={styles.cardAction}>
            <span>Export</span>
            <DownloadOutlined key="export" />
          </div>,
          <div onClick={onEdit} className={styles.cardAction}>
            <span>Edit</span>
            <EditOutlined key="edit" />
          </div>,
          <div onClick={onDelete} className={styles.cardAction}>
            <span>Remove</span>
            <DeleteOutlined key="delete" />
          </div>,
        ]}
      >
        {payload.googlePlay && (
          <Button
            type="link"
            href={payload.googlePlay}
            target="__blank"
            icon={<LogoPlayMarket />}
            className={styles.linkToPayload}
          />
        )}
        {payload.appStore && (
          <Button
            type="link"
            href={payload.appStore}
            target="__blank"
            icon={<LogoAppStore />}
            className={styles.linkToPayload}
          />
        )}
        <Button
          type="link"
          href={payload.fallback}
          target="__blank"
          icon={<LogoInternet />}
          className={styles.linkToPayload}
        />
      </Card>
    </div>
  );
}
