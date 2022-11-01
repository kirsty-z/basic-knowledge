/*
 * ES6笔记
 * 本程序由益鸽网络出品,未经授权请不要在网络传播.
 * Copyright (c) 2015~2017 <http://buffge.com> All rights reserved.
 * Author: buff <admin@buffge.com>
 * Created on : 2017-11-23, 17:42:27
 * QQ:1378504650
 */
/* global NaN, http */

"use strict";
/**
 * 判断2个对象是否相等
 * @todo 我觉得如果不在乎属性顺序的话可以直接toString 然后比较<br>
 * @param {type} a
 * @param {type} b
 * @returns {Number|String|Boolean}
 */
function isEqual(a, b) {
    //如果a和b本来就全等
    if (a === b) {
        return true;
        //我不知道这个是干嘛的
//        //判断是否为0和-0
//        return a !== 0 || 1 / a === 1 / b;
    }
    //判断是否为null和undefined
    if (a === null || b === null) {
        return a === b;
    }
    //接下来判断a和b的数据类型
    let classNameA = toString.call(a),
            classNameB = toString.call(b);
    //如果数据类型不相等，则返回false
    if (classNameA !== classNameB) {
        return false;
    }
    //如果数据类型相等，再根据不同数据类型分别判断
    switch (classNameA) {
        case '[object RegExp]':
        case '[object String]':
            //进行字符串转换比较
            return '' + a === '' + b;
        case '[object Number]':
            //进行数字转换比较,判断是否为NaN
            if (+a !== +a) {
                return +b !== +b;
            }
            //判断是否为0或-0
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }
    //如果是对象类型
    if (classNameA === '[object Object]') {
        //获取a和b的属性长度
        let propsA = Object.getOwnPropertyNames(a),
                propsB = Object.getOwnPropertyNames(b);
        if (propsA.length !== propsB.length) {
            return false;
        }
        for (let i = 0; i < propsA.length; i++) {
            let propName = propsA[i];
            //如果对应属性对应值不相等，则返回false
            if (!isEqual(a[propName], b[propName])) {
                return false;
            }
        }
        return true;
    }
    //如果是数组类型
    if (classNameA === '[object Array]') {
        if (a.toString() === b.toString()) {
            return true;
        }
        return false;
    }
}
// ES2015 就是ES6
// ES2016 就是只新增了数组实例的includes方法和指数运算符 相当于ES6.1
// 查看各大浏览器ES6支持度 http://kangax.github.io/compat-table/es6/ 或者http://ruanyf.github.io/es-checker/
// 设置npm仓库为国内镜像 npm config set registry http://registry.npm.taobao.org
// cnpm安装的话 netbeans会很卡,会多出很多@文件
// 查看所有npm 全局安装的模块 npm list --depth=0 -global
/*
 * 全局安装babel 工具 npm install -g babel
 * 全局安装babel-cli 工具 npm install -g babel-cli
 * "babel-preset-es2015": "*" 这个必须安装在项目中,全局安装不行
 * 必须现在当前目录下新建一个.babelrc文件
 * 里面写上{"presets": ["es2015"],"plugins": []} 这里就是将es6转换为es5
 * babel js1.js -o js2.js 将js1转码为ES5 并输出到js2.js文件中
 * babel ./src -d ./es5src 将src目录下所有js文件转码为es5并输出到es4src中
 **/

/* input.map(item => item + 1);
 * 会被转换为:
 input.map(function (item) {
 return item + 1;
 });
 */
/*
 * let aa = 12;会被转换为: var aa = 12;
 */
