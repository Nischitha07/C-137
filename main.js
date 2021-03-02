status = 0;
objects = [ ];
function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}
function setup()
{
    canvas = createCanvas(400,300);
    canvas.center();
}
function draw()
{
    image(video,0,0,400,300);
    if(status != " ")
    {
        objectDetector.detect(video, gotResults);

         for(i = 0; objects.length; i++)
        {
            document.getElementById("status_btn").innerHTML = "Status : Objects Detected";
            document.getElementById("object_detected_spn").innerHTML = objects.length;
fill('#0dff00');
stroke('#0dff00');
percent  = floor(objects [i].confidence * 100);
text(objects[i].label+" "+percent+" %" , objects[i].x + 15, objects[i].y + 15);
noFill();
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status_btn").innerHTML = "Status : Detecting Objects";
}
function modelLoaded()
{
    console.log("Cocossd has initialized");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);

}
function gotResults(error,results)
{
if(error)
{
    console.error(error);
}

    console.log(results);
  objects = results;
}