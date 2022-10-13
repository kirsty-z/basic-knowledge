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