import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { Link } from "react-router-dom";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch new items from API
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          countdown: item.expiryDate
            ? calculateCountdown(item.expiryDate)
            : null,
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [items]);

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

  // Arrow components for slider
  const PrevArrow = ({ className, style, onClick }) => (
    <button
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        backgroundColor: "gray",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      ◀
    </button>
  );

  const NextArrow = ({ className, style, onClick }) => (
    <button
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        backgroundColor: "gray",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      ▶
    </button>
  );

  // Slider Settings
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
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="col-12" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton circle={true} height={50} width={50} />
                      </div>
                      <Skeleton width={100} />
                      <div className="nft__item_wrap">
                        <Skeleton height={200} />
                      </div>
                      <div className="nft__item_info">
                        <Skeleton width={150} />
                        <Skeleton width={100} />
                      </div>
                    </div>
                  </div>
                ))
              : items.map((item) => (
                  <div className="col-12" key={item.nftId}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorId}`}
                        >
                          <img
                            className="lazy"
                            src={item.authorImage}
                            alt="Author"
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate && (
                        <div className="de_countdown">
                          {item.countdown || "Loading..."}
                        </div>
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
