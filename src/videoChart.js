


  let myChart = new Chart(ctx, {
    labels: [0, 2, vid.duration],
    type: 'line',
    data: {
        datasets: [
        {
            label: 'Scatter Dataset',
            fill: false,
            data: [
                {x: 0, y: 5},
                {x: 4, y: 5}
            ]
        },
        {
            label: 'Second dataset',
            fill: false,
            data: [
                {x: 2, y: 0},
                {x: 6, y: 1}
            ]
        }
        ]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
})

function createLinesArr (timeObj) {
  let replay = Math.ceil(myChart.data.datasets.length);
  lines[0] = {x: timeObj.start, y: replay}
  lines[1] = {x: timeObj.stop, y: replay}

  myChart.data.datasets.push({
    label: replay + "chart",
    fill: false,
    data: lines
  })

}



