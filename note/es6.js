// 简介
    // ECMAScript 6.0(简称es6),是JavaScript语言下一代标准
    // ECMAScript和JavaScript关系：前者是后者的规格，后者是前者的一种实现
    //Babel转码器：将ES6转码为ES5

// let const var
    //var变量提升，即变量可以在声明之前使用，值为undefined

// 变量的解构赋值
    // 解构：从数组对象提取值，对变量进行赋值
        let [a, b, c] = [1, 2, 3];
        let [head, ...tail] = [1, 2, 3, 4];
          head // 1
          tail // [2, 3, 4]
        // 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
        let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
        foo // "aaa"
        bar // "bbb"
        // 如果解构失败，变量的值等于undefined

// 字符串新增方法
    // String.fromCodePoint():有多个参数，则它们会被合并成一个字符串返回;可识别大于oxffff字符
    // String.raw():返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串

// 函数新增
    // 使用箭头（=>）定义函数
    // 注意
        // 箭头函数没有自己的this
        // 不能作为构造函数，不能使用new命令
        // 不可以使用arguments对象
        // 不可以使用yield命令
    // 不适合场合
        // 对象的属性建议使用传统的写法定义，不要用箭头函数定义。
        // 第二个场合是需要动态this的时候，也不应使用箭头函数（监听函数不能使用箭头函数）

// 数组扩展
    // 扩张运算符（...）
        function add(x, y) {
          return x + y;
        }
        const numbers = [4, 38];
        add(...numbers) // 42
    // 由于扩展运算符可以展开数组，所以不再需要apply()方法将数组转为函数的参数了
    // Array.from()：用于将两类对象转为真正的数组：
        // 类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
            Array.from('hello')
            // ['h', 'e', 'l', 'l', 'o']
        // 接受一个函数作为第二个参数，用来对每个元素进行处理，将处理后的值放入返回的数组
    // Array.of()方法用于将一组值，转换为数组

// 对象扩展
    // 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性行为
        // 描述对象的enumerable属性，称为“可枚举性”
        // 属性遍历方法
            // for...in：循环遍历自身和继承的可枚举（不含symbol）属性
            // Object.keys()：返回一个数组，包含对象自身的所有可枚举属性（不包含symbol）的键名
            // Object.getOwnPropertyNames():返回一个数组，包含对象自身属性键名（不包含symbol，包括不可枚举属性）
            // Object.getOwnPropertySymbols():返回一个数组，包含对象自身的所有symbol属性的键名
            // Reflect.ownKeys()：返回一个数组，包含对象自身所有键名
    // super关键字
        // this关键字总是指向函数所在的对象
        // super指向当前对象的原型对象
            const proto={
              foo:"hello"
            }
            const obj={
              foo:"world",
              find(){
                return super.foo
              }
            }
            Object.setPrototypeOf(obj,proto);
            obj.find();//hello

// 对象的新增方法
    // Object.is():比较两个值是否严格相等
    // Object.assign():对象合并
        // 注意点：Object.assign()实行的浅拷贝；拷贝的是对象的引用
    // __proto__:用来读取或者设置当前对象的原型对象（prototype）
    // Object.formEntries():Object.entries()逆操作；将一个键值对数组转为对象
    // Object.hasOwn():判断是否为自身属性

// 运算符扩展
    // 三元运算负 ？：
    // 链判断运算符 ?.
        // const firstName1 = (message
        //   && message.body
        //   && message.body.user
        //   && message.body.user.firstName) || 'default';
        // const firstName2=message?.body?.user?.firstName || "default";
        // if (myForm.checkValidity?.() === false) {}
        // 链判断符有三种
            // obj?.prop:对象属性是否存在
            // obj?.[expr]：同上
            // func?.[...args]:函数或者对象方法是否存在

