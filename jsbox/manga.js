// JSBox code for comic discovery list
// Author: chenxing
// Date: 2024-02-17
// isbuilding...
// Require modules
//const $http = require("http");
//const $ui = require("ui");
//const $cache = require("cache");
//const $device = require("device");

// Define constants
const BASE_URL = "https://www.ccrip.com";
const ROWS = 4;
const COLS = 3;
const PAGE_SIZE = ROWS * COLS;
const ITEM_WIDTH = 390 / COLS;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const DETAIL_WIDTH = 390;
const DETAIL_HEIGHT = 844 - 44;
const CHAPTER_WIDTH = 390 / 4;
const CHAPTER_HEIGHT = 44;
const IMAGE_WIDTH = 390;
const IMAGE_HEIGHT = 844;

// Define global variables
let page = 1; // current page number
let comics = []; // array of comic objects
let detail = null; // current comic detail object
let chapters = []; // array of chapter objects
let images = []; // array of image urls
let loading = false; // flag for loading status

// Define main view
$ui.render({
  props: {
    title: "漫画发现"
  },
  views: [
    {
      type: "matrix",
      props: {
        id: "comic-list",
        itemHeight: ITEM_HEIGHT,
        columns: COLS,
        spacing: 0,
        template: {
          views: [
            {
              type: "image",
              props: {
                id: "cover",
                radius: 5
              },
              layout: function (make, view) {
                make.left.top.right.inset(5);
                make.height.equalTo(ITEM_HEIGHT - 30);
              }
            },
            {
              type: "label",
              props: {
                id: "title",
                font: $font(14),
                lines: 1
              },
              layout: function (make, view) {
                make.left.right.inset(5);
                make.top.equalTo($("cover").bottom).offset(5);
              }
            }
          ]
        }
      },
      layout: $layout.fill,
      events: {
        didSelect: function (sender, indexPath, data) {
          // Show comic detail view
          showComicDetail(data);
        },
        didReachBottom: function (sender) {
          // Load next page of comics
          sender.endFetchingMore();
          page++;
          loadComics();
        }
      }
    }
  ]
});

// Define comic detail view
function showComicDetail(data) {
  // Set detail object
  detail = data;
  // Clear chapters array
  chapters = [];
  // Create detail view
  let detailView = $ui.push({
    type: "view",
    props: {
      id: "detail-view"
    },
    layout: $layout.fill,
    views: [
      {
        type: "image",
        props: {
          id: "detail-cover",
          src: data.cover.src
        },
        layout: function (make, view) {
          make.left.top.right.inset(0);
          make.height.equalTo(DETAIL_HEIGHT * 0.6);
        }
      },
      {
        type: "label",
        props: {
          id: "detail-title",
          text: data.title.text,
          font: $font("bold", 18),
          align: $align.center
        },
        layout: function (make, view) {
          make.left.right.inset(0);
          make.top.equalTo($("detail-cover").bottom).offset(10);
        }
      },
      {
        type: "label",
        props: {
          id: "detail-author",
          text: "作者：" + data.author,
          font: $font(14),
          align: $align.center
        },
        layout: function (make, view) {
          make.left.right.inset(0);
          make.top.equalTo($("detail-title").bottom).offset(10);
        }
      },
      {
        type: "label",
        props: {
          id: "detail-category",
          text: "分类：" + data.category,
          font: $font(14),
          align: $align.center
        },
        layout: function (make, view) {
          make.left.right.inset(0);
          make.top.equalTo($("detail-author").bottom).offset(10);
        }
      },
      {
        type: "label",
        props: {
          id: "detail-status",
          text: "状态：" + data.status,
          font: $font(14),
          align: $align.center
        },
        layout: function (make, view) {
          make.left.right.inset(0);
          make.top.equalTo($("detail-category").bottom).offset(10);
        }
      },
      {
        type: "label",
        props: {
          id: "detail-update",
          text: "更新：" + data.update,
          font: $font(14),
          align: $align.center
        },
        layout: function (make, view) {
          make.left.right.inset(0);
          make.top.equalTo($("detail-status").bottom).offset(10);
        }
      },
      {
        type: "button",
        props: {
          id: "detail-back",
          title: "返回",
          font: $font(16),
          bgcolor: $color("lightGray")
        },
        layout: function (make, view) {
          make.left.bottom.inset(10);
          make.width.equalTo(80);
          make.height.equalTo(40);
        },
        events: {
          tapped: function (sender) {
            // Hide detail view
            hideComicDetail();
          }
        }
      },
      {
        type: "matrix",
        props: {
          id: "chapter-list",
          itemHeight: CHAPTER_HEIGHT,
          itemWidth: CHAPTER_WIDTH,
          columns: 4,
          spacing: 0,
          template: {
            views: [
              {
                type: "label",
                props: {
                  id: "chaptertitle",
                  font: $font(14),
                  align: $align.center
                },
                layout: $layout.fill
              }
            ]
          }
        },
        layout: function (make, view) {
          make.left.right.inset(0);
          make.bottom.inset(60);
          make.height.equalTo(100);
        },
        events: {
          didSelect: function (sender, indexPath, data) {
            // Show comic content view
            showComicContent(data);
          }
        }
      },
      {
        type: "button",
        props: {
          id: "chapter-toggle",
          title: "展开章节",
          font: $font(16),
          bgcolor: $color("lightGray")
        },
        layout: function (make, view) {
          //make.top.inset(10);
          make.right.bottom.inset(10);
          make.width.equalTo(80);
          make.height.equalTo(40);
        },
        events: {
          tapped: function (sender) {
            // Toggle chapter list
            toggleChapterList();
          }
        }
      }
    ]
  });
  // Add detail view to main view
  $("comic-list").add(detailView);
  // Load chapters
  loadChapters();
}