//let 定义变量 只在作用域内生效 除了那个大括号就没用了
{
    let aa = 12;
    var bb = 13;
    console.log(aa); //12
    console.log(bb); //13
}
//因为aa是let定义的 所以他只在{}内有效,这里会报错 aa未定义
try {
    console.log(aa);
} catch (e) {
    //打印出错误信息
    console.log(e.toString()); //ReferenceError: aa is not defined
}
try {
    console.log(bb); //13
} catch (e) {
    console.log(e.toString());
}
//在代码块内，使用let命令声明变量之前，该变量都是不可用的
//如果是用var 定义,先引用会报undefined,比如下面这个
console.log(aaa);
var aaa = 1;
//如果是let定义的 会直接报ReferenceError: 变量 is not defined
//let 不运行重复声明
//// 报错
//function func1() {
//    let a = 10;
//    var a = 1;
//}
// 报错
//function func2() {
//    let a = 10;
//    let a = 1;
//}
//const 命令 声明一个只读的常量一旦声明 不可以再改变
// 和let一样有作用域 定义的时候必须赋值
// cosnt 定义的常量 必须先定义才能使用
// const 定义的常量不可以重复声明
const PI = 3.1415;
//不能这样
//const PI
// PI = 3.1415
// const 本质上是引用不可以改变,但是对象的属性是可以改变的
//如:
const cst1 = {val0: 11};
cst1.val1 = 12;
cst1.val2 = 13;
console.log(cst1.val0); //11
console.log(cst1.val1); //12
console.log(cst1.val2); //13
//如果想要完全的不允许改变对象,可以用Object.freeze();
const cst2 = Object.freeze(cst1);
console.log(cst2.val1); //12
console.log(cst2.val2); //13
try {
    cst2.val3 = 14; //这里会失败 因为cst2 对象是不允许扩展的
    console.log(cst2.val3);
} catch (e) {
    console.log(e.toString()); //TypeError: Cannot add property val3, object is not extensible
}
let getEnv = function () {
    if ("object" === typeof window) {
        return "browser";
    } else if ("object" === typeof global) {
        return "node";
    }
    return null;
};
let currentEnv = getEnv();
console.log("当前环境是: " + (currentEnv ? currentEnv : "未定义环境"));
//解构变量,变量必须要实现iterator接口
let [a, b, , d, ...e] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(a); //0
console.log(b); //1
console.log(d); //3
console.log(e); //[ 4, 5, 6, 7, 8, 9 ]
//可以设置结构默认值,如果第二个值是空 就是什么都不写
//或者是undefined就跳过 null都不行,
let[a2, a3 = "a3", a4] = ["a1", undefined, "a4"];
console.log(a2); //a1
console.log(a3); //a4
console.log(a4); //undefined
//对象的解构
//这里因为变量名不跟对象的一致必须这样写
let {aa: pro1, bb: pro2} = {aa: 12, bb: 13, cc: 14};
console.log(pro1); //12
console.log(pro2); //13
//如果解构的对象名和对象名一直可以简写:
let{pro3, pro4} = {pro3: 'pro3', pro4: 'pro4'};
//其实上面的原格式是let{pro3:pro3, pro4:pro4} = {pro3: 'pro3', pro4: 'pro4'};
console.log(pro3); //pro3
console.log(pro4); //pro4
//我测试的关联数组要按照对象的方式结构,键为数字的时候也要写上
let arr1 = [11];
arr1['aa'] = 12;
arr1['bb'] = 13;
let {0: aa0, aa: aa1, bb: bb1} = arr1;
console.log(aa0); //11
console.log(aa1); //12
console.log(bb1); //13
//如果解构赋值给一个已经定义的变量 要加() 不能把{}放在开头
let x1;
//{x: x1} = {x: 1}是错误的写法 必须要加()
({x: x1} = {x: 1});
console.log(x1); //1
//字符串的结构
//let [char1, char2, , , char5] = "HelloWorld"; 这种是数组方式,索引从0开始
//下面的是用对象解构 字符串都有一个length属性
let {0: char1, 1: char2, 4: char5, length: str_len} = "HelloWorld";
console.log(char1); //H
console.log(char2); //e
console.log(char5); //o
console.log(str_len); //10
//数字和布尔值的结构
//解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
//我觉得这里是为了判断是否是数字或布尔值
{
    let {toString: s} = 123;
    console.log(s === Number.prototype.toString); // true
}
{
    let {toString: s} = true;
    console.log(s === Boolean.prototype.toString); // true
}
//由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
//函数参数的解构赋值
{
    let logArr = function ([...arr]) {
        let str = "";
        for (let v in arr) {
            str += arr[v];
        }
        console.log(str);
    };
    logArr([1, 2, 3, 5, 4]); //12354
}
{
    let str = '\u0061';
    console.log(str); //a
    console.log('\u91d1'); //unicode表示法 金
    //unicode超过ffff的表示法 这里没有超过也可以用 金
    //中文不会超过\uffff
    console.log('\u{91d1}');
    console.log('\x48\x65\x6c\x6c\x6f'); //16进制表示法 Hello 暂时不知道怎么输出中文
    let chineseWordArr = [0xe4, 0xb8, 0xad];
    //先将中文数组转换为utf-8 url格式 join是将数组转换为字符串
    let code = chineseWordArr.map(item => '%' + item.toString(16)).join('');
    //再将utf-8格式的字符串转换为中文
    console.log(decodeURI(code)); // => 中
    console.log("金".charCodeAt().toString(16));
}
/**
 * 字符串转换为unicode格式
 * @todo ES6 新方法codePointAt()就是为了超过ffff的字符准备的,<br>
 * 但是我现在觉得没什么用
 * @param {type} str 需要转换的字符串
 * @returns {String} unicode字符串
 */
let strToUnicode = function (str) {
    /**
     * let s = '������a';
     * //可以根据codePointAt()的值是否大于0xffff判断,如果大于
     * //就将i++;
     * console.log(s.codePointAt(0).toString(16)); // "20bb7"
     * console.log(s.codePointAt(2).toString(16)); // "61"
     */
    let result = '';
    //将每一个字符都转为\u格式
    for (let char of str) {
        //将当前字符转为16进制unicode字符
        let hexCode = char.codePointAt(0).toString(16);
        result += "\\u";
        switch (hexCode.length) {
            case 1:
                result += "000";
                break;
            case 2:
                result += "00";
                break;
            case 3:
                result += "0";
                break;
            case 4:
                break;
            case 5:
                result += "{";
                result += hexCode;
                result += "}";
                continue;
                break;
            default :
                throw new Error('unicode字符错误');
        }
        result += hexCode;
    }
    return result;
};
//\u0070\u0068\u0070\u662f\u6700\u597d\u7684\u8bed\u8a00\u{20bb7}\u0061
console.log(strToUnicode("php是最好的语言������a"));
/**
 * unicode 转中文
 * @todo 我感觉好像不必要啊
 * @param {type} ucode
 * @returns {unresolved}
 */
