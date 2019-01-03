import {Get} from './storage'
import {STORAGE} from './Constants';
import {MiscConfig} from './config'
export const MiscSettings = Get(STORAGE.MISC_SETTINGS) || MiscConfig;