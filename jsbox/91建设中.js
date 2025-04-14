//building
const channelList = [
    { "name": "国产精华", "id": "/v.php?category=rf&viewtype=basic" },
    { "name": "91原创", "id": "/v.php?category=ori&viewtype=basic" },
    { "name": "当前最热", "id": "/v.php?category=hot&viewtype=basic" },
    { "name": "本月最热", "id": "/v.php?category=top&viewtype=basic" },
    { "name": "非付费", "id": "/v.php?category=nonpaid&viewtype=basic" },
    { "name": "本月收藏", "id": "/v.php?category=tf&viewtype=basic" },
 ];
const myHeaders = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
};
const urlt= "https://91porn.com";


$ui.render({
    props: {
        title: "91qaq"
    },
    views: [
        {
            type: "tab",
            props: {
                id: "menu",
                items: channelList.map(function (item) {
                    return item.name
                }),
            },
            layout: function (make) {
                make.top.inset(0);
                make.left.right.inset(2);
                make.height.equalTo(35);
            },
            events: {
                changed: function (sender) {
                    $cache.set("type", channelList[sender.index].id);
                    $cache.set("pg", 1);
                    getdata()
                }
            }
        },
        {
            type: "matrix",
            props: {
                id: "Video",
                itemHeight: 180,
                columns: 2,
                spacing: 7,
                template: [{
                    type: "image",
                    props: {
                        id: "img",
                        radius: 3
                    },
                    layout: function (make, view) {
                        make.centerX.equalTo(view.super);
                        make.height.equalTo(90);
                        make.width.equalTo(180);
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "pm",
                        align: $align.center,
                        lines: 0,
                        font: $font("bold", 15)
                    },
                    layout: function (make, view) {
                        make.top.equalTo($("img").bottom).offset(10);
                        make.right.left.inset(0)
                    }
                },
                ]
            },
            layout: function (make) {
                make.top.equalTo($("menu").bottom);
                make.bottom.left.right.inset(0)
            },
            events: {
                didSelect: function (sender, indexPath, data) {
                    geturl(data.url, data.pm.text)
                },
                didReachBottom: function (sender) {
                    sender.endFetchingMore();
                    var page = $cache.get("pg") + 1;
                    $cache.set("pg", page);
                    var type = $cache.get("type");
                    $ui.loading(true);
                    $http.get({
                        url: urlt + type + "&page=" + page,
                        header: myHeaders,
                        handler: function (resp) {
                            $ui.loading(false);
                            var arr = resp.data;
                            var html = arr.replace(/\n|\s|\r/g, "");//console.info(html);
                            var li = html.match(/<divclass="col-xs-12col-sm-4col-md-3col-lg-3".*?<\/a>/g);//console.log(li)
                            for (i in li) {
                                var dli = li[i];
                                $("Video").insert({
                                    indexPath: $indexPath(0, $("Video").data.length),
                                    value: {
                                        img: {
                                            src: dli.match(/img-responsive"src="(\S*?)"/)[1]
                                        },
                                        pm: {
                                            text: I(dli.match(/m-t-5">(\S*?)<\/span/)[1])
                                        },
                                        url: dli.match(/href="(\S*?)"/)[1]
                                    }
                                })
                            }

                        }
                    })

                }

            }
        }]
});


function getdata() {
    var type = $cache.get("type");
    $ui.loading(true);
    $http.get({
        url: urlt + type,
        header: myHeaders,
        handler: function (resp) {
            $ui.loading(false);
            var arr = resp.data;
            var html = arr.replace(/\n|\s|\r/g, "");//console.log(html)
            var li = html.match(/<div class="col-xs-12col-sm-4col-md-3col-lg-3".*?<\/a>/g);//console.log(li)
            var data = [];
            for (i in li) {
                dli = li[i];
                data.push({
                    img: {
                        src: dli.match(/img-responsive"src="(\S*?)"/)[1]
                    },
                    pm: {
                        text: I(dli.match(/m-t-5">(\S*?)<\/span/)[1])
                    },
                    url: dli.match(/href="(\S*?)"/)[1]
                })
            }
            $("Video").data = data;
            $("Video").endRefreshing()
        }
    });
}

async function geturl(url, pm) {
    //var id = url.match(/[0-9]+/g)[0]
    await $http.get(url).then(function(resp){
      var html = resp.data.replace(/\n|\s|\r/g, "");
            //console.log(resp.data)
            //console.log(typeof resp)
       var vstring = html.match(/<!--(.*?)-->/g)[19];
       let url=vstring.match(/"(.*?)"/)[1];url=decodeURIComponent(url).match(/(https.+?)'/)[1]
            console.log(url);
            play(url, pm);
        })
}

function play(url, mc) {
    $ui.push({
        props: {
            title: mc
        },
        views: [{
            type: "web",
            props: {
                id: "bof",
                url: url,
            },
            layout: $layout.fill
        }]
    })
}

$cache.set("type", channelList[0].id);
$cache.set("pg", 1);
getdata();

function I(r) {
    /*var n = "";
    for (let i = 0; i < r.length; ++i) n += String.fromCharCode(128 ^ r.charCodeAt(i));*/
    return r
}

