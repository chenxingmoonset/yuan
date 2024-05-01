/* @author: TT */
class BZ extends Deup {
  config = {
    name: '包子漫画新',
    logo: 'https://tw.baozimh.com/apple-icon-60x60.png',
    pageSize:80,
    timeout:20000,
    hasInput:false,
    headers : {
    'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1',
    'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'accept-language':'zh-CN,zh-Hans;q=0.9',
    'accept-encoding':'gzip, deflate, br',
}
  };
  inputs = {
    host: {
      label: '站点host',
      required: true,
      placeholder: 'https://tw.baozimh.com',
    }
  };
  host="https://tw.baozimh.com";
  loadimg="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";
  img404="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";
  imgadd="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";
  imgm="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";
  imgr="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";
  check=()=>true;

  async get(object) {
    try{
    if(object.extra.hasOwnProperty("url")&&await this.has_book(object.extra.url)){
    await this.set_read(object.extra.url,object.id);
  }
    let host=(await $storage.inputs).host||this.host;
    let url=`${host}${object.url}`
    this.init();
    let cd=await this.cacheGet();
    let html;
    if(cd&&cd.url==url){
       html=cd.data;
    }
    else{
       let {data}=await $axios.get(url);
       html=this.getContentHtml(host,data,this);
    }
    if(!cd||(object.extra?.nexturl&&cd.url!=(host+object.extra?.nexturl))){
    this.cacheReq(host+object.extra.nexturl);
    }
    return {
      id:"-",
      name:object.name,
      type: 'webview',
      url:"blob://text/"+html,
    };}catch(e){$alert("err:"+e)}
  }

  async list(object, offset, limit) {
    try{
      let lists=[],f=false;
    if(object==null){
       return await this.get_books();
    }
    else if(object.id==1){
         await this.col_books(object.extra[1],object.extra[2]);
         let ob=[{id:"2",name:"取消收藏",type:"folder",extra:object.extra,thumbnail:"blob://base64/"+this.imgm,cover:"blob://base64/"+this.imgm,poster:"blob://base64/"+this.imgm}];
         return ob.concat(object.extra[2]);
      }
     else if(object.id==2){
         await this.del_books(object.extra[1],object.extra[2]);
         let ob=[{id:"1",name:"加入收藏",type:"folder",extra:object.extra,thumbnail:"blob://base64/"+this.imgadd,cover:"blob://base64/"+this.imgadd,poster:"blob://base64/"+this.imgadd}];
         return ob.concat(object.extra[2]);
      }
    else if(await this.has_book(object.url)&&object.id!=3&&offset==0){
         lists=await this.get_read_list(object.url);
      }
    else if(offset!=0){return [];}
    else{
    if(object.id==3){
      object=object.extra;
      f=true;
    }
    this.init();
    let host=(await $storage.inputs).host||this.host;
   let url=`${host}${object.url}`;
   let {data}=await $axios.get(url);
   let $=$cheerio.load(data);
   let list=$("#chapter-items,#chapters_other_list").children(".comics-chapters");
   if(!list.length){
     list=$(".comics-chapters").toArray().reverse();
     list=$(list);
   }
   lists=list.map((i,el)=>{
     let name=$(el).find("span").text();
     let cover=object.cover;
     let url=$(el).find("a").attr("href");
     let ids=url.match(/section_slot=(\d+)&chapter_slot=(\d+)/);
     url=object.url.split("/");
     url.splice(2,0,"chapter");
     url=url.join("/")+`/${ids[1]}_${ids[2]}.html`
     return {
       id:i.toString(),
       name,
       type:"webview",
       cover,
       thumbnail:cover,
       poster:cover,
       url:encodeURI(url),
       extra:{url:object.url},
       options:{icon:true}
     }
   }).get();
   for(let i=0;i<lists.length-1;i++){
      lists[i].extra.nexturl=lists[i+1].url;
   }
 }
   let ob=[];
   let hs=await this.has_book(object.url)
   if(hs){
     ob=[{id:"2",name:"取消收藏",type:"folder",extra:{1:object,2:lists},thumbnail:"blob://base64/"+this.imgm,cover:"blob://base64/"+this.imgm,poster:"blob://base64/"+this.imgm}];
 }
   else{
     ob=[{id:"1",name:"加入收藏",type:"folder",extra:{1:object,2:lists},thumbnail:"blob://base64/"+this.imgadd,cover:"blob://base64/"+this.imgadd,poster:"blob://base64/"+this.imgadd,}];
   }
   if(f){
     await this.set_lists(object.url,lists)
   }
   else{
   lists=[{id:"3",name:"刷新列表",type:"folder",extra:object,thumbnail:"blob://base64/"+this.imgr,cover:"blob://base64/"+this.imgr,poster:"blob://base64/"+this.imgr}].concat(lists);
 }
   lists=ob.concat(lists);
   return lists;
 }catch(e){$alert("err:"+e)}
  }

