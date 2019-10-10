export const MessageTypeEnum = {
    APP: 'app',
    NOTES: 'notes',
    CUSTOMIZE: 'customize',
    TODOS: 'todos',
    WEATHER: 'weather',
    TODO_WRAPPER: 'todoWrapper',
    BACKGROUND: 'background',
    HISTORY: 'history',
    BACKGROUND_INFO: 'backgroundInfo',
    BOOKMARK: 'bookmark',
    CONTEXT_MENU: 'contextMenu',
    MODAL: 'modal'
};

export const Message = {
    [MessageTypeEnum.HISTORY]: {
        LOCK_COMPLETE: 'lockComplete'
    },
    [MessageTypeEnum.APP]: {
        OPEN_CUSTOMIZE: 'OpenCustomize',
        PIN: 'pin',
        TOGGLE_BACKGROUND_LOCK: 'toggleBackgroundLock',
        TOGGLE_HISTORY: 'toggleHistory',
        HIDE_BOOKMARKS: 'hideBookmarks'
    },
    [MessageTypeEnum.TODO_WRAPPER]: {
        REFRESH: 'refresh'
    },
    [MessageTypeEnum.BACKGROUND]: {
        CHANGE_LOCKED: 'changeLocked',
        THEME_RESET: 'themeReset',
        TYPE_CHANGED: 'typeChanged',
        CHANGE_BACKGROUND: 'changeBackground'
    },
    [MessageTypeEnum.BACKGROUND_INFO]: {
        WALLPAPER_CHANGED: 'wallpaperChanged'
    },
    [MessageTypeEnum.BOOKMARK]: {
        EDIT: 'edit',
        ADD: 'add',
        DELETE: 'delete',
        OPEN_NEW_TAB: 'open_new_tab',
        HIDE_BAR: 'hide_bookmarks'
    },
    [MessageTypeEnum.CONTEXT_MENU]: {
        OPEN: 'open',
        CLOSE: 'close'
    },
    [MessageTypeEnum.MODAL]: {
        OPEN: 'open',
        CLOSE: 'close',
        ADD: 'add',
        EDIT: 'edit',
        UPDATE: 'update'
    }
};
export const AppMessage = Message[MessageTypeEnum.APP];
export const TodoWrapperMessage = Message[MessageTypeEnum.TODO_WRAPPER];
export const BackgroundMessage = Message[MessageTypeEnum.BACKGROUND];
export const HistoryMessage = Message[MessageTypeEnum.HISTORY];
export const BackgroundInfoMessage = Message[MessageTypeEnum.BACKGROUND_INFO];
export const BookmarkMessage = Message[MessageTypeEnum.BOOKMARK];
export const ContextMenuMessage = Message[MessageTypeEnum.CONTEXT_MENU];
export const ModalMessage = Message[MessageTypeEnum.MODAL];