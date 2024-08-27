import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotCollections = async () => {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hot collections:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotCollections();
  }, []);

  const PrevArrow = ({ className, style, onClick }) => (
    <button
      className={className}
      style={{
        ...style,
        display: "flex justify-center",
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
        display: "flex justify-center",
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...sliderSettings}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="col-12" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton height={200} width={200} />{" "}
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton circle height={40} width={40} />{" "}
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton height={20} width={120} />{" "}
                        <Skeleton height={15} width={80} />{" "}
                      </div>
                    </div>
                  </div>
                ))
              : collections.map((collection, index) => (
                  <div className="col-12" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={collection.AuthorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
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

export default HotCollections;
