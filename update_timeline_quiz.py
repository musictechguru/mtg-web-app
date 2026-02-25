import json
import os

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

quiz = {
    "id": "quiz-timeline-1",
    "title": "Timeline Quiz: Historical Equipment & Techniques",
    "type": "lp_quiz",
    "isPremium": False,
    "description": "Interactive timeline quiz covering the evolution of music technology.",
    "questions": [
        {
          "title": "Q1: Recording Process Timeline",
          "content": "Drag the recording techniques and equipment to their correct decade.",
          "type": "timeline",
          "decades": ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s"],
          "items": [
              { "id": "rec_50", "text": "Mono Recording", "targetDecade": "1950s" },
              { "id": "rec_60", "text": "4-Track Tape", "targetDecade": "1960s" },
              { "id": "rec_70", "text": "16-Track Tape", "targetDecade": "1970s" },
              { "id": "rec_80", "text": "24-Track Tape", "targetDecade": "1980s" },
              { "id": "rec_90", "text": "Digital Tape", "targetDecade": "1990s" },
              { "id": "rec_00", "text": "DAW", "targetDecade": "2000s" }
          ]
        },
        {
          "title": "Q2: Sequencing Timeline",
          "content": "Drag the sequencing technologies to their correct decade.",
          "type": "timeline",
          "decades": ["1960s", "1970s", "1980s", "1990s", "2000s"],
          "items": [
              { "id": "seq_60", "text": "Early Analog Sequencers", "targetDecade": "1960s" },
              { "id": "seq_70", "text": "CV/Gate Step Sequencers", "targetDecade": "1970s" },
              { "id": "seq_80", "text": "Hardware MIDI Sequencers", "targetDecade": "1980s" },
              { "id": "seq_90", "text": "Early Software MIDI", "targetDecade": "1990s" },
              { "id": "seq_00", "text": "Modern Audio/MIDI DAWs", "targetDecade": "2000s" }
          ]
        },
        {
          "title": "Q3: Distortion Timeline",
          "content": "Drag the distortion technologies to their correct decade.",
          "type": "timeline",
          "decades": ["1950s", "1960s", "1970s", "1980s", "1990s"],
          "items": [
              { "id": "dist_50", "text": "Overdriven Console Preamps", "targetDecade": "1950s" },
              { "id": "dist_60", "text": "Fuzz Pedals", "targetDecade": "1960s" },
              { "id": "dist_70", "text": "High-Gain Tube Amps", "targetDecade": "1970s" },
              { "id": "dist_80", "text": "Solid-State Overdrive", "targetDecade": "1980s" },
              { "id": "dist_90", "text": "Digital Amp Modeling", "targetDecade": "1990s" }
          ]
        },
        {
          "title": "Q4: Sampling Timeline",
          "content": "Drag the sampling technologies to their correct decade.",
          "type": "timeline",
          "decades": ["1960s", "1970s", "1980s", "1990s", "2000s"],
          "items": [
              { "id": "samp_60", "text": "Tape-based (Mellotron)", "targetDecade": "1960s" },
              { "id": "samp_70", "text": "Early Digital (Fairlight CMI prototype)", "targetDecade": "1970s" },
              { "id": "samp_80", "text": "8/12-bit Hardware Samplers", "targetDecade": "1980s" },
              { "id": "samp_90", "text": "16-bit Rackmount Samplers", "targetDecade": "1990s" },
              { "id": "samp_00", "text": "Software Samplers", "targetDecade": "2000s" }
          ]
        },
        {
          "title": "Q5: Synthesis Timeline",
          "content": "Drag the synthesis technologies to their correct decade.",
          "type": "timeline",
          "decades": ["1960s", "1970s", "1980s", "1990s", "2000s"],
          "items": [
              { "id": "synth_60", "text": "Modular Analog", "targetDecade": "1960s" },
              { "id": "synth_70", "text": "Portable Monophonic", "targetDecade": "1970s" },
              { "id": "synth_80", "text": "Digital FM & Polyphonic", "targetDecade": "1980s" },
              { "id": "synth_90", "text": "Virtual Analog", "targetDecade": "1990s" },
              { "id": "synth_00", "text": "Advanced Soft Synths", "targetDecade": "2000s" }
          ]
        },
        {
          "title": "Q6: Reverb Timeline",
          "content": "Drag the reverb technologies to their correct decade.",
          "type": "timeline",
          "decades": ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s"],
          "items": [
              { "id": "rev_50", "text": "Echo Chambers", "targetDecade": "1950s" },
              { "id": "rev_60", "text": "Plate & Spring Reverb", "targetDecade": "1960s" },
              { "id": "rev_70", "text": "Early Hardware Digital Reverb", "targetDecade": "1970s" },
              { "id": "rev_80", "text": "Algorithmic Digital Rack Units", "targetDecade": "1980s" },
              { "id": "rev_90", "text": "Advanced DSP Reverb Units", "targetDecade": "1990s" },
              { "id": "rev_00", "text": "Convolution Reverb", "targetDecade": "2000s" }
          ]
        },
        {
          "title": "Q7: Delay Timeline",
          "content": "Drag the delay technologies to their correct decade.",
          "type": "timeline",
          "decades": ["1950s", "1960s", "1970s", "1980s", "1990s"],
          "items": [
              { "id": "del_50", "text": "Slapback Tape Delay", "targetDecade": "1950s" },
              { "id": "del_60", "text": "Dedicated Tape Echo Units", "targetDecade": "1960s" },
              { "id": "del_70", "text": "Analog BBD Pedals", "targetDecade": "1970s" },
              { "id": "del_80", "text": "Digital Rack Delays", "targetDecade": "1980s" },
              { "id": "del_90", "text": "Software Delay Plugins", "targetDecade": "1990s" }
          ]
        },
        {
          "title": "Q8: Guitars Timeline",
          "content": "Drag the guitar trends & technologies to their correct decade.",
          "type": "timeline",
          "decades": ["1950s", "1960s", "1970s", "1980s", "1990s"],
          "items": [
              { "id": "gui_50", "text": "Solid Body Electrics", "targetDecade": "1950s" },
              { "id": "gui_60", "text": "12-String Electrics", "targetDecade": "1960s" },
              { "id": "gui_70", "text": "Humbuckers", "targetDecade": "1970s" },
              { "id": "gui_80", "text": "Superstrats", "targetDecade": "1980s" },
              { "id": "gui_90", "text": "7-String & Drop Tunings", "targetDecade": "1990s" }
          ]
        }
    ]
}

# Find Stage 6
for section in data['sections']:
    if section['title'].startswith('Stage 6'):
        # insert at the top of items
        section['items'].insert(0, quiz)
        break

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Timeline Quiz added to Stage 6 successfully.")

