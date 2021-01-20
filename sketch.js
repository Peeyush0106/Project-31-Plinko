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

function setup() {
    canvasWidth = 480;
    canvasHeight = 800;
    createCanvas(canvasWidth, canvasHeight);

    engine = Engine.create();
    world = engine.world;

    createEdges();

    ground = new Ground(240, 740, width, 20);

    frameCount = 0;
    frameCountIncreaser = 1;
    plinkos_row_1 = [];
    plinkos_row_2 = [];
    plinkos_row_3 = [];
    plinkos_row_4 = [];

    shouldRestartGame = false;

    plinkos.push(plinkos_row_1);
    createPlinkos(40, canvasWidth, 100, random(5, 10), plinkos[0]);

    plinkos.push(plinkos_row_2);
    createPlinkos(60, 440, 210, random(5, 10), plinkos[1]);

    plinkos.push(plinkos_row_3);
    createPlinkos(40, canvasWidth, 320, random(5, 10), plinkos[2]);

    plinkos.push(plinkos_row_4);
    createPlinkos(60, 440, 430, random(5, 10), plinkos[3]);

    createBuckets(15, 90, 635, 10, 190, "red");
    r_color = 0;
    g_color = 0;
    b_color = 0;
}

function draw() {
    background(0);
    updateGame();
    setModes();

    r_color += random(0, 25);
    g_color += random(0, 25);
    b_color += random(0, 25);

    if (r_color >= 255) {
        r_color = 0;
    }
    if (g_color >= 255) {
        g_color = 0;
    }
    if (b_color >= 255) {
        b_color = 0;
    }

    // if (particles.length > 5) {
    //     location.reload();
    // }

    // if (!shouldRestartGame) {
        spawnParticle();
    // }
    // for (var q = 0; q < particles.length; q++) {
    //     var particle = particles[q];
    //     if (particles.length >= 5 && particle.body.position.y > 600) {
    //         safely_entered_particles.push(particle);
    //         if (safely_entered_particles.length >= 5) {
    //             shouldRestartGame = true;
    //             console.log(safely_entered_particles.length, safely_entered_particles);
    //         }
    //     }
    // }

    displayBuckets(buckets);

    for (var i = 0; i < plinkos.length; i++) {
        var plinko_group_for_display = plinkos[i]
        displayPlinkos(plinko_group_for_display);
    }

    ground.display();
    // if (shouldRestartGame) {
    //     restartGame();
    // }
    if (Math.round(frameCount) % 20 >= 0 && Math.round(frameCount) % 20 < 10) {
        push();
        if (Math.round(frameCount) % 8 >= 0 && Math.round(frameCount) % 30 < 30000) {
            fill(rgb(random(0, 255), random(0, 255), random(0, 255)));
        }
        textSize(16);
        text("Created by Peeyush Agarwal, also called Peeyush - The Debugger.", 2.5, 500);
        // text("Mouse X: " + mouseX, 100, 500);
        // text("Mouse Y: " + mouseY, 300, 500);
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

// function restartGame() {
//     // location.reload();
//     for (var r = 0; r < particles.length; r++) {
//         particle = particles[r];
//         World.remove(world, particle.body);
//         particles.pop();
//         r--;
//         for (var i = 0; i < safely_entered_particles.length; i++) {
//             safely_entered_particles.pop();
//         }
//     }
//     shouldRestartGame = false;
// }

function updateGame() {
    Engine.update(engine);
    frameCount += frameCountIncreaser;
    frameCountIncreaser += 0.07;
}

function setModes() {
    rectMode(CENTER);
    ellipseMode(RADIUS);
    angleMode(RADIANS);
    imageMode(CENTER);
}

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
function createBuckets(initial_x, x_spacing, y, width, height, color) {
    for (var o = initial_x; o < 480; o += x_spacing) {
        var bucket = new Bucket(o, y, width, height, color);
        buckets.push(bucket);
    }
}

function createPlinkos(initial_x, maxX, y, radius, plinko_group) {
    for (var l = initial_x; l < maxX; l += 50) {
        var plinko = new Plinko(l, y, radius);
        plinko_group.push(plinko);
    }
}

function displayParticles() {
    for (var j = 0; j < particles.length; j++) {
        var particle = particles[j];
        particle.display();
    }
}

function displayBuckets(group) {
    for (var p = 0; p < group.length; p++) {
        var bucket = group[p];
        bucket.display();
    }
}

function displayPlinkos(plinkos) {
    for (var m = 0; m < plinkos.length; m++) {
        var plinko = plinkos[m];
        plinko.display();
    }
}

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