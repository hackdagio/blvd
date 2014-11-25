
d3.json('entel/ponderado.json', function(data) {
    data_graphic({
        title: "Ponderado",
        description: "entel",
        data: data,
        width: 650,
        height: 150,
        target: '.linecharts',
        x_accessor: 'Mes',
        y_accessor: 'Ponderado'
    })
})