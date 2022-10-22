// 包管理器工具
{
  // 1. npm 和 yarn
      // 都可以安装包和模块
      // yarn速度更快
          // npm安装包时，npm是按照队列执行每个package，必须等到当前package安装好之后才能继续后面安装
          // yarn是同步执行所有任务
      // 更简洁的输出
          // npm输出信息冗长，不断打印所有被安装上的依赖
          // yarn默认情况下，结合emoji直观打印必要信息，也提供一些命令供开发者查询额外的安装信息
      // 多注册来源处理
      // 更好的语义化
          // yarn改变了一些npm命令的名称，如add/remove，感觉上比npm原本的install/uninstall直观

  // 2.npm 和npx
      //npx是npm v5.20引入的一条命令，是npm的一个包执行器
      // 创建一个react项目
          // npm install -g create-react-app
          // create-react-app my-app

          // npx create-react-app my-app

      // 区别：npm会本地全局性的安装create-react-app，这个包会存在node目录下面，
            //npx命令会把create-react-app安装包临时安装上，等项目初始化完成后，他就删掉了

      // 主要特点：
          // 临时安装可执行依赖包，不用全局安装，不用担心产期污染
          // 可以执行依赖包中的命令，安装完成自动运行
          // 自动加载node_modules中的依赖包，不用指定$path
          // 可以指定node版本、命令版本，解决了不同项目不同版本的命令问题


  // 3. yarn + vite
      // yarn快速，可靠，安全
      // 常用命令
          // yarn -v:查看版本
          // yarn init ：初始化
          // yarn add 包名 / yarn add -D 包名
          // yarn upgrade 包名
          // yarn remove 包名
          // yarn run ：运行脚本

      // vite :web开发工具
          // 快速的冷启动
          // 即时的模块热更新
          // 真正的按需编译
      // vite 的使用方法
          // vite提供了用npm或yarn一键生成项目结构的方式，使用yarn在终端执行
}