function makeGcode(){
  switch (Mode) {
    case 0: //四角形
      makeGcode_Square();
      break;

    case 1: //六角形
      makeGcode_Hexagon();
      break;

    case 2: //丸
      makeGcode_Circle();
      break;

    default:

  }
}

function makeGcode_Square(){  //四角形
  Gcode_Start();
  //Gcode_Wait();

  for(var t=0; t<Times; t++){ //Times

    content += "G1 X" + X + " E" + FSpeed*X + "\n"; //toX
    content += "G92 E0\n";
    for(var i=0; i<Math.floor(Y/G_Width); i++){
      content += "G1 Y" + G_Width*(i+1) + " E" + FSpeed*G_Width + "\n"; //短辺
      content += "G92 E0\n";
      if(i%2==0){                                //長辺
        content += "G1 X" + 0 + " E" + FSpeed*X + "\n";
        content += "G92 E0\n";
      }else{
        content += "G1 X" + X + " E" + FSpeed*X + "\n";
        content += "G92 E0\n";
      }
    }

    content += "G92 E0\n";
    content += "G1 X" + X + " Y" + Y + "\n";
    content += "\n";

    content += "G1 Y" + 0 + " E" + FSpeed*Y + "\n"; //toY
    content += "G92 E0\n";
    for(var i=0; i<Math.floor(X/G_Width); i++){
      content += "G1 X" + (X-G_Width*(i+1)) + " E" + FSpeed*G_Width + "\n"; //短辺
      content += "G92 E0\n";
      if(i%2==0){                                //長辺
        content += "G1 Y" + Y + " E" + FSpeed*Y + "\n";
        content += "G92 E0\n";
      }else{
        content += "G1 Y" + 0 + " E" + FSpeed*Y + "\n";
        content += "G92 E0\n";
      }
    }

    content += "G92 E0\n";
    content += "G1 X0 Y0\n";
    content += "\n";
  }

  Gcode_End();
}

