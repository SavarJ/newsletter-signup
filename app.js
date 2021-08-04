const express = require("express");
const https = require("https");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
    update_existing: true,
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

    //Reading the data (json) obj from the https response (from mailchimp)
    httpsResponse.on("data", function (_data) {
      sendFeedback(res, httpsResponse.statusCode, JSON.parse(_data));
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
    "-------------------------------------------------------------------------------------------------------"
  );
  console.log("Server is running on port 3000");
});

function sendFeedback(res, statusCode, data) {
  if (statusCode === 200 && data.error_count === 0) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
}
