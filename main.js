song1="";
song2="";

LWX=0;
LWY=0;
RWX=0;
RWY=0;
SLW=0;
SRW=0;

ss1="";
ss2="";

function preload() {
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}

function draw() {
    image(video,0,0,600,500);
    ss1=song1.isPlaying();
    ss2=song2.isPlaying();

    fill("black");
    stroke("black");
    if(SLW>0.2) {
    circle(LWX,LWY,25);
    song2.stop();}

    if(ss1==false) {
        song1.play();
        document.getElementById("nos").innerHTML="Name of Song = Harry Potter"; 
    }
    if(SRW>0.2) {
    circle(RWX,RWY,25);
    song1.stop();}

    if(ss2==false) {
        song2.play();
        document.getElementById("nos").innerHTML="Name of Song = Peter Pan"; 
    }



}

function modelLoaded() {
    console.log('PoseNet is initialized');
}

function gotPoses(results) {
    if(results.length>0) {
        console.log(results);
        LWX=results[0].pose.leftWrist.x;
        LWY=results[0].pose.leftWrist.y;
        RWX=results[0].pose.rightWrist.x;
        RWY=results[0].pose.rightWrist.y;
        SLW=results[0].pose.keypoints[9].score;
        SRW=results[0].pose.keypoints[10].score;
    }
}