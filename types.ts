export type ItemStatus = 'Prep' | 'Photographed' | 'Live' | 'Sold' | 'Dispatched' | 'Archived';
export type Grade = 'A' | 'B' | 'C' | 'Exit';
export interface StockItem {
  sku: string; brand: string; category: string; department?: string; description: string;
  size?: string; condition: string; status: ItemStatus; grade: Grade; storage: string;
  purchasePrice: number; landedCost: number; expectedSale: number; listPrice?: number;
  expectedProfit: number; roi: number; daysInStock: number; source?: string; action?: string;
}
export interface Order { id: string; sku: string; item: string; status: string; deadline: string; }
export interface AppData { version: string; items: StockItem[]; orders: Order[]; }
export type Page = 'home' | 'inventory' | 'add' | 'source' | 'orders';
export interface AppState extends AppData { page: Page; query: string; filter: string; sort: string; toast: string; }
