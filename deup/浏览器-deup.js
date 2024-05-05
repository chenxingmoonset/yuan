/*Deup的rss订阅示例  需要version>1.0.6 */
class webView extends Deup {
  
 config = {
    name: 'deup浏览器',
    logo: 'https://s2.loli.net/2023/08/17/dZeUNcuftSLaG41.png'
  };
  async check() {
    return true;
  }
  
  inputs={
    url:{
      label:"链接",
      require:true,
    },
    logo:{
      label:"图标",
      require:true,
    },
  }
    

  async get(object) {
        //$alert((await $storage.inputs).logo);
        return {
          id:object.id,
          name:object.name,
          remark:"浏览器测试",
          options:{hideNavBar:false,},
          url:(await $storage.inputs).url,
          cover:object.cover,//(await $storage.inputs).logo,
          thumbnail:(await $storage.inputs).logo,
          poster:(await $storage.inputs).logo,
        }
    }

  async list(object, offset, limit) {
    return [{
      id:"1",
      type:"webview",
      name:"浏览页",
      cover:(await $storage.inputs).logo,
      thumbnail:(await $storage.inputs).logo,
      poster:(await $storage.inputs).logo,
    }]
  }

  async search(object, keyword, offset, limit) {
}
}
Deup.execute(new webView());
