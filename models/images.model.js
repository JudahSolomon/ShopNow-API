const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    typeof: "string",
    required: true,
  },
  image: {
    data: String,
    required: true,
    contentType: String,
  },
});

const imageModel = mongoose.model("Image", imageSchema);

module.exports = imageModel;
