from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ICONS = PUBLIC / "icons"
ICONS.mkdir(exist_ok=True)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    family = "segoeuib.ttf" if bold else "segoeui.ttf"
    path = Path("C:/Windows/Fonts") / family
    return ImageFont.truetype(str(path), size) if path.exists() else ImageFont.load_default()


def vertical_gradient(size: tuple[int, int], start: tuple[int, int, int], end: tuple[int, int, int]) -> Image.Image:
    width, height = size
    image = Image.new("RGB", size)
    pixels = image.load()
    for y in range(height):
        ratio = y / max(height - 1, 1)
        color = tuple(round(a + (b - a) * ratio) for a, b in zip(start, end))
        for x in range(width):
            pixels[x, y] = color
    return image


def icon(size: int, inset: int) -> Image.Image:
    image = Image.new("RGB", (size, size), "#08040d")
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle(
        (inset, inset, size - inset, size - inset),
        radius=size // 4,
        fill="#8b5cf6",
    )
    text_font = font(round(size * 0.34), bold=True)
    box = draw.textbbox((0, 0), "RC", font=text_font)
    draw.text(
        ((size - (box[2] - box[0])) / 2, (size - (box[3] - box[1])) / 2 - box[1]),
        "RC",
        font=text_font,
        fill="white",
    )
    return image


icon(192, 15).save(ICONS / "icon-192.png", optimize=True)
icon(512, 40).save(ICONS / "icon-512.png", optimize=True)
icon(512, 82).save(ICONS / "icon-maskable-512.png", optimize=True)
icon(180, 14).save(ICONS / "apple-touch-icon.png", optimize=True)

og = vertical_gradient((1200, 630), (8, 4, 13), (30, 12, 47))
draw = ImageDraw.Draw(og, "RGBA")
for x in range(0, 1200, 60):
    draw.line((x, 0, x, 630), fill=(255, 255, 255, 10), width=1)
for y in range(0, 630, 60):
    draw.line((0, y, 1200, y), fill=(255, 255, 255, 10), width=1)
draw.ellipse((850, -170, 1290, 270), fill=(139, 92, 246, 48))
draw.ellipse((-160, 420, 260, 840), fill=(34, 211, 238, 28))
draw.rounded_rectangle((72, 70, 188, 186), radius=30, fill="#8b5cf6")
mark_font = font(42, bold=True)
draw.text((96, 102), "RC", font=mark_font, fill="white")
draw.text((72, 238), "ROGER CEDEÑO", font=font(25, bold=True), fill="#c4b5fd")
draw.text((72, 288), "Full Stack Developer", font=font(66, bold=True), fill="white")
draw.text((72, 375), "& Product Builder", font=font(66, bold=True), fill="#b76ced")
draw.text((72, 493), "Frontend · Backend · Mobile · Cloud", font=font(27), fill="#d8d1df")
draw.rounded_rectangle((72, 550, 495, 554), radius=2, fill="#8b5cf6")
og.save(PUBLIC / "og-image.png", optimize=True)
