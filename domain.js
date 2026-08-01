export const APP_VERSION = '1.0.1';
export const FLOW = ['Prep', 'Photographed', 'Live', 'Sold', 'Dispatched', 'Archived'];
export function money(n) { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(n || 0)); }
export function nextSku(items) { let max = 0; for (const x of items) {
    const m = String(x.sku || '').match(/(\d+)$/);
    if (m)
        max = Math.max(max, Number(m[1]));
} return `JAE-${String(max + 1).padStart(4, '0')}`; }
export function metrics(items, orders) {
    const active = items.filter(x => !['Archived', 'Dispatched'].includes(x.status)).length;
    const cost = items.reduce((s, x) => s + Number(x.landedCost ?? x.purchasePrice ?? 0), 0);
    const profit = items.reduce((s, x) => s + Number(x.expectedProfit ?? (x.expectedSale - x.landedCost)), 0);
    return { active, cost, profit, prep: items.filter(x => x.status === 'Prep').length, photographed: items.filter(x => x.status === 'Photographed').length, live: items.filter(x => x.status === 'Live').length, old: items.filter(x => x.daysInStock > 60).length, missing: items.filter(x => !x.storage || x.storage === 'TBC').length, orders: orders.length };
}
export function healthScore(items, orders) { const m = metrics(items, orders); let s = 100; s -= Math.min(20, m.prep * 2); s -= Math.min(15, m.old); s -= Math.min(10, m.missing); s -= Math.min(10, orders.filter(x => x.deadline === 'Today').length * 3); return Math.max(45, Math.round(s)); }
export function advanceStatus(item) { const i = FLOW.indexOf(item.status); const next = FLOW[Math.min(FLOW.length - 1, Math.max(0, i + 1))] ?? item.status; return { ...item, status: next, action: next === 'Photographed' ? 'Create listing' : next === 'Live' ? 'Monitor listing' : next === 'Sold' ? 'Pack order' : next === 'Dispatched' ? 'Archive sale' : 'Complete' }; }
export function sourceCheck(buy, sale, condition, auth) { const conservative = sale * .82, profit = sale - buy - 1.5, conservativeProfit = conservative - buy - 1.5, roi = buy ? profit / buy : 0; let score = 45 + Math.min(22, Math.max(0, profit)) + Math.min(16, Math.max(0, roi * 4)) + (condition === 'Excellent' ? 12 : condition === 'Very good' ? 8 : condition === 'Good' ? 2 : -25) + (auth === 'High' ? 5 : auth === 'Medium' ? 0 : -30); score = Math.max(0, Math.min(100, Math.round(score))); let decision = score >= 85 ? 'BUY' : score >= 70 ? 'BUY SELECTIVELY' : score >= 55 ? 'CAUTION' : 'PASS'; if (condition === 'Needs attention' || auth === 'Low' || conservativeProfit < 10 || buy > 10)
    decision = 'PASS'; return { decision, score, profit, conservativeProfit, roi, maxBuy: Math.max(0, Math.min(10, conservative - 1.5 - 15)) }; }
export function normaliseData(raw, fallback) { return { version: APP_VERSION, items: Array.isArray(raw.items) ? raw.items : fallback.items, orders: Array.isArray(raw.orders) ? raw.orders : fallback.orders }; }
