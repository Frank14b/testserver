// node server js to fetch and refresh data

const app = require("express")();
var express = require("express");
const axios = require("axios");
const http = require("http").createServer(app);
const socketIO = require("socket.io");

const io = socketIO(http, {
    cors: {
        origin: "*",
        credentials: false,
    },
});

var async = require("async");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

var socketMap = [];
http.listen(4000, () => {
    console.log("listning to port 4000");
});

io.on("connection", (socket) => {
    console.log("Client Connected");
    socketMap.push(socket);
    dataUpdate();
});

async function dataUpdate() {
    console.log("Socket Emmit");

    axios
        .get("https://api.coingecko.com/api/v3/exchange_rates")
        .then((res) => {
            // var charts = await Charts.find({});
            //for (let socketMapObj of socketMap) {
                if (res.data) {
                    io.emit("dataUpdate", [res.data]);
                }
            //}
        })
        .catch((error) => {
            console.error(error);
        });
}