// Define comic content view
function showComicContent(data) {
  // Clear images array
  images = [];
  // Create content view
  let contentView = $ui.push({
    type: "view",
    props: {
      id: "content-view"
    },
    layout: $layout.fill,
    views: [
      {
        type: "scroll",
        props: {
          id: "image-list",
          paging: true
        },
        layout: $layout.fill,
        events: {
          /*didEndDecelerating: function (sender) {
            // Load next image if needed
            loadNextImage();
          }*/
        }
      },
      {
        type: "button",
        props: {
          id: "content-back",
          title: "返回",
          font: $font(16),
          bgcolor: $color("lightGray")
        },
        layout: function (make, view) {
          make.left.bottom.inset(10);
          make.width.equalTo(80);
          make.height.equalTo(40);
        },
        events: {
          tapped: function (sender) {
            // Hide content view
            hideComicContent();
          }
        }
      }
    ]
  });
  // Add content view to detail view
  $("detail-view").add(contentView);
  // Load images
  loadImages(data);
}


// Hide comic detail view
function hideComicDetail() {
  // Remove detail view from main view
  $("detail-view").remove();
  // Reset detail object
  detail = null;
}

// Hide comic content view
function hideComicContent() {
  // Remove content view from detail view
  $("content-view").remove();
}

// Toggle chapter list
function toggleChapterList() {
  // Get chapter list height
  let height = $("chapter-list").frame.height;
  // Check if chapter list is expanded or collapsed
  if (height == 0) {
    // Expand chapter list
    $ui.animate({
      duration: 0.3,
      animation: function () {
        $("chapter-list").updateLayout(function (make, view) {
          make.height.equalTo(DETAIL_HEIGHT * 0.4);
        });
        $("chapter-toggle").title = "收起章节";
        $("detail-view").relayout();
      }
    });
  } else {
    // Collapse chapter list
    $ui.animate({
      duration: 0.3,
      animation: function () {
        $("chapter-list").updateLayout(function (make, view) {
          make.height.equalTo(0);
        });
        $("chapter-toggle").title = "展开章节";
        $("detail-view").relayout();
      }
    });
  }
}

// Load comics from web
function loadComics() {
  // Check if loading is in progress
  if (loading) return;
  // Set loading flag to true
  loading = true;
  // Show loading indicator
  $ui.loading(true);
  // Construct url with page number
  let url = BASE_URL + "/booklist/?page=" + page;
  // Send http request
  $http.get({
    url: url,
    handler: function (resp) {
      // Parse html data
      let html = resp.data;
      // Extract comic elements
      let elements = html.match(/<div class="mh-item">[\s\S]*?<\/div>/g);
      // Loop through each element
      for (let element of elements) {
        // Extract comic cover
        let cover = "https://www.mxs11.cc/static/upload"+element.match(/<a href="([\s\S]*?)"[\s\S]*?>/)[1]+"/cover.jpg";//console.info(cover);
        // Extract comic title
        let title = element.match(/title="([\s\S]*?)"/)[1];
        // Extract comic url
        let url = element.match(/<a href="([\s\S]*?)"[\s\S]*?>/)[1];
        // Extract comic author
        //let author = element.match(/<span>作者：([\s\S]*?)<\/span>/)[1];
        // Extract comic category
        //let category = element.match(/<span>分类：([\s\S]*?)<\/span>/)[1];
        // Extract comic status
        //let status = element.match(/<span>状态：([\s\S]*?)<\/span>/)[1];
        // Extract comic update
        //let update = element.match(/<span>更新：([\s\S]*?)<\/span>/)[1];
        // Create comic object
        let comic = {
          cover: {
            src: cover
          },
          // JSBox code for comic discovery list (continued)
// Author: Copilot
// Date: 2024-02-17
          title: {
            text: title
          },
          url: url,
          //author: author,
          //category: category,
          //status: status,
          //update: update
        };
        // Add comic object to comics array
        comics.push(comic);
      }
      // Update comic list data
      $("comic-list").data = comics;
      // Hide loading indicator
      $ui.loading(false);
      // Set loading flag to false
      loading = false;
    }
  });
}

