export const titleCase = (text) => {
    try {
        if (!text) {
            return
        }
        return text.charAt(0).toUpperCase() + text.slice(1)
    } catch (e) {
        // TODO :: Add a log here
    }
}