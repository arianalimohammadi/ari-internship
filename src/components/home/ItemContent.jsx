import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import CountdownTimer from './CountdownTimer';

const ItemContent = ({ item, loading }) => {
  if (loading) {
    return (
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
    );
  }

  const now = new Date().getTime();
  const hasExpired = !item.expiryDate || now > parseInt(item.expiryDate, 10);

  return (
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
  );
};

export default ItemContent;