let unicodeToStr = function (ucode) {
    return ucode;
};
//php是最好的语言������a
console.log(unicodeToStr('\u0070\u0068\u0070\u662f\u6700\u597d\u7684\u8bed\u8a00\u{20bb7}\u0061'));
//从数字转换为字符串
//ES5的fromCharCode()不能识别大于0xffff的字符串
//ES6 新增fromCodePoint
console.log(String.fromCodePoint(0x20BB7)); //������
//for of是迭代器
//判断字符串中是否包含,以什么开头,以什么结尾
{
    let s = 'Hello world!';
    console.log(s.startsWith('Hello')); // true
    console.log(s.endsWith('!')); // true
    console.log(s.includes('o wor')); // true
    console.log(s.includes('o woe')); // false
    //也接受第二个参数 表示从第几个字符开始判断
    console.log(s.startsWith('Hello', 2)); // false
    console.log(s.startsWith('llo', 2)); // true
    //endsWith表示针对前几个字符
    console.log(s.endsWith('lo', 5)); // true
    console.log(s.endsWith('ll', 5)); // false
    console.log(s.includes('o wor', 4)); // true
    console.log(s.includes('o wor', 5)); // false
}
//字符串重复复制函数 repeat()
console.log("-=".repeat(5)); //-=-=-=-=-=
//字符串填充函数 (ES2017) 默认是空格 这个尽量别用,谷歌和火狐支持
console.log('1'.padStart(4, '0')); // '0001'
console.log('1'.padStart(4)); // '   1'
console.log('1'.padEnd(5, '0')); // '10000'
//模版字符串
{
    let orinigalStr = "<p>这是原始字符串</p>\n";
    let addContent = ({name, age, gender}) =>
            `<p>${name}'s age is ${age}</p>
<p>${name}'s gender is ${gender}</p>`;
    orinigalStr += addContent({name: "buffge", age: 23, gender: "男"});
    console.log(orinigalStr);
//     <p>这是原始字符串</p>
//     <p>buffge's age is 23</p>
//     <p>buffge's gender is 男</p>
}
//如果要调用字符串的话这样就行了.
{
    let str = '(name) => `Hello ${name}!`';
    let tempGreet = eval.call(null, str);
    console.log(tempGreet('buffge')); // "Hello buffge!"
    /*
     * 也可以用这种方法写
     let str = 'return ' + '`Hello ${name}!`';
     let tempGreet = new Function('name', str);
     tempGreet('buffge') // "Hello buffge!"
     */
}
//模版编译 暂时看不懂
//unicode匹配
{
    /**
     * 计算unicode字符的长度
     */
    let unicodeStrlen = function (uStr) {
        let result = uStr.match(/[\s\S]*/gu);
        return result.length;
    };
    let s = '������������';
    console.log(s.length); //4
    //这里我不知道为什么0 1字符会是这2个
    console.log(s.charCodeAt(0).toString(16)); //d842 1101 1000 0100 0010
    console.log(s.charCodeAt(1).toString(16)); //dfb7 1101 1111 1011 0111
    console.log(s.charCodeAt(2).toString(16));
    console.log(s.charCodeAt(3).toString(16));
    console.log(s.codePointAt(0).toString(16)); //20bb7 10 0000 1011 1011 0111
    console.log(unicodeStrlen(s)); //2
}
//解析json
{
    let json_str = '{"aa":12,"bb":13,"cc":{"aa":12,"bb":13,"cc":13,"dd":14},"dd":14,"ee":[{"aa":12},{"bb":{"aa":12,"bb":13}}]}';
    let json0 = {
        bb: 13,
        aa: 12,
        dd: 14,
        cc: {
            aa: 12, bb: 13, cc: 13, dd: 14
        },
        ee: [
            {
                aa: 12
            },
            {
                bb: {
                    aa: 12,
                    bb: 13
                }
            }
        ]

    };
    //将字符串解析为对象
    let json1 = JSON.parse(json_str);
    //将对象解析为字符串
    let json_str2 = JSON.stringify(json0);
    //只解析第二个参数中的内容 这里的4表示换行时候缩进是4个空格
    //如果第二个参数为null或者未提供就是解析所有
    let json_str3 = JSON.stringify(json0, ["aa", "ee"], 4);
    //这里isEqual()不管顺序,所以是true
    console.log("json0 === json1 = " + isEqual(json0, json1)); //true
    //toString(),要求顺序也一样
    console.log("json_str2 === json_str = " + isEqual(json_str2, json_str)); //false
    /**
     * {
     *     "aa": 12,
     *     "ee": [
     *         {
     *             "aa": 12
     *         },
     *         {}
     *     ]
     * }
     **/
    console.log(json_str3);
}
//返回正则表达式的修饰符
{
    let reg = new RegExp(/abc/gu);
    //返回正则的正文
    console.log(reg.source); //abc
    //返回正则的修饰符
    console.log(reg.flags); //gu
}

