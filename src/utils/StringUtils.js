export const titleCase = (text) => {
    try {
        if (!text) {
            return
        }
        return text.charAt(0).toUpperCase() + text.slice(1)
    } catch (e) {
        // TODO :: Add a log here
    }
};
/**
 * Converts an image to base 64 characters
 * @param src
 * @param callback
 * @returns {boolean}
 */
export const toDataURL = (src, callback) => {
    try {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            const canvas = document.createElement('CANVAS');
            const ctx = canvas.getContext('2d');
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            callback(canvas.toDataURL());
        };
        img.src = src;
    } catch (e){
        return false;
    }
};