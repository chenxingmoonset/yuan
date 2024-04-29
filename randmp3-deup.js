/**

类别名称可填写: 热歌榜，新歌榜，飙升榜，抖音榜，电音榜
注意:字不要写错

**/
class MP extends Deup {
  config = {
    name: 'RandMP3',
    layout: 'grid',
    timeout: 10000,
    pageSize: 100,
    logo: "https://src.onlinedown.net/Public/images/bigsoftimg/androidimg/simg/230000/225590.png"
  };
  inputs = {
    type: {
      label: "歌曲类别",
      placeholder: "填写类别,见注释",
      required: true
    }
  }
  baseurl = "https://api.uomg.com/api/rand.music?sort=";
  async check() {
    return true;
  }
  async get(object) {
    return object;
  }
  async list(object = null, offset = 0, limit = 20) {
    if (offset != 0) 
      return [];
    
    const url = this.baseurl + (await $storage.inputs).type + "&format=json";
    let list = await $storage.get("olist") || null;
    if (list == null) {
      let i = 0;
      let list = [{
          id: "3",
          name: "刷新列表",
          type: "folder"
        }];
      while (i <= 20) {
        let {data} = await $axios.get(url);
        let tmp = {
          id: data.data.url,
          name: data.data.name,
          thumbnail: data.data.picurl,
          post: data.data.picurl,
          cover: data.data.picurl,
          url: data.data.url,
          type: "video"
        }
        list.push(tmp);
        i++;
      }
      $storage.set("olist", list);
      return list;
    } else if (object != null && object.id == "3") {
      let i = 0;
      while (i <= 20) {
        let {data} = await $axios.get(url);
        let tmp = {
          id: data.data.url,
          name: data.data.name,
          thumbnail: data.data.picurl,
          post: data.data.picurl,
          cover: data.data.picurl,
          url: data.data.url,
          type: "video"
        }
        list.push(tmp);
        i++;
      }
      $storage.set("olist", list);
      return list;
    }
    $storage.set("olist", list);
    return list;
  }
  async search(object, keyword, offset, limit) {}
}
Deup.execute(new MP());
