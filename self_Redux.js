
function createStore(reducer) {
    //=> 创建一个store, state用来存储管理的状态信息，listen-ary用来存储事件池中的方法
    //=> state不用设置初始值，因为第一次dispatch执行reducer, state没有值，走的是reducer中赋值state的初始值
        // 我们自己会在创建容器的时候就将dispatch执行一次
    let state
    let listenAry = []


    // method 1. 基于dispatch实现任务派发
    function dispatch(action) {
        // 1. 执行reducer, 修改容器中的状态信息, 将返回值替换原有的state
            // 值得注意的是此处是将返回值全部替换state，所以要求在reducer修改状态之前，
            // 要先将reducer中的state保存一下（在reducer中已经实现了(...state)}
        state = reducer(state, action)

        // 2. 通知事件池中的事件执行
        for (let i = 0; i < listenAry.length; i++){
            let item = listenAry[i]
            if (typeof item === 'function') {
                item();
            } else {
                listenAry.splice(i, 1)
                //=> 解决数组塌陷 (源码中没有，会出错)
                i--
            }
        }
    }

    //=>创建容器的时候执行一次次dispatch，目的是将reducer中的默认状态信息值赋给redux中的状态信息值
    dispatch({'type': '$$INIT_DEFAULT_STATE'}) 
        

    // method 2. getState 获取容器中的状态信息
    function getState() {
        //=> 我们需要保证返回的状态信息不能和容器中的state是同一个堆内存地址（否则在外面就可以
            // 直接修改容器中的状态了，这不符合dispatch => reducer才能修改状态的规范）
        // 浅克隆(对象内部中的对象仍然是堆）：{...state}
        
        // 深度克隆，先变为字符串，再变为对象 （源码有问题，没有进行深度克隆）
        return JSON.parse(JSON.stringify(state))
    }


    // method 3. 向事件池中添加方法
    function subscribe(fn) {
        //=> 重复验证
        let isExit = listenAry.includes(fn)
        !isExit? listenAry.push(fn) : null

        //=> 返回一个方法，执行此返回方法回家将当前绑定的方法在事件池中移除
        return function unsubscribe() {
            let index = listenAry.indexOf(fn)
            listenAry[index] = null
        }
    }


    // 返回对象接口调用
    return {
        dispatch,
        getState, 
        subscribe
    }
}

function combineReducers(reducers) {
    //=> 合并reducers
    //=> 传入一个对象参数，包含了每一个模板对应的reducer, eg: {xxx:reducer, xxx:reducer}
    //=> 返回的也就是一个新的reducer函数，赋值给createStore

    //=> 特殊处理： 合并reducer之后，redux容器中的state也变为以对应对象管理的模式, eg: {xxx:{}, xxx:{}}
    
    //=> 原来的state也是{vote:{n,m}, personal:{}}格式
    return function reducer(state = {}, action) {
        //=> dispatch派发执行的时候，执行的事返回的reducer，这里也需要返回一个最终的state对象替换原有的state，
            // 而且这个state中包含每个模块的状态信息
        //=> 所谓的reducer合并，其实就是dispatch派发任务的时候，就是把每一个模块的reducer都单独执行一遍
            // 把每个模块返回的状态最后汇总在一起，替换原容器中的状态
        
        let newState = {}
        for (key in reducers) {
            if (!reducers.hasOwnProperty(key)) break
            // reducers[key]: 每个模块单独的reducer
            // state[key]: 当前模块在redux中存储的状态信息
            // 返回值是当前模块最新的状态，把他存储到newState中
            newState[key] = reducers[key](state[key], action)
        }
        return newState 
    }
}

