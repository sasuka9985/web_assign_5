# Weather 作業
[作業說明PPT][2]

## 補充提示：要怎麼拿到 Yahoo 天氣資料？
1. 打開連結 https://developer.yahoo.com/weather/
2. 直接看到他的第一個 example `Forecast for Nome, AK`
3. YQL Query 那個欄位是指說，如果用 yql 的方式，要怎麼撰寫他的 query
4. 觀察 yql 欄位裡 `where text="nome, ak"` 這裡就是在指定地區。你可以試著把`nome, ak`換成`Taipei City`後點`Test`
5. 閱讀 Response 區域裡面的資料，找看看你要的資訊放在哪個節點裡
6. 複製 `endpoint` 貼到網址列打開，就會回傳對應的 json ，裡面放著 `Taipei City` 的天氣資料
7. 如何指定溫度單位，可自行研究此[文件][3]。如果太難，也可以自行在 js 裡面寫函式轉換單位
8. 到自己的作業用 `jquery` 對第6步獲得的網址 `getJSON` 就可以拿到資料了：
	```javascript
	$.getJSON("<某縣市的_endpoint_URL>",function(data){
		// 可以比較方便找到你要的資料在這個物件的哪個位置
		console.log (data) ;

		// 例如如果要拿取該縣市的目前溫度。
		var currentTemperature = data.query.results.channel.item.condition.temp  ;
	})
	```

## 補充提示：要怎麼使用 Skycon 圖示來呈現 yahoo 的天氣狀況？
1. 要怎麼知道 怎麼使用 skycon ：作業檔案裡面的 js 已經有示範怎麼使用了
2. 要怎麼知道 skycon 有哪些天氣圖示呢：觀察作業檔案裡面怎麼使用 skycon：
	```javascript
	skycons.add("today", Skycons.PARTLY_CLOUDY_DAY);
	```
3. 我們從第2步發現用 `PARTLY_CLOUDY_DAY` 這個關鍵字可以叫出陰天
4. 到這個套件的[原始碼][1]裡面找看看這關鍵字定義在哪裡，就能在那個區塊附近看到其他的天氣關鍵字了
5. 想辦法找到 yahoo 到底會有哪些天氣狀況，找不到可以到討論區發問
6. 透過 if 或 switch 的方式，將 yahoo 的天氣一一對應到最適合的 skycon 的天氣關鍵字

[1]: https://darkskyapp.github.io/skycons/skycons.js
[2]: https://goo.gl/lPGaqR
[3]: https://developer.yahoo.com/weather/documentation.html
