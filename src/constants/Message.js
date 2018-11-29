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
        PIN: 'pin'
    },
    [MessageTypeEnum.TODO_WRAPPER]: {
        REFRESH: 'refresh'
    },
    [MessageTypeEnum.BACKGROUND]: {
        CHANGE_LOCKED: 'changeLocked'
    }
};
export const AppMessage = Message[MessageTypeEnum.APP];
export const TodoWrapperMessage = Message[MessageTypeEnum.TODO_WRAPPER];
export const BackgroundMessage = Message[MessageTypeEnum.BACKGROUND];