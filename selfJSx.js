function createElement(type, props, ...childrens) {
    // 1. 创建一个对象，（默认有type， props, ref, key 属性） 并返回
    let obj = {
        type: null,
        props: {
            children: ''
        },
        ref: null,
        key: null
    }
    // 2. 根据传递的值，修改此对象
        // type => 传递的type
        // props => 需要进行处理，大部分的props属性来源props
        //         如果是key, 或者 ref， 需要将这两个给对象，并把props中的删除
        //         把传递的children作为新创建对象props中的一个属性
    // obj = {...obj, type, props}
    obj = {...obj, type, props: {...props, children: childrens.length <= 1 ? (childrens[0] || '') : childrens}}

    'key' in obj.props ? (obj.key = obj.props.key, obj.props.key=undefined) : null
    'ref' in obj.props ? (obj.ref = obj.props.ref, obj.props.ref=undefined) : null

    return obj
}

console.log(createElement('h1', {id: 'title', key:'yang', ref:'jack', style: {'color': 'red'}}, 'woshi'))

objJSX = createElement('h1', {id: 'title', key:'yang', ref:'jack', style: {'color': 'red'}}, 'woshi')


function render(obj, container, callback) {
    let {type, props} = obj || {}
    let newElement = document.createElement(type)

    for (let attr in props) {
        if (!props.hasOwnProperty(attr)) break  // 不是私有直接结束
        if (!props[attr]) continue   // 如果属性没有值，直接不处理即可

        let value = props[attr]

        // 处理className
        if (attr === 'className'){
            newElement.setAttribute('class', value)
            continue
        }

        // 处理style
        if (attr === 'style') {
            if (value === '') continue
            for (let styKey in value) {
                if (value.hasOwnProperty(styKey))
                newElement['style'][styKey] = value[styKey]
            }
            continue
        }

        // 处理children, 为子节点( 变为文本节点)
        if (attr === 'children') {
            (!value instanceof Array) ? value = [value]: null
            value.forEach((item, index) => {
                if (typeof item === 'string') {
                    let text = document.createTextNode(item)
                    newElement.appendChild(text)
                } else {
                    render(item, newElement)
                }
            })
            
            continue
        }

        // 其他情况， 直接放入属性
        newElement.setAttribute(attr, value)
    }

    container.appendChild(newElement)
    callback && callback()
 }

 render(objJSX, root, () => {
     console.log('hello world')
 })