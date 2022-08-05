//一、基本语法
{
  //  let:声明的变量只在代码块中有效
  //  var:变量提升,变量可以在声明之前使用
  //  const :声明一个只读的常量,常量的值不能改变
  //  javascript引擎的工作方式是，先解析代码，获得所有被声明的变量， 然后在一行一行运行
  //  变量提升：所有变量的申明语句，都会被提升到代码头部

  //  标识符：第一个字符：Unicode字母，美元（$）,下划线（_）,第二个还可以是数字
}
//二、数据类型：
{
//  1.number string null boolean  underfined  object（function arrary）symbol
//  2.判断数据类型
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

//  3.布尔值
//     有六种自动转为false：“”或''  0 null undefined false  NaN

//  4.数值
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
//   5.NaN:非数字，特殊数值  数据类型位number  不等于任何值，与任何值运算都得NaN
//     ex:
        NaN===NaN  //false
        typeof NaN  //number
        isNaN(NaN)  //true
        isNaN(123)  //false
        isNaN([])  //false
        isNaN([123])  //false
        isNaN(['123'])  //false
//   6.Infinity:无穷
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
  // 7.对象
  //   表达式还是语句
  //   (表达式)
  //     eval() 对字符串求值
  //     ex:
          eval('{foo: 123}') // 123
          eval('({foo: 123  })') // {foo: 123}
  // 8.函数
  //   三种申明函数的方法
  //     function命令
        function print(){}
      // 函数表达式
        var print1=function(){}
      // Funtion构造函数
        var print2=new Function('x','y','return x+y')
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
        function countf(a){
          return function(){
              return a++;
          }
        }
        var count=countf(0);
        count();//0
        count();//1  // 立即调用的函数表达式（IIFE）
        count();//2
        count();//3

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
        var f1=function f1(){}();
        (function(){}());
        (function(){})();
        (()=>{})();
  // 9.数组:按次序排列的一组值
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
}
// 三、运算符
{
//     + - * / ++ -- +x -x  %  **(指数)
    // 1.加法：
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
    //2. 余数：正负号由第一个运算子决定
        -3%2;//-1
        3%-2;//1

    // 3.指数：右结合
          2**3**2;//512

    // 4.严格相等：===  和==
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

    // 5.相等运算
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

      // 6.布尔运算符
      //   !  ||  &&  （非  或  与）

      // 7.二进制运算符
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

      // 8.void运算符:浏览器书签作用；超链接中插入代码，防止网页跳转
          void 0;//undefined
          void(0);  //undefined
      // 9.优先级
          // () :把表达式放到圆括号中，提升优先级；在函数后面，调用函数
}
// 四、语法专题
{
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

    // 2.自动转化
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

    // 3.Error实例对象
    //     message:错误提示信息
    //     name:错误名称（非标准属性）
    //     stack:错误堆栈（非标准属性）
            var err=new Error("出错了");
            // err.message();//出错了

            function throwit(){
              // throw new Error("出错了")
            }
            function catchit(){
                try{
                    throwit()
                }catch(err){
                    console.log(err.stack)
                }
            }
            catchit()

        // 原生错误类型
        //     SyntaxError:语法错误
        //       console.log "helle");
        //     ReferenceError:引用不存在的变量；或将一个值赋值给无法赋值的变量
        //       uasdfjsajh；
        //       console.log()=1;
        //     RangeError:超出范围
        //       new Array(-1);//数组长度不能为负
        //     TypeError：变量或者参数类型错误
        //       new err;
        //     URIError:URI相关函数参数不正确
        //       encodeURI(),decodeURI(),encodeURIComponent(),decodeURIComponebt(),escape(),unescape()
            // EvalError:函数未被正确执行

        // 自定义错误
            class UserError extends Error{
              id;
              constructor(id,msg){
                super(msg);
                this.id=id;
                this.name="UserError"
              }
              a=()=>{
                console.log(this.name);
                console.log(this.message)
              }
            }
            try{
              throw new UserError(12,"出错了")
            }catch(err){
              if(err instanceof UserError){
                  err.a();
                  console.log(err.id+" user error")
                }else{
                  console.log('not user error')
                }
            }finally{
              console.log("finally")
            }

        // throw:手动中断程序执行，抛出一个错误
            // throw new Error("出错了");
            // throw 42;
            // throw {
            //   toString:function(){
            //     return "error"
            //   }
            // }
        // try...catch:对错误进行处理，选择是否往下执行
        // finally:不管是否出现错误，都会执行；当try...catch中出现return，都会执行
            // openFile();
            // try{
            //  writeFile(data);
            // }catch(err){
            //   handleError(err);
            // }
            // finally{
            //   closeFile("finally");
            // }

            var f2=function () {
              try {
                console.log(0);
                throw 'bug';
              } catch(e) {
                console.log(1);
                return true; // 这句原本会延迟到 finally 代码块结束再执行
                console.log(2); // 不会运行
              } finally {
                console.log(3);
                return false; // 这句会覆盖掉前面那句 return
                console.log(4); // 不会运行
              }

              console.log(5); // 不会运行
            }

            f2();
            //0
            //1
            //3
            //false

    // 4.编码风格：
    //   缩进：使用tab
    //   区块:大括号
    //   圆括号：调用函数，定义函数，函数名与左括号没有空格；其他情况，语法元素与左括号见有间隔
          function f(){};
          f();
          return (1*3);
      // 行尾的分号：不要省略
      // 全局变量：大写
      // 变量申明：变量申明写在代码头部
      // with:不要用
      // ==和===：使用===
      // 语句合并：不要将不同的语句合并
      // 自增自减：使用+=  -=
      // switch...case:对象结构代替
          function doAction(action){
            switch(action){
              case "one":
                return "one";
              case "tow":
                return "two";
              default:
                return "none";
            }
          }
          doAction("one");

          var action ="one"
          var actionObj={
            "one":function(){
              return "one";
            },
            "two":function(){
              return "tow";
            }
          }
          if(typeof actionObj[action] !== "function"){
            throw new Error("Invalid action");
          }
          return actionObj[action];

    // 5.console对象与控制台
    //     console：调试程序，显示网页代码运行时的错误信息；
    //              提供命令行接口，与网页代码互动
    //         静态方法
                console.log();
                console.info();
                console.debug();
                console.warn();
                console.error();
                console.table([
                  { name: "JavaScript", fileExtension: ".js" },
                  { name: "TypeScript", fileExtension: ".ts" },
                  { name: "CoffeeScript", fileExtension: ".coffee" }
                ]);
                console.count("字符串参数作为表签");
                console.dir(document.body);//对一个对象检查
                console.dirxml(document.body);//以目录树的结构显示dom节点,不是dom节点，与dir一样
                console.log(false,"判断条件不成立")
                  try{
                    if(false){
                      throw new Error("判断条件不成立")
                    }
                  }catch(e){
                    console.log(e)
                  }
                console.time();
                console.timeEnd();//计时，算出一个操作所需花费的正确时间
                console.group('一级分组');
                console.log('一级分组的内容');
                console.group('二级分组');
                console.log('二级分组的内容');
                console.groupEnd(); // 二级分组结束
                console.groupEnd(); // 一级分组结束
                console.trace();//当前执行的代码在堆栈中的调用路径
                console.clear();//清除当前控制台的所有输出

        // debugger:除错，打断点
}
// 五、标准库
{
    //1. Object对象
        //本身的方法:定义在Object对象上单方法
            Object.print=function(){}
        // Object实例方法:定义在Object原型Object.prototype上的方法
            Object.prototype.print=function(){console.log("hello world")}
            var obj=new Object();
            obj.print();//hello world

        // Object():将任意值转为对象；参数为空（undefined或者null），返回一个空对象
            var obj=new Object();
            //等同于
            var obj=new Object(undefined);
            var obj=new Object(null);
            obj instanceof Object;//true
            // 原始类型：原始类型对应的包装对象
                  var obj=new Object(1);//{1}
                  var objBlo=new Object(true);//{true}
                  obj instanceof Object;//true
                  obj instanceof Number;//true
                  objBlo instanceof Object;//true
                  objBlo instanceof Boolean;//true
            // 参数为一个对象，返回该对象，即不用转换
                  var arr=[];
                  var obj=new Object(arr);//[]
                  arr===obj;//true
                  // 判断一个变量
                  function isObject(value){
                    return value===Object(value);
                  }
                  isObject([]);//true
                  isObject({});//true
                  isObject(false);//false

        // Object构造函数
            var obj = new OBject();
            var obj= {};//等价

        // Object静态方法：自身的方法
            var obj={p1:123,p2:345};
            Object.keys(obj);//['p1','p2']  遍历对象的属性名
            Object.getOwnPropertyNames(obj);//['p1','p2']//遍历对象自身的属性名
            // 其他方法
            // 对象属性模型
            //     Object.getOwnPropertyDescriptor():获取某个属性的描述对象
            //     Object.definedProperty():通过描述对象，定义某个属性
            //     Object.definedProperties():通过描述对象，定义多个属性
            // 控制对象状态的方法
            //     Object.preventExtensions()：防止对象扩展。
            //     Object.isExtensible()：判断对象是否可扩展。
            //     Object.seal()：禁止对象配置。
            //     Object.isSealed()：判断一个对象是否可配置。
            //     Object.freeze()：冻结一个对象。
            //     Object.isFrozen()：判断一个对象是否被冻结。
            // 原型链相关方法
            //     Object.create():指定原型对象的属性和属性，返回一个新的对象
            //     Object.getPrototypeOf():获取对象的prototype对象

        // Object实例方法：定义在Object.protorype对象的方法
        //     Object.prototype.valueOf()：返回当前对象对应的值,默认对象本身
                  var obj=new Object();
                  obj.valueOf()===obj;//true
                  1+obj;//"1[object Object]"
                  obj.valueOf=function(){
                    return 2;
                  }
                  1+obj;//3

            // Object.prototype.toString()：返回当前对象对应的字符串形式
                  var obj=new Object()
                  obj.toString();//"[object Object]"

                  var obj1={a:1};
                  obj1.toString();//"[object Object]"

                  obj.toString=function(){
                    return "hello"
                  }
                  obj+" "+'world';//'hello world'

                  // 数组、字符串、函数、Date 对象都分别部署了自定义的toString方法，覆盖了Object.prototype.toString方法
                    ({a:1}).toString();//'[object Object]'
                    [1,2,3].toString();//'1,2,3'
                    "123".toString();//'123'
                    (function (){return 123;}).toString();//'function (){return 123;}'
                    (new Date()).toString();// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"

                  // 判断数据类型：Object.prototype.toString.call(value) 返回对象的类型字符串
                    Object.prototype.toString.call(2) // "[object Number]"
                    Object.prototype.toString.call('') // "[object String]"
                    Object.prototype.toString.call(true) // "[object Boolean]"
                    Object.prototype.toString.call(undefined) // "[object Undefined]"
                    Object.prototype.toString.call(null) // "[object Null]"
                    Object.prototype.toString.call(Math) // "[object Math]"
                    Object.prototype.toString.call({}) // "[object Object]"
                    Object.prototype.toString.call([]) // "[object Array]"

                    function type(value){
                      var str=Object.prototype.toString.call(value);
                      return str.match(/\[object (.*?)\]/)[1].toLowerCase();
                    }
                    type([]);//"array"
                    type({});//"object"
                    type();//"undefined"
                    type(/abc/);//"regex"
                    type(new Date());//"date"

            // Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式。
                // 与toString()返回结果相同；不同对象实现自己版本，用来返回某些地区特定的值
                var obj={};
                obj.toString();//"[object Object]"
                obj.toLocaleString();//"[object Object]"

                var person={
                  toString:function(){
                    return "Henry Norman Bethune"
                  },
                  toLocaleString:function(){
                    return "白求恩"
                  }
                }
                person.toString();//'Henry Norman Bethune'
                person.toLocaleString();//'白求恩'
                // 三个对象定义了toLocaleString:
                  Array.toLocaleString();
                  Number.toLocaleString();
                  Date.toLocaleString();

            // Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性(true)，还是继承自原型对象的属性。
                var obj={p:1};
                obj.hasOwnProperty('p');  //true
                obj.hasOwnProperty('toString');  //false

            // Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型。
            // Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举。

    // 2.属性描述对象
        /*元属性：{
          value:属性值，默认undefined，
          writable:布尔值，是否可以改变，默认true，
          enumerable:布尔值，是否可遍历，默认true，
          configurable:布尔值，是否可配置，默认true，
          get:取值函数，默认undefined,
          set:存值函数，默认undefined
        }*/

        // Object.getOwnPropertyDescriptor(目标对象，字符串（对应目标对象的属性名）)
        // 获取属性描述对象,只用于自身属性
              var obj={p:1};
              Object.getOwnPropertyDescriptor(obj,'p');
              /*Object {
                  value:1,
                  writable:true,
                  enumerable:true,
                  configurable:true
              }*/
              Object.getOwnPropertyDescriptor(obj,'toString');
              //undefined  toString继承属性，无法获取

        // Object.getOwnPropertyNames():返回自身全部属性名,不管该属性是否可以遍历
            var obj = Object.defineProperties({}, {
              p1: { value: 1, enumerable: true },
              p2: { value: 2, enumerable: false }
            });
            Object.getOwnPropertyNames(obj)
            // ["p1", "p2"]

            // Object.keys()与Object.getOwnPropertyNames()
                Object.keys([]) // []
                Object.getOwnPropertyNames([]) // [ 'length' ]

                Object.keys(Object.prototype) // []
                Object.getOwnPropertyNames(Object.prototype)
                // ['hasOwnProperty',
                //  'valueOf',
                //  'constructor',
                //  'toLocaleString',
                //  'isPrototypeOf',
                //  'propertyIsEnumerable',
                //  'toString']


}








