// addEventListener(type,listener,userCapure)
    // userCapure:true:只在捕获阶段触发，false:只在冒泡阶段触发  默认false

//事件传播
    // 一件事发生后，父元素和子元素之间的传播
        // 第一阶段：从window对象传导到目标节点（上层传到底层），称事件捕获
        // 第二阶段：从目标节点触发，称为目标阶段
        // 第三阶段：从目标节点传回window对象（从底层传回上层），称事件冒泡
    // 事件代理
        // 由于事件会在冒泡阶段向上传播到父节点，因此把子节点的监听函数定义到父节点上，由父节点监听函数统一处理多个子元素的事件
        // cancelable:返回一个布尔值，表示该事件是否可以取消
        // preventDefault()：取消浏览器对当前事件的默认行为；
            // 调用之前，判断一下Event.calcelable属性是否为true
            /*if (event.cancelable) {
              event.preventDefault();
            }*/
        // cancelBubble：属性是一个布尔值，可以阻止事件的传播;
            // 如果设为true，相当于执行Event.stopPropagation()
        // stopPropagation：阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数
            // 但是不包括在当前节点上其他的事件监听函数
        //stopImmedaitePropagation:阻止该事件的传播；比stopPropagation更彻底
              // 阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点

