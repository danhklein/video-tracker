var ctx = document.getElementById("myChart");
var data = {
    labels: [],
    datasets: [
    ]
};

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
  scales: {
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
}



// var options = {
  // title: {
  // display: true,
  // text: 'Replay History'
  // },
  // elements: {
  //   line: {
  //     borderColor: 'rgba(0,0,128,0.7)'
  //   }
  // },
//   scales: {
//     xAxes: {
//       type: 'linear',
//       beginAtZero: true
//     }
//   }
// }


var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options});




//Erase and Build New Chart
function createChart () {
  myChart.update();
}

// // //Create all Datasets from Array
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
    myChart.data.labels.push(line[1].x)
    myChart.data.datasets.push({
      label: `Replay ${replay}`,
      fill: false,
      data: line
    })
    if (myChart.data.datasets.length > 4) {
      myChart.options.scales.yAxes[0].ticks.max = myChart.data.datasets.length + 1;
    }
  }
  createChart();
}


let averageDataArray = [];

//NEXT STEP: Push the average data into the chart


//Organize Datasets Array into Array of sorted Points

//Is the averageData Array empty? Push first sorted point into it.




function fullBuild (datasets) {
  sortedRanges()
}

function buildAverageDataArray (sortedData, i){
  let tempArray = [];
  if (sortedData.length===1 && !i ){
    return 0;
  } if (sortedData.length > 1) {
  averageBuilder(sortedData[i], sortedData[sortedData.length-1], averageDataArray);
  tempArray.push(sortedData.pop());
  recursion(sortedData, i);
  } if (sortedData.length===1 && i > 0) {
    recursion(tempArray, i++)
  }
}
// //On each iteration

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
   if (indexOfRow(averageArray, point.data[0]) === -1) {
    aveArray.push([point.data[0],1]);
   }
  else aveArray[indexOfRow(averageArray, point.data[0])][1]++
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
// //Creates new Array sorted by playback moment

function sortRanges (datasets) {
  let mapped = datasets.map( function (el, i) {
    return { index: i, value: el.data[0].x }})
  // sorting the mapped array containing the reduced values
  mapped.sort(function (a, b) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
  });
  // container for the resulting order
  let result = mapped.map(function (el){ return datasets[el.index]});
  return result
}