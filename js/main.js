chart();

async function chart() {
    const data = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xLabel,

            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
                data: data.yLabel,
                backgroundColor:
                    'rgba(255, 99, 132, 0.2)'
                ,
                borderColor:
                    'rgba(255, 99, 132, 1)'
                ,
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value + '°';
                        }
                    }
                }]
            }
        }

    });
}
async function getData() {
    const xLabel = [];
    const yLabel = [];
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const col = row.split(',');
        const year = col[0];
        xLabel.push(year)
        const temp = col[1];
        yLabel.push(parseFloat(temp) + 14)
        console.log(year)

    })
    return { xLabel, yLabel }
}