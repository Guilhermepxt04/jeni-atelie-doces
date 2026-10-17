"""Trata as fotos reais da Jeni para o site.

Remove o fundo das fotos de produto (rembg), recorta no doce com folga,
aplica um ajuste leve e quente e salva em src/assets/img/jeni/.
A foto da mesa com os potes não é recortada: só enquadrada e ajustada.

Uso (na pasta jeni-atelie):  python scripts/tratar-fotos.py
Requer: pip install "rembg[cpu]" pillow  (o primeiro uso baixa o modelo u2net, ~170 MB)
"""
from pathlib import Path

from PIL import Image, ImageEnhance
from rembg import remove

ORIGEM = Path(__file__).resolve().parents[2] / 'fotos-jeni'
DESTINO = Path(__file__).resolve().parents[1] / 'src' / 'assets' / 'img' / 'jeni'

RECORTES = {
    'pote-maracuja-granito.jpg': 'pote.png',
    'fatia-pudim-foil.jpg': 'fatia.png',
    'empadao-foil.jpg': 'empadao.png',
}


def ajustar(im: Image.Image) -> Image.Image:
    """Um pouco mais de luz e cor, sem cara de filtro."""
    rgb = im.convert('RGB')
    rgb = ImageEnhance.Brightness(rgb).enhance(1.06)
    rgb = ImageEnhance.Color(rgb).enhance(1.08)
    if im.mode == 'RGBA':
        rgb.putalpha(im.getchannel('A'))
    return rgb


def recortar_no_doce(im: Image.Image, folga: float = 0.06) -> Image.Image:
    caixa = im.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox()
    if not caixa:
        return im
    x0, y0, x1, y1 = caixa
    dx, dy = int((x1 - x0) * folga), int((y1 - y0) * folga)
    return im.crop((max(0, x0 - dx), max(0, y0 - dy), min(im.width, x1 + dx), min(im.height, y1 + dy)))


def main() -> None:
    DESTINO.mkdir(parents=True, exist_ok=True)
    for origem, destino in RECORTES.items():
        sem_fundo = remove(Image.open(ORIGEM / origem).convert('RGB'))
        recortar_no_doce(ajustar(sem_fundo)).save(DESTINO / destino, optimize=True)
        print('ok', destino)

    mesa = Image.open(ORIGEM / 'potes-mesa-natal.webp').convert('RGB')
    w, h = mesa.size
    ajustar(mesa.crop((int(w * 0.4), int(h * 0.25), w, h))).save(DESTINO / 'potes-mesa.jpg', quality=90)
    print('ok potes-mesa.jpg')


if __name__ == '__main__':
    main()
