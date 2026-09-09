const inventory = require("../model/inventoryData")


// get all items
const getAllItems = (req,res)=>{
    let result = [...inventory]

    const {category,minQuantity, search} =req.query;
    
    // filter by category
    if(category){
        result=result.filter(
            item=>item.category.toLowerCase() === category.toLowerCase()
        )
    }


    // filter by quantity
    if(minQuantity){
      result = result.filter(
        item=>item.quantity >= Number(minQuantity)
      )  
    }

    // search by item name
    if(search) {
        result = result.filter(
            item=>item.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    res.status(200).json({
        success :true,
        count :result.length,
        data: result
    })
};

// get single item
const getItemById =(req,res)=>{

    const id = Number(req.params.id)

    const item = inventory.find(item=>item.id=== id);

    if(!item){
        return  res.status(404).json({
            success : false,
            messages :"Inventory item not found"

        })
    }
    res.status (200).json({
       success : true,
       data : item

    })
}

// Add item
const addItem =(req,res)=>{

    const {name,category,quantity,price}= req.body

    const newItem ={
        id:inventory.length? Math.max(...inventory.map(item=>item.id)) +1 :1,
        name,
        category,
        quantity,
        price
    };
    inventory.push(newItem);

    res.status(201).json({
        success :true,
        message :"new Item added successfully",
        data : newItem
    })
}
//  Update item

const updateItem =(req,res)=>{

    const id = Number(req.params.id);
    const item = inventory.find(item =>item.id ===id);

    if(!item){
        return res.status(404).json({
            success : false,
            message :"item not found"
        })
    }

    const {name,category,quantity,price}=req.body

if(name !==undefined) item.name = name
if(category!==undefined) item.category =category
if(quantity!==undefined) item.quantity = quantity
if(price !==undefined) item.price = price;

res.status(200).json({
    success :true,
    message :"item updated successfully",
    data :item
})
};
// Delete item
const deleteItem =(req,res)=>{
    const id = Number(req.params.id)

    const index =inventory.findIndex(item=>item.id== id);

    if (index ===-1){
      return  res.status(404).json ({
          success :false,
          message :"inventory item not found"
        })
    }

    const deletedItem =inventory.splice(index,1)

    res.status(200).json({
        success : true,
        message : "item deleted successfully",
        data : deletedItem[0]

 })
}

module.exports = {
    getAllItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem
}