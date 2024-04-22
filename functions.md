# 源阅tf v1.0(51)目前实现功能如下(like legado)：
>1. 登陆ui与登陆url，完善书源网页登录逻辑
>2. js库：全局复用js函数库，在书源,rss订阅源,语音源中均实现。格式：直接填写js源码或远程链接{"jsName":"https://xxx/xxx.js"}
>3. 书源变量：通过`book.getVariable()`获取
>4. 清除Cookie(待完善规则内cookie相关函数)
>5. 变量的put与get
>>⑴. `@put`与`@get`只能用于js以外的规则中，`@put`里使用JSONPath不需要加引号，其他规则需要加引号
例：`@put: {bid:"//*[@bid-data]/@bid-data"}`
>>⑵. `java.put`与`java.get`只能用于js中，js中不能用`@get`
>6. 书源内部变量操作
>>- **baseUrl**变量-当前url，String
>>- **result**变量-上一步的返回结果
>>- **book**变量-书籍操作类，方法见 io.legado.app.data.entities.Book
>>- **cookie**变量-cookie操作类，方法见 io.legado.app.help.http.CookieStore
>>- **cache**变量-缓存操作类，方法见 io.legado.app.help.CacheManager
>>- **chapter**变量-当前目录类，方法见 io.legado.app.data.entities.BookChapter
>>- **title**变量-当前标题,String
>>- **src**内容,源码
>7. 大幅度优化适配订阅源
>8. webdev源支持
>9. 小说、漫画缓存和加密导出（音视频缓存待实现）
>9. 隔空阅读，同一局域网下阅读书籍与编辑书源
>10. 分书源类型搜索，更高效迅速
>11. 浏览器实现广告屏蔽，可手动标记广告或自行编写屏蔽规则
>12. 新增小组件，改进通知栏样式
***********************************************************************
### 更多功能正在更新测试中......

# 源阅v1.0(51)书源内实现函数如下:
```javascript
java.ajax(urlStr: String)
//请求网络，urlStr为字符串，返回值为string
java.connect(urlStr: String, header:String)
//网络连接测试
java.get()
//接收参数或者拦截重定向
java.post(urlStr:String, body: String, headers:Map<string, string>)
//网络post请求

java.base64Decode(str: String)
java.base64Encode(str: String)
//base64解码与编码，返回String

java.md5Encode(str: String)
//md5编码，返回String
ps:js库中可引入crypto-js库全局调用

/*
java.decodeURI(str: String)
java.decodeURIComponent()
java.encodeURI(str: String)
java.encodeURIComponent()
*/
//URI解码与编码，返回String

java.setContent(content: Any?, baseUrl: String?= this.baseUrl)
//设置需解析的content和baseUrl，返回类型AnalyzeRule

java.getStringList(rule: String, isUrl: Boolean = false)
//输入规则rule和URL标志isUrl获取文本列表，返回类型List<string>?

java.getString(ruleStr: String?, isUrl: Boolean = false)
//输入规则rule和URI标志isUrl获取文本，返回类型String

java.getElements(ruleStr : String)
//输入规则ruleStr获取节点列表，返回类型List<Any>
ps：js库中可引入xiyueta库("https://www.xiyueta.com/js/xiyueta.min.js")作为解析html的第三方库

java.toast(String)
java.longToast(String)
//弹窗提示

java.randomUUID()
//随机生成UUID

js库中自定义函数：
function functionName(){
  ...//function code
}

#############################
未实现：
log()
startBrowser()、startBrowserAwait()
webView()、webViewGetSource()、webViewGetOverrideUrl()
getVerificationCode()
待续...
```