  async search(object, keyword, offset, limit) {
    try{
     if(offset!=0){return []};
     this.init();
    let host=(await $storage.inputs).host||this.host;
    let url=`${host}/search?q=${keyword}`;
   let {data}=await $axios.get(url);
   let $=$cheerio.load(data);
   let list=$("body").find(".classify-items div.comics-card");
   let lists= list.map((i,el)=>{
        let name=$(el).find("h3").text();
        let cover=$(el).find("amp-img").attr("src");
        let url=$(el).find("a").attr("href");
        return {
          id:encodeURI(url),
          name,
          type:"folder",
          cover,
          remark:name,
          thumbnail:cover,
          poster:cover,
          url:encodeURI(url),
          options:{layout:"list"}
        }
      }).get();
   return lists;
    }catch(e){$alert("error:"+e);}
  }
  init(){
   $axios.defaults.headers.common['user-agent']=this.config.headers["user-agent"];
   $axios.defaults.timeout=this.config.timeout;
   }
  async col_books(book,lists){
       try{
       let books=await $storage.get("books")||{};
       books[book.url]=book;
       await Promise.all([await this.set_lists(book.url,lists),
       await $storage.set("books",books)]);
       $alert("✅加入收藏成功");
     }catch(e){$alert("❌加入收藏失败")}
    }
  async get_books(){
      let books=await $storage.get("books")||{};
      let lists=[];
      for(const [k,v] of Object.entries(books)){
        lists.push(v)
      }
      return lists;
  }
  async has_book(name){
       let books=await $storage.get("books")||{};
       return books[name]!=null;
    }
    async del_books(book){
       try{
       let books=await $storage.get("books")||{};
       delete books[book.url]
       await Promise.all([await $storage.set("books",books),
       await $storage.remove(book.url),
       await $storage.remove(book.url+"read")]);
       $alert("✅取消收藏成功");
     }catch(e){$alert("❌取消收藏失败")}
    }
    async set_lists(name,lists){
       await $storage.set(name,lists);
    }
    async get_lists(name){
       return await $storage.get(name);
    }
    async get_read(name){
       return await $storage.get(name+"read");
    }
    async set_read(name,i){
       await $storage.set(name+"read",i);
    }
    async get_read_list(name){
       let i=await this.get_read(name)||0;
       let lists=await this.get_lists(name);
       return lists.slice(i);
    }
    cacheReq(url){
        let self=this;
        let xhr = new XMLHttpRequest();
        xhr.open("get",url);
        xhr.setRequestHeader("user-agent",this.config.headers["user-agent"]);
       xhr.onload=async function(){
         let host=(await $storage.inputs).host||self.host;
         let html=self.getContentHtml(host,xhr.responseText,self);
          await self.cacheSet(url,html);
       }
        xhr.send()
      }
      async cacheSet(url,data){
          await $storage.set("cacheReq",{url:url,data:data});
      }
      async cacheGet(){
         let data=await $storage.get("cacheReq");
         return data
      }
      getContentHtml(host,data,th){
        let $=$cheerio.load(data);
        let imgs=$(".comic-contain amp-img");
       let cont=imgs.map((i,el)=>{
         let im=`<img height="150" onload="onImageLoaded(this)" onerror="err(this)" loading="lazy" src="${$(el).attr("data-src")}">`;
         return im;
       }).get().join("");
    let html=`
    <html lang="en"><head>
    <meta name="viewport" content="width=device-width,height=device-height,maximum-scale=3,user-scalable=yes">
<style>body{background-color:lightgray;margin:0 0 0 0}img{width:100%;background:url(data:image/gif;base64,${th.loadimg});background-repeat:no-repeat;background-position:50% 50%;background-size:80px;background-color:gray}</style>
<script>
    function onImageLoaded(e){e.removeAttribute("height")}
    function clk(e){let src=e.getAttribute("data-original");e.dataset.times=0;e.style.backgroundImage="url(data:image/gif;base64,${th.loadimg})";e.src=src+"?"+new Date().getTime();}
    function err(e){let d=Number(e.dataset.times||0);let src=e.src.split("?")[0];if(d>1){e.setAttribute("onclick","clk(this)");e.src="";return e.style.backgroundImage="url(data:image/png;base64,${th.img404})";}e.dataset.times=d+1;e.src=src+"?"+new Date().getTime();}
</script></head><body>${cont}</body></html>
    `
    return html;
      }
}

Deup.execute(new BZ());
