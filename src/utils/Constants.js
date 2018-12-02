const BASE_API = 'https://api.subtletab.com/'

export const G_CAL = {
    URL: {
        BASE: 'https://www.googleapis.com/calendar/v3/',
        LIST: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
        REFRESH: 'https://api.subtletab.com/integrations/calendar/refresh',
        ORIGIN: 'https://www.googleapis.com/calendar',
        KB_INTEGRATION_SUBTLE: 'https://www.subtletab.com/#/kb/integrations/calendar',
        INTEGRATION_SUBTLE: 'https://www.subtletab.com/#/integrations/calendar'
    }
}
export const WUNDERLIST = {
    URL: {
        BASE: 'https://a.wunderlist.com/api/v1',
        LISTS: 'https://a.wunderlist.com/api/v1/lists',
        TASKS: 'https://a.wunderlist.com/api/v1/tasks',
        ORIGIN: 'https://*.wunderlist.com/',
        KB_INTEGRATION_SUBTLE: 'https://www.subtletab.com/#/kb/integrations/wunderlist',
        INTEGRATION_SUBTLE: 'https://www.subtletab.com/#/integrations/wunderlist'
    }
}
export const TODOIST = {
    URL: {
        BASE: 'https://todoist.com/api/v7/sync',
        LISTS: 'https://beta.todoist.com/API/v8/projects',
        TASKS: 'https://beta.todoist.com/API/v8/tasks',
        ORIGIN: 'https://*.todoist.com/',
        KB_INTEGRATION_SUBTLE: 'https://www.subtletab.com/#/kb/integrations/todoist',
        INTEGRATION_SUBTLE: 'https://www.subtletab.com/#/integrations/todoist'
    }
}
const constants = {
    THEME: {
        NATURE: 'nature',
        ARCHITECTURE: 'building',
        TRAVEL: 'travel',
        NIGHT: 'night'
    },
    STORAGE: {
        SHARED_DATA: 'shared-data',
        MISC_SETTINGS: 'misc_settings',
        WEATHER: 'weather',

        BACKGROUND_SEEN_NIGHT: 'bg-seen-night',
        BACKGROUND_SEEN_TRAVEL: 'bg-seen-travel',
        BACKGROUND_SEEN_BUILDING: 'bg-seen-building',
        BACKGROUND_SEEN_NATURE: 'bg-seen-nature',
        BACKGROUND_CUSTOM: 'bg-custom',
        BACKGROUND_SEEN_CUSTOM: 'bg-seen-custom',
        BACKGROUND_LOCKED: 'bg-locked',

        CURRENT_PAGE: 'current-page',
        SEEN_ONBOARDING: 'seen-onboarding',
        NOTES_META: 'notes_meta',
        WHATS_NEW: 'whats_new',
        CURRENT_CUSTOMIZATION_TAB: 'current_c_tab',
        SUBTLE_USER: 'subtle_user',
        G_CAL_AUTH: 'g_cal_auth',

        TODOS_META: 'todos_meta',
        TODO_LISTS_META: 'todo_lists_meta',
        TODO_LIST: 'todo_list_',
        TODO: 'todo_',
        CURRENT_TODO_LIST: 'current_todo_list',

        W_CURRENT_TODO_LIST: 'w_current_todo_list',
        W_ROOT_REVISION: 'w_root_revision',
        W_LISTS: 'w_lists',
        W_LISTS_META: 'w_lists_meta',
        W_LIST: 'w_list_',
        W_TODOS: 'w_todos',
        W_TODO: 'w_todo_',
        W_TODOS_META: 'w_todos_meta',
        W_AUTH: 'w_auth',

        T_CURRENT_TODO_LIST: 't_current_todo_list',
        T_LISTS_META: 't_lists_meta',
        T_LIST: 't_list_',
        T_TODO: 't_todo_',
        T_TODOS_META: 't_todos_meta',
        T_AUTH: 't_auth',
        T_SYNC_TOKEN: 't_sync_token'
    },
    SYNC: [
        'shared-data',
        'bg-seen-nature',
        'bg-seen-night',
        'bg-seen-travel',
        'bg-seen-building',
        'current-page',
        'nature',
        'travel',
        'building',
        'night',
        'notes_meta',
        'notes-',
        'bg-custom',
        'bg-seen-custom',
        'misc_settings',
        'subtle_user'
    ],
    URL: {
        WHATS_NEW: BASE_API + 'whatsnew',
        G_CAL_KB_INTEGRATION: G_CAL.URL.KB_INTEGRATION_SUBTLE,
        G_CAL_INTEGRATION: G_CAL.URL.INTEGRATION_SUBTLE,
        WUNDERLIST_KB_INTEGRATION: WUNDERLIST.URL.KB_INTEGRATION_SUBTLE,
        WUNDERLIST_INTEGRATION: WUNDERLIST.URL.INTEGRATION_SUBTLE,
        TODOIST_KB_INTEGRATION: TODOIST.URL.KB_INTEGRATION_SUBTLE,
        TODOIST_INTEGRATION: TODOIST.URL.INTEGRATION_SUBTLE
    }
}

export default constants

export const STORAGE = constants.STORAGE