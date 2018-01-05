const config = {
    defaultCustomization: {
        showUtilities: {
            showWeather: true,
            showClock: true,
            showNotes: true
        },
        clock: {
            showTwelveHour: true,
            showDay: true,
            type: 'twelve'
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
            changeInterval: 2,
            type: 'predefined'
        }
    },
    misc: {
        update: {
            lastChecked : '0020',
            isToBeFetched : true,
            isSeen: true
        }
    }
};
export default config;
