import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const catalog = [
  { id:'bed', name:'Double bed', category:'Bedroom', width:5, depth:6.5, height:2, color:'#cbb8a4', kind:'bed' },
  { id:'sofa', name:'Sofa', category:'Living', width:6, depth:2.8, height:2.7, color:'#89958a', kind:'sofa' },
  { id:'armchair', name:'Armchair', category:'Living', width:2.8, depth:2.8, height:2.8, color:'#b89879', kind:'chair' },
  { id:'table', name:'Coffee table', category:'Living', width:3.5, depth:2, height:1.4, color:'#a77d59', kind:'table' },
  { id:'dining', name:'Dining table', category:'Dining', width:5, depth:3, height:2.5, color:'#a77d59', kind:'table' },
  { id:'wardrobe', name:'Wardrobe', category:'Bedroom', width:4, depth:2, height:6.5, color:'#d1c5b5', kind:'cabinet' },
  { id:'desk', name:'Writing desk', category:'Other', width:4, depth:2, height:2.5, color:'#a77d59', kind:'table' },
  { id:'lamp', name:'Floor lamp', category:'Other', width:1, depth:1, height:5, color:'#d6ae64', kind:'lamp' },
]
const initial = { name:'Sunday apartment', width:16, length:12, height:9, floor:'#cdbda8', walls:'#f4f0e8', furniture:[] }
export const useRoom = create(persist((set,get)=>({
  room:initial, past:[], future:[], selected:null, view:'2d', grid:true, snap:true, zoom:1,
  setView:view=>set({view}), select:selected=>set({selected}),
  change:next=>set(s=>({room:next,past:[...s.past.slice(-39),s.room],future:[]})),
  updateRoom:patch=>{const s=get();get().change({...s.room,...patch})},
  addFurniture:item=>{ const r=get().room, n=catalog.find(x=>x.id===item); if(!n)return; const id=crypto.randomUUID(); get().change({...r,furniture:[...r.furniture,{...n,catalogId:n.id,id,x:r.width/2-n.width/2,z:r.length/2-n.depth/2,rotation:0}]});set({selected:id}) },
  updateFurniture:(id,patch)=>{const r=get().room;get().change({...r,furniture:r.furniture.map(x=>x.id===id?{...x,...patch}:x)})},
  deleteFurniture:()=>{const s=get();get().change({...s.room,furniture:s.room.furniture.filter(x=>x.id!==s.selected)});set({selected:null})},
  undo:()=>set(s=>{if(!s.past.length)return s;return {room:s.past[s.past.length-1],past:s.past.slice(0,-1),future:[s.room,...s.future]}}),
  redo:()=>set(s=>{if(!s.future.length)return s;return {room:s.future[0],past:[...s.past.slice(-39),s.room],future:s.future.slice(1)}}),
  toggleGrid:()=>set(s=>({grid:!s.grid})), toggleSnap:()=>set(s=>({snap:!s.snap})), setZoom:zoom=>set({zoom})
}),{name:'roomsketch-v1',partialize:s=>({room:s.room})}))
