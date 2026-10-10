"""
Web renditions of the photographs the pages show.

The masters under src/assets/img/ are dropped in as they were made: a
photograph off a phone is several megabytes, and a screen capture carries the
desktop around it. This writes the WebP renditions the pages actually load,
and those only.

What to write is read from src/_data/photos.js, the same file the templates
read, so a rendition's name, width and crop are decided in one place. Two
reasons for that rather than "every file in the folder":

  - a photo's URL and size are then stated once, where the page that draws it
    can see them; and
  - the folder holds photographs that are not published — an alternate take, a
    cathedral, a video call with other people's faces in it — and a file
    nothing names must not turn into a file on the web.

The master itself is never modified, and never enlarged: a rendition wider
than its master is a blur that costs bytes, so one that asks for it stops the
script. The declared height is checked against the file just written, because
that number is what the <img> promises the browser.

Run it whenever a photo is added, replaced or renamed:

    python scripts/site-images.py

Needs Pillow (`pip install pillow`) and node. The renditions are committed, so
neither the build nor a deploy needs Python.
"""

import json
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps

QUALITY = 82
SMALL = 480
ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "src" / "assets" / "img"
DATA = ROOT / "src" / "_data" / "photos.js"
EXTENSIONS = (".png", ".jpg", ".jpeg")

READ_PHOTOS = "console.log(JSON.stringify(require(process.argv[1])))"

try:
    listing = subprocess.run(
        ["node", "-e", READ_PHOTOS, str(DATA)],
        cwd=ROOT, capture_output=True, text=True, check=True,
    ).stdout
except (OSError, subprocess.CalledProcessError) as error:
    sys.exit(f"Could not read {DATA.relative_to(ROOT)} with node: {getattr(error, 'stderr', '') or error}")

written = 0
for key, photo in json.loads(listing).items():
    candidates = [IMG / f"{photo['master']}{ext}" for ext in EXTENSIONS]
    master = next((path for path in candidates if path.is_file()), None)
    if master is None:
        sys.exit(f"{key}: no master {photo['master']}(.png|.jpg|.jpeg) in {IMG.relative_to(ROOT)}")

    with Image.open(master) as original:
        # A phone writes the picture sideways and an orientation tag beside it.
        source = ImageOps.exif_transpose(original).convert("RGB")
        if photo["crop"]:
            source = source.crop(tuple(photo["crop"]))

        for width in dict.fromkeys([SMALL, photo["width"]]):
            if width > source.width:
                sys.exit(
                    f"{key}: asks for {width}px from a {source.width}px master"
                    f" ({master.name}) — lower its width, or replace the master"
                )

            height = max(1, round(source.height * width / source.width))
            rendition = source.resize((width, height), Image.LANCZOS)
            path = IMG / f"{photo['name']}-{width}.webp"
            rendition.save(path, "WEBP", quality=QUALITY, method=6)
            written += 1

            if width == photo["width"] and height != photo["height"]:
                sys.exit(
                    f"{key}: {path.name} is {width}x{height},"
                    f" but photos.js says height {photo['height']} — fix the number"
                )

            print(f"{path.relative_to(ROOT)}  {width}x{height}  {path.stat().st_size // 1024} KB")

print(f"\n{written} renditions written.")