// Set和Map
    // Set:类似于数组，成员是唯一的值，没有重复的值
          // Set本身是构造函数，用来生成Set数据
          // [...new Set(array)];//去重
          // 属性
              // Set.prototype.constructor:构造函数，默认就是Set函数
              // Set.prototype.size：set成员数
          // 方法
              // Set.prototype.add(value):添加某个值，返回set结构本身
              // Set.prototype.delete(value):删除某个值，返回布尔值
              // Set.prototype.has(value):表示该值是否是Set成员，返回布尔值
              // Set.prototype.clear():清除所有成员，没有返回值
          // 遍历方法
              // Set.prototype.keys()：返回键名的遍历器
              // Set.prototype.values()：返回键值的遍历器
              // Set.prototype.entries()：返回键值对的遍历器
              // Set.prototype.forEach()：使用回调函数遍历每个成员
              // 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构
                  // let arr = [...set];
                  // ['red', 'green', 'blue']
    // Map:类似与对象，也是键值对的集合；但键可以是各种类型的值
          let  o = new Map();
          // 接受一个数组做参数
          let m = new Map([["name","张三"],["age",12]]);
          // 属性和方法
              // Map.prototype.size：Map成员数
              // Map.prototype.set(key,value):设置key对应的键值为value；如果key存在，值更新
              // Map.prototype.get(key):获取key对应的值
              // Map.prototype.has(key):返回布尔值，判断key是否在Map对象中
              // Map.prototype.delete(key):删除某个键，返回布尔值
              // Map.prototype.clear():删除所有成员，没有返回值
          // 遍历
              // Map.prototype.keys()：返回键名的遍历器。
              // Map.prototype.values()：返回键值的遍历器。
              // Map.prototype.entries()：返回所有成员的遍历器。
              // Map.prototype.forEach()：遍历 Map 的所有成员。
          // Map 转为数组最方便的方法，就是使用扩展运算符（...）
              let  myMap = new Map()
              .set(true, 7)
              .set({foo: 3}, ['abc']);
              [...myMap]
              // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
          // Map转为对象
              function strMapToObj(strMap) {
                let obj = Object.create(null);
                for (let [k,v] of strMap) {
                  obj[k] = v;
                }
                return obj;
              }

              let myMap1 = new Map()
                .set('yes', true)
                .set('no', false);
              strMapToObj(myMap)
              // { yes: true, no: false }
          // 对象转为Map
          // Map转为JSON
          // JSON转为Map

// Promise()
    // 一个容器， 里面存放着异步操作；一个对象，可以获取异步操作的结果
    // 特点
        // 对象的状态不受外界影响
        // 一旦状态改变，就不会再变
    // 缺点
        // 一但新建立他就会立即执行，无法取消
        // 如果不设置回调函数，Promise内部抛出错误，不会反应到外部
        // 处于pending状态，无法得知进行到哪一步
        var promises = new Promise(function(resolve,reject){
          if(true){
            resolve();
          }else{
            reject();
          }
        })
        promises.then(function(value){}).catch(function(error){})
        // 内部抛出错误
            // 写法一
            let promise2 = new Promise(function(resolve, reject) {
              try {
                // throw new Error('test');
              } catch(e) {
                reject(e);
              }
            });
            promise2.catch(function(error) {
              console.log(error);
            });

            // 写法二
            const promise3 = new Promise(function(resolve, reject) {
              // reject(new Error('test'));
            });
            promise3.catch(function(error) {
              console.log(error);
              });
    // Promise.all([p1,p2,p3]):用于多个promise实例，包装成一个新的promise实例
        //所有实例状态变为fulfilled， Promise.all()的状态才会变为fulfilled；
            // 所有实例返回值组成一个数组，回调给Promise.all()的回调函数
        // 有一个实例状态变为rejected，Promise.all().状态就变为rejected；
            // 此时第一个返回rejected的实例的返回值，会传递给Promist.all()的回调函数
        // 注意：如果作为参数的Promise实例，自己定义了catch，那么一旦被rejected，并不会触发Promise.all()的catch方法
        // 只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求

    // Promise.race()：
          // const p = Promise.race([p1, p2, p3]);
        // 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变
        // 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数

    // Promise.resolve('foo')
      // 等价于
      new Promise(resolve => resolve('foo'))
    // Promise.reject()

