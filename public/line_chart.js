var LineChart = function(dates, name1, temperatureData, name2, secondTemperatureData) {

  var container = document.querySelector("#line-chart");

  var chart = new Highcharts.Chart({
    chart: {
      type: 'line',
      renderTo: container
    },

    title: {
      text: 'Weather chart'
    },

    yAxis: {
        title: {
            text: 'Temperature (Celcius)'
        }
    },

    xAxis: {
      categories: dates
    },

    series: [{
      name: name1,
      data: temperatureData
    }, {
      name: name2,
      data: secondTemperatureData
    }]

  });

}
