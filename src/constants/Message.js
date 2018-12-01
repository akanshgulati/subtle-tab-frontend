export const MessageTypeEnum = {
    APP: 'app',
    NOTES: 'notes',
    CUSTOMIZE: 'customize',
    TODOS: 'todos',
    WEATHER: 'weather',
    TODO_WRAPPER: 'todoWrapper',
    BACKGROUND: 'background'
};

export const Message = {
    [MessageTypeEnum.APP]: {
        OPEN_CUSTOMIZE: 'OpenCustomize',
        PIN: 'pin',
        TOGGLE_BACKGROUND_LOCK: 'toggleBackgroundLock'
    },
    [MessageTypeEnum.TODO_WRAPPER]: {
        REFRESH: 'refresh'
    },
    [MessageTypeEnum.BACKGROUND]: {
        CHANGE_LOCKED: 'changeLocked',
        THEME_RESET: 'themeReset',
        TYPE_CHANGED: 'typeChanged'
    }
};
export const AppMessage = Message[MessageTypeEnum.APP];
export const TodoWrapperMessage = Message[MessageTypeEnum.TODO_WRAPPER];
export const BackgroundMessage = Message[MessageTypeEnum.BACKGROUND];