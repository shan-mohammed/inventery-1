const express = require ("express")

const router = express.Router();

const {
    getAllItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem
} =require ("../controllers/inventoryController")

const validateInventory = require("../middleware/validation")

// Get all item
router.get("/",getAllItems);

// Get single Item
router.get("/:id",getItemById);

// Add item

router.post("/",validateInventory,addItem);

// Update item
router.put ("/:id",validateInventory,updateItem);

// Delete item
router.delete("/:id",deleteItem);

module.exports=router