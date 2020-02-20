const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Show  = require('../models/Show').Cake;

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
      .model('Show')
      .find({})
      .then (shows => res.json(shows))
      .catch(err => res
        .status(500)
        .json({ok: false})
      );
  });

  // GET a single cake by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('Show')
    .findOne({_id: req.params.id})
    .then (show => res.json(show))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new show
router.post('/', (req, res) => {
  return new Show({
    title     : req.body.title,
  })
  .save()
  .then (show => Show.populate(show, {path: '_id'}))
  .then (show => res.json(show))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a topic with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Show
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a cake
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Show
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
        title  : req.body.title,
      }},
      {new: true}
    )
    .then (show => Show.populate(show, {path: '_id'}))
    .then (show => res.json(show))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

  module.exports = router;