class NS extends Deup {
  config = {
    name: '小小工具',
    layout: 'grid',
    timeout: 10000,
    pageSize: 100,
    hasInput: false,
    logo: "https://src.onlinedown.net/Public/images/bigsoftimg/androidimg/simg/230000/225590.png"
  };

  inputs = {
    type: {
      label: "Api",
      placeholder: "https://jx.iqfk.top/60s.php?key=54K55paw6Iqx6Zuo",
      required: true
    }
  };

  baseurl = "https://jx.iqfk.top/60s.php?key=54K55paw6Iqx6Zuo";
  
  

  async check() {
    return true;
  }

  async get(object) {
    let data;
    if(object.id==1){
    const url = this.baseurl;
    let vdata= await $axios.get(url);
      vdata=vdata.data.data;
       data=`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            color: #333;
        }

        h1 {
            color: #0066cc;
        }

        p {
            margin-top: 10px;
        }

        img {
            width: 100%;
            max-height: 300px;
            object-fit: cover;
            border-radius: 8px; /* Add rounded corners to the image */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
            margin-top: 20px;
        }

        .news-item {
            margin-bottom: 20px;
            line-height: 1.5;
        }

        h2 {
            color: #0066cc;
        }

        ul {
            padding-left: 20px;
        }

        p.QQGroup {
            margin-top: 20px;
            font-weight: bold;
            color: #555;
        }
    </style>
</head>
<body>
    <h1>${vdata.date}</h1>
    <p><strong>【微语】</strong> ${vdata.weiyu}</p>
    <img src="${vdata.head_image}" alt="Head Image">

    <!-- Display News -->
    <div id="news">
        <h2>新闻</h2>
        <ul>
            ${vdata.news.map(newsItem => `<li class="news-item">${newsItem}</li>`).join('')}
        </ul>
    </div>

    
</body>
</html>
      `;}
      else if(object.id==2){
         data=`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>AI 朋友</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
        }

        form {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input {
            padding: 8px;
            width: 200px;
        }

        button {
            padding: 8px 15px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }

        #result {
            margin-top: 20px;
        }

        p {
            margin-bottom: 5px;
        }
    </style>
    <script>
        function submitForm() {
            var userInput = document.getElementById('userInput').value;
            var resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<p>You entered: ' + userInput + '</p>' + resultDiv.innerHTML;

            var apiUrl = 'https://api.lolimi.cn/API/AI/jj.php?msg=' + encodeURIComponent(userInput);
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var jsonResponse = JSON.parse(xhr.responseText);

                    if (jsonResponse && jsonResponse.code === 200 && jsonResponse.data && jsonResponse.data.output) {
                        resultDiv.innerHTML = '<p>AI Response: ' + jsonResponse.data.output + '</p>' + resultDiv.innerHTML;
                    } else {
                        resultDiv.innerHTML = '<p>API Response did not contain valid output.</p>' + resultDiv.innerHTML;
                    }
                }
            };

            xhr.open('GET', apiUrl, true);
            xhr.send();

            document.getElementById('userInput').value = '';
        }
    </script>
</head>
<body>
    <h1></h1>

    <form onsubmit="event.preventDefault(); submitForm();">
        <label for="userInput">你要对我说什么呢？</label>
        <input type="text" id="userInput" required>
        <button type="submit">Submit</button>
    </form>

    <div id="result"></div>
</body>
</html>

      `;
      }
      else if(object.id==3){
        data=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>小姐姐视频</title>
</head>
<body style="margin: 0; overflow: hidden;">

<video id="videoPlayer" style="width: 100%;" autoplay muted controls onended="refreshVideo()">
    Your browser does not support the video tag.
</video>

<script>
    function refreshVideo() {
        // 使用fetch获取新的API数据
        fetch('https://api.qqsuu.cn/api/dm-xjj?type=json&apiKey=b36a8bcae74753c27e601bb820640e4b')
            .then(response => response.json())
            .then(data => {
                // 获取新的视频链接
                const videoUrl = data.video;

                // 更新视频元素的src属性
                const videoPlayer = document.getElementById('videoPlayer');
                videoPlayer.src = videoUrl;
            })
            .catch(error => console.error('Error fetching API:', error));
    }

    window.onload = function() {
        // 初始化加载视频
        refreshVideo();
    };

    // 监听浏览器窗口大小变化，更新视频元素大小
    window.addEventListener('resize', function() {
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.style.width = '100%';
    });
</script>

</body>
</html>`
        }
      
    return {
      id: object.id,
      name: object.name,
      url: "blob://text/" + data
    };
    
  }

  async list(object, offset, limit) {
   
    return [{
      id: "1",
      type: "webview",
      name: "60s读懂世界"
    },{
      id: "2",
      type: "webview",
      name: "AI朋友"
    },{
      id: "3",
      type: "webview",
      name: "小视频"
    }];
    
  }

  async search(object, keyword, offset, limit) {
    $alert("不支持搜索");
  }
}

Deup.execute(new NS());
