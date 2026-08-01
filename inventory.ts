import type { InventoryItem, ItemStatus } from '../types/inventory'
export const STORAGE_KEY='jos-one.inventory.v2'
export const statuses:ItemStatus[]=['Prep','Photographed','Live','Sold','Dispatched']
export function expectedProfit(i:InventoryItem){ return Math.max(0,i.expectedSalePrice-i.purchasePrice) }
export function nextStatus(s:ItemStatus):ItemStatus { return statuses[Math.min(statuses.indexOf(s)+1,statuses.length-1)] }
export function generateSku(items:InventoryItem[]){ const n=items.reduce((m,i)=>Math.max(m,Number(i.sku.match(/(\d+)$/)?.[1]||0)),0)+1; return `JAE-${String(n).padStart(4,'0')}` }
export function loadItems():InventoryItem[]{ try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')}catch{return []} }
export function saveItems(items:InventoryItem[]){ localStorage.setItem(STORAGE_KEY,JSON.stringify(items)) }
