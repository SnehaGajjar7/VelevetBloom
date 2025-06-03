import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "vase",
    occassion: "anniversary",
    decoration: "home",
    type: "rose",
    contains: "",
    isNew: false,
    isTrending: false,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", data);

    try {
      const formData = new FormData();

      // Append main fields
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("occassion", data.occassion);
      formData.append("decoration", data.decoration);
      formData.append("type", data.type);
      formData.append("contains", data.contains);
      formData.append("isNew", data.isNew);
      formData.append("isTrending", data.isTrending);

      // Append main image
      if (mainImage) {
        formData.append("mainImage", mainImage);
      }

      galleryImages.forEach((file) => {
        formData.append("galleryImages", file);
      });

      const response = await axios.post(`${url}/api/flower/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        // Reset the form
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
          occassion: "",
          decoration: "",
          type: "",
          contains: "",
        });
        setMainImage(null);
        setGalleryImages([]);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="add">
      <form className="add-form" onSubmit={submitHandler}>
        <h2>Add a New Flower</h2>
        <div className="add-img-upload">
          <label htmlFor="mainImage">
            Main Image
            <img
              src={
                mainImage instanceof Blob
                  ? URL.createObjectURL(mainImage)
                  : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            type="file"
            id="mainImage"
            onChange={(e) => setMainImage(e.target.files[0])}
            accept="image/*"
            hidden
            required
          />

          <label htmlFor="galleryImages">
            Gallery of Images
            <div className="gallery-preview">
              {galleryImages.length > 0 ? (
                galleryImages.map((file, i) =>
                  file instanceof Blob ? (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt={`Gallery Preview ${i}`}
                    />
                  ) : null
                )
              ) : (
                <img src={assets.upload_area} alt="Upload area" />
              )}
            </div>
          </label>
          <input
            type="file"
            id="galleryImages"
            multiple
            onChange={(e) => setGalleryImages(Array.from(e.target.files))}
            accept="image/*"
            hidden
          />
        </div>

        <div className="add-grid">
          <div className="input-block">
            <label>Product Name</label>
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="e.g. Rose Basket"
              required
            />
          </div>

          <div className="input-block">
            <label>Product Price (₹)</label>
            <input
              name="price"
              type="number"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="e.g. 599"
              required
            />
          </div>

          <div className="input-block">
            <label>Category</label>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="vase">Vase</option>
              <option value="box">Box</option>
              <option value="bouquet">Bouquete</option>
              <option value="plant">Plant</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-block">
            <label>Occasion</label>
            <select
              name="occassion"
              onChange={onChangeHandler}
              value={data.occassion}
            >
              <option value="" disabled>
                Select Occassion
              </option>
              <option value="anniversary">Anniversary</option>
              <option value="babyshower">Baby Shower</option>
              <option value="birthday">Birthday</option>
              <option value="friendship">Friendship Day</option>
              <option value="mother">Mother's Day</option>
              <option value="father">Father's Day</option>
              <option value="valentine">Valentine's Day</option>
              <option value="diwali">Diwali Special</option>
              <option value="rakshabandhan">Raksha Bandhan</option>
              <option value="wedding">Wedding</option>
            </select>
          </div>

          <div className="input-block">
            <label>Decoration</label>
            <select
              name="decoration"
              onChange={onChangeHandler}
              value={data.decoration}
            >
              <option value="" disabled>
                Select Decor
              </option>
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="garden">Garden</option>
              <option value="party">Party</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-block">
            <label>Flower Type</label>
            <select name="type" onChange={onChangeHandler} value={data.type}>
              <option value="" disabled>
                Select Type
              </option>
              <option value="rose">Roses</option>
              <option value="lily">Lily</option>
              <option value="sunflower">Sunflowers</option>
              <option value="tulip">Tulip</option>
              <option value="jasmine">Jasmine</option>
              <option value="daisy">Daisy</option>
              <option value="lavender">Lavender</option>
              <option value="marigold">Marigold</option>
              <option value="orchid">Orchide</option>
              <option value="peony">Peony</option>
              <option value="carnation">Carnation</option>
              <option value="cherry">Cherry</option>
              <option value="dry">Dry</option>
              <option value="gladiolus">Gladiolus</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>

        <div className="input-block wide">
          <label>Product Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="4"
            placeholder="Describe this product..."
            required
          />
        </div>

        <div className="input-block wide">
          <label>Contains</label>
          <input
            name="contains"
            value={data.contains}
            onChange={onChangeHandler}
            placeholder="e.g. 10 Red Roses, Greeting Card, Chocolates"
          />
        </div>
        <div className="input-block">
          <label>
            <input
              type="checkbox"
              name="isNew"
              onChange={(e) =>
                setData((prev) => ({ ...prev, isNew: e.target.checked }))
              }
              checked={data.isNew || false}
            />
            Mark as New Arrival
          </label>
        </div>

        <div className="input-block">
          <label>
            <input
              type="checkbox"
              name="isTrending"
              onChange={(e) =>
                setData((prev) => ({ ...prev, isTrending: e.target.checked }))
              }
              checked={data.isTrending || false}
            />
            Mark as Trending
          </label>
        </div>

        <button className="add-btn" type="submit">
          🌸 Add Flower
        </button>
      </form>
    </div>
  );
};

export default Add;
