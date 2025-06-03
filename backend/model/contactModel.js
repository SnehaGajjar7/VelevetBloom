import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  imagePath: String,  // new field for image
  createdAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },

});



const contactModel = mongoose.model('contact', contactSchema);

export default contactModel
