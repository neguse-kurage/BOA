//BOA ver5.1

var Name; //ファイル名

var Extruder; //ヘッド温度
var Bed; //ベッド温度
var ESpeed; //ヘッド速度
var FSpeed; //フィラメント速度
var FSpeed_s; //フィラメント速度(短辺)
var Origin; //原点に移動するか

var Mode; //形
var Hight;  //高さ
var StartX; //原点
var StartY;
var X;  //範囲
var Y;
var G_Width;  //グリッド幅
var Times;  //重ね数

var content;  //内容

if (window.File == false) {   //APIチェック
  window.alert("The File APIs are not fully supported in this browser.");
}

function Change(){
  var Mode_checked = document.getElementsByName('Mode');
    for(var i=0; i<Mode_checked.length; i++){
      if (Mode_checked[i].checked) {
        Mode = i;
      }
  } //モード番号取得

  if(Mode == 0){
    document.getElementById('Change').innerHTML = 'Y<input type="text" id="Y" value="200">mm<br>';
  }else if(Mode == 1){
    X = Number(document.getElementById('X').value);
    document.getElementById('Change').innerHTML = "Y " + X/2*Math.sqrt(3) + "mm<br>";
  }else if(Mode == 2){
    X = Number(document.getElementById('X').value);
    document.getElementById('Change').innerHTML = "Y " + X + "mm<br>";
  }
}

function OF(){
    get();
    writeParameter();
    makeGcode();
    setName();
    Download();
}

function get(){
  Name = document.getElementById('Name').value;

  Extruder = Number(document.getElementById('Extruder').value);
  Bed = Number(document.getElementById('Bed').value);
  ESpeed = Number(document.getElementById('ESpeed').value);
  FSpeed = Number(document.getElementById('FSpeed').value)/10;
  FSpeed_s = FSpeed/5;
  Origin = document.getElementById('Origin');

  var Mode_checked = document.getElementsByName('Mode');
    for(var i=0; i<Mode_checked.length; i++){
      if (Mode_checked[i].checked) {
        Mode = i;
        console.log(Mode);
      }
  } //モード番号取得

  Hight = Number(document.getElementById('Hight').value);
  StartX = Number(document.getElementById('StartX').value);
  StartY = Number(document.getElementById('StartY').value);
  X = Number(document.getElementById('X').value);
  if(Mode == 0){
    Y = Number(document.getElementById('Y').value);
  }
  G_Width = Number(document.getElementById('G_Width').value);
  Times = Number(document.getElementById('Times').value);
}

function writeParameter(){  //設定をGcodeに記述
  content = [ ";Extruder temperature : " + Extruder + "\n",
              ";Bed temperature : " + Bed + "\n",
              ";Extruder speed : " + ESpeed + "\n",
              ";Filament speed : " + FSpeed + "\n",
              ";Filament speed (short) : " + FSpeed_s + "\n",
              ";Move to Origin : " + Origin.checked + "\n",
              "\n",].join("");

  switch (Mode) {
    case 0: //四角形
      content += ";Mode : Square\n";
      break;

    case 1: //六角形
      content += ";Mode : Hexagon\n";
      break;

    case 2: //丸
      content += ";Mode : Circle\n";
      break;

    default:

  }

  content += [ ";Hight : " + Hight + "\n",
              ";StartX : " + StartX + "\n",
              ";StartY : " + StartY + "\n",
              ";X : " + X + "\n",
              ";Y : " + Y + "\n",
              ";G_Width : " + G_Width + "\n",
              ";Times : " + Times + "\n",
              "\n"].join("");
}

function setName(){
  var Download = document.getElementById("download");
  Download.setAttribute("download", Name);
}

function Download() {
    var blob = new Blob([ content ], { "type" : "text/plain" });

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, "test.txt");
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
}
