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
          // eval('{foo: 123}') // 123
          // eval('({foo: 123  })') // {foo: 123}
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
          {function doAction(action){
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
        }
          var action ="one";
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
                var arr=[].concat(obj);//[{a:1}]
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
            // Number.POSITIVE_INFINITY:正的无限，infinity
            // Number.NEGATIVE_INFINITY:负的无限，-infinity
            // Number.MAX_VALUE:最大的正数
            // Number.MIN_VALUE：最小的正数
            // Number.MAX_SAFE_INTEGER：最大的整数
            // Number.MIN_SAFE_INTEGER：最小的整数
            // Number.NaN：非数值，指向NaN

        // 实例方法
            // Number.prototype.toString():将数值转为字符串
                // toString()接受一个参数，表示输出的进制
                // toString()只能将十进制转数转为其他进制的字符串
                    (10).toString();//'10'
                    (10).toString(2);//'1010'
                    (10).toString(8);//'12'

            // Number.prototype.toFixed():将一个数转为指定位数的小数，然后返回该小数的字符串
                (10).toFixed(2) // "10.00"  10必须在括号里，否则后面的点会被处理成小数点
                10.005.toFixed(2) // "10.01"
                // 由于浮点数的原因，小数5的四舍五入不确定，使用是必须小心
                (10.055).toFixed(2) // 10.05
                (10.005).toFixed(2) // 10.01

            // Number.prototype.toExponentail():将一个数转为科学计数形式
                // 参数是小数点后有效数字的位数，范围为0到100
                (10).toExponential();//"1e+1"
                (10).toExponential(1);//"1.0e+1"
                (10).toExponential(2);//"1.00e+1"
                (1234).toExponential();//"1.234e+3"
                (1234).toExponential(1);//"1.2e+3"
                (1234).toExponential(2);//"1.23e+3"
                (1234).toExponential(3);//"1.234e+3"

            // Number.prototype.toPrecision():将一个数转为指定位数的有效数字
            // 该方法的参数为有效数字的位数，范围是1到100，超出这个范围会抛出 RangeError 错误。
                (12.34).toPrecision(1) // "1e+1"
                (12.34).toPrecision(2) // "12"
                (12.34).toPrecision(3) // "12.3"
                (12.34).toPrecision(4) // "12.34"
                (12.34).toPrecision(5) // "12.340"
                // 该方法用于四舍五入时不太可靠，跟浮点数不是精确储存有关。
                (12.35).toPrecision(3) // "12.3"
                (12.25).toPrecision(3) // "12.3"
                (12.15).toPrecision(3) // "12.2"
                (12.45).toPrecision(3) // "12.4"

            // Number.prototype.toLocaleString()
                // 接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形
                    (123).toLocaleString('zh-Hans-CN-u-nu-hanidec')
                    // "一二三"
                // 接受第二个参数配置对象，用来定制指定用途的返回字符串
                    (123).toLocaleString('zh-Hans-CN', { style: 'percent' })
                    // "12,300%"
                // style属性：
                    // decimal，默认值，表示输出十进制
                    // percent，表示输出百分数
                    // currency，搭配currency属性，输出指定格式的货币字符串形式
                        (123).toLocaleString('zh-Hans-CN', { style: 'currency', currency: 'CNY' })
                        // "￥123.00"
                // 省略了参数，则由浏览器自行决定如何处理，通常会使用操作系统的地区设定
                    (123).toLocaleString('123') // 出错

            // 自定义
                // Number.protorype上定义自定义方法，被Number实例继承
                    Number.prototype.add=function(x){
                      return this+x;
                    }
                    8['add'](2);//10
                    // 链式运算
                    Number.prototype.subtract = function (x) {
                      return this - x;
                    };

                    (8).add(2).subtract(4)
                    // 6
                // 自定方法只能定义在原型对象Number.prototype上，数值本身无法自定义属性
                    var n=1;
                    n.x=2;
                    n.x;//undefined

    //7.String对象
        // 三个包装对象之一，用来生成字符串对象
            var s1 = 'abc';
            var s2 = new String('abc');
            typeof s1 // "string"
            typeof s2 // "object"
            s2.valueOf() // "abc"
            // 字符串对象类似数值对象
              new String('abc')// String {0: "a", 1: "b", 2: "c", length: 3}
              (new String('abc'))[1] // "b"
            // 工具方法使用
                String(true);//'true'
                String(123);//'123'

        // 静态方法
            // String.fromCharCode():参数是一个或多个数组，代表Unicode码点，返回值是码点组成的字符串
                String.fromCharCode() // ""
                String.fromCharCode(97) // "a"
                String.fromCharCode(104, 101, 108, 108, 111)// "hello"

        // 实例属性
            // length:字符串实例放回length属性放回字符串长度
            'abcd'.length;//4

        // 实例方法
            // String.prototype.charAt():返回指定位置的字符，参数从0开始编号
                var s=new String('abc');
                s.charAt(1);//'b'
                s[1];//'b'  可以用下表代替
                s.charAt(-1);//""  参数为负或者大于等于数组长度，返回空字符串

            // String.prototype.charCodeAt():返回字符串指定位置的Unicode码点（十进制）
                // 相当于fromCharCode()逆运算
                'abc'.charCodeAt(1) // 98
                // 没有参数，返回首字母的码点
                'abc'.charCodeAt();//97
                // 参数为负，或大于等于字符串长度，返回NaN
                'abc'.charCodeAt(-1);//NaN
                'abc'.charCodeAt(4);//NaN

            // String.prototype.concat():连接两个字符串，返回一个新的字符串；不改变原字符串
                var s1="abc";
                var s2="asd";
                s1.concat(s2);//'abcasd'
                // 可以接受多个参数
                'a'.concat('b','c');//'abc'
                // concat先转为字符串再连接
                var s1=1;
                var s2=2;
                var s3="3";
                s1.concat(s2,s3);//'123'
                s1+s2+s3;//"33"

            // String.prototype.slice():从元字符串取出字符返回；不改变原数组
                // 第一个参数：开始位置
                // 第二个参数：结束位置（不含该字符串）
                var str="javascript";
                str.slice(0,4);//"java"
                str.slice(4);//"script"
                // 参数为负值：从结尾开始倒数计算的位置，即该负值加上字符串长度
                str.slice(-6);//'script'
                str.slice(0,-6);//'java'
                str.slice(-2,-1);//'p'
                // 第一个参数大于第二个参数（正数），slice返回一个空字符串
                str.slice(2,1);//""

            // String.prototype.substring():从原字符串取出子字符串并返回；不改变原字符串
                // 第一个参数：开始位置
                // 第二个参数：结束位置（不含该位置）
                    var str="javascript";
                    str.substring(0,4);//'java'
                    str.substring(4);//'script'
                // 第一个参数大于第二个参数，自动更换两个参数位置
                    str.substring(4,10);//"script"
                    str.substring(10,4);//"script"
                // 如果参数为负，自动转为0
                    str.substring(-3);//"javascript"
                    str.substring(4,-3);//"java"

            // String.prototype.substr():从原数组取出子字符串并返回；不改变原字符串
                // 第一个参数：开始位置
                // 第二个参数：子字符串的长度
                    var str="javascript";
                    str.substr(4,6);//"script"
                //省略第二个参数，表示从开始位置到结束
                    str.substr(4);//"script"
                // 如果第一个参数为负，表示倒数位计数
                // 如果第二个参数为负，自动转为0，返回空字符串
                    str.substr(-6);//"script"
                    str.substr(4,-2);//""

            // String.prototype.indexOf():一个字符串在另一个字符串中第一次出现的位置，返回出现的位置，不匹配：-1
            // String.prototype.lastIndexOf()：与indexOf一致，区别在于indexOf从头匹配，lastIndexOf从尾部开始匹配
                'hello world'.indexOf("o");//4
                'hello world'.indexOf("a");//-1
                // indexOf()接受第二个参数，表示从该位置向后匹配
                'hello world'.indexOf("o",6);//7
                // lastIndexOf()接受第二个参数，表示从该位置向前匹配
                'hello world'.lastIndexOf("o");//7
                'hello world'.lastIndexOf("o",6);//4

            // String.prototype.trim():去除两端空格，返回新字符串了；不改变原字符串
                // 包括制表符（\t、\v）、换行符（\n）和回车符（\r）
                '  abc  '.trim();//"abc"
                '\r\nabc \t'.trim() // 'abc'

            // String.prototype.toLowerCase(),String.prototype.toUpperCase()
                // toLowerCase()将字符串转为小写字母；不改变原字符串
                // toUpperCase()将字符串转为大写字母；不改变原字符串
                    "JavaScript".toLowerCase();//"javascript"
                    "JavaScript".toUpperCase();//"JAVASCRIPT"

            // String.prototype.match():元字符串是否匹配某子字符串，返回一个数组，匹配的第一个字符串
                // 如果没有匹配，返回null
                // 数组还有index(匹配字符串开始位置),input(原始字符串)属性
                var str="cat bat fat sat";
                var matchStr=str.match("at");//[at]
                matchStr.index;//1
                matchStr.input;//"cat bat fat sat"

            // String.prototype.search():用法基本等同match;返回值为匹配的第一个位置；没找到返回-1
            // String.prototype.replace():用于替换匹配的字符串，一般情况只替换第一个匹配
                'cat, bat, sat, fat'.search('at') // 1
                'aaa'.replace('a', 'b') // "baa"

            // String.prototype.split():按照规则分割字符串，返回分割出来的字符串组成的数组
                    'a|b|c'.split("|");//['a','b','c']
                // 如果参数为空字符串，则返回成员的每一个字符
                    'a|b|c'.split("");//['a','|','b','|','c']
                // 如果省略，数组的唯一成员是原字符串
                    'a|b|c'.split();//['a|b|c']
                // 分割规则紧挨着
                    'a||c'.split("|");//['a',"","c"]
                    '|a|c'.split("|");//['',"a","c"]
                    'a|c|'.split("|");//['a',"c",""]
                // 接受第二个参数，限定返回数组最大成员数
                    'abc'.split("",0);//[]
                    'abc'.split("",3);//['a','b','c']
                    'abc'.split("",4);//['a','b','c']

            // String.prototype.localCompare()：比较两个字符串，返回一个整数
                // 小于0：第一个字符串小于第二个字符串
                // 等于0：第一个字符串等于第二个字符串
                // 大于0：第一个字符串大于第二个字符串
                    'apple'.localeCompare('banana') // -1
                    'apple'.localeCompare('apple') // 0
                // 一般情况下，大写字符小于小写字符
                // JavaScript 采用的是 Unicode 码点比较，B的码点是66，而a的码点是97
                    "B">"a";//false
                // 考虑自然语言的顺序
                    'B'.localeCompare('a') // 1
                // localCompare接受第二个参数，指定所使用的语言（默认英语）
                    'ä'.localeCompare('z', 'de') // -1
                    'ä'.localeCompare('z', 'sv') // 1

    //8.Math对象
        // 静态属性，提供数字常数，只读
            // Math.E：常数e。
            // Math.LN2：2 的自然对数。
            // Math.LN10：10 的自然对数。
            // Math.LOG2E：以 2 为底的e的对数。
            // Math.LOG10E：以 10 为底的e的对数。
            // Math.PI：常数π。
            // Math.SQRT1_2：0.5 的平方根。
            // Math.SQRT2：2 的平方根。

        // 静态方法
            // Math.abs():绝对值
                Math.abs(-1);//1
                Math.abs(1);//1

            // Math.max(),Math.min()
                Math.max(2,-1,5);//5
                Math.min(2,-1,5);//-1
                Math.max();//Infinity
                Math.min();//-Infinity

            // Math.floor(),Math.ceil()
                // Math.floor:返回小于或者等于参数值的最大整数（地板值）
                // Math.ceil:返回大于或者等于参数值的最小整（天花板值）
                      Math.floor(3.2);//3
                      Math.floor(-3.2);//-4
                      Math.ceil(3.2);//4
                      Math.ceil(-3.2);//-3

            //Math.round():用于四舍五入
                Math.round(0.1);//0
                Math.round(0.5);//1
                Math.round(0.6);//1
                // 等同于
                Math.floor(x + 0.5)
                // 对负数的处理（对0.5的处理）
                Math.round(-1.1) // -1
                Math.round(-1.5) // -1
                Math.round(-1.6) // -2

            // Math.pow():第一个参数为底数，第二个参数为指数的幂运算
                Math.pow(2,3);//8  2**3
                // 圆的面积
                var radius=20;
                var area=Math.PI*Math.pow(radius,2);

            // Math.sqrt():平方根
                Math.sqrt(4);//2
                Math.sqrt(-4);//NaN

            // Math.log():返回以e为底的自然对数
                Math.log(Math.E);//1
                Math.log(10);

            // Math.exp():返回常熟e的参数次方
                Math.exp(1)

            // Math.random():返回0-1之间的一个伪随机数；可能等于0，但一定小于1
                Math.random();
                    // 任意范围的随机数生成函数
                    function getRandom(max,min){
                      return Math.random()*(max-min)+min;//随机数
                      // return Math.floor(Math.random()*(max-min+1))+min;//随机整数数
                    }

            // 三角函数
                // Math.sin()：返回参数的正弦（参数为弧度值）
                // Math.cos()：返回参数的余弦（参数为弧度值）
                // Math.tan()：返回参数的正切（参数为弧度值）
                // Math.asin()：返回参数的反正弦（返回值为弧度值）
                // Math.acos()：返回参数的反余弦（返回值为弧度值）
                // Math.atan()：返回参数的反正切（返回值为弧度值）

    //9.Date对象
        // 普通函数,返回的是当前时间；无论有没有参数都返回当前时间
            Date();// "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"

        // 构造函数：使用new命令，会返回一个Date对象的实例
            // 对象求值的时候，调用的是.valueOf();
            //Date实例求值的时候，调用的是.toString();返回字符串，代表该实例对应的时间
                var today=new Date();
                today;//// "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"
                today.toString();//等同
            // 接受多种参数
                // 毫秒
                new Date(1303749723874);
                // 日期字符串
                new Date('january 6,2014');
                // 参数为多个整数
                // 年 月 日 小时 分钟 秒 毫秒
                new Date(2014,0,0,0,0,0);
            // 参数为负表示1970年元旦之前的时间
                new Date(-238327823487);
            // 只要能被Date.parse()解析的字符串，都可以当做参数
                new Date('2013-2-15')
            // 参数为年月日多个整数时，年月不能省略，至少需要两个参数
                new Date(2014);//只有一个参数，被当做毫秒
                new Date(2014,6);
                new Date(2014,6,1);
                new Date(2014,6,1,1);
                new Date(2014,6,1,1,1);
                // 年：四位整数；如果写两位或者各位，则加上1900；如果为负，表示公元前
                // 月：0表示一月；11表示12月
                // 日：1-31
                // 小时：0-23
                // 分钟：0-59
                // 秒：0-59
                // 毫秒：999
            // 如果月份超过正常范围值，则会被折算
                new Date(2013,15);//// Tue Apr 01 2014 00:00:00 GMT+0800 (CST)
                new Date(2013, 0, 0);// Mon Dec 31 2012 00:00:00 GMT+0800 (CST)
                // 日期为0，代表上个月最后一天
            // 参数可以为负，表示扣去的时间
                new Date(2013,-1);// Sat Dec 01 2012

        // 日期的运算
            // Date自动转换类型；Date实例为数值，转为对应的毫秒；如果转为字符串，等于对应的日期字符串
            var date1=new Date(2000,2,1);
            var date2=new Date(2000,3,1);
            date2-date1;//2678400000
            date2+date1;//// "Sat Apr 01 2000 00:00:00 GMT+0800 (CST)Wed Mar 01 2000 00:00:00 GMT+0800 (CST)"

        // 静态方法
            // Date.now():返回当前时间距离时间零点（1970年1月1日 00：00：00）的毫秒数；相当于Unix 时间戳乘以1000。
                Date.now();//82348329472

            // Date.parse():解析日期字符串，返回该时间距离时间零点的毫秒数
                Date.parse("2010-10-1");
                // 如果解析失败，返回NaN
                Date.parse('xxx');//NaN

            // Date.UTC():接受年月日等变量作为参数，返回改时间距离时间零点的毫秒数
                Date.UTC(2011, 0, 1, 2, 3, 4, 567)
                // 1293847384567

        // 实例方法
            // Date实例对象，除了valueOf(),toString()之外
            // to类：从Date对象返回一个字符串，表示指定的时间。
            // get类：获取Date对象的日期和时间。
            // set类：设置Date对象的日期和时间。

            // Date.prototype.valueOf():返回实例对象距离时间零点的毫秒数，等同于getTime
                var d=new Date();
                d.valueOf();//1291873232
                d.getTime();//1291873232
                // 预期为数值的场合，自动调用该方法

            // to类方法
                // Date.prototype.toString():返回一个完整的日期字符串
                    d.toString();//"Tue Jan 01 2013 00:00:00 GMT+0800 (CST)"
                    d;// "Tue Jan 01 2013 00:00:00 GMT+0800 (CST)"

                // Date.prototype.toUTCString():返回UTC时间，比北京时间晚8小时
                    d.toUTCString();// "Mon, 31 Dec 2012 16:00:00 GMT"

                // Date.prototype.toISOString():返回对应时间的iOS8601写法

                // Date.prototype.toJSON():返回json格式的iOS日期字符串，返回值与toIOSString一致

                // Date.prototype.toDateString():返回日期字符串，不包括小时 分 秒

                // Date.prototype.toTimeString():返回时间字符串，不包含年月日

                // 本地时间
                    // Date.prototype.toLocaleString()：完整的本地时间。
                    // Date.prototype.toLocaleDateString()：本地日期（不含小时、分和秒）。
                    // Date.prototype.toLocaleTimeString()：本地时间（不含年月日）。

            // get类方法
                // getTime()：返回实例距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。
                // getDate()：返回实例对象对应每个月的几号（从1开始）。
                // getDay()：返回星期几，星期日为0，星期一为1，以此类推。
                // getFullYear()：返回四位的年份。
                // getMonth()：返回月份（0表示1月，11表示12月）。
                // getHours()：返回小时（0-23）。
                // getMilliseconds()：返回毫秒（0-999）。
                // getMinutes()：返回分钟（0-59）。
                // getSeconds()：返回秒（0-59）。
                // getTimezoneOffset()：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素。

            // set类方法
                // setDate(date)：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳。
                // setFullYear(year [, month, date])：设置四位年份。
                // setHours(hour [, min, sec, ms])：设置小时（0-23）。
                // setMilliseconds(ms)：设置毫秒（0-999）。
                // setMinutes(min [, sec, ms])：设置分钟（0-59）。
                // setMonth(month [, date])：设置月份（0-11）。
                // setSeconds(sec [, ms])：设置秒（0-59）。
                // setTime(milliseconds)：设置毫秒时间戳。


    //10.Regex对象
        // 概述
            // 正则表达式是一种表达文本模式方法， 给定模式匹配文本
            // 第一种使用字面量，以斜杠表示开始结束
                var regex=/abc/;
            // 第二种使用Regexp构造函数;接受第二个参数，表示修饰符
                var regex =new RegExp('abc');
                var regex =new RegExp('abc','i');
                var regex=/abc/i;//等价上面

        // 实例属性：分为两类：
            // 一类修饰符相关，了解设置了什么修饰符,属性只读
                // RegExp.prototype.ignoreCase:返回布尔值，表示是否设置了i修饰符
                // RegExp.prototype.global:返回布尔值，表示是否设置了g修饰符
                // RegExp.prototype.multiline:返回布尔值，表示是否设置了m修饰符
                // RegExp.prototype.flags:返回字符串，包含了已设置的所有修饰符，按字母排序
                    var r=/xyz/igm;
                    r.ignoreCase;//true
                    r.global;//true
                    r.multiline;//true
                    r.flags;//'gim'

            // 一类与修饰符无关
                // RegExp.prototype.lastIndex():返回一个整数，表示下一次开始搜索的位置；可读写
                // RegExp.prototype.source():返回表达式的字符串形式；只读
                    var r=/syz/igm;
                    r.lastIndex;//0
                    r.source;//'syz'

        // 实例方法
            // RegExp.prototype.test():返回布尔值，表示当前模式是否能匹配参数字符串
                  /cat/.test('cats and dogs'); // true
                  // 如果正则表达式带g修饰符，每一次test方法都从上一次结束的位置向后匹配
                      var r = /x/g;
                      var s = '_x_x';

                      r.lastIndex // 0
                      r.test(s) // true

                      r.lastIndex // 2
                      r.test(s) // true

                      r.lastIndex // 4
                      r.test(s) // false
                  // 带g修饰符，表示全局搜索，会有多个结果；通过正则对象的lastIndex属性指定开始搜索的位置
                      r.lastIndex = 4;
                      r.test(s) // false
                  // 如果正则表达式为空，则匹配所有字符串
                      new RegExp("").test('abc');//true

            // RegExp.prototype.exec():返回匹配结果；如果匹配成功，返回一个数组；失败则返回null
                var s="_x_x";
                var r1=/x/;
                var r2=/y/;
                r1.exec(s);//["x"]
                r2.exec(s);//null
                // 组匹配：正则表达式有圆括号，返回的数组成员有多个
                    // 第一个为匹配成功的结果
                    // 第二个成员对应第一个括号
                    // 第三个成员对应第二个括号，以此类推
                    // 数组的length属性等于匹配的数量加1
                    var s="_x_x";
                    var r=/_(x)/;
                    r.exec(s);//["_x","x"]
                // exec()方法返回的数组包括一下两个属性
                    // input整个原字符串
                    // index模式匹配成功的开始位置（从0开始计数）
                    var arr=r.exec(s);
                    arr;//["_x","x"]
                    arr.input;//"_x_x"
                    arr.index;//0
                // 循环完成全部匹配
                    var reg = /a/g;
                    var str = 'abc_abc_abc'

                    while(true) {
                      var match = reg.exec(str);
                      if (!match) break;
                      console.log('#' + match.index + ':' + match[0]);
                    }
                    // #0:a
                    // #4:a
                    // #8:a

        // 字符串实例方法
            // String.prototype.match():返回一个数组，成员为匹配的所有字符串
                var str="_x_x";
                var reg1=/x/;
                var reg2=/y/;
                reg1.match(str);//["x"]
                reg2.match(str);//null
                // 如果正则表达式带g，一次性返回匹配成功的结果
                    var reg=/x/g;
                    reg.match(str);//["x", "x"]
                // 正则表达式设置了lastIndex，对match无效，匹配总是从字符串第一个开始
                    var r = /a|b/g;
                    r.lastIndex = 7;
                    'xaxb'.match(r) // ['a', 'b']
                    r.lastIndex // 0

            // String.prototype.search():返回一个整数，表示匹配开始的位置
                // 如果没有匹配到，返回-1
                '_x_x'.search(/x/);//1

            // String.prototype.replace():按照给定的正则表达式进行替换，返回替换后的字符串
                // 接受两个参数，一个是正则表达式，一个是替换的内容
                    'aaa'.replace('a', 'b') // "baa"
                    'aaa'.replace(/a/, 'b') // "baa"
                    'aaa'.replace(/a/g, 'b') // "bbb"  使用g修饰符，全部a被换掉
                // 去除两端空格
                    var str = '  #id div.class  ';
                    str.replace(/^\s+|\s+$/g, '')
                    // "#id div.class"
                // 第二个参数可以使用$,用来指代所替换的内容
                    // $&:匹配的子字符串
                    // $`:匹配结果前面的字符串
                    // $':匹配结果后面的字符串
                    // $n:匹配成功的第n组内容，n从1开始的自然数
                    // $$:指代美元符号$
                        'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')
                        // "world hello"

                        'abc'.replace('b', '[$`-$&-$\']')
                        // "a[a-b-c]c"
                // 第二个参数可以是函数；将每一个匹配内容替换为函数返回值
                    '3 and 5'.replace(/[0-9]+/g, function (match) {
                      return 2 * match;
                    });// "6 and 10"
                // 第二个参数的函数，接受多个参数
                    var prices={
                      "p1":"￥9.99",
                      "p2":"￥8.88",
                      "p3":"￥6.66",
                    };
                    var template='<div id="p1"></div><div id="p2"></div><div id="p3"></div>';
                    template.replace(/(<div id=")(.*?)(">)(<\/div>)/g,
                    function(match,$1,$2,$3,$4){
                      return $1+$2+$3+prices[$2]+$4;
                  })

            // String.prototype.split():按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员
                // 接受两个参数，第一个正则表达式，第二个返回数组最大成员
                'a, b,c, d'.split(",");//['a',' b','c',' d']
                'a, b,c, d'.split(/, */);//['a','b','c','d']
                'a, b,c, d'.split(/, */,2);//['a','b']
                // 正则默认贪婪匹配
                    'aaa*a*'.split(/a*/);// [ '', '*', '*' ]
                    'aaa**a*'.split(/a*/)// ["", "*", "*", "*"]
                // 如果正则表达式带括号，括号匹配部分也会作为数组成员返回
                    'aaa*a*'.split(/(a*)/);// [ '', 'aaa', '*', 'a', '*' ]

        // 匹配规则
            // 字面量字符和元字符
                // 字面量字符：表示它字面意思
                /dog/.test("old dog");//true

                // 元字符：
                // （1）点字符（.）
                    // 点字符（.）匹配除了回车（/r）、换行（/n）、分隔符（\u2028）、段分隔符（\u2029）以外的所有字符
                    // 大于0xffff字符，点字符不能正确匹配，认为是两个字符
                      /c.t/;//c和t之间包含一个任意字符，字符在同一行
                // （2）位置字符
                    // ^:字符串开始的位置
                    // $:字符串结束的位置
                    /^test/.test("test test");//true
                    /test$/.test("test test");//true
                    /^test$/.test("test");//true
                    /^test$/.test("test test");//false
                // （3）选择符（|）
                    //或（or），即dog|pig，匹配dog或pig
                    /11|22/.test(911);//true
                    /a( |\t)b/.test('a\tb') ;// true

            // 转义符
                // 特殊含义的元字符，需要转义，一共12个
                // ^   .   [   $   (   )   |   *   +   ?   {  \
                /1+1/.test("1+1");//false
                /1\+1/.test("1+1");//true
                // RegExp方法生成正则对象，转义需要两个斜杠，因为字符内部会先转义一次
                (new RegExp(/1\+1/)).test("1+1");//false
                (new RegExp(/1\\+1/)).test("1+1");//true

            // 特殊字符
                // \cX:Ctrl+[X],其中X是A-Z任意字母，用来匹配控制字符
                // [\b]:匹配退格键（U+0008），不要与\b混淆
                //\n 匹配换行键。
                // \r 匹配回车键。
                // \t 匹配制表符 tab（U+0009）。
                // \v 匹配垂直制表符（U+000B）。
                // \f 匹配换页符（U+000C）。
                // \0 匹配null字符（U+0000）。
                // \xhh 匹配一个以两位十六进制数（\x00-\xFF）表示的字符。
                // \uhhhh 匹配一个以四位十六进制数（\u0000-\uFFFF）表示的 Unicode 字符。

            // 字符类
                // 表示有一系列字符可供选择，只要匹配其中一个就可以；所有可供选择的字符在方括号內
                    /[abc]/.test('hello world'); // false
                    /[abc]/.test('apple'); // true
                // 脱字符（^）
                    // 方括号中內的第一个字符是[^],则表达式之中除了字符类的字符串，其他的都可以匹配
                        /[^abc]/.test("apply");//true
                        /[^abc]/.test("abc");//false
                    //如果方括号內没有其他字符，即[^]，表示匹配一切字符，包括换行符
                        var s="PLease ues\nmake my day!";
                        s.match(/yes.*day/);//null
                        s.match(/yes[^]*day/);//null
                    // 脱字符只有在字符类的第一个位置才有意义，否则就是字面含义

                // 连字符（-）
                    // 表示字符连续范围
                    /a-z/.test("b");//false
                    /[a-z]/.test("b");//true
                    // 合法简写
                    // [0-9.,]
                    // [0-9a-fA-F]
                    // [a-zA-Z0-9-]
                    // [1-31]  代表1到3
                    /[A-z]/.test('\\');// true  范围太大，结果意料之外

                // 预定义模式
                    // \d:匹配0-9之间任一数字，相当于[0-9]
                    // \D:匹配0-9以外的字符，相当于[^0-9]
                    // \w:匹配字母、数字、下划线，相当于[0-9a-zA-Z_]
                    // \W:匹配除字母、数字、下划线以外的字符，相当于[^0-9a-zA-Z_]
                    // \s:匹配空格（包括换行符、制表符和空格等），相当于[\n\t\r\v\f]
                    // \S:匹配除了空格（包括换行符、制表符和空格等）以外的字符，相当于[^\n\t\r\v\f]
                    // \b:匹配词的边界
                    // \b:匹配非词的边界，即在词的内部
                        /\s\w*/.exec('hello world'); // [" world"]
                        /\bworld/.test('hello world') ;// true
                        /\bworld/.test('hello-world'); // true
                        /\bworld/.test('helloworld'); // false
                        /\Bworld/.test('hello-world'); // false
                        /\Bworld/.test('helloworld'); // true
                    //通常，正则表达式遇到换行符（\n）就会停止匹配
                    var html = "<b>Hello</b>\n<i>world!</i>";
                    /.*/.exec(html)[0];// "<b>Hello</b>"
                    /[\S\s]*/.exec(html)[0];// "<b>Hello</b>\n<i>world!</i>"
                    // [\S\s]指代一切字符

                // 重复类
                    // 模式精确匹配次数：使用{}表示，{n}：重复n次
                    // {n,}:表示至少重复n次
                    // {n,m}:表示不少于n次，不多于m次

                // 量词符
                    // 用来设定某个模式出现的次数
                    // ?:表示某个模式出现0次或者1次，等同于{0,1}
                    // *:表示某个模式出现多次，等同与{0,n}
                    // +:表示某个模式出现一次或者多次，等同于{1,}

                // 贪婪模式
                    // 默认最大可能匹配，即匹配到下一个字符不满足匹配规则为止
                        "aaa".match(/a+/);//["aaa"]
                    // 非贪婪模式
                        "aaa".match(/a+?/);//["a"]
                        // +?：表示某个模式出现1次或多次，匹配时采用非贪婪模式。
                        // *?：表示某个模式出现0次或多次，匹配时采用非贪婪模式。
                        // ??：表格某个模式出现0次或1次，匹配时采用非贪婪模式。
                        'abb'.match(/ab*/); // ["abb"]
                        'abb'.match(/ab*?/); // ["a"]

                        'abb'.match(/ab?/); // ["ab"]
                        'abb'.match(/ab??/); // ["a"]

                // 修饰符
                    // 模式的附加规则，放在正则模式最尾部；可以一个或多个
                    // g修饰符
                        // 默认成功一次就不在往下匹配，g修饰符表示全局匹配；匹配全部符合条件的结果，主要用于搜索和替换
                        "abbc".match(/b/);//["b"]
                        "abbc".match(/b/g);//["b","b"]
                    // i修饰符
                        // 正则对象区分大小写，i忽略大小写
                        /abc/.test('ABC'); // false
                        /abc/i.test('ABC'); // true
                    // m修饰符
                        // 表示多行模式，会修改^和$的行为
                        // 不加m，^和$匹配字符串开始结尾位处
                        // 加m，^和$还会匹配行首行尾，即^和$会识别换行符（\n）
                            /world$/.test('hello world\n'); // false
                            /world$/m.test('hello world\n'); // true

                // 组匹配
                    // 括号表示分组匹配，括号中的模式可以用来匹配分组内容
                    'abcabc'.match(/(.)b(.)/);// ['abc', 'a', 'c']
                    // 使用组匹配时，不宜同时使用g修饰符，否则match方法不会捕获分组的内容
                    'abcabc'.match(/(.)b(.)/g);// ['abc', 'abc']
                    // 使用exec方法
                    /(.)b(.)/g.exec('abcabc');// ['abc', 'a','c']

                    /(.)b(.)\1b\2/.exec("abcabc");//["abcabc","a","c"]
                    // \1表示第一个括号的内容（即a），\2表示第二个括号的内容（即c）
                    /y((..)\2)\1/.exec("yabababab");//["yabababab","abab","ab"]
                    // \1指外层括号，\2指内层括号

                    // 非捕获组
                        // (?:x):非捕获组，不返回改组匹配的内容，匹配结果中不计入这个括号
                        "abc".match(/(?:.)b(.)/);//["abc","c"]

                    // 先行断言
                        // x(?=y):x只有在y前面才匹配，y不会计入返回结果
                        // /\d+(?=%)/  匹配在%号之前的数字，括号部分不会返回
                        "abc".match(/b(?=c)/);//["b"]

                    // 先行否断言
                        // x(?!y):x只有不在y之前才匹配,括号里的内容不会返回
                        /\d+(?!\.)/.match("3.14");//["14"]
                        'abd'.match(/b(?!c)/);//["b"]

    //11.Json对象
        // json格式是一种用于数据交换的文本格式；目的取代XML格式
        // 每一个JSON对象都是一个值
        // JSON对值的类型和格式有严格要求
            // 复合类型的值只能是数组或者对象，不能是函数，正则表达式对象，日期对象；
            // 原始类型的值四种：字符串、数值、布尔值、和null；（不能使用NaN，Infinity，-Infinity和undefined）
            // 字符串必须使用双引号，不能使用单引号
            // 对象的键名必须放在双引号里面
            // 数组或者对象的最后一个成员后面，不能加逗号

        // JSON对象，用来处理JSON格式数据，有两个静态方法
            // JSON.stringify():将一个值转为JSON字符串；该字符串符合JSON格式；并被JSON.parse()还原
                JSON.stringify("abc");//'"abc"'
                JSON.stringify(1);//'1'
                JSON.stringify(false);//'false'
                JSON.stringify([]);//'[]'
                JSON.stringify({name:"helen"});//'{"name":"helen"}'
                // 原始字符串转换结果带双引号
                    JSON.stringify('foo')==="foo";//false
                    JSON.stringify('foo')==="\"foo\"";//true
                    JSON.stringify('false');//"\"false\""
                // 如果对象属性是undefined、函数或XML对象，该属性被JSON.stringify（）过滤
                    JSON.stringify({a:undefined,b:function(){}});//"{}"
                // 正则对象转成空对象
                    JSON.stringify(/foo/);//"{}"
                // JSON.stringify()会忽略对象的不可遍历的属性
                    var obj={};
                    obj.defineProperties({
                      'foo':{
                        value:1,
                        enumerable:true
                      },
                      'bar':{
                        value:2,
                        enumberable:false
                      },
                    })
                    JSON.stringify(obj);//'{"foo":1}'

                // JSON.stringify()接受第二个参数，指定参数对象的哪些属性需要转为字符串
                    // 第二个参数可以是一个数组；这个类似白名单数组只对对象属性有效，对数组无效
                        var obj={
                          "prop1":"value1",
                          "prop2":"value2",
                          "prop3":"value3"
                        };
                        var selectProperties=['prop1','prop2'];
                        JSON.stringify(obj,selectProperties);//'{"prop1":"value1","prop2":"value2"}'
                    // 第二个参数还可以是一个函数，用来更改返回值
                        function f(key,value){
                          if(typeof value ==="number"){
                            value=2*value;
                          }
                          return value;
                        }
                        JSON.stringify({a:1,b:2},f);
                        // '{"a":2,"b":4}'

                //JSON.stringify()可以接受第三个参数，用于增加返回的JSON字符串可读写
                    // 默认返回单行字符。第三个参数使得每个属性单独占据一行，并将每个属性前面添加指定的属性前缀（不超过10个字符）
                    JSON.stringify({ p1: 1, p2: 2 }, null, '\t')
                    // {
                    // 	"p1": 1,
                    // 	"p2": 2
                    // }
                    // 如果是一个数字，表示每个属性前面添加的空格数
                    JSON.stringify({ p1: 1, p2: 2 }, null, 2);
                    /*
                    "{
                      "p1": 1,
                      "p2": 2
                    }"
                    */

                // 参数对象的toJSON()方法
                // 如果对象定义了toJSON方法，那么JSON.stringify()会使用这个方法的返回值作为参数，忽略其他属性
                    var user={
                      firstName:"三",
                      lastName:"张",
                      get fullName(){
                        return this.lastName+this.firstName;
                      },
                    };
                    JSON.stringify(user);// "{"firstName":"三","lastName":"张","fullName":"张三"}"
                    // 加上toJSON方法
                    var user = {
                      firstName: '三',
                      lastName: '张',

                      get fullName(){
                        return this.lastName + this.firstName;
                      },

                      toJSON: function () {
                        return {
                          name: this.lastName + this.firstName
                        };
                      }
                    };

                    JSON.stringify(user)
                    // "{"name":"张三"}"
                // Date对象就有一个自己的toJSON()方法
                    var date=new Date("2015-01-01");
                    date.toJSON(); // "2015-01-01T00:00:00.000Z"
                    JSON.stringify(date); // ""2015-01-01T00:00:00.000Z""
                // toJSON()用法，将正则对象自动转为字符串
                    var obj={'foo':/foo/};
                    JSON.stringify(obj);//'{"foo":{}}'
                    RegExp.prototype.toJSON=RegExp.prototype.toString;
                    JSON.stringify(obj);//'{"foo":"/"foo/""}'

            // JSON.parse():将JSON字符串转为对应的值
                JSON.parse('{}') // {}
                JSON.parse('true') // true
                JSON.parse('"foo"') // "foo"
                JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
                JSON.parse('null') // null
                JSON.parse('{"name": "张三"}');//{name:"张三"}
                // 如果字符串不是有效的JSON格式，使用JSON.parse()格式会报错
                    // 可以将JSON.parse()方法放到try...catch代码块中
                    try {
                      JSON.parse("'String'");
                    } catch(e) {
                      console.log('parsing error');
                    }
                // 接受一个函数作为第二个参数
                    function f(key, value) {
                      if (key === 'a') {
                        return value + 10;
                      }
                      return value;
                    }

                    JSON.parse('{"a": 1, "b": 2}', f);
                    // {a: 11, b: 2}

}
// 六、面向对象编程
{
  // 1.实例对象与new命令
      // 面向对象：oop；
          // 对象是单个实物的抽象
          // 对象是一个容器，封装了属性和方法

      // 构造方法：生成实例对象的函数
          // 构造函数名字的首字母大写
          // 特点：
              // 函数体内部使用了this关键字，代表生成的实例对象
              // 生成对象时，必须使用new命令

      // new命令
          // 基本用法，执行构造函数，返回一个实例对象
              var Vehicle = function () {
                this.price = 1000;
              };
              var v = new Vehicle();
              v.price ;// 1000
              // 构造函数也可以接受参数
              var Vehicle = function (p) {
                this.price = p;
              };
              var v = new Vehicle(500);
              v.price ;// 500
              //new本身就可以执行构造函数，构造函数后面的括号可带可不带；推荐使用带括号
              var v=new Vehicle();//等同
              var v=new Vehicle;
              // 如果忘记使用new命令；构造函数就成了普通函数；this指向全局，造成意想不到的后果
              // 解决办法：使用严格模式，第一行加'use strict'
                  // 直接使用构造函数，会报错
                  // 函数内部的this不能指向全局，默认等于undefined
                  function Fubar(foo, bar){
                    'use strict';
                    this._foo = foo;
                    this._bar = bar;
                  }
                  Fubar();
              // 解决办法二：构造函数内部判断是否使用new命令，如果没有，直接返回一个实例对象
              function Fubar(foo, bar) {
                if (!(this instanceof Fubar)) {
                  return new Fubar(foo, bar);
                }

                this._foo = foo;
                this._bar = bar;
              }

              Fubar(1, 2)._foo; // 1
              (new Fubar(1, 2))._foo; // 1

          // new命令原理
              // 使用new命令，后面函数一次执行下面的步骤
              // 1.创建一个空对象，作为将要返回的对象实例
              // 2.将这个空对象的原型，指向实例对象的prototype属性
              // 3.将这个空对象赋值给函数内部的this关键字
              // 4.开始执行构造函数内部代码

              //如果构造函数有return语句，return后面跟着一个对象，new命令会返回这个对象；否则，就不会管这个return语句，返回this对象
                  var Vehicle=function(){
                    this.price=1000;
                    return 1000;
                  };
                  (new Vehicle())===1000;//false return 返回一个数值，new命令就会忽略这个return，返回构造后的this对象
              // 如果return返回一个跟this无关的对象，new命令会返回这个对象，而不是this对象
                  var Vehicle=function(){
                    this.price=1000;
                    return {price:2000};
                  }
                  var v=new Vehicle();
                  v.price;//2000
              // 如果普通函数（内部没有this关键字的函数），使用new命令，会返回一个空对象
                  var vehicle=function(){
                    return "this is a common function"
                  }
                  var v=new vehicle();
                  v;//{}
              // new命令简化的内部流程
                  function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
                    // 将 arguments 对象转为数组
                    var args = [].slice.call(arguments);
                    // 取出构造函数
                    var constructor = args.shift();
                    // 创建一个空对象，继承构造函数的 prototype 属性
                    var context = Object.create(constructor.prototype);
                    // 执行构造函数
                    var result = constructor.apply(context, args);
                    // 如果返回结果是对象，就直接返回，否则返回 context 对象
                    return (typeof result === 'object' && result != null) ? result : context;
                  }
                  var actor = _new(Person, '张三', 28);//实例

          // new.target
              // 函数内部可以使用new.target属性，如果当前new命令调用，new.target指向当前函数，否则undefined
                  var Vehicle=function(){
                    console.log(new.target ===f);
                  }
                  Vehicle();//false
                  new Vehicle();//true
              // 使用这个属性，可以判读函数调用的时候，是否使用了new命令
                  function f() {
                    if (!new.target) {
                      throw new Error('请使用 new 命令调用！');
                    }
                  }
                  f();//请使用 new 命令调用！

          // Object.create():创建实例对象
              // 以现有对象作为模板，生成新的实例对象
              var person1 = {
                name: '张三',
                age: 38,
                greeting: function() {
                  console.log('Hi! I\'m ' + this.name + '.');
                }
              };
              var person2 = Object.create(person1);
              person2.name // 张三
              person2.greeting() // Hi! I'm 张三.

