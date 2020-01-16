const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {email_address: email,
            status: "subscribed",
            merge_fields : {
                FNAME: firstName,
                LNAME: lastName
            }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    var option = {
        url: "https://us4.api.mailchimp.com/3.0/lists/bc3321e782",
        method: "POST",
        headers: {
            "Authorization": "jamie1 1da774cc99c624b956e23d0b98eccd9b-us4"
        },
        body: jsonData
    };
    request(option, function(error, response, body) {
        if (error) {
           // res.send("There was an error signing up. Please try again");
            res.sendFile(__dirname + "/failure.html")
        }
        else {
            if (response.statusCode == 200) {
                // res.send("Successfully subscribed!");
                res.sendFile(__dirname + "/success.html")
            }
            else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    })

});


app.post("/failure", function(req, res) {
    res.redirect("/");
})


//bc3321e782 : list id
//1da774cc99c624b956e23d0b98eccd9b-us4 : key

app.listen(8000, function() {
    console.log("server is running on port 8000!")
})