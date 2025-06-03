import React, { useContext } from "react";
import "./Collection.css";
import { useParams} from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FaSeedling } from "react-icons/fa6";
import Card from "../card/Card";

const Collection = () => {
  const { filterType, filterValue } = useParams();
  
  const { collections } =
    useContext(CartContext);
  const filtered = collections.filter((item) => {
    const value = item[filterType];
    return (
      typeof value === "string" &&
      value.toLowerCase() === filterValue.toLowerCase()
    );
  });

  return (
    <div className="collection-container">
      <h2 className="section-title">
        {filterValue?.toUpperCase()} COLLECTION <FaSeedling color="rgb(117, 131, 99)" />
      </h2>
      <div className="collection-grid">
        {filtered.length > 0 ? (
           filtered.map((product) => <Card key={product._id} product={product} />)
        ) : (
          <p>No items found for this {filterType}</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
