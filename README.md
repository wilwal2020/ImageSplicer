# ImageSplicer

A tiny, dependency-free web app that splices two images together side by side — entirely in your browser. Nothing is uploaded.

## Features

- **Two slots, your choice of side** — click the left or right square to select it, then add an image to that side.
- **Three ways to add an image** — paste from the clipboard (Ctrl/Cmd+V), drag & drop, or click to browse.
- **Swap button** — flip the left and right images with one click.
- **Splicing options** — match heights (tallest / shortest / keep original), vertical alignment (top / center / bottom), and an adjustable gap between the images.
- **Download** the result as a PNG.

## Usage

Just open `index.html` in any modern browser — no build step, no server.

## How it works

Everything runs client-side with the Canvas API. Images are loaded into two slots, drawn onto a canvas at the chosen sizes/alignment, and exported as a PNG via `canvas.toDataURL`.
