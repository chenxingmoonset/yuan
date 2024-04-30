class oneanime extends Deup {

    config = {
    name: '1anime',
    logo:'https://1anime.me/template/conch/asset/img/favicon1.png',
    layout:'poster',
    pageSize:20,
    timeout:5000
    };
    
    check = ()=>true;
    
    
    async get(object) {
     
        return object;/*{
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
        };
*/
    
}
    
    async list(object = null, offset = 0, limit = 72) {
        if (object===null){
            const page = Math.floor(offset / limit) + 1;
            const response = await $axios.get(`https://1anime.me/vodshow/1--------${page}---.html`);
            const $ = $cheerio.load(response.data);
            let list=[];
            $('a.module-item').map((i, el) => {
            const $a = $(el)//.find('a');
            const $image = $(el).find('div.module-item-pic img');
            const cover = $image.attr('data-original');
            const vacover = this.valid(cover);
            const name = $a.attr('title');
            const id=$a.attr('href');
            list.push({
              id: id,
              name: name,
              thumbnail: vacover,
              cover: vacover,
              poster: vacover,
              type: 'folder',
              extra:{list:"folder",},
            });
            });
            return list;
        }
        if (object.extra.list==="folder"){
            let host="https://1anime.me";
            let url=host.concat(object.id);
            //$alert(url);
            let resp=await $axios.get(url);
            let list=[];
            const $=$cheerio.load(resp.data);
            $("a.module-play-list-link").map((i,el)=>{
                const $a=$(el)//.find('a');
                const name=$a.attr('title');
                //$alert(name);
                const id=$a.attr('href');
                list.push({
                    id:id,
                    name:name,
                    cover:object.cover,
                    thumbnail:object.cover,
                    poster:object.cover,
                    type:'folder',
                    extra:{list:'episodelist',episodeid:id,episodename:name},
                });
            });
            return list;
        }
        if (object.extra.list='episodelist'){
            let host='https://1anime.me';
            let vidpurl=host.concat(object.extra.episodeid);
            let resp=await $axios.get(vidpurl);
            //const $=$cheerio.load(resp.data);
            let content=resp.data;
            let list=[];
            const vidurl=content.match(/http.*?(m3u8|mp4)/g)[0];
            const vidsrc=vidurl.replace(/\\/g,"");
            $alert(vidsrc);
            list.push({
                    id:object.extra.episodeid,
                    name:object.extra.episodename,
                    remark:object.extra.episodename,
                    cover:object.cover,
                    poster:object.cover,
                    thumbnail:object.cover,
                    type:'video',
                    url:vidsrc,
            });
            return list;
        }
    }

    async search(object, keyword, offset, limit=15){
        const page=Math.floor(offset/limit)+1;
        const url=`https://1anime.me/vodsearch/-------------.html?wd=${keyword}&submit=`
;
        const response= await $axios.get(url);
        let list=[];
        const $=$cheerio.load(response.data);
        $('div.module-items>div').map((i,el)=>{
            const name=$(el).find('div.module-card-item-title a').text();
            const cover=$(el).find('img').attr('data-original');
            //$alert(cover);
            const id=$(el).find('a').attr('href');
            list.push({
                id:id,
                namw:name,
                cover:cover,
                poster:cover,
                thumbnail:cover,
                type:'folder',
                extra:{list:"folder",},
            });
        });
        return list;
    }

    valid(url){
        const host=`https://1anime.me`;
        const hostPattern=/^(https?:\/\/)?(?:www\.)?([\w.-]+)/;
        const match=url.match(hostPattern);
        if (match&&match[2]){return url;} else {url =`${host}${url}`;return url;};
}
    /*async axios(url){
        let resp=await $axios.get(url);
        return resp;
    }*/
        
}

Deup.execute(new oneanime());
