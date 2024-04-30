/**
站点链接集，网址内容格式为:

将vod.txt文件上传到一个网址，然后链接指向。

**/


class FD extends Deup {
  config = {
    name: 'FD ',
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
  
  ubaseurl="";
  
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
        return object;
  }
  
  async list(object = null, offset = 0, limit = 20) {
    const page = Math.floor(offset / limit) + 1;
    let dis=await $storage.get("dis");

 if(object==null&&dis!="0"){
    if(offset!=0)return [];
    const url = (await $storage.inputs).url || this.ubaseurl;
         let {data}=await $axios.get(url);
         
         const list = [];
         const dataRows = data.split('\n');
               dataRows.forEach(row => {
         const [uname, uurl] = row.split(',').map(item => item.replace(/\s/g, ''));
         let tmp={ id:uurl, name:uname, url:uurl, type:"folder",extra:{0:2}}
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
        name:`${fname}\n`+data.vod_content,
        url: tmp[0].id,
        remark: data.vod_name,
        type:"video",
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

Deup.execute(new FD());
