const express = require("express")
const {Favorite,Favorited,AddToFavorite,removeFromFavorite} = require("../controllers/favorite")

const router = express.Router()

router.route("/favoriteNumber").post(Favorite)
router.route("/favorited").post(Favorited)
router.route("/AddToFavorites").post(AddToFavorite)
router.route("/removeFromFavorites").post(removeFromFavorite);

module.exports = router