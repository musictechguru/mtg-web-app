import urllib.request
import urllib.parse
import json
import time

queries = [
    "Ampex tape recorder",
    "Mellotron",
    "Artificial double tracking",
    "Fuzz Face",
    "Plate reverb",
    "Leslie speaker",
    "Moog modular synthesizer",
    "Audio tape splicing",
    "Vintage drum kit",
    "Mixing console",
    "Minimoog",
    "Sequential Circuits Prophet-5",
    "Roland RE-201",
    "Vocoder",
    "Audio mixing console faders",
    "Roland CR-78",
    "12-inch single",
    "Envelope filter",
    "Parametric equalizer",
    "SSL console",
    "Roland TR-808",
    "MIDI cable",
    "Yamaha DX7",
    "E-mu SP-1200",
    "Noise gate",
    "Roland TR-909",
    "Fairlight CMI",
    "Roland TB-303",
    "Technics SL-1200",
    "Akai MPC60",
    "Akai S1000",
    "Amen break vinyl",
    "Music tracker software",
    "Roland Alpha Juno",
    "Digital Audio Tape",
    "Alesis 3630",
    "Auto-Tune interface",
    "Mackie mixing desk",
    "Korg M1",
    "Zip drive",
    "Digital audio workstation",
    "Virtual Studio Technology",
    "Loudness war",
    "Native Instruments Massive",
    "Dynamic range compression",
    "Ableton Live",
    "MP3 format",
    "Pitch correction",
    "Vinyl emulation software",
    "Computer CPU"
]

results = {}

def get_wiki_image(query):
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(query)}&prop=pageimages&format=json&pithumbsize=500"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            for page_id, page_info in pages.items():
                if 'thumbnail' in page_info:
                    return page_info['thumbnail']['source']
    except Exception as e:
        print(f"Error fetching {query}: {e}")
    return None

def main():
    for q in queries:
        img = get_wiki_image(q)
        if img:
            print(f'"{q}": "{img}",')
        else:
            print(f'"{q}": None,')
        time.sleep(0.1)

if __name__ == "__main__":
    main()
