const express= require("express");
const bodyParser = require("body-parser");
const app = express();
const https=require("https");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
          res.sendFile(__dirname + "/signup.html");
});
app.use(express.static("public"));
app.post("/", function(req, res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.eaddress;
  const data={
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields: {
        FNAME:firstname,
        LNAME:lastname
      }
    }
    ]
  };
const jsondata=JSON.stringify(data);
const url="https://us5.api.mailchimp.com/3.0/lists/291a877774";
const options={
  method: "POST",
  auth: "hritik1:3bb84e75036a3ec4fa41584d65736379-us5"
}
const request=https.request(url,options, function(response){
  valueofsucorfail=response.statusCode;
  if(valueofsucorfail==200)
  {
    res.sendFile(__dirname + "/Home.html");
  }
  else{
      res.sendFile(__dirname + "/failure.html");
    }
     response.on("data",function(data){
       console.log(JSON.parse(data));
})
})

request.write(jsondata);
request.end();
});
app.post("/contact", function(req, res){
  const fn=req.body.fname;
  const lna=req.body.lname;
  const ema=req.body.mail;
  const sub=req.body.subject;
  const data={
    members:[
      {
      email_address:ema,
      status:"subscribed",
      merge_fields: {
        FNAME:fn,
        LNAME:lna,
        SUBJECT:sub
      }
    }
    ]
  };
const jsondata1=JSON.stringify(data);
const url="https://us12.api.mailchimp.com/3.0/lists/e0fe95f20a";
const options={
  method: "POST",
  auth: "hritik1:2e369d34574ede8ed5efe37ed16735d7-us12"
}
const request1=https.request(url,options, function(response){
  valueofsucorfail=response.statusCode;
  if(valueofsucorfail==200)
  {
    res.sendFile(__dirname + "/suc.html");
  }
  else{
       res.sendFile(__dirname + "/failure.html");
  }
     response.on("data",function(data){
       console.log(JSON.parse(data));
})
})

request1.write(jsondata1);
request1.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});
app.post("/Home", function(req, res){
  res.redirect("/");
});
app.post("/Home1", function(req, res){
  res.sendFile(__dirname + "/contact.html");
});




app.listen(process.env.PORT || 3000, function(){
console.log("server started on port 3000");});
//API key :- 49f9d23249f7be7a582fca8ce8a75e98-us5
//291a877774
