const winston = require('winston');
const fs = require('fs');
const request = require('request');

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

const show_names_1 = ["Kaun Banega Crorepati Season 10", "Comedy Circus", "Main Maayke Chali Jaaungi Tum Dekhte Rahiyo", "Yeh Un Dinon Ki Baat Hai", "Indian Idol Season 10", "Porus", "Dus Ka Dum", "CID", "Crime Patrol Dial 100", "Mere Sai - Shraddha Aur Saburi", "Vighnaharta Ganesh", "Zindagi Ke Crossroads", "Family Time With Kapil Sharma", "Rishta Likhenge Hum Naya", "Yeh Pyaar Nahi Toh Kya Hai", "Crime Patrol Satark", "Prithvi Vallabh", "Ek Deewaana Tha", "Super Dancer Chapter 2", "Haasil", "The Kapil Sharma Show", "Beyhadh", "Kuch Rang Pyar Ke Aise Bhi", "Pehredaar Piya Ki", "The Drama Company", "Peshwa Bajirao", "Yeh Moh Moh Ke Dhaage", "Sankatmochan Mahabali Hanumaan", "Jaat Ki Jugni", "Jassi Jaissi Koi Nahin", "Entertainment Ke Liye Kuch Bhi Karega", "Sabse Bada Kalakar", "Karamchand", "Ek Rishta Saajhedari Ka", "Bharat Ka Veer Putra Maharana Pratap", "Suryaputra Karn", "Parvarish Season 2", "Ek Duje Ke Vaaste", "Bade Bhaiyya Ki Dulhania", "Mann Mein Vishwaas Hai", "Super Dancer", "Family No. 1", "Baat Hamari Pakki Hai", "Adaalat", "Comedy Circus Ka Naya Daur", "Adaalat 2", "Adaalat", "Reporters", "Itna Karo Na Mujhe Pyaar", "Yudh", "Humsafars", "Dil Ki Baatein Dil Hi Jane", "2025 Jaane Kya Hoga Aagey", "Rishta.com", "Ekk Nayi Pehchaan", "Ladies Special", "Kahin Na Kahin Koi Hai", "Bade Acche Lagte Hai", "Love Marriage Ya Arranged Marriage", "Mooh Boli Shaadi", "Khotey Sikkey", "Hum Hain Na", "Sanjeev Kapoor Ke Kitchen Khiladi", "Main Naa Bhoolungi", "Achanak 37 Saal Baad", "Aahat 7", "Aahat 5", "Aahat 3", "Aahat 2", "Kuch Toh Log Kahenge", "Cook It Up With Tarla Dalal", "Kutumb", "Rajuben", "Powder", "Mahi Way", "Har Kadam Par Shaque", "Chamatkar"];
const show_names_2 = ["Aladdin", "Taarak Mehta Ka Ooltah Chashmah", "India Ke Mast Kalandar", "Namune", "Super Sisters", "Jijaji Chhat Per Hain", "Tenali Rama", "Sajan Re Phir Jhoot Mat Bolo", "Partners Trouble Ho Gayi Double", "Shrimaan Shrimati Phir Se", "Saat Phero Ki Hera Pherie", "Aadat Se Majboor", "TV, Biwi Aur Main", "Chidiya Ghar", "Dil Deke Dekho", "Icchapyaari Naagin", "Trideviyaan", "Shankar Jai Kishan 3 in 1", "Office Office", "Khatmal-E-Ishque", "Baalveer", "Yaro Ka Tashan", "Woh Teri Bhabhi Hai Pagle", "Gupp Chupp", "Jeannie Aur Juju", "Badi Dooooor Se Aaye Hai", "Sahib Biwi Aur Boss", "Yam Hain Hum", "Dr. Bhanumati On Duty", "Dr. Madhumati On Duty", "Khidki", "R.K. Laxman Ki Duniya", "Krishan Kanhaiya", "Hum Aapke Ghar Mein Rehte Hain", "Yes Boss", "FIR", "Left Right Left", "Lapataganj Ek Baar Phir", "Bhai Bhaiya Aur Brother!!!", "Police Factory", "Rumm Pumm Po", "Mrs. Tendulkar", "Chalti Ka Naam Gaadi...Let's Go", "Chintu Aur Pintu", "Peterson Hill"];
const show_names_3 = ["Kasautii Zindagii Kay ", "Yeh Rishta Kya Kehlata Hai ", "Nazar ", "Ye Hai Mohabbatein ", "Yeh Rishta Kya Kehlata Hai ", "Kasautii Zindagii Kay ", "Kullfi Kumarr Bajewala ", "Krishna Chali London ", "Yeh Rishta Kya Kehlata Hai ", "Ye Hai Mohabbatein ", "Mariam Khan Reporting Live ", "Ishqbaaaz ", "Kasautii Zindagii Kay ", "Ye Hai Mohabbatein ", "Yeh Rishta Kya Kehlata Hai ", "Mariam Khan Reporting Live ", "Kullfi Kumarr Bajewala ", "Ishqbaaaz ", "Mariam Khan Reporting Live ", "Ye Hai Mohabbatein ", "Kullfi Kumarr Bajewala ", "Yeh Rishta Kya Kehlata Hai ", "Krishna Chali London ", "Ye Hai Mohabbatein ", "Kullfi Kumarr Bajewala ", "Yeh Rishta Kya Kehlata Hai ", "Kasautii Zindagii Kay ", "Nazar ", "Ye Hai Mohabbatein ", "Yeh Rishta Kya Kehlata Hai ", "Kullfi Kumarr Bajewala ", "Kasautii Zindagii Kay ", "Krishna Chali London ", "Nazar ", "Mariam Khan Reporting Live ", "Kasautii Zindagii Kay ", "Yeh Rishta Kya Kehlata Hai ", "Ye Hai Mohabbatein ", "Nazar ", "Kullfi Kumarr Bajewala ", "Kasautii Zindagii Kay ", "Yeh Rishta Kya Kehlata Hai ", "Nazar ", "Mariam Khan Reporting Live ", "Kasautii Zindagii Kay ", "Kullfi Kumarr Bajewala ", "Krishna Chali London ", "Yeh Rishta Kya Kehlata Hai ", "Ishqbaaaz ", "Ye Hai Mohabbatein ", "Nazar ", "Kullfi Kumarr Bajewala "];
const show_details_3 = [
    { "programmename": "Ye Hai Mohabbatein", "genre": "TV Show", "synopsis": "Ishita requests Raman to go and work in his office; when Sudha spots Aliya at a cafe with her dad, she vows to destroy the Bhallas\u0027 happiness.", "programmedubbedlanguagename": "Hindi", "imagefilepath": "http://imagesstartv.whatsonindia.com/dasimages/landscape/360x270/AD157EE119B30CB213899D23EE110FFADAD30B9CJ.jpg", "productionyear": "2013", "episodeshorttitle": null, "programtitle": "is playing on Today, September 28 at 10:30 PM on STAR PLUS channel " },
    { "programmename": "Nazar", "genre": "TV Show", "synopsis": "Vedashree urges the family to help her take Ruby out of Ansh\u0027s life. Mohana rejects this and proclaims that Ansh will become the son of a witch after the eclipse.", "programmedubbedlanguagename": "Hindi", "imagefilepath": "http://imagesstartv.whatsonindia.com/dasimages/landscape/360x270/B0F2B01D8CC0696233FE0C4A2A8730BCABFCF1E8Q.jpg", "productionyear": "0", "episodeshorttitle": null, "programtitle": "is playing on Today, September 28 at 11:00 PM on STAR PLUS channel " },
    { "programmename": "Kullfi Kumarr Bajewala", "genre": "TV Show", "synopsis": "Kullfi is an immensely talented girl who sings exceptionally well. She sets out on a journey to reunite with her father, Sikandar Singh Gill.", "programmedubbedlanguagename": "Hindi", "imagefilepath": "http://imagesstartv.whatsonindia.com/dasimages/landscape/360x270/1C3ED76C28D77B2E87DA48EFD4C3032BDBEB2FE64.jpg", "productionyear": "0", "episodeshorttitle": null, "programtitle": "is playing on Today, September 28 at 11:30 PM on STAR PLUS channel " },
    { "programmename": "Krishna Chali London", "genre": "TV Show", "synopsis": "Krishna decorates Radhey\u0027s hospital room with balloons and sings and dances for him. When she finally confesses her love for him, Radhey gets emotional.", "programmedubbedlanguagename": "Hindi", "imagefilepath": "http://imagesstartv.whatsonindia.com/dasimages/landscape/360x270/460FF078885FB9FD0B4D70558814EABB4FAA6AB62.jpg", "productionyear": "2018", "episodeshorttitle": null, "programtitle": "is playing on Today, September 28 at 09:00 PM on STAR PLUS channel " },
    { "programmename": "Mariam Khan Reporting Live", "genre": "TV Show", "synopsis": "When Majaaz questions Hamdam about Mariam\u0027s whereabouts, he criticises him for trusting Aayat with Mariam and informs him about Aayat\u0027s true intentions, which leaves Majaaz devastated.", "programmedubbedlanguagename": "Hindi", "imagefilepath": "http://imagesstartv.whatsonindia.com/dasimages/landscape/360x270/6C8C6D8F47F5338792B0D0D279EC1E614683BC608.jpg", "productionyear": "0", "episodeshorttitle": null, "programtitle": "is playing on Today, September 28 at 07:30 PM on STAR PLUS channel " },
    { "programmename": "Kasautii Zindagii Kay", "genre": "TV Show", "synopsis": "Somebody sets the Durga pooja pandal on fire and Prerna and Anjali get stuck in a room. Anurag jumps inside the blazing fire and safely brings them out.", "programmedubbedlanguagename": "Hindi", "imagefilepath": "http://imagesstartv.whatsonindia.com/dasimages/landscape/360x270/2ADB2B2BEC23F889EA79FC2F80C726282555A83EW.jpg", "productionyear": "0", "episodeshorttitle": null, "programtitle": "is playing on Today, September 28 at 08:00 PM on STAR PLUS channel " },
    { "programmename": "Yeh Rishta Kya Kehlata Hai", "genre": "TV Show", "synopsis": "Naira gets ready to go for Kartik\u0027s wedding ceremony but her father stops her. However, she ends up going and proves Kartik that she can move on from him.", "programmedubbedlanguagename": "Hindi", "imagefilepath": "http://imagesstartv.whatsonindia.com/dasimages/landscape/360x270/6954777C2B5F3F2867B2EF52C44723E7C55BE4F8T.jpg", "productionyear": "2009", "episodeshorttitle": null, "programtitle": "is playing on Today, September 28 at 06:30 PM on STAR PLUS channel " },
    { "programmename": "Ishqbaaaz", "genre": "TV Show", "synopsis": "Shivaay impersonates himself as Majnu Singh Awara and stays in Oberoi Mansion. Shivaay finds Nancy at a bar who was presumed dead.", "programmedubbedlanguagename": "Hindi", "imagefilepath": "http://imagesstartv.whatsonindia.com/dasimages/landscape/360x270/7CE7708CA0DE3090E0F03FF94D644CE331B6A07A8.jpg", "productionyear": "2016", "episodeshorttitle": null, "programtitle": "is playing on Today, September 28 at 04:00 AM on STAR PLUS channel " }
];
async function insertShows() {
    // const channel_1 = await Channel.findById("5bae0920f068174fe90707eb");
    // show_names_1.forEach((show_name) => {
    //     const show = new Show({ name: show_name, channel: channel_1 });
    //     show.save();
    // });

    // const channel_2 = await Channel.findById("5bae0920f068174fe90707ec");
    // show_names_2.forEach((show_name) => {
    //     const show = new Show({ name: show_name, channel: channel_2 });
    //     show.save();
    // });

    // const channel_3 = await Channel.findById("5bae0920f068174fe90707ed");
    // let processed_names = []; //show_names_3 has duplicates as this is taken from schedule
    // show_names_3.forEach((show_name) => {
    //     show_name = show_name.trim();
    //     if(!processed_names.includes(show_name)) {
    //         processed_names.push(show_name);
    //         const show = new Show({ name: show_name, channel: channel_3 });
    //         show.save();
    //     }
    // });

    show_details_3.forEach(async (show_details) => {
        const show = await Show.findOne({ 'name': show_details.programmename });
        console.log(show);
        const file_name = "public/img/shows/" + show._id + ".jpg";
        downloadFromWeb(show_details.imagefilepath, file_name, ()=>{ console.log("callback for "+show.name) });
    });
}
insertShows();


function downloadFromWeb(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};