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

const show_names_1 = ["Kaun Banega Crorepati Season 10", "Comedy Circus", "Main Maayke Chali Jaaungi Tum Dekhte Rahiyo", "Yeh Un Dinon Ki Baat Hai", "Indian Idol Season 10", "Porus", "Dus Ka Dum", "CID", "Crime Patrol Dial 100", "Mere Sai - Shraddha Aur Saburi", "Vighnaharta Ganesh", "Zindagi Ke Crossroads", "Family Time With Kapil Sharma", "Rishta Likhenge Hum Naya", "Yeh Pyaar Nahi Toh Kya Hai", "Crime Patrol Satark", "Prithvi Vallabh", "Ek Deewaana Tha", "Super Dancer Chapter 2", "Haasil", "The Kapil Sharma Show", "Beyhadh", "Kuch Rang Pyar Ke Aise Bhi", "Pehredaar Piya Ki", "The Drama Company", "Peshwa Bajirao", "Yeh Moh Moh Ke Dhaage", "Sankatmochan Mahabali Hanumaan", "Jaat Ki Jugni", "Jassi Jaissi Koi Nahin", "Entertainment Ke Liye Kuch Bhi Karega", "Sabse Bada Kalakar", "Karamchand", "Ek Rishta Saajhedari Ka", "Bharat Ka Veer Putra Maharana Pratap", "Suryaputra Karn", "Parvarish Season 2", "Ek Duje Ke Vaaste", "Bade Bhaiyya Ki Dulhania", "Mann Mein Vishwaas Hai", "Super Dancer", "Family No. 1", "Baat Hamari Pakki Hai", "Adaalat", "Comedy Circus Ka Naya Daur", "Adaalat 2", "Adaalat", "Reporters", "Itna Karo Na Mujhe Pyaar", "Yudh", "Humsafars", "Dil Ki Baatein Dil Hi Jane", "2025 Jaane Kya Hoga Aagey", "Rishta.com", "Ekk Nayi Pehchaan", "Ladies Special", "Kahin Na Kahin Koi Hai", "Bade Acche Lagte Hai", "Love Marriage Ya Arranged Marriage", "Mooh Boli Shaadi", "Khotey Sikkey", "Hum Hain Na", "Sanjeev Kapoor Ke Kitchen Khiladi", "Main Naa Bhoolungi", "Achanak 37 Saal Baad", "Aahat 7", "Aahat 5", "Aahat 3", "Aahat 2", "Kuch Toh Log Kahenge", "Cook It Up With Tarla Dalal", "Kutumb", "Rajuben", "Powder", "Mahi Way", "Har Kadam Par Shaque", "Chamatkar"];
const show_names_2 = ["Aladdin", "Taarak Mehta Ka Ooltah Chashmah", "India Ke Mast Kalandar", "Namune", "Super Sisters", "Jijaji Chhat Per Hain", "Tenali Rama", "Sajan Re Phir Jhoot Mat Bolo", "Partners Trouble Ho Gayi Double", "Shrimaan Shrimati Phir Se", "Saat Phero Ki Hera Pherie", "Aadat Se Majboor", "TV, Biwi Aur Main", "Chidiya Ghar", "Dil Deke Dekho", "Icchapyaari Naagin", "Trideviyaan", "Shankar Jai Kishan 3 in 1", "Office Office", "Khatmal-E-Ishque", "Baalveer", "Yaro Ka Tashan", "Woh Teri Bhabhi Hai Pagle", "Gupp Chupp", "Jeannie Aur Juju", "Badi Dooooor Se Aaye Hai", "Sahib Biwi Aur Boss", "Yam Hain Hum", "Dr. Bhanumati On Duty", "Dr. Madhumati On Duty", "Khidki", "R.K. Laxman Ki Duniya", "Krishan Kanhaiya", "Hum Aapke Ghar Mein Rehte Hain", "Yes Boss", "FIR", "Left Right Left", "Lapataganj Ek Baar Phir", "Bhai Bhaiya Aur Brother!!!", "Police Factory", "Rumm Pumm Po", "Mrs. Tendulkar", "Chalti Ka Naam Gaadi...Let's Go", "Chintu Aur Pintu", "Peterson Hill"];
const show_names_3 = ["Kasautii Zindagii Kay ", "Yeh Rishta Kya Kehlata Hai ", "Nazar ", "Ye Hai Mohabbatein ", "Yeh Rishta Kya Kehlata Hai ", "Kasautii Zindagii Kay ", "Kullfi Kumarr Bajewala ", "Krishna Chali London ", "Yeh Rishta Kya Kehlata Hai ", "Ye Hai Mohabbatein ", "Mariam Khan Reporting Live ", "Ishqbaaaz ", "Kasautii Zindagii Kay ", "Ye Hai Mohabbatein ", "Yeh Rishta Kya Kehlata Hai ", "Mariam Khan Reporting Live ", "Kullfi Kumarr Bajewala ", "Ishqbaaaz ", "Mariam Khan Reporting Live ", "Ye Hai Mohabbatein ", "Kullfi Kumarr Bajewala ", "Yeh Rishta Kya Kehlata Hai ", "Krishna Chali London ", "Ye Hai Mohabbatein ", "Kullfi Kumarr Bajewala ", "Yeh Rishta Kya Kehlata Hai ", "Kasautii Zindagii Kay ", "Nazar ", "Ye Hai Mohabbatein ", "Yeh Rishta Kya Kehlata Hai ", "Kullfi Kumarr Bajewala ", "Kasautii Zindagii Kay ", "Krishna Chali London ", "Nazar ", "Mariam Khan Reporting Live ", "Kasautii Zindagii Kay ", "Yeh Rishta Kya Kehlata Hai ", "Ye Hai Mohabbatein ", "Nazar ", "Kullfi Kumarr Bajewala ", "Kasautii Zindagii Kay ", "Yeh Rishta Kya Kehlata Hai ", "Nazar ", "Mariam Khan Reporting Live ", "Kasautii Zindagii Kay ", "Kullfi Kumarr Bajewala ", "Krishna Chali London ", "Yeh Rishta Kya Kehlata Hai ", "Ishqbaaaz ", "Ye Hai Mohabbatein ", "Nazar ", "Kullfi Kumarr Bajewala "];
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
}
insertShows();