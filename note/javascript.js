//一、基本语法
//  let:声明的变量只在代码块中有效
//  var:变量提升,变量可以在声明之前使用
//  const :声明一个只读的常量,常量的值不能改变
//  javascript引擎的工作方式是，先解析代码，获得所有被声明的变量， 然后在一行一行运行
//  变量提升：所有变量的申明语句，都会被提升到代码头部

//  标识符：第一个字符：Unicode字母，美元（$）,下划线（_）,第二个还可以是数字

//二、数据类型：
//  number string null boolean  underfined  object（function arrary）symbol
//  判断数据类型
//    typeof：返回一个值的数据类型  ex:{} []  返回object
//    instanceof ：可以区分数组和对象
//    Object.protorype.toString
//    ex:
      typeof([])  //object
      typeof({})  //object

    //  [] instanceof Array  //true
    //  {} instanceof Array  //false

      Object.prototype.toString.call([])  //[object Array]
      Object.prototype.toString.call({})  //[object Object]
      Object.prototype.toString.call("")  //[object String]

      null == undefined  //true
      NaN === NaN  //false
      Number(null) //0  null可以转化为0
      Number(undefined) //NaN

//  布尔值
//     有六种自动转为false：“”或''  0 null undefined false  NaN

//  数值
//   数值精度：JavaScript浮点数64位二进制组成
//      第一个：符号位，0表示正，1表示负数
//      第二位到12位（11位）：指数部分
//      第13位到64（52位）：小数部分（即有效数字）
//       公式：(-1)^符号位 * 1.xx...xx * 2^指数部分
//      有效数精度：最多53个二进制位： -2^53到2^53
//      指数数值范围：11个二进制位，指数部分最大值2047（2的11次方-1）
//        2^1024到2^(-1023)
//      ex:
        1===1.0  //true
        0.3/0.2  //2.9999999999999996
        0.1+0.2 === 0.3  //false  浮点数不是精确的值
//   数值的表示方发
      123e3   //123000
      123e-3  //0.123
//   数值的进制
//     ox：十六进制
//     ob：二进制
//     0：十进制
//     parseInt（string，radix）radix：2-36之间的整数
       parseInt("11",4)//5   1*4**1+1*4**0
//     isFinite()是否为一个正常值
//   NaN:非数字，特殊数值  数据类型位number  不等于任何值，与任何值运算都得NaN
//     ex:
        NaN===NaN  //false
        typeof NaN  //number
        isNaN(NaN)  //true
        isNaN(123)  //false
        isNaN([])  //false
        isNaN([123])  //false
        isNaN(['123'])  //false
