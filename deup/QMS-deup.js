
class QMS extends Deup {
   config = {
    name: '秋名山见',
    layout: 'grid',
    timeout: 10000,
    pageSize: 100,
    logo:"https://s2.loli.net/2023/08/17/dZeUNcuftSLaG41.png"
  };
  baseurl="http://api.maiyoux.com:81/mf/";
  async check() {
    return true;
  }
  async get(object) {
        return object;
  }
  async list(object = null, offset = 0, limit = 20) {
    if(offset!=0)return [];
    let url=this.baseurl+(object?object.url:"json.txt");
         let {data}=await $axios.get(url);
         let all=object?data.zhubo:data.pingtai;
         let body=[];
         all?.map(x=>{
           let img=object?x.img:x.xinimg;
           body.push({id:x.address,name:x.title,cover:img,type:object?"video":"folder",thumbnail:img,poster:img,url:x.address,isLive:object?true:false});
           });
        return body;
  }
  async search(object, keyword, offset, limit) {
  }
}

Deup.execute(new QMS());
