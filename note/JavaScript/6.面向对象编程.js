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
              // 2.将这个空对象的原型，指向构造函数的prototype属性
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