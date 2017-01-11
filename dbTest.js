var db = require('./models');

var thisData = [ [ 12757580, "2DF78CFE-D3BB-475E-B7AB-B1A35007B7EE", 12757580, 1483532403, "878752", 1483532403, "878752", null, "HZ566830", "2016-12-27T15:15:00", "077XX S HONORE ST", "051A", "ASSAULT", "STREET", false, false ]
, [ 12757582, "92B30475-C578-4294-8297-0F0F8D905679", 12757582, 1483532403, "878752", 1483532403, "878752", null, "HZ566874", "2016-12-27T15:15:00", "034XX N MILWAUKEE AVE", "041A", "BATTERY", "SIDEWALK", false, false ]
, [ 12757585, "701A3B9C-70DB-4A4C-A5D4-269E2C68A3AC", 12757585, 1483532403, "878752", 1483532403, "878752", null, "HZ566862", "2016-12-27T07:45:00", "014XX N ARTESIAN AVE", "0610", "BURGLARY", "APARTMENT", false, false ] ];




for (var x=0; x<thisData.length; x++) {
  thisData[x][9] = thisData[x][9].substring(0,10) + " " + thisData[x][9].substring(11);
  for (var y=0; y<5; y++) {
    if (thisData[x][10][y] == "X") {
      thisData[x][10] = thisData[x][10].substring(0,y) + '0' + thisData[x][10].substring(y+1);;
    };
  };

  db.crime.create({
    caseNum: thisData[x][8],
    date: thisData[x][9],
    block: thisData[x][10],
    lucr: thisData[x][11],
    locationDesc: thisData[x][13],
    arrest: thisData[x][14],
    domestic: thisData[x][15]
  }).then(function(crime) {
    console.log("CHECK", crime.get());
  });
};
