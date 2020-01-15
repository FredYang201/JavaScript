// console.log("OOK")

// 这两个导入的时候，接收成员必须这么写
import React from 'react';  // 创建组件，虚拟dom元素，生命周期
import ReactDOM from 'react-dom'; // 把创建好的 组件 和 虚拟dom 放到页面上展示

// 2. 创建虚拟DOM元素
// 参数1： 创建元素的类型，字符串， 表示这个元素的名称
// 参数2：是一个对象或者null， 表示 当前这个DOM元素的属性
// 参数3：子节点（包括其他 虚拟DOM 或者 文本子节点）
// 参数n: 其他子节点

// h1
// const myh1 = React.createElement('h1', null, 'zheshiyge');
const myh1 = React.createElement('h1', {id: 'myh1', title: 'this is h1'}, 'zheshiyge');

const myDiv = React.createElement('div', null, 'zheshi', myh1);


// 3. 使用ReactDom把虚拟DOM渲染到页面上
// 参数1：要渲染的那个虚拟DOM元素
// 参数2：指定的一个页面上容器，放到容器内

// 不能是选择器
// ReactDOM.render(myh1, "#app");

// 第二个参数应该是一个DOM元素
// ReactDOM.render(myDiv, document.getElementById("app"));


// 渲染 页面上的 DOM元素 的最好方式，就是写HTML代码

// js文件中默认不能写这种类似于 HMTL的标记， 否则打包失败
// 可以使用babel来转换，这些JS中的标记
// 这种在JS中，混合写入类似于HTML的语言，叫做JSX语法，符合XML规范
// JSX语法的本质，内部在在运行的时候，被转换为React.createElement的形式来执行

// npm install babel-core babel-loader babel-plugin-transform-runtime -D
// npm install babel-preset-env babel-preset-stage-0 

// const mydiv = <div id="mydiv" title="This is Div"> zheshi ygediv</div>
// ReactDOM.render(mydiv, document.getElementById('app'))


// JSX中要使用JS语法变量，
// 放到{}中

// 需要在JSX控制的语句内写入js代码， 就需要{}
// {}内部可以是 mydiv的jSX对象
// const a = 100
// const secondDev = <div id = {a}>{a}</div>

// ReactDOM.render(secondDev, document.getElementById('app'))

const a = 10
const str = 'Hello world'
const boo = true
const title = 'I love'
const arr = ['one', 'second', 'third']

function Hello(props) {
    return <div>My name is {props.namess}</div>
}

var names = 'Bob'

ReactDOM.render(
<div>
    <hr/>
    {a}
    <hr/>
    {str}
    <hr/>
    {boo.toString()}
    <hr/>
    {title}
    {/* react 中需要把key属性加入到map，forEach， for中最外层的元素 */}
    {/* 注释  */}
    {/* 单行注释 */}
    {
        //
    }
    {/* JSX 中添加类给元素用的是className关键字（因为class为js关键字）， for属性（label）用htmlFor代替 */}
    {arr.map(item => <h3>{item}</h3>)}
    <Hello namess={names}></Hello>
</div>, document.getElementById('app'))
