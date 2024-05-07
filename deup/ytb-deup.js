/*testing*/
class ytb extends Deup {

    config = {
    name: 'YouTube',
    logo:'https://www.youtube.com/s/desktop/7c0eb0c2/img/favicon_144x144.png',
    pageSize:20,
    timeout:10000
    };
    
    check = ()=>true;
    
    
    async get(object) {
       return object/*{
          id: object.id,
          name:object.name,
          cover: object.cover,
          url: object.url,
          type: 'video',
          headers: {
            Referer: url,
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
          },        
        }*/;
    }
    
    async list(object = null, offset = 0, limit = 20) {
        if (object===null){
            const page = Math.floor(offset / limit) + 1;
            const response = await $axios.get('https://www.youtube.com/feed/explore');

            const txt=response.data.match(/(?<=ytInitialData =).*?(?=;<)/g)[0];
            //this.deshow(txt);
            const $=JSON.parse(txt);
            //$alert(txt);
            let list=[];
            const item=$.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[4].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items;
            item.forEach((element) => {
                const $el=element.videoRenderer;
                const cover=$el.thumbnail.thumbnails[0].url;//0: 120x90,default; 1:320x180,mq; 2:480x360,hq; 3:640x480,sd; 4:686x386, hq720
                const name = $el.title.runs[0].text;
                const id = $el.videoId;
                //const size = "无";//$el.lengthText.accessibility.accessibilityData.label;
                const author = $el.shortBylineText.runs[0].text;
                const audience = $el.viewCountText.simpleText;
                const remark = "作者：" + author + "；观看人数：" + audience;
                //const created = $el.publishedTimeText.simpleText;
                list.push({
                    id: id,
                    name: name,
                    remark: remark,
                    thumbnail: cover,
                    cover: cover,
                    poster: cover,
                    //created: created,
                    type: 'folder',
                    extra:{"step":1,},
                    headers: {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',},
                });
            });
            return list;
        }
        if (object.type === "folder"){
            let host = "https://www.youtube.com/embed/";
            var vid = object.id;//.match(/(?<==).+/g)[0];
            let url = host.concat(vid);
            let resp = await $axios.get(url);
            let list = [];
            const $ = $cheerio.load(resp.data);
            const vidsrc = $('video').attr('src');
            list.push({
                id: '1',
                name: object.name + '网页观看',
                remark: object.remark,
                type:'webview',
                url:url,
                thumbnail: object.cover,
                cover:object.cover,
                poster:object.cover,
                created:object.created,
            });
            list.push({
                id: '2',
                name: object.name,
                remark: object.remark,
                type:'video',
                url:vidsrc,
                thumbnail: object.cover,
                cover:object.cover,
                poster:object.cover,
                created:object.created,
            });
            return list;
        }
        
    }

    async search(object = null, keyword, offset = 0, limit=20){
        const page = Math.floor(offset / limit) + 1;
        const response = await $axios.get(`https://www.youtube.com/results?search_query=${keyword}`);
            //const $ = $cheerio.load(response.data);
            const txt=response.data.match(/(?<=ytInitialData =).*?(?=;<)/g)[0];
            //this.deshow(txt);
            const $=JSON.parse(txt);
            let list=[];
            const item=$.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
            //$alert(item[0]);
            item.forEach((element) => {
                const $el=element.playlistRenderer||element.videoRenderer;
                //$alert($el);
                //0: 120x90,default; 1:320x180,mq; 2:480x360,hq; 3:640x480,sd; 4:686x386, hq720
                const name = $el.title.runs[0].text;
                const id = $el.videoId;
                const cover="https://i.ytimg.com/vi/"+id+"/hq720.jpg";
                const size = $el.lengthText.accessibility.accessibilityData.label;
                const author = $el.shortBylineText.runs[0].text;
                const audience = $el.viewCountText.simpleText;
                const remark = "时长: " + size + "; 作者：" + author + "；观看人数：" + audience;
                const created = $el.publishedTimeText.simpleText;
                const url = $el.navigationEndpoint.watchEndpoint.watchEndpointSupportedOnesieConfig.html5PlaybackOnesieConfig.commonConfig.url;
                list.push({
                    id: id,
                    name: name,
                    remark: remark,
                    thumbnail: cover,
                    cover: cover,
                    poster: cover,
                    //created: created,
                    type: 'folder',
                    extra:{"step":1,url:url},
                    headers: {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',},
                });
            });
            return list;
        }

    async axios(url){
        let resp=await $axios.get(url);
        return resp;
    }

    /*async deshow(txt){
        txt=txt.replace(/\x22/g,'"');
        txt=txt.replace(/\x3d/g,'=');
        txt=txt.replace(/\x7b/g,'{');
        txt=txt.replace(/\x7d/g,'}');
        txt=txt.replace(/\x5b/g,'[');
        txt=txt.replace(/\x5d/g,']');
        txt=txt.replace(/\x27/g,"'");
        return txt;
    }*/
//const item=$.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].selfRenderer.content.horizontalListRenderer.items;
        
}

Deup.execute(new ytb());
            