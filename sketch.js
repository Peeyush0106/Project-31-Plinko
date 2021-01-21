// Initial declarations of variables and constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var frameCount, frameCountIncreaser;
var ground;
var particles = [];

var plinkos_row_1, plinkos_row_2, plinkos_row_3, plinkos_row_4;
var plinkos = [];

var buckets = [];

var safely_entered_particles = [];

var shouldRestartGame;

var createdDisco;

var r_color, g_color, b_color;

// Setup all the objects, variables and properties of the game
function setup() {
    // canvas
    canvasWidth = 480;
    canvasHeight = 800;
    createCanvas(canvasWidth, canvasHeight);

    // Matter.js engine setup
    engine = Engine.create();
    world = engine.world;

    //Edges
    createEdges();

    //Ground
    ground = new Ground(240, 740, width, 20);

    // Frame Count work
    frameCount = 0;
    frameCountIncreaser = 1;

    //Plinko groups
    plinkos_row_1 = [];
    plinkos_row_2 = [];
    plinkos_row_3 = [];
    plinkos_row_4 = [];

    // Create the plinkos
    plinkos.push(plinkos_row_1);
    createPlinkos(40, canvasWidth, 100, random(5, 10), plinkos[0]);

    plinkos.push(plinkos_row_2);
    createPlinkos(60, 440, 210, random(5, 10), plinkos[1]);

    plinkos.push(plinkos_row_3);
    createPlinkos(40, canvasWidth, 320, random(5, 10), plinkos[2]);

    plinkos.push(plinkos_row_4);
    createPlinkos(60, 440, 430, random(5, 10), plinkos[3]);

    // Buckts
    createBuckets(15, 90, 635, 10, 190, "red");

    //Rgb colors for the text
    r_color = 0;
    g_color = 0;
    b_color = 0;
}

function draw() {
    // Initial required function calls    
    background(0);
    updateGame();
    setModes();
    spawnParticle();

    // Display objects
    displayBuckets(buckets);
    for (var i = 0; i < plinkos.length; i++) {
        var plinko_group_for_display = plinkos[i]
        displayPlinkos(plinko_group_for_display);
    }
    ground.display();

    // Texts work
    // Rgb color increment
    r_color += random(0, 25);
    g_color += random(0, 25);
    b_color += random(0, 25);

    // Reset of rgb colors
    if (r_color >= 255) {
        r_color = 0;
    }
    if (g_color >= 255) {
        g_color = 0;
    }
    if (b_color >= 255) {
        b_color = 0;
    }

    // Display the texts according to the colors and variated porperties
    if (Math.round(frameCount) % 20 >= 0 && Math.round(frameCount) % 20 < 10) {
        push();
        if (Math.round(frameCount) % 8 >= 0 && Math.round(frameCount) % 30 < 30000) {
            fill(rgb(random(0, 255), random(0, 255), random(0, 255)));
        }
        textSize(16);
        text("Created by Peeyush Agarwal, also called Peeyush - The Debugger.", 2.5, 500);
        pop();
    }
    push();
    textSize(15);
    fill(r_color, g_color, b_color);
    text("Watch the balls fall down. This presentation shows the chances of an ", 10, 760);
    text("object than falls from a height. It has a 50% chance to fall on the", 25, 775);
    text("either sides of its suspension.", 145, 790);
    pop();
}

// Game updates
function updateGame() {
    Engine.update(engine);
    frameCount += frameCountIncreaser;
    frameCountIncreaser += 0.07;
}

function setModes() {
    // The modes that are set for the code to function according to the modes set for any object image, etc.
    rectMode(CENTER);
    ellipseMode(RADIUS);
    angleMode(RADIANS);
    imageMode(CENTER);
}

// Spawn particles after an interval continuously
function spawnParticle() {
    if (Math.round(frameCount) % 70 === 0) {
        console.log("Ball Spawned");
        var particle1 = new Particle(240, 20, 10);
        var particle2 = new Particle(240, 70, 10);
        particles.push(particle1);
        particles.push(particle2);
    }
    displayParticles();
}

// Create the buckets at the bottom
function createBuckets(initial_x, x_spacing, y, width, height, color) {
    for (var o = initial_x; o < 480; o += x_spacing) {
        var bucket = new Bucket(o, y, width, height, color);
        buckets.push(bucket);
    }
}

// Create the Plinkos that are the obstacles that bounce the particles off
function createPlinkos(initial_x, maxX, y, radius, plinko_group) {
    for (var l = initial_x; l < maxX; l += 50) {
        var plinko = new Plinko(l, y, radius);
        plinko_group.push(plinko);
    }
}

// Display function declaration for the objects in our game
//Particles
function displayParticles() {
    for (var j = 0; j < particles.length; j++) {
        var particle = particles[j];
        particle.display();
    }
}
// Buckets
function displayBuckets(group) {
    for (var p = 0; p < group.length; p++) {
        var bucket = group[p];
        bucket.display();
    }
}
// Plinkos
function displayPlinkos(plinkos) {
    for (var m = 0; m < plinkos.length; m++) {
        var plinko = plinkos[m];
        plinko.display();
    }
}

//Edges in the game.
function createEdges() {
    side_EdgesWidth = 10;
    topAndBottom_EdgesHeight = 10;
    rightEdge = new Edge(canvasWidth + (side_EdgesWidth / 2),
        canvasHeight / 2,
        side_EdgesWidth,
        canvasHeight);

    leftEdge = new Edge(0 - (side_EdgesWidth / 2),
        canvasHeight / 2,
        side_EdgesWidth,
        canvasHeight);

    topEdge = new Edge(canvasWidth / 2,
        0 - (topAndBottom_EdgesHeight / 2),
        canvasWidth,
        topAndBottom_EdgesHeight);

    bottomEdge = new Edge(canvasWidth / 2,
        canvasHeight + (topAndBottom_EdgesHeight / 2),
        canvasWidth,
        topAndBottom_EdgesHeight);
}