export function createElement(tag, classList) {
    const element = document.createElement(tag)
    if (classList) {
        element.classList.add(classList)
    }
    return element
}

export function random(num) {
    return Math.ceil(Math.random() * num)
}