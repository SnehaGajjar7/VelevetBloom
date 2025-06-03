import React from "react";
import "./Home.css";
import Slide from "../../components/slide/Slide";
import ProductGrid from "../../components/product/ProductGrid";
import About from "../../components/About/About";
import Feedback from "../feedback/Feedback";

const Home = () => {
  return (
    <>
      <Slide />
      <section id="product-grid">
        <ProductGrid url={"http://localhost:5000"} />
      </section>
      <About />
      <Feedback />
    </>
  );
};

export default Home;
