import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext"
import "./WishList.css";
import { Link } from "react-router-dom";

const WishList = () => {
  const { wishlist, collections,url } = useContext(CartContext);
  

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      <div className="wishlist-grid">
        {collections.length > 0 ? (
          collections.map((item) => {
            if (wishlist[item.id] > 0) {
              return (
                <Link to={`/product/${item.id}`}>
                <div key={item.id} className="wishlist-card">
                  <img
                    src={`${url}/uploads/${item.image}`}
                    alt={item.name}
                    className="wishlist-item-img"
                  />
                  <div className="collection-info">
                    <h3 className="collection-name">{item.name}</h3>
                    <div className="collection-des">
                      <p className="collection-price">₹{item.price}</p>
                    </div>
                  </div>
                </div>
                </Link>
              );
            }
          })
        ) : (
          <p>No items found for this </p>
        )}
      </div>
    </div>
  );
};

export default WishList;