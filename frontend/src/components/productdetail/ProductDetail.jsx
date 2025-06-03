import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { CartContext } from "../../context/CartContext";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import NotificationBubble from "../notification/Notification";
import Card from "../card/Card";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, token, url } = useContext(CartContext);
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [averageRating, setAverageRating] = useState(0);
  const [relatedFlowers, setRelatedFlowers] = useState([]);
  const [alert, setAlert] = useState(null);

  const handleAddToCart = async () => {
    try {
      await addToCart(flower._id); // You can modify this in context
      setAlert({ message: "Bloom added to your basket!" });
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error("Failed to add to cart with delivery info", err);
    }
  };
  

  useEffect(() => {
    const fetchRelated = async () => {
      if (!flower || !flower.category) return;

      try {
        const res = await axios.get(
          `${url}/api/flower/${id}/related`
        );
        if (res.data.success) {
          setRelatedFlowers(res.data.data);
          console.log("Category of base flower:", flower.category);
          console.log("Found related:", res.data.data);
        }
      } catch (err) {
        console.error("Error fetching related flowers", err);
      }
    };

    fetchRelated();
  }, [flower]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${url}/api/flower/${id}`
        );
        if (response.data.success) {
          setFlower(response.data.data);
          setMainImage(response.data.data.image); // set default image
          console.log("Fetched flower:", response.data.data);
        } else {
          setFlower(null);
        }
      } catch (error) {
        setFlower(null);
      }
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);
  const submitReview = async () => {
    if (!token) {
      alert("Please login to submit a review.");
      return;
    }

    try {
      await axios.post(
        `${url}/api/flower/${id}/reviews`,
        { rating: newReview.rating, comment: newReview.comment },
        {
          headers: {
            token: token,
          },
        }
      );

      setAlert({ message: "Review submitted successfully!" });

      // After submitting review, fetch updated product data including reviews
      const updatedResponse = await axios.get(
        `${url}/api/flower/${id}`
      );
      if (updatedResponse.data.success) {
        setFlower(updatedResponse.data.data);
      }

      setNewReview({ rating: 0, comment: "" });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({ message: "Failed to submit review." });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1); // 1 decimal point
  };
  useEffect(() => {
    if (flower && flower.reviews) {
      setAverageRating(calculateAverageRating(flower.reviews));
    }
  }, [flower]);

  if (loading) return <div>Loading...</div>;
  if (!flower) return <div>Product not found.</div>;

  return (
    <>
      <NotificationBubble
        message={alert?.message}
        onClose={() => setAlert(null)}
      />

      <div className="product-detail-container">
        <div className="product-content">
          <div className="product-image-wrapper">
            <div className="image-gallery-container">
              {flower.imageGallery?.map((img, index) => (
                <img
                  key={index}
                  src={`${url}/uploads/${img}`}
                  alt={`Gallery ${index}`}
                  className={`image-thumbnail ${
                    mainImage === img ? "active" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            <img
              src={`${url}/uploads/${mainImage}`}
              alt={flower.name}
              className="main-product-image fade-in"
              loading="lazy"
            />
          </div>
          <div className="right-detail">
            <div className="product-info">
              <div className="title-rate">
                <h1 className="product-title">{flower.name}</h1>
                {averageRating > 0 && (
                  <span className="average-rating"> ({averageRating} ★)</span>
                )}
              </div>
              <p className="product-price">₹{flower.price}</p>

              <p className="product-description">{flower.description}</p>
              <div className="product-tags">
                <p>{flower.category}</p>
                <p>{flower.occassion}</p>
                <p>{flower.decoration}</p>
                <p>{flower.type}</p>
              </div>

              {flower.contains && flower.contains.length > 0 && (
                <div className="product-contains">
                  <h3>More Detail:</h3>
                  <ul>
                    {flower.contains.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            

              <button
                className="basket-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                  setAlert({ message: "Bloom added to your basket!" });
                  setTimeout(() => setAlert(null), 3000);
                }}
              >
                Send to Basket <FaShoppingBasket className="basket-icon" />
              </button>
            </div>

            <div className="reviews-section">
              {flower.numReviews > 0 ? (
                <>
                  <h4>
                    {flower.numReviews === 1 ? "Review" : "Reviews"} (
                    {flower.numReviews}){" "}
                  </h4>

                  {flower.reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <FaUserCircle color="gray" fontSize="30px" />
                      <div className="review-right-side">
                        <strong>{review.name}</strong>
                        <span>
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </span>

                        <p>{review.comment}</p>
                        <small>
                          {new Date(review.createdAt).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>No one has reviewed this beauty yet. Why not you?</p>
              )}
            </div>

            {/* Review Form */}
            <div className="review-form">
              <h3>Add a Review</h3>
              <label>
                Rating:
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: Number(e.target.value),
                    })
                  }
                >
                  <option value={0}>Select rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      ( {r} ★)
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Comment:
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                />
              </label>

              <button onClick={submitReview}>Submit Review</button>
            </div>
          </div>
        </div>
        <h2 className="product-title">Explore Similar Items</h2>
        <div className="related-product">
          {relatedFlowers.length > 0 ? (
            relatedFlowers.map((product) => (
              <Card key={product._id} product={product} />
            ))
          ) : (
            <p>No items found for this</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
