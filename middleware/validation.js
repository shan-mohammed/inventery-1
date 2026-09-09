const validateInventory = (req,res,next)=>{

    const {name,category,quantity,price} =req.body;

    if(!name || !category || quantity ===undefined  || price === undefined){
        return res.status(400).json({
            success : false,
            message: "Name ,quantity,category,price are required"
        })
    }

    if(typeof name !=="string" ||typeof category !=="string" ){
        return res.status (400).json({
            success : false ,
            message : "Name  and category must be string"
        })
    }
    if (typeof quantity !== "number" || quantity < 0) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be a positive number"
    });
  }

  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be a positive number"
    });
  }
  next()
}
module. exports =validateInventory