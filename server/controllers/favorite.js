const Favorite = require('../models/favorite')

module.exports = {
  Favorite: async (req, res) => {
    Favorite.find({ movieId: req.body.movieId }).exec((err, favorite) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, favoriteNumber: favorite.length });
    });
  },

  Favorited: async (req, res) => {
    Favorite.find({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec((err, favorite) => {
      if (err) return res.status(400).send(err);

      //hoe can we know that the movie has been favorited
      let result = false;
      if (favorite.length !== 0) {
        result = true;
      }
      res.status(200).json({ success: true, favorited: result });
    });
  },
  AddToFavorite: async (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, doc });
    });
  },
  removeFromFavorite: async (req, res) => {
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err,doc)=>{
        if(err) return res.json({success: false, err})
        res.status(200).json({success: true, doc})
    })
  },
};