// 2.this关键字
    // this在构造函数中，表示的是实例对象
        // this总是返回一个对象；this就是属性或方法“当前”所在的对象
            this.property;//this代表property属性当前所在的对象
            var person={
              name:"张三",
              describe:function(){
                return "姓名："+this.name;
              }
            }
            person.describe;//"姓名：张三"
        // 对象可以赋值给另一个对象，所以属性所在的当前属性是可变的，this指向是可变的
            var Aa={
              name:"张三",
              describe:function(){
                return "姓名："+this.name;
              }
            };
            var B={name:"李四"};
            B.describe=Aa.describe;
            B.describe();//"姓名：李四"
        // this动态指向
            function f() {
              return '姓名：'+ this.name;
            }
            var A1 = {
              name: '张三',
              describe: f
            };
            var B1 = {
              name: '李四',
              describe: f
            };
            A1.describe() // "姓名：张三"
            B1.describe() // "姓名：李四"

    // 实质
        // 设计目的：在函数体内部，指代函数当前运行的环境
            function f(){
              console.log(this.x);
            };
            var a={
              f:f,
              x:2
            };
            var x=1;
            f();//1  单独执行；全局环境中执行，this.x指向全局环境
            a.f();//2  a环境执行 ；this.x指向a.x

    // 使用场合
        // 1.全局使用
            // 指向顶层对象window
            this===window;//true
            function f(){
              console.log(this===window);
            }
            f();//true
        // 构造函数
            // 指向实例对象
            var Obj=function(p){
              this.p=p;
            }
            var o=new Obj("hello world");
            o.p;//"hello world";
        // 对象的方法
            // 如果对象方法里面包含this，this指向是方法所运行时所在的对象
            // 该方法赋值给另一个对象，就会改变this指向
                var obj={
                  foo:function(){
                    console.log(this)
                  }
                };
                obj.foo();//obj
            // 以下几种用法，改变了this指向
                (obj.foo=obj.foo())();//情况一
                (false || obj.foo)();//情况二
                (1,obj.foo)();//情况三
                // obj.foo是一个值，这个值调用用，环境就变为了window
                // 情况一
                (obj.foo = function () {
                  console.log(this);
                })()
                // 等同于
                (function () {
                  console.log(this);
                })()
                // 情况二
                (false || function () {
                  console.log(this);
                })()

                // 情况三
                (1, function () {
                  console.log(this);
                })()
            // this所在的方法不在第一层，这时，this指向了当前一层的对象，而不会继承上一层
                var a = {
                  b: {
                    m: function() {
                      console.log(this.p);
                    },
                    p: 'Hello'
                  }
                };
                var hello = a.b.m;
                hello(); // undefined

                var hello = a.b;
                hello.m(); // Hello

        // 使用注意点
            // 避免多层this
                // this的指向不明确，所有切勿在函数中包含多层的this
                    var o = {
                      f1: function () {
                        console.log(this);
                        var f2 = function () {
                          console.log(this);
                        }();
                      }
                    }
                    o.f1()
                    // Object
                    // Window
                // 在严格模式中，this指向顶层对象就会报错
                    var counter = {
                      count: 0
                    };
                    counter.inc = function () {
                      'use strict';
                      this.count++
                    };
                    var f1 = counter.inc;
                    f1()
                    // TypeError: Cannot read property 'count' of undefined

            // 避免数组处理方法中的this
                // 数组的map和foreach，允许一个函数作为参数，这个函数内部不应该使用this
                    var o={
                      v:"hello",
                      p:['a1','a2'],
                      f:function f(){
                          this.p.map(function(item){
                            console.log(this.v+" "+item);
                          })
                      }
                    }
                    o.f();
                    //undefined a1
                    //undefined a2
                    // 内层的this不指向外部，指向顶层对象
                    // 解决方法，使用中间变量固定this
                        var o={
                          v:"hello",
                          p:['a1','a2'],
                          f:function f(){
                            var that=this;
                              this.p.map(function(item){
                                console.log(that.v+" " +item);
                              })
                          }
                        }
                        o.f();
                        //hello a1
                        //hello a2
                    // 第二种方法，就是将this当做foreach方法的第二个参数，固定他的运行环境
                        var o = {
                          v: 'hello',
                          p: [ 'a1', 'a2' ],
                          f: function f() {
                            this.p.forEach(function (item) {
                              console.log(this.v + ' ' + item);
                            }, this);
                          }
                        }
                        o.f();
                        // hello a1
                        // hello a2

            //避免回调函数中的this
                // 回调函数中的this往往会改变指向，最好避免使用
                    var o = new Object();
                    o.f = function () {
                      console.log(this === o);
                    }
                    // jQuery 的写法
                    $('#button').on('click', o.f);

        // 绑定this的方法
            // call、apply、bind，切换/固定this指向
            // Function.prototype.call():函数实例call方法，指定内部函数this的指向
                // 在所指定的作用域中，调用该函数
                    var obj={};
                    function f(){
                      return this;
                    }
                    f()===window;//true
                    f.call(obj)===obj;//true
                // call方法的参数是一个对象，如果参数为空、null和undefined，则默认传入全局对象
                    var n=123;
                    var obj={n:456};
                    function f(){
                      console.log(this.n);
                    }
                    f.call();//123
                    f.call(null);//123
                    f.call(undefined);//123
                    f.call(window);//123
                    f.call(obj);//456
                // call的参数是一个原始值，原始类型自动转为包装对象，然后传入call方法
                    var f2=function(){
                      return this;
                    }
                    f2.call(5);//{5}
                // call参数接受多个参数，第一个参数就是this所指向的对象，后面的参数则是函数调用时所需要的参数
                    // func.call(thisValue, arg1, arg2, ...)
                    function add(a,b){
                      return a+b;
                    }
                    add.call(this,1,2);//3  this 绑定当前环境
                // call调用对象的原生方法
                    var obj = {};
                    obj.hasOwnProperty('toString') // false
                    // 覆盖掉继承的 hasOwnProperty 方法
                    obj.hasOwnProperty = function () {
                      return true;
                    };
                    obj.hasOwnProperty('toString') // true
                    Object.prototype.hasOwnProperty.call(obj, 'toString') // false

            // Function.prototype.apply():与call相似，改变this指向，在调用函数
                // 与call的区别：接受一个数组作为函数参数时，格式如下
                    // func.apply(thisValue,[args1,args2,...])
                // 第一个参数也是this所要指向的那个对象，如果设置为空、null、undefined，指向全局
                // 第二个参数则是一个数组；call依次传入，apply中以数组形式添加
                    function f(x, y){
                      console.log(x + y);
                    }
                    f.call(null, 1, 1); // 2
                    f.apply(null, [1, 1]); // 2
                // 找出数组中最大元素
                    var a = [10, 2, 4, 15, 9];
                    Math.max.apply(null, a); // 15
                // 将数组的空元素变为undefined
                    Array.apply(null, ['a', ,'b']);
                    var a = ['a', , 'b'];
                    function print(i) {
                      console.log(i);
                    }
                    a.forEach(print)
                    // a
                    // b
                    Array.apply(null, a).forEach(print)
                    // a
                    // undefined
                    // b
                // 转换类数组对象
                    // 利用数组对象slice，可以将一个类数组对象转为真正的数组
                    Array.prototype.slice.apply({0: 1, length: 1}) // [1]
                    Array.prototype.slice.apply({0: 1}) // []
                    Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
                    Array.prototype.slice.apply({length: 1}) // [undefined]
                    // 被处理的对象必须有数字键和length属性
                // 绑定回调属性的对象
                    var o = new Object();
                    o.f = function () {
                      console.log(this === o);
                    }
                    var f3 = function (){
                      o.f.apply(o);
                      // 或者 o.f.call(o);
                    };

            // Function.prototype.bind():将函数体内部的this绑定到某个对象，返回一个新函数
                var counter = {
                  count: 0,
                  inc: function () {
                    this.count++;
                  }
                };

                var func = counter.inc.bind(counter);
                func();
                counter.count // 1
                // this绑定其他对象
                    var obj={count:100};
                    var func = counter.inc.bind(obj);
                    func();
                    obj.count;//101
                // 接受更多参数，将这些参数绑定绑定原函数参数
                    function add(x, y) {
                      return x * this.m + y * this.n;
                    }
                    var obj = {
                      m: 2,
                      n: 2
                    };
                    var newAdd = add.bind(obj, 5);
                    newAdd(5) // 20
                    // 绑定了this对象，还将add()函数的第一个函数x绑定成了5
                // bind()方法的第一个参数是null或者undefined，等于将this绑到全局对象，函数运行时this指向顶层
                    function add(x, y) {
                      return x + y;
                    }
                    var plus5 = add.bind(null, 5);
                    plus5(10); // 15
                // 注意点
                    // 每一次返回一个新函数
                        // bind()方法没运行一次，就返回一个新函数，会产生一些问题，比如，监听时间的时候
                        element.addEventListener('click', o.m.bind(o));//会产生一个匿名函数
                        // 正确写法
                        var listener = o.m.bind(o);
                        element.addEventListener('click', listener);
                        //  ...
                        element.removeEventListener('click', listener);
                    // 结合回调函数使用
                        // 会将包含this的方法直接当做回调函数
                        function callIt(callback) {
                          callback();
                        }
                        callIt(counter.inc.bind(counter));
                        counter.count // 1
                    // 某些数组方法接受一个函数做参数，函数内部this指向
                        var obj = {
                          name: '张三',
                          times: [1, 2, 3],
                          print: function () {
                            this.times.forEach(function (n) {
                              console.log(this.name);
                            });
                          }
                        };

                        obj.print();//无输出
                        // 改为
                        obj.print=function(){
                          this.times.forEach(function(){
                            console.log(this.name);
                          }).bind(this)
                        }
                        obj.print();
                        //张三
                        //张三
                        //张三
                  // 结合call()方法使用
                      [1, 2, 3].slice(0, 1); // [1]
                      // 等同于
                      Array.prototype.slice.call([1, 2, 3], 0, 1); // [1]
                      // call的实质调用了Function.prototype.call,所以用bind改写
                      var slice=Function.prototype.call.bind(Array.prototype.slice);
                      slice([1,2,3],0,1);//[1]
                      // 上面含义就是将Array.prototype.slice变成Function.prototype.call方法所在的对象
                      // 调用时就变成了Array.prototype.slice.call
                          var push=Function.prototype.call.bind(Array.prototype.push);
                          var pop=Function.prototype.call.bind(Array.prototype.pop);
                          var a=[1,2,3];
                          push(a,4);//[1,2,3,4]
                          push(a);//[1,2,3]
                      // 将Function.prototype.call绑定到Function.prototype.bind对象
                          var bind=Function.prototype.call.bind(Function.prototype.bind);
                          function f(){
                            console.log(this.v);
                          };
                          var o={v:123};
                          bind(f,o);//123
                          // bind 方法可以直接使用，不需要在函数实例上使用

  // 3.对象的继承
      // 原型对象概述
          // 构造函数缺点：同一个构造函数的多个实例，无法共享属性，造成资源的浪费
              function Cat(name,color){
                this.name=name;
                this.color=color;
                this.meow=function(){
                  console.log("meow");
                }
              }
              var cat1=new Cat("大毛","白色");
              var cat2=new Cat("二毛","黑色");
              cat1.meow===cat2.meow;//false
              // 解决：原型对象（prototype）
          // prototype属性的作用
              // 原型对象的所有方法和属性，都能被实例对象共享；
              // 每一个函数都有一个prototype属性，指向一个对象
                  function f(){};
                  typeof f.prototype;//"object"
              // 构造函数来说，生成实例的时候，该属性就自行成为实例对象原型
                  function Animal(name){
                    this.name=name;
                  }
                  Animal.prototype.color="white";
                  var cat1 = new Animal("大毛");
                  var cat1 = new Animal("二毛");
                  cat1.color;//"white"
                  cat2.color;//"white"
                  Animal.prototype.color="yellow";
                  cat1.color;//"yellow"
                  cat2.color;//"yellow"
                  // 如果实例自身有某个方法或者属性，不会再去原型寻找这个方法和属性
                  cat1.color="black";
                  cat1.color;//"black"
                  cat2.color;//"yellow"
                  Animal.prototype.color;//"yellow"
              // 原型对象的作用，就是定义所有实例对象共享的方法和属性；而实例对象可以视作从原型对象衍生出来的子对象

          // 原型链
              // 所有对象都有自己的原型对象；任何一个对象，都可以充当其他对象的原型；
              // 原型对象也是对象，所以也有自己的原型，因此会形成一个原型链，对象到原型，原型到原型的原型……
              // 原型最终都可以追溯到Object.prototype，即Object构造函数的prototype属性，对象都继承了Object.prototype属性
              // Object.prototype的原型是null；null没有任何属性和方法，也没有自己的原型；原型链的尽头null
                  Object.getPrototypeOf(Object.prototype);//null

                  var MyArray = function () {};
                  MyArray.prototype = new Array();
                  MyArray.prototype.constructor = MyArray;
                  var mine = new MyArray();
                  mine.push(1, 2, 3);
                  mine.length // 3
                  mine instanceof Array // true
                  // MyArray.prototype指向一个数组实例，使得mine可以调用数组方法

          // constructor 属性
              // prototype有一个constructor属性，默认指向prototype对象所在的构造函数
                  function P(){}
                  P.prototype.constructor===P;//true
              // constructor作用：可以得知某个实例对象，到底是哪一个构造函数产生的
                  function F(){}
                  var f4=new F();
                  f4.constructor===F;//true
                  f4.constructor===RegExp;//false
              // constructor属性表示原型对象和构造函数之间关联关系，如果修改了原型对象，一般同时修改constructor属性，防止引用错误
                  function Person(name) {
                    this.name = name;
                  }
                  Person.prototype.constructor === Person // true
                  Person.prototype = {
                    method: function () {}
                  };
                  Person.prototype.constructor === Person; // false
                  Person.prototype.constructor === Object; // true
                  // Person.新原型是一个普通对象，而普通对象的constructor指向Object,
                  // 导致Person.prototype.constructor指向Object
                  // 修改原型对象时，一般同时修改constructor属性指向
                      // 坏的写法
                      C.prototyoe={
                        method1:function(){},
                        //....
                      }
                      // 好的写法
                      C.prototype={
                        constructor:C,
                        method1:function(){},
                      }
                      // 更好的写法
                      C.prototype.method1=function(){}
              // 查看constructor属性是什么函数
              function Foo() {}
              var f6 = new Foo();
              f6.constructor.name ;// "Foo"

          // instanceof 运算符
            // 返回一个运算符，表示是否是某个构造函数的实例
                var V=function(){}
                var v=new V();
                v instanceof V;//true
            // instanceof 左边是实例，右边是构造函数，会检查右边构造函数的原型对象（prototype），是否在左边原型链上
                v instanceof V;//true
                V.prototype.isPrototypeOf(v);//true  检查某一个对象是否是另一个对象原型
            // instanceof 检查整个原型链，所以对于同一个对象，可能多个构造函数都返回true
                var d = new Date();
                d instanceof Date // true
                d instanceof Object // true
            // 由于任何对象都是Object的实例，所以instanceof运算符可以判断一个值是否为非null的对象
                var obj = { foo: 123 };
                obj instanceof Object // true
                null instanceof Object // false
            // 左边对象的原型链上，只有null对象。这时，instanceof判断会失真（一个对象的原型是null）。
                var obj = Object.create(null);//obj对象的原型是null
                typeof obj // "object"
                obj instanceof Object // false
            // instanceof用处，判断值的类型；只适用对象，不适用原始类型的值
                var x = [1, 2, 3];
                var y = {};
                x instanceof Array // true
                y instanceof Object // true
            // 对于null undefined，instanceof总是返回false
            // instanceof可以解决调用构造函数时，忘记添加new命令的问题
                function Fubar (foo, bar) {
                  if (this instanceof Fubar) {
                    this._foo = foo;
                    this._bar = bar;
                  } else {
                    return new Fubar(foo, bar);
                  }
                }

        // 构造函数的继承
            // 一个构造函数继承另一个构造函数；第一步是在子类的构造函数中，调用父类的构造函数
                function Sub(value){
                  Super.call(this);
                  this.prop=value;
                }
                // Sub是子类的构造函数
                // this是子类的实例
                // 在实例上调用父类的构造函数Super,就让子类实例具有父类的属性和方法
            // 第二步，让子类的原型指向父类的原型，子类就可以继承父类原型
                Sub.prototype=Object.create(Super.prototype);
                Sub.prototype.constructor=Sub;
                Sub.prototype.method = function(){};
                // 另一种写法，Sub.prototype等于一个父类实例
                Sub.prototype = new Super();//不推荐
            // 子类继承父类
                function Shape(){
                  this.x=0;
                  this.y=0;
                }
                Shape.prototype.move=function(x,y){
                  this.x+=x;
                  this.y+=y;
                  console.log("shape moved");
                }
                // Rectangle构造继承Shape
                function Rectangle(){
                  Super(this);//调用父类构造方法
                }
                // 等同
                function Rectangle(){
                  this.base=Shape;
                  this.base();
                }
                // 子类继承父类的原型
                Rectangle.prototype=Object.create(Shape.prototype);
                Rectangle.prototype.constructor=Rectangle;
                // 生成实例
                var rect =new Rectangle();
                rect instanceof Rectangle;//true
                rect instanceof Shape;//true
                // 单个方法继承
                classB.prototype.print=function(){
                  classA.prototype.print.call(this);
                }

        // 多重继承
            // JavaScript不提供多重继承功能，即不允许一个对象继承多个对象；变通方法，实现这个功能
            function M1() {
              this.hello = 'hello';
            }
            function M2() {
              this.world = 'world';
            }
            function S() {
              M1.call(this);
              M2.call(this);
            }
            // 继承 M1
            S.prototype = Object.create(M1.prototype);
            // 继承链上加入 M2
            Object.assign(S.prototype, M2.prototype);
            // 指定构造函数
            S.prototype.constructor = S;
            var s = new S();
            s.hello // 'hello'
            s.world // 'world'

        // 模块
            // Es6才开始支持模块 和类
            // 传统做法，如何利用对象实现模块管理：
            // 基本实现方法
                // 模块是实现特定功能的一组属性和方法的封装
                // 把模块写成一个对象，所有模块成员都放到这个对象里面
                    var module1 = new Object({
                      _count : 0,
                      m1 : function (){
                        // ...
                      },
                      m2 : function (){
                        //...
                      }
                      });
                      // 调用
                      module1.m1();
                      // 缺点：暴露所有模块成员，内部状态可能被外部改写
                      module1._count=10;
            // 封装私有变量，构造方法的写法
                function StringBuilder(){
                  var buffer=[];
                  this.add=function(str){
                    buffer.push(str)
                  }
                  this.string=function(){
                    return buffer.join("")
                  }
                }
                // 变量无法清除
            // 封装私有变量，立即执行函数的写法
                // 立即执行函数，将相关属性方法封装到一个函数作用域中，可以达到不暴露私有变量的目的
                /*var module1=(function(){
                    var _count=0;
                    var m1=function(){};
                    var m2=function(){};
                    return {m1:m1,m2:m2};
                })();
                */
                console.info(module1._count); //undefined
                // 外部无法读取内部_count变量
            // 模块的放大模式
                // 如果一个模块放大，必须分成几个部分，或者需要一个模块继承另一个模块
                /*var module1 = (function (mod){
                  mod.m3 = function () {
                    //...
                  };
                    return mod;
                  })(module1);
                  */
                // 执行部分可能加载一个不存在的空对象，这是要采用宽放大模式
                /*
                var module1 = (function (mod) {
                  　//...
                  　return mod;
                  })(window.module1 || {});
                  */
                //  与"放大模式"相比，“宽放大模式”就是“立即执行函数”的参数可以是空对象

        // 输入全局变量
            // 模块内部调用全局变量是，必须显示的将其他变量输入模块
            /*
            var module1 = (function ($, YAHOO) {
                //...
              })(jQuery, YAHOO);
              */
            // 立即执行函数还可以起到命名空间的作用
            /*
            (function($, window, document) {

              function go(num) {
              }

              function handleEvents() {
              }

              function initialize() {
              }

              function dieCarouselDie() {
              }

              //attach to the global scope
              window.finalCarousel = {
                init : initialize,
                destroy : dieCarouselDie
              }

            })( jQuery, window, document );
            */
          //  finalCarousel对象输出到全局，对外暴露init和destroy接口，
          // 内部方法go、handleEvents、initialize、dieCarouselDie都是外部无法调用的。

  // 4.Object对象的相关方法
      //Object.getPtototypeOf():返回参数对象原型
          var F1 = function () {};
          var ff = new F1();
          Object.getPrototypeOf(ff) === F1.prototype; // true
          // 特殊对象原型
              // 空对象的原型是 Object.prototype
              Object.getPrototypeOf({}) === Object.prototype // true
              // Object.prototype 的原型是 null
              Object.getPrototypeOf(Object.prototype) === null // true
              // 函数的原型是 Function.prototype
              function f() {}
              Object.getPrototypeOf(f) === Function.prototype // true

      // Object.setPrototypeOf():为参数对象设置原型，返回该参数对象；接受两个参数
         //第一个参数现有对象，第二个参数原型对象
            var a={};
            var b={x:1};
            Object.setPrototypeOf(a,b);
            Object.getPrototypeOf(a) === b;//true
            a.x;//1
        // new 命令可以使用Object.setPrototypeOf方法模拟
            function F(){
              this.foo="foo";
            }
            var f1=new F();
            // 等同
            var f1=Object.setPrototypeOf({},F.prototype);
            F.call(f1);//将构造函数的this绑定这个空对象，然后执行构造函数，
            // 使定义在this的方法和属性（this.foo），都转移到这个空对象上

        // Object.create():生成实例对象的方法，使用new命令返回一个实例
            // 该方法接受一个对象作为参数，以它为原型，返回一个实例对象，该实例继承原型对象的属性
                // 原型对象
                var A2 = {
                  print: function () {
                    console.log('hello');
                  }
                };
                // 实例对象
                var B2 = Object.create(A2);
                Object.getPrototypeOf(B2) === A2 // true
                B2.print() // hello
                B2.print === A2.print; // true
            // Object.create()可用下列代替
                if(typeof Object.create !== "function"){
                  Object.create=function(obj){
                    var F=function(){}
                    F.prototype=obj;
                    return new F();
                  }
                }
            // 一下三种生成对象等价
                var fn=Object.create({});
                var fn=Object.create(Object.prototype);
                var fn=new Object();
            // 如果生成一个不具有任何属性的对象（比如toString（）和valueOf（））
            // 将Object.create()参数改为null
                var f1=Object.create(null);
                f1.valueOf();//TypeError:no method 'valueOf'
            // 使用Object.create()参数不能为空，参数一定为对象，否则报错
                Object.create();// TypeError
                Object.create(123);// TypeError
            // Object.create()生成的新对象，动态继承了原型；在原型上添加或者修改任何方法，会立刻反映在新对象上
                var obj={p:1};
                var obj1=Object.create(obj);
                obj.p=2;
                obj1.p;//2
            // 接受第二个参数，该参数是一个属性描述对象，他所描述的对象属性，会添加到实例对象，作为该对象自身属性
                var obj=Object.create({},{
                  p1:{
                    value:1,
                    writable:true,
                    enumerable:true,
                    configurable:true,
                  },
                  p2:{
                    value:"abc",
                    writable:true,
                    enumerable:true,
                    configurable:true,
                  },
                });
                // 等同于
                var obj=Object.create({});
                obj.p1=1;
                obj.p2="abc";
            // Object.create()生成的对象，继承了原型对象的构造函数
                function A() {}
                var a = new A();
                var b = Object.create(a);
                b.constructor === A // true
                b instanceof A // true

        // Object.prototype.isPrototypeOf():判断该对象是否为参数对象原型
            var o1={};
            var o2=Object.create(o1);
            var o3=Object.create(o2);
            o2.isPrototypeOf(o3);//true
            o1.isPrototypeOf(o3);//true
            // Object.prototype处于原型链顶端，所以对各种实例放回true
            // 只有直接继承自null的对象除外
            Object.prototype.isPrototypeOf({});//true
            Object.prototype.isPrototypeOf([]);//true
            Object.prototype.isPrototypeOf(/xyz/);//true
            Object.prototype.isPrototypeOf(Object.create(null));//false

        //Object.prototype.__proto__:返回该对象原型，该属性可读写
            var obj={};
            var p={};
            obj.__proto__=p;
            Object.getPrototypeOf(obj)===p;//true
            // 内部属性，不应该对使用者暴露。
            // 使用Object.getPrototypeOf() 和Object.setPrototypeOf()，进行原型对象的读写操作
            var A3={name:"张三"};
            var B3={name:"李四"};
            var proto={
              print:function(){
                console.log(this.name);
              }
            };
            A3.__proto__=proto;
            B3.__proto__=proto;
            A3.print();//"张三"
            B3.print();//"李四"
            A3.print===B3.print;//true
            A3.print===proto.print;//true
            B3.print===proto.print;//true

        // 获取原型对象方法的比较
            // __proto__属性指向当前对象原型对象，及构造函数(Object或Object.constructor)的prototype属性
                var obj=new Object();
                obj.__proto__===Object.prototype;//true
                obj.__proto__===Object.constructor.prototype;//true
            // 获取实例原型对象obj的源性对象，有三种方法
                obj.__proto__;
                obj.constructor.prototype;
                OBject.getPrototypeOf(obj);
                // 前两种不可靠，第一个浏览器才需要部署，其他环境不可部署
                // 第二个在手动改变原型时，可能会失效
                var P1=function(){};
                var p=new P1();
                var C=function(){};
                C.prototype=p;
                var c=new C();
                c.constructor.prototype ===p;//false
                // C原型对象改为了p，实例对象c.constructor.prototype没有指向p
                C.prototype=p;
                C.prototype.constroctor=p;
                var c=new C();
                c.constructor.prototype===p;//true

        // Object.getOwnPropertyNames():返回一个数组，成员是参数对象本身属性的键名，不包含继承属性键名
            Object.getOwnPropertyNames(Date);//返回Date所有自身属性名
            // ["parse","arguments","UTC","caller",...]
            // 返回所有键名，不管是否可以遍历
            // 获取可以遍历的属性，使用Object.keys()方法
              Object.keys(Date);//[]
              // Date所有自身属性，都是不可遍历的

        // Object.prototype.hasOwnProperty():返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上
            Date.hasOwnProperty("length");//true
            Date.hasOwnProperty("toString");//false

        // in运算符和for...in运算符
            // in返回一个布尔值，表示一个对象是否具有某个属性；不区分是否自身还是继承属性
                'length' in 'Date';//true
                'toString' in 'Date';//true
                // 检查是否存在这个属性
            // 获取对象的所有可遍历属性（不管自身还是继承），可以使用for...in循环
                var o1={p1:123};
                var o2=Object.create(o1,{p2:{
                  value:234,
                  enumerable:true
                }});
                for(let o in o2){
                  console.log(o);
                }
                //p1
                //p2
            // for...in循环中判断是否是自身属性，用hasOwnProperty判断
                for(let o in o2){
                  if(o2.hasOwnProperty(o)){
                    console.log(o)
                  }
                }
                // p2

        // 对象拷贝
            // 确定拷贝后的对象，与原对象具有同样的原型
            // 确定拷贝后的对象，与原对象具有同样的实例属性
            function copyObject(orig){
              var copy=Object.create(Object.getPrototyeOf(orig));
              copyOwnPropertiesFrom(copy,orig);
              return copy;
            }
            function copyOwnPropertiesFrom(target,orig){
              Object.getOwnPropertyNames(orig).forEach((propKey)=>{
                var desc = Object.getOwnPropertyDescriptor(orig,propKey);
                Object.defineProperty(target,propKey,desc)
              })
              return target
            }
            // 更简单的方法拷贝一个对象
            function copyObject(orig) {
              return Object.create(
                Object.getPrototypeOf(orig),
                Object.getOwnPropertyDescriptors(orig)
              );
            }

  // 5.严格模式
      // 体现JavaScript更合理 更安全 更严谨的发展方向
      // 启用方法
          'use strict';
          // 整个脚本文件：user strict 放在文件第一行，整个脚本按严格模式运行
          // 单个函数
            function f(){
              'use strict';
              return "这是严格模式";
            }
      // 显示报错
          // 只读属性不可写
              'use strict';
              'abc'.length=5;
              // TypeError:Cannot assign to read only property 'length' of string 'abc'
              // 正常模式，改变无效不会报错
              // 严格模式，对只读属性赋值，删除不可配置属性都会报错
          // 只设置了取值器的属性不可写
              // 严格模式下对只有取值器，没有存值器的属性赋值，会报错
                  var obj={
                    get v(){return 3}
                  }
                  obj.v;//3
                  obj.v=2;//TypeError:Cannot set property v
          // 禁止扩展的对象不可扩展
              'use strict';
              var obj={};
              obj.preventExtensions();
              obj.p=1;//TypeError: Cannot add property v
          // eval,arguments不可用作标识符
              'use strict';
              var eval=1;
              // var arguments=12;
              function arguments(){}
              //...
          //函数不能有重名的参数
              function f(a,a,b){
                return a+b;
              }
          // 禁止八进制的前缀0表示法
              // 正常模式下，整数第一位如果是0，表示8进制
              // 严格模式，整数第一位不能为0
              var n=0100;

      // 增强的安全措施
          // 全局变量显式申明
              'use strict';
              v=1;//报错，v未声明
              for(i;i<2;i++){}//报错，i未声明
              function f(){x+=1;}
              f();//报错，未声明就创建一个全局变量
          // 禁止关键字this指向全局对象
              // 正常模式下，this可能会指向全局对象，严格模式禁止这种用法，避免无意间创造全局变量
                  function f(){
                    'use strict';
                    console.log(this === undefined);
                  }
                  f();//true
                  // 严格模式的函数体内部this表示undefined
              // 使用构造函数，忘记加new，this不再指向全局对象，而是报错
                  function F(){
                    this.a=1;
                  }
                  F();//报错，this未定义
              // 严格模式下，构造函数直接调用，函数内部this表示undefined，因此使用call apply bind
              // 将任意值绑定到this上
                  function fun(){
                    return this;
                  }
                  fun();//wondow
                  fun.call(2);//Number {2}
                  fun.call(true);//Boolean {true}
                  fun.call(null);//window
                  fun.call(undefined);//window
                  // 正常模式，this指向全局，如果绑定的值为非对象，将自动转为对象再绑定上去
                  // null和undefined无法转为对象，将忽略

                  function fun(){
                    'use strict';
                    return this;
                  }
                  fun();//undefined
                  fun.call(2);//2
                  fun.call(true);//true
                  fun.call(unll);//null
                  fun.call(undefined);//underfined
                  // 严格模式，可以把任意值绑定到this上

          //禁止使用fn.callee,fn.caller
              // 函数内部不得使用fn.caller、fn.arguments，否则会报错。这意味着不能在函数内部得到调用栈了
              function f(){
                'use strict';
                f.caller;//报错
                f.arguments;//报错
              }

          // 禁止使用arguments.callee arguments.caller
              // 历史遗留变量，已经取消
              'use strict';
              var f2 = function () {
                return arguments.callee;
              };
              f2(); // 报错

          // 禁止删除变量
              // 严格模式下不能删除变量，如果使用delete删除变量，报错
              // 只有删除对象的属性，且属性的描述对象configurable为true时，才能被delete删除
              'use strict';
              var obj=Object.create(null,{
                p1:{
                  value:1,
                  configurable:true
                },
                p2:{
                  value:2,
                  configurable:false
                }
              })
              delete obj;//语法错误
              delete obj.p1;//true
              delete obj.p2;//语法错误

      //静态绑定
          // 禁止使用with语句
                // 严格模式，使用with语句报错，因为with语句无法在编译时确定，某个属性到底归属那个对象
                'use strict';
                var v=1;
                var obj={};
                with(obj){
                  v=2;
                }
                // SyntaxError

          // 创设eval作用域
              // 正常模式，两种变量作用域：全局作用域和函数作用域
              // 严格模式创设第三个作用域：eval作用域
              // eval作用域不能运行其他作用域的变量，eval所生成的变量只能用于eval内部

          // arguments不再追踪参数的变化
              // 变量arguments代表函数参数；严格模式内部改变参数与arguments的联系被切断了
              function f(a){
                a=2;
                return [a,arguments[0]];
              }
              f(1);//[2,2]
              function f(a){
                'use strict';
                return [a,arguments[0]];
              }
              f(1);//[2,1]

      //向下一个版本JavaScript过度
          // 非函数代码不得声明函数
              // 不允许在非函数的代码块內声明函数
              'use strict';
              if(true){
                function f1(){}//语法错误
              }
              for (var i = 0; i < 5; i++) {
                function f2() { } // 语法错误
              }

          // 保留字
              // implements、interface、let、package、private、protected、public、static、yield等

}
// 七、异步操作
{
  // 概述
      // 单线程模型
          // JavaScript只在一个线程上运行；JavaScript多个线程，单个脚本只在一个线程上运行（主线程），其他线程在后台配合
          // 内部循环机制：CPU不管io操作，挂起来处于等待中的任务，先运行排在后面的任务，等到io操作返回结果，再回过头，把挂起的任务继续执行下去

      // 同步任务和异步任务
          // 同步任务：那些没有被引擎挂起，在主线程排队执行的任务。只有前一个任务执行完毕才能执行下一个任务
          // 异步任务：那些被引擎放在一边，不进入主线程，进入任务队列的任务；
          // 只有引擎认为这个任务可以执行（如ajax操作从服务器获得结果），该任务（采用回调函数的形式）才能进入主线程执行

      // 任务队列和事件循环
          //异步队列：除了主线程，还有一个任务队列，里面是各种需要当前程序处理的异步任务；
          // 事件循环：引擎在不停的检查，一遍又一遍，只要同步任务执行完毕，引擎就会检查那些被挂起来的异步任务，是不是可以进入主线程

      // 异步操作的模式
          // 回调函数
              function f1(callback){
                callback();
              }
              function f2(){}
              f1(f2);
              // 优点：简单，容易理解和实现
              // 缺点：不利于代码的阅读和维护，各个部分高度耦合，使程序混乱，流程难以追踪，每个任务只能指定一个回调函数
          // 事件监听
              // 事件驱动模式，异步任务执行不取决于代码顺序，取决于某件事的发生
                  f1.on("done",f2);// jquery写法
                  // f1发生done事件，就执行f2
                  function f1(){
                    setTimeout(function(){
                      // ...
                      f1.trigger("done");//表示执行完毕，立即触发done，从而执行f2
                    },1000)
                  }
                  // 优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数。可以去耦合；有利于模块化实现
                  // 缺点：程序编程事件驱动型，运行流程会变得很不清晰，阅读时，很难看出主流程

          // 发布/订阅
              // 如果存在一个信号中心，某个任务执行完毕，信号中心发布（publish）一个信号
              // 其他任务向任务中心订阅（subscribe）这个信号，从而知道自己从什么时候开始执行---发布订阅模式（观察者模式）
                  // 首先，f2向信号中心jQuery订阅done信号
                  jQuery.subscribe("done",f2);
                  // f1进行改写
                  function f1() {
                    setTimeout(function () {
                      // ...
                      jQuery.publish('done');
                    }, 1000);
                  }
                  // f1执行完毕，向信号中心发射done信号，从而引发f2执行
                  // f2执行完毕，取消订阅
                  jQuery.unsubscribe("done",f2);

      // 异步操作的流程控制
          function async(args,callback){
            console.log("参数为："+args+", 1秒后返回结果");
            setTimeout(function(){callback(args*2)},1000);
          }
          function final(value){
            console.log("完成: "+value)
          }
          async(1,function(value){
            async(2,function(value){
              async(3,function (value){
                async(4,function(value){
                  async(5,function(value){
                    async(6,final)
                  })
                })
              })
            })
          })
          // 参数为 1 , 1秒后返回结果
          // 参数为 2 , 1秒后返回结果
          // 参数为 3 , 1秒后返回结果
          // 参数为 4 , 1秒后返回结果
          // 参数为 5 , 1秒后返回结果
          // 参数为 6 , 1秒后返回结果
          // 完成:  12
          // 回调函数嵌套，写起来麻烦，容易出错，难以维护

      // 串行执行
          // 流程函数控制异步任务，一个任务结束，在执行另一个
          var items=[1,2,3,4,5,6];
          var results=[];
          function async(value,callback){
            console.log("参数为："+value+" , 1秒返回结果");
            setTimeout(function(){callback(value*2)},1000)
          }
          function final(value){
            console.log("完成： "+value);
          }
          function series(item){
            if(item){
              async(item,function(result){
                results.push(result);
                return series(items.shift());
              })
            }else{
              return final(results);
            }
          }
          series(items.shift());
          // 参数为 1 , 1秒后返回结果
          // 参数为 2 , 1秒后返回结果
          // 参数为 3 , 1秒后返回结果
          // 参数为 4 , 1秒后返回结果
          // 参数为 5 , 1秒后返回结果
          // 参数为 6 , 1秒后返回结果
          // 完成:  [2,4,6,8,10,12]
          items;//[]
          results;//[2,4,6,8,10,12]

      // 并行执行
          // 流程函数控制，所有异步任务同时执行，等全部完成以后，才执行final函数
          var items=[1,2,3,4,5,6];
          var results=[];
          function async(args,callback){
            console.log("参数为： "+args+" , 1秒返回结果");
            setTimeout(function(){callback(args*2)},1000)
          }
          function final(value){
            console.log("完成： "+value);
          }
          items.forEach(function(item){
            async(item,function(result){
              results.push(result);
              if(items.length===results.length){
                return final(results)
              }
            });
          })

      // 并行与串行结合
          // 设置门槛，每次最多执行n个异步任务
          var items=[1,2,3,4,5,6];
          var results=[];
          var running=0;
          var limit=2;
          function async(args,callback){
            console.log("参数为： "+args+" , 1秒返回结果");
            setTimeout(function(){callback(args*2)},1000)
          }
          function final(value){
            console.log("完成： "+value);
          }
          function launcher(){
            while(running<limit && items.length>0){
                var item=items.shift();
                async(item,function(result){
                  results.push(result);
                  running--;
                  if(items.length>0){
                    launcher();
                  }else if(running==0){
                    final(results);
                  }
                })
                running++;
            }
          }
          launcher();

  // 定时器
      // setTimeout():执行某个函数或代码片段，在多少毫秒后执行；返回一个整数，定时器编码，以后可以用来取消定时器
          var timerId = setTimeout(func|code,delay);
          // 代码片段以字符串形式
              console.log("1");
              setTimeout('console.log(2)',1000);
              console.log("3");
              //1
              //3
              //2
          // 第二个参数省略，默认为0
          // 允许更多参数，他们将一次传入推迟执行的函数（回调函数）
              setTimeout(function(a,b){
                return a+b;
              },1000,1,1);//2
          // 回调函数是对象的方法，那么setTimeout使得方法内部的this关键字指向全局环境，不是定义时所在的对象
              var x=1;
              var obj={
                x:2,
                y:function(){
                  console.log(this.x);
                }
              }
              setTimeout(obj.y,1000);//1
              // 防止上述问题，一个解决方法，将obj.y放入一个函数
                  setTimeout(function(){
                    obj.y()
                  },1000);//2
              // 第二种方法，使用bind方法，将obj.y方法绑定到obj上
                  setTimeout(obj.y.bind(obj),1000);//2

      // setInterval():指定某个人物每隔一段时间执行一次，无限次的定时执行，直到窗口关闭；
          // 与setTimeout用法一致
              var timer = setInterval(function(){
                console.log("1");
              },1000)
          // 接受多个参数，他们会传入回调函数
          // 实现轮询，轮询URL的hash值是否发生变化的例子
              var hash = window.location.hash;
              var hashWatcher = setInterval(function() {
                if (window.location.hash != hash) {
                  updatePage();
                }
              }, 1000);

      // clearTimeout(),clearInterval()
          // setTimeout和setInterval返回一个整数，定时器编号；
          // 将整数传入clearTimeout和clearInterval函数，就能取消对应的定时器
              function f(){}
              var id1=setTimeout(f,1000);
              var id2=setInterval(f,1000);
              clearTimeout(id1);
              clearINterval(id2);
          // setTimeout和setInterval返回的整数是连续的，后一个比前一个整数值大1
              function f(){}
              setTimeout(f,1000);//10
              setTimeout(f,1000);//11
              setTimeout(f,1000);//12
          // 取消当前所有setTimeout的定时器
          /*
          (function (){
                var vId=setInterval(clearAllTimeouts,0)
                function clearAllTimeouts(){
                  var id=setTimeout(function(){},0)
                  while(id>0){
                    if(vId !==id){
                      clearTimeout(id);
                    }
                    id--;
                  }
                }
              })()
              */

      // debounce函数：防抖动 防止回调函数被频繁调用
          // 连续keydown事件，造成大量ajax通信；设置一个门槛值，表示两次ajax通信最小间隔时间
          // $("texarea").on("heydown",debounce(ajaxAction,2500));//jQuery
          function debounce(fn, delay){
            var timer = null; // 声明计时器
            return function() {
              var context = this;
              var args = arguments;
              clearTimeout(timer);
              timer = setTimeout(function () {
                fn.apply(context, args);
              }, delay);
            };
          }
          // 在2500s內用户再次点击，就会取消上一次定时器，然后在创建一个定时器；
          // 保证回调函数之间调用间隔至少2500s

      // 运行机制
          // setTimeout和setInterval的运行机制，是将指定的代码移除本轮事件循环，等到下一轮事件循环，在检查是否到了指定时间
          // setTimeout和setInterval的回调函数，必须等到本轮事件循环所有同步任务结束后才会开始执行
          // 不能保证，setTimeout和setInterval指定的任务一定会按照预定时间执行
              setInterval(function(){
                console.log("2")
              },1000)
              sleep(3000);
              function sleep(ms){
                var start=Date.now();
                while((Date.now()-start)<ms){}
              }
              // sleep需要3s才能执行完成，setInterval要延迟3s才开始生效
              // setInterval不会产生积累效应，即不会一下输出3个2，只会一会输出一个2

      // setTimeout(f,o)
          // setTimeout的作用：将代码延迟到指定时间执行
          setTimeout(function(){
            console.log("1")
          },0)
          console.log("2");
          // 2
          // 1
          // 将指定代码移除本轮事件循环，当前脚本的同步任务执行完毕，才会执行回调函数f
          // 也就是说setTimeout(f,o)会在下一轮事件循环开始执行

      // 应用
          // setTimeout(f,o)用途
          // 1、调整事件发生的顺序
              // HTML 代码如下
              // <input type="button" id="myButton" value="click">
              var input = document.getElementById('myButton');
              input.onclick = function A() {
                setTimeout(function B() {
                  input.value +=' input';
                }, 0)
              };
              document.body.onclick = function C() {
                input.value += ' body'
              };
              // 点击事件，先执行A,在执行C，在执行B
          // 2、用户自定义回调函数，通常在浏览器默认动作之前触发
              // keypress事件会在浏览器接收文本之前触发
              // HTML 代码如下
              // <input type="text" id="input-box">
              document.getElementById('input-box').onkeypress = function (event) {
                this.value = this.value.toUpperCase();
              }
              // 要求，每次输入文本，立即转为大写；
              // 实际，只能把输入前的字符转为大写，浏览器还没有接收到新的文本
              document.getElementById('input-box').onkeypress = function() {
                var self = this;
                setTimeout(function() {
                  self.value = self.value.toUpperCase();
                }, 0);
              }
              // 使得它在浏览器接收到文本之后触发

  // Promise对象
      // 概述
          //是JavaScript的异步操作解决方案；为异步操作提供统一接口
          // 起到代理作用，充当异步操作与回调函数的中介，使异步操作具备同步操作的接口
          // 首先，Promise是一个对象，也是一个构造函数
              function f1(resolve,reject){
                // 异步代码
              }
              var p1=new Promise(f1);
              // Promise接受一个回调函数f1作为参数，f1里面是异步代码
              // p1是Promise实例
          // Promise设计思想，所有异步任务都返回一个promise实例；
          // Promise实例有一个then方法，用来指定下一步的回调函数
              var p1=new Promise(f1);
              p1.then(f2);
      // Promise对象的状态
          // 异步操作未完成 （pending）
          // 异步操作成功（fulfilled）
          // 异步操作失败（rejected）
              // fulfilled和rejected合在一起称为resolved（已定型）
          // 变化途径
              // 从未完成到成功
              // 从未完成到失败
          // 结果
              // 异步操作成功，Promise实例传回一个值，状态变为fulfilled
              // 异步操作失败，Promise实例抛出一个错误，状态变为rejected
      // Promise构造函数
          var promise = new Promise(function(resolve,reject){
            if(/*异步操作成功*/true){
              resolve(value);
            }else{
              /*异步操作失败*/
              reject(new Error());
            }
          })
      // Promise.prototype.then():用来添加回调函数
          // then可以接受两个回调函数，第一个是异步操作成功时（状态变为fulfilled）的回调函数
          // 第二个是异步操作失败时（状态变为rejected）的回调函数；一旦状态改变，就调用相应的回调函数
              var p1 = new Promise(function (resolve, reject) {
                resolve('成功');
              });
              p1.then(console.log, console.error);
              // "成功"

              var p2 = new Promise(function (resolve, reject) {
                reject(new Error('失败'));
              });
              p2.then(console.log, console.error);
              // Error: 失败
      // then用法辨析
          var ff=new Promise(function(resolve){
            resolve("成功")
          })
          // 方法一
          ff().then(function(){
            return f2();
          }).then(f3);
          // f3回调函数的参数是f2运行的结果

          // 方法二
          ff().then(function(){
            f2();
            return;
          }).then(f3)
          // f3的参数为undefined

          // 方法三
          ff().then(f2()).then(f3)
          // f3回调函数的参数，是f2函数返回的函数的运行结果

          // 方法四
          ff().then(f2).then(f3)
          // f2会接收到f1()返回的结果

      // 实例：图片加载
          var preloadImage = function(path){
            return new Promise(function(resolve,reject){
              var image=new Image();
              image.onload=resolve;
              image.onerror=reject;
              image.path=path;
            })
          }
          preloadImage("https://example.com/my.jpg")
          .then(function(e){
            document.body.append(e.target);
          }).then(function(){
            console.log("加载成功")
          })

      // 小结
          //优点：
              // 让回调函数变成了规范的链式写法，程序流程清晰
              // 一整套接口，同时执行多个异步操作 等到他们的状态都改变以后，再执行一个回调函数
              // 为多个回调函数中抛出的错误，统一指定处理方法等到
              // 他的状态一旦改变，无论何时查询，都能得到这个状态
          // 缺点：编写难度比传统写法高，阅读不是一眼就能看懂的，必须在一堆then回调函数中理清逻辑

      // 微任务
          // Promise回调函数属于异步任务，会在同步任务之后执行
              new Promise(function(resolve,reject){
                resolve(1)
              }).then(console.log);
              console.log("2");
              // 2
              // 1
          // Promise回调函数不是正常的异步任务，而是微任务，
          // 区别在于，正常任务追加到下一轮事件循环，微任务追加到本轮事件循环；意味着微任务执行时间一定早于正常任务
              setTimeout(function() {
                console.log(1);
              }, 0);

              new Promise(function (resolve, reject) {
                resolve(2);
              }).then(console.log);

              console.log(3);
              // 3
              // 2
              // 1
              // then是本轮事件循环执行，setTimeout在下一轮事件循环开始执行

}
// 八、DOM
{}
// 九、事件
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



      // 与JSONP比较


  // Storage接口
  // History对象
  // Location对象，URL对象，URLSearhParams对象
  // ArrayBuffer对象，Blob对象
  // File对象，FileList对象，FileReader对象
  // 表单，FormData对象
  // IndexedDB API对象
  // Web Worker
}
// 十一、网页元素接口
{}
//






