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
            type: 'predefined'
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
            lastChecked: '12',
            isToBeFetched: true,
            isSeen: true
        },
        background: {
            isLocked: false,
            lockedUrl: '',
            id: ''
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
export const MiscConfig = config.misc;
