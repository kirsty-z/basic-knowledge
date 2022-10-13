// 数据类型
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
  //     0x：十六进制
  //     0b：二进制
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
        //   在函数内部读取有多少参数
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