import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemContent from "../home/ItemContent";
import Skeleton from "react-loading-skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchExploreItems = async (filter = "") => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
          filter ? `?filter=${filter}` : ""
        }`
      );
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching explore items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreItems(filter);
  }, [filter]);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setVisibleItems(8);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(visibleItems).fill(0).map((_, index) => (
            <div className="col-12 mb-3" key={index}>
              <Skeleton height={300} />
              <Skeleton height={20} width="80%" />
              <Skeleton height={20} width="60%" />
            </div>
          ))
        : items
            .slice(0, visibleItems)
            .map((item) => (
              <ItemContent key={item.nftId} item={item} loading={loading} />
            ))}

      {visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <button
            onClick={handleLoadMore}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
