import os, urllib.request, json

OUT_DIR = "public/images/slides/the_synthesizer"
os.makedirs(OUT_DIR, exist_ok=True)

# 1. Download verified photos from Wikimedia Commons
WIKI_PHOTOS = {
    "moog_modular_1973.jpg": "File:1973 Moog modular synthesizer.jpg",
    "minimoog_model_d_1975.jpg": "File:Minimoog model D (1975) (by Alain, 6919141447).jpg",
    "sequential_prophet_5.jpg": "File:Sequential Circuits Prophet 5.jpg",
    "yamaha_dx7_synthesizer.jpg": "File:Yamaha DX7 synthesizer - combined image with diagonal and top views.jpg",
    "roland_jupiter_8.jpg": "File:Roland Jupiter-8 (1981).jpg",
    "roland_tb_303_panel.jpg": "File:Roland TB-303 Panel.jpg",
    "arp_2600_modular.jpg": "File:Steve Fisk's ARP 2600.jpg",
    "fairlight_cmi_sampler.jpg": "File:Fairlight CMI.jpg",
    "ppg_wave_synthesizer.jpg": "File:PPG WAVE 2.2.jpg",
    "midi_5pin_cable_ports.jpg": "File:Midi ports and cable.jpg"
}

def download_wiki():
    titles = list(WIKI_PHOTOS.values())
    url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + '|'.join([urllib.parse.quote(t) for t in titles]) + '&prop=imageinfo&iiprop=url&format=json'
    req = urllib.request.Request(url, headers={'User-Agent': 'MTG-Bot/1.0 (admin@musictechguru.com)'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            title_to_url = {}
            for pid, page in data.get('query', {}).get('pages', {}).items():
                if 'imageinfo' in page:
                    title_to_url[page['title']] = page['imageinfo'][0]['url']
            
            for fname, title in WIKI_PHOTOS.items():
                target_path = os.path.join(OUT_DIR, fname)
                if not os.path.exists(target_path):
                    if title in title_to_url:
                        img_url = title_to_url[title]
                        print(f"Downloading {fname} from {img_url}...")
                        img_req = urllib.request.Request(img_url, headers={'User-Agent': 'MTG-Bot/1.0 (admin@musictechguru.com)'})
                        with urllib.request.urlopen(img_req) as img_resp, open(target_path, 'wb') as out_f:
                            out_f.write(img_resp.read())
                    else:
                        print(f"URL not found for {title}")
                else:
                    print(f"Exists: {fname}")
    except Exception as e:
        print("Error fetching wiki photos:", e)

if __name__ == "__main__":
    download_wiki()
