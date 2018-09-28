const winston = require('winston');

const { Channel } = require('../models/Channel');
const { Show } = require('../models/Show');
const { Quiz } = require('../models/Quiz');

require('../startup/logging')();
require('../startup/db')();

/*const channel = [
    { name: "Sony SET" }, { name: "Sony SAB" }, { name: "Star Plus" }, { name: "Zee TV" }
];
channel.forEach((channel) => {
    const model = new Channel(channel);
    model.save();
});*/


const shows = [
    { name: "Kaun Banega Crorepati Season 10" },
    { name: "Comedy Circus" },
    { name: "Main Maayke Chali Jaaungi Tum Dekhte Rahiyo" },
    { name: "Yeh Un Dinon Ki Baat Hai" },
    { name: "Indian Idol Season 10" },
    { name: "Porus" },
    { name: "Dus Ka Dum" },
    { name: "CID" },
    { name: "Crime Patrol Dial 100" },
    { name: "Mere Sai - Shraddha Aur Saburi" },
    { name: "Vighnaharta Ganesh" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
];