//   Infinity:无穷
//   isFinite  除以下都返回true
//   ex:
      isFinite(Infinity)  //false
      isFinite(-Infinity)  //false
      isFinite(NaN)  //false
      isFinite(undefined)  //false
  // 字符串
  //   转义
  //     \0 ：null（\u0000）
  //     \b ：后退键（\u0008）
  //     \f ：换页符（\u000C）
  //     \n ：换行符（\u000A）
  //     \r ：回车键（\u000D）
  //     \t ：制表符（\u0009）
  //   Base64转码
  //     btoa()：任意值转为 Base64 编码
  //     atob()：Base64 编码转为原来的值
  // 对象
  //   表达式还是语句
  //   (表达式)
  //     eval() 对字符串求值
  //     ex:
          eval('{foo: 123}') // 123
          eval('({foo: 123  })') // {foo: 123}
  // 函数
  //   三种申明函数的方法
  //     function命令
        function print(){}
      // 函数表达式
        var print=function(){}
      // Funtion构造函数
        var print=new Function('x','y','return x+y')
      //   等同于
          function print(x,y){
            return x+y;
          }
    // 第一等公民：函数与其他数据类型地位平等
    // 函数提升：采用function声明函数时，整个函数像变量声明一样提升到代码头部
        f();
        function f(){}
    // 属性和方法
    //   name length
    //   .toString（）返回函数的源码
      // arguments
      //   在函数内部读取多有参数
    // 闭包：函数中的函数，为了让临时变量不被释放
    //   ex:
        function count(a){
          return function(){
              return a++;
          }
        }
        var count=count(0)
        count()//0
        count()//1  // 立即调用的函数表达式（IIFE）
        //   ex：
        count()//2
        count()//3

        function Person(name){
          var age=12;
          function getAge(){
            return age;
          }
          function setAge(n){
            age=n;
          }
            return{
              name:name,
              age:age,
              getAge:getAge,
              setAge:setAge,
            }
        }
        var person=Person("张三")
        person  //{name:"张三",age:12}
        person.setAge(25)
        person.getAge()   //25
  // 立即调用的函数表达式（IIFE）
  //   ex：
        var f=function f(){}();
        (function(){}());
        (function(){})();
        (()=>{})();
  // 数组:按次序排列的一组值
  //     数组属于特殊的对象 typeof返回是object
        var arr1=["a","b","c"];
        Object.keys(arr1); //[1','2','3']
      // length属性：键名中最大的整数加1
        var arr=[]
        arr["a"]="a";
        arr[3]=3;
        arr.length;  //4
      // in:某个键名是否存在，适用于对象，也适用于数组
        3 in arr ; //true
        "3" in arr;  //true
        "a" in arr;  //true
      // 空位：逗号之间没有任何值 使用forEach  for...in Object.keys 都会跳过
      //     当某个位置是undefined不会被跳过
          var a=[1,,];
          a.length;  //3
          for(var i=0;i<a.length;i++){
            console.log(i);  //没有任何输出
          }
          var b=[undefined,undefined,undefined];
          b.length;//3
          for(var j in b){
            console.log(i);
          }
          //0
          //1
          //2
      // 类似数组的对象：所有键名都是正整数或者0，并且有length属性
          var obj={
            "0":'a',
            "1":'b',
            "2":'c',
            "3":'d'
          }
          obj[1];//a
          obj.length;//4
          // obj.push("e");//typeError  对象没有push方法，使用则会报错

          var obj1={length:0}
          obj1['0']="a";
          obj1.length;//0  length属性不是动态值， 不会随着成员的变化而变化

      // 典型“类似数组的对象“是函数的arguments对象 以及大多数DOM元，字符串
          // arguments:
          function args(){return arguments};
          var list=args("a","b","c");
          list;//["a","b",c]
          list[0];//a
          list instanceof Array;//false

          // dom:
          // var dom=document.getElementsByTagName("p");//如获取10个
          // dom.length;//10
          // dom instanceof Array;//false

          // 字符串：
          var str="abc";
          str[1];//"b"
          str.length;//3
          str instanceof Array //false
        // slice 可以将类似数组的对象 转为数组
           var listArr=Array.prototype.slice.call(list);
        // 可以使用call把数组方法放到对象上
            function print(value,index){
              console.log(index+":"+value);
            }
            Array.prototype.forEach.call(list,print);
            //0:a
            //1:b
            //2:c

