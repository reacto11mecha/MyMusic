const fs = require("fs");

let data = [];
let response_data = [];

const filelist = fs.readdirSync("D:/Music");

const filter = ext => filelist.filter(file => file.indexOf(ext) !== -1);

const mp3 = filter(".mp3");
const m4a = filter("m4a");

mp3.concat(m4a).forEach(d => data.push({ href: `/music/${d}`, nama: d }));

data = data.sort(function() {
  let property = "nama";
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function(a, b) {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
});

data.forEach((value, index) => {
  value.id = index;
  response_data.push(value);
});

module.exports = response_data;
