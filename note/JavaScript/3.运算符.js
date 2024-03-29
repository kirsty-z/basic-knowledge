
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
                ~-3;  //2  -1-(-3)
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