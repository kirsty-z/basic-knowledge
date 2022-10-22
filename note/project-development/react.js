// 1、创建react-app
    // 1.命令创建
        // npx create-react-app my-app
        // cd my-app
        // npm start

//2. 核心概念
{
  // 1.jsx简介
        // jsx是JavaScript语法扩展，将jsx和UI放在一起时，会在视觉上有辅助作用
        // 在jsx嵌入表达式，用大括号包裹
        // jsx防止注入攻击：react dom渲染所有输入内容前，会默认转义

  // 2.元素渲染
      // 将一个元素渲染为dom：只需要将他们一起串ReactDOM.render()
        let element=<div>Hello World ! </div>
        ReactDOM.render(element,document.getElementById("root"))
      // 更新已渲染的元素
        // React元素是不可变对象，它代表了某个特定时刻的UI
        // 更新方式就是创建一个全新元素，并将其传入ReactDOM.render()
      // React只更新他需要更新的部分
          // React dom会将元素和它的子元素与他们之前的状态进行比较，并只会进行必要的更新来是dom达到预期状态

  // 3.组件 & Props
      // 组件允许将UI拆分为独立可复用的代码片段，并对每个片段进行独立构思
      // 组件，概念上类似于JavaScript函数，他接受任意的入参（即Props），并返回用于描述页面展示内容的React元素

      // 函数组件与class组件
          // 函数组件，他接受唯一带有数据参数的props对象与并返回一个React元素
          function Welcome(props){
            return <div>hello, {props.name}</div>
          }
          // 也可以使用es6class定义组件
          class Welcome extends React.Component{
            render(){
              return <div>hello,{this.props.name}</div>
            }
          }

      // 渲染组件
          // 组件可以使dom标签，也可以指用户自定义组件
          // 当React元素为用户自定义组件，他会将jsx接受的属性以及子组件转换为单个对象传递给组件，这个对象别称之为props
              const element1 = <Welcome name="sair"/>
              ReactDOM.render(element1,document.getElementById("root"))
              // hello, sair
              // 解析
                  // 调用ReactDOM.render()函数,并传入<Welcom name="sair"/>作为参数
                  // React调用Welcome组件，并将{name：“sair”}作为props传入
                  // Welcome组件将<div>hello, sair</div>元素作为返回值
                  // ReactDOM将DOM高效的更新为<div>hello, sair</div>
          // 注意：组件名必须以大写字母开头
                // 如果小写字母开头的组件将视为原生的DOM标签

      // 组合组件
          // 组件可以在其输出中引用其他组件

      // 提取组件
          // 将组件拆分为更小的组件

      // props的只读属性
          // 组件无论是使用函数声明还是class声明，都绝不能修改自身的props
          // 纯函数，该函数不会更改入参，且多次调用下相同的入参始终返回相同的结果
              function sum(a,b){
                return a+b;
              }
          // 所有React组件都必须向纯函数一样保护他们的props不被更改

  // 4.state 和 生命周期
      // state与props类似，但是state是私有的，并且完全受控于当前组价
      // 将函数组件转换为class组件
          // 1.创建一个同名es6class，并且继承React.Component
          // 2.添加一个空的render方法
          // 3.将函数体移到render（）方法之中
          // 4.在render（）方法中使用的this.props转为props
          // 5.删除剩余的空函数声明
          class Clock extends React.Component{
            render(){
              return ( <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
              </div>)
            }
          }
          // 每次组件更新都会调用render方法，但只要在相同的dom节点中渲染<Clock/> ，就仅有一个Clock组件的class实例被创建使用
          // 这就使得可以使用如state和生命周期方法等很多其他特性

      // 向class组件中添加局部的state
          // 1.把render（）方法中的this.props.data转为this.state.data
          // 2.添加class构造函数，然后在该函数中为this.state赋初始值
          // 3. 通过一下方式将props传递到父类中的构造函数中
          class Clock extends React.Component{
            constructor(props){
              super(props)
              this.state={data:new Date().toLocaleTimeString()}
            }
            render(){
              return(<div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
              </div>)
            }
          }
          ReactDOM.render(<Clock/>,document.getElementById("root"))

      // 将生命周期添加到class中
          // 组件第一次被渲染到dom中，称挂载（mount）
          // 当dom组件被删除时，称卸载（unmount）
          // 使用this.setState()来更新组件state
          class Clock extends React.Component{
            constructor(props){
              super(props);
              this.state={
                data:new Date()
              };
            }
            componentDidMount(){
              this.timerId=setInterval(
                ()=>this.tick(),
                1000
                )
            }
            componentWillUnmount(){
              clearInterval(this.timerId)
            }
            tick(){
                this.setState({
                  data:new Date()
                })
            }
            render(){
              return (
                <div>
                  <h1>Hello, World!</h1>
                  <div>It is {this.state.data.toLocaleTimeString()}</div>
                </div>
              )
            }
          }
          ReactDOM.render(<Clock/>,document.getElementById("root"))

      //正确地使用state
          // 1.不要直接修改state，使用setState（）
          // 2.state的更新可能是异步的
              // 出于性能考虑，React可能会把多个setState调用并合成一个调用，因此this.state和this.props可能异步更新
                  this.setState({
                    counter:this.state.counter+this.props.increment
                  })//会出错，代码可能无法更新计时器
              // 解决，可以让setState接受一个函数而并非一个对象
                this.setState((state,props)=>({
                  counter:state.counter+props.increment
                }))
          // 3.state的更新会被合并

      // 数据是向下流动的
          // 组件可以选择把state作为props向下传递给子组件
                // 自上而下或单向数据流，组件本身无法知道在props接收的参数是来自父组件的state，还是props，或是手动输入

  // 5.事件处理
      // React事件命名采用小驼峰，而不是纯小写
      // 使用jsx语法时你需要传入一个函数作为事件处理函数，而不是一串字符串
      // 必须显示的使用preventDefault阻止默认事件
          /*
          function ActionLink(){
            function handleClick(e){
              e.preventDefault();
              console.log("The link was clicked")
            }
            return(
              <div>
                <a href="#" onClick={handleClick}}>Click me</a>
              </div>
            )
          }*/
      // 一般不需要使用addEventListener为DOM创建监听事件，只需要该元素初始渲染的时候添加监听器即可
          class Toggle extends React.Component{
            constructor(props){
              super(props);
              this.state={
                isToggleOn:true
              };
              this.handleClick=this.handleClick.bind(this)
            }
            handleClick(){
              this.setState(state=>({
                isToggleOn:!state.isToggleOn
              }))
            }
            render(){
              return (<button onClick={this.handleClick}>{this.state.isToggleOn}</button>)
            }
          }
          ReactDOM.render(<Toggle/>,document.getElementById("root"))
          // 通常情况下，方法后面没有添加()，onClick={this.handleClick}你应该为这个方法绑定this
          // bind太麻烦，两种方法解决
              // 如果你正在使用实验性的 public class fields 语法，你可以使用 class fields 正确的绑定回调函数
                class LoggingButton extends React.Component {
                // 此语法确保 `handleClick` 内的 `this` 已被绑定。
                      // 注意: 这是 *实验性* 语法。
                      handleClick = () => {
                        console.log('this is:', this);
                      }

                      render() {
                        return (
                          <button onClick={this.handleClick}>
                            Click me
                          </button>
                        );
                      }
                    }
                // 可以使使用箭头函数
                    // <button onClick={()=>this.handleClick()}>click</button>
                // 箭头函数在每次渲染都会创建不同的回调函数，额外的渲染
                // 通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题

      // 向事件处理程序传递参数
          // 通常我们会为事件处理函数传递额外的参数，如删除id的一行
          // <button onClick={(e)=>this.deleteClick(id,e)}>click</button>
          // <button onClick={this.deleteClick.bind(this,id)}>click</button>

  // 7.条件渲染
      //使用运算符if或者条件运算符去创建元素来表现当前状态
      // if
      // &&
      // 三目运算  ？ ：

  // 8.列表 & key
      // 可以通过使用{}在jsx內构建一个元素集合
          function NumberList(props){
            const number=props.number;
            const listItem = number.map((num,key)=>{
              return <li key={num+key}>{num}</li>
            })
            return <ul>{listItem}</ul>
          }
          let list=[1,2,3,4,5,6]
          ReactDOM.render(<NumberList number={list}/>,document.getElementById("root"))
      // key帮助React识别哪些元素改变，比如添加和删除
            // 一个元素的key最好是这个元素在列表中拥有独一无二的字符串，通常使用数据中id来作为元素的key
            // key只是在兄弟节点中必须唯一
            // 在jsx中嵌入map()

  // 9. 表单
      // 表单元素通常会保持一些内部的state
      // 受控组件
          // 在HTML中，表单元素（<input/>、<textarea/>、<select/>）之类的表单元素通常自己维护state，并根据用户输入更新
          // 在react中，可变状态通常保存在组件的state属性中，并只能通过setState()来更新
          // 使state称为唯一数据源，，react组件控制着用户输入过程中表单发送的操作，被react以这种方式控制取值的表单输入元素就叫受控组件
              class NameForm extends React.Component{
                constructor(props){
                  super(props)
                  this.state={value:""}
                }
                handleSubmit=(evt)=>{
                  evt.preventDefault();
                  alert("提交名字："+this.state.value)
                }

                handleChange=(evt)=>{
                  this.setState({
                    value:evt.target.value
                  })
                }
                render(){
                  return (
                    <form onSubmit={this.handleSubmit}>
                      <lable>名字
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                      </lable>
                      <input type="submit" value="提交"/>
                    </form>
                  )
                }
              }

          // textarea标签
              // 使用value属性代替，使得textarea与input非常相似
              // this.state.value初始化在构造函数里，文本默认有初始值

          // select
              // react不适用selected属性，在select标签使用value，只需在根标签中更新它

          // input
              // <input type="file"/> 允许用户上传一个或多个文件，value组件只读，是非受控组件
              // 处理多个输入
                  // 处理多个input时，给每个元素添加name属性，根据evt.target.name的值选择要执行的操作

          // 受控输入空值
              ReactDOM.render(<input value="hi"/>,mountNode)
              setTimeout(()=>{
                ReactDOM.render(<input value={null}/>,mountNode)
              },1000)

  // 10.状态提升
      // 将共享状态提升到最近的共同父组件中去
      // 其他组件需要这个state，那么将他提升至这些组件最近的共同父组件中
      // 提升state方式比双向绑定方式写更多的样板代码，但是排查和隔离bug所需的工作量将会减少

  //11.组合 vs 继承
      // 包含关系
          // 有些组件无法知道他们子组件的具体内容，使用特殊的children prop将他们的子组件传递到渲染结果
              function FancyBorder(props){
                return <div className={'FancyBorder FancyBorder'+props.color}>{props.children}</div>
              }
              function WelcomeDialog(){
                return <FancyBorder color="blue">
                  <h1 className="Dialog-title">
                    Welcome
                  </h1>
                  <p className="Dialog-message">
                    Thank you for visiting our spacecraft!
                  </p>
                </FancyBorder>
              }
        //特例关系
            // 特殊组件可以通过props定制并渲染一般组件
                function Dialog(props){
                  return (
                    <FancyBorder color="blue">
                       <h1 className="Dialog-title">
                        {props.title}
                      </h1>
                      <p className="Dialog-message">
                        {props.message}
                      </p>
                    </FancyBorder>
                  )
                }
                function WelcomeDialog() {
                  return (
                    <Dialog
                      title="Welcome"
                      message="Thank you for visiting our spacecraft!" />
                  );
                }
                // 同样适用与class组件
                class SignUpDialog extends React.Component{
                  constructor(props){
                    super(props)
                    this.state={
                      login:""
                    }
                  }
                  render(){
                    return (
                      <Dialog title="login" message="How should we refer to you?">
                        <input value={this.state.login}
                              onChange={this.handleChange} />
                        <button onClick={this.handleSignUp}>
                          Sign Me Up!
                        </button>
                      </Dialog>
                    )
                  }
                  handleChange=(e)=>{
                    this.setState({
                      login:e.target.value
                    })
                  }
                  handleSignUp=()=>{
                    alert(`welcom aboard ,${this.state.login}`)
                  }
                }
          // Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式
          // 组件可以接受任意props，包括基本数据结构类型，react元素以及函数
          // 在组件中使用react，并没有发现需要使用继承来构建组件层次的情况

}
// 3.高级指导
{
  // 无障碍

  // 代码分割
      // 打包：大多数react应用都会使用webpack，Rollup等这类构建工具打包
          // 打包是一个将文件引入并合并到一个单独文件的过程，最终形成一个bundle，页面引入bundle，整个应用即可一次性加载
      // 代码分割
          // 避免体积过大而导致加载事件过长
      // import
          // 应用中引入代码分割的最佳方式是通过动态import语法
      // React.lazy
          // const OtherComponent = React.lazy(() => import('./OtherComponent'));
          // React.lazy 接受一个函数，这个函数需要动态调用 import()。
          // 它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件
      // 异常捕获边界（Error boundarise）
          // 如果模块加载失败，他会触发一个错误。可以使用异常捕获边界技术来处理这种情况
      // 基于路由的代码分割
      // 命名导出

  // Context
      // context提供了一种组件之间共享此类值的方式，而不必显示通过组件树的逐层传递props
      // 目的：共享哪些对于一个组件树而言是全局的数据，例如，认证的用户，主题或首选语言
          const ThemeContext = React.createContext("light");
          class App extends React.Component {
            render() {
              // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
              // 无论多深，任何组件都能读取这个值。
              // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
              return (
                <ThemeContext.Provider value="dark">
                  <Toolbar />
                </ThemeContext.Provider>
              );
            }
          }
          class ThemedButton extends React.Component {
            // 指定 contextType 读取当前的 theme context。
            // React 会往上找到最近的 theme Provider，然后使用它的值。
            // 在这个例子中，当前的 theme 值为 “dark”。
            static contextType = ThemeContext;
            render() {
              return <Button theme={this.context} />;
            }
          }
      // context主要应用于场景在于很多不同层级的组件需要访问同样一些的数据，谨慎使用，会使组件复用性变差
      // API
          // React.createContext：创建一个context对象
          // Context.Provider
              // <MyContext.Provider value="某个值"/>
              // 每个context对象都会返回一个Provider React组件，他允许消费组件订阅context变化
              // Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。
              // 多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据
          // Class.contextType：挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象
          // Context.Consumer:React 组件也可以订阅到 context 变更
              // <MyContext.Consumer>
              //   {value => /* 基于 context 值进行渲染*/}
              // </MyContext.Consumer>
          // Context.displayName:React DevTools 使用该字符串来确定 context 要显示的内容

  // 错误边界(Error Boundaries)
      // 捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI
      // 无法捕获一下错误：
          // 事件处理
          // 异步代码
          // 服务端渲染
          // 他自身抛出的错误（并非它的子组件）
      // 如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，
          // 那么它就变成一个错误边界
          // 请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息
          class ErrorBoundlaries extends React.Component{
            constructor(props){
              super(props)
              this.state={
                hasError:false
              }
            }
            static getDerivedStateFromError(err){
               // 更新 state 使下一次渲染能够显示降级后的 UI
              return { hasError: true };
            }
            componentDidCatch(err,errInfo){
              // 同样可以将错误日志报给服务器
              logErrorToMyService(err,errInfo)
            }
            render(){
              if(this.state.hasError){
                  // 你可以自定义降级后的 UI 并渲染
                return <div>something went wrong</div>
              }
              return this.props.children;
            }
          }
          // 然后可以当做正常组件使用
          <ErrorBoundary>
            <MyWidget />
          </ErrorBoundary>

      // 未捕获错误的新行为
          // 自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载

      // 组件栈追踪
          // 除了错误信息和 JavaScript 栈外，React 16 还提供了组件栈追踪。现在你可以准确地查看发生在组件树内的错误信息

      // 关于事件处理器
          // 错误边界无法捕获事件处理器内部的错误

  // refs转发
      // Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件
          /*const FancyButton = React.forwardRef((props, ref) => (
              <button ref={ref} className="FancyButton">
              {props.children}
            </button>
            ));

            // 你可以直接获取 DOM button 的 ref：
            const ref = React.createRef();
            <FancyButton ref={ref}>Click me!</FancyButton>;
            */
          //  FancyButton 使用 React.forwardRef 来获取传递给它的 ref，然后转发到它渲染的 DOM button
          // 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。
          // Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。

      // 组件库维护者的注意事项
          // 当你开始在组件库中使用 forwardRef 时，你应当将其视为一个破坏性更改，并发布库的一个新的主版本

      // 高阶组件中转发refs

  // 高阶组件
      // 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧
      // 高阶组件是参数为组件，返回值为新组件的函数

  // 与第三方库协同

  // 深入jsx
      // jsx实际是React.createElement(component,props,...children)函数的语法糖
      //指定元素类型
          // React必须在作用域里面
          // 在jsx类型中使用点语法
          // 用户定义的组件必须以大写字母开头
          // 在运行时选择类型

      // jsx中的props
          // JavaScript表达式作为props
          // 字符串字面量
          // props默认值为true
          // 布尔类型，null与undefined将会忽略

      // 性能优化
          // 使用生产版本
          // create  react app
              //项目是create React App构建
              // npm run build
              // 这段命令将在你的目录下面的build/目录中生成对应的生产版本
              // 注意只有在生产部署前才需要执行这个命令。正常开发使用 npm start 即可。

          // 单文件构建

          // brunch
              // 通过安装 terser-brunch 插件，来获得最高效的 Brunch 生产构建

          // Browserify

          // Rollup

          // webpack

          // 使用Chrome performance标签分析组件

      // Portals

      // profiler
            // 测量渲染一个react应用多久渲染一次以及渲染一次的代价

      // refs & DOM
          // refs：提供了一种方式，允许我们访问DOM节点或在render方法中创建react元素
            // props是父子组件相互交互的唯一方式
            // 下面几种合适使用refs
              // 管理焦点，文本选择或者媒体播放
              // 触发强制动画
              // 集成第三方DOM库
            // 避免使用refs来做任何可以通过声明式实现来完成的事情
          // 创建refs
              class MyComponent extends React.Component{
                constructor(props){
                  super(props);
                  this.myRef = React.createRef();
                }
                render(){
                  return <div>{this.myRef}</div>
                }
              }
          // 访问refs
              const node=this.myRef.current;
              // ref属性用于HTML元素时，构造函数中使用React.createRef()创建ref接受底层DOM元素作为其current属性
              // 当ref用于自定义class组件时，ref对象接受组件的挂载实例作为其current属性
              // 注意：你不能在函数组件使用ref属性，因为他们没有实例

      // 静态类型检查
          // TypeScript是一种由微软开发的编程语言，他是JavaScript的一个类型超集，包含独立的编译器
          // 作为一种类型语言，TypeScript 可以在构建时发现 bug 和错误，这样程序运行时就可以避免此类错误
          // 使用typescript
              // 将typescript添加到你的项目依赖中
              // 配置typescript编译选项
              // 使用正确的文件扩展名
              // 为你使用的库添加定义
          // 在create react app 中使用typescript
              // 创建
                  // npx create-react-app my-app --template typescript
              // 添加typescript到现有的项目中
                  // yarn add --dev typescript
                  // 使用tsc命令
                  // package.josn文件中
                  {
                    /*...
                    "scripts": {
                      "build": "tsc",
                      // ...
                    },
                    */
                  }
              // 配置tsc编译器
                  // yarn run tsc --initz
          // 文件扩展名
              // .ts 是默认的文件扩展名，而 .tsx 是一个用于包含 JSX 代码的特殊扩展名。
          // 类型定义
              //库的声明文件 有两种
                  // Bundled
                      // 文件中是否有index.d.ts文件
                  // Definitelytyped
                      // # yarn
                      // yarn add --dev @types/react

      // 严格模式
          // StrictMode 是一个用来突出显示应用程序中潜在问题的工具
              function ExampleApplication(){
                return (
                  <div>
                    <Header />
                    <React.StrictMode>
                      <div>
                        <ComponentOne />
                        <ComponentTwo />
                      </div>
                    </React.StrictMode>
                    <Footer />
                  </div>
                )
              }
          // StrictMode 目前有助于：
              // 识别不安全的生命周期
              // 关于使用过时字符串 ref API 的警告
              // 关于使用废弃的 findDOMNode 方法的警告
              // 检测意外的副作用
              // 检测过时的 context API

      //非受控组件
            // <input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked，
            // <select> 和 <textarea> 支持 defaultValue



}
//4.Reacr
{
  // 组件的生命周期
      // 组件实例被创建并插入dom
          // constructor
          // static getDerivedStateFromProps()
              // 目的：让组件在 props 变化时更新 state
              // render 方法之前调用，即在渲染 DOM 元素之前会调用，并且在初始挂载及后续更新时都会被调用
          // render
          // componentDidMount
      // 更新，组件的props或state发生变化时会触发更新
          // static getDerivedStateFromProps()
          // shouldComponentUpdate()
          // render()
          // getSnapshotBeforeUpdate()
              //  在最近一次渲染输出（提交到 DOM 节点）之前调用。
          // componentDidUpdate()
      // 卸载
          // conponentWillUnmount
      // 处理错误
          // static getDerivedStateFromError()
          // componentDidCatch()
      //

}
// 5.Hook
{
  // 简介
      // 可以在不编写class的情况下使用state以及其他React特性
      // react v16.8  react native v0.59才支持hook
      // 没有破坏性改动
          // 完全可选的
          // 100%向后兼容
          // 现在可用
          // 没有计划从react中移除class
          // Hook不会影响你对react概念的理解

      // 动机
          // 在组件之间复用状态逻辑很难
              // Hook使你在无需修改组件的情况下复用状态逻辑
          // 复杂组价变得难以理解
              // Hook组件中相互关联的部分拆分成更小的函数
          // 难以理解class
              // Hook使你在非class的情况下可以使用更多的react特性

  // 概览
      // Hook是一些让你在函数组件里钩入react state 以及生命周期等特性的函数
      // useState
          // 在组件行数里添加一些内部的state；useState返回一对值：当前状态和更新它的函数
          // useState唯一的参数就是初始state
              // 计算器例子
                  function Exapmle(){
                    const [count,setCount] = useState(0)
                    return (
                      <>
                          <div>你点击了{count}次</div>
                          <button onClick={()=>setCount(count+1)}>点击</button>
                      </>
                    )
                  }
              // 一个函数可以多次使用state hook
                  function example(){
                    const [fruit,setFruit]=useState("banner");
                    const [age,setAge]=useState(42);
                  }

      // useEffect
          // 数据获取、订阅或者手动修改过 DOM，这些操作操作称为“副作用”，或者简称为“作用”
          // useEffect给函数组件增加了操作副作用的能力
              function Example(){
                const [count,setCount]=useState(0);
                // 相当于 componentDidMount 和 componentDidUpdate:
                useEffect(()=>{
                    // 使用浏览器的 API 更新页面标题
                  document.title = `你点了${count}下`
                })
                return(<>
                    <div>你点了{count}下</div>
                    <button onClick={()=>setCount(count+1)}></button>
                </>)
              }
          // 副作用函数还可以通过返回一个函数来指定如何“清除”副作用
          // 可以多次使用useEffect

      // Hook使用规则
          // 只能在函数在外层调用hook，不要在循环、条件判断或者子函数中调用
          // 只能react的函数组件中调用hook（自定义hook也可以调用hook）

      // 自定义hook
          // 组件之间重用状态逻辑：高阶函数和render props；自定义hook可以让你不增加组件的情况达到同样的目的
          // 如果函数名以use开头并调用其他hook，这就是一个自定义hook

      // 其他hook
          // useContext：订阅react的content
          // useReducer：通过reducer来管理组件本地复杂的state

  // 使用 state hook
      // 可以再不编写class的情况下使用state以及其他的react特性
      // hook是一个特殊的函数，可以让你钩入react特性
      // useState返回值是一个state和更新state的函数
      // 声明state变量
            const [count,setState]=useState(0);
      // 读取state
            // <div>{count}</div>
      // 更新state
            // <button onClick={()=>setCount(count+1)}>clike</button>
      // 提示
          // 方括号的作用，定义了一个state 变量
      // 多个state
          const [age,setAge]=useState(18)
          const [name,setName]=useState("hellen")

  // 使用Effect hook
      // 数据获取，设置订阅以及手动更改react组件的dom都属于副作用
      // useEffect给函数组件增加了操作副作用的能力
      // 常见副作用操作：需要清除和不需要清除
      // 无需清除的effect
          // 在react更新dom之后运行一些额外的代码；如发送请求，手动变dom，记录日志
          // 在class组件中
              class Example extends React.Component{
                constructor(props){
                  super(props);
                  this.state={
                    count:0
                  }
                }
                componentDidMount(){
                  document.title = `You clicked ${this.state.count} times`;
                }
                componentDidUpdate(){
                  document.title = `You clicked ${this.state.count} times`;
                }
                render(){
                  return(
                    <div>  <p>You clicked {this.state.count} times</p>
                    <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                      Click me
                    </button></div>
                  )
                }
              }
              // 在 class中，需要在两个生命周期中写重复代码
          // 在useEffect
              function Example(){
                const [count,setCount]=useState(0);
                useEffect(()=>{
                  document.title= `You clicked ${this.state.count} times`
                })
                return (
                  <div>  <p>You clicked {count} times</p>
                  <button onClick={() => setCount(count+1)}>
                    Click me
                  </button></div>
                )
              }

      // 需要清除的effect
          // 有一些副作用需要清除，防止引起内存泄漏；例如订阅外部数据源
              class Example extends React.Component{
                constructor(props) {
                  super(props);
                  this.state = { isOnline: null };
                  this.handleStatusChange = this.handleStatusChange.bind(this);
                }
                componentDidMount() {
                  ChatAPI.subscribeToFriendStatus(
                    this.props.friend.id,
                    this.handleStatusChange
                  );
                }
                componentWillUnmount() {
                  ChatAPI.unsubscribeFromFriendStatus(
                    this.props.friend.id,
                    this.handleStatusChange
                  );
                }
                handleStatusChange(status) {
                  this.setState({
                    isOnline: status.isOnline
                  });
                }

                render() {
                  if (this.state.isOnline === null) {
                    return 'Loading...';
                  }
                  return this.state.isOnline ? 'Online' : 'Offline';
                }
              }
          // useEffect
              function Example(){
                const [isOnline,setIsOnline]=useState(null);
                if(isOnline===null){
                  return "loading..."
                }
                useEffect(()=>{
                  function handleStatusChange(status) {
                    setIsOnline(status.isOnline);
                  }
                  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
                  // Specify how to clean up after this effect:
                  return function cleanup() {
                    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
                  };
                })
                return isOnline ? 'Online' : 'Offline';
              }
              // 在useEffect中返回一个函数，这是effect可选的清除机制
              // 在组件卸载的时候执行清除操作
              // 并不是必须为 effect 中返回的函数命名，其实也可以返回一个箭头函数或者给起一个别的名字
          // 可以使用多个effect，将不相关逻辑分离到不同的effect中
          // 每次更新的时候都要运行 Effect
                // 不需要特定的代码来处理更新逻辑，因为 useEffect 默认就会处理
                // 默认行为保证了一致性，避免了在 class 组件中因为没有处理更新逻辑而导致常见的 bug
          // 通过跳过 Effect 进行性能优化
              // 如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可
              useEffect(() => {
                document.title = `You clicked ${count} times`;
              }, [count]); // 仅在 count 更改时更新
                // 如果count等于5，组件重新渲染count还是等于5，react对前一次渲染的数组[5]和最后一次渲染的数组[5]比较
                // 因为数组中的所有元素都是相等的(5 === 5)，React 会跳过这个 effect，这就实现了性能的优化
                // 如果count变为6，react将会把前一次渲染的数组[5]和这次渲染的数组[6]对比，5！==6，react会再次调用effect
                // 如果数组中有多个元素，即使只有一个元素发生变化，React 也会执行 effect
          // 如果只想运行一次effect，可以传递一个空数组[]作为第二个参数；effect内部的props和state就会一直拥有其初始值
          // React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得额外操作很方便

  // Hook规则
      // Hook本质就是JavaScript函数；使用它时要遵循的两条规则：
          // 只能在最顶层使用Hook
              // 不要在循环，条件或嵌套函数中调用 Hook
          // 只能在react函数中调用Hook
              // 不要在普通的JavaScript函数中调用hook
              // 可以在react的函数组中调用Hook
              // 在自定义的Hook中调用其他Hook

      // ESLine插件
          //  eslint-plugin-react-hooks 的 ESLint 插件来强制执行这两条规则
          // npm install eslint-plugin-react-hooks --save-dev
          // 你的 ESLint 配置
            /*{
              "plugins": [
                // ...
                "react-hooks"
              ],
              "rules": {
                // ...
                "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
                "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
              }
            }*/

  // 自定义Hook
      // 通过自定义Hook，可以将组件逻辑提取到可重用的函数中
      // 如若两个函数之间共享逻辑，提取到第三个函数中
      // 自定义hook，使用 use 开头，函数内部可以调用其他hook
            // 例子
                // 组件1订阅某个好友的在线状态
                // 组件2好友在线文字显示绿色，不在线显示红色
                // 去除重复逻辑：两个组件都想知道好友是否在线
                function useFriendStatus(friendID){
                  const[isOnline,setIsOnline]=useState(null);
                  useEffect(()=>{
                    function handleStatusChange(status) {
                      setIsOnline(status.isOnline);
                    }

                    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
                    return () => {
                      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
                    };
                  })
                  return isOnline;
                }
                // 获取是否在线，返回状态
                function FriendStatus(props){
                  const isOnline = useFriendStatus(props.friend.id);
                  if(isOnline===null){
                    return "loading..."
                  }
                  return isOnline?"Online":"Offline";
                }
                // 显示是否在线
                function FriendListItem(props){
                  const isOnline=useFriendStatus(props.friend.id);
                  return (
                    <li style={{ color: isOnline ? 'green' : 'black' }}>
                      {props.friend.name}
                    </li>
                  );
                }
      //在多个hook之间传递消息

  // Hook API 索引
      // 基础Hook
          // useState
          // useEffect
          // useContext
      // 额外Hook
          // useReducer
          // useCallback
          // useMemo
          // useRef
          // useImperativeHandle
          // useLayoutEffect
          // useDebugValue

      // useState
          // 返回一个 state，以及更新 state 的函数
              // const [state,setState]=useState(initialState)
              // setState(newState);
              // <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
              setState(prevState => {
              // 也可以使用 Object.assign
                return {...prevState, ...updatedValues};
              });
      // useEffect
          // useEffect(didUpdate);
          // 接收一个包含命令式、且可能有副作用代码的函数
          // 清除effect；组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源
              /*
              useEffect(() => {
                const subscription = props.source.subscribe();
                return () => {
                  // 清除订阅
                  subscription.unsubscribe();
                };
              });
              */
          // effect的条件执行
              // effect 会在每轮组件渲染完成后执行，一旦 effect 的依赖发生变化，它就会被重新创建
              // 可以给 useEffect 传递第二个参数，它是 effect 所依赖的值数组；在 source prop 改变时重新创建

      // useContext
          // const value = useContext(MyContext);
          // 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
          // 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
          // useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>
          // useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化
              // 仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context
              const themes={
                ligth:{
                  foreground:"#000000",
                  background:"#eeeeee"
                },
                dark:{
                  foreground:"#ffffff",
                  background:"#222222"
                },
              };
              const ThemeContext=React.createContext(theme.ligth);
              function App(){
                return <ThemeContext.Provider value={theme.dark}>
                  <Toobar/>
                </ThemeContext.Provider>
              }
              function Toobar(){
                return <div>
                  <ThemedButton/>
                </div>
              }
              function ThemeButton(){
                const theme = useContext(ThemeContext);
                return(<button style={{background:theme.background,color:theme.foreground}}
                >i an styled by theme context</button>)
              }

      //useReducer
          // const [state,dispatch] = useReducer(reducer,initialArg,init);
          // useState的替代方案，接收一个形如(state,action)=>newState的reducer，并返回当前的state以及与其配套的dispatch方法
          // 场景，state逻辑较复杂且包含多个子值，或者下一个state依赖之前的state
          // 可以向子组件传递dispatch而不是回调函数
              // 使用useReducer重写useState计算器
              const initialState={count:0};
              function reducer(state,action){
                switch(state.type){
                  case "increment":
                    return {count:state.count +1};
                  case "decrement":
                    return {count:state -1};
                    default:
                      throw new Error("not find reducer type")
                }
              }
              function Example(){
                const [state,dispatch] =useReducer(reducer,initialState);
                return(
                  <>
                    count:{state.count}
                    <button onClick={()=>dispatch({type:"decrement"})}>-</button>
                    <button onClick={()=>dispatch({type:"increment"})}>+</button>
                  </>
                )
              }
          // React保证dispatch函数的标识是稳定的，并且不会再组件渲染时改变，
              // 这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch
          // 指定初始值state
              // 有两种不同初始化useReducer state 的方式，将初始值作为第二个参数传入userReducer
                const [state,dispatch] = useReducer(reducer,{count:initialCount})
          // 惰性初始化
              // 可以选择惰性地创建初始state，需要将init函数作为useReducer的第三个参数传入，这样初始state将被设置为init(initialState)
              // 这样做可以将用于计算的state的逻辑提取到reducer外部，对将来重置state的action做处理提供便利
                function init(initialCount){
                  return {count:initialCount};
                }
                function reducer(state,action){
                  switch(action.type){
                    case "increment":
                      return {count:state.count+1};
                    case "decrement":
                      return {count:state.count-1}
                    case "reset":
                      return init(action.payload);
                      default:
                        return new Error()
                  }
                }
                function Counter(initialCount){
                  const [state,dispatch] =useReducer(reducer,initialCount,init);
                  return(
                    <>
                    count:{state.count}
                    <button onClick={()=>dispatch({type:"resct",payload:initialCount})}>reset</button>
                    <button onClick={()=>dispatch({type:"decrement"})}>-</button>
                    <button onClick={()=>dispatch({type:"increment"})}>+</button>
                    </>
                  )
                }

          // 跳过dispatch
              // 如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行
                  // React使用Object.is比较state
              // 果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化

      // useCallback
          const memoizedCallBack=useCallback(
            ()=>{
              dosomethins(a,b);
            },
            [a,b]
          )
          // 返回一个memoized回调函数
          // 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新
          // useCallback(fn,deps) 相当与 useMemo(()=>fn,deps)

      // useMemo
          const memoizedValue = useMemo(()=>computeExpensiveValue(a,b),[a,b])
          // 返回一个memoized值
          // 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值
          // 传入 useMemo 的函数会在渲染期间执行
          // 你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证

      // useRef
          const refContainer = useRef(initialValue)
          // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）
          // 返回的 ref 对象在组件的整个生命周期内持续存在
          function TextInputWithFocusButton(){
            const inputRef = useRef(null);
            const onBUttonClick=()=>{
              // current 指向已被挂载在dom上的文本输入元素
              inputRef.current.focus()
            }
            return (
              <>
                <input ref={inputRef} type="text"/>
                <button onClick={onButtonClick}>Focus in input</button>
              </>
            )
          }
          // useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”
          // React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点
          // useRef() 比 ref 属性更有用。它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式
          // useRef 会在每次渲染时返回同一个 ref 对象
          // 当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。
              // 如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现

      // useImperativeHandle
          useImperativeHandle(ref,createHandle,[deps]);
          // useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值
          // useImperativeHandle 应当与 forwardRef 一起使用
          function FancyInput(props,ref){
            const inputRef=useRef();
            useImperativeHandle(ref,()=>({
              focus:()=>{
                inputRef.current.focus();
              }
            }))
            return <input ref={inputRef} type="text"/>
          }
          FancyInput=forwardRef(FancyInput);
          // 渲染 <FancyInput ref={inputRef} /> 的父组件可以调用 inputRef.current.focus()

      // useLayoutEffect
          // 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect
          // 可以使用它来读取 DOM 布局并同步触发重渲染
          // 在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新

      // useDebugValue
          userDebugValue(value)
          // useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签
              function useFriendStatus(friendID) {
                const [isOnline, setIsOnline] = useState(null);

                // ...

                // 在开发者工具中的这个 Hook 旁边显示标签
                // e.g. "FriendStatus: Online"
                useDebugValue(isOnline ? 'Online' : 'Offline');

                return isOnline;
              }
          // 延迟格式化debug值
              // useDebugValue 接受一个格式化函数作为可选的第二个参数
              // 该函数只有在 Hook 被检查时才会被调用。它接受 debug 值作为参数，并且会返回一个格式化的显示值
              useDebugValue(date, date => date.toDateString());

      // useDeferredValue
          const deferredValue = useDeferredValue(value);
          // useDeferredValue 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后
          // 该 hook 与使用防抖和节流去延迟更新的用户空间 hooks 类似
          // ，React 将在其他工作完成（而不是等待任意时间）后立即进行更新，并且像 startTransition 一样，延迟值可以暂停，而不会触发现有内容的意外降级
          // useDeferredValue 仅延迟你传递给它的值

      // useTransition
          const [isPending, startTransition] = useTransition();
          // 返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数
              startTransition(() => {
                setCount(count + 1);
              })
          // isPending 指示过渡任务何时活跃以显示一个等待状态

      // useId
          const id = useId();
          // useId 是一个用于生成横跨服务端和客户端的稳定的唯一 ID 的同时避免 hydration 不匹配的 hook
          // useId 生成一个包含 : 的字符串 token

      // useSyncExternalStore
          // const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);
          // useSyncExternalStore 是一个推荐用于读取和订阅外部数据源的 hook，其方式与选择性的 hydration 和时间切片等并发渲染功能兼容
          // 接受三个参数：
          //   subscribe：用于注册一个回调函数，当存储值发生更改时被调用。
          //   getSnapshot： 返回当前存储值的函数。
          //   getServerSnapshot：返回服务端渲染期间使用的存储值的函数

      // useInsertionEffect
          useInsertionEffect(didUpdate);
          // 该签名与 useEffect 相同，但它在所有 DOM 突变 之前 同步触发。使用它在读取 useLayoutEffect 中的布局之前将样式注入 DOM。
          // 由于这个 hook 的作用域有限，所以这个 hook 不能访问 refs，也不能安排更新


}