// Load chapters from web
function loadChapters() {
  // Check if detail object is null
  if (detail == null) return;
  // Show loading indicator
  $ui.loading(true);
  // Construct url with detail url
  let url = BASE_URL + detail.url;
  // Send http request
  $http.get({
    url: url,
    handler: function (resp) {
      // Parse html data
      let html = resp.data;
      // Extract chapter elements
      let elements = html.match(/<a href="\/chapter.*?>第[\s\S]*?<\/a>/g);//console.info(elements);
      // Loop through each element
      for (let element of elements) {
        // Extract chapter title
        let title = element.match(/>([\s\S]*?)<\/a>/)[1];//console.info(title);
        // Extract chapter url
        let url = element.match(/<a href="([\s\S]*?)"[\s\S]*?>/)[1];//console.info(url);
        // Create chapter object
        let chapter = {
          chaptertitle: {
            text: title
          },
          url: url
        };
        // Add chapter object to chapters array
        chapters.push(chapter);
      }
      // Update chapter list data
      $("chapter-list").data = chapters;//console.info(chapters);
      // Hide loading indicator
      $ui.loading(false);
    }
  });
}

// Load images from web
function loadImages(data) {
  // Check if data object is null
  if (data == null) return;
  // Show loading indicator
  $ui.loading(true);
  // Construct url with data url
  let url = BASE_URL + data.url;
  // Send http request
  $http.get({
    url: url,
    handler: function (resp) {
      // Parse html data
      let html = resp.data;//console.info(html);
      // Extract image urls
      let urls = html.match(/data-original="(.*?)jpg">/g);//console.info(urls);
      // Decode image urls(may need)urls = $text.base64Decode(urls);
      // Split image urls by $
    //urls=urls.split("$");
    //console.info(urls);
      // Loop through each url
      for (let url of urls) {
        let addr=url.match(/https.*?jpg/g)[0];
        // Add url to images array
        images.push(addr);
      }
      // Load first image
      loadFirstImage();
      // Hide loading indicator
      $ui.loading(false);
    }
  });
}

// Load first image
function loadFirstImage() {
  // Check if images array is empty
  if (images.length == 0) return;
  //give the standard html content 
  let htmlContent = `<DOCTYPE html>
  <html>
  <head>
  <meta charset=utf-8>
     <style>
       .scroll-view {
         display: flex;
         flex-direction: column;
         height: 100%;
         overflow-y: scroll;
       }
       .image-item {
         width: 100%;
         height: auto;
         margin-bottom: 10px;
       }
     </style>
  </head>
  <body>
     <div class="scroll-view">
   `;
    for (let url of images) {
      htmlContent += `
        <img class="image-item" src="${url}">
      `;
    }
    
   htmlContent += `</div>
   </body>
   </html>`;
   //console.info(htmlContent);
  // Get first image url
  //let url = images[0];console.info(url);
  // Create image view
  /*let imageView = */$ui.render({
    views: [
      {
    type: "web",
    props: {
      html:htmlContent
    },
    layout: $layout.fill
    }]
  })/*{
    type: "image",
    props: {
      id: "image-0",
      src: url
    },
    layout: function (make, view) {
      make.left.top.bottom.inset(0);
      make.width.equalTo(IMAGE_WIDTH);
    }
  };*/
  // Add image view to image list
  //$("image-list").add(imageView);
  // Update image list content size
  //$("image-list").contentSize = $size(IMAGE_WIDTH, IMAGE_HEIGHT);
}

/*
// Load next image
function loadNextImage() {
  // Get current image index
  let index = Math.floor($("image-list").contentOffset.x / IMAGE_WIDTH);
  // Check if index is out of range
  if (index < 0 || index >= images.length - 1) return;
  // Get next image url
  let url = images[index + 1];
  // Create image view
  let imageView = {
    type: "image",
    props: {
      id: "image-" + (index + 1),
      src: url
    },
    layout: function (make, view) {
      make.top.equalTo($("image-" + index).bottom);
      make.left.bottom.inset(0);
      make.width.equalTo(IMAGE_WIDTH);
    }
  };
  // Add image view to image list
  $("image-list").add(imageView);
  // Update image list content size
  $("image-list").contentSize = $size((index + 2) * IMAGE_WIDTH, IMAGE_HEIGHT);
}
*/

// JSBox code for comic discovery list

// Main function
function main() {
  // Load comics from web
  loadComics();
}

// Call main function
main();


