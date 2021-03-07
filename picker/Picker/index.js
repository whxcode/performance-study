/**
 *  pickers: Array<{ value:number,name: string }> 候选项
 *  defaultIndex: number 默认选项
 * */
function _change(e) {
    e.stopPropagation()
    const target = e.target
    const type = target.getAttribute('data-type')
    if (type != 0) {
        return
    }
    const value = target.getAttribute('data-value')
    const realIndex = this.pickers.findIndex(item => item.value == value)
    this._index = realIndex

    this.content.style.display = 'none'

    this.icon.className = 'icon triangle-up'

}

function generator(data, active) {
    const dataFilter = data
    if (!dataFilter.length) {
        return `<div class="not-data">没有找到相关数据</div>`
    }
    return dataFilter.map((item, index) => {
        const value = data[active] ? data[active].value : -1
        return `<div class="${['option', item.value == value ? ' active' : ''].join('')}" data-type="0" data-index="${index}"
        data-value="${item.value}"
 >${item.name}</div>`
    }).join('')
}

function parseHTML(template) {
    // template = template.replace(/\s/ig,'')

    const div = document.createElement('div')
    div.innerHTML = template
    return div.children[0]
}

function render() {
    const {pickers, defaultIndex} = this
    const template = `
            <div>
            ${generator(pickers, defaultIndex)}
            </div>
         `
    const ls = [...parseHTML(template).children]
    this.content.innerHTML = ''
    for (const l of ls) {
        this.content.appendChild(l)
    }
    return this
}

function destroy() {
    this.el.remove()
    window.removeEventListener('click', this.onWindowClick)

}

function onWindowClick() {
    this.content.style.display = 'none'
}

/**
 * 选择器构造函数
 * @param pickers :Array<{ name: any,value: number }> 选择列表
 * @param parentNode: HTMLElement 父节点
 * @param defaultIndex :number 默认选中的下标 没有可填写 -1
 * @return PickerObject
 * */
function Picker(pickers, parentNode, defaultIndex = -1) {
    if (!pickers.length || !Array.isArray(pickers)) {
        console.error('传入的数据必须是一个数组或者数组不能为空')
        return null
    }


    const el = document.createElement('div')
    const hold = parseHTML(`<div>请选择</div>`)
    const content = document.createElement('div')
    const icon = document.createElement('span')
    icon.className = 'icon triangle-up'
    hold.className = 'hold'
    el.className = 'picker'
    content.className = 'content'
    el.appendChild(hold)
    el.appendChild(content)
    el.appendChild(icon)
    content.style.display = 'none'
    parentNode.appendChild(el)

    const Pickers = {
        el,
        content,
        hold,
        pickers,
        defaultIndex,
        set _index(val) {
            if (val < 0 || val > this.pickers.length) {
                this.defaultIndex = val
                return
            }
            this.defaultIndex = val
            this.hold.innerText = this.holdText
            this.events['change'] && this.events['change'](this.pickers[val])
            this.render()
        },
        get holdText() {
            const value = this.pickers[this.defaultIndex]
            return value ? value.name : '请选择'
        },
        render,
        parentNode: null,
        onWindowClick,
        destroy,
        icon,
        events: {},
        __proto__: Picker.prototype
    }


    hold.onclick = () => {
        content.style.display = 'block'
        icon.className = 'icon triangle-down'
        window.event.stopPropagation()
    }

    el.addEventListener('click', _change.bind(Pickers))
    Pickers.onWindowClick = onWindowClick.bind(Pickers)
    window.addEventListener('click', Pickers.onWindowClick)
    hold.innerText = Pickers.holdText
    Pickers.render()

    setTimeout(() => {
        const value = Pickers.pickers[defaultIndex]
        if (defaultIndex != -1 && value && Pickers.events['change']) {
            Pickers.events['change'](value)
        }
    })
    return Pickers
}

Picker.prototype.on = function (name, fn) {
    this.events[name] = fn
}
