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