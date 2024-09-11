import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        setItemDetails(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton height={400} width={400} />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton height={40} width={200} />
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <Skeleton width={50} />
                      </div>
                      <div className="item_info_like">
                        <Skeleton width={50} />
                      </div>
                    </div>
                    <Skeleton count={3} />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton circle height={50} width={50} />
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton circle height={50} width={50} />
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <Skeleton width={50} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={itemDetails.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemDetails.title} #{itemDetails.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails.likes}
                    </div>
                  </div>
                  <p>
                    {itemDetails.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            <img className="lazy" src={itemDetails.ownerImage} alt="Owner" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.ownerId}`}>{itemDetails.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            <img className="lazy" src={itemDetails.creatorImage} alt="Creator" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.creatorId}`}>{itemDetails.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="ETH" />
                      <span>{itemDetails.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
