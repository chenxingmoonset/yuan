# 源阅tf v1.0(120)目前实现功能如下(like legado)：
>1. 登陆ui与登陆url，完善书源网页登录逻辑
>2. jslib：全局复用js函数库，在书源,rss订阅源,语音源中均实现。格式：直接填写js源码或远程url链接加载{"jsName":"https://xxx/xxx.js"}
>3. 书源变量：通过`book.getVariable()`获取
>4. 清除书源请求的Cookie
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
>8. 完善源调试功能，增加请求源码和日志显示，书源调试增加兼容性检测
>9. 完善flt写法，在源发现界面显示更直观简约。示例：`flt:https://www.example.com/tag1={{tag1}}&tag2={{tag2}}&page={{page}}&&tag1::key1=value1,key2=value2&&tag2::key3=value3,key4=value4`   tag1和tag2为标签名，key为标签属性名，value为key对应的属性值
>10. webdav源支持
>11. 小说、漫画缓存和加密导出（音视频缓存待实现）
>12. 隔空阅读，同一局域网下阅读、聆听书籍或编辑书源、订阅源，新增源调试功能，同一局域网下调试
>13. 分书源类型搜索，更高效流畅，降低功耗
>14. 浏览器实现广告屏蔽，可手动标记广告或自行编写屏蔽规则
>15. 新增小组件，改进通知栏样式
>16. 添加目录规则源及管理功能
>17. 净化规则兼容排除范围字段
>18. 支持CookieJar，cookie变量相关操作
>19. 内置edgetts免费语音源，version>=1.0(57)支持js引擎的websocket请求（猜测是基于ios的原生JavaScriptCore，可用于edge-tts大声朗读语音源的请求，仅源阅可用），优化edgetts语速，为所有tts增加语调调节功能
>20. 增加搜索弹出**验证码**，**浏览器过cloudflare验证**功能的兼容性，自动为过验证书源分组
>21. 增加云同步备份恢复功能，优化其兼容性
>22. 添加末行对齐功能，优化阅读样式的兼容性；新增无限滚动功能，优化中
>23. 兼容iOS18
>24. 完善调试日志功能，增加控制台打印函数(java.log())，增加加密api兼容性，增加图片及封面解码
>25. 增加对本地pdf漫画的支持
>26. 暂时添加评论相关设置（如有相关源告知方便实现功能）
>27. 源调试实现搜索和发现分开调试，html结果添加xpath、css、正则搜索功能（含源码和webview视图）
>28. 支持网络文件源，支持断点续传
>29. testing：书源添加《用户操作》功能，可自定义添加阅读界面图标功能 (主要用于测试章评)
>30. testing：支持章评，段评(system version>= iOS18)
***********************************************************************
### 更多功能正在更新测试中......

# 源阅version>=v1.0(110)书源内实现函数如下:
```javascript
java.ajax(urlStr: String)
//请求网络，urlStr为字符串，返回值为string
java.connect(urlStr: String, header:String)
//网络连接测试
java.get()
//接收参数或者拦截重定向get请求
java.post(urlStr:String, body: String, headers:Map<string, string>)
//网络post请求，拦截重定向

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

java.getElement(ruleStr : String)
java.getElements(ruleStr : String)
//输入规则ruleStr获取节点列表，返回类型List<Any>
ps：js库中可引入xiyueta库("https://www.xiyueta.com/js/xiyueta.min.js")作为解析html的第三方库

java.toast(String)
java.longToast(String)
//弹窗提示

java.randomUUID()
//随机生成UUID

java.getVerificationCode()
//获取验证码图片（仅验证码，reCAPTCHA或滑动验证建议使用java.startBrowserAwait()方法）

java.startBrowser();
//内置浏览器打开链接，用于显示评论或其他外链内容
java.startBrowserAwait(url: String, title: String): StrResponse
//内置浏览器打开链接，可用于过验证。使用body方法获取请求网站的html，返回值为string

java.setCookie()
java.getCookie()
//存取cookie

java.log()
//类似于console.log()，在控制台中打印结果

js库中可自定义函数全局调用：
function functionName(){
  ...//function code
}

source.getKey()
source.bookSourceComment
//读取源网址、书源注释
source.setVariable(String)
source.getVariable()
//存储、取用书源变量

cache.put(key:String, value:Any)
cache.get(key:String)
//存储、取用缓存变量

cookie.getCookie(urlStr)
//cookie变量的读取操作，urlStr为对应请求的网址，支持登陆(login)、浏览器打开(startBrowserAwait)以及正常搜索过程中的请求
cookie.removeCookie(urlStr)
//cookie变量的去除操作

#############################
待测试cookie变量的相关操作：设置、替代等
//set,replace等

以下函数暂未实现：
webView()、webViewGetSource()、webViewGetOverrideUrl();
待续...
```
