var fetch = require('node-fetch');

// full screen size for apps is going to be 850 x 350

//GLOBALS
//OpenWeather lubbock code = 5525577
var state;  //(str) current state of mirror ("inactive", "home", or name of application in fullscreen);
var current_weather_data;  //json of local weather data
var weekly_weather_data
var c;  //for video capture
var din; //!font for header (DO NOT USE WITH CHROME)


async function preload() {
    current_weather_data = await get_current_weather_data(5525577);
    weekly_weather_data = await get_weekly_weather_data(5525577);
    //!din = loadFont('fonts/D-DIN.otf')
}


async function setup() {
    createCanvas(1000, 500);
    c = createCapture(VIDEO);
    c.size(1000,500);
    c.hide();  //prevents duplicate feed

}


function draw() {
    //background(0,0,0);
    //mirror_camera();
    //draw_header();
    draw_weather_fullscreen();
}


function draw_header () {
    //textFont(din);

    draw_weather();
    draw_date();
}


function draw_clock() {}


function draw_weather_fullscreen() {
    background(33,33,33);

    fill(1, 14, 36);
    rect(75, 75, 850, 350);

    //divide into 5 sections for forecast
    stroke(255,255,255);
    line(245, 75, 245, 425);
    line(415, 75, 415, 425);
    line(585, 75, 585, 425);
    line(755, 75, 755, 425);

    if ((weekly_weather_data != null) && (current_weather_data != null)) {
        draw_weather_fullscreen_data();
    }
}


function draw_weather_fullscreen_data() {
    //objects for next 5 days
    var day1 = current_weather_data;
    var day2 = weekly_weather_data.list[5];
    var day3 = weekly_weather_data.list[13];
    var day4 = weekly_weather_data.list[21];
    var day5 = weekly_weather_data.list[29];

    draw_weather_window(day1, 145, 150);
    draw_weather_window(day2, 330, 150);
    draw_weather_window(day3, 500, 150);
    draw_weather_window(day4, 670, 150);
    draw_weather_window(day5, 840, 150);
}


function draw_weather_window(data, x, y) {
    fill(255,255,255);
    textSize(30);
    textFont('Georgia');
    textAlign(CENTER);

    let f = to_fahrenheit(data.main.temp);
    let degrees = f + '\xB0'

    text(degrees, x, y);
}


function get_weekly_weather_data(cityID) {
    var key = 'c716233d515c9bd6c5a36ad3cf719885';
    return fetch('http://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&appid=' + key).then(response => response.json())
}


function draw_weather() {
    data = current_weather_data;
    if (data != null) {  //workaround for javascript's fucking async bullshit
        let f = to_fahrenheit(data.main.temp);  //calculate fahrenheit
        let degrees = f + '\xB0'  //unicode symbol for degree

        fill(255,255,255);
        textSize(30);
        textFont('Georgia');
        textAlign(RIGHT);
        text(degrees, 985, 35);
    }
}


function to_fahrenheit(k) {
    return Math.round(((parseFloat(k)-273.15)*1.8)+32);
}


function get_current_weather_data(cityID) {
    var key = 'c716233d515c9bd6c5a36ad3cf719885';
    return fetch('http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key).then(response => response.json());
  }


function draw_date() {
    let date = get_date();

    fill(255,255,255);
    textSize(30);
    textFont('Georgia');
    textAlign(CENTER);
    text(date, 500, 35);
}


function get_date() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();

    return today.toLocaleDateString("en-US", options);  //nicely formatted date
}


function draw_home() {
    fill(255, 255, 255);
    ellipse(125, 435, 75, 75);
    ellipse(250, 435, 75, 75);
    ellipse(375, 435, 75, 75);
    ellipse(500, 435, 75, 75);
    ellipse(625, 435, 75, 75);
    ellipse(750, 435, 75, 75);

    fill(77,77,77);
    ellipse(875, 435, 75, 75);
}


function draw_initial() {
    ellipse(960,460,50,50);
}


//CAMERA FUNCTIONS

//Flips camera feed horizontally to mimic real mirror
function mirror_camera() {
    translate(c.width, 0);
    scale(-1, 1);
    image(c, 0, 0, 1000, 500);
    translate(c.width, 0);
    scale(-1, 1);
}


function zoom() {}


function detect_motion() {}


//INITIALIZE OBJECTS
