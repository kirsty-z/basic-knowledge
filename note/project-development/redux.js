// 1.三大原则
    //数据单一
    // state只读
    // 使用纯函数来执行修改

// 2.原理
    // redux要求我们把数据放在store公共存储空间
    // 一个组件改变了store里的数据内容，其他组件就能感知到store的变化，再来取数据，从而间接实现了这些数据传递功能
    // 如图：redux工作原理.png
        // react Component需要获取一些数据，告知store需要获取数据，action creator是要什么数据
        // store接收之后去reducer查一下，reducer会告诉store应该这个组件什么数据

// 3.使用
    // 创建一个store的公共数据区域
    // 创建一个记录本辅助管理数据，reducer，本质是一个函数，接收两个参数state，action，返回state
    // 将记录本传递给store，建立链接
    // 更改数据，通过dispatch来派发action，action通常会有type属性，亦可以携带其他数据
      import {createStore} from "redux"
      const initialState={
        counter:0
      }
      const reducer=(state,action)=>{
        switch(action.type){
          case "INCREMENT":
            return {...state,counter:state.counter+1};
          case "DECREMENT":
            return {...state,counter:state.counter-1};
          case "ADD_NUMBER":
            return{...state,counter:state.counter+action.number};
          default:
              return state;
        }
      }
      const store = createStore(reducer)
      store.subscribe(()=>{
        console.log(store.getState());
        return ()=>{
          unsubscribe();
        }
      })
      store.dispatch({
        type:"DECREMENT"
      })
      store.dispatch({
        type:"ADD_NUMBER",
        number:5
      })
    // createStore可以帮助创建store
    // store.dispatch可以帮助派发action，action会传递给store
    // store.getState可以帮助获取store里边所有数据的内容
    // store.subscribe方法可以订阅store的改变，只要store发生变化，store.subscribe这个函数接收的这个回调函数就会被执行

// 3.中间件
      // redux-thunk：用于异步操作
      // redux-logger：用于日志记录

// 4.react-redux
      // 将组件分成
        // 容器组件：存在逻辑处理
        // UI组件：只负责显示和交互，内容不处理逻辑，状态由外部控制
      // 通过redux将整个应用状态存储到store中，组件可以派发dispatch行为action给store
      // 其他组件通过订阅store中的状态state来更新自身的视图
      // 分为两大核心
          // Provider
              // 将store存放在顶层元素，其他组件都被包裹在顶层元素之上，那么所有组件都能够受到redux的控制，都能获取到redux中的数据
          // connection
              // connect方法将store上的getState和dispatch包装成组件的props
              connect(mapStateToProps,mapDispatchToProps)(myComponent)
              // 传递两个参数
              // mapStateToProps：将redux中的数据映射到react中的props中去
              // mapDispatchToProps：将redux中的dispatch映射到组件内部的props中

