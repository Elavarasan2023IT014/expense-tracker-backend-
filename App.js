
const express = require('express')
const app  = express()
app.use(express.json())
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const url = "mongodb+srv://elavarasanr2023it:Elavarasan987@cluster0.eqz5z.mongodb.net/Mern-Expense";
port = 8001;
mongoose
    .connect(url)
    .then(()=>{
        console.log("DB connected")
        app.listen(port,()=>{
            console.log(`MY server is Running http://localhost:${port}`);
        })
    })
const expenseSchema = new mongoose.Schema({
    id:{type:String , required:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true},
});

const expenseModel = mongoose.model("expense-tracker",expenseSchema);//collection_name,schema_name

app.post("/api/expense",async(req,res)=>{
    const { title, amount} = req.body;
    const newExpense = new expenseModel({
        id:uuidv4(),
        title:title,
        amount:amount,
    });
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
});

app.put("/api/expense/:id",async(req,res)=>{
    const {id}=req.params;
    const {title,amount} =req.body;
    const updateExpense = await expenseModel.findOneAndUpdate(
        {
            id:id,
        },
        {
            title:title,
            amount:amount,
        },
        {
           new : true, 
        }
    )
    res.status(200).json(updateExpense);
})

app.get("/api/expense",async (req,res)=>{
    const exp=await expenseModel.find({});
    res.json(exp);
});

app.get("/api/expense/:id",async (req,res)=>{
    const {id}=req.params;
    const exp=await expenseModel.find({id});
    res.json(exp);
});

app.delete("/api/expense/:id",async (req,res)=>{
    const {id} = req.params; 
    const exp = await expenseModel.findOneAndDelete({id});
    res.json(exp);
});