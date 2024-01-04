/**
 * 滚动条处理
 */
export const scrollActive = {
    bind (element, binding) {
        // console.log('bind')
    },
    inserted () {
        // console.log('inserted')
    },
    update () {
        // console.log('update')
    },
    componentUpdated (element, binding) {
        try {
            let el = element
            const selector = binding.value?.selector
            if (selector) {
                el = el.querySelector(selector) || el
            }
            const hideScroll = debounce((el) => {
                el.classList.add('dom-scrollbar-hide')
                el.classList.remove('dom-scrollbar-show')
            }, 3000)
            el.classList.add('dom-scrollbar-hide')
            el.addEventListener('scroll', function () {
                if (Array.from(el.classList).includes('dom-scrollbar-show')) {
                    // 滚动条存在，利用防抖，三秒后消失
                    hideScroll(el)
                    return
                }
                el.classList.add('dom-scrollbar-show')
                el.classList.remove('dom-scrollbar-hide')
            })
        } catch (e) {
            console.error('滚动条样式调整失败', e)
        }
    },
    unbind (element, binding) {
        let el = element
        if (el) {
            const selector = binding.value?.selector
            if (selector) {
                el = element.querySelector(selector) || element
            }
            el.removeEventListener('scroll', () => {})
        }
    }
}
