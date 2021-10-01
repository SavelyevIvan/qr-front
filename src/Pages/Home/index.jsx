import React, { useEffect, useState } from "react";

import { Card } from "antd";
import useRequest from "../../Hooks/useRequest";
import QrCard from "../../Components/QRCard";

import QRService from "../../Services/QRService";
import AddQRButton from "../../Components/QRCard/Add";

function Home() {
  const {
    fetch: getShorts,
    state: { isLoading, payload: shorts },
  } = useRequest(QRService.get);

  const [cards, setCard] = useState([1]);

  useEffect(() => {
    getShorts();
  }, []);

  useEffect(() => {
    shorts && setCard([...shorts, 1]);
  }, [shorts]);

  const onNewCard = () => {
    setTimeout(() => {
      getShorts();
      setCard((state) => [...state, 1]);
    }, 1000);
  };

  return (
    <Card title="Applications">
      <div style={{ display: "flex", gap: "50px" }}>
        {cards.map((card, index) => (
          <QrCard
            key={card?._id || index}
            defaultAdd={cards.length - 1 === index}
            short={card}
            getShorts={getShorts}
            onNewCard={onNewCard}
          />
        ))}
      </div>
    </Card>
  );
}

export default Home;