// async函数
    // 内置执行器：直接调用asyncReadFile函数，然后就自动执行
    // 更好的语义
        // async 和await ：async表示函数里有异步操作；await表示紧跟在后面的表达式需要等待结果
    // 更广的适用性
        // async函数的await命令后面，可以是 Promise 对象和原始类型的值
    // 返回值是Promise
        // async函数的返回值是 Promise 对象；可以用then指定下一步操作

// Class基本语法
    // 类的由来
        //对象的模板
        // class 让对象原型写法更清晰、更面向对象编程法
              function Points(x,y){
                this.x=x;
                this.y=y;
              }
              Points.prototype.toString=function(){
                return '('+this.x+","+this.y+")";
              }
              let point = new Points(1,2);
              // class定义
              class Point1{
                constructor(x,y){//constructor构造方法
                  this.x=x;//this指向实例
                  this.y=y;
                }
                toString(){//定义了toString方法
                  return '('+this.x+","+this.y+")";
                }
              }
              typeof Point1;//function
              Point1 === Point1.prototype.constructor;//true
              // 类的数据类型是函数；类本身就指向构造函数
          // 使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致
          //类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
                // 使用Object.assign()方法可以一次向类添加多个方法
                class Point{
                  constructor(){}
                }

                Object.assign(Point.prototype,{toString(){},toValue(){}})
          // 类的内部所有定义的方法，都是不可枚举的;能用Object.getOwnPropertyNames()查看
                // Object.keys()不能查看，与es5不一致

    // constructor()方法
        //constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法

    // 类的实例
        // 类的属性和方法，除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）

    // 实例属性的新写法
    // 取值函数（getter）和存值函数（setter）
        // 在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为

    // 属性表达式
    // Class表达式
        const MyClass = class Me{
          getClassName(){
            return Me.name;
          }
        }
        let ins = new MyClass;
        ins.getClassName();//Me
        // Me.name;//ReferenceError: Me is not defined
        // 使用表达式定义了一个类。需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。
        // 在 Class 外部，这个类只能用MyClass引用

        // 如果内部没有使用到，可以省略Me
        const MyClass1=class{}

    // 静态方法
        // 类相当于实例的原型，所有在类中定义的方法，都会被实例继承；
        // 如果在方法前，加入static关键词，表示该方法不会被实例继承，而是通过类来调用
        // 如果静态方法包含this关键字，这个this指的是类，而不是实例
        class Foo1{
          static bar(){
            this.baz();
          }
          static baz(){
            console.log("hello");
          }
          baz() {
            console.log('world');
          }
        }
        Foo1.bar()//hello
        // 静态方法可以与非静态方法重名
        // 父类的静态方法，可以被子类继承
        // 静态方法也是可以从super对象上调用的
        class Foo{
          static classMethod(){
            return "hello";
          }
        }
        class Bar extends Foo{
          static classMethod(){
            return super.classMethod()+",too";
          }
        }
        Bar.classMethod();//“hello,too”

    // 私有方法和私有属性
        // class添加了私有属性，方法是在属性名之前使用#表示
        class IncreasignCounter{
          #count=0;
          get value(){
            return this.#count;
          }
          increment(){
            this.#count++;
          }
        }
        // #count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。
    // in:某个对象是否是类的实例
        // 判断私有属性时，只能用在类的内部

    // 静态块
    // 类的注意点
      //严格模式：类和模块的内部就是严格模式
      // 不存在提升
      // name属性
      // Generator方法：如果方法前面加*，表示该方法是一个Generator函数
      // this的指向：类方法内部如果有this，他默认指向类的实例；一旦单独使用该方法，可能报错

    // new.target属性
        // 属性一般存在构造函数中；返回new命令作用于的那个构造函数
        // Class 内部调用new.target，返回当前 Class

