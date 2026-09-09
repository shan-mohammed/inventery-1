const express = require ("express")
const app =express()
const dotenv =require("dotenv")

const inventoryRoutes =require("./routes/inventoryRoutes")
const errorHandler =require("./middleware/errorHandler")

dotenv.config();

// middleware
app.use(express.json())

// Home route
app.get("/",(req,res)=>{
    res.json({
        success : true,
        message :"inventory management API is running"
    })
})

// Inventory routes
app.use("/api/inventory",inventoryRoutes);

// Error handler
app.use (errorHandler);
const PORT =process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`)
})