// 三、运算符
//     + - * / ++ -- +x -x  %  **(指数)
    // 加法：
    //   加法运算符运行时，执行相加还是相连，导致不同的运算，叫重载
        '1'+2+3;//'123'
        1+2+'4';//'34'
      // 对象相加
        var obj={'p':1};
        obj+2;//'[object object]2'
              obj.valueOf();//{p:1}
              obj.valueOf().toString();//[object object]
        // 自定义valueOf或者toString
            var obj={
              valueOf:function(){
                return 1;
              }
            }
            obj+1;//2
            var obj={
              toString:function(){
                return "hello";
              }
            }
            obj+1;//'hello1'
        // 如果对象是Date,则会先执行toString
          var obj=new Date();
          obj.valueOf=function (){return 1};
          obj.toString=function(){return 'hello'}
          obj+2;//'hello2'
    // 余数：正负号由第一个运算子决定
        -3%2;//-1
        3%-2;//1

    // 指数：右结合
          2**3**2;//512

    // 严格相等：===  和==
    //     两者区别在于==先转为同一个类型，再用严格模式比较， === 是否为同一个值
        1=='1';//true
        1==='1';//false 不是同一个类型直接返回false
        1===0x1;//true
        +0===-0//true
        // 复合型（对象 数组 函数）:比较是否指向同一个指针
            let x =[]===[];//false
            let x2= {}==={};//false
            (function (){})===(function(){});//false
        // undefined null:与自身严格相等
        var a;
        var b;
        a===b;//true 未赋值为undefined

    // 相等运算
    //     比较相同类型，与严格相等一样
    //     原始值比较：转为数字比较
          1=='1';//true   Number('1') 1
          Number('');//0
          Number('1');//1
          Number(true);//1
          Number(null);//0
          Number(undefined);//NaN
          Number(NaN);//NaN
          Number('adf');//NaN
          '\t  1  \n'==1;//true 字符串转为数字时省略前置和后置空格
        // 对象值与原始值比较：先调用对象的valueOf(),如果还是对象，再调用toString()得到字符串比较
            [1]==1;//true
            [1,2]=='1,2';//true
              [1,2].valueOf().toString();//'1,2'
            [1]==true;//true
        // undefined和null只与自身比较或相互比较返回true 与其他比较都为false

      // 布尔运算符
      //   !  ||  &&  （非  或  与）

      // 二进制运算符
      //    对二进制位进行运算，位运算只对整数起作用，不是整数会自动转为整数
      //    位运算时，以32位带符号的整数进行运算，返回值也是32位带符号的整数
      //    |：或，
      //    &：与
      //    ~：否，二进制取反
      //    ^:异或，两个二进制位不同时，则结果为1，否则为0
      //    <<：左移
      //    >>：右移
      //    >>>:头部补0右移
      //       |：只要一位为1就返回1，否则返回0
      //         ex:
                function toInt32(x){
                  return x | 0;
                }
                toInt32(1.0001);//1
                toInt32(1.9999);//1
                toInt32(-1);//-1
                toInt32(1);//1
                toInt32(Math.pow(2,32)+1);//1
                toInt32(Math.pow(2,32)-1);//-1  对于大于或等于32次方的整数的都会被舍去
                1.99 | 0;//1
                -2.9 | 0;//-2

            // &:只要有一位为0就返回0，否则返回1
                0&3;//0  00 && 11  00
                0 & 1;//0

          // ~否运算：将每一个二进制位取反值， 一个数与自身的取反值相加，等于-1
              ~-3;  //2  -1+(-3)
              ~~3;  //3  对一个整数连续两次取反等于本身
              ~~4.675;  //4
              // 对字符串的否运算，先调用Number函数
              ~'011';//12
              ~'42 cats';//-1
              ~'asdfsdf';//-1
              ~[];//-1  Number([])  0
              ~NaN;//-1
              ~null;//-1

          // ^异或：两个二进制位相同是返回0，不同返回1
              0^3;//3  00 ^ 11   11
              // 特殊用法，调换两个数的值
                var a=44,b=66;
                a^=b;b^=a;a^=b;
                a;//66
                b;//44
              // 取整：
                12.9 ^ 0;//12

          // 左移：将一个数的二进制位向左移指定的位数，后面补0，即乘以2指定次方，符号位一起移动
                4<<1;//8  4*2**1
                13.342<<0;//13  左移0位， 相等取整

          // 右移：将一个数二进制右移指定位数，正数头部补0，负数头部补1
          //     相当除以2指定次方
                4>>1;//2   4/2**1
                -4>>1;//-2  -4/2**1
                21>>3;//2  21/8=2...5
          // 头部补0的右移运算：右移指定位，头部一律补0，不考虑符号位
          //     正数基本一致：4>>>1;//2
          //     负数：将一个值转为32位无符号整数
                -1>>>0;//4294967295 (2^32)-1

        // 开关作用：位运算符可以用做对象的属性的开关
            var FLAG_A=1;//0001
            var FLAG_B=2;//0010
            var FLAG_C=4;//0100
            var FLAG_D=8;//1000
            // 1.检查当前是否打开开关
                var flags=5;
                if(flags & FLAG_C){
                  //..
                }
                //0101  & 0100   0100>true
            // 2.需要打开三个开关ABD,可以构造一个掩码
                var mask=FLAG_A  | FLAG_B | FLAG_D;
                //          0001       0100    1000    1101
                // 打开：flags = flags | mask
                // 关闭：flags =flags & mask
            // 3.恢复flags
                flags =flags ^ mask
                // 或
                flags = ~flags

      // void运算符:浏览器书签作用；超链接中插入代码，防止网页跳转
          void 0;//undefined
          void(0);  //undefined
      // 优先级
          // () :把表达式放到圆括号中，提升优先级；在函数后面，调用函数
