var db = require('./models');

var lucrData = [ [ 1, "2E65B109-A0AC-478C-9976-FE048215A4DA", 1, 1410793911, "700397", 1410793911, "700397", "{\n}", "110", "HOMICIDE", "FIRST DEGREE MURDER" ]
, [ 2, "3F8F0E12-3A3D-4A8E-BE9F-9BDA67FF02E2", 2, 1410793911, "700397", 1410793911, "700397", "{\n}", "130", "HOMICIDE", "SECOND DEGREE MURDER" ]
, [ 3, "03D25032-CD09-4C1E-94DF-744F3BE0E1E4", 3, 1410793911, "700397", 1410793911, "700397", "{\n}", "141", "HOMICIDE", "INVOLUNTARY MANSLAUGHTER" ]];



for (var x=0; x<lucrData.length; x++) {

  db.lucr.create({
    id: lucrData[x][8],
    primaryDesc: lucrData[x][9],
    secondaryDesc: lucrData[x][10]
  }).then(function(lucr) {
    console.log(lucr.get());
  });
};