//js 正则
{
//string.prototype.search(); 搜索字符串中字符串的索引 没有返回-1
//只返回第一个
    console.log("Hello World".search(/llo/)); //2
    console.log("Hello World Hello World".search(/llo/g)); //2
    console.log("Hello World Hello World".search(/llo1/g)); //-1
    //indexOf也可以计算出,但是search中可以放正则
    console.log("Hello World Hello World".indexOf('llo')); //2
    //返回字符串的[5,8) 这个跟正则无关就是记一下
    console.log("Hello World Hello World".slice(5, 8)); // Wo
//string.prototype.match();
    console.log("Hello World Hello World".match(/llo/g).join('')); //llollo
    let str1 = `
fhjh倪虹洁13812345678138123456713934782312sfjk1806666
7777打防结合发达国进口18787878787
`.replace(/\n/g, ''); //如果这里不加g无法删除换行,因为js默认是一行搜索
//    for (let char of str1) {
//        console.log(char + ":" + char.charCodeAt(0).toString(16));
//    }
    let m_1 = str1.match(/1[3578]\d{9}/g).join("\n");
    //如果match中有组 并且是g 全局捕获 那么不能获取子组,只能返回所有捕获内容
    let m_2 = str1.match(/(1[3578]\d)\d{8}/g);
    let m_3 = [];
    let r1 = /(1[3578]\d)\d{8}/g;
    //当需要用到全局子捕获组的时候用exec, match只能获取内容,不能获取子组
    while (1) {
        //这里必须定义正则,因为/g 就是匹配完上一次就继续匹配下面的值
        //如果直接 /(1[3578]\d)\d{8}/g.exec 那么就会无限循环
        let t = r1.exec(str1);
        if (null === t) {
            break;
        }
        m_3.push(t);
    }

    /**
     * 匹配中文
     * 2E80−2EFF中日韩部首补充
     * 2F00−2FDF康熙部首
     * 2FF0−2FFF表意文字描述符
     * 3000−303F中日韩符号和标点 这几个里面很多都不显示 所以不算
     *
     * \u3400-\u4dbf :中日韩统一表意文字扩展A
     * \u4dc0−\u4dff :易经六十四卦符号
     * \u4e00−\u9fff : 中日韩统一表意文字
     * \uf900−\ufaff 中日韩兼容表意文字
     */
    let m_4 = str1.match(/[\u3400-\u9fff\uf900-\ufaff]+/g);
    /*
     13812345678
     13812345671
     18066667777
     18787878787
     */
    console.log(m_1);
    //(4) ["13812345678", "13812345671", "18066667777", "18787878787"]
    console.log(m_2);
    /**
     (2) ["13812345678", "138", index: 7, input: "fhjh倪虹洁13812345678138123456713934782312sfjk18066667777打防结合发达国进口18787878787"]
     (2) ["13812345671", "138", index: 18, input: "fhjh倪虹洁13812345678138123456713934782312sfjk18066667777打防结合发达国进口18787878787"]
     (2) ["18066667777", "180", index: 43, input: "fhjh倪虹洁13812345678138123456713934782312sfjk18066667777打防结合发达国进口18787878787"]
     (2) ["18787878787", "187", index: 63, input: "fhjh倪虹洁13812345678138123456713934782312sfjk18066667777打防结合发达国进口18787878787"]
     */
    for (let item of m_3) {
        console.log(item);
    }
    console.log(m_4); //(2) ["倪虹洁", "打防结合发达国进口"]
//dotALl模式 s
//正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是行终止符（line terminator character）除外。
//以下四个字符属于”行终止符“。
//U+000A 换行符（\n）
//U+000D 回车符（\r）
//U+2028 行分隔符（line separator）
//U+2029 段分隔符（paragraph separator）
//但是加了修饰符s之后 .代表所有
    let r2 = /aa.bb/;
    let r3 = /aa.bb/s;
    console.log("没加s的时候 = " + "aa\nbb".match(r2));
    console.log("加s的时候(dotAll模式) = " + "aa\nbb".match(r3));
    //先行断言 匹配后面跟着y的x
    let r4 = /x(?=y)/g;
    //共匹配到2个x
    //(2) ["x", "x"]
    console.log('xyxzxy'.match(r4));
    //先行否定断言 匹配后面不是跟着y的数字
    let r5 = /\d+(?!y)/g;
    //共匹配到3个
    //(3) ["123", "23", "456"]
    console.log('123x234y456z'.match(r5));
    //后行断言 匹配前面跟着y的数字
    let r6 = /(?<=y)\d+/g;
    //共匹配到1个
    //["234"]
    console.log('x123y234z456'.match(r6));
    //后行否定断言 匹配前面不是跟着y的数字
    let r7 = /(?<!y)\d+/g;
    //共匹配到3个
    //(3) ["123", "34", "456"]
    console.log('x123y234z456'.match(r7));
}
//数值扩展
//0b|0B 表示二进制数字
//0o|0O 表示八进制数字
//0x 16进制数 是本来就有的
console.log(0b11); //3
console.log(0o17); //15
console.log(0x17); //23
//JavaScript 所有数字都保存成 64 位浮点数 所以精确程度只有53个二进制位
//在严格模式之中，八进制就不再允许使用前缀0表示
console.log(Number.MAX_SAFE_INTEGER); //Math.pow(2, 53) - 1
console.log(Number.MAX_VALUE);
console.log(Number.MIN_SAFE_INTEGER); //-Math.pow(2, 53) +1
console.log(Number.MIN_VALUE);
//Math.trunc方法用于去除一个数的小数部分，返回整数部分。
console.log(Math.trunc(4.9)); // 4
console.log(Math.trunc(-4.1)); // -4
console.log(Math.trunc(-4.9)); // -4
console.log(Math.trunc(-0.1234)); // -0
//指数运算符（**）这是ES2017
//console.log(2 ** 3);//8
{
    // 函数参数默认值
    let Person = function (name = 'buffge', age = 23) {
        this.name = name;
        this.age = age;
        this.info = function () {
            console.log(this.name);
            console.log(this.age);
        };
    };
    let p1 = new Person();
    let p2 = new Person("哈士奇", 1);
    p1.info(); //buffge 23
    p2.info(); //哈士奇 1
    //函数的length 参数 函数的期待参数数量 不包括有默认参数值的形参
    let func1 = function (a, b, c = 1) {
        console.log(func1.length); //2
        console.log(func1.name); //func1
    };
    console.log(func1.length); //2
    func1();
    //箭头函数
    let arrow1 = (x, y) => x + y;
//    相当于
    let _arrow1 = function (x, y) {
        return x + y;
    };
    console.log(arrow1(1, 2)); //3
    //如果有一条以上语句 要加大括号和return
    let arrow2 = (x, y) => {
        console.log(x + ':' + y);
        return x + y;
    };
    //2:3
    //5
    console.log(arrow2(2, 3));
    //如果返回对象要加() 因为对象使用大括号包起来的,不加就会有歧义
    let arrow3 = (x, y) => ({name: x, age: y});
    console.log(arrow3('buffge', 23)); //{name: "buffge", age: 23}
    // 箭头函数有几个使用注意点。
    //（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
    //这个暂时不太理解
    function Timer() {
        this.s1 = 0;
        this.s2 = 0;
        // 箭头函数
        setInterval(() => this.s1++, 1000);
        // 普通函数
        setInterval(function () {
            this.s2++;
        }, 1000);
    }
    //这里实例化之后node不会关闭,因为这个定时器每秒都会执行
    //let timer = new Timer();
    //setTimeout(() => console.log('s1: ', timer.s1), 3100);// s1: 3
    //setTimeout(() => console.log('s2: ', timer.s2), 3100);// s2: 0
    //（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
    //（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
    //（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
}
//数组的扩展
{
    //展开运算符 ...
    console.log(...[3, 2, 1, 0]); //3 2 1 0
    //将字符串转为数组
    console.log([...'hello']); //[ "h", "e", "l", "l", "o" ]
    //任何 Iterator 接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
    if ('browser' === getEnv()) {
        let nodeList = document.querySelectorAll('.for-spread');
        let for_spread = [...nodeList];
        //(3) [div.for-spread, div.for-spread, div.for-spread]
        console.log(for_spread);
    }
    //将对象转为数组 Array.form()
    //Array.from方法用于将两类对象转为真正的数组：
    //类似数组的对象（array-like object）和可遍历（iterable）的对象
    //（包括 ES6 新增的数据结构 Set 和 Map）。
    //将一组值转为数组 Array.of()
    //以后就用这个定义数组 替代new Array();
    let arr1 = Array.of(1, 2, 3, 4);
    console.log(arr1); //(4) [1, 2, 3, 4]
    //数组填充 fill()
    console.log(['a', 'b', 'c'].fill(7)); // [7, 7, 7]
    console.log(new Array(3).fill(7)); // [7, 7, 7]
    //第二个参数表示起始索引闭区间,第三个参数结束索引,开区间
    //表示将原数组的第[3,4) 个元素填充为'k'
    console.log([1, 2, 3, 4, 5].fill('k', 3, 4)); //(5) [1, 2, 3, "k", 5]
    //数组实例的遍历方法
    //keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
    // 0
    // 1
    for (let index of ['a', 'b'].keys()) {//键
        console.log(index);
    }
    //这个在chrome 62.0.3202.94 和node9.2 都不能用 以后就用entries好了
    // 'a'
    // 'b'
//    for (let elem of ['a', 'b'].values()) {//值
//        console.log(elem);
//    }

    // 0 "a"
    // 1 "b"
    for (let [index, elem] of ['a', 'b'].entries()) {//数组的整个键值对记录
        console.log(index, elem);
    }
    //数组是否包含某个值 includes
    console.log([1, 2, 3].includes(2)); // true
    console.log([1, 2, 3].includes(4)); // false
    console.log([1, 2, Number.NaN].includes(Number.NaN)); // true
    //Map 和 Set 数据结构有一个has方法，需要注意与includes区分。
    /* ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
     * forEach(), filter(), every() 和some()都会跳过空位。
     * map()会跳过空位，但会保留这个值
     * join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
     */
// forEach方法
    [, 'a'].forEach((x, i) => console.log(i)); // 1

// filter方法
    ['a', , 'b'].filter(x => true); // ['a','b']

// every方法
    [, 'a'].every(x => x === 'a'); // true

// some方法
    [, 'a'].some(x => x !== 'a'); // false

// map方法
    [, 'a'].map(x => 1); // [,1]

// join方法
    [, 'a', undefined, null].join('#'); // "#a##"

// toString方法
    [, 'a', undefined, null].toString(); // ",a,,"
//ES6 则是明确将空位转为undefined。

//Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。

    Array.from(['a', , 'b']);
// [ "a", undefined, "b" ]
//扩展运算符（...）也会将空位转为undefined。
    [...['a', , 'b']];
// [ "a", undefined, "b" ]
}
//对象的扩展
{
    //对象的简洁表示法 ES6 允许直接写入变量和函数，作为对象的属性和方法
    let name = 'buffge';
    const obj1 = {name};
    // 等同于
    const _obj1 = {name: 'buffge'};
    console.log(obj1); // {name: "buffge"}
    //方法简写
    const obj2 = {
        sayHello() {
            return "Hello!";
        }
    };
// 等同于
    const _obj2 = {
        sayHello: function () {
            return "Hello!";
        }
    };
    console.log(obj2.sayHello()); //Hello!
    //属性名表达式 ES6允许将表达式放在方括号内
    let propKey = 'private';
    let propKey2 = {name: 'obj'}; //如果是对象会转为 [object Object] 小心
    let obj3 = {
        [propKey]: true,
        ['na' + 'me']: 'buffge',
        [propKey2]: 'errorPropName'
    };
    console.log(obj3); //{private: true, name: "buffge", [object Object]: "errorPropName"}
    //setter 和getter
    let obj4 = {
        _name: "someName",
        get name() {
            return this._name + " for get";
        },
        set name(val) {
            this._name = val + " with set";
        }
    };
    console.log(obj4.name); //someName for get
    obj4.name = "buffge";
    console.log(obj4.name); //buffge with set for get
    //判断2个值是否相等
    //Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等,
    //与严格比较运算符（===）的行为基本一致。
    console.log(Object.is('foo', 'foo')); // true
    console.log(Object.is({}, {})); // false
//不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
    console.log(+0 === -0); //true
    console.log(NaN === NaN); // false
    console.log(Object.is(+0, -0)); // false
    console.log(Object.is(NaN, NaN)); // true
    //对象的合并 Object.assign() 如果后面的属性和目标属性相冲,则目标属性被覆盖
    //由于undefined和null无法转成对象，所以如果它们作为第一个参数，就会报错。
    //如果undefined和null 作为第二或n个参数,则会跳过
    //assign是浅拷贝 有对象时候 只复制引用
    const target = {a: 1, b: 1};
    const source1 = {b: 2, c: 2};
    const source2 = {c: 3};
    Object.assign(target, source1, source2);
    console.log(target); // {a:1, b:2, c:3}
}
//Promise(承诺)对象 异步操作对象  也就是承诺按顺序执行
//then方法指定Promise对象的 成功失败回调函数 then((mes)=>mes,(err)=>err);
{
    let timeout = (ms) => {
        return new Promise((resolve, reject) => {
            console.log(`${ms}ms后输出done`);
            setTimeout(resolve, ms, 'done');
        });
    };
    timeout(3000).then((value) => {
        console.log(value);
    });
    let promise = new Promise(function (resolve, reject) {
        console.log('Promise'); //这个在新建异步对象时候就会执行
        resolve(); //当执行完这个函数后 会触发then这个回调函数,这是系统写好的
    });
    promise.then(function () {
        console.log('resolved.');
    });
    console.log('Hi!');
    //链式调用
    let promise1 = new Promise(function (resolve, reject) {
        resolve("倒计时3秒 开始计时...");
    });
    let promise2 = new Promise(function (resolve, reject) {
        setTimeout(resolve, 1000, "过去了1000ms");
    });
    let promise3 = new Promise(function (resolve, reject) {
        setTimeout(resolve, 2000, "过去了2000ms");
    });
    let promise4 = new Promise(function (resolve, reject) {
        setTimeout(resolve, 3000, "过去了3000ms");
    });
    let promise5 = new Promise(function (resolve, reject) {
        resolve('计时完毕');
    });
    /**
     * 倒计时3秒 开始计时...
     * 过去了1000ms (delay 1s)
     * 过去了2000ms (delay 1s)
     * 过去了3000ms (delay 1s)
     * 计时完毕     这个瞬间执行
     */
    promise1.then(function (v) {
        console.log(v);
        return promise2; //后面的这个then 就是promise2的resolve的回调函数
    }).then(function (v) {
        console.log(v);
        return promise3;
    }).then(function (v) {
        console.log(v);
        return promise4;
    }).then(function (v) {
        console.log(v);
        return promise5;
    }).then(function (v) {
        console.log(v);
    });
    if ('browser' === getEnv()) {
        //图像依次执行动画
        let rect = document.getElementById('rect');
        let promise_animate = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, 5000);
        });
        let promise_animate1 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, 10000);
        });
        let promise_animate2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, 15000);
        });
