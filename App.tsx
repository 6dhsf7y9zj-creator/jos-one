import { useMemo, useState } from 'react'
import type { InventoryItem, ItemStatus } from './types/inventory'
import { expectedProfit, generateSku, loadItems, nextStatus, saveItems } from './lib/inventory'
import './styles.css'

const seed:InventoryItem[]=[{id:crypto.randomUUID(),sku:'JAE-0001',brand:'Nike',category:'Hoodie',size:'M',condition:'Very good',purchasePrice:6,expectedSalePrice:28,storageLocation:'Box A1',status:'Prep'}]

export default function App(){
 const [items,setItemsState]=useState<InventoryItem[]>(()=>{const x=loadItems();return x.length?x:seed})
 const [search,setSearch]=useState('')
 const [showAdd,setShowAdd]=useState(false)
 const [editing,setEditing]=useState<InventoryItem|null>(null)
 const setItems=(x:InventoryItem[])=>{setItemsState(x);saveItems(x)}
 const filtered=items.filter(i=>`${i.sku} ${i.brand} ${i.category} ${i.storageLocation}`.toLowerCase().includes(search.toLowerCase()))
 const stats=useMemo(()=>({count:items.length,cost:items.reduce((s,i)=>s+i.purchasePrice,0),profit:items.reduce((s,i)=>s+expectedProfit(i),0),prep:items.filter(i=>i.status==='Prep').length}),[items])
 function save(form:HTMLFormElement){const fd=new FormData(form); const base=editing; const item:InventoryItem={id:base?.id||crypto.randomUUID(),sku:base?.sku||generateSku(items),brand:String(fd.get('brand')),category:String(fd.get('category')),size:String(fd.get('size')),condition:String(fd.get('condition')),purchasePrice:Number(fd.get('purchasePrice')),expectedSalePrice:Number(fd.get('expectedSalePrice')),storageLocation:String(fd.get('storageLocation')),status:(base?.status||'Prep') as ItemStatus}; setItems(base?items.map(i=>i.id===base.id?item:i):[item,...items]);setShowAdd(false);setEditing(null)}
 return <div className="app"><header><img src="./the-jae-edit-logo.png"/><div><small>THE JAE EDIT</small><h1>JOS One</h1><p>React + TypeScript Foundation</p></div></header>
 <main><section className="hero"><div><span>Business Health</span><strong>{Math.max(45,100-stats.prep*3)}</strong></div><div><span>Tonight's mission</span><h2>{stats.prep?`Prepare ${Math.min(stats.prep,6)} stock items`:'Review sourcing opportunities'}</h2></div></section>
 <section className="stats"><article><b>{stats.count}</b><span>Active stock</span></article><article><b>£{stats.cost.toFixed(2)}</b><span>Inventory cost</span></article><article><b>£{stats.profit.toFixed(2)}</b><span>Expected profit</span></article></section>
 <div className="toolbar"><input placeholder="Search SKU, brand or location" value={search} onChange={e=>setSearch(e.target.value)}/><button onClick={()=>setShowAdd(true)}>+ Add stock</button></div>
 <section className="list">{filtered.map(i=><article className="item" key={i.id}><div><small>{i.sku}</small><h3>{i.brand} {i.category}</h3><p>{i.size} · {i.condition} · {i.storageLocation}</p><p>Cost £{i.purchasePrice.toFixed(2)} · Profit £{expectedProfit(i).toFixed(2)}</p></div><div className="actions"><button onClick={()=>{setEditing(i);setShowAdd(true)}}>Edit</button><button onClick={()=>setItems(items.map(x=>x.id===i.id?{...x,status:nextStatus(x.status)}:x))}>{i.status} →</button></div></article>)}</section></main>
 {showAdd&&<div className="modal"><form onSubmit={e=>{e.preventDefault();save(e.currentTarget)}}><h2>{editing?'Edit stock':'Quick add stock'}</h2>{['brand','category','size','condition','storageLocation'].map(k=><label key={k}>{k.replace(/[A-Z]/g,m=>' '+m).replace(/^./,m=>m.toUpperCase())}<input name={k} defaultValue={(editing as any)?.[k]||''} required/></label>)}<label>Purchase price<input name="purchasePrice" type="number" step="0.01" defaultValue={editing?.purchasePrice||''} required/></label><label>Expected sale price<input name="expectedSalePrice" type="number" step="0.01" defaultValue={editing?.expectedSalePrice||''} required/></label><div className="formActions"><button type="button" onClick={()=>{setShowAdd(false);setEditing(null)}}>Cancel</button><button type="submit">Save</button></div></form></div>}
 </div>
}
