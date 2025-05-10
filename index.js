const express = require("express");
const app= express();
const PORT = process.env.PORT|| 3000;

app.use(express.json());


app.post("/processData", (req,res)=>{
    const data = req.body.data;


    if(!Array.isArray(data)){
        return res.status(400).json({ is_success: false , message : "Invalid Input Format , Expected an Array"});
    }


    const even_numbers=[];
    const odd_numbers=[];
    const alphabets=[];

    data.forEach(item=>{
        if(!isNaN(item)){
            const num = parseInt(item);
            if(num%2==0){
                even_numbers.push(item);
            }else{
                odd_numbers.push(item);
            }
        }else if(/^[a-zA-Z]$/.test(item)){
            alphabets.push(item.toUpperCase());
        }
    });

    const response = {
        is_success : true,
        user_id : "sajalmishra361",
        email:"sajalmishra361@gmail.com",
        roll_number : "0827CS221237",
        odd_numbers,
        even_numbers,
        alphabets
    };

    res.json(response);

});



app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})