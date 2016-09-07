
let myChart = new Chart(ctx, {
  labels: [0, 2, vid.duration],
  type: 'line',
  data: {
    datasets: [

    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom'
        }
      ]
    }
  }
})

let lineColors = ['rgba(255,255,0)', 'rgba(0,255,255)', 'rgb(255,0,255)', 'rgba(255,102,178)']

//Erase and Build New Chart
function createChart () {
  myChart.update();
}

//Create all Datasets from Array
function insertAllDataIntoSets () {
  let line = [];
  for (var i = myChart.data.datasets.length; i<allPlayBacks.length; i++) {
    replay = i + 1;
    line[0] = {
      x: allPlayBacks[i][0],
      y : replay
    }
    line[1] = {
      x: allPlayBacks[i][1],
      y: replay
    }
    myChart.data.datasets.push({
      label: `Replay ${replay}`,
      fill: false,
      data: line
    })
  }
  createChart();
}

//http://stackoverflow.com/questions/24943200/javascript-2d-array-indexof
// function isItemInMatrix(array, item) {
//   for (var i = 0; i < array.length; i++) {
//         // This if statement depends on the format of your array
//     if (array[i][0] == item) {
//       return true;   // Found it
//     }
//   }
//   return false;   // Not found
// }

function indexOfRow(array, item) {
  for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
    if (array[i][0] == item) {
      return i;   // Found it, return index
    }
  }
  return -1;   // Not found
}



let averageData = [];

let averageBuilder = function (range, point, aveArray) {
  if(doRangesOverlap(range, point)) {
    addAveragePoint(point, aveArray)
  }
  return 0;
}

let averageBuilder = (range, point, aveArray) => {
  if(doRangesOverlap(range, point)) {
    addAveragePoint(point, aveArray)
  }
  return 0;
}

let doRangesOverlap = (range, point) => {
  if (range.data[0].x <= point.data[0].x && point.data[0].x <= range.data[1].x) {
    return 1;
  }
  return 0;
}


let addAveragePoint = (point, aveArray) => {
   if (indexOfRow(averageArray, point.data[0]) === -1) {
    aveArray.push([point.data[0],1]);
   }
  else aveArray[indexOfRow(averageArray, point.data[0])][1]++
}


//Creates new Array sorted by playback moment

let sortRanges = (datasets) =>{
  // temporary array holds objects with position and sort-value
  let mapped = datasets.map((el, i) =>
    ({ index: i, value: el.data[0].x }))
  // sorting the mapped array containing the reduced values
  mapped.sort((a, b) => {
    +(a.value > b.value) || +(a.value === b.value) - 1;
  });
  // container for the resulting order
  let result = mapped.map(el => datasets[el.index]);
  return result;
}