export const MessageTypeEnum = {
    APP: 'app',
    NOTES: 'notes',
    CUSTOMIZE: 'customize',
    TODOS: 'todos',
    WEATHER: 'weather',
    TODO_WRAPPER: 'todoWrapper'
};

export const Message = {
    [MessageTypeEnum.APP]: {
        OPEN_CUSTOMIZE: 'OpenCustomize',
        PIN: 'pin'
    },
    [MessageTypeEnum.TODO_WRAPPER]: {
        REFRESH: 'refresh'
    }
};
export const AppMessage = Message[MessageTypeEnum.APP];
export const TodoWrapperMessage = Message[MessageTypeEnum.TODO_WRAPPER];