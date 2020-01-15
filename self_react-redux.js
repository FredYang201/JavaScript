import React from 'react'
import PropTypes from 'prop-types'
import { type } from 'os'
import { map } from 'async'

/*
    Provider: 当前项目的根组件
    1. 接收通过属性传递进来的store，把store挂载到当前项目中任何一个组件中，
        使用redux中的store，使用上下文获取即可
    
    2. 在组件（Provider)的render函数中，把传递给Provider的子元素渲染
*/
class Provider extends React.Component {
    //=> 设置上下文信息
    static childContextTypes = {
        store: PropTypes.object,
    }

    //=> 设置上下文信息值
    getChildContext() {
        return {
            store: this.props.store
        }
    }


    constructor(props, context) {
        super(props, context)
    }

    render() {
        //=> 闭合标签的子元素
        return this.props.children
    }
}


/*
    connect: 高阶组件（基于高阶函数，柯理化函数（函数返回一个函数））创建的组件就是高阶组件
    参数： 
        mapStateToProps: 回调函数，把redux中的部分状态信息挂载到指定组件的属性上
        ```
            function mapStateToProps (state) {
                //=> state: redux容器中的状态信息
                return {}； //=> return对象中有啥 ，就把啥挂载到属性上
            }
        ```
            
        mapDispatchToProps：回调函数，把一些需要派发的任务方法也挂载到组件的属性上
        ```
            function mapDispatchToProps(dispatch) {
                //=> dispatch: store中的dispatch
                return {
                    init() {
                        dispatch({...})
                    },
                }
                //=> return啥就将啥方法挂载到属性中
            }
        ```
    
    返回值：
        返回一个新函数：connectHOT
            参数： 传递进来的是要操作的组件，我们需要将指定的属性和方法挂载到组件中
            返回结果：返回一个组件(Proxy, 代理组件)，在代理组件中，我们需要获取Provider在
                    上下文中存储的store，紧接着获取store中的state和dispatch，把mapStateToProps，
                    mapDispatchToProps回调函数执行，接收返回的结果，再把这些结果挂载到
                    Component这个要操作组件的属性上
            
*/



function connect(mapStateToProps, mapDispatchToProps) {
    return function connectHOT(Component) {
        return class Proxy extends React.Component {
            static contextTypes = {
                store: PropTypes.object
            }

            
            //=> 获取store中的state/dispatch, 把传递的两个回调函数执行，接收返回的结果
            constructor(props, context) {
                super(props, context)
                this.state = this.queryMountProps()
            }


            //=> 从redux中获取最新的信息，机遇回调函数筛选，返回需要挂载到组件属性上的信息和派发任务
            queryMountProps = () => {
                let {store} = this.context
                let state = store.getState()
                let propsStates = typeof mapStateToProps === 'function'? mapStateToProps(state): {}
                let propsDispatch = typeof mapDispatchToProps === 'function'?mapDispatchToProps(store.dispatch): {}

                return {
                    ...propsDispatch,
                    ...propsStates
                }
            }


            //=> 基于redux中的subscribe向时间池追加一个方法，当容器中状态改变，我们需要重新获取到最新的状态信息，
                // 并且把component渲染，把最新的状态信息通过属性传递给component
            
            componentDidMount() {
                this.context.store.subscribe(() => {
                    this.setState(
                        this.queryMountProps()
                    )
                })
            }


            //=> 渲染component组件，并将获取的信息（状态、方法）挂载到组件属性上(单独调取Proxy
                    //组件的时候传递的属性也给component)
            render() {
                return <Component {...this.state} {...this.props}>
                </Component>
            }
        }

    }
}

export {
    Provider
}