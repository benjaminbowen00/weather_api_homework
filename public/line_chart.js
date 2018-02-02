var LineChart = function(dates, temperatureData) {

  var container = document.querySelector("#line-chart");

  var chart = new Highcharts.Chart({
    chart: {
      type: 'line',
      renderTo: container
    },

    title: {
      text: 'Weather chart'
    },

    xAxis: {
      categories: dates
    },

    series: [{
      name: "temperature",
      data: temperatureData
    }]

  });

}
