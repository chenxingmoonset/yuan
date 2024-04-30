class emv extends Deup {

    config = {
    name: '八八影视',
    logo:'https://www.88mv.org/template/pc88ysw/Images/logo.png',
    layout:'poster',
    pageSize:20,
    timeout:5000
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
          },        };*/
    
    }
    
    async list(object = null, offset = 0, limit = 20) {
        if (object===null){
            const page = Math.floor(offset / limit) + 1;
            const response = await $axios.get(`https://m.88mv.org/vod-type-id-1-pg-${page}`);
            const $ = $cheerio.load(response.data);
            let list=[];
            $('.globalPadding>ul').first().children('li').map((i, el) => {
            const $a = $(el).find('a').first();
            const $image = $(el).find('img');
            const cover = $image.attr('data-src');
            const name = $a.attr('title');
            const id=$a.attr('href');
            list.push({
              id: id,
              name: name,
              thumbnail: cover,
              cover: cover,
              poster: cover,
              type: 'folder',
              extra:{list:"folder",},
            });
            });
            return list;
        }
        if (object.extra.list==="folder"){
            let host="https://m.88mv.org";
            let url=host.concat(object.id);
            let resp=await $axios.get(url);
            let list=[];
            const $=$cheerio.load(resp.data);
            $("dd").map((i,el)=>{
                const $a=$(el).find('a');
                const name=$a.attr('title');
                const id=$a.attr('href');
                list.push({
                    id:id,
                    name:name,
                    type:'folder',
                    cover:object.cover,
                    poster:object.cover,
                    extra:{list:'episodelist',episodeid:id,episdoename:name},
                });
            });
            return list;
        }
        if (object.extra.list==='episodelist'){
            let host='https://m.88mv.org';
            let vidpurl=host.concat(object.extra.episodeid);
            let resp=await $axios.get(vidpurl);
            
            //const $=$cheerio.load(resp.data);
            let obj={
              id:object.extra.id,
              name:object.extra.name,
              poster:object.cover,
              type:'webview',
              url:'blob://text/'+resp.data,};
            let list=[];
            /*$('iframe').map((item)=>{
                const src=$(item).attr('src');
                const body=this.axios(src);
                const content=body.data;
                const vidurl=content.match(/http.*?(m3u8|mp4)/g);
                list.push({
                    id:object.extra.episodeid,
                    name:object.extra.episdoename,
                    cover:object.cover,
                    type:'video',
                    url:vidurl,
                });
            });
            return list;*/
            list.push(obj);
            return list;
        }
    }

    async search(object = null, keyword, offset = 0, limit=20){
        const page=Math.floor(offset/limit)+1;
        const response= await axios.get(
            `https://m.88mv.org/search/search.php?q=wd-${keyword}-pg-${page}`
        );
        let list=[];
        const $=$cheerio.load(response.data);
        $('#data_list li').map((i,e)=>{
            const name=$(e).find('a').attr('title');
            const cover=$(e).find('img').attr('data-src');
            const id=$(e).find('a').attr('href');
            list.push({
                id:id,
                namw:name,
                cover:cover,
                poster:cover,
                type:'folder',
                extra:{list:"folder",},
            });
        });
        return list;
    }

    async axios(url){
        let resp=await $axios.get(url);
        return resp;
    }
        
}

Deup.execute(new emv());
