class ygg01 extends Deup {

    config = {
    name: 'ygg影视',
    logo:'https://ygg01.com/mxtheme/images/logo.png',
    //layout:'poster',
    pageSize:20,
    timeout:5000
    };
    
    inputs={
      type:{
        label:'类别',
        required: false,
        placeholder: '默认为电影，详情查看注释，eg：1',
        /*电影:1，电视剧：2，综艺：3，动漫：4，短剧：5*/
        },
      };
    
    async check(){
      try{
        return (await this.list()).length>0;
        }catch(e){
        $alert(e.message);
        }
      return false;
      };
    
    
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
            const type=(await $storage.inputs).type||'1';
            const response = await $axios.get(`https://ygg01.com/vodshow/${type}--------${page}---.html`);
            const $ = $cheerio.load(response.data);
            let list=[];
            $('a.module-poster-item').map((i, el) => {
            const $a = $(el).find('a').first();
            const $image = $(el).find('img');
            const cover = $image.attr("data-original");
            const name = $(el).find('div.module-poster-item-title').text();
            const id=$(el).attr('href');
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
            let host="https://ygg01.com";
            let url=host.concat(object.id);
            let resp=await $axios.get(url);
            let list=[];
            const $=$cheerio.load(resp.data);
            $("a.module-play-list-link").map((i,el)=>{
                const $a=$(el);
                const name=$a.text();
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
            let host='https://ygg01.com';
            let vidpurl=host.concat(object.extra.episodeid);
            //let resp=await $axios.get(vidpurl);
            
            let content=(await $axios.get(vidpurl)).data;
            //$alert(content);
            let vidurl=content.match(/https?:[^\s]+\.m3u8/g)[0];
            vidurl=vidurl.replace(/\\/g, '');
            //$alert(vidurl);
            //const $=$cheerio.load(resp.data);
            let obj={
              id:object.extra.id,
              name:object.name,
              //poster:object.cover,
              type:'video',
              url:vidurl,}
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
        const response= await $axios.get(
            `https://ygg01.com/vodsearch/${keyword}----------${page}---.html`
        );
        let list=[];
        const $=$cheerio.load(response.data);
        $('div.module-card-item.module-item').map((i,e)=>{
            const name=$(e).find('img').attr('alt');
            const cover=$(e).find('img').attr('data-original');
            const id=$(e).find('div.module-card-item-title').find('a').attr('href');
            list.push({
                id:id,
                name:name,
                cover:cover,
                thumbnail:cover,
                poster:cover,
                type:'folder',
                extra:{list:"folder",},
            });
        });
        return list;
    }

/*    async axios(url){
        let resp=await $axios.get(url);
        return resp;
    }*/
        
}

Deup.execute(new ygg01());

