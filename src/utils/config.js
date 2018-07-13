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
            type: 'twelve',
          calendar: {
              isPinned: true
          }
        },
        weather: {
            unit: 'c',
            location: {
                type: 'geo',
                name : ''
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
          type: 'default'
        }
    },
    misc: {
        update: {
            lastChecked : '0020',
            isToBeFetched : true,
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
