/*
1、概述
  Vite:是一种新型的前端构建工具，能够显著提升前端开发体验
  由两部分组成：一个是开发服务器，它基于原生ES模块提供丰富的內建功能，如速度快到惊人的模块热更新
              一套构建指令，它使用Rollup打包你的代码，并且是预配置的，可用于生成环境的高度优化的静态资源
  意在提供开箱即用的配置，同时它的插件API和Javascript API带来了高度的可扩展性，并有完整的类型支持

2、搭建Vite项目
    #使用 NPM:
    $ npm create vite@latest
    #使用 Yarn:
    $ yarn create vite
    #使用 PNPM:
    $ pnpm create vite
    然后按提示操作

    命令直接指定项目名称和模板
    #npm 6.x
    npm create vite@latest my-app --template react
    #npm 7+
    npm create vite@latest my-app -- --template react
    # yarn
    yarn create vite my-app --template react

    #模板
    vanilla，vanilla-ts，vue，vue-ts，react，react-ts，preact，preact-ts，lit，lit-ts，svelte，svelte-ts

3、命令行界面
    {
      "script":{
          "dev":"vite", //启动开发服务器，别名 "vite dev","vite serve"
          "build":"vite build",//为生成环境构建产物
          "preview":"vite preview"//本地预览生成构建产物
      }
    }

4、功能
  1. NPM依赖解析和与构建
  2. 模块热替换
  3. TypeScript
  4.Vue
  5. JSX
  6. css
  7. 静态资源处理
  8. JSON
  9. Glob
  10. 动态导入
  11. WebAssembly
  12. Web Wrokers
  13. 构建优化

5、使用插件
    添加插件：需要将他添加到项目DevDependencies并在vite.config.js配置文件中的plugins数组中引用它
        npm add -D 插件名
        到vite.config.js查看
    查找插件：查看官网plugins章节
    强制插件顺序：使用enforce修饰符来强制插件位置
          pre:在vite核心插件之前调用
          默认：在vite核心插件之后调用
          post:在vite构建插件之后调用
          plugins:[
            {
              ...images(),
              enforce:"pre"
            }
          ]
    按需应用：默认情况下，插件在开发（serve）和生产（build）模式中都会调用
        使用apply属性指明在serve或build模式使用
        plugins:[
          {
            ...typescript2(),
            apply:"build"
          }
        ]

6、依赖预构建
    首次启动vite，可能会打印一下信息
        Pre-bundling dependencies: （正在预构建依赖：）
    原因：这就是vite执行时所做的依赖预构建，这个过程有两个目的：
        CommonJS和UMD兼容性
        性能：vite将许多内容模块的ESM依赖关系转为单个模块


*/