// Class的继承
    // 简介
        // class通过extends关键字实现继承，让子类继承父类的方法和属性
        // 子类必须在constructor方法中调用super(),否则报错
            // 因为子类的this对象，必须通过父类的构造函数完成塑造
            // 得到与父类同样的实例方法和属性，然后在对其加工，添加自己的实例属性和方法
            // 如果不调用super()，就得不到自己的this对象
        // es5继承机制：实例在前，继承在后
        // es6继承机制：继承在前，实例在后
        // super()：生成一个继承父类的this对象，没有这一步就没法继承
        // 注意：新建子类时，父类的构造函数会先运行一次

    // 私有属性和私有方法的继承
        // 子类无法继承父类的私有属性，或者说，私有属性只能在定义它的 class 里面使用
        class Foow{
          #p=1;
          getp(){
            console.log(this.#p);
          }
        }
        class Bars extends Foow{
          constructor(){
            super();
            console.log(this.getp());//1
          }
        }

    // 静态属性和静态方法的继承
        // 静态属性是通过浅拷贝实现继承的
        // 浅拷贝只会拷贝对象的内存地址
        class A { static foo = 100; }
        class B extends A {
          constructor() {
            super();
            B.foo--;
          }
        }

        const bb = new B();
        B.foo // 99
        A.foo // 100

    // Object.getPrototytpeOf()
        // Object.getPrototypeOf()方法可以用来从子类上获取父类

    // super关键字
        // super可以当函数使用；也可以当对象使用
        // 第一种情况：当做函数使用，代表父类的构造函数
            class Aa {}

            class Bb extends Aa {
              constructor() {
                super();
              }
            }
            // super()在这里相当于A.prototype.constructor.call(this)
        // 第二种情况：作为对象使用；在普通方法中，指向父类的原型；在静态方法中指向父类
            class Aaa {
              p() {
                return 2;
              }
            }
            class Ba extends Aaa {
              constructor() {
                super();
                console.log(super.p()); // 2
              }
            }
            let bbb = new Ba();//2
            // super.p()就相当于A.prototype.p()
            // super指向父类的原型对象,不能调用父类实例上的方法
          // 用在静态方法之中，这时super将指向父类，而不是父类的原型对象
              class Parent {
                static myMethod(msg) {
                  console.log('static', msg);
                }
                myMethod(msg) {
                  console.log('instance', msg);
                }
              }
              class Child extends Parent {
                static myMethod(msg) {
                  super.myMethod(msg);
                }
                myMethod(msg) {
                  super.myMethod(msg);
                }
              }
              Child.myMethod(1); // static 1
              var child = new Child();
              child.myMethod(2); // instance 2
              // super在静态方法之中指向父类，在普通方法之中指向父类的原型对象
          // 子类的静态方法中通过super调用父类的方法时，父类方法内部的this指向当前的子类，而不是子类的实例

    // 类的prototype属性和__proto__属性
        //每一个对象都有__proto__属性，指向对应的构造函数的prototype属性
        // class 同时有prototytpe属性和__prpto__属性，同时存在两天继承链
            //（1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
            //（2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
            class A1 {
            }
            class B1 extends A1 {
            }
            B1.__proto__ === A1 // true
            B1.prototype.__proto__ === A1.prototype // true
        // 实例的__proto__属性
            // 子类的原型的原型，是父类的原型

    // 原生构造函数继承
        // ECMAScript原生构造函数是无法继承的
            // Number() Boolean() String() Object() Function() Array() Date() RegExp() Error()

    // Mixin模式实现
        // 个对象合成一个新的对象，新对象具有各个组成成员的接口

// Module的语法
    // 概述
        // 在es6之前，社区指定了一些模块加载方案，主要CommonJS和AMD
            // CommonJS模块就是对象，输入时必须查找对象属性
                let {stat,exists,readfile} =require("fs");//加载fs模块的方法
                const { Script } = require("vm");
        // ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入
            // import {stat,exists,readfile} from "fs";
            //实质从fs模块加载了三个方法，其他方法不加载；这种加载称为编译时加载或者静态加载

    // 严格模式
        // es6模块自动采用严格模式
        // 严格模式限制
            // 变量必须声明后再使用
            // 函数的参数不能有同名属性，否则报错
            // 不能使用with语句
            // 不能对只读属性赋值，否则报错
            // 不能使用前缀 0 表示八进制数，否则报错
            // 不能删除不可删除的属性，否则报错
            // 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
            // eval不会在它的外层作用域引入变量
            // eval和arguments不能被重新赋值
            // arguments不会自动反映函数参数的变化
            // 不能使用arguments.callee
            // 不能使用arguments.caller
            // 禁止this指向全局对象
            // 不能使用fn.caller和fn.arguments获取函数调用的堆栈
            // 增加了保留字（比如protected、static和interface）
          // ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this

    // export命令
        // 功能模块主要由两个命令构成：export import
            // export 命令用于规定模块的对外接口
            // import 命令用于输入其他模块提供功能
        // 外部能够读取模块内部的某个变量，必须使用export关键字输出该变量
           /* export var firstName="hellen";
            export var lastName="Michle";
            // 或
            var firstName="hellen";
            var lastName="Michle";
            export {firstName,lastName};
            */
        // export命令除了输出变量，还可以输出函数或类（class）
        // 使用as关键字，重命名要输出的变量（类或者函数）的名字
          /*
              function v1(){}
              export {
                v1 as items1,
                v2 as item2,
              }
          */
        // export命令可以出现在模块的任何位置，只要处于模块顶层就可以

    // import命令
        // 使用export命令定义了模块对接接口后，就可以使用import命令加载这个模块
        // import 接受一个{}，里面指定从其他模块的变量名，名字要与被导出模块对外接口名称相同
        // import 可以使用as关键字对输入的变量名重命名
        // import命令具有提升效果，会提升到整个模块的头部，首先执行
              /**
                import {firstName,lastName} from "./profile.js"
                import {firstName as name} from "./profile.js";
                import "lodash";
                foo();
                import {foo} from "fa";//不会报错，因为import执行早于foo调用

               */

    // 模块的整体加载
        // 除了指定加载某个输出值，还可以整体加载
              // import * as fs from "fs"

    // export default
        // import 命令加载，需要知道加载的变量名或函数名；否则无法加载
        // 为了提供方便，不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出
              /**
               *export-default.js
              export default function(){
                console.log("hello")
              }
               */

              // 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字

              /**
               import customName from "./export-default.js"
               customName();//"hello"
               */

        // 使用export default时，import 不需要大括号
        // 如果想在一条import语句中，同时输入默认方法和其他接口
              // import _,{each,forEach}from "lodash";

    // export 和 import的复合写法
        //在一个模块中，先输入后输出同一个模块
            // export {foo ,bar} from "my_module"
            // 等同
            // import {foo,bar} from "my_module";
            // export {foo,bar};

            // export { default } from 'foo';
            // export { es6 as default } from './someModule';
            // import * as someIdentifier from "someModule";
            // export * as ns from "mod";

    // 模块的继承
        // 模块之间也有继承

    // 跨模块常量
        /**
         *constants.js
         export const A=1;
         export const B=2;
         export const C=3;

        *test.js
        import * as constants from "constants.js"
        console.log(constants.A);//1

        *main.js
        import {A,B} from "constants.js"
        console.log(A);//1

         *
         */
        // 要使用的常量非常多，可以专门建一个constants目录
        /**
         * // constants/db.js
          export const db = {
            url: 'http://my.couchdbserver.local:5984',
            admin_username: 'admin',
            admin_password: 'admin password'
          };

          * constants/user.js
          export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
         */

    // import()
          // import 命令会被JavaScript引擎静态分析，先于模块內的其他语句执行
              if(true){
                // import MyModule from "./myModule";//会报错
              }
          // require是运行时加载模块，import命令无法取代require的动态加载功能
          // 引入import()函数，支持动态加载模块
              // import(specifier)
              // 参数specifier，指定所要加载的模块的位置
                  // import().then().catch(err=>{})
                  // import()返回Promise对象，需要then（）处理函数
          // import()函数可以用到任何地方,不仅仅是模块，非模块的脚本都可以，运行时执行，什么时候运行到这一句，什么时候加载
          // import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同
          // import()类似于 Node.js 的require()方法，区别主要是前者是异步加载，后者是同步加载
          // 考虑到代码的清晰，更推荐使用await命令
               // 等同于
               /*
                  import("./widget").then(widget => {
                    widget.render(container);
                  });
                  const widget = await import('./widget.js');
                  widget.render(container);
                  */
        //import()适用场合
            // 按需加载
            // 条件加载
            // 动态的模块路径
        // 注意点
            // import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数
            // 同时加载多个模块
                /*
                Promise.all([
                  import('./module1.js'),
                  import('./module2.js'),
                  import('./module3.js'),
                ])
                .then(([module1, module2, module3]) => {
                  ···
                });
                */
            // 模块有defalut输出接口，可以参数直接获得
                /**
                 import('./myModule.js')
                  .then(myModule => {
                    console.log(myModule.default);
                  });
                  可以使用具名输入的形式
                 import('./myModule.js')
                  .then(({default: theDefault}) => {
                    console.log(theDefault);
                  });
                 * /
            // import 也可以在async函数之中
                /*
                const [module1, module2, module3] =
                await Promise.all([
                  import('./module1.js'),
                  import('./module2.js'),
                  import('./module3.js'),
                ]);
                */

// module加载实现
{
  // 浏览器加载
      //传统方法：浏览器同步下载JavaScript脚本，渲染引擎遇到<script>标签就会停下来，等脚本执行完毕，继续渲染
      // 浏览器允许异步加载脚本，下面两种语法
          // <script src="example.js" defer></script>
          // <script src="example.js" async></script>
          // defer:整个页面在内存中正常渲染结束（dom结构完全生成，以及其他脚本执行完毕），才会执行；即渲染完就执行
              // 多个defer脚本，出现顺序加载
          // async：一旦下载完，渲染引擎就会中断渲染，脚本执行完毕，再继续渲染；即下载完就执行
              // 多个async，不能包正顺序
      // ES6模块，使用<script>标签，要加入type="module"属性，都是异步加载；等同打开了defer属性；
          // 一旦使用async，<script type="module">就不会按照页面出现顺序执行，加载完就执行该模块
      // 对于外部模块脚本，需注意
          // 代码实在模块作用域运行，而不是在全局作用域运行；模块内部的顶层变量，外部不可见
          // 模块脚本自动采用严格模式，不管有没有使用use strict；
          // 模块之中，可以用import命令加载其他模块（.js后缀不可省略，需要提供绝对URL或相对URL）；也可以使用export命令输出对外接口
          // 模块之中，顶层this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字是无意义的
          // 同一个模块加载多次，将只执行一次
      // 利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中

  // ES6模块与CommonJS模块的差异
      // ES6模块与CommonJS三重大差异
          // CommonJS输出的是一个值的拷贝；ES6输出的是值的引用
          // CommonJS是运行时加载；ES6是编译时输出接口
          // CommonJS模块的require是同步加载模块；ES6模块的import是异步加载，有一个独立的模块依赖的解析阶段
      // CommonJS加载一个对象，该对象只有在脚本运行完成时才产生
      // ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成

  // Node.js的模块加载方法
    // 概述
        // JavaScript现在有两种模块，Es6模块，简称ESM；CommonJS模块，简称CJS
        // CommonJS是node.js专用，与ES6不兼容，语法上有明显差异，CommonJS使用require和module.exports；ES6模块使用import和export
        // Node.js要求ES6模块采用.mjs后缀名文件，才能使用export和import命令
            // 不希望采用.mjs后缀名，在package.json文件中，指定type字段为module
            // 一旦设置，该项目js脚本，就被解释为ES6模块
           /* {
              "type":"module"
            }*/
        // 这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs
            // 如果没有type字段，或者type设为common.js，则.js被解释为commonJS模块
        // 注意：ES6模块和CommonJS模块尽量不要混用；require命令不能加载.mjs文件，会报错，只有import才能加载.mjs文件
              // import不能加载.cjs文件，只有require才能加载.cjs文件

    // package.json的main字段
        // package.json文件只有两个字段可以指定模块入口的文件：main和exports
            // main字段，指定模块加载的入口文件；适合比较简单模块
            /*
            * ./node_modules/es-module-package/package.json
              {
                "type":"module",
                "main":"./src/index.js"
              }
              如果没有type字段，index.js就会被解释为 CommonJS 模块
              */
            // import命令可以加载这个模块
            // // ./my-app.mjs
            // import { something } from 'es-module-package';
            // 实际加载的是 ./node_modules/es-module-package/src/index.js

    // package.json的exports字段
        // exports字段的优先级高于main，它有多种用法
            // 子目录别名
              // package.json文件的exports字段可以指定脚本或子目录的别名
              /**
               ./node_modules/es-module-package/package.json
               {
                {
                  "exports":{
                    "./submodule":"./src/submodule.js"
                  }
                }
               }
              //  加载文件
              import submodule from "es-module-package/submodule";
              // 加载 ./node_modules/es-module-package/src/submodule.js
               *
              // 子目录
              {
                {
                  "exports":{
                    "./features":"./src/features"
                  }
                }
              }

              import features from "es-module-package/features/x.js"
              // 加载 ./node_modules/es-module-package/src/features/x.js
               */
            // main的别名
                // exports 的别名如果是 . 就代表模块的主入口，优先级高于main字段，可以简写成exports字段的值
                /*
                {
                  "exports": {
                    ".": "./main.js"
                  }
                }

                // 等同于
                {
                  "exports": "./main.js"
                }
                */
              //  exports只有支持ES6的node.js才认识，所以可以用来兼容旧版本的node.js
                /**
                 {
                  "main":"./main-legacy.js",
                  "exports":{
                    ".":"./main-legacy.js"
                  }
                 }
                 * /
            // 条件加载
                //  利用 .  别名，可以指定ES6和CommonJS不同入口
                /**
                 {
                  "type": "module",
                  "exports": {
                    ".": {
                      "require": "./main.cjs",
                      "default": "./main.js"
                    }
                  }
                }
                 */
    //CommonJS模块加载ES6模块
       /*
        (async ()=>{
          import(./my-app.mjs);
        })*/

    // ES6模块加载CommonJS模块
        // ES6 模块的import命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项
        /**
         import packageMain from 'commonjs-package';
          const { method } = packageMain;
         * 另一种变通方法就是使用Node.js内置的module.createRequire()方法
          // cjs.cjs
          module.exports = 'cjs';

          // esm.mjs
          import { createRequire } from 'module';
          const require = createRequire(import.meta.url);
          const cjs = require('./cjs.cjs');
          cjs === 'cjs'; // true
         */

    // 同时支持两种格式模式
    // Node.js的内置模式
        // 可以加载整体，也可以加载指定输出项
        // import EventEmitter from "events";
        // import {readFile} from "fs";
    // 加载路径
        // ES6模块的加载路径必须给出脚本的完整路径，不能省略后缀名
        // import和package.json文件的main字段如果省略脚本的后缀名，会报错
    // 内部变量
        // ES6模块中this指向undefined
        // CommonJS中this指向的是当前模块
        // ES6模块中不存在的
          // arguments
          // require
          // module
          // exports
          // __filename
          // __dirname

  // 循环加载
      // CommonJS模块的加载原理
          // CommonJS的一个模块，就是一个脚本文件。require第一次加载脚本，就会执行整个脚本，然后在内存生成一个对象
             /* {
                id:"...",
                exports:{},
                loader:true,
                ...
              }
              */
            // id属性，模块名
            // exports：模块输出的各个接口
            // loader是一个布尔值，表示该脚本是否执行完毕
          // 用到模块时，就在exports属性上取值；即使使用require命令，也不会在执行该模块，而是在缓存中取值
          // 也就是说，CommonJS无论加载多少次，只会在第一次加载执行一次，以后再加载，只会返回第一次运行的结果，除非手动清除缓存
      // CommonJS模块的循环加载
          // CommonJS模块的重要特性是加载执行，即脚本在require时，就会全部执行；
          // 一旦某个模块被循环加载，就只输出已执行的部分，还未执行的部分不会输出
      // ES6是动态引用，如果使用import从一个模块加载变量，变量不会被缓存，而是成为一个指向被加载模块的引用

}






