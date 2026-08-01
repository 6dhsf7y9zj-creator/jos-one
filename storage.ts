import { APP_VERSION, normaliseData } from './domain.js';
import type { AppData } from './types.js';
const KEY='jos-one-data-v1';
const LEGACY_KEYS=['jos-items-v06','jos-items-v05','jos-items-v04','jos-items-v03','jos-items-v02'];
const LEGACY_ORDER_KEYS=['jos-orders-v06','jos-orders-v05','jos-orders-v04','jos-orders-v03','jos-orders-v02'];
function parse<T>(value:string|null):T|null { try{return value?JSON.parse(value) as T:null}catch{return null} }
export function loadData(fallback:AppData):AppData { const current=parse<Partial<AppData>>(localStorage.getItem(KEY)); if(current)return normaliseData(current,fallback); let items=fallback.items,orders=fallback.orders; for(const k of LEGACY_KEYS){const v=parse<typeof items>(localStorage.getItem(k));if(Array.isArray(v)){items=v;break;}} for(const k of LEGACY_ORDER_KEYS){const v=parse<typeof orders>(localStorage.getItem(k));if(Array.isArray(v)){orders=v;break;}} const migrated={version:APP_VERSION,items,orders}; saveData(migrated); return migrated; }
export function saveData(data:AppData):void { localStorage.setItem(KEY,JSON.stringify({...data,version:APP_VERSION})); }
export function exportData(data:AppData):void { const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`JOS-One-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500); }
