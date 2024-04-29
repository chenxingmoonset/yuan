/**
站点链接集，网址内容格式为:

"name"="海外看資源","api"="https://haiwaikan.com/api.php/provide/vod/"

**/


class FDS extends Deup {
  config = {
    name: 'FDS ',
    layout: 'grid',
    timeout: 10000,
    pageSize: 20,
    logo:"https://zhengxin-pub.cdn.bcebos.com/mark/9252f655a45f91a64b6d025662caa373.jpg"
   };

  inputs={
   url:{
    label:"站点链接集",
    placeholder:"请输入站点链接集",
    required:false
    }}
  
  ubaseurl="https://raw.githubusercontent.com/sooyaaabo/cms-player/main/vod-source.json";
  
  async check() {
    try {
      let dis=(await $storage.inputs).discover;
      if((await this.list()).length > 0){
        return true}else if((await this.list({extra:{0:0,1:1}})).length > 0){
        await $storage.set("dis","0");
      return true}
    } catch (e) {
    }

    return false;
  }
  
  async get(object) {
        let vdata = object.related;
    let data = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Embedded Player</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        #videoPlayer {
            width: 100%;
            height:248px;
            margin-bottom: 20px;
            background-color: black; /* Set the background color to black */
        }

        #videoList {
            list-style: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center; /* Center items in the flex container */
        }

       #videoListContainer {
        max-height: 100%; /* 设置最大高度，超过这个高度将出现滚动条 */
        overflow-y: auto; /* 启用垂直滚动条 */
        border: 1px solid #ccc;
        margin-bottom: 20px;
    }

        #videoList li {
            margin: 0 5px;
            margin-bottom: 10px;
            cursor: pointer;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            transition: background-color 0.3s;
            width: 150px; /* Set the width of each item */
            text-align:center;
        }

        #videoList li:hover {
            background-color: #f0f0f0;
        }
    </style>
</head>
<body>
    <iframe id="videoPlayer" frameborder="0" allowfullscreen onended="playNext()"></iframe>
    <div>视频资源</div>
<div id="videoListContainer">
    <ul id="videoList">
        <!-- JavaScript will populate this list dynamically -->
    </ul>
</div>
    <script>
        var currentVideoIndex = 0;
        var videoList = ${JSON.stringify(vdata)};
        // Function to dynamically create list items
        function populateVideoList() {
            var listContainer = document.getElementById('videoList');
            videoList.forEach(function (video, index) {
                var listItem = document.createElement('li');
                listItem.textContent = video.name;
                listItem.onclick = function () {
                    changeVideo(video.url);
                };
                listContainer.appendChild(listItem);
            });
        }

        function changeVideo(videoUrl) {
            var videoPlayer = document.getElementById('videoPlayer');
            videoPlayer.src = "https://jx.777jiexi.com/player/?url=" + videoUrl;
            videoPlayer.play();
        }

        function playNext() {
            currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
            changeVideo(videoList[currentVideoIndex].url);
        }

        // Populate the video list on page load
        populateVideoList();
    </script>
</body>
</html>`;
    
    return {
      id: object.id,
      name: object.name,
      url: "blob://text/" + data
    };
  
        //return object;
  }
  
  async list(object = null, offset = 0, limit = 20) {
    const page = Math.floor(offset / limit) + 1;
    let dis=await $storage.get("dis");

 if(object==null&&dis!="0"){
    if(offset!=0)return [];
    const url = (await $storage.inputs).url || this.ubaseurl;
        let {data}=await $axios.get(url);
        const list = [];
        Object.values(data).forEach(function(obj) {
        let tmp = { id: obj.api, name: obj.name, url: obj.api,type:"folder",extra:{0:2}};
        list.push(tmp);
      });
        return list;
      }
    let baseurl= await $storage.get("rurl")||"";
    if(object?.extra["0"]==2&&dis!="0"){
         if(offset!=0)return [];
         let baseurl = object.id.replace(/at\/xml\/?$/,"");
         let rurl =await $storage.set("rurl",baseurl);
         let {data}=await $axios.get(baseurl);
         let nav=data?.class||[];
         let navs=new Set();
         nav.forEach(x=>{
            navs.add(x.type_pid)
         });
         let body=[];
         for(let i=0;i<nav.length;i++){
              let d=nav[i];
              if(navs.has(d.type_id))continue;
              let tmp={
               id:String(d.type_id),
               name:d.type_name,
               type:"folder",
               extra:{0:0}
               };
           body.push(tmp);
       }
        return body;
    }
    else if(object?.extra["0"]==0||(object==null&&dis=="0")){
        let url;
        if(object?.extra["1"]==1||dis=="0"){
        url=`${baseurl}?ac=detail&pg=${page}&pagesize=${limit}`}
        else{
        url=`${baseurl}?ac=detail&t=${object.id}&pg=${page}&pagesize=${limit}`;}
        let {data}=await $axios.get(url);
   return this.getVideo(data)
    }
    else if(object.extra["0"]==1){
       let url=`${baseurl}?ac=detail&ids=${object.id}`;
        let {data}=await $axios(url);
        let result=this.formatVideoList(data);
        return result;
    }
  }
  async search(object, keyword, offset, limit) {
    try {
      let baseurl= await $storage.get("rurl")||"";
      const page = Math.floor(offset / limit) + 1;
      const {data} = await $axios.get(
        `${baseurl.replace(/at\/xml\/?/,"")}?ac=detail&wd=${keyword}&pg=${page}&pagesize=${limit}`,
      );
      return this.getVideo(data);
    } catch (e) {
    }
    return [];
  }
  getVideo(data){
     let nav=data.list;
   let body=[];
   nav.map((d)=>{
     let time=new Date(Date.parse(d.vod_time.replace(' ', 'T')),).toISOString();
   let tmp={
     id:String(d.vod_id),
     name:d.vod_name,
     type:"folder",
     thumbnail:d.vod_pic,
     cover:d.vod_pic,
     poster:d.vod_pic,
     remark:d.vod_remarks,
     modified: time,
     extra:{0:1}
   };
   body.push(tmp);
   });
   return body;
  }
  formatVideoList(data) {
    data=data.list[0];
    let fm=data.vod_play_from.split("$$$");
    let pu=data.vod_play_url.split("$$$");
    let list = [];
    let time=new Date(Date.parse(data.vod_time.replace(' ', 'T')),).toISOString();
    for (let i = 0; i < fm.length; i++) {
        let fname =fm[i];
        let puf=pu[i].split("#");
        let tmp=[];
        for (let j = 0; j < puf.length; j++) {
            let x=puf[j].split("$");
            if(x.length==1){x.unshift("正文")};
            tmp.push(
            {
              id:x[1],
              name: x[0], 
              url: x[1],
              type:"video",
              remark: data.vod_name,
              thumbnail: data.vod_pic,
              cover:data.vod_pic,
              poster: data.vod_pic,
              modified: time
            })
      }
      let tt={
        id:tmp[0].id,
        name:`${fname}\n`+data.vod_blurb,
        url:tmp[0].id,
        remark: data.vod_name,
        type:"webview",
        thumbnail: data.vod_pic,
        cover:data.vod_pic,
        poster: data.vod_pic,
        modified: time,
        related:tmp
       }
       list.push(tt)
     }
    return list;
  }
}

Deup.execute(new FDS());