// 四、语法专题
//     1.数据类型的转换
        // Number()：整体转换
        // parseInt()：逐个转换，都会自动过滤字符串签到后缀的空格
        //   原始值：
              Number(234);//234
              Number('234');//234
              Number('234asf');//NaN
              Number(true);//1
              Number(false);//0
              Number(null);//0
              Number('');//0
              Number(undefined);//NaN
              Number('\t\n3.14\r');//NaN
          // 对象：包含单个数值的数值返回值，其余放回NaN
              Number({a:1});//NaN
              Number([1,2,3]);//NaN
              Number([1]);//1
              // 调用对象：使用valueOf(),如果返回值是对象
              //         调用toString(),如果返回值还是对象，则报错
                      var obj={a:1};
                      if(typeof obj ==="object"){
                        Number(obj.toString())
                      }else{
                        Number(obj.valueOf())
                      }

        // String():任意转为字符串
        //     原始值：
              String('1123');//'1123'
              String(1123);//'1123'
              String(null);//'null'
              String(undefined);//'undefined'
              String(true);//'true'
            // 对象：先使用toString(),再使用valueOf()
                String([1,1,1]);//'1,1,1'
                String({a:1});//'[object Object]'
                              //String({a:1}.toString())

        // Boolean():将任意值转为布尔值
        //     以下五个值转为false，其他true
            Boolean('');//false
            Boolean(0);//false
            Boolean(null);//false
            Boolean(undefined);//false
            Boolean(NaN);//false

    // 自动转化
        +'abc';//NaN
        -'abc';//NaN
        -true;//-1
        -false;//0
        '5'+1;//'51'
        '5'+function (){};//'51function (){}'
        '5'+[];//'5'
        '5'+{};//'5[object Object]'
        null+1;//NaN  null undefined 转为数字时，为NaN
        undefined+1;//NaN

    // Error实例对象











