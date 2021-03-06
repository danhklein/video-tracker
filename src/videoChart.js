its var ctx = document.getElementById("myChart");
var data = {
    labels: [],
    datasets: [
    ]
};

var scales = {
  xAxes: [{
    type:'linear',
    position: 'bottom',
    ticks: {
      beginAtZero:true
    }
  }],
  yAxes: [{
      ticks: {
          beginAtZero:true,
          max: 5,
          stepSize: 1
      }
  }]
}

var options = {
  responsive:true,
  maintainAspectRatio: true,
  title: {
  display: true,
  text: 'Replay History'
  },
  elements: {
    line: {
      borderColor: 'rgba(0,0,128,0.7)'
    }
  },
  scales: scales
}

var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });


//Erase and Build New Chart
function createChart () {
  myChart.update();
}

//As dataset grows past five, increments YAxes
function changeYAxes () {
if (myChart.data.datasets.length > 4) {
      myChart.options.scales.yAxes[0].ticks.max = myChart.data.datasets.length + 1;
    }
}

function pushData (line) {
  myChart.data.labels.push(line[1].x)
    myChart.data.datasets.push({
      label: `Replay ${replay}`,
      fill: false,
      data: line
    })
}

// // //Create all Datasets from Array
function insertAllDataIntoSets () {
  let line = [];
  for (var i = myChart.data.datasets.length; i<allPlayBacks.length; i++) {
    replay = i + 1;
    line[0] = {
      x: allPlayBacks[i][0],
      y: replay
    }
    line[1] = {
      x: allPlayBacks[i][1],
      y: replay
    }
    pushData(line);
    changeYAxes();
  }
  createChart();
}



//NEXT STEP: Push the average data into the chart
//Organize Datasets Array into Array of sorted Points

//Is the averageData Array empty? Push first sorted point into it.



function fullBuild () {
  buildAverageDataArray(sortRanges(myChart.data.datasets), 0)
}

function buildAverageDataArray (sortedData, i){
  let tempArray = [];
  console.log(i + ": " +tempArray);
  if (sortedData.length===1 && !i ){
    return 0;
  } if (sortedData.length > 1) {
  averageBuilder(sortedData[i], sortedData[sortedData.length-1], averageDataArray);
  tempArray.push(sortedData.pop());
 buildAverageDataArray(sortedData, i);
  } if (sortedData.length===1 && i > 0) {
   buildAverageDataArray(tempArray, i++)
  }
}
// //On each iteration
//called in Average DataArray
let averageBuilder = (range, point, aveArray) => {
  if(doRangesOverlap(range, point)) {
    addAveragePoint(point, aveArray)
  }
  return 0;
}

// //Called in averageBuilder()
let doRangesOverlap = (range, point) => {
  if (range.data[0].x <= point.data[0].x && point.data[0].x <= range.data[1].x) {
    return 1;
  }
  return 0;
}
// //Called in averageBuilder()
let addAveragePoint = (point, aveArray) => {
   if (indexOfRow(aveArray, point.data[0]) === -1) {
    aveArray.push([point.data[0],1]);
   }
  else aveArray[indexOfRow(aveArray, point.data[0])][1]++
}

// //Called in addAveragePoint()
let indexOfRow = (array, item) => {
  for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
    if (array[i][0] == item) {
      return i;   // Found it, return index
    }
  }
  return -1;   // Not found
}


let ghost;

function sortAndFormatRanges (datasets) {
  let mapped = datasets.map( function (el, i) {
    return { index: i, value: el.data[0].x }})
  // sorting the mapped array containing the reduced values
  mapped.sort(function (a, b) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
  });
  // container for the resulting order
  let result = mapped.map(function (el){ return [datasets[el.index].data[0].x,datasets[el.index].data[1].x]});
  ghost = result;
  return result
}

// function sortRanges (datasets) {
//   let mapped = datasets.map( function (el, i) {
//     return { index: i, value: el.data[0].x }})
//   // sorting the mapped array containing the reduced values
//   mapped.sort(function (a, b) {
//     return +(a.value > b.value) || +(a.value === b.value) - 1;
//   });
//   // container for the resulting order
//   let result = mapped.map(function (el){ return datasets[el.index]});
//   return result
// }