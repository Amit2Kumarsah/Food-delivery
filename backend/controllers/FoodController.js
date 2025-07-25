const foodModel = require("../models/foodModel");
const Food = require("../models/foodModel");
const fs = require("fs");

// add food item

const addFood = async (req, res) => {
  // res.send('Add food item endpoint hit');
  let image_filename = `${req.file.filename}`;
  const food = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ sucess: true, message: " Food added", food: food });
  } catch (err) {
    res.json({
      sucess: false,
      message: "Error in adding food item",
      error: err.message,
    });
    console.log(err);
  }
};

// all food list

const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ sucess: true, data: foods });
  } catch (err) {
    res.json({
      sucess: false,
      message: "Error in fetching food items",
      error: err.message,
    });
    console.log(err);
  }
};

// remove food item

const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    const foodDelete = await Food.findByIdAndDelete(req.body.id);
    if (!foodDelete) {
      return res.json({ sucess: false, message: "Food item not found" });
    }
    res.json({ sucess: true, message: "Food item removed sucessfully" });
  } catch (err) {
    res.json({ sucess: false, message: " Error in removing food item" });
  }
};



module.exports = { addFood, listFood, removeFood };
