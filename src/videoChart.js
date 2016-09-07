
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

let averageData = [];

//NEXT STEP: Push the average data into the chart


function recursion (sortedData, i){
  var tempArray = [];
  if (sortedData.length===1 && !i ){
    //recursion over
  } if (sortedData.length > 1) {
  averageBuilder(sortedData[i], sortedData[sortedData.length-1], aveArray);
  tempArray.push(sortedData.pop());
  tryAgain(sortedData, i);
  } if (sortedData.length===1 && i > 0) {
    tryAgain(tempArray, i++)
  }
}
//On each iteration

let averageBuilder = (range, point, aveArray) => {
  if(doRangesOverlap(range, point)) {
    addAveragePoint(point, aveArray)
  }
  return 0;
}

//Called in averageBuilder()
let doRangesOverlap = (range, point) => {
  if (range.data[0].x <= point.data[0].x && point.data[0].x <= range.data[1].x) {
    return 1;
  }
  return 0;
}
//Called in averageBuilder()
let addAveragePoint = (point, aveArray) => {
   if (indexOfRow(averageArray, point.data[0]) === -1) {
    aveArray.push([point.data[0],1]);
   }
  else aveArray[indexOfRow(averageArray, point.data[0])][1]++
}

//Called in addAveragePoint()
let indexOfRow = (array, item) => {
  for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
    if (array[i][0] == item) {
      return i;   // Found it, return index
    }
  }
  return -1;   // Not found
}
//Creates new Array sorted by playback moment

function sortRanges (datasets) {
  let mapped = datasets.map( function (el, i) {
    return { index: i, value: el.data[0].x }})
  // sorting the mapped array containing the reduced values
  mapped.sort(function (a, b) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
  });
  // container for the resulting order
  let result = mapped.map(function (el){ return datasets[el.index]});
  return result}