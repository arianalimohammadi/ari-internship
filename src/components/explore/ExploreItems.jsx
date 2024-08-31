import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemContent from "../home/ItemContent";
const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExploreItems = async () => {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setItems(data.slice(0, 8));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching explore items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreItems();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.map((item) => (
        <ItemContent key={item.nftId} item={item} loading={loading} />
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
