class webView extends Deup {
  
 config = {
    name: 'webView',
    logo: 'https://s2.loli.net/2023/08/17/dZeUNcuftSLaG41.png'
  };
  async check() {
    return true;
  }

  async get(object) {
        let title="webView测试";
        let content="目前的体验只能相当于RSS，期待大佬更新后可以自动加载下一章、上一章"
        let data=`<html><head><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" name="viewport"><style>body{width:95%;margin-right:auto;margin-left:auto;margin-bottom:50px}.title{text-align:center;font-size:1.5em;margin-top:10px;margin-bottom:10px}.content{font-size:1.2em;text-indent:2em;line-height:1.5em;letter-spacing:1px}img{display:block;margin-right:auto;margin-left:auto;max-width:80%;margin-top:10px;margin-bottom:10px}</style></head><body><div class="title">${title}</div><div class="content">${content}</div></body></html>`
        return {
          id:object.id,
          name:object.name,
          url:"blob://text/"+data
        }
    }

  async list(object, offset, limit) {
    return [{
      id:"1",
      type:"webview",
      name:"webView测试"
    }]
  }

  async search(object, keyword, offset, limit) {
}
}
Deup.execute(new webView());
