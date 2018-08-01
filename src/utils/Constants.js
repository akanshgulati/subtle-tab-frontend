const BASE_API = 'https://api.subtletab.com/'

export const G_CAL = {
  URL: {
    BASE: 'https://www.googleapis.com/calendar/v3/',
    LIST: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    REFRESH: 'https://api.subtletab.com/integrations/calendar/refresh',
    ORIGIN: 'https://www.googleapis.com/',
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
      W_CURRENT_TODO_LIST: 'w-current_todo_list',
      W_ROOT_REVISION: 'w-root-revision',
      W_LISTS: 'w-lists',
      W_TODOS: 'w-todos',
      W_TODO: 'w-todos-',
      W_TODOS_META: 'w-todos_meta',
      W_AUTH: 'w-auth'
    },
    SYNC: [
        'shared-data', 'bg-seen-nature', 'bg-seen-night', 'bg-seen-travel', 'bg-seen-building', 'current-page', 'nature', 'travel', 'building', 'night',
        'notes_meta', 'notes-', 'bg-custom', 'bg-seen-custom', 'misc_settings', 'subtle_user'
    ],
    URL : {
        WHATS_NEW : BASE_API + 'whatsnew',
      G_CAL_KB_INTEGRATION: G_CAL.URL.KB_INTEGRATION_SUBTLE,
      G_CAL_INTEGRATION: G_CAL.URL.INTEGRATION_SUBTLE,
      WUNDERLIST_KB_INTEGRATION: WUNDERLIST.URL.KB_INTEGRATION_SUBTLE,
      WUNDERLIST_INTEGRATION: WUNDERLIST.URL.INTEGRATION_SUBTLE
    }
};

export default constants

export const STORAGE = constants.STORAGE