// Object:
//   本身的方法和实例方法
//   实例方法：定义在Object原型Object.protorype上的方法，可以被实例直接使用
//   Object.keys()  Object.getOwnPropertyNames() 遍历对象的属性
//   元属性{
//     value:值
//     writable：是否可改变
//     enumerable：是否可以遍历
//     configurable：是否可以修改描述对象
//   }
//   .denfineProperty()
//   构造方法：new
//   静态方法：类自身的方法: 类名.keys()
//   实例方法：定义在Object.prototype（对象，类的实例）的方法，六个:a.valueOf()
//   .preventExtensions：无法添加属性
//   .seal：无法添加 删除
//   .freeze无法添加 删除 修改
//   漏洞：可以通过改变原型对象，来为对象增加属性。只能冻结属性指向的对象，而不能冻结对象本身的内容。
// Array:
//   实例方法：
//     .slice（n位置起（包括），n2位置结束（不包括））重要应用：将类似数组的对象转为真正的数组
//     .splice（start,count,添加的参数1,...,...）
//     forEach 和map区别 forEach不返回值
// String:
//   .slice(start,end(不包括))end>start 返回空字符串
//   .substring(start,end(不包括))end>start 调换位置  参数为负值，变为0
//   .substr(start,count) count为负值，变为0
//   .trim() 去除两端空格
//   .match()是否匹配某个字符串，返回数组 不改变原数组
//   .search()返回匹配第一个位置 否则-1
//   .replace()替换（一般只替换第一个匹配，全部：/.../g）
//   .split()分割字符串（没有参数，返回原字符串，第二个参数，返回数组最大成员）
// Math：
//   Math.ceil()：向上取整
//   Math.floor()：向下取整
//   Math.max()：最大值
//   Math.min()：最小值
//   Math.round()：四舍五入
//   Math.random()：随机数
// 对象：
//   对象是单个事物的抽象
//   对象是一个容器，封装了属性和方法
//   new：创建一个空对象，作为将要返回的对象实例
//       对象实例的原型，指向构造函数的prototype
//       this指向对象实例
// 原型：constructor：默认指向prototype对象所在的构造函数
//     instanceof运算符只能用于对象，不适用原始类型的值。
//     .__proto__返回对象的原型
//     .constructor.prototype 返回对象的原型
//     .getPrototypeOf():返回参数对象的原型 （推荐使用）
//     .setPrototypeof（a，b）设置现有对象a的原型为b
//     .create(A)以a为原型生成，继承了a对象的所有属性及方法
//     isPrototypeOf()  检查某个对象是否是另一个对象的原型
//     .getOwnPropertyNames() 返回对象本身所有属性的键名
//     .hasOwnProperty（） 判断定义在自身的属性，还是定义在原形链上的属性
//     .getOwnPropertyDescriptors()
// 让一个构造函数继承另一个构造函数：
//   1.super() 在实例中调用父类的构造函数super，让子类实例具有父类实例的属性
//   2.让子类的原型指向父类的原型
// 异步操作：
//   单线程模型：多个线程，单个脚本只在一个主线程中运行
//   同步任务是那些没有被引擎挂起、在主线程上排队执行的任务，前一个执行完，才执行后一个任务
//   异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务
//   事件循环：CPU遇到io操作，挂起等待中的任务，先运行后面排队的任务，等io操作返回结果，再回过头，把挂起的任务执行下去
//   异步操作模式：
//     回调函数 事件监听 发布/订阅（publish subscribe）
// setTimerout:调整事件发生的顺序
//             用户自定义回调的函数，通常在浏览器默认动作之前触发
// Promise：是一个对象， 也是一个构造函数 三种状态（pending:异步操作未完成，fulfilled：异步操作成功 ， rejected:异步操作失败）
//         .then（）接受两个回调函数。操作成功回调第一个函数，操作失败回调第二个函数
// 事件：
//   事件操作（监听和触发）EventTarget
//     .addEventListener(事件，回调函数，true:捕获阶段可以监听到事件/false：冒泡阶段可以监听到事件)绑定事件监听
//     .removeEventListener()移除事件监听
//     .dispatchEvent()触发事件：当前节点上触发指定事件，从而触发监听函数的执行
//   事件模型：.stopPropagation()分别在捕获阶段和冒泡阶段，阻止了事件的传播 不包括当前节点其他事件监听函数
//           .stopImmediatePropagation()() 取消事件  不触发后面的所有事件
//           .preventDefault（）取消浏览器对当前事件的默认行为 不会阻止事件的传播。canclelable为true时生效
// Cookie:由HTTP协议生成， 提供HTTP协议使用：对话管理 个性化信息  追踪用户
//   window.navigator.cookieEnabled为true   返回cookie
//   服务器希望浏览器保存cookie，在HTTP头信息放置一个set-cookie   浏览器向服务器发送HTTP请求都会带上相应的cookie
//   属性：Expires：指定一个具体的到期时间  Date.prototype.toUTCString()  进行格式转换
//       Max-Age:从现在开始cookie存在的秒数
//       Domain：制定cookie属于那个域名
//       Path:发送HTTP请求，那个路径会附带cookie
//       Secure：指定只有在https下才能附送cookie
//       HttpOnly：cookie无法通过JavaScript脚本拿到
//       SameSite：防止CSRF攻击和用户追踪：  前提用户浏览器支持sameSite
//         strict：完全禁止第三方cookie
//         Lax:导航到目标网址的get请求，连接 预加载 get表单
//         None:前提必须设置secure属性；如：1970年1月1日零点
//     删除一个cookie：设置expires属性为一个过去的日期
// 同源：域名端口号协议相同
//     限制：
//       无法读取非同源的cookie
//         Lax:导航到目标网址的get请求，连接 预加载 get表单
//         None:前提必须设置secure属性；如：1970年1月1日零点
//     删除一个cookie：设置expires属性为一个过去的日期
// 同源：域名端口号协议相同
//     限制：
//       无法读取非同源的cookie VGCF Blv
//       无法接触非同源的dom
//       无法向非同源的地址发送ajax请求



