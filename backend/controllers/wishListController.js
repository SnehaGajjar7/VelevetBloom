import userModel from "../model/userModel.js";

export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!userData.wishlist) userData.wishlist = [];

    const itemExists = userData.wishlist.some(id => id && id.toString() === itemId);

    if (itemExists) {
      userData.wishlist = userData.wishlist.filter(
        (id) => id && id.toString() !== itemId
      );
    } else {
      userData.wishlist.push(itemId);
    }

    await userData.save();

    res.json({ success: true, message: "Wishlist updated", wishlist: userData.wishlist });
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const getWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const wishlist = await SomeWishlistModel.find({ user: req.user._id });

    res.json({ message: 'Wishlist GET route works!',wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};




