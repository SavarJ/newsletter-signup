// Requiring express and https
const express = require("express");
const https = require("https");

//Requiring and configuring dotenv
require("dotenv").config();

//running the express app
const app = express();

//Get the data from the html form
app.use(express.urlencoded({ extended: true }));

//Sending the static files to client (css, images)
app.use(express.static("public"));

//Responding to the home route request to send the signup.html page
app.get("/", function (req, res) {
  console.log("Someone is on the homepage!");
  res.sendFile(__dirname + "/signup.html");
});

//When the user submits the form on the signup.html page, do this:
app.post("/", function (req, res) {
  //Reading the values of the form
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  //Making a js object
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  //converting it to a json object
  const jsonData = JSON.stringify(data);

  //List id from mailchimp (which list the data should go to)
  const listID = process.env.LIST_ID;

  //Mailchimp api endpoint url
  const url = "https://us6.api.mailchimp.com/3.0/lists/" + listID;

  //https package options
  const options = {
    method: "POST",

    //user:mailchimpAPIKEY
    auth: "savar1:" + process.env.API_KEY,
  };

  //Making the post request to the mailchimp api and saving it
  const httpsRequest = https.request(url, options, function (httpsResponse) {
    console.log("statusCode:", httpsResponse.statusCode);

    //Sending the success or failure message
    sendFeedback(res, httpsResponse.statusCode);

    //Reading the data (json) obj from the https response (from mailchimp)
    httpsResponse.on("data", function (_data) {
      // console.log(JSON.parse(_data));
    });
  });

  //Sending the json object
  httpsRequest.write(jsonData);
  httpsRequest.end();

  console.log(firstName, lastName, email);
});

app.get("/retry", function (req, res) {
  console.log("Someone is retrying to subscribe");
  res.redirect("/");
});

app.listen(3000, function () {
  console.log(
    "----------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log("Server is running on port 3000");
});

function sendFeedback(res, statusCode) {
  if (statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
}
