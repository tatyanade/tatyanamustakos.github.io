
var sections = 12
var angle = 360/sections
var offset = 0
var circlesPerSect = 3
var circlesMain = []
var circleMain = []
var innerRad = 80
var outterRad = 60
var circleRad = 15
var angleDifference = 20
var colors = ['rgb(46,118,161)','rgb(161,46,118)','rgb(118,161,46)','rgb(46,161,118)',
              'rgb(150,208,242)' ,'rgb(242,150,208)','rgb(208,242,150)'   ,'rgb(150,242,208)',
              'rgb(83,212,190)','rgb(190,83,212)','rgb(212,190,83)'  , 'rgb(83,190,212)']
var bRecording;
var nElapsedFrames;
var nFramesInLoop =120;
var bIAmRunningThisOnMyLaptop = false;
var originalTime = 0
function setup()
{
  noStroke()
  angleMode(DEGREES)
  createCanvas(300,300)
  
  assignCircles()
  
  bRecording = false;
  nElapsedFrames = 0;
  
  
  
  originalTime = hour()*10000 + minute()*100 + second()
  
  
  
  
  
  
  
  
    for (var i=0; i < sections; i++)
  {
    currentAngle = i*angle + offset
    currentX = getEndpointsX(width/2,height/2,i*angle+ offset,innerRad)
    currentY = getEndpointsY(width/2,height/2,i*angle+ offset,innerRad)
    circle2Angle = i*angle
    circle1Angle = i*angle-angle*(4/5)//
    circle3Angle = i*angle+angle*(4/5)//3
    
    circle1x = getEndpointsX(currentX,currentY,circle1Angle,outterRad)
    circle1y = getEndpointsY(currentX,currentY,circle1Angle,outterRad)
    circle2x = getEndpointsX(currentX,currentY,circle2Angle,outterRad)
    circle2y = getEndpointsY(currentX,currentY,circle2Angle,outterRad)
    circle3x = getEndpointsX(currentX,currentY,circle3Angle,outterRad)
    circle3y = getEndpointsY(currentX,currentY,circle3Angle,outterRad)
    
    circlesMain[i] = [currentAngle, currentX, currentY, [circle1Angle,circle1x,circle1y],
                                                        [circle2Angle,circle2x,circle2y],
                                                        [circle3Angle,circle3x,circle3y]]
  }
  
  
  
  
  
  
} 

function keyPressed()
{
  if (bIAmRunningThisOnMyLaptop)
  {
    bRecording = true;
    nElaspedFrames = 0;
  }
}

function assignCircles()
{
  for (var i=0; i < sections; i++)
  {
    currentAngle = i*angle + offset
    currentX = getEndpointsX(width/2,height/2,i*angle+ offset,innerRad)
    currentY = getEndpointsY(width/2,height/2,i*angle+ offset,innerRad)
    circle2Angle = i*angle
    circle1Angle = i*angle-angle*(4/5)//
    circle3Angle = i*angle+angle*(4/5)//3
    
    circle1x = getEndpointsX(currentX,currentY,circle1Angle,outterRad)
    circle1y = getEndpointsY(currentX,currentY,circle1Angle,outterRad)
    circle2x = getEndpointsX(currentX,currentY,circle2Angle,outterRad)
    circle2y = getEndpointsY(currentX,currentY,circle2Angle,outterRad)
    circle3x = getEndpointsX(currentX,currentY,circle3Angle,outterRad)
    circle3y = getEndpointsY(currentX,currentY,circle3Angle,outterRad)
    
    circlesMain[i] = [currentAngle, currentX, currentY, [circle1Angle,circle1x,circle1y],
                                                        [circle2Angle,circle2x,circle2y],
                                                        [circle3Angle,circle3x,circle3y]]
  }
}
 
function drawCircles()
{
  for (var i=0; i < sections; i++)
  {
  fill(colors[i])
  ellipse(circlesMain[i][3][1],circlesMain[i][3][2],circleRad)
  ellipse(circlesMain[i][4][1],circlesMain[i][4][2],circleRad)
  ellipse(circlesMain[i][5][1],circlesMain[i][5][2],circleRad)
  }
}


function updateCircles()
{
  assignCircles()
}

function draw() 
{
  
  
  var percentCompleteFraction = 0;
  if (bRecording) {
    percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
  } else {
    percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
  }
  

  
  clear()
  background(0,0,0)
  angle+=.36
  offset -= 3.6
  assignCircles()
  updateCircles()
  drawCircles()
  
  
  
    if (bRecording & bIAmRunningThisOnMyLaptop) {
    var frameOutputFilename = "mynickname-loop-" + nf(nElapsedFrames, 4) + ".png";
    println("Saving output image: " + frameOutputFilename);
    saveCanvas(frameOutputFilename);
    nElapsedFrames++;
    if (nElapsedFrames >= nFramesInLoop) {
      bRecording = false;
      
    
    }
    
    if (circlesMain[12][0][1] == circleMain[12][0][1])
    {
      println((second()+minute()*100+hour()*10000)-originalTime)
    }
  }
  
}









function getEndpointsX(x,y,angle,length)
//http://stackoverflow.com/questions/1638437/given-an-angle-and-length-how-do-i-calculate-the-coordinates
{
  return( x + length*cos(angle) );
}

function getEndpointsY(x,y,angle,length)
//http://stackoverflow.com/questions/1638437/given-an-angle-and-length-how-do-i-calculate-the-coordinates
{
  return (  y + length*sin(angle));
}