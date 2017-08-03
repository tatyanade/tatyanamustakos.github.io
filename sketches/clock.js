var secCircumference = 50;
var minCircumference = 200;
var currentAngleSec = 270;
var currentAngleMin = 270;
var hourAngleOffset = 0;

var hourRadius = 180;

var colorSchemes = [];
var currentColors = 0;

function setup() 
{
  angleMode(DEGREES);
  createCanvas(500,500);
  setupColor();
}

function setupColor()
//  [ (seccircle),,(secline),(minIn),(minout),(houur),(background)]
{
  colorSchemes[0]=['rgb(12,90,115)','rgb(12,80,107)','rgb(229,178,109)',
                  'rgb(229,190,95)','rgb(171,74,65)','rgb(176, 221, 186)']
  //schemes below are from adobe kuler
  colorSchemes[1]=['rgb(255,97,56)','rgb(255,176,59)','rgb(121,189,143)',
                   'rgb(0,163,136)','rgb(190,235,159)','rgb(255,255,157)']
  colorSchemes[2]=['rgb(70,137,102)','rgb(182,73,38)','rgb(255,240,165)',
                    'rgb(255,176,59)','rgb(142,40,0)','rgb(182,73,38)']
  colorSchemes[3]=['rgb(96,94,94)','rgb(138,135,135','rgb(32,115,167)','rgb(242,218,178)',
                    'rgb(218,63,62)','rgb(90,26,26)']
  colorSchemes[4]=['rgb(121,189,143)','rgb(142,252,163)','rgb(255,97,56)',
                   'rgb(190,235,159)','rgb(255,255,157)','rgb(0,163,136)']
  colorSchemes[5]=['rgb(258,250,225)','rgb(189,141,70)','rgb(246,228,151)',
                   'rgb(185,18,27)','rgb(76,27,27)','rgb(252,250,225)']
  colorSchemes[6]=['rgb(125,138,46)','rgb(201,215,135)','rgb(255,255,255)',
                   'rgb(255,192,169)','rgb(255,133,152)','rgb(255,221,175)']
  colorSchemes[7]=['rgb(31,138,112)','rgb(90,138,102)','rgb(190,219,57)',
                   'rgb(253,116,0)','rgb(255,255,26)','rgb(0,67,88)']
  colorSchemes[8]=['rgb(47,52,59)','rgb(126,130,122)','rgb(227,205,164)',
                   'rgb(199,121,102)','rgb(171,135,115)','rgb(112,48,48)']                   
  colorSchemes[9]=['rgb(51,55,69)','rgb(70,75,94)','rgb(119,196,211)',
                   'rgb(234,46,73)','rgb(246,247,146)','rgb(218,237,226)']
  colorSchemes[10]=['rgb(255,140,0)','rgb(55,90,117)','rgb(46,9,39)',
                   'rgb(255,45,0)','rgb(255,140,0)','rgb(217,0,0)']
  colorSchemes[11]=['rgb(255,255,255)','rgb(140,140,140)','rgb(42,42,42)',
                   'rgb(9,9,9)','rgb(190,190,190)','rgb(100,100,100)']      
  colorSchemes[12]=['rgb(205,212,82)','rgb(153,158,61)','rgb(254,225,105)',
                   'rgb(249,114,46)','rgb(201,49,61)','rgb(38,31,39)']   
}

