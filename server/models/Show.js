const mongoose  = require('mongoose');
const validator = require('validator');

const SchemeConfig = {timestamps: true, skipVersioning: true};
const ShowSchema  = new mongoose.Schema({

    Title: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },
    
    Seasons: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },
    
    FirstEpisodeDate: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },
    
    FinalEpisodeDate: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },
    
    NoOfEpisodes: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    }

  }, SchemeConfig);

  module.exports.Show = mongoose.model('Show', ShowSchema);