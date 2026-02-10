const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a course title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    instructor: {
      type: String,
      required: [true, 'Please add an instructor name'],
    },
    duration: {
      type: String,
      required: [true, 'Please add duration'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    thumbnail: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
