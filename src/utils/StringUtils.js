export const titleCase = (text) => {
    if (!text) {
        return
    }
    return text.charAt(0).toUpperCase() + text.slice(1)
}