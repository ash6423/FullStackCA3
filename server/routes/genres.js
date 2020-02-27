const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Genre  = require('../models/Genre').Genre;

/**
 * Functionality for this route:
 *  C   POST    /Cakes/        Create a new Cake
 *  R   GET     /Cakes         Gets an array of all Cakes
 *  R   GET     /Cakes/:id     Get a single Cake, by ID
 *  U   PUT     /Cakes/:id     Update a single Cake, by id
 *  D   DELETE  /Cakes/:id     Delete a single Cake, by ID
 */

// GET an array of all Cakes
router.get('/', (req, res) => {
    return mongoose
      .model('Genre')
      .find({})
      .then (genres => res.json(genres))
      .catch(err => res
        .status(500)
        .json({ok: false})
      );
  });

  // GET a single cake by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('Genre')
    .findOne({_id: req.params.id})
    .then (genre => res.json(genre))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new show
router.post('/', (req, res) => {
  return new Genre({
    Genre     : req.body.Genre,
  })
  .save()
  .then (genre => Genre.populate(genre, {path: '_id'}))
  .then (genre => res.json(genre))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a topic with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Genre
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a cake
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Genre
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
        Genre  : req.body.Genre,
      }},
      {new: true}
    )
    .then (genre => Genre.populate(genre, {path: '_id'}))
    .then (genre => res.json(genre))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

  module.exports = router;