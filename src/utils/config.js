const config = {
    defaultCustomization: {
        showUtilities: {
            showWeather: true,
            showClock: true,
            showNotes: true,
            showTodos: true
        },
        clock: {
            showTwelveHour: true,
            showDay: true,
            type: 'twelve',
            calendar: {
                isPinned: false
            }
        },
        weather: {
            unit: 'c',
            location: {
                type: 'geo',
                name: ''
            },
            weatherInfo: {
                isPinned: false
            }
        },
        background: {
            themeId: 1,
            changeInterval: 2,
            type: 'predefined',
            changeLocked: false
        },
        notes: {
            isPinned: false
        },
        todos: {
            type: 'default',
            isPinned: false
        }
    },
    misc: {
        update: {
            lastChecked: '0020',
            isToBeFetched: true,
            isSeen: true
        }
    },
    other: {
        weather: {
            showWeatherInfo: false
        }
    }
};
export default config;

export const DefaultConfig = config.defaultCustomization;
