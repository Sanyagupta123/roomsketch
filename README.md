# RoomSketch

RoomSketch is a standalone React + Vite room planner. It uses a single Zustand room model for both the SVG floor plan and React Three Fiber preview. Dimensions and positions are stored in feet; the 3D view converts them to meters.

## Run

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Room data is saved in browser local storage. Use **Export** to download the room configuration as JSON.

## Included in this MVP

- Editable rectangular room width, length, ceiling height, and floor/wall colors.
- Furniture catalog with 8 objects, drag placement in the floor plan, snapping, grid visibility, rotation, resizing, color edits, deletion, and duplication.
- Interactive 3D preview with orbit, pan, zoom, and shared room/furniture state.
- JSON configuration export.

Door/window geometry, undo/redo history, SVG/PNG exports, and collision warnings are not implemented yet.
