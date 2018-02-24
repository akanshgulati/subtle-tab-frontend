const BASE_API = 'https://api.subtletab.com/'
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
        SUBTLE_USER: 'subtle_user'
    },
    SYNC: [
        'shared-data', 'bg-seen-nature', 'bg-seen-night', 'bg-seen-travel', 'bg-seen-building', 'current-page', 'nature', 'travel', 'building', 'night',
        'notes_meta', 'notes-', 'bg-custom', 'bg-seen-custom', 'misc_settings', 'subtle_user'
    ],
    URL : {
        WHATS_NEW : BASE_API + 'whatsnew'
    }
};

export default constants
