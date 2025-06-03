import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FaHeart } from "react-icons/fa6";
import { IoIosBasket } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { BsBoxSeamFill } from "react-icons/bs";
import LogoutModal from "../logout/Logout";

const Navbar = ({ setShowLogin }) => {
  const [flower, setFlower] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(CartContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <img src={assets.logo} alt="logo" className="logo" />
        </div>
        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <Link to={"/"}>
            <li
              onClick={() => setFlower("home")}
              className={flower === "home" ? "active" : ""}
            >
              Home
            </li>
          </Link>
          <li className="dropdown">
            <span
              onClick={() => setFlower("collection")}
              className={flower === "collection" ? "active" : ""}
            >
              Collection
            </span>
            <div className="mega-menu">
              <div className="mega-menu-column">
                <h4>Shop by Category</h4>
                <Link to="/collection/category/vase">Flower in Vase</Link>
                <Link to="/collection/category/box">Flower in Box</Link>
                <Link to="/collection/category/bouquet">Flowers Bouquet</Link>
                <Link to="/collection/category/plant">Plants</Link>
                <Link to="/collection/category/other">Other</Link>
              </div>
              <div className="mega-menu-column">
                <h4>By Occassion</h4>
                <Link to="/collection/occassion/anniversary">Anniversary</Link>
                <Link to="/collection/occassion/babyshower">Baby Shower</Link>
                <Link to="/collection/occassion/birthday">Birthday</Link>
                <Link to="/collection/occassion/friendship">
                  Friendship Day
                </Link>
                <Link to="/collection/occassion/mother">Mother's Day</Link>
                <Link to="/collection/occassion/father">Father's Day</Link>
                <Link to="/collection/occassion/valentine">Valentines Day</Link>
                <Link to="/collection/occassion/diwali">Diwali Special</Link>
                <Link to="/collection/occassion/rakshabandhan">
                  Raksha Bandhan
                </Link>
                <Link to="/collection/occassion/wedding">Wedding</Link>
              </div>
            </div>
          </li>
          <li className="dropdown">
            <span
              onClick={() => setFlower("decoration")}
              className={flower === "decoration" ? "active" : ""}
            >
              Decoration
            </span>
            <div className="mega-menu">
              <div className="mega-menu-column">
                <h4>Decoration</h4>
                <Link to="/collection/decoration/home">Home</Link>
                <Link to="/collection/decoration/office">Office</Link>
                <Link to="/collection/decoration/garden">Garden</Link>
                <Link to="/collection/decoration/party">Party</Link>
              </div>
            </div>
          </li>

          <li className="dropdown">
            <span
              onClick={() => setFlower("flowers")}
              className={flower === "flowers" ? "active" : ""}
            >
              Flowers
            </span>
            <div className="mega-menu">
              <div className="mega-menu-column">
                <h4>Flower Types</h4>
                <Link to="/collection/type/rose">Roses</Link>
                <Link to="/collection/type/lily">Lilis</Link>
                <Link to="/collection/type/sunflower">Sunflowers</Link>
                <Link to="/collection/type/tulip">Tulip</Link>
                <Link to="/collection/type/jasmine">Jasmine</Link>
                <Link to="/collection/type/daisy">Daisy</Link>
                <Link to="/collection/type/lavender">Lavender</Link>
                <Link to="/collection/type/marigold">Marigold</Link>
                <Link to="/collection/type/orchid">Orchide</Link>
                <Link to="/collection/type/peony">Peony</Link>
                <Link to="/collection/type/carnation">Carnation</Link>
                <Link to="/collection/type/cherry">Cherry</Link>
                <Link to="/collection/type/dry">Dry</Link>
                <Link to="/collection/type/gladiolus">Gladiolus</Link>
                <Link to="/collection/type/mixed">Mixed</Link>
              </div>
            </div>
          </li>
          <Link to={"/blogs"}>
            <li
              onClick={() => setFlower("blog")}
              className={flower === "blog" ? "active" : ""}
            >
              Blogs
            </li>
          </Link>
          <Link to={"/contact"}>
            <li
              onClick={() => setFlower("contact")}
              className={flower === "contact" ? "active" : ""}
            >
              Feedback
            </li>
          </Link>
        </ul>
        <div className="navbar-right">
          <Link to={"/wishlist"}>
            <FaHeart color="#8a5ca6" fontSize="25px" />
          </Link>
          <div className="navbar-search-icon">
            <Link to={"/cart"}>
              <IoIosBasket color="rgb(117, 131, 99)" fontSize="30px" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className="navbar-profile">
              <FaUser fontSize="25px" color="rgb(141, 139, 145)" />
              <ul className="nav-profile-dropdown">
                <li
                  onClick={() => {
                    navigate("/myorders");
                  }}
                >
                  <BsBoxSeamFill />
                  <p>Orders</p>
                </li>
                <hr />
                <li
                  onClick={() => {
                    setShowLogoutModal(true);
                  }}
                >
                  <IoIosLogOut />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <LogoutModal
          onConfirm={logout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