//    动画第一步向右增加
        promise_animate.then(function () {
            rect.setAttribute('class', "right-add");
            return promise_animate1; //增加完之后向右缩小
        }).then(function () {
            rect.setAttribute('class', "left-reduce");
            return promise_animate2; //缩小完之后向下扩展
        }).then(function () {
            rect.setAttribute('class', "down-add");
        });
    }
}
//生成器 Generator 返回一个遍历器对象
//遍历器的value键 保存yield的值,done键 是是否已遍历完成(false|true)
{
    function * helloWorldGenerator() {
        yield 'hello';
        yield 'world';
        return 'ending';
    }
    let hw = helloWorldGenerator(); //调用时不会立即触发
    console.log(hw); //返回这个生成器
    console.log(hw.next()); //{value: "hello", done: false}
    console.log(hw.next()); //{value: "world", done: false}
    console.log(hw.next()); //{value: "ending", done: true}
    let generator1 = function * () {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        return 5;
    };
    let gen1 = generator1();
    for (let val of gen1) {
        console.log(val); //1 2 3 4
        //return 的值被丢弃了,但是此时已经是done状态
    }
    //提前终止 return()
    function * gen() {
        yield 1;
        yield 2;
        yield 3;
    }
    let g = gen();
    console.log(g.next()); // { value: 1, done: false }
    //这里提前返回了
    console.log(g.return('foo')); // { value: "foo", done: true }
    console.log(g.next()); // { value: undefined, done: true }
    //如果生成器中有finally 那么return 无法终止finally中的返回值
    //此时return 返回的是finally中的值 并且要依次执行玩finally中所有返回值
    function * numbers() {
        yield 1;
        try {
            yield 2;
            yield 3;
        } finally {
            yield 4;
            yield 5;
        }
        yield 6;
    }
    let g2 = numbers();
    console.log(g2.next()); // { value: 1, done: false }
    console.log(g2.next()); // { value: 2, done: false }
    //这里是finally中的yield 4;
    console.log(g2.return(7)); // { value: 4, done: false }
    //这里是finally中的yield 5;
    console.log(g2.next()); // { value: 5, done: false }
    //这里是真正的return 值 return 值被finally推后了
    console.log(g2.next()); // { value: 7, done: true }
    console.log(g2.next()); // {value: undefined, done: true}
    //测试协程
    if ('node' === getEnv()) {
        const http = require('http');
        var options = {
            hostname: 'temp.com',
            port: 80,
            path: '/web/js/js_test/async_http',
            method: 'GET'
        };
        var options2 = {
            hostname: 'temp.com123',
            port: 80,
            path: '/web/js/js_test/async_http',
            method: 'GET'
        };
        function * http1() {
            var result = yield request(options, it);
            console.log("http body: " + result);
        }
        function * http2() {
            var result = yield request(options2, it2);
            console.log("http body: " + result);
        }

        function request(opt, it) {
            let req = http.request(opt, function (res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (body) {
                    it.next(body); //当收到数据时返回body
                });
            });
            req.on('error', function (e) {
                it.next(`'Error: ${e.message}`); //当发送错误时输出错误码
            });
            req.end();
        }
        let it = http1();
        it.next(); //此时执行request函数
        let it2 = http2();
        it2.next(); //此时执行request函数
        console.log("这段话将会在异步http请求之前输出");
    }

}
//async 这是ES2017引入的 它是 Generator 函数的语法糖
{
    if ('node' === getEnv()) {
        const fs = require('fs');
        const readFile = function (fileName) {
            return new Promise(function (resolve, reject) {
                fs.readFile(fileName, function (error, data) {
                    if (error)
                        return reject(error);
                    resolve(data);
                });
            });
        };
        //Generator 写法
        {
            const gen = function * ( {file1, file2}) {
                const f1 = yield readFile(file1); //这里返回的是Promise对象
                const f2 = yield readFile(file2);
                f1.then((v) => {//第三次next()之后
                    console.log('Generator: f1的内容为: ' + v);
                }).catch((e) => {
                    console.log('打开f1 发送错误 Error: ' + e);
                });
                f2.then((v) => {
                    console.log('Generator: f2的内容为: ' + v);
                }).catch((e) => {
                    console.log('打开f2 发送错误 Error: ' + e);
                });
            };
            //初始化一个生成器 初始化时传入的数据 整个生成器期间都可以使用
            //但是yield 返回值 必须要在下一次next()中传入上一次的值才有用
            //比如这里要用到的f1 f2 必须要在上一次传入
            let asy1 = gen({file1: './async_http', file2: './dont_exits'});
            //这个f1主要是传递给下一个next(),因为这个f1后面要用到
            const f1 = asy1.next().value;
            const f2 = asy1.next(f1).value;
            /*
             * //这里f2的错误消息先出来,我猜是因为他没有找到这个文件,直接就报错,
             * //没有发生io 所以速度较快.
             * 打开f2 发送错误 Error: Error: ENOENT: no such file or directory, open 'C:\projects\web\js\js_test\dont_exits'
             * Generator: f1的内容为: <body>这是一个测试协程文件</body>
             */
            asy1.next(f2);
        }
        //async await 写法
        //async 与 generator 区别
        //(1)async是自动执行 而generator 需要next()
        //(2)更好的语义 (3) 更广的适用性 
        // await 表示运行到这里要等待 直到后面的Promise对象返回resolve或者reject
        // 如果后面的是原始类型(数字字符串布尔值) 那么就会先转为Promise 
        // 并立即resolve 这时候就相当于同步操作了
        //(4)返回值是Promise 如果async函数中有return  Promise
        //那么可以链式后面跟着then();比如 asy().then();
        //await 相当于内部then()命令的语法糖
        //await oper(); 相当于let a= yield oper();然后执行a.value.then(v=>v);
        //再将这个then中的v返回,我猜的
        //await 只能用在async 函数中
        {
            const asy = async function ( {file1, file2}) {
                //这里如果不写try catch 可以在readFile(file1).catch(e=>console.log(e))
                try {
                    const f1 = await readFile(file1); //这里返回的是Promise对象
                    //这里应该就是resolve情况
                    console.log("async 方式读取文件 f1内容为: " + f1);
                } catch (e) {
                    //这里是rejected情况
                    console.log("async 方式读取文件 f1失败: " + e);
                }
                try {
                    const f2 = await readFile(file2);
                    console.log("async 方式读取文件 f2内容为: " + f2);
                } catch (e) {
                    console.log("async 方式读取文件 f2失败: " + e);
                }
                ;//ide 缺陷 不加分号这个排版格式不正确
            };
            asy({file1: './async_http', file2: './dont_exits'});
            console.log('本段文字将会先于asy异步操作的输出');
        }
    }
}
//类 Class 
{
    //Point.prototype.constructor === Point // true
    class Point {
        constructor([x, y]) {
            this.x = x;
            this.y = y;
        }
        move(a, b) {
            this.x = a;
            this.y = b;
        }
    }

    //为类添加方法
    Object.assign(Point.prototype, {
        toString() {
            return `x : ${this.x}, y: ${this.y}`;
        },
        toValue() {
            return this.x * this.x + this.y * this.y;
        }
    });
    let p1 = new Point([4, 5]);
    console.log(p1 + '');//x : 4, y: 5
    console.log(p1.toValue());//41
    p1.move(23, 123);
    console.log(p1 + '');//x : 23, y: 123
    console.log(p1.toValue());//15658
    //new.target 指向调用构造函数时新建的类名
    //也许可以新建抽象类 以后用到再看
    class Shape {
        constructor() {
            if (new .target === Shape) {
                throw new Error('本类不能实例化');
            }
        }
        someMethod0() {
            //...
        }
    }
    class Rectangle extends Shape {
        constructor(length, width) {
            super();
        }
        someMethod() {
            //...
        }
    }
    try {
        let shape = new Shape();  // 报错
    } catch (e) {
        console.log(e);//Error: 本类不能实例化
    }
    let rectangle = new Rectangle(3, 4);  //创建对象成功
    //类继承时 子类必须在constructor方法中调用super方法
    //在子类的构造函数中只有先调用super() 然后才能使用this 关键字
    //判断一个类是否继承了另一个类
    //Object.getPrototypeOf(Rectangle) 表示返回Rectangle这个类继承的原型
    console.log(Object.getPrototypeOf(Rectangle) === Shape);
    //原生构造函数
    //Boolean()
    //Number()
    //String()
    //Array()
    //Date()
    //Function()
    //RegExp()
    //Error()
    //Object()
    //以前，这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。
    //现在ES6可以

    //自定义异常类
    class ExtendError extends Error {
        constructor(message) {
            super();
            this.message = message;
            this.stack = (new Error()).stack;
            this.name = this.constructor.name;
        }
    }
    let testError = mes => {
        throw new ExtendError('这是用户自定义的异常');
    };
    try {
        testError();
    } catch (e) {
        //ExtendError: 这是用户自定义的异常
        //at new ExtendError (http://temp.com/web/js/js_test/index.js:1124:27)
        //at testError (http://temp.com/web/js/js_test/index.js:1129:15)
        //at http://temp.com/web/js/js_test/index.js:1132:9
        console.log(e);
    }
    //当继承Object时会发生一点差异
    //一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数。
}















