function makeGcode_Hexagon(){ //六角形
  Gcode_Start();
  //Gcode_Wait();

  for(var t=0; t<Times; t++){ //Times
    //toY
      //左三角
      content += ";Ypart1\n";
    for(var i=1; i*G_Width<=X/4; i++){
      if(i%2==1){
        content += ["G1 X" + G_Width*i + " Y" + G_Width*i*Math.sqrt(3) + " E" + FSpeed*G_Width*2 + "\n",
                    "G92 E0\n",
                    "G1 X" + G_Width*i + " Y" + G_Width*(-i)*Math.sqrt(3) + " E" + FSpeed*G_Width*i*Math.sqrt(3)*2 + "\n",
                    "G92 E0\n"].join("");

      }else{
        content += ["G1 X" + G_Width*i + " Y" + G_Width*(-i)*Math.sqrt(3) + " E" + FSpeed*G_Width*2 + "\n",
                    "G92 E0\n",
                    "G1 X" + G_Width*i + " Y" + G_Width*i*Math.sqrt(3) + " E" + FSpeed*G_Width*i*Math.sqrt(3)*2 + "\n",
                    "G92 E0\n"].join("");
      }
    }
    content += "G92 E0\n";
    content += "\n";

      //真ん中四角
      content += ";Ypart2\n";
      content += "G1 X" + X/4 + " Y" + X/4*Math.sqrt(3) + " E" + FSpeed*X/4*Math.sqrt(3)*2 + "\n";
      content += "G92 E0\n";
    for(var i=1; i*G_Width<=X/2; i++){
      if(i%2==1){
        content += ["G1 X" + (X/4+G_Width*i) + " Y" + X/4*Math.sqrt(3) + " E" + FSpeed*G_Width + "\n",
                    "G92 E0\n",
                    "G1 X" + (X/4+G_Width*i) + " Y" + X/4*Math.sqrt(3)*(-1) + " E" + FSpeed*X/4*Math.sqrt(3)*2 + "\n",
                    "G92 E0\n"].join("");

      }else{
        content += ["G1 X" + (X/4+G_Width*i) + " Y" + X/4*Math.sqrt(3)*(-1) + " E" + FSpeed*G_Width + "\n",
                    "G92 E0\n",
                    "G1 X" + (X/4+G_Width*i) + " Y" + X/4*Math.sqrt(3) + " E" + FSpeed*X/4*Math.sqrt(3)*2 + "\n",
                    "G92 E0\n"].join("");
      }
    }
    content += "G92 E0\n";
    content += "\n";

      //右三角
      content += ";Ypart3\n";
      content += "G1 X" + X*3/4 + " Y" + X/4*Math.sqrt(3) + " E" + FSpeed*X/4*Math.sqrt(3)*2 + "\n";
      content += "G92 E0\n";
    for(var i=1; i*G_Width<=X/4; i++){
      if(i%2==1){
        content += ["G1 X" + (X*3/4+G_Width*i) + " Y" + (X/4*Math.sqrt(3)-G_Width*i*Math.sqrt(3)) + " E" + FSpeed*G_Width*2 + "\n",
                    "G92 E0\n",
                    "G1 X" + (X*3/4+G_Width*i) + " Y" + (X/4*Math.sqrt(3)*(-1)+G_Width*i*Math.sqrt(3)) + " E" + FSpeed*(X/4*Math.sqrt(3)*(-1)+G_Width*i*Math.sqrt(3))*2 + "\n",
                    "G92 E0\n"].join("");

      }else{
        content += ["G1 X" + (X*3/4+G_Width*i) + " Y" + (X/4*Math.sqrt(3)*(-1)+G_Width*i*Math.sqrt(3)) + " E" + FSpeed*G_Width*2 + "\n",
                    "G92 E0\n",
                    "G1 X" + (X*3/4+G_Width*i) + " Y" + (X/4*Math.sqrt(3)-G_Width*i*Math.sqrt(3)) + " E" + FSpeed*(X/4*Math.sqrt(3)-G_Width*i*Math.sqrt(3))*2 + "\n",
                    "G92 E0\n"].join("");
      }
    }
    content += "G92 E0\n";
    content += "G1 X" + X + " Y0 E" + FSpeed*G_Width + "\n";
    content += "G92 E0\n";
      content += "\n";

    //toX
      //下半分
      content += ";Xpart1\n";
      content += ["G1 X" + X/4*3 + " Y" + X/4*Math.sqrt(3)*(-1) + " E" + FSpeed*X/2 + "\n",  //底辺右に移動
                  "G92 E0\n",
                  "G1 X" + X/4 + " Y" + X/4*Math.sqrt(3)*(-1) + " E" + FSpeed*X/2 + "\n",  //底辺左下に移動
                  "G92 E0\n"].join("");

    for(var i=0; (i+1)*G_Width<X/4*Math.sqrt(3); i++){
      if(i%2==0){
        content += ["G1 X" + (X/4-G_Width/Math.sqrt(3)*(i+1)) + " Y" + (X/4*Math.sqrt(3)*(-1)+G_Width*(i+1)) + " E" + FSpeed*G_Width/Math.sqrt(3)*2 + "\n",
                    "G92 E0\n",
                    "G1 X" + (X/4*3+G_Width/Math.sqrt(3)*(i+1)) + " E" + FSpeed*(X/2+G_Width/Math.sqrt(3)*(i+1)*2) + "\n",
                    "G92 E0\n"].join("");
      }else{
        content += ["G1 X" + (X/4*3+G_Width/Math.sqrt(3)*(i+1)) + " Y" + (X/4*Math.sqrt(3)*(-1)+G_Width*(i+1)) + " E" + FSpeed*G_Width/Math.sqrt(3)*2 + "\n",
                    "G92 E0\n",
                    "G1 X" + (X/4-G_Width/Math.sqrt(3)*(i+1)) + " E" + FSpeed*(X/2+G_Width/Math.sqrt(3)*(i+1)*2) + "\n",
                    "G92 E0\n"].join("");
      }
    }
    content += "G92 E0\n";
    content += "G1 X0 Y0 E" + FSpeed*X + "\n";
    content += "G92 E0\n";

      //上半分
      content +=";Xpart2\n";
    for(var i=0; (i+1)*G_Width<X/4*Math.sqrt(3); i++){
      if(i%2==0){
        content += ["G1 X" + G_Width/Math.sqrt(3)*(i+1) + " Y" + G_Width*(i+1) + " E" + FSpeed*G_Width/Math.sqrt(3)*2 + "\n",
                    "G92 E0\n",
                    "G1 X" + (X-G_Width/Math.sqrt(3)*(i+1)) + " E" + FSpeed*(X-G_Width/Math.sqrt(3)*(i+1)*2) + "\n",
                    "G92 E0\n"].join("");
      }else{
        content += ["G1 X" + (X-G_Width/Math.sqrt(3)*(i+1)) + " Y" + G_Width*(i+1) + " E" + FSpeed*G_Width/Math.sqrt(3)*2 + "\n",
                    "G92 E0\n",
                    "G1 X" + G_Width/Math.sqrt(3)*(i+1) + " E" + FSpeed*(X-G_Width/Math.sqrt(3)*(i+1)*2) + "\n",
                    "G92 E0\n"].join("");
      }
    }
      content += "G92 E0\n";
      content += "G1 X" + X/4 + " Y" + X/4*Math.sqrt(3) + " E" + FSpeed*X/2 + "\n";
      content += "G1 X" + 0 + " Y" + 0 + " E" + FSpeed*X/2 + "\n";

  }

  Gcode_End();
}

