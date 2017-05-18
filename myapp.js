/*
Skycons is a set of ten animated weather glyphs, procedurally generated by JavaScript using the HTML5 canvas tag.
http://darkskyapp.github.io/skycons/
*/
var skycons = new Skycons();

  // you can add a icon to a html canvas. simply supply its element id and the weather you want to show.
  skycons.add("today", Skycons.PARTLY_CLOUDY_DAY);
  skycons.add("day1", Skycons.CLEAR_DAY);
  skycons.add("day2", Skycons.CLOUDY);
  skycons.add("day3", Skycons.RAIN);

  // start all icons animation!
  skycons.play();

  // update a icon on  canvas by its id
  skycons.set("today", Skycons.PARTLY_CLOUDY_NIGHT);

/*
Get value from Bootstrap dropdown menu
*/
var area = ["Taipei City", "New Taipei City", "Taichung City", "Tainan City", "Kaohsiung City", "Keelung City", "Taoyuan City", "Hsinchu City", "Hsinchu County", "Miaoli County", "Changhua County", "Nantou County", "Yunlin County", "Chiayi City", "Chiayi County", "Pingtung County", "Yilan County", "Hualien County", "Taitung County", "Penghu County", "Kinmen County", "Matsu"];

//華氏轉攝氏，四捨五入整數
function fToCel(fahrenheit) {
    var x = Math.round((5 / 9) * (fahrenheit - 32))
    return x;
}
//天氣setIcon
function setIcon(des) {
    switch (des) {
        case "Sunny":
            return "clear_day";
            break;
        case "Mostly Sunny":
            return "clear_day";
            break;
        case "Partly Cloudy":
            return "partly_cloudy_day";
            break;
        case "Mostly Cloudy":
            return "cloudy";
            break;
        case "Cloudy":
            return "cloudy";
            break;
        case "Windy":
            return "wind";
            break;
        case "Breezy":
            return "wind";
            break;
        case "Fog":
            return "fog";
            break;
        default:
            return "rain";
            break;
    }
}

//助教的補件
function getWeatherJson(url, callback) {
    $.getJSON(url, function(data) {
        if (data.query.results) { 
            callback(data);
        } else {
            getWeatherJson(url, callback);
        }
    })
}


//初始
$(document).ready(function(){
    getWeatherJson("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taipei%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
        function(data){
            var currentTemperature = fToCel(data.query.results.channel.item.condition.temp);
            $('#nowTemp').text(currentTemperature);
            updatePage(0);
        })
});

//更新頁面
function updatePage(i) {
    getWeatherJson("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + area[i] + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
        function(data) {
            console.log(data);
            $('.temperature').text(fToCel(data.query.results.channel.item.condition.temp));
            $('.date').text(data.query.results.channel.item.forecast[0].date);
            var des = data.query.results.channel.item.forecast[0].text;
            $('#condition').text(des);
            skycons.set("today", setIcon(des));
            $('.time').each(function(index, element) {
                var $date = $(element);
                $date.text(data.query.results.channel.item.forecast[index + 1].date);
            })
            $('.temp').each(function(index, element) {
                var $range = $(element);
                $range.text(fToCel(data.query.results.channel.item.forecast[index + 1].high) + " - " + fToCel(data.query.results.channel.item.forecast[index + 1].low));
            })
            skycons.set("day1", setIcon(data.query.results.channel.item.forecast[1].text));
            skycons.set("day2", setIcon(data.query.results.channel.item.forecast[2].text));
            skycons.set("day3", setIcon(data.query.results.channel.item.forecast[3].text));
        });
}

//點選更新頁面，拿城市
$('#dropdown li').on('click', function() {
    updatePage($(this).find('a').attr('tabindex'));
    $('#selArea').html($(this).find('a').html());
});

//選單溫度
var temps = $('#dropdown li span');
temps.each(function(i, element) {
    var temp = $(this);
    getWeatherJson("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + area[i] + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
        function(data) {
            var currentTemperature = fToCel(data.query.results.channel.item.condition.temp);
            temp.text(currentTemperature);
        });
})


