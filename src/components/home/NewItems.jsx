import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import ItemContent from "./ItemContent";
import { PrevArrow, NextArrow } from "./CustomSliderArrows";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewItems = async () => {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      const updatedItems = data.map((item) => ({
        ...item,
        countdown: item.expiryDate ? calculateCountdown(item.expiryDate) : null,
      }));
      setItems(updatedItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching new items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewItems();
  }, []);

  const calculateCountdown = (expiryDate) => {
    const now = new Date().getTime();
    const end = parseInt(expiryDate, 10);

    if (isNaN(end)) {
      return "Invalid Date";
    }

    const timeRemaining = end - now;

    if (timeRemaining <= 0) return "Expired";
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...sliderSettings}>
            {items.map((item) => (
              <ItemContent key={item.nftId} item={item} loading={loading} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
