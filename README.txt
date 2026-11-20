Chicken Coop — clean centered layout (2026-11-20)

Update only css/room-activities.css in GitHub repository root.
No HTML, JS, images, bathroom or kitchen behavior were changed.

Fixes:
- Removes generations of competing study-room positioning rules.
- Centers a responsive 16:9 desktop study scene within the page layout; no 960px cap or 100vw offset.
- Places title in a translucent panel on the background top-left.
- Preserves five clickable object links and aligns hotspots to 16:9 cropped image.
- Uses 3:2 contain on mobile for full image visibility.
- Retains existing kitchen/bathroom icon-hiding CSS intact.

After upload: commit changes, hard refresh Ctrl+Shift+R, inspect desktop/mobile and click all five objects.

Validation performed: CSS rule checks, balanced braces, ZIP CRC. No live-browser visual acceptance test.
