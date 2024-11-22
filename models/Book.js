const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  BookID: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), // Auto-generate ID
    unique: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
  },
  PublishedYear: {
    type: Number,
  },
  IsAvailable: {
    type: Boolean,
    default: true,
  },
  OwnerID: {
    type: String, required: true
  },
  
},{ timestamps: true } );

module.exports = mongoose.model('Book', bookSchema);
