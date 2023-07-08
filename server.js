let express = require("express");
let bodyParser = require("body-parser");
let twilio = require("twilio");
const mongoose =require("mongoose")


let path = require("path");
const app = express();
const  userSchema = new mongoose.Schema({
    name: String,
    Age: Number,
    Mobile: Number,
    reason: String,
    gender: String
})

const User =mongoose.model('User', userSchema)


const {check ,validationResult}= require('express-validator')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Html page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Naren.html");
});
 
mongoose.connect('mongodb+srv://dtamilselvan1004:ZckymPDPkoTD5Hyd@narenphysio.qcjypw2.mongodb.net/')
.then(() => {
  console.log(`Database connected successfully`)
}).catch(()=>{
  console.log("Database Not connected"); 
})


app.post(
  "/send-message",
  [
    check("Mobile")
      .matches(/^\d{10}$/)
      .withMessage("invalid mobile number"),
    check('Age')
    .matches(/^\d{2}$/)
      .withMessage("Age must contain numbers"),
  ],
 async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    res.send("Apoointment Booked");
    let clientName = req.body.name;
  let clientAge = req.body.Age;
  let clientMobileNO = req.body.Mobile;
  let clientGender = req.body.Gender;
  let clientReason= req.body.reason
  let messageContent = clientName + "  " + " Contact: "+" " + clientMobileNO + " Reason: " + clientReason+" Is Looking For An Appointment";

  console.log(messageContent);
  const accountSid = "AC4d6e3c697bc85e708bfaf804e38d2505";
  const authToken = "7340767a827a5a7557b0bbd9f9f83895";
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({ body: messageContent, from: "+14065085750", to: "+919361784871" })
    
    const data = new User(req.body)  
     
    await data.save()
  });

app.use(express.static(path.join(__dirname, "/public")));

app.listen(process.env.PORT || 3000, function () {
  console.log("port is running on 3000");
});
