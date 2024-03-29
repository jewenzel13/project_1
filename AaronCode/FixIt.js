let State = 'Calendar';
let HealthState = 'Exercise';
let Calendar, Exercise, Move, Sleep, Stand, Step, ExerButton, MovButton, SleeButton, StanButton, SteButton, calButton, musButton, mapButton, healButton, backButton;
// let backImg;

function setup() {
    createCanvas(1000,500);
    background(228,229,240);
    // backImg = createImg('https://source.unsplash.com/random/1000x500');
    // backImg.hide();
    Calendar = loadImage('Calendar.png');
    Exercise = loadImage('Exercise Goal.png');
    Move = loadImage('Move Goal.png');
    Sleep = loadImage('Sleep Goal.png');
    Stand = loadImage('Stand Goal.png');
    Step = loadImage('Step Goal.png');
    createHealth();
    buttonMaker();
}

function draw() {
    background(228, 229, 240);
    // tint(255, 127);
    // image(backImg, 0, 0, 1000, 500);
    // tint(255, 255);
    // fill(228, 229, 240);
    // rect(50, 50, 875, 375);
    let i = State;
    if(i === 'Map') {
        hideHealth();
        hideAll();
        select('#map', HTMLElement).position(75,75);
        select('#map', HTMLElement).show();
    } else if(i === 'Music') {
        hideHealth();
        hideAll();
        select('#music', HTMLElement).position(75, 75);
        select('#music', HTMLElement).show();
    } else if(i === 'Calendar') {
        hideHealth();
        hideAll();
        select('#calendar', HTMLElement).position(75,75);
        select('#calendar', HTMLElement).show();
    } else if(i === 'Health') {
        hideAll();
        hideOther();
        showHealth();
        if(HealthState === 'Exercise') {
            image(Exercise, 75, 75, 850, 350);
        } else if(HealthState === 'Move') {
            image(Move, 75, 75, 850, 350);
        } else if(HealthState === 'Sleep') {
            image(Sleep, 75, 75, 850, 350);
        } else if(HealthState === 'Stand') {
            image(Stand, 75, 75, 850, 350);
        } else if(HealthState === 'Step') {
            image(Step, 75, 75, 850, 350);
        }
    }
}

function buttonMaker() {
    healButton = createButton('Health');
    healButton.position(75, 50);
    healButton.mousePressed(HealthButton);
    calButton = createButton('Calendar');
    calButton.position(325, 50);
    calButton.mousePressed(CalendarButton);
    musButton = createButton('Music');
    musButton.position( 600, 50);
    musButton.mousePressed(MusicButton);
    mapButton = createButton('Map');
    mapButton.position(885, 50);
    mapButton.mousePressed(MapResults);
    backButton = createButton('<- Back');
    backButton.position(75, 50);
    backButton.hide();
    backButton.mousePressed(HealthButton);
}

function showOther() {
    calButton.show();
    musButton.show();
    mapButton.show();
}

function hideOther() {
    calButton.hide();
    musButton.hide();
    mapButton.hide();
}

function createHealth() {
    ExerButton = createButton('Exercise Results');
    ExerButton.position(200,50);
    ExerButton.mousePressed(ExerciseButton);
    MovButton = createButton('Move Results');
    MovButton.position(325, 50);
    MovButton.mousePressed(MoveButton);
    SleeButton = createButton('Sleep Results');
    SleeButton.position(450, 50);
    SleeButton.mousePressed(SleepButton);
    StanButton = createButton('Stand Results');
    StanButton.position(575, 50);
    StanButton.mousePressed(StandButton);
    SteButton = createButton('Step Results');
    SteButton.position(700, 50);
    SteButton.mousePressed(StepButton);
}

function showHealth() {
    ExerButton.show();
    MovButton.show();
    SleeButton.show();
    SteButton.show();
    StanButton.show();
    backButton.show();
    healButton.hide();
}

function hideHealth() {
    ExerButton.hide();
    MovButton.hide();
    SleeButton.hide();
    SteButton.hide();
    StanButton.hide();
    backButton.hide();
    healButton.show();
}

function hideAll() {
    select('#map', HTMLElement).hide();
    select('#calendar', HTMLElement).hide();
    select('#music', HTMLElement).hide();
}

function HealthButton() {
    if(State === 'Health') {
        State = 'Map';
        backButton.show();
        showOther();
    } else {
        State = 'Health';
        healButton.show();
        backButton.hide();
    }
}

function MapResults() {
    State = 'Map';
}

function MusicButton() {
    State = 'Music';
}

function CalendarButton() {
    State = 'Calendar';
}

function ExerciseButton() {
    HealthState = 'Exercise';
}

function MoveButton() {
    HealthState = 'Move';
}

function SleepButton() {
    HealthState = 'Sleep';
}

function StandButton() {
    HealthState = 'Stand';
}

function StepButton() {
    HealthState = 'Step';
}
