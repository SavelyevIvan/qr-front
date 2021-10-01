import React, { useEffect, useRef, useState } from "react";

import styles from "./QRCard.module.css";

import useRequest from "../../Hooks/useRequest";
import QRService from "../../Services/QRService";
import { prepareToExport } from "../../Utils/canvas";
import BackCard from "./Back";
import FrontCard from "./Front";
import FrontAdding from "./Add/Front";
import BackAdding from "./Add/Back";

function QrCard({ short, getShorts, defaultAdd, onNewCard, onRemove }) {
  const {
    fetch: requestDelete,
    state: { isLoading, payload: shorts },
  } = useRequest(QRService.delete);

  const {
    fetch: requestAdd,
    state: { isLoadings, payload: newShort },
  } = useRequest(QRService.create);

  const {
    fetch: requestUpdate,
    state: { isLoad, payload: updateShort },
  } = useRequest(QRService.update);

  const refOnCard = useRef(null);

  const [isTurned, turn] = useState(false);
  const [shortDinamic, setShort] = useState(short);
  const [defaultState, setDefault] = useState(defaultAdd || false);

  const onTurn = () => {
    turn((state) => !state);
  };

  const onDelete = () => {
    requestDelete(shortDinamic._id);
  };

  const onEdit = async (values) => {
    requestUpdate(values, shortDinamic._id);
  };

  const onAdd = (values) => {
    console.log(values);
    requestAdd(values);
  };

  const onExport = () => {
    const tempLink = document.createElement("a");
    refOnCard.current.appendChild(tempLink);
    tempLink.style = "display: none";
    tempLink.download = `${shortDinamic.name}.png`;

    const canvas = prepareToExport(
      refOnCard.current.getElementsByTagName("canvas")[0]
    );

    tempLink.href = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    tempLink.click();

    tempLink.remove();
  };
  useEffect(() => {
    if (updateShort) {
      console.log("updated short", updateShort);
      setShort(updateShort);
      onTurn();
      setDefault(false);
    }
  }, [updateShort]);

  useEffect(() => {
    if (shorts) {
      getShorts();
    }
  }, [shorts]);

  useEffect(() => {
    if (newShort) {
      setShort(newShort);
      onTurn();
      setDefault(false);
      onNewCard();
    }
  }, [newShort]);

  return (
    <div className={styles.flipCard}>
      <div
        className={styles.flipCardInner}
        style={
          defaultState
            ? isTurned
              ? { transform: "rotateY(180deg)" }
              : { transform: "rotateY(360deg)" }
            : {}
        }
      >
        {defaultState ? (
          <FrontAdding onTurn={onTurn} />
        ) : (
          <FrontCard
            _id={shortDinamic._id}
            name={shortDinamic.name}
            refOnCard={refOnCard}
          />
        )}
        {isTurned || defaultState ? (
          <BackAdding
            name={shortDinamic.name}
            payload={shortDinamic.payload}
            onEdit={!defaultState && onEdit}
            onAdd={onAdd}
            onTurn={onTurn}
          />
        ) : (
          <BackCard
            _id={shortDinamic._id}
            name={shortDinamic.name}
            payload={shortDinamic.payload}
            onExport={onExport}
            onEdit={onTurn}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}

export default QrCard;
