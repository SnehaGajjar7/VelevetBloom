import React, { useEffect, useState } from "react";
import "./ProductGrid.css";
import axios from "axios";
import { IoMdTrendingUp } from "react-icons/io";
import { SiCodefresh } from "react-icons/si";
import Card from "../card/Card";

const ProductGrid = ({ url }) => {
  const [flowers, setFlowers] = useState([]);
 
  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const res = await axios.get(`${url}/api/flower/list`);
        if (res.data.success) {
          setFlowers(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch flowers:", error);
      }
    };

    fetchFlowers();
  }, [url]);

  const newArrivals = flowers.filter((item) => item.isNew);
  const trending = flowers.filter((item) => item.isTrending);

  return (
    <div className="product-container" id="arrivals">
      {/* NEW ARRIVALS SECTION */}
      {newArrivals.length > 0 && (
        <>
          <h2 className="productgrid-title">
            Fresh Collection <SiCodefresh />
          </h2>
          <div className="product-layout">
            <div className="product-grid">
              {newArrivals.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* TRENDING SECTION */}
      {trending.length > 0 && (
        <>
          <h2 className="productgrid-title">
            Trending Now <IoMdTrendingUp />
          </h2>

          <div className="product-grid">
            {trending.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
