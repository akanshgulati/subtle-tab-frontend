export default {
    themes: [
        {
            id: 1,
            lValue: 'Travel',
            value: 'travel'
        },
        {
            id: 2,
            lValue: 'Nature',
            value: 'nature'
        },
        {
            id: 3,
            lValue: 'Architecture',
            value: 'architecture'
        }
    ],
    getCurrentTheme(id){
        let themes = this.themes;
        for (let i = 0; i < themes.length; i++) {
            if(themes[i].id === id){
                return themes[i];
            }
        }
    }
}