const mongoose = require("mongoose");
const Items = require("./items");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: [2, "Category name must me 2 characters"],
  },
  description: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

categorySchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Items.deleteMany({ category: doc._id });
    console.log(`Items Related to the Category: ${this.name} are deleted`);
  }
});

const Category = new mongoose.model("Category", categorySchema);

module.exports = Category;
