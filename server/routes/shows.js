const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Show   = require('../models/Show').Show;

/**
 * Functionality for this route:
 *  C   POST    /Shows/        Create a new Show
 *  R   GET     /Shows         Gets an array of all Shows
 *  R   GET     /Shows/:id     Get a single Show, by ID
 *  U   PUT     /Shows/:id     Update a single Show, by id
 *  D   DELETE  /Shows/:id     Delete a single Show, by ID
 */

// GET an array of all Shows
router.get('/', (req, res) => {
    return mongoose
      .model('Show')
      .find({})
      .then (Shows => res.json(Shows))
      .catch(err => res
        .status(500)
        .json({ok: false})
      );
  });

  // GET a single Show by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('Show')
    .findOne({_id: req.params.id})
    .then (Show => res.json(Show))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new Show
router.post('/', (req, res) => {
  return new Show({
    title     : req.body.title,
  })
  .save()
  .then (Show => Show.populate(Show, {path: '_id'}))
  .then (Show => res.json(Show))
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

// PUT Update a Show
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Show
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
        title  : req.body.title,
      }},
      {new: true}
    )
    .then (Show => Show.populate(Show, {path: '_id'}))
    .then (Show => res.json(Show))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

  module.exports = router;