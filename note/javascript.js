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

        // Object.defineProperty(object,propertyName,attributesObject)
        // 通过属性描述对象，定义或修改一个属性，然后返回修改后的对象
                // object:属性所在对象
                // propertyName:属性名
                // attributesObject：属性描述对象
                var obj = Object.defineProperty({}, 'p', {
                  value: 123,
                  writable: false,
                  enumerable: true,
                  configurable: false
                });
                obj.p // 123
                obj.p = 246;
                obj.p // 123  writable为false,不可修改

          // Object.defineProperties():一次定义或修改多个属性
                  var objDefine=Object.defineProperties({},{
                    p1:{value:123,enumerable:true},
                    p2:{value:"345",enumerable:false},
                    p3:{writeable:true,enumerable:true,fonfigurable:false,get:function(){
                      return this.p1+this.p2;
                    }},
                    //设置了get（或者set）属性，则不能设置value，也不能将writable设置为true
                  })
                  objDefine.p1;//123
                  objDefine.p2;//'345'
                  objDefine.p3;//'123345'

                  var obj = {};
                  Object.defineProperty(obj, 'foo', {});
                  Object.getOwnPropertyDescriptor(obj, 'foo')
                  // {
                  //   value: undefined,
                  //   writable: false,
                  //   enumerable: false,
                  //   configurable: false
                  // }  定义obj.foo用了一个空的属性描述对象，各个元属性默认值

          // Object.pototype.propertyIsEnumerable():判断某个属性是否能遍历，判断自身属性，继承返回false
                    var obj={};
                    obj.p1=123;
                    obj.propertyIsEnumerable('p1');//true
                    obj.propertyIsEnumerable('toString');//false

          // //元属性
          //     value:目标属性的值
          //     writable:目标属性的值是否可以改变
                  var obj = {};
                  Object.defineProperty(obj, 'a', {
                    value: 37,
                    writable: false
                  });
                  obj.a // 37
                  obj.a = 25;
                  obj.a // 37

                  // 规避方法，通过覆盖属性描述对象，绕过这个限制;原型链会被完全忽略
                    var obj=defineProperty({},'foo',{
                      value:"a",
                      writable:false
                    })
                    var obj1=Object.create(obj);
                    Object.defineProperty(obj1,'foo',{value:"b"})
                    obj1.foo;//'b'

              // enumerable:是否可遍历
              //       false:for...in  Object.keys(),JSON.stringify()  不能取到该属性
                    var obj=Object.defineProperty({},"x",{value:11,enumerable:false})
                    for (let key in obj){  //遍历包括继承属性
                      console.log(key);
                    }
                    //undefined
                    Object.keys(obj);//[]  不包括继承属性
                    JSON.stringify(obj);//'{}'

              // configurable：是否可以修改属性描述对象
              //       为false:则writable,enumerable，configurable都不能修改
              //       writable为false，改true报错；由true改为false允许
                          var obj = Object.defineProperty({}, 'p', {
                            writable: true,
                            configurable: false
                          });

                          Object.defineProperty(obj, 'p', {writable: false});//修改成功
              //       value：writable或者configurable为true时就能改
                          var o1 = Object.defineProperty({}, 'p', {
                            value: 1,
                            writable: true,
                            configurable: false
                          });
                          Object.defineProperty(o1, 'p', {value: 2})
                          // 修改成功

                          var o2 = Object.defineProperty({}, 'p', {
                            value: 1,
                            writable: false,
                            configurable: true
                          });
                          Object.defineProperty(o2, 'p', {value: 2})
                          // 修改成功

                      // writable为false，修改value的值不会报错，值也不变;严格模式会报错
                          var obj=Object.defineProperty({},'p',{
                            value:1,
                            writable:false,
                            configurable:false
                          })
                          obj.p=334;
                          obj.p;//1

              // configurable决定目标属性是否可删除
                          var obj=Object.defineProperties({},{
                            p1:{
                              value:1,
                              configurable:false
                            },
                            p2:{
                              value:345,
                              configurable:true
                            }
                          })
                          delete obj.p1;//false
                          delete obj.p2;//true
                          obj;//{p1:1}

              // 存取器：get set
                      var obj=Object.defineProperty({},'p',{})
                      undefined
                      var obj=Object.defineProperty({},'p',{
                          get:function(){
                              return "getter";
                          },
                          set:function (value){
                              console.log("setter: "+value)
                          }
                      })
                      obj.p;//'getter'
                      obj.p=123;//'setter: 123'
                      // 写法一 writable 和enumerable都是false

                      // 写法二：writable 和enumerable都是true
                      // get 不接受参数，set接受一个参数
                        var obj={
                          get p(){
                            return "getter";
                          },
                          set p(value){
                            console.log("setter: "+value)
                          }
                        }

                      // 属性的值依赖对象内部数据
                          var obj={
                            $x:3,
                            get next(){return this.$x++},
                            set next(n){
                                if(n>=this.$x){
                                    this.$x=n;
                                }else{
                                    throw new Error("新的值必须大于当前值")
                                }
                            }
                        }
                        obj.next;//3
                        obj.next=10;//10
                        obj.next;//10
                        obj.next=5;// Uncaught Error: 新的值必须大于当前值


              // 对象拷贝
                    // for...in:包括继承属性，如果遇到存取器定义的属性，只会拷贝值
                    // 使用Object.defineProperty拷贝，使用HansOwnProperty过滤继承属性
                    function extend(from,to){
                      for(let property in from){
                        if(!from.hasOwnProperty(property)){
                            Object.defineProperty(
                              to,
                              property,
                              Object.getOwnPropertyDescriptor(from,property)
                              )
                        }
                      }
                    }
                    return to;

              // 控制对象：冻结对象读写状态 preventExtensions,seal freeze(越来越强↓)
                    // Object.preventExtensions():使一个对象无法添加新的属性
                    // Object.isExtensible():检查是否使用了Object.preventExtensions()方法
                        var obj={}
                        Object.isExtensible(obj) // true
                        Object.preventExtensions(obj)
                        Object.isExtensible(obj) // false
                        Object.defineProperty(obj,'p',{value:1})//TypeError
                        obj.p1=123;
                        obj.p;//undefined


                    // Object.seal():无法添加新属性，也无法删除旧属性,并不影响修改属性值
                    // Object.isSealed():检查是否使用了Object.seal()方法
                    // 使用了Object.seal(),Object.isExtensible()为false
                        var obj={
                          p1:123,
                          p2:345
                        }
                        Object.isSealed(obj);//false
                        Object.seal(obj);
                        Object.isSealed(obj);//true
                        Object.isExtensible(obj);//false
                        delete obj.p1;//false  无法删除
                        obj.p3=12344;
                        obj;//{p1:123,p2:345}  无法新增
                        obj.p2=567;
                        obj;//{p1:123,p2:567}  可以修改属性值

                    // Object.freeze():无法添加新属性，无法删除旧属性，无法修改属性值；变成了常亮
                    // Object.isFrozen():检查是否使用了Object.freeze()方法
                    // 使用了Object.isExtensible()为false,Object.isSealed()true
                          var obj={p1:123}
                          Object.isFrozen(obj);//false
                          Object.freeze(obj);
                          Object.isFrozen(obj);//true
                          Object.isSealed(obj);//true
                          Object.isExtensible(obj);//false
                          obj.p2=345;
                          obj;//{p1:123}
                          delete obj.p1;//false
                          obj.p1=456;
                          obj;//{p1:123}

                        // 判断对象是否冻结，如果没有，可以对其赋值，不会报错

                 // 局限性：以上三个锁定方法有一个漏洞，可以通过改变原型对象，来为对象新增属性
                //  Object.getPrototypeOf()：获取对象的原型(prototype)对象
                      var obj = new Object();
                      Object.freeze(obj);
                      var proto = Object.getPrototypeOf(obj);
                      proto.t = 'hello';
                      obj.t;// hello

                      // 解决方法：冻结原型
                          var proto = Object.getPrototypeOf(obj);
                          Object.freeze(proto)

                  //另一个局限性
                      var obj={
                          p1:1,
                          p2:['a','b']
                      }
                      Object.freeze(obj)
                      obj.p2.push("c");
                      obj;//{p1:1,p2:['a','b','c']}
                      // obj.p2属性指向一个数组，obj对象被冻结以后，这个指向无法改变，
                      // 即无法指向其他值，但是所指向的数组是可以改变的

    //3.Array对象
        // 构造方法 new Array() 不同参数会导致不一样的行为
            new Array(1);//[empty*1]
            new Array(3);//[empty*3]
            new Array(1.1);//RangeError
            new Array(1,2,3);//[1,2,3]
            new Array([1]);//[Array[1]] [[1]]
            new Array('abc');//['acb']
            new Array('a','b','c');//['acb']
            // 直接使用数组字面量
            var arr=[1,2]

            // new 生成的空数组，键名为空；数组字面量键名有值
            var a = new Array(3);
            var b = [undefined, undefined, undefined];
            a.length // 3
            b.length // 3
            a[0] // undefined
            b[0] // undefined
            0 in a // false
            0 in b // true

        //静态方发
            // Array.isArray():是否为一个数组，弥补typeof运算符的不足
            var arr=[1,2,3];
            typeof arr;//'object'
            Object.isArray(arr);//true

        //实例方法
            //valueOf():返回数组本身
            //toString():返回数组的字符串形式
                var arr=[1,2,3];
                var arr1=[1,2,3,[4,5,6]];
                arr.valueOf();//[1,2,3]
                arr.toString();//'1,2,3'
                arr1.toString();//'1,2,3,4,5,6'

            // 后进先出：push，pop
            // push():数组末端添加一个或多个元素，并返回新数组的长度；会改变原数组
            // pop():push：删除数组最后一个元素，并返回该元素；会改变原数组
                var arr=[];
                arr.push(1);//1
                arr.push('a',true,'c');//4
                arr.pop();//'c'
                [].pop();//undefined

            // 先进先出：shift unshift
            // shift():删除数组第一个元素，并返回该元素；会改变数组
            // unshift(): 在数组第一个为添加新的元素，并返回新数组的长度；会改变原数组
                  var arr=[1,2];
                  arr.shift();//1
                  arr.unshift(3);//2
                  arr;//[2,2]
                  arr.unshift(3,4);//4
                  arr;//[3,4,2,2]

            // join():指定参数分隔符，将所有数组成员连接成字符串返回；不提供，默认逗号隔开
                // 成员是undefined或者null或者空位，会被转为空字符串
                // 通过call的方法，也可以用于字符或类似数组的对象
                    var arr=[1,2,3];
                    arr.join();//'1,2,3'
                    arr.join('#');//'1#2#3'
                    [undefined,null,null].join();//',,'
                    ['a',,'b'].join();//'a,,b'

                    Array.prototype.join.call('hello','-');//'h-e-l-l-o'
                    Array.prototype.join.call({0:'a',1:'b',length:2},'-');//'a-b'

            // concat():多个数组合并；返回新的数组，原数组不变
                [1,2,3].concat([4,5,6],[7,8]);//[1,2,3,4,5,6,7,8]
                [2].concat({a:1});//[2,{a:1}]

                // 浅拷贝：新数组拷贝的是对象的引用；原对象改变新数组也跟着改变
                var obj={a:1}
                var arr=[].concat(obj);[{a:1}]
                obj.a=2;
                arr[0];//{a:2}

            // reverse():用于颠倒排列数组元素；返回新数组，改变原数组
                  var arr=[1,2,3,4];
                  arr.reverse();//[4,3,2,1]

            // slice():提取目标数组的一部分，返回新数组；不改变原数组
                  // slice(start，end):从0开始，如果end省略，默认到最后一个成员
                  var arr=[1,2,3]
                  arr.slice(1);//[2,3]
                  arr.slice(0,1);//[1,2]
                  arr.slice(-2,-1);//[2]
                  // 注：第一个参数大于等于数组长度，或者第二个参数小于第一个参数，返回空数组
                  arr.slice(3);//[]
                  arr.slice(-2,-1);//[2]
                  arr.slice(-2,-2);//[]
                  arr.slice(-2,-3);//[]
                  // 类数组转为真正的数组;
                  Array.prototype.slice.call({0:'a',1:'b',length:2});//[1,2]

            // splice():删除原数组的一部分成员，并可以在删除的位置添加新成员；返回删除的数组；会改变原数组
                //splice(start,count,addElement1,assElement2,...)
                var arr=['a','b','c','d','e','f'] ;//假设以下splice操作不改变arr
                arr.splice(2,3);//['c','d','e']
                arr.splice(1,3,'h','y');//['b','c','d']
                arr;//['a'，'h','y','e','f']
                arr.splice(-4,3);//['c','d','e']
                arr.splice(2,0,'h');//['a','b','h','c','d','e','f']
                // 注：添加的新元素在起始元素之前

            // sort():对数组成员排序,按字典顺序排序;会改变原数组
                var arr=[3,4,1,2];
                arr.sort();//[1,2,3,4]
                // sort参数是一个函数
                [2,3,1,4].sort((a,b)=>{
                  return a-b;
                });//[1,2,3,4]
                // 两个数比较，返回值大于0，第一个数排在第二个后面

            // map():将数组所有成员依次传入函数，把每次执行的结果组成一个新数组返回
                var arr=['a','b','c']
                arr.map((elem,index,arr)=>{
                  console.log(elem);//0  1  2
                  console.log(index);//'a'   'b'  'c'
                });
                arr.map(function (n){
                  return n+"1";
                });//['a1','b1','c1']

                // 接受第二个参数，用来绑定回调内部的this变量
                [1,2].map((e)=>{
                  return this[e]
                },arr);//['b','c']

                // map()遇到undefined和null不会跳过，回跳过空位
                    [1,undefined,null,,1].map(()=>{
                      return "a"
                    });//['a','a','a',,'a']

            // forEach():与map()很相似，但是不返回值
                function log(elem,index,arr){
                  console.log("["+index+"]="+elem)
                }
                ['a','b'].forEach(log);
                //[0]='a'
                //[1]='b'

                // 接受第二个参数，绑定参数函数的this变量
                var out=[];
                [1,2,3].forEach((elem)=>{
                  return this.push(elem*elem)
                },out)
                out;//[1,4,9]  this指向out

                // forEach做不到中断，中断使用for
                var arr = [1, 2, 3];
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i] === 2) break;
                  console.log(arr[i]);
                }

                // forEach()遇到undefined和null不会跳过，回跳过空位
                [1,undefined,null,,1].forEach(()=>{
                  console.log("a")
                });// 'a'  'a'  'a'  'a'

            // filter():过滤数组成员，返回新数组；不会改变原函数
                var arr=[1,2,3,4]
                arr.filter(function(e){return e>3});//[4]
                [1,'a',undefined,false].filter(Boolean);//[1,'a']
                [1,2,3].filter((elem,index,arr)=>{
                  return index%2===0;
                });//[1,3]  返回偶数为成员

                // 接受第二个参数，绑定参数函数内部this
                var obj={MAX:3};
                var myFilter=function(e){
                  if(e>this.MAX)return true;
                };
                [1,2,3,4,5].filter(myFilter,obj);//[4,5]

            // some(),every():判断成员是否符合条件，返回布尔值
                // some()接受三个参数，当前成员，当前位置，整个数组
                // some()只要有一个成员为true，整个some方法返回true
                    var arr=[1,2,3,4,5];
                    arr.some((elem,index,arr)=>{
                        return elem>3
                    });//true

                // every():所有成员返回true，整个every才会返回true，否则false
                    var arr=[1,2,3,4,5];
                    arr.every((elem,index,arr)=>{
                        return elem>3
                    });//false

                // 空数组，some返回false,every返回true，回调函数不会执行
                // some(),every()接受第二个参数，用来绑定参数函数内部的this变量

            // reduce(),reduceRight(): 依次处理数组的每一个成员，最终累计为一个值
                // reduce()从左到右执行（从第一个到最后一个成员）
                // reduceRight()从右到左执行（从第最后一个到第一个成员）
                [1, 2, 3, 4, 5].reduce(function (a, b) {
                  console.log(a, b);
                  return a + b;
                });//15
                //1+2
                // 3+3
                // 6+4
                // 10+5

                // reduce()和reduceRight()两个参数，第一个函数接受四个参数
                [1, 2, 3, 4, 5].reduce(function (
                  a,   // 累积变量，必须
                  b,   // 当前变量，必须
                  i,   // 当前位置，可选
                  arr  // 原数组，可选
                ) {}

                // 第二个参数：指定积累变量初始值；建议加上，可以防止空数组报错
                [1, 2, 3, 4, 5].reduce(function (a, b) {
                  return a + b;
                }, 10));
                // 25
                // 找出字符串最长的数组成员
                  var arr=["aaa",'aa','a'];
                  arr.reduce((a,b)=>{
                    return a.length>b.length?a:b;
                  })

            // indexOf(),lastIndexOf():返回元素在数组中第一次（最后一次）出现的位置，没找到返回-1
                // indexOf()还接受第二个参数，表示搜索开始的位置
                var arr=['a','b','c','d','a','c'];
                arr.indexOf("b");//1
                arr.indexOf("b",1);//-1
                arr.lastIndexOf("a");//4
                [NaN].indexOf(NaN);//-1
                [NaN].lastIndexOf(NaN);//-1
                // 两个方法使用严格相等（===）比较
                // NaN是唯一一个不等于自身的值

            // 链式使用
                var users = [
                  {name: 'tom', email: 'tom@example.com'},
                  {name: 'peter', email: 'peter@example.com'}
                ];
                users
                .map(function (user) {
                  return user.email;
                })
                .filter(function (email) {
                  return /^t/.test(email);
                })
                .forEach(function (email) {
                  console.log(email);
                });
                // "tom@example.com"

    //4.包装对象
        // 定义：三种原始类型（数字，字符串，布尔值）在一定条件下，转为对象：原始类型的包装对象
        // 分别对应 Number String Boolean
            var v1=new Number(123);
            var v2=new String("abc");
            var v2=new Boolean(true);
            typeof v1;//'object';
            v1===123;//false
            // 带new时，将原始类型转为对象
            // 不带new时，将任意类型的值转为原始类型的值

        // 实例方法
            // valueOf(),toString()
                new Number(123).valueOf()  // 123
                new String('abc').valueOf() // "abc"
                new Boolean(true).valueOf() // true
                new Number(123).toString() // "123"
                new String('abc').toString() // "abc"
                new Boolean(true).toString() // "true"

        // 原始类型与实例对象的自动转换
            'abc'.length;//3
            // 'abc'不是对象，不能调用length属性；
            // JavaScript引擎自动转换为包装对象，在对象上调用length属性，调用结束，临时对象销毁
            // 自动转换生成的包装对象是只读的，无法修改。
                var s = 'Hello World';
                s.x = 123;
                s.x // undefined
            // 如果要为字符串类型添加属性，只能在原型对象String.prototype上定义

        // 自定义方法
            // 包装对象可以自定义属性和方法，供原始类型的值直接调用
            String.prototype.doble=function(){
                return this.valueOf()+this.valueOf()
            }
            'abc'.doble();//'abcabc'
            Number.prototype.doble=function(){
              return this.valueOf()+this.valueOf()
            };
            (123).doble();//246

    //5.Boolean对象
        // 三个包装对象之一，作用：生成布尔值的包装对象实例
            var b=new Boolean(true);
            typeof b;//'object'
            b.valueOf();//true
            // false 包装的对象实例，运行结果为true
            if(new Boolean(false)){
              console.log("true")
            };//"true"
            if(new Boolean(false).valueOf()){
              console.log("true")
            };//无输出

        // Boolean函数类型转换,除了一下都为true
            Boolean("");//false
            Boolean(undefined);//false
            Boolean(null);//false
            Boolean(NaN);//false
            Boolean(0);//false
            // 双重否（!）运算也可以将任意值转为布尔值
            !!undefined // false
            !!null // false
            !!0 // false
            !!'' // false
            !!NaN // false

    //6.Number对象
        // 包装对象；构造函数；工具函数
          var n=Number(1);
          typeof n;//'object'
          Number(true);//1

        // 静态属性
            Number.POSITIVE_INFINITY:正的无限，infinity
            Number.NEGATIVE_INFINITY:负的无限，-infinity
            Number.MAX_VALUE:最大的正数
            Number.MIN_VALUE：最小的正数
            Number.MAX_SAFE_INTEGER：最大的整数
            Number.MIN_SAFE_INTEGER：最小的整数
            Number.NaN：非数值，指向NaN

        // 实例方法
            // Number.prototype.toString():将数值转为字符串
                // toString()接受一个参数，表示输出的进制
                // toString()只能将十进制转数转为其他进制的字符串
                    (10).toString();//'10'
                    (10).toString(2);//'1010'
                    (10).toString(8);//'12'

            // Number.prototype.toFixed():将一个数转为指定位数的小数，然后返回该小数的字符串


    //7.String对象

    //8.Math对象
    //9.Date对象
    //10.Regex对象
    //11.Json对象

}







