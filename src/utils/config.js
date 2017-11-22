const config = {
    defaultCustomization: {
        showUtilities: {
            showWeather: true,
            showClock: true,
            showNotes: true
        },
        clock: {
            showTwelveHour: true,
            showDay: true
        },
        weather: {
            unit: 'c',
            location: {
                type: 'geo',
                name : ''
            }
        },
        background: {
            themeId: 1,
            changeInterval: 10,
            type: 'predefined'
        }
    }
};
export default config;
