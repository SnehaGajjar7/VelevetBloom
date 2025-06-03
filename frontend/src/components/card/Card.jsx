import React, { useContext, useState } from "react";
import "./Card.css";
import { useNavigate, Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoMdTrendingUp } from "react-icons/io";
import { GiFlowerEmblem } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { CartContext } from "../../context/CartContext";
import NotificationBubble from "../notification/Notification";

const Card = ({ product }) => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { addToWishlist, wishlist,url } = useContext(CartContext);

  const handleClick = () => {
    if (product._id) {
      navigate(`/product/${product._id}`);
    } else {
      console.error("Product ID is missing:", product);
    }
  };

  return (
    <>
      <NotificationBubble
        message={alert?.message}
        onClose={() => setAlert(null)}
      />
      <div className="collection-card" onClick={handleClick}>
        {product.isNew && (
          <div className="badge new">
            New <GiFlowerEmblem />
          </div>
        )}
        {product.isTrending && (
          <div className="badge trending">
            Trending <IoMdTrendingUp />
          </div>
        )}
        <div
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist(product._id);
            setAlert({ message: "Saved to your bouquet of wishes " });
            setTimeout(() => setAlert(null), 3000);
          }}
        >
          {(
            Array.isArray(wishlist)
              ? wishlist.includes(product._id)
              : wishlist[product._id]
          ) ? (
            <BsHeartFill color="#8a5ca6" className="heart" />
          ) : (
            <BsHeart color="#8a5ca6" className="heart" />
          )}
        </div>
        <Link to={`/product/${product._id}`}>
          {product.image && (
            <img
              src={`${url}/uploads/${product.image}`}
              alt={product.name}
              className="collection-image"
            />
          )}
        </Link>

        <div className="collection-info">
          <h3 className="collection-name">{product.name}</h3>

          <div className="price-rating">
            <p className="collection-price">₹{product.price}</p>
            {product.averageRating > 0 ? (
              <p className="avg-rating">{product.averageRating} ★</p>
            ) : (
              <p className=""></p>
            )}
          </div>

          <p className="delivery">
            From our garden to their door on same-day..
            <MdDeliveryDining fontSize="20px" />
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
