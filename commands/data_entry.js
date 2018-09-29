const winston = require('winston');
const fs = require('fs');
const request = require('request');
const moment = require('moment');

const { Channel } = require('../models/Channel');
const { Show } = require('../models/Show');
const { Quiz } = require('../models/Quiz');
const scraped_data = require('../data/data.json');

require('../startup/logging')();
require('../startup/db')();

//async function insertData() {
    // scraped_data.channel_names.forEach((channel_name) => {
    //     const channel = new Channel({ name: channel_name });
    //     channel.save();
    // });

    // const channel_1 = await Channel.findById("5bae0920f068174fe90707eb");
    // scraped_data.show_names_1.forEach((show_name, index) => {
    //     const show = new Show({ name: show_name.trim(), channel: channel_1 });
    //     show.save();
    //     const file_name = "public/img/shows/" + show._id + ".jpg";
    //     downloadFromWeb(scraped_data.show_images_1[index], file_name);
    // });

    // const channel_2 = await Channel.findById("5bae0920f068174fe90707ec");
    // scraped_data.show_names_2.forEach((show_name, index) => {
    //     const show = new Show({ name: show_name.trim(), channel: channel_2 });
    //     show.save();
    //     const file_name = "public/img/shows/" + show._id + ".jpg";
    //     downloadFromWeb(scraped_data.show_images_2[index], file_name);
    // });

    // const channel_3 = await Channel.findById("5bae0920f068174fe90707ed");
    // let processed_names = []; //show_names_3 has duplicates as this is taken from schedule
    // scraped_data.show_names_3.forEach((show_name) => {
    //     show_name = show_name.trim();
    //     if(!processed_names.includes(show_name)) {
    //         processed_names.push(show_name);
    //         const show = new Show({ name: show_name, channel: channel_3 });
    //         show.save();
    //     }
    // });

    // scraped_data.show_details_3.forEach(async (show_details) => {
    //     const show = await Show.findOne({ 'name': show_details.programmename });
    //     console.log(show);
    //     const file_name = "public/img/shows/" + show._id + ".jpg";
    //     downloadFromWeb(show_details.imagefilepath, file_name });
    // });
//}
//insertData();

async function scheduleShows() {
    scraped_data.channel_1_slots.forEach(async (show_info) => {
        if(!show_info.id)
            return;
        
        const show = await Show.findOne({ "_id" : show_info.id });
        const slots = show_info.slot.split(";");
        slots.forEach(slot => {
            const days = slot.split(", ")[0];
            const days_list = days == "Mon - Fri" ? [1, 2, 3, 4, 5] : [6, 0];
            days_list.forEach(async (week_day) => {
                const schedule_time = moment(slot.split(", ")[1], "h:m a").day(week_day + 7).toDate();
                quiz = new Quiz({ show: show, start_time: schedule_time, price_pool: 10000 });
                quiz.save();
            })
        });
    });
}

scheduleShows();

async function downloadFromWeb(uri, filename) {
    console.log(uri + " : " + filename);
    await new Promise(resolve =>
        request(uri)
            .pipe(fs.createWriteStream(filename))
            .on('finish', resolve));
};