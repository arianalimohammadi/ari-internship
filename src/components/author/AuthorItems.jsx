import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const AuthorItems = () => {
  const { id } = useParams();
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthorItems(response.data.nftCollection);
      } catch (error) {
        console.error("Error fetching author items:", error);
        setError("Failed to load author items.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorItems();
  }, [id]);

  if (loading) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <Skeleton height={250} />
                  <Skeleton count={1} />
                  <Skeleton count={1} width={100} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="de_tab_content">
        <p>{error}</p>
      </div>
    );
  }

  if (!authorItems || authorItems.length === 0) {
    return (
      <div className="de_tab_content">
        <p>No items found.</p>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorItems.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img
                      className="lazy"
                      src={item.authorImage || "default-author.jpg"}
                      alt={item.authorName || "Author"}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
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
                      src={item.nftImage || "default-nft.jpg"}
                      className="lazy nft__item_preview"
                      alt={item.title || "NFT"}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title || "NFT Title"}</h4>
                  </Link>
                  <div className="nft__item_price">
                    {item.price || "N/A"} ETH
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes || "0"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