//amount of segments in circle shows number of seconds
function drawSec()
{
  drawSecBackground();
  drawSecIndicators();
}
//draws second circle
function drawSecBackground()
{
  noStroke();

  fill (colorSchemes[currentColors][0])
  ellipse( (width/2) ,
           (height/2),
           secCircumference+2);
}
//seperates into segments
function drawSecIndicators()
{
  stroke(colorSchemes[currentColors][1]);
  var currentAngleDifferenceSec = 360/second();

  if ( second() == 1)
  {
    currentAngleSec += currentAngleDifferenceSec;
  }
  else
  {
    var x1 = width/2;
    var y1 = height/2;
    var x2 = 0;
    var y2 = 0;
    
    for (var i = 1; i <= second() ; i++)
    {
      x2 = getEndpointsX(x1,y1,currentAngleSec,secCircumference/2);
      y2 = getEndpointsY(x1,y1,currentAngleSec,secCircumference/2);
      
      line(x1,y1,x2,y2);
      
      currentAngleSec += currentAngleDifferenceSec;
      
    }
  }
  
}
//draws minute indicators = amount of triangles or arrows is the minute value
function drawMin()
{
  noStroke();
  fill(colorSchemes[currentColors][2])

  var currentAngleDifferenceMin = 360/minute();

  var x0 = width/2;
  var y0 = height/2;
  var x1 = 0;
  var y2 = 0;
  var x2 = 0;
  var y2 = 0;
  var x3 = 0;
  var y3 = 0;
  
  var outerRadius = minCircumference/2;
  var innerRadius = secCircumference/2 + 5;
  var innerAngle1 = currentAngleMin-(currentAngleDifferenceMin/2)
  var innerAngle2 = currentAngleMin+(currentAngleDifferenceMin/2)
  
  //if only one minute, a small circle appears
  if (minute() == 1)
  {
    fill(colorSchemes[currentColors][3])
    ellipse(x0,y0,innerRadius*2)
  }
  else
  {
    //draws first part of minutes
    fill(colorSchemes[currentColors][2]);
    for (var i = 1; i <=minute(); i++)
    {
      
      innerAngle1 = currentAngleMin-(currentAngleDifferenceMin/2)
      innerAngle2 = currentAngleMin+(currentAngleDifferenceMin/2)
      
      x1 = getEndpointsX(x0,x0,currentAngleMin,outerRadius+20);
      y1 = getEndpointsY(x0,x0,currentAngleMin,outerRadius+20);
      x2 = getEndpointsX(x0,y0,innerAngle1,innerRadius+40);
      y2 = getEndpointsY(x0,y0,innerAngle1,innerRadius+40);
      x3 = getEndpointsX(x0,y0,innerAngle2,innerRadius+40);
      y3 = getEndpointsY(x0,y0,innerAngle2,innerRadius+40);
      
      triangle(x1,y1,x2,y2,x3,y3);
      
      currentAngleMin += currentAngleDifferenceMin
    }
    //draws second part of minutes
    fill(colorSchemes[currentColors][3]);
    for (var i = 1; i <=minute(); i++)
    {
      innerAngle1 = currentAngleMin-(currentAngleDifferenceMin/2)
      innerAngle2 = currentAngleMin+(currentAngleDifferenceMin/2)
      
      x1 = getEndpointsX(x0,x0,currentAngleMin,outerRadius);
      y1 = getEndpointsY(x0,x0,currentAngleMin,outerRadius);
      x2 = getEndpointsX(x0,y0,innerAngle1,innerRadius);
      y2 = getEndpointsY(x0,y0,innerAngle1,innerRadius);
      x3 = getEndpointsX(x0,y0,innerAngle2,innerRadius);
      y3 = getEndpointsY(x0,y0,innerAngle2,innerRadius);
      
      triangle(x1,y1,x2,y2,x3,y3);
      
      currentAngleMin += currentAngleDifferenceMin
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

function updateAngles()
{
  //rotates shapes
  currentAngleSec += .5;
  currentAngleMin -= .25;
  hourAngleOffset +=.1;
  currentAngleSec = currentAngleSec % 360 ;
  currentAngleMin = currentAngleMin % 360 ;
}


function drawHour()
//draws hour polygons - number of sides = number of hours
{
  noStroke();
  fill(colorSchemes[currentColors][4])
  if (hour() < 3)
  {
    //smaller circle means 1 hour since no one sided polygon
    if(hour()==1)
    {
      ellipse( (width/2) ,
           (height/2),
           hourRadius);
    }
    //larger circle means 2 hours
    if (hour() == 2)
    {
      ellipse( (width/2) ,
           (height/2),
           hourRadius*2);
    }
  }
  else
  {
  polygon(width/2, height/2, hourRadius, hour());
  }
}

function polygon(x, y, radius, npoints) 
//edited from examples
{
  angleMode(RADIANS);
  var angle = (TWO_PI / npoints);
  var a = radians(270);
  
  beginShape();
  for (var i = 0; i < npoints; i++)
  {
    var sx = x + cos(a+radians(hourAngleOffset)) * radius;
    var sy = y + sin(a+radians(hourAngleOffset)) * radius;
    vertex(sx, sy);
    a += angle;
  }
  endShape(CLOSE);
  angleMode(DEGREES);
}


function draw()
{
  updateAngles();
  clear();
  background(colorSchemes[currentColors][5]);
  drawHour();
  drawMin();
  drawSec() ;
  
}

function mousePressed()
//changes color schemes
{
  currentColors +=1;
  currentColors = currentColors % 13;
}
