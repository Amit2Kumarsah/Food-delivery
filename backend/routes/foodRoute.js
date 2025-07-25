const express = require('express');
const {addFood, listFood, removeFood} = require('../controllers/FoodController'); // ✅ No curly braces
const multer = require('multer');

const foodRouter = express.Router();  // Correct way to create a router

// Image storage engine
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route for adding food
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

// Export the router
module.exports = foodRouter;
