{}
// 十、浏览器模型
{
  // 浏览器模型概述
      // JavaScript是浏览器内置脚本；浏览器加载网页，就会执行脚本，从而达到操纵浏览器的目的，实现网页的各种动态效果
      // 代码嵌入网页的方法
          // <script>元素直接嵌入代码
              /*<script>
                var x=1+5;
                console.log(x);
              </script>
              */
              // <script>标签有一个type属性，用来执行脚本类型
                  // type属性可以设置两种值
                  // text/javascript:默认值，老式浏览器设置比较好
                  // application/javascript:比较新的浏览器设置比较好
                  // 如果type的值，浏览器不认识，那么就不会执行它的代码，
                  /*
                  <script id="mydata" type="x-custom-data">
                    console.log('Hello World');
                  </script>
                  document.getElementById('mydata').text
                  //   console.log('Hello World');
                  */

          // <script>标签加载外部脚本
              // 可以指定加载外部的脚本文件
                  // <script src="https://www.example.com/script.js"></script>
              // 如果使用了非英文字符，应该注明字符的编码
                  // <script charset="utf-8" src="https://www.example.com/script.js"></script>
              // 脚本必须是纯的JavaScript代码，不能有HTML和<script>标签
              // 外部加载脚本和直接添加代码块，这两种方法不能混用
                  // <script charset="utf-8" src="example.js">
                  //   console.log('Hello World!');
                  // </script>
                  // 代码console.log语句直接忽略
              // 为了防止攻击者篡改外部脚本，script标签允许设置一个integrity属性，写入该外部脚本hash签名，用来验证脚本一致性
                  // <script src="/assets/application.js"
                  //   integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
                  // </script>
                  // 一旦有人改了这个脚本，导致 SHA256 签名不匹配，浏览器就会拒绝加载

          // 事件属性
              // 网页元素的事件属性，可以写入JavaScript代码；当指定事件发生，就调用这些代码
                  // <button id="myBtn" onclick="console.log(this.id)">点击</button>

          // URL协议
              // URL直接JavaScript：协议，即在URL位置写入代码，使用这个URL就会自行JavaScript代码
                  // <a href="javascript:console.log('Hello')">点击</a>
                  // 如果 JavaScript 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。
                  // javascript:协议的常见用途是书签脚本 Bookmarklet
                  // 为了防止书签替换掉当前文档，可以在脚本前加上void，或者在脚本最后加上void 0
                      // <a href="javascript: void new Date().toLocaleTimeString();">点击</a>
                      // <a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>

      // script元素
          // 工作原理
              // 1、浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
              // 2、解析过程中，浏览器发现<script>元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
              // 3、如果<script>元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
              // 4、JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。
              // 如果脚本运行时间过长，浏览器会一直等到脚本下载完成，造成网页长时间失去响应，浏览器就会呈现假死状态，成为阻塞效应
              // 为了避免这种情况，将<script>标签放在页面底部而不是头部

          // defer属性
              // 解决网页阻塞问题，一个方法是<script>标签加入defer属性；延迟加载作用，dom加载生成后，在执行脚本
                  // <script src="a.js" defer></script>
              // defer属性的运行流程
                  // 浏览器开始解析html网页
                  // 解析过程中，发现带有defer属性的<script>元素
                  // 浏览器继续往下解析 HTML 网页，同时并行下载<script>元素加载的外部脚本。
                  // 浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本
              // 对于内置而不加载外部脚本的script标签，以及动态生成的script标签，defer不起作用
              // 使用defer加载的外部脚本不应该使用document.write方法。

          // async属性
              // 解决组赛效应另一个方法
                  // <script src="a.js" async></script>
              // 作用是，使用另一个进程下载脚本，下载时不会阻塞渲染
                  // 浏览器开始解析 HTML 网页。
                  // 解析过程中，发现带有async属性的script标签。
                  // 浏览器继续往下解析 HTML 网页，同时并行下载<script>标签中的外部脚本。
                  // 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
                  // 脚本执行完毕，浏览器恢复解析 HTML 网页。
              // 无法保证脚本的执行顺序，哪个脚本先下载完，先执行哪个
              // 使用async属性的脚本文件里面的代码，不应该使用document.write方法

              // 如果脚本之间没有依赖关系，使用async；如果脚本之间存在依赖关系，使用defer
              // 如果同时使用async和defer属性，后者不起作用，浏览器行为由async属性决定

          // 脚本的动态加载
              // <script>元素还可以动态生成，生成后再插入页面，从而实现脚本的动态加载。
              // 好处：不会造成页面阻塞；也不会造成浏览器假死状态
              // 缺点：无法保证脚本的执行顺序，哪个先下载完成先执行哪个
                  // 避免这个问题，设置async属性为false
                  ["a.js","b.js"].forEach(function(src){
                    var script = document.createElement("script");
                    script.src=src;
                    script.async=false;
                    document.head.appendChild=script;
                  })
              // 为动态加载脚本指定回调函数
                  function loadScript(src, done) {
                    var js = document.createElement('script');
                    js.src = src;
                    js.onload = function() {
                      done();
                    };
                    js.onerror = function() {
                      done(new Error('Failed to load script ' + src));
                    };
                    document.head.appendChild(js);
                  }

          // 加载使用的协议
              // 如果不指定协议，浏览器默认采用 HTTP 协议下载
                  // <script src="example.js"></script>
              // 如果要采用 HTTPS 协议下载，必需写明
                  // <script src="https://example.js"></script>
              // 根据页面自身的协议来决定加载协议
                  // <script src="//example.js"></script>

      //浏览器的组成
          // 浏览器核心部分：渲染引擎和JavaScript引擎（解释器）
          // 渲染引擎
              // 渲染引擎的作用：将网页代码渲染为用户视觉可以感知的平面文档
          // 不同浏览器有不同渲染引擎
              // firefox：Gecko引擎
              // safari：webkit引擎
              // Chrome：blink引擎
              // IE：trident引擎
              // Edge：degeHTML引擎
          // 渲染引擎处理网页，分为四个阶段
              // 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
              // 对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
              // 布局：计算出渲染树的布局（layout）。
              // 绘制：将渲染树绘制到屏幕。

      // 重流和重绘
          // 渲染树转换为网页布局，称为流布局；布局显示到页面的这个过程，称为绘制
          // 页面生成后，脚本操作和样式表操作，都会触发重流和绘制
          // 重绘和重流并不一定一起发生，重流必定导致重绘，重绘不一定需要重流
          // 优化技巧
              // 读入dom或者写入dom，尽量写在一起，不要混杂，不要读取一个dom节点，立马写入，接着在读取另一个dom节点
              // 缓存dom信息
              // 不要一项一项的改变样式，要使用css class 一次改变样式
              // 使用documentFragment操作 DOM
              // 动画使用absolute定位或fixed定位，这样可以减少对其他元素的影响。
              // 只在必要时才显示隐藏元素。
              // 使用window.requestAnimationFrame()，因为它可以把代码推迟到下一次重绘之前执行，而不是立即要求页面重绘。
              // 使用虚拟 DOM（virtual DOM）库。

      // JavaScript引擎
          // JavaScript引擎的作用：读取网页中的JavaScript代码，对他进行处理后运行
          // Javascript是解释型语言；他不需要编译，由解释器实时运行
          // 优点：运行和修改方便，刷新页面就可以重新解释
          // 缺点：每次运行都要调用解释器，系统开销大，运行速度慢于编译型语言
          // 为了提高运行速度，目前的浏览器都将JavaScript进行一定程度的编译，生成类似字节码（bytecode）的中间代码，以提高运行速度
          // 逐行解释将字节码转为机器码，是很低效的；为了提高运行速度，现代浏览器采用即时编译器（jit）
          // 即字节码只在运行时编译，用到哪一行就编译哪一行，并把编译结果缓存
          // 字节码不能直接运行，而是运行在虚拟机上，一般也把虚拟机称为JavaScript引擎
          // 并非所有JavaScript虚拟机运行时都有字节码，有的JavaScript虚拟机基于源码
          // 即只要有可能，就通过 JIT（just in time）编译器直接把源码编译成机器码运行，省略字节码步骤
          // 最常见的一些 JavaScript 虚拟机：
              // Chakra (Microsoft Internet Explorer)
              // Nitro/JavaScript Core (Safari)
              // Carakan (Opera)
              // SpiderMonkey (Firefox)
              // V8 (Chrome, Chromium)

  // window对象
      // 概述
          // 浏览器里面，window（w小写）指当前的浏览器窗口；他也是当前页面的顶层对象，即最高一层对象
          // 一个变量如果未声明，那么默认就是顶层对象的属性。
          a=1;
          window.a;//1

      // window对象属性
          //window.name
              // 属性是一个字符串，表示当前浏览器窗口的名字；这个属性主要配合超链接和表单的target属性使用
              window.name = 'Hello World!';
              console.log(window.name);
              // "Hello World!"
              // 只要浏览器窗口不关闭，这个属性不会消失
          // window.closed,window.opener
              // window.closed属性放回一个布尔值；表示一个窗口关闭
                  window.closed;//false
              // window.opener表示打开当前窗口的父窗口；如果当前窗口没有父窗口（即在地址栏输入打开），返回null
                  window.open().opener === window // false
              // 如果两个窗口之间不需要通信，建议将子窗口的opener设置为null；避免一些安全隐患
                  var newWin = window.open('example.html', 'newWindow', 'height=400,width=400');
                  newWin.opener = null;
              // <a>元素添加rel="noopener"属性，可以防止新打开的窗口获取父窗口，减轻被恶意网站修改父窗口 URL 的风险
                  /*<a href="https://an.evil.site" target="_blank" rel="noopener">
                  恶意网站
                  </a>*/
          // window.self,window.window
              // window.self和window.window属性都指向窗口本身。这两个属性只读。
              window.self === window ;// true
              window.window === window; // true
          // window.frames,window.length
              // window.frames返回一个类似数组的对象，成员为页面内所有的框架窗口，包括frame元素和iframe元素
                  // window.frames[0]表示页面中第一个框架窗口
                  // 如果iframe元素设置了id或者name，可以用属性值应用iframe窗口 frames["myIframe"]或frames.myIframe
                  // frames实际是window对象的别名
                      frames ===window;//true
                      frames[0]===window[0];//true
              // window.length返回当前网页包含的框架总数；如果不包含frame和iframe，window.length返回0
                  window.frames.length === window.length // true
          // window.frameElement
              // 主要用于当前窗口嵌入一个窗口的情况；返回当前窗口所在的那个元素节点
              // 如果是顶层窗口或者嵌入的网页不是同源，该属性返回null
          // window.top,window.parent
              // window.top指向顶层窗口，主要用于在框架窗口里面获取顶层窗口
              // window.parent指向父窗口，如果当前窗口没有父窗口，该属性指向自身
                  if(window.parent !== window.top){
                    // 表明当前窗口嵌入不止一层
                  }
          // window.status
              // 该属性用于读写浏览器状态栏的文本；不一定有效，很多浏览器不允许改写状态栏文本
          // window.devicePixeRatio
              // 返回一个值，表示css像素的大小与一个物理像素的大小之间的比率
          // 位置大小属性
              // window.screenX,window.screenY
                  // 返回浏览器左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素），只读
              // window.innerHeight,window.innerWidth
                  // 返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素),只读
                  // 两个属性值包括滚动条的高度和宽度
                  // 放大网页，这两个属性会变小；网页像素不变，可见窗口变小
              // window.outerHeight,window.outerWidth
                  // 返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读
              // window.scrollX,window.scrollY
                  // window.scrollX返回页面水平滚动距离，单位像素，只读
                  // window.scrollX返回页面垂直滚动距离，单位像素，只读
                  // 这两个属性的返回值不是整数，而是双精度浮点数。如果页面没有滚动，它们的值就是0
              // window.pageXoffset,window.pageYoffset
                  // 是window.scrollX和window.scrollY别名
          // 组件属性
              // 组件属性返回浏览器组件对象，属性有下面几个：
                  // window.locationbar：地址栏对象
                  // window.menubar：菜单栏对象
                  // window.scrollbars：窗口的滚动条对象
                  // window.toolbar：工具栏对象
                  // window.statusbar：状态栏对象
                  // window.personalbar：用户安装的个人工具栏对象
              // 这些对象的visible属性是一个布尔值，表示这些组件是否可见，属性只读
                  window.locationbar.visible;
          // 全局对象属性
              // window.document：指向document对象；有同源限制
              // window.location：获取当前窗口的URL信息，等同于document.location属性
              // window.navigator：用于获取环境信息
              // window.history：表示浏览器的浏览历史
              // window.localStorage：指向本地的localStorage数据
              // window.sessionStorage：指向本地的sessionStorage数据
              // window.console：用于操作控制台
              // window.screen:表示屏幕信息
          // window.isSecureContext:返回一个布尔值，表示当前窗口是否处于加密环境
              // 如果是HTTPS协议，就是true，否则false

      // window对象方法
          // window.alert，window.prompt,window.confirm
              // 浏览器与用户互动的全局方法；浏览器统一样式，无法定制
              // window.alert()弹出一个对话框，只有一个确定按钮，点击按钮，对话框消失
                  // 参数只能是字符串，可以用\n换行
                  window.alert("本条提示\n分成两行");
              // window.prompt()弹出对话框，提示文字下面有一个输入框，要求用户输入信息，并有 确定 和 取消按钮
                  // 返回值有两种情况，可能是字符串（可能为空），也有可能是null
                      // 用户输入信息，点击确定，则用户输入信息就是返回值
                      // 用户没有输入信息，点击确定，输入框默认值就是返回值
                      // 用户点击取消，或esc键，返回值就是null
              // window.confirm():弹出对话框，除了提示信息，只有确定和取消两个按钮，征求用户是否同意
                  // 返回一个布尔值，点击确定返回true，点击取消返回false
            // 这三个方法都具有阻塞效应
          // window.open()，window.close()，window.stop()
              // window.open()：用于新建一个浏览器窗口，返回新窗口引用，如果无法创建，返回null
                  var popup = windwo.open("somefile.html");
                  // 三个参数
                    window.open(url,windowName,[windowFeatures])
                    //           url  新窗口名字  新窗口参数
              // window.close:关闭当前窗口，一般用于关闭window.open方法新建的窗口
                  // iframe使用无效
              // window.stop:完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象
          // window.moveTo(),window.moveBy()
              // window.moveTo()：用于移动浏览器窗口到指定位置
                  // 接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位像素
                  window.moveTo(100, 200)
              // window.moveBy()：用于将窗口移到一个相对位置
                  // 接受两个参数，窗口左上角向右下角的水平距离和垂直距离，单位像素
                  window.moveBy(25, 50)
              // 浏览器允许用脚本移动窗口：该窗口是用window.open()方法新建的，并且窗口里只有它一个 Tab 页
              // 除此之外，使用两个方法是无效的
          //window.resizeTo(),window.resizeBy()
              // window.resizeTo()：用于缩放窗口到指定大小
                  // 接受两个参数，第一个是缩放窗口的宽度（包括滚动条和工具栏）；第二个是缩放窗口的高度
                  window.resizeTo(window.screen.availWidth/2,window.screen.availHeight/2);
                  // 当前窗口缩放到屏幕可用区域的一半宽度和高度
                  // 需要给出缩放的绝对大小
              // window.resizeBy()：缩放窗口；与resizeTo的区别在于他按照相对的量缩放；单位像素
                  window.resizeBy(-200,-200);
                  // 将当前窗口的宽度和高度都缩小200像素
          // window.scrollTo(),window.scroll(),window.scrollBy()
              // window.scrollTo()用于将文档滚动到指定位置；接受两个参数，表示滚动到窗口左上角的页面坐标
                  window.scrollTo(x-code,y-code);
              // 他可以接受一个配置对象作为参数
                  window.scrollTo(optaions);
                  // options有三个属性
                  // top：滚动后页面左上角的垂直坐标，即 y 坐标。
                  // left：滚动后页面左上角的水平坐标，即 x 坐标。
                  // behavior：字符串，表示滚动的方式，有三个可能值（smooth、instant、auto），默认值为auto。
              // window.scroll是window.scrollTo别名
              // window.scrollBy()将网页滚动到指定距离（单位像素）
                  // 接受两个参数，水平向右滚动的像素，水平向下滚动的像素
                  window.scrollBy(0,window.innerHeight);
                  //用于将页面滚动到下一屏
                //滚动某个元素，可以使用三个属性和方法
                    // Element.scrollTop
                    // Element.scrollLeft
                    // Element.scrollintoView()
          //window.print()会跳出打印对话框，与用户菜单打印命令效果相似
              // 常见的打印按钮代码
                  document.getElementById("printLink").onclick=function(){
                    window.print();
                  }
              // 例如手机
                  if (typeof window.print === 'function'){
                      // 支持打印功能
                  }
          // window.focus(),window.blur()
              // window.focus()激活窗口，获得焦点，出现在其他窗口之前
              // window.blur()将窗口焦点移除
              // 当窗口获得焦点，会激活focus事件，失去焦点会激活blur事件
          // window.getSelection():放回一个selection对象，表示用户选中的文本
              var select = window.getSelection();
              // Selection 对象的toString方法可以获得选中文本
              var selectText = select.toString();

          // window.requestAnmationFrame()
              //推迟某个函数的执行时间，推迟到浏览器下一次重流时执行，执行完才会进入下一次重绘
              // 如果某个函数会改变网页布局，一般放在window.requestAnmationFrame里面执行，节省系统资源，是页面更加平滑
              // 接受一个回调函数作为参数
                  window.requestAnimationFrame(callback);
                  // callback执行时，系统会传入一个时间戳（performance.now()）,单位毫秒，表示距网页加载的时间
                  // window.requestAnimationFrame()会返回一个整数，这个整数可以传入window.cancleAnimationFrame()，用来取消回调函数

          // window.requestIdleCallback():将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行
            // 该方法接受一个回调函数和一个配置对象作为参数；
                // 配置对象可以指定一个最长时间；如果过了这个时间，回调函数不管系统资源有无空闲，都会执行
                // window.requestIdleCallback(callback[, options]);

      // 事件
          // load事件和onload属性
              // load事件发生在文档在浏览器窗口加载完毕时，window.onload可以指定这个事件的回调函数

          // error事件和onerror属性
              // 浏览器发生错误时，会触发window的error事件，window.onerror属性可以对该事件指定回调函数
              window.onerror = function (message, filename, lineno, colno, error) {
                console.log("出错了！--> %s", error.stack);
              };
              // window的error事件的回调函数不接受错误对象为参数，而是接受五个参数
              // 出错信息  出错脚本的网址 行号 列号  错误对象
              //如果脚本网址与网页网址不在同一个域（比如使用cdn），浏览器不会给出详细出错信息
                  // 提示：出错，错误类型“script error”，行号0
                  // 解决，在脚本所在的服务器，设置Access-Control-Allow-Origin的 HTTP 头信息
                  // Access-Control-Allow-Origin:*;
                  // 然后在<script>标签设置crossorigin属性
                  // <script crossorigin="anonymous" src="//example.com/file.js"></script>
                  // crossorigin="anonymous"表示，读取文件不需要身份信息，即不需要 cookie 和 HTTP 认证信息
                  // 如果设为crossorigin="use-credentials"，就表示浏览器会上传 cookie 和 HTTP 认证信息，
                    // 同时还需要服务器端打开 HTTP 头信息Access-Control-Allow-Credentials

      // 多窗口操作
          // 网页中如果使用iframe元素，嵌入其他网页，因此一个网页中会形成多个窗口；如果子窗口中又嵌入别的网页，就会形成多级窗口
          // 窗口的引用
              // 各个窗口之中的脚本，可以引用其他窗口；浏览器提供了一些特殊变量，用来返回其他窗口
                  // top：顶层窗口，即最上层的那个窗口
                  // parent：父窗口
                  // self：当前窗口，即自身
              // 判断当前窗口是否是顶层窗口
                  if(window.top === window.self){
                    // true
                  }else{
                    // false
                  }
              // 让父窗口的访问历史后退一步
                  window.parent.history.back();
              // 浏览器提供了特殊的窗口名，供window.open()，<a>, <from>引用
                  // _top 顶层窗口
                  // _parent 父窗口
                  // _blank 新窗口
                  // <a href="somepage.html" target="_top">Link</a>

          // iframe元素
              // 遵守同源政策，父与子同一个域才能通信；否则是能使用window.postMessage

          // window.frames属性
              // window.frames属性返回一个类似数组的对象，成员是所有子窗口的window对象
              // window.frames每个成员的值，是框架内的窗口（即框架的window对象），而不是iframe标签在父窗口的 DOM 节点
              // 获取每个框架内部的 DOM 树，需要使用window.frames[0].document

  //Navigator对象，Screen对象
      // Navagator.userAgent:返回浏览器的user Agent信息，表示用户设备信息，包含浏览器的产商、版本、操作系统
          // 通过userAgent可以大致准确的识别手机浏览器；方法就是测试是否包含mobi字符串
                var ua=navigator.userAgent().toLowerCase();
                if(/mobi/.test(ua)){
                  // 手机浏览器
                }else{
                  // 非手机浏览器
                }
          // 所有移动设备的浏览器
          /mobi|android|touch|mini/.test(ua);

      // Navigator.plugins：返回一个类似数组的对象，成员是plugins实例对象，表示浏览器所安装的插件

      // Navigator.platform:返回用户操作系统信息
          // navigator.platform;
          // "Linux x86_64"

      // Navigator.online:属性返回一个布尔值，表示用户当前在线还是离线（浏览器断线）
          // 用户变成在线会触发online事件，变成离线会触发offline事件
          // 可以通过window.ononline和window.onoffline指定这两个事件的回调函数
              window.addEventListener('offline', function(e) { console.log('offline'); });
              window.addEventListener('online', function(e) { console.log('online'); });

      // Navigator.language,Navigator.languages
          // Navigator.language:返回字符串，表示浏览器的首选语言；只读
          // Navigator.languages属性返回一个数组，表示用户可以接受的语言
          // Navigator.language总是这个数组的第一个成员。HTTP 请求头信息的Accept-Language字段，就来自这个数组。
              navigator.languages  // ["en-US", "en", "zh-CN", "zh", "zh-TW"]

      // Navigator.geolocation
          // 返回一个Geolocation对象，包含用户地理位置信息
          // 只有在HTTPS协议下使用，否则报错
          // Geolocation 对象提供下面三个方法。
            // Geolocation.getCurrentPosition()：得到用户的当前位置
            // Geolocation.watchPosition()：监听用户位置变化
            // Geolocation.clearWatch()：取消watchPosition()方法指定的监听函数
            // 注意，调用这三个方法时，浏览器会跳出一个对话框，要求用户给予授权。

      // Navigator.cookieEnabled
          // 属性返回一个布尔值，表示浏览器的 Cookie 功能是否打开。
          // 这个属性返回浏览器的总特性

      // Navigator对象的方法
          // navigator.javaEnabled():返回一个布尔值，表示浏览器是否能运行 Java applet 小程序
              navigator.javaEnabled();//false

          // Navigator.sendBeacon():向服务器发送异步数据

      // Navigator的实验性属性
          // Navigator有些实验性属性，只有一些浏览器可用
          //navigator.deviceMemory:返回计算机内存数（GB），只读
          //navigator.hardwareConcurrency:返回计算机可用逻辑处理器的数量，只读
          //navigator.connection:返回一个对象，包含当前网络连接的相关信息

      // Screen对象
          // 表示当前窗口所在的屏幕，提供显示设备的信息

  // Cookie
      // 概述
          // Cookie 是服务器保存在浏览器的一小段文本信息，一般大小不能超过4KB。
          // 浏览器每次向服务器发出请求，就会自动附上这段信息
          // 目的就是区分用户，以及放置信息，使用场景如下
              // 对话（session）管理：保存登录状态、购物车等需要记录的信息。
              // 个性化信息：保存用户的偏好，比如网页的字体大小、背景色等等。
              // 追踪用户：记录和分析用户行为。
          // 缺点：容量小，缺乏数据操作接口，会影响性能
          // 客户端存储建议使用Web storage API 和indexedDB
          // 只有每次都要让服务器知道的信息才用放在cookie里面
          // cookie的元数据
              // Cookie名字
              // Cookie的值（真正的数据写在里面）
              // 到期时间（超过时间会失效）
              // 所属域名（默认为当前域名）
              // 生效的途径（默认当前的网址）
          // 用户可以设置不接受Cookie，或者不发送Cookie给服务器
                window.navigator.cookieEnabled;//true  浏览器是否打开了cookie功能
          // document.cookie 返回当前网页的cookie信息
                document.cookie;//'id=123;key=boo'
          // cookie是按照区域名区分的，一个域名只能读取自己放置的cookie，无法读取其他网站的cookie，一级域名不能读取二级域名下的cookie
                // 只有明确将domain属性设为一级域名，则这个域名下面的各级域名可以共享这个 Cookie
                // Set-Cookie: name=value; domain=mydomain.com
          // 注意，区分 Cookie 时不考虑协议和端口。
          //  也就是说，http://example.com设置的 Cookie，可以被https://example.com或http://example.com:8080读取

      // cookie与HTTP协议
          // cookie由HTTP协议生成，也主要是提供HTTP协议使用
          // HTTP回应：cookie生成
              // 服务器希望浏览器保存cookie，就要在HTTP回应的头信息里面，放置一个Set-Cookie字段
                  // Set-Cookie:foo=bar;

                  // HTTP/1.0 200 OK
                  // Content-type: text/html
                  // Set-Cookie: yummy_cookie=choco
                  // Set-Cookie: tasty_cookie=strawberry
              // HTTP回应可以包含多个Set-Cookie字段，即在浏览器生成多个cookie
              // 除了cookie值，还可以附加cookie属性
              // Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
          // HTTP请求：cookie的发送
              // 浏览器向服务器发送HTTP请求，每个请求都会带上相应的cookie；这时要使用HTTP头信息的cookie
                  // GET /sample_page.html HTTP/1.1
                  // Host: www.example.org
                  // Cookie: yummy_cookie=choco; tasty_cookie=strawberry
              // 服务器收到浏览器cookie，有两点无法得知
                  // cookie的各个属性，比如到期时间（Expires）
                  // 哪个域名设置的cookie，到底是一级域名，还是某一个二级域名设的

          // cookie的属性
              // Expires ，Max-Age
                  //Expires属性指的是一个具体的到期时间，到了时间以后，浏览器不在保存这个cookie
                  // 值是UTC格式，可以使用Date.prototype.toUTCString()转换
                      // Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
                      // 如果不设置属性，或者为null，cookie只在当前会话有效，浏览器窗口一旦关闭，当前session结束，该cookie删除
                  // Max-Age：指定从现在开始cookie存在的秒数，比如60*60*24*365（即一年）；过了这个时间，浏览器不在保存这个cookie
                  // 如果同时指定了Expires和Max-Age，那么Max-Age的值将优先生效
                  // 如果Set-Cookie没有指定Exipres或者Max-Age属性，那么这个cookie就是session cookie；一旦关闭浏览器，浏览器就不保存这个cookie

              // Demain 和 Path
                  // Demain指定cookie属于哪个域名，以后浏览器向服务器发送HTTP请求是，通过这个属性判断是否要附带某个cookie
                      // 浏览器设置cookie时，没有指定Demain，默认将其设为当前浏览器域名；
                      // 如果当前域名是一个IP地址，不得设置Demain
                      // Demain属性只能是当前域名或者当前域名的上级域名，但设置为上级域名时，不能设置顶级域名或者公共域名
                  // Path属性指浏览器发送HTTP请求时，哪些路劲要附带这个cookie

              // Secure 和 HttpOnly
                  // Secure属性指浏览器只有在HTTPS加密协议下，才能将这个cookie发送到服务器
                      // 如果当前协议是HTTP，浏览器会自动忽略服务器发送的secure属性
                  // HTTPOnly指定该 Cookie 无法通过 JavaScript 脚本拿到
                      // 只有浏览器发出 HTTP 请求时，才会带上该 Cookie。
              // SameSite:用来防止 CSRF 攻击和用户追踪。
                  // cookie往往用来存储用户身份信息，恶意网站设法伪造带有正确的cookie的HTTP请求，这就是CRSF攻击
                  // 例如，银行网站为了防止这种攻击，官网表单会带一个随机token，官网服务器验证这个token，确定是否正真的请求
                  // 例二，用户追踪，第三方网站插入一张看不见的图片，点击，就会想src的网址发送带有cookie请求，从而就知道你是谁，浏览过什么网站
                      // <img src="facebook.com" style="visibility:hidden;">
                  // cookie的SameSite属性用来限制第三方cookie，三个值
                      // strick：完全禁止第三方cookie，跨站点时，任何情况都不带cookie（只有网页的URL与目标一致，才带cookie）
                          // Set-Cookie: CookieName=CookieValue; SameSite=Strict;
                      // Lax：Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外
                              // 导航到目标网址的 GET 请求，只包括三种情况：链接，预加载请求，GET 表单
                      // None：网站可以选择显式关闭SameSite属性，将其设为None
                        // 前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效
                            // Set-Cookie: widget_session=abc123; SameSite=None; Secure
              // document.cookie
                  // 用于读写当前网页的cookie
                  // 读取时，返回当前网页的所有cookie，前提是cookie不能有HTTPOnly属性
                  // 写入时，一次只能写入一个cookie，添加并非覆盖
                      // document.cookie = "foo=bar; expires=Fri, 31 Dec 2020 23:59:59 GMT";
                      // 各个属性写入时
                          // path必须为绝对路径，默认为相对路径
                          // Demain属性值必须是当前发送的cookie的域名的一部分
                          // max-age属性的值为秒数。
                          // expires属性的值为 UTC 格式，可以使用Date.prototype.toUTCString()进行日期格式转换。
                          document.cookie = 'fontSize=14; '
                          + 'expires=' + someDate.toGMTString() + '; '
                          + 'path=/subdirectory; '
                          + 'domain=*.example.com';
                      // cookie的属性一旦设置完成，就没有办法读取这些值
                      // 删除一个cookie，只能设置他的Expires为一个过期时间
                          // document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
                          // 名为fontSize的 Cookie 的值为空，过期时间设为1970年1月1月零点，就等同于删除了这个 Cookie

  // XMLHttpRequest对象
      // XMLHttpRequest对象是 AJAX 的主要接口，用于浏览器与服务器之间的通信。
      //AJAX：通过JavaScript的异步通信，从服务器获取XML文档，从中提取数据，更新当前网页的对应部分；不能刷新整个网页
            // AJAX包括以下几个步骤
                // 创建XMLHttpReauest实例
                // 发送http请求
                // 接受服务器传回来数据
                // 更新网页数据

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                  // 通信成功时，状态值为4
                  if (xhr.readyState === 4){
                    if (xhr.status === 200){
                      console.log(xhr.responseText);
                    } else {
                      console.error(xhr.statusText);
                    }
                  }
                };

                xhr.onerror = function (e) {
                  console.error(xhr.statusText);
                };

                xhr.open('GET', '/endpoint', true);//建立HTTP连接
                xhr.send(null);//发送实际请求
        // XMLHTTPRequest实例属性
            // XMLHTTPRequest.readyState:表示当前实例的状态
                // 0：实例已生成，实例open（）方法没有调用
                // 1：open（）已经调用，send（）方法没调用
                // 2：send()以调用，并且服务器放回的头信息和状态码已经收到
                // 3：服务器正在传来数据
                // 4：服务器传来的数据已经收到，或者本次接收失败；表明脚本发送的HTTP请求已经完成
            // XMLHttpRequest.onreadystatechange:指向一个监听函数
                // readystatechange事件发生时（实例的readyState属性变化），就会执行这个属性
            // XMLHttpRequest.response:表示服务器返回的数据体（即 HTTP 回应的 body 部分）
                // 如果数据不完整，返回null
            // XMLHTTPRequest.responceType:是一个字符串，表示服务器返回数据的类型
                // XMLHttpRequest.responseType属性可以等于以下值。
                // ""（空字符串）：等同于text，表示服务器返回文本数据。
                // "arraybuffer"：ArrayBuffer 对象，表示服务器返回二进制数组。
                // "blob"：Blob 对象，表示服务器返回二进制对象。 比如图片文件
                // "document"：Document 对象，表示服务器返回一个文档对象。
                // "json"：JSON 对象。
                // "text"：字符串。
            // XMLHttpRequest.responseText:返回从服务器接收到的字符串，该属性为只读
            // XMLHttpRequest.responseXML:返回从服务器接收到的 HTML 或 XML 文档对象，该属性为只读
            // XMLHttpRequest.responseURL:属性是字符串，表示发送数据的服务器的网址。
            // XMLHTTPRequest.status,XMLHttpRequest.statusText
                // XMLHttpRequest.status属性返回一个整数，表示服务器回应的 HTTP 状态码
                    //为请求是，值为0
                    // 200, OK，访问正常
                    // 301, Moved Permanently，永久移动
                    // 302, Moved temporarily，暂时移动
                    // 304, Not Modified，未修改
                    // 307, Temporary Redirect，暂时重定向
                    // 401, Unauthorized，未授权
                    // 403, Forbidden，禁止访问
                    // 404, Not Found，未发现指定网址
                    // 500, Internal Server Error，服务器发生错误
                // XMLHttpRequest.statusText属性返回一个字符串，表示服务器发送的状态提示
                    // 该属性包含整个状态信息，比如“OK”和“Not Found”
                    // 在发送之前，值为空字符串；如果服务器没有返回状态提示，默认值为OK；只读
            // 事件监听属性
                // XMLHttpRequest.onloadstart：loadstart 事件（HTTP 请求发出）的监听函数
                // XMLHttpRequest.onprogress：progress事件（正在发送和加载数据）的监听函数
                // XMLHttpRequest.onabort：abort 事件（请求中止，比如用户调用了abort()方法）的监听函数
                // XMLHttpRequest.onerror：error 事件（请求失败）的监听函数
                // XMLHttpRequest.onload：load 事件（请求成功完成）的监听函数
                // XMLHttpRequest.ontimeout：timeout 事件（用户指定的时限超过了，请求还未完成）的监听函数
                // XMLHttpRequest.onloadend：loadend 事件（请求完成，不管成功或失败）的监听函数
            // XMLHttpRequest.withCredentails:是一个布尔值，表示跨域请求，用户信息是否会包含在请求之中，默认为false
            // XMLHttpRequest.upload:
                // XMLHttpRequest 不仅可以发送请求，还可以发送文件，这就是 AJAX 文件上传。
                // 发送文件以后，通过XMLHttpRequest.upload属性可以得到一个对象，通过观察这个对象，可以得知上传的进展
                // 事件loadstart、loadend、load、abort、error、progress、timeout

        // XMLHTTPRequest的实例方法
            // XMLHTTPRequest.open()
                // 用于指定 HTTP 请求的参数；一共可以接受五个参数
                    /* void open(
                      string method,
                      string url,
                      optional boolean async,
                      optional string user,
                      optional string password
                    );*/
                    // method: GET POST PUT DELETE HEAD
                    // url:请求发送目标url
                    // async：表示是否异步
                    // user：用户名，默认空字符串，可选
                    // password：认真密码，默认空字符串，可选
                // 如果对使用过open()方法的 AJAX 请求，再次使用这个方法，等同于调用abort()，即终止请求
            // XMLHttpRequest.send()：用于实际发送的HTTP请求；参数可选
                var xhr = new XMLHttpRequest();
                xhr.open('GET',
                'http://www.example.com/?id=' + encodeURIComponent(id),
                true
                );
                xhr.send(null);

                // post
                var xhr = new XMLHttpRequest();
                var data = 'email='
                  + encodeURIComponent(email)
                  + '&password='
                  + encodeURIComponent(password);
                xhr.open('POST', 'http://www.example.com', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(data);

            // XMLHttpRequest.setRequestHeader:方法用于设置浏览器发送的 HTTP 请求的头信息
                  // 该方法必须在open()之后、send()之前调用
                  // 多次调用，设定同一个字段，则每一次调用的值会被合并成一个单一的值发送
                  // 接受两个参数，第一个字符串，头信息的字段名，第二个字段值
                  xhr.setRequestHeader('Content-Type', 'application/json');
                  xhr.setRequestHeader('Content-Length', JSON.stringify(data).length);
                  xhr.send(JSON.stringify(data));
            // XMLHttpRequest.getResponseHeader:返回 HTTP 头信息指定字段的值
                // 如果还没有收到服务器回应或者指定字段不存在，返回null
            //XMLHttpRequest.getAllResponseHeaders:服务器发送的所有http头部信息
            //XMLHttpRequest.abort:方法用来终止已经发出的 HTTP 请求。
                // 调用这个方法以后，readyState属性变为4，status属性变为0

        // XMLHttpRequest实例的事件
            // readyStateChange事件
                  // readyState属性的值发生改变，就会触发 readyStateChange 事件
                  // 通过onReadyStateChange属性，指定这个事件的监听函数，对不同状态进行不同处理
            // progress事件
                //上传文件时，XMLHttpRequest 实例对象本身和实例的upload属性，都有一个progress事件，会不断返回上传的进度
                var xhr = new XMLHttpRequest();
                function updateProgress (oEvent) {
                  if (oEvent.lengthComputable) {
                    var percentComplete = oEvent.loaded / oEvent.total;
                  } else {
                    console.log('无法计算进展');
                  }
                }
                xhr.addEventListener('progress', updateProgress);
                xhr.open();
            // load事件 error事件 abort事件
                // load 事件表示服务器传来的数据接收完毕
                // error 事件表示请求出错
                // abort 事件表示请求被中断（比如用户取消请求
            // loadend事件，abort、load和error这三个事件，会伴随一个loadend事件，表示请求结束，但不知道其是否成功
                xhr.addEventListener('loadend', loadEnd);
                function loadEnd(e) {
                  console.log('请求结束，状态未知');
                }
            // timeout事件
                // 服务器超过指定时间还没有返回结果，就会触发 timeout 事件

        // Navigator.sendBeacon():异步发出请求
            // 但是请求与当前页面线程脱钩，作为浏览器进程的任务，因此可以保证会把数据发出去，不拖延卸载流程
                window.addEventListener('unload', logData, false);
                function logData() {
                  navigator.sendBeacon('/log', JSON.stringify({
                    some: "data"
                  }));
                }
            // 接受两个参数，一个是目标服务器的URL，第二个是所要发送的数据，任意值
                navigator.sendBeacon(url, data);
                // 这个方法的返回值是一个布尔值，成功发送数据为true，否则为false

  // 同源限制
      //概述
          //1995年，由netscape公司引入浏览器，目前，所有浏览器都执行这个政策
                // 同源：
                    // 协议相同
                    // 域名相同
                    // 端口相同
                // 同一个网域的不同端口，是可以互相读取cookie的
          // 目的：为了保证用户信息的安全，防止恶意的网站窃取数据
          // 限制范围：非同源，三种情况受到限制
              // （1） 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。
              // （2） 无法接触非同源网页的 DOM。
              // （3） 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。

      // cookie
          // cookie是服务器写入浏览器的一小段信息，只有同源的网页才能共享
                // 如果两个网页一级域名相同，设置document.Demain共享cookie
                // 服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名
                  //  Set-Cookie: key=value; domain=example.com; path=/

      // iframe和多窗口通信
          // 只有在同源的情况下，父窗口和子窗口才能通信；如果跨域，就无法拿到对方的 DOM
          // 对于完全不同源的网站，目前有两种方法，可以解决跨域窗口的通信问题。
              // 片段识别符（fragment identifier）
              // 跨文档通信API（Cross-document messaging）

          // 片段识别符
              // 指的是，URL 的#号后面的部分，比如http://example.com/x.html#fragment的#fragment
              // 如果只是改变片段标识符，页面不会重新刷新
                  // 父窗口可以把信息，写入子窗口的片段标识符
                      var src = originURL + '#' + data;
                      document.getElementById('myIFrame').src = src;
                  //子窗口通过监听hashchange事件得到通知
                      window.onhashchange = checkMessage;
                      function checkMessage() {
                        var message = window.location.hash;
                        // ...
                      }
                  // 同样的，子窗口也可以改变父窗口的片段标识符。
                      parent.location.href = target + '#' + hash;
              // window.postMessage()：
                  // 跨文档API为window对象新增了一个window.postMessage()方法，允许窗口通信，不论两个窗口是否同源
                      // 父窗口打开一个子窗口
                      var popup = window.open('http://bbb.com', 'title');
                      // 父窗口向子窗口发消息
                      popup.postMessage('Hello World!', 'http://bbb.com');
                  // 第一个参数为具体的信息内容，第二个参数为接受信息的窗口的源；
                    // 即“协议 + 域名 + 端口”。也可以设为*，即不设置域名，向所有窗口发送
                    // 子窗口向父窗口发消息
                    window.opener.postMessage('Nice to see you', 'http://aaa.com');
                    // 父窗口和子窗口都可以通过message事件，监听对方的消息。
                        // 监听 message 消息
                        window.addEventListener('message', function (e) {
                          console.log(e.data);
                        },false);
                    // message参数是事件对象event，提供了三个属性
                        // event.source：发送消息的窗口
                        // event.origin: 消息发向的网址
                        // event.data: 消息内容

              //LocalStorage
                  // 通过window.postMessage，读写其他窗口的 LocalStorage 也成为了可能
                  // 子窗口接受信息
                  window.onmessage = function(e) {
                    if (e.origin !== 'http://bbb.com') return;
                    var payload = JSON.parse(e.data);
                    switch (payload.method) {
                      case 'set':
                        localStorage.setItem(payload.key, JSON.stringify(payload.data));
                        break;
                      case 'get':
                        var parent = window.parent;
                        var data = localStorage.getItem(payload.key);
                        parent.postMessage(data, 'http://aaa.com');
                        break;
                      case 'remove':
                        localStorage.removeItem(payload.key);
                        break;
                    }
                  };
                  // 父窗口发送信息
                  var win = document.getElementsByTagName('iframe')[0].contentWindow;
                  var obj = { name: 'Jack' };
                  // 存入对象
                  win.postMessage(
                    JSON.stringify({key: 'storage', method: 'set', data: obj}),
                    'http://bbb.com'
                  );
                  // 读取对象
                  win.postMessage(
                    JSON.stringify({key: 'storage', method: "get"}),
                    "*"
                  );
                  window.onmessage = function(e) {
                    if (e.origin != 'http://aaa.com') return;
                    console.log(JSON.parse(e.data).name);
                  };

      // AJAX
          // 同源政策规定，ajax只能发送给同源的网址，否则就报错
          // 除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制
              // JSONP
              // WebSocket
              // CORS
          // JSONP： 是服务器与客户端跨源通信的常用方法
              // 优点：简单易用，米有兼容性问题
              // 第一步，网页添加一个<script>元素，向服务器请求一个脚本，这个不受同源政策限制，可以跨域请求
                  // <script src="http://api.foo.com?callback=bar"></script>
                  // 请求的脚本网址有一个callback参数（?callback=bar）， 用来告诉服务器，客户端的回调函数名称（bar）
              // 第二步，服务器收到请求后，拼接一个字符串，将 JSON 数据放在函数名里面，作为字符串返回（bar({...})）
              // 第三部，客户端会将服务器返回的字符串，作为代码解析，因为浏览器认为，这是<script>标签请求的脚本内容
                  // 这时，客户端只要定义了bar()函数，就能在该函数体内，拿到服务器返回的 JSON 数据
                  function addScriptTag(src) {
                    var script = document.createElement('script');
                    script.setAttribute('type', 'text/javascript');
                    script.src = src;
                    document.body.appendChild(script);
                  }

                  window.onload = function () {
                    addScriptTag('http://example.com/ip?callback=foo');
                  }

                  function foo(data) {
                    console.log('Your public IP address is: ' + data.ip);
                  };
              // 服务器接受到这个请求，会将数据放到回调函数的参数位置里面
                  foo({
                    'ip': '8.8.8.8'
                  });
          //WebSocket
              // WebSocket 是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。
              // 该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。
              // 浏览器发送的WebSocket请求头部信息
                 /* GET /chat HTTP/1.1
                  Host: server.example.com
                  Upgrade: websocket
                  Connection: Upgrade
                  Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
                  Sec-WebSocket-Protocol: chat, superchat
                  Sec-WebSocket-Version: 13
                  Origin: http://example.com
                  */
                //  Origin，表示该请求的请求源（origin），即发自哪个域名
                // 服务器可以根据这个域名，判断是否通过本次通信，
                // 如果该域名在白名单里面，服务器就会做出如下反应
                  /*  HTTP/1.1 101 Switching Protocols
                    Upgrade: websocket
                    Connection: Upgrade
                    Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
                    Sec-WebSocket-Protocol: chat
                    */

          // CORS(Cross-Origin Resource Sharing):跨域资源分享
                // W3C 标准，属于跨源 AJAX 请求的根本解决方法。相比 JSONP 只能发GET请求，CORS 允许任何类型的请求

  // CORS通信
      //概述
          // (Cross-Origin Resource Sharing):跨域资源分享；需要浏览器和服务器同时支持
          // CORS 通信与普通的 AJAX 通信没有差别，代码完全一样
          // 实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨域通信

      // 两种请求
          // 简单请求（simple request）和非简单请求（not-so-simple request）
          // 同时满足以下两大条件，就是简单请求
              // 1、请求方法是以下三种之一
                  // HEAD GET POST
              // 2 、HTTP头信息不超出以下几种字段
                  // Accept
                  // Accept-Language
                  // Content-Language
                  // Last-Event-ID
                  // Content-Type：只限于三个值
                      // application/x-www-form-urlencoded、multipart/form-data、text/plain
              // 简单请求就是表单请求,简单的HTTP方法与简单的头信息的结合
          // 不满足以上条件，就是非简单请求

      // 简单请求
          // 基本流程
              //对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个Origin字段
                 /* GET /cors HTTP/1.1
                  Origin: http://api.bob.com
                  Host: api.alice.com
                  Accept-Language: en-US
                  Connection: keep-alive
                  User-Agent: Mozilla/5.0... */
              //如果Origin指定的源不在许可范围內，服务器会返回一个正常的HTTP回应
              // 如果Origin指定的域名在许可范围，服务器返回的响应，会多出几个头信息字段
                /*Access-Control-Allow-Origin: http://api.bob.com
                  Access-Control-Allow-Credentials: true
                  Access-Control-Expose-Headers: FooBar
                  Content-Type: text/html; charset=utf-8 */
              // 有三个与 CORS 请求相关的字段，都以Access-Control-开头
                  // Access-Control-Allow-Origin:该字段是必须的。
                      // 它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求
                  // Access-Control-Allow-Credentials:布尔值，允许发送cookie；
                      // 默认情况下，Cookie 不包括在 CORS 请求之中。设为true
                  // Access-Control-Expose-Headers：
                      // 该字段可选。CORS 请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个服务器返回的基本字段：
                        // Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma
              // withCredentials属性
                  // CORS 请求默认不包含 Cookie 信息
                  // 服务器需要cookie，这时需要服务器显式指定Access-Control-Allow-Credentials字段，告诉浏览器可以发送 Cookie
                      // Access-Control-Allow-Credentials: true
                  // 同时，开发者必须在AJAX请求中打开withCredentials属性
                      var xhr = new XMLHttpRequest();
                      xhr.withCredentials = true;
              // 如果服务器要求浏览器发送 Cookie，
                  // Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名

      // 非简单请求
          // 预检请求
              // 非简单请求是那种对服务器提出特殊要求的请求
                  // 比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json
              // 会在正式通信之前，增加一次 HTTP 查询请求，称为“预检”请求
                  // 浏览器选询问服务器，域名是否在服务器名单中，以及可以使用哪些HTTP方法信息字段；得到答复，正式发送请求，否则报错
                      var url = 'http://api.alice.com/cors';
                      var xhr = new XMLHttpRequest();
                      xhr.open('PUT', url, true);
                      xhr.setRequestHeader('X-Custom-Header', 'value');
                      xhr.send();
                  // 1、http请求是PUT，并且发送自定义头信息X-Custom-Header，浏览器发现是一个非简单请求
                  // 2、自动发送一个预检请求，下面是预检HTTP头信息
                      /*OPTIONS /cors HTTP/1.1
                      Origin: http://api.bob.com
                      Access-Control-Request-Method: PUT
                      Access-Control-Request-Headers: X-Custom-Header
                      Host: api.alice.com
                      Accept-Language: en-US
                      Connection: keep-alive
                      User-Agent: Mozilla/5.0...*/
                  // 预检请求用的请求方法是OPTIONS ，表示这个请求是用来询问的
                  // 关键字段是Origin，表示请求来自哪个源
                  // 除了Origin字段，“预检”请求的头信息包括两个特殊字段
                      // Access-Control-Request-Method：必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法，上例是PUT
                      // Access-Control-Request-Headers：该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段
          // 预检请求的回应
              // 服务器收到“预检”请求以后
              // 检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后
              // 确认允许跨源请求，就可以做出回应
                /*  HTTP/1.1 200 OK
                  Date: Mon, 01 Dec 2008 01:15:39 GMT
                  Server: Apache/2.0.61 (Unix)
                  Access-Control-Allow-Origin: http://api.bob.com
                  Access-Control-Allow-Methods: GET, POST, PUT
                  Access-Control-Allow-Headers: X-Custom-Header
                  Content-Type: text/html; charset=utf-8
                  Content-Encoding: gzip
                  Content-Length: 0
                  Keep-Alive: timeout=2, max=100
                  Connection: Keep-Alive*/
                // HTTP 回应中，关键的是Access-Control-Allow-Origin字段
                    // 表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求
                    // Access-Control-Allow-Origin: *
                // 如果服务器否定了预检，会放回一个正常的http回应，但没有任何CORS相关的头信息，或明确表示不符合
                    /*OPTIONS http://api.bob.com HTTP/1.1
                    Status: 200
                    Access-Control-Allow-Origin: https://notyourdomain.com  //明确不包括发出请求的域名
                    Access-Control-Allow-Method: POST */
              // 服务器回应其他CORS相关字段
                   /* Access-Control-Allow-Methods: GET, POST, PUT
                    Access-Control-Allow-Headers: X-Custom-Header
                    Access-Control-Allow-Credentials: true
                    Access-Control-Max-Age: 1728000 */
                  // Access-Control-Allow-Methods：该字段必需，逗号分隔，表明服务器支持的所有跨域请求的方法
                  // Access-Control-Allow-Headers：必需的。逗号分隔，服务器支持的所有头信息字段，
                      // 不限于浏览器在“预检”中请求的字段。
                  // Access-Control-Allow-Credentials：布尔值，允许发送cookie
                  // Access-Control-Max-Age：可选，用来指定本次预检请求的有效期，单位为秒
          //浏览器的正常请求和回应
              // 一旦服务器通过预检请求，以后每次浏览器正常的CORS请求，就跟简单请求一样，会有一个Oringin头信息字段
              // 服务器的回应，也会有一个Access-Control-Allow-Origin头信息字段
                 /* PUT /cors HTTP/1.1
                  Origin: http://api.bob.com
                  Host: api.alice.com
                  X-Custom-Header: value
                  Accept-Language: en-US
                  Connection: keep-alive
                  User-Agent: Mozilla/5.0... */
                // 上面头信息的Origin字段是浏览器自动添加的
                // 下面服务器正常反应
                      // Access-Control-Allow-Origin: http://api.bob.com
                      // Content-Type: text/html; charset=utf-8

      // 与JSONP比较
          // 使用目的相同，但比JSONP强大
          // JSONP只支持GET请求，CORS 支持所有类型的 HTTP 请求
          // JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据

  // Storage接口
      // 概述
          // Storage接口用于在浏览器保存数据
          // 两个对象部署了这个接口
              // window.sessionStorage 和 window.localStorage
          // sessionStorage保存数据用于浏览器的一次会话，当会话结束（通常是关闭窗口），数据被清空
          // localStorage保存的数据长期存在，下一次访问，网页可以直接读取以前保存的数据
          // 除了保存期限不同，这两个对象其他方面一致
          // 保存数据以键值对形式存在，以文本格式保存

      // 属性和方法
          //Storage接口只有一个属性
          // Storage.length:返回保存的数据项的个数
              window.localStorage.setItem('foo', 'a');
              window.localStorage.setItem('bar', 'b');
              window.localStorage.setItem('baz', 'c');
              window.localStorage.length // 3

          // Storage.setItem()
              // 用于存入数据；接受两个参数，第一个是键名；第二个是存入的数据
              // 如果键名存在，会更新已有的键值；没有返回值
                  window.sessionStorage.setItem('key', 'value');
                  window.localStorage.setItem('key', 'value');
              // 两个参数都是字符串，不是字符串，会自动转为字符串，在存入浏览器
              // 写入也可以直接赋值
                  // 下面三种写法等价
                  window.localStorage.foo = '123';
                  window.localStorage['foo'] = '123';
                  window.localStorage.setItem('foo', '123');

          // Storage.getItem():读取数据；只有一个参数，字符串，就是键名
              window.sessionStorage.getItem('key')
              window.localStorage.getItem('key')

          // Storage.removeItem():清除某个键名对应的键值
          // Storage.clear():用于清除所有的保存的数据；返回undefined
          // Storage.key():接受一个整数作为参数（从0开始），返回对应位置的键名
              window.sessionStorage.setItem('key', 'value');
              window.sessionStorage.key(0) // "key"
              // Storage.length 和Storage.key()可以遍历所有的键
              for (var i = 0; i < window.localStorage.length; i++) {
                console.log(localStorage.key(i));
              }

      // storage事件
          // Storage接口存储数据发生变化时，会触发Storage事件，可以指定这个事件的监听函数
              window.addEventListener('storage', onStorageChange);
              // 监听函数接受一个event实例对象作为参数；这个对象继承了StorageEvent接口，有几个特有的属性，只读
                  // StorageEvent.key：字符串，表示发生变动的键名
                  // StorageEvent.newValue：字符串，表示新的键值；如果clear()方法或删除该键值引发的，返回null
                  // StorageEvent.oldValue：字符串，表示旧的键值。如果该键值对是新增的，该属性返回null
                  // StorageEvent.storageArea：对象，返回键值对所在的整个对象
                  // StorageEvent.url：字符串，表示原始触发 storage 事件的那个网页的网址
                  function onStorageChange(e) {
                    console.log(e.key);
                  }

                  window.addEventListener('storage', onStorageChange);
                  // 它不在导致数据变化的当前页面触发，而是在同一个域名的其他窗口触发
                  // 通过这种机制，实现多个窗口之间的通信

  // History对象
      // 概述
          // window.hsitory指向History对象，它表示当前窗口的浏览历史
          // History对象保存了当前窗口访问过的所有页面网址
              window.history.length;//3
          // 安全原因，浏览器不允许脚本读取这些地址，但是允许地址之间导航
              // 后退到前一个网址
              history.back()
              // 等同于
              history.go(-1)

      // 属性
          // History主要有两个属性
              // History.length：当前窗口访问过的网址数量（包括当前网页）
              // History.state：History 堆栈最上层的状态值；通常undefined，即未设置

      // 方法
          // History.back(),History.forword()，History.go()
                // History.back()：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。
                // History.forward()：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。
                // History.go()：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如go(1)相当于forward()，go(-1)相当于back()
                    History.go(0);//相当与刷新页面
                // 移动到以前访问过的页面时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页

          // History.pushState()
              // 在历史记录中添加一条记录
              window.history.pushState(state, title, url);
              // 接受三个参数
                  // state：一个与添加的记录相关联的状态对象，主要用于popstate事件。
                  // title：新页面的标题；可以填空字符串
                  // url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址
                      var stateObj = { foo: 'bar' };
                      history.pushState(stateObj, 'page 2', '2.html');
                      history.state // {foo: "bar"}
                      // 假定当前网址是example.com/1.html
                      // 添加新纪录后，浏览器地址栏立马显示example.com/2.html
                      // 但并不会跳转到2.html，甚至也不会检查2.html是否存在，只是成为浏览历史中的最新记录

                    // 如果pushState()方法设置了一个跨域网址，则会报错
                        // 当前网址为 http://example.com
                        history.pushState(null, '', 'https://twitter.com/hello');

          // History.replaceState()用来修改 History 对象的当前记录，其他都与pushState()方法一模一样

      // popstate事件
          // 当同一个文档浏览历史（及History）发生变化时，就会触发popstate事件
          // 注意：仅仅调用pushState 和replaceState方法不会触发该事件
          // 只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript
            // 调用History.back()、History.forward()、History.go()方法时才会触发

  // Location对象，URL对象，URLSearhParams对象
      // Location对象
          // 概述
              // URL是网络的基础设施之一
              // Location是浏览器提供的原生对象，提供URL相关信息和操作方法
              // 通过window.location和document.location属性，可以拿到这个对象
          // 属性
              // Location.href：整个 URL。
              // Location.protocol：当前 URL 的协议，包括冒号（:）。
              // Location.host：主机。如果端口不是协议默认的80和433，则还会包括冒号（:）和端口。
              // Location.hostname：主机名，不包括端口。
              // Location.port：端口号。
              // Location.pathname：URL 的路径部分，从根路径/开始。
              // Location.search：查询字符串部分，从问号?开始。
              // Location.hash：片段字符串部分，从#开始。
              // Location.username：域名前面的用户名。
              // Location.password：域名前面的密码。
              // Location.origin：URL 的协议、主机名和端口。 只读
          // 方法
              // Location.assign():接受一个URL字符串作为参数，使浏览器立即跳转到新的URL；如果URL不正确，则报错
                  document.location.assign('http://www.example.com')
              // Location.replace():接受一个URL字符串作为参数，使浏览器立即跳转到新的URL；如果URL不正确，则报错
                  // 与assign的区别：replace会在浏览器的浏览历史History里面删除当前网址，一旦使用了该方法，后退按钮就无法回到当前网页了
                  // 相当与一个新的URL替换了旧的URL
                  // 应用是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页
              // Location.reload()
                  // 使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮
                  // 接受一个布尔值作为参数，如果为true，浏览器从服务器从新请求这个网页；加载后，网页将滚动到头部（scrollTop===0）
                      // 如果为false：浏览器从本地缓存重新加载网页，重新加载后，网页视口不变
                      window.location.reload(true);
              // Location.toString():返回整个 URL 字符串，相当于读取Location.href属性

      // URL的编码和解码
          //URL包含两类合法的字符
              // URL元字符
                  // ;  ,  /  ?  :  @  #  $   %  =   +
              // 语义字符
                  // 0-9 a-z A-Z  -  _  .  !    ~  *  '   ()
              // 四个编码/解码
                  // encodeURL()
                      // 转码整个 URL；参数为字符串，代表整个URL
                      // 会将元字符和语义字符之外的字符，都进行转义
                  // encodeURLComponent()
                      // 用于转码 URL 的组成部分，会转码除了语义字符之外的所有字符
                      // 即元字符也会被转码
                      // 不能用于转码整个 URL。它接受一个参数，就是 URL 的片段
                  // decodeURL()
                      // 用于整个 URL 的解码。它是encodeURI()方法的逆运算。
                      // 它接受一个参数，就是转码后的 URL
                  // decodeURLComponent()
                      // encodeURIComponent()方法的逆运算
                      // 它接受一个参数，就是转码后的 URL 片段

      // URL接口
          //构造函数
              // URL()作为构造函数，可以生成URL实例
          // 实例属性
          // 静态方法
              // URL.createObjectURL():用来为上传/下载的文件、流媒体文件生成一个URL字符串
              // URL.revokeObjectURL()：用来释放URL.createObjectURL()方法生成的 URL 实例

      // URLSearchParams对象
          // 概述
              //URLSearchParams对象浏览器的原生对象，用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）
              var params = new URLSearchParams('?foo=1&bar=2');
              // 等同于
              var params = new URLSearchParams(document.location.search);
          // URLSearchParams.toString():返回实例的字符串形式
              var url = new URL('https://example.com?foo=1&bar=2');
              var params = new URLSearchParams(url.search);
              params.toString() // "foo=1&bar=2'
          // URLSearchParams.append():用来追加一个查询参数
          // URLSearchParams.delete():用来删除指定的查询参数
          // URLSearchParams.has()：返回一个布尔值，表示查询字符串是否包含指定的键名
          // URLSearchParams.set()：用来设置查询字符串的键值
          // URLSearchParams.get()用来读取查询字符串里面的指定键。它接受键名作为参数
          // URLSearchParams.getAll()返回一个数组，成员是指定键的所有键值。它接受键名作为参数
          // URLSearchParams.sort()对查询字符串里面的键进行排序，规则是按照 Unicode 码点从小到大排列
          // URLSearchParams.keys()返回的是键名的遍历器
          // URLSearchParams.values()返回的是键值的遍历器
          // URLSearchParams.entries()返回的是键值对的遍历器

  // ArrayBuffer对象，Blob对象
      // 表示一段二进制数据，用来模拟内存里面的数据
          var buffer= new ArrayBuffer(8);
          // 实例对象buffer占用8个字节
          // 实例属性byteLength，表示当前实例占用的内存长度（单位字节）
          buffer.byteLength;//8
          // 实例方法slice()，用来复制一部分内存。
              // 它接受两个整数参数，分别表示复制的开始位置（从0开始）和结束位置（复制时不包括结束位置）
              // 如果省略第二个参数，则表示一直复制到结束
                  var buf2 = buf1.slice(0);

      // Blob对象
          // 表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写
          // 它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存
          // 接受两个参数
              // 第一个是数组，成员是字符串或二进制对象；表示新生成的Blob实例对象的内容
              // 可选，是一个配置对象，只有一个属性type值是一个字符串，表示数据的 MIME 类型，默认是空字符串
              var obj = { hello: 'world' };
              var blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
          // 实例属性和方法
              // Blob具有两个实例属性size和type，分别返回数据的大小和类型
              // 实例方法slice，用来拷贝原来的数据，返回的也是一个Blob实例
              myBlob.slice(start, end, contentType)
              // 起始位置（从0开始） 结束的字节位置  （默认size属性的值，该位置不包含在內）
                        // 新实例的数据类型（默认为空字符串）
          // File 实例对象是一个特殊的 Blob 实例，增加了name和lastModifiedDate（文件的最后修改时间）属性
          // 下载文件，指定responseType属性为blob，下载下来的就是一个 Blob 对象
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.responseType = 'blob';
          // 读取对象
              // 取得 Blob 对象以后，可以通过FileReader对象，读取 Blob 对象的内容，即文件内容
              // FileReader 对象提供四个方法，处理 Blob 对象
                  // FileReader.readAsText()：返回文本，需要指定文本编码，默认为 UTF-8。
                  // FileReader.readAsArrayBuffer()：返回 ArrayBuffer 对象。
                  // FileReader.readAsDataURL()：返回 Data URL。
                  // FileReader.readAsBinaryString()：返回原始的二进制字符串

  // File对象，FileList对象，FileReader对象
      // File:File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象
          // 构造函数
              // new File(array,name,[,option])
              // File()的三个参数
                  // array：一个数组，成员可以是二进制对象或字符串，表示文件的内容。
                  // name：字符串，表示文件名或文件路径。
                  // options：配置对象，设置实例的属性。该参数可选。
              // 第三个参数配置对象，可以设置两个属性。
                  // type：字符串，表示实例对象的 MIME 类型，默认值为空字符串。
                  // lastModified：时间戳，表示上次修改的时间，默认为Date.now()
                      var file = new File(
                        ['foo'],
                        'foo.txt',
                        {
                          type: 'text/plain',
                        }
                      );
          // 实例属性和方法
              // 实例属性
                  // File.lastModified：最后修改时间
                  // File.name：文件名或文件路径
                  // File.size：文件大小（单位字节）
                  // File.type：文件的 MIME 类型
              // File 对象没有自己的实例方法，由于继承了 Blob 对象，因此可以使用 Blob 的实例方法slice()

      // FileList:
          // FileList对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例
          // 出现场合
              // 文件控件节点（<input type="file">）的files属性，返回一个 FileList 实例。
              // 拖拉一组文件时，目标区的DataTransfer.files属性，返回一个 FileList 实例。
          // 实力属性length
          // 主要方法item()

      // FileReader对象
          // 用于读取 File 对象或 Blob 对象所包含的文件内
          // 浏览器原生提供一个FileReader构造函数，用来生成 FileReader 实例


  // 表单，FormData对象
      // 表单概述
          // 表单<form>用来征集用户提交的数据，发送到服务器

      // FormDate对象
          // 概述
              // 表单数据以键值自动向服务器发送，这个过程是浏览器自动完成的
              // FormDate()是一个构造函数，用来生成表单实例
                  var formdata = new FormData(form);
              // FormData()构造函数的参数是一个 DOM 的表单元素，构造函数会自动处理表单的键值对
          //实例方法
              // From.get(key):获取键名对应的键值
              // From.getAll(key):返回一个数组，表示指定键名对应的所有键值
              // From.set(key，value):置指定键名的键值，参数为键名;如果键名不存在，添加键值对
              // From.delete(key):删除这个键值对
              // From.append(key，value):添加一个键值对
              // From.has(key):返回一个布尔值，表示是否具有该键名的键值对
              // From.keys():返回一个遍历器对象，用于for...of循环遍历所有的键名
              // From.values():返回一个遍历器对象，用于for...of循环遍历所有的键值
              // From.entries():回一个遍历器对象，用于for...of循环遍历所有的键值对

      // 表单的内置验证
          //自动校验
              // dom css
          // checkValidity：表单元素和表单控件都有checkValidity()方法，用于手动触发校验
              // 触发整个表单的校验
                form.checkValidity()
              // 返回一个布尔值，true表示通过校验，false表示没有通过校验
          // willValidate属性是一个布尔值，表示该控件是否会在提交时进行校验
          // validationMessage属性返回一个字符串，表示控件不满足校验条件时，浏览器显示的提示文本
          // setCustomValidity()方法用来定制校验失败时的报错信息
          // 控件元素的属性validity属性返回一个ValidityState对象，包含当前校验状态的信息
          // 表单元素的 HTML 属性novalidate，可以关闭浏览器的自动校验

      // enctype对象
          // 表单能够用四种编码，向服务器发送数据；编码格式由表单的enctype属性决定
          // GET：表单使用GET方法发送数据，enctype属性无效
             /* <form
                action="register.php"
                method="get"
                onsubmit="AJAXSubmit(this); return false;"
              >
              </form>*/
          // application/x-www-form-urlencoded
              // 如果表单用POST方法发送数据，并省略enctype属性
                // 那么数据以application/x-www-form-urlencoded格式发送（因为这是默认值）
          //text/plain
              // 如果表单使用POST方法发送数据，enctype属性为text/plain，那么数据将以纯文本格式发送
          // multipart/form-data
              // 表单使用POST方法，enctype属性为multipart/form-data，那么数据将以混合的格式发送

      // 文件上传
          // 用户上传文件，也是通过表单
          // 将表单<form>元素的method属性设为POST，enctype属性设为multipart/form-data
          // enctype属性决定了 HTTP 头信息的Content-Type字段的值
              // 默认情况下这个字段的值是application/x-www-form-urlencoded
              // 但是文件上传的时候要改成multipart/form-data

  // IndexedDB API对象
      // 概念
          // Cookie大小不超过4kb，且每次请求都要发送会服务器
          // LocalStorage:2.5M-10M之间，且不提供搜索功能，不能建立自定义索引
          // IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作
          // 特点
              // 键值对存储
              // 异步
              // 支持事物
              // 同源限制
              // 存储空间大
              // 支持二进制存储

      // 基本概念
          // IndexedDB 是一个比较复杂的 API，涉及不少概念。它把不同的实体，抽象成一个个对象接口
          // 接口
              // 数据库：IDBDatabase 对象
              // 对象仓库：IDBObjectStore 对象
              // 索引： IDBIndex 对象
              // 事务： IDBTransaction 对象
              // 操作请求：IDBRequest 对象
              // 指针： IDBCursor 对象
              // 主键集合：IDBKeyRange 对象

          //概念
              // 数据库：是一系列相关数据的容器。每个域名（严格的说，是协议 + 域名 + 端口）都可以新建任意多个数据库
              // 对象仓库：每个数据库包含若干个对象仓库（object store）。它类似于关系型数据库的表格。
              // 数据记录：对象仓库保存的是数据记录
              // 索引：为了加速数据的检索，可以在对象仓库里面，为不同的属性建立索引
              // 事物：数据记录的读写和删改，都要通过事务完成

      // 操作流程
          // 打开数据库
              indexedDB.open()
              //error 事件：error事件表示打开数据库失败
              // success事件表示成功打开数据库
              // upgradeneeded:如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded
          // 新建数据库
              // 新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建
              // 后续的操作主要在upgradeneeded事件的监听函数里面完成
          // 新增数据
              // 新增数据指的是向对象仓库写入数据记录
          // 读取数据
          // 遍历数据
          // 更新数据
          // 删除数据
          // 使用索引

      // indexedDB对象
          // indexedDB.open()方法用于打开数据库
              // 四种事件
                  // success：打开成功。
                  // error：打开失败。
                  // upgradeneeded：第一次打开该数据库，或者数据库版本发生变化。
                  // blocked：上一次的数据库连接还未关闭
          // indexedDB.deleteDatabase()：用于删除一个数据库，参数为数据库的名字
          // 、indexedDB.cmp()方法比较两个值是否为 indexedDB 的相同的主键

      // IDBRequest对象
          // 表示打开的数据库连接，indexedDB.open()方法和indexedDB.deleteDatabase()方法会返回这个对象

      // IDBDateBase对象
          // 打开数据成功以后，可以从IDBOpenDBRequest对象的result属性上面，拿到一个IDBDatabase对象，它表示连接的数据库

      // IDBObjectStore 对象
          // 对应一个对象仓库（object store）

      // IDBTransaction 对象
          // 用来异步操作数据库事务，所有的读写操作都要通过这个对象进行

      // IDBIndex 对象
          // 代表数据库的索引，通过这个对象可以获取数据库里面的记录

      // IDBCursor 对象
          // 代表指针对象，用来遍历数据仓库（IDBObjectStore）或索引（IDBIndex）的记录

      // IDBKeyRange 对象
          // 代表数据仓库（object store）里面的一组主键。根据这组主键，可以获取数据仓库或索引里面的一组记录

  // Web Worker
      // 概述
          // JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事
          // 作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行
          // 同时运行，互不打扰，worker运行结束，结果返回到主线程；主线程保持通畅，不被阻塞或者拖慢
          // 注意：
              // 同源限制
              // DOM限制
              // 全局对象限制
              // 通信联系
              // 脚本限制
              // 文件限制

      // 基本用法
          // 主线程
              var worker = new Worker('work.js');
              // 主线程调用worker.postMessage()方法，向 Worker 发消息
              // 主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息
              // Worker 完成任务以后，主线程就可以把它关掉。
                  worker.terminate();
          // worker线程
              //需要有一个监听函数，监听message事件
          // 关闭worker
              // 主线程
              worker.terminate();
              // Worker 线程
              self.close();

      // 数据通信
      // 同网页的web worker
      // 实例：worker线程完成事件轮询
      // 实例：worker新建worker
      // API

      //cpu密集型：所有计算
      // io密集型：网络io：请求；硬盘io：读写文件
}