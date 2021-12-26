export function createElement(tag, classList) {
    const element = document.createElement(tag)
    if (classList) {
        element.classList.add(classList)
    }
    return element
}

export const random = (num) => Math.ceil(Math.random() * num)


const timeString = (time) =>  time < 10 ? `0${time}`: time

export function dateText() {
    const date = new Date()
    const dateText = `${timeString(date.getHours())}:${timeString(date.getMinutes())}:${timeString(date.getSeconds())}`
    
    return dateText
}