var db = require('./models');

var homicideData = [[ 12579232, "CF2D86DE-95C5-41BD-A3C2-63B26F2D627A", 12579232, 1463716823, "878752", 1483877063, "878752", null, "HZ260932", "2016-05-12T02:37:00", "015XX W 71ST ST", "0110", "HOMICIDE", "HOUSE", true, true, "41.764939117", "-87.661693779" ]
, [ 12760997, "4725036C-1EB2-40FD-8C0A-5BCBAD9711CB", 12760997, 1483877068, "878752", 1483877068, "878752", null, "HZ571249", "2016-12-31T13:11:00", "048XX W CHICAGO AVE", "0110", "HOMICIDE", "STREET", false, false, "41.894999013", "-87.746470784" ]
, [ 12760998, "3299F2C1-74F6-4850-8D00-52D2922D271F", 12760998, 1483877068, "878752", 1483877068, "878752", null, "HZ571363", "2016-12-31T14:29:00", "093XX S WENTWORTH AVE", "0110", "HOMICIDE", "APARTMENT", false, true, "41.724457997", "-87.628729029" ]
, [ 12763092, "80E82647-E1F9-441B-886C-F0698FDE0AD1", 12763092, 1484137280, "878752", 1484137280, "878752", null, "HZ436123", "2016-09-16T06:28:00", "021XX W 21ST ST", "0110", "HOMICIDE", "HOUSE", false, false, null, null ]];


for (var x=0; x<homicideData.length; x++) {
  homicideData[x][9] = homicideData[x][9].substring(0,10) + " " + homicideData[x][9].substring(11);
  for (var y=0; y<5; y++) {
    if (homicideData[x][10][y] == "X") {
      homicideData[x][10] = homicideData[x][10].substring(0,y) + '0' + homicideData[x][10].substring(y+1);;
    };
  };

  db.homicide.create({
    caseNum: homicideData[x][8],
    date: homicideData[x][9],
    block: homicideData[x][10],
    lucrId: homicideData[x][11],
    locationDesc: homicideData[x][13],
    arrest: homicideData[x][14],
    domestic: homicideData[x][15],
    lat: homicideData[x][16],
    lng: homicideData[x][17]
  }).then(function(homicide) {
    console.log("CHECK", homicide.get());
  });
};
