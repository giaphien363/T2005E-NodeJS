const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT,function () {
    console.log("server is running...");
});

app.use(express.static("public"));
app.set("view engine","ejs");


app.get("/",function (req,res) {
    res.sendFile(__dirname+"/views/home.html");
});
app.get("/login",function (req,res) {
    let obj={
        name:"nguyen van A",
        age:18
    }
    res.send(obj);
});

var counter = 0;
app.get("/ass13",function (req,res) {
    // res.sendFile(__dirname+"/views/ass13.html");
    let title = "du bao thoi tiet";
    counter ++;
    res.render("ass13",{
        title:title,
        counter:counter
    });
});

const fs = require("fs");
app.get("/danh-muc",function (req,res) {
    let cats = fs.readFileSync("data/data.json","UTF-8");
    cats =JSON.parse(cats);
    res.render("lab_10",
        {
           cats:cats
        });
});

app.get("/chi-tiet/:id",function (req,res) {
    let ID = req.params.id;
    let cats = fs.readFileSync("data/data.json","UTF-8");
    cats =JSON.parse(cats);
    let count =0;
    cats.map(e=>{
        count++;
        if (e.id ==ID){
            res.render("chitiet",{
                cat:e
            });
            count=0;
        };
    });
    if (count>= cats.length){
        res.send("not found");
    };
});



// assignment 15
app.get("/assignment15",function (req,res) {
    let title ="assignment 15";
    let items = fs.readFileSync("data/ass15.json","UTF-8");
    items =JSON.parse(items);
    res.render("assignment_10",
        {
            items:items,
            title:title
        }
    );
});