function makeGcode_Circle(){ //丸
  Gcode_Start();
  //Gcode_Wait();

  for(var t=0; t<Times; t++){ //Times
    //toX
    content += "G1 X" + X/2*(-1) + " Y" + 0 + " E" + FSpeed + "\n";
    content += "G92 E0\n";
    for(var i=1; i*G_Width<X; i++){
      if(i%2==1){
        content += ["G1 X" + (G_Width*i-X/2) + " Y" + Math.sqrt(X*X/4-(G_Width*i-X/2)*(G_Width*i-X/2)) + " E" + FSpeed_s + "\n",
                    "G92 E0\n",
                    "G1 X" + (G_Width*i-X/2) + " Y" + Math.sqrt(X*X/4-(G_Width*i-X/2)*(G_Width*i-X/2))*(-1) + " E" + FSpeed + "\n",
                    "G92 E0\n"].join("");
      }else if(i%2==0){
        content += ["G1 X" + (G_Width*i-X/2) + " Y" + Math.sqrt(X*X/4-(G_Width*i-X/2)*(G_Width*i-X/2))*(-1) + " E" + FSpeed_s + "\n",
                    "G92 E0\n",
                    "G1 X" + (G_Width*i-X/2) + " Y" + Math.sqrt(X*X/4-(G_Width*i-X/2)*(G_Width*i-X/2)) + " E" + FSpeed + "\n",
                    "G92 E0\n"].join("");
      }
    }
    content += "G92 E0\n";
    content += "G1 X" + X/2 + " Y" + 0 + " E" + FSpeed + "\n";
    content += "G92 E0\n";

    //toY
    content += "G1 X0 Y" + X/2*(-1) + " E" + FSpeed + "\n";
    content += "G92 E0\n";
    for(var i=1; i*G_Width<X; i++){
      if(i%2==1){
        content += ["G1 X" + Math.sqrt(X*X/4-(G_Width*i-X/2)*(G_Width*i-X/2)) + " Y" + (G_Width*i-X/2) + " E" + FSpeed_s + "\n",
                    "G92 E0\n",
                    "G1 X" + Math.sqrt(X*X/4-(G_Width*i-X/2)*(G_Width*i-X/2))*(-1) + " Y" + (G_Width*i-X/2) + " E" + FSpeed + "\n",
                    "G92 E0\n"].join("");
      }else if(i%2==0){
        content += ["G1 X" + Math.sqrt(X*X/4-(G_Width*i-X/2)*(G_Width*i-X/2))*(-1) + " Y" + (G_Width*i-X/2) + " E" + FSpeed_s + "\n",
                    "G92 E0\n",
                    "G1 X" + Math.sqrt(X*X/4-(G_Width*i-X/2)*(G_Width*i-X/2)) + " Y" + (G_Width*i-X/2) + " E" + FSpeed + "\n",
                    "G92 E0\n"].join("");
      }
    }
    content += "G92 E0\n";
    content += "G1 X" + 0 + " Y" + X/2 + " E" + FSpeed + "\n";
    content += "G92 E0\n";
  }

  Gcode_End();
}

function Gcode_Wait(){
  content += ["G1 E" + Hight + "\n", //フィラメント接地待ち
              "G92 E0\n"].join("");
}

function Gcode_Start(){  //Gcode start
  content += [ "G90\n",  //Set to Absolute Positioning
              "M82\n",  //set extruder to absolute mode
              "M106 S0\n" ,      //Fan On
              "M104 S" + Extruder +"\n",  //Set Extruder Temperature
              "M140 S" + Bed + "\n",  //Set Bed Temperature
              "M109 S" + Extruder + "\n", //Set Extruder Temperature and Wait
              "M190 S" + Bed + "\n"].join("");  //Set Bed Temperature and Wait

            if(Origin.checked == true){
              content += [ "G28\n"]; //Move to Origin
            }

  content += [ "G1 X" + StartX + " Y" + StartY + " Z" + Hight + " F1000 ;Move to new Origin\n",
              "G92 X0 Y0 Z0 E0\n", //Set Position
              "G1 F" + ESpeed + "\n\n"].join(""); //Set Moving Speed
}

function  Gcode_End(){ //Gcode end
  content += ["\n",
              "G92 E0\n",  //Set Position
              "G1 Z" + (Hight + 20) + " E0\n", //Move up 20mm end of job
              "M104 S0\n", //Set Extruder Temperature
              "M140 S0\n",  //Bed Temperature
              "M84"].join("");  //Stop idle hold
}
