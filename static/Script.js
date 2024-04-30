// function moveContainerToTop() 
// {
//     var container = document.querySelector('.center-container');
//     container.style.top = '45%';
// }
function addUnit(classKey, predictionValue) 
{
    var units = {'DH': 'days', 'GWPS': 'grams', 'PH':'cm','GY':'grams','GFD':'days','GNPS':'grains'};
    var unit = units[classKey] || 'units';
    return predictionValue + ' ' + unit;
}
function replac(ck)
{
    var cc={'DH':'Days to Heading','GWPS':'Grain Weight Per Spike','PH':'Plant Height','GY':'Grain Yield','GFD':'Grain Filling Duration','GNPS':'Grain Number Per Spike'};
    return cc[ck];
}
function submitForm() 
{
    var sequence = document.getElementById("sequence").value;
    var environment = document.getElementById("environment").value;
    fetch('/predict', 
    {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'sequence=' + encodeURIComponent(sequence) + '&environment=' + encodeURIComponent(environment),
    }).then(response => response.json()).then(data => 
    {
        var resultContainer = document.getElementById("result-container");
        resultContainer.innerHTML = '<h2 style="text-align:left; margin-left:80px; margin-top:10px;margin-bottom: 20px;">Predicted Values for End-Use Quality Traits : </h2>';
        var resultTable = '<table id="result">';
        resultTable += '<tr><th>Trait</th><th>Value</th></tr>';
        for (var key in data) 
        {
            resultTable += '<tr><td>' + replac(key) + '</td><td>' + addUnit(key,data[key])+'</td></tr>';
        }
        resultTable += '</table>';
        resultContainer.innerHTML += resultTable;
        resultContainer.style.display = 'block';
        var firstJumbotron = document.querySelector('.jumbotron.text-align.first');
        firstJumbotron.style.display = 'block';
        var cj = document.querySelector('.jumbotron.text-align');
        // cj.style.display='none';
        var ft=document.querySelector('footer');
        ft.style.position='static';
        // var hd=document.querySelector('header');
        // hd.style.position='relative';
        window.scrollBy(0,400);

    });
}