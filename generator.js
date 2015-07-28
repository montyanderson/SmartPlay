var lastfm = require("./lastfm.js");

module.exports = function(data) {
    var len = data.length,
        descendArr = [],
        i = 0;

    for (i = len; i > 0; i--) {
        descendArr.push(i);
    }

    function convert () {
        var naturalSum = (len / 2) * (len + 1),
            totalTracks = 15;

        if (totalTracks >= naturalSum) {
          for (i = 0; i < len; i++) {
              descendArr[i] = Math.round(descendArr[i] / naturalSum * totalTracks);
          }
          return descendArr;
        } else if (totalTracks < len) {
          return "Reduce the number of artists!";
        } else {
          var loopCount = 0,
              difference = naturalSum - totalTracks;
          len--;
          while (loopCount < difference) {
            for (i = 0; i < len; i++) {
              if (descendArr[i] > 1 && loopCount < difference) {
                descendArr[i]--;
                loopCount++;
            } else if (descendArr[i] == 1) {
                len--;
              } else {
                break;
              }
            }
          }
          return descendArr;
        }
    }
    var convertContainer = convert();
    for (i = 0; i < len; i++) {
        data[i].trackNum = convertContainer[i];
    }
    console.log(data);
};
