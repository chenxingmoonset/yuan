## 一些从tg频道搜集的deup源
## *some collected scripts for deup from tg channel*
![deuplogo](https://raw.githubusercontent.com/chenxingmoonset/yuan/main/deup/deup.png)>

#### 描述  *scripts describe*
> 1. 万物皆可folder   *Everything can be put in "folder" type.*
> 2. 异步函数List用于分级请求。例如：发现列表=>详情列表=>章节列表=>线路列表...... list可以重复调用（需要判断条件）  
*Asyncfunction "List" is used to divide the requests' layers. Just like: found list => detail list => chapter list => line list  etc. "List" can be called repeatly(different layers need some judging conditions).*
> 3. 异步函数Search用于搜索，也即第一层级列表。然后再调用list函数。  
*Asyncfunction "Search" is used to search, it's also the first layers of list. Then next steps need to call "List".*