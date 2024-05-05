/* 测试中 */
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
            const response = await $axios.get('https://www.youtube.com/feed/explore?app=desktop');
            const $ = $cheerio.load(response.data);
            let list=[];
            $('#grid-container').children('ytd-video-renderer').map((i, el) => {
            const $a = $(el).find('a#video-title');
            const $image = $(el).find('a#thumbnail>yt-image>img');
            const cover = $image.attr('src');
            const name = $a.attr('title');
            const id = $a.attr('href');
            const size = $(el).find('badge-shape>div').text();
            const author = $(el).find('div#text-container>#text>div').text();
            const audience = $(el).find('#metadata-line > span:nth-child(3)').text();
            const remark = "视频时长：" + size + "；作者：" + author + "；观看人数：" + audience;
            const created = $(el).find('#metadata-line > span:nth-child(4)').text();
            list.push({
              id: id,
              name: name,
              remark: remark,
              thumbnail: cover,
              cover: cover,
              poster: cover,
              created: created,
              type: 'folder',
              extra:{step:"1",},
              headers: {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',},
            });
            });
            return list;
        }
        if (object.type === "folder"){
            let host = "https://www.youtube.com/embed/";
            var vid = object.id.match(/(?<==).+/g)[0];
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
                url:'blob://text/' + resp.data,
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
        const response = await $axios.get('https://www.youtube.com/results?search_query=${keyword}');
        const $ = $cheerio.load(response.data);
        let list=[];
        $('#grid-container').children('ytd-video-renderer').map((i, el) => {
        const $a = $(el).find('a#video-title');
        const $image = $(el).find('a#thumbnail>yt-image>img');
        const cover = $image.attr('src');
        const name = $a.attr('title');
        const id = $a.attr('href');
        const size = $(el).find('badge-shape>div').text();
        const author = $(el).find('div#text-container>#text>div').text();
        const audience = $(el).find('#metadata-line > span:nth-child(3)').text();
        const remark = "视频时长：" + size + "；作者：" + author + "；观看人数：" + audience;
        const created = $(el).find('#metadata-line > span:nth-child(4)').text();
        list.push({
          id: id,
          name: name,
          remark: remark,
          thumbnail: cover,
          cover: cover,
          poster: cover,
          created: created,
          type: 'folder',
          extra:{step:"1",},
          headers: {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',},
        });
        });
        return list;
    }

    async axios(url){
        let resp=await $axios.get(url);
        return resp;
    }
        
}

Deup.execute(new ytb());
