const express = require("express")
const bodyparser =require("body-parser")
const MongoClient =require("./database/connection")
const app = express()
const webHookModel = require("./database/WebHook.model")

MongoClient().then(()=>{
    console.log("connected")
})
.catch(console.log)


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get("/" ,(req,res)=>{
    res.send(" welcome to hands on demo of webhook")
})



//get all webhook
app.get("/api/webhook",(req,res)=>{
    webHookModel.find().then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"Successfully fetched"
        });
    }).catch(err=>{
        res.json({
            flag:false,
            data:null,
            message:err.message
        })
    })
})
//create WebHook

app.post("/api/webhook",(req,res)=>{
    let body = req.body;

    webHookModel
    .create(body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"Successfully fetched"
        });

    }).catch(err=>{
        res.json({
            flag:false,
            data:null,
            message:err.message
        })
    })

})
//Update webhook


app.put("/api/webhook/:id",(req,res)=>{
    let body=req.body;

    webHookModel 
    .findByIdAndUpdate(req.params.id,body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"sucessfully updated"
        });
    }).catch(err=>{
        res.json({
            flag:false,
            data:null,
            message:err.message
        })
    })
})
//delete

app.delete("/api/webhook/:id",(req,res)=>{
    let body=req.body;

    webHookModel 
    .findByIdAndRemove(req.params.id,function(err,wh){
        if(err)
        {
            res.json({
                flag:false,
                data:null,
                message:err.message
            });
        }
        else{
            res.json({
                flag:true,
                data:wh,
                message:"sucessfully deleted"
            });
        }
    });
})
app.listen(3000)

// .then((wh)=>{
//     console.log("server is sucessfully")
//     res.json({
//         flag :true,
//         data:wh,
//         message:"sucessfully updated"
//     });
// })