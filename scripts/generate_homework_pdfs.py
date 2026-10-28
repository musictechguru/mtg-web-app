import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

OUT_DIR = "public/homework"
os.makedirs(OUT_DIR, exist_ok=True)

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        footer_text = f"MusicTechGuru • Edexcel Component 3 Music Technology in Context • Page {self._pageNumber} of {page_count}"
        self.drawRightString(A4[0] - 40, 20, footer_text)
        self.restoreState()

def build_homework_pdf(filename, title, artist, youtube_url, questions_page1, questions_page2, total_marks=18):
    pdf_path = os.path.join(OUT_DIR, filename)
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    header_style = ParagraphStyle(
        'DocHeader',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#0f172a")
    )

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#0f172a")
    )

    artist_style = ParagraphStyle(
        'DocArtist',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor("#1e293b")
    )

    link_style = ParagraphStyle(
        'DocLink',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor("#1d4ed8")
    )

    q_style = ParagraphStyle(
        'Question',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor("#0f172a")
    )

    dots_style = ParagraphStyle(
        'Dots',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=13,
        textColor=colors.HexColor("#94a3b8")
    )

    story = []

    def add_page_header():
        top_table = Table(
            [[Paragraph("Name: ..............................................................", header_style),
              Paragraph("Due: <b>Next Class / Friday</b>", header_style)]],
            colWidths=[340, 175]
        )
        top_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('ALIGN', (1,0), (1,0), 'RIGHT'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        return top_table

    # --- PAGE 1 ---
    story.append(add_page_header())
    story.append(Spacer(1, 14))
    story.append(Paragraph(f"<b>{title}</b>", title_style))
    story.append(Paragraph(f"<b>Artist:</b> {artist}", artist_style))
    story.append(Paragraph(f'<u><a href="{youtube_url}">{youtube_url}</a></u>', link_style))
    story.append(Spacer(1, 12))

    for item in questions_page1:
        q_type = item.get('type')
        if q_type == 'table':
            story.append(Paragraph(item['prompt'], q_style))
            story.append(Spacer(1, 4))
            table_data = item['data']
            t = Table(table_data, colWidths=item.get('colWidths', [180, 200]))
            t.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e0f2fe")),
                ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor("#0369a1")),
                ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
                ('FONTSIZE', (0,0), (-1,-1), 9),
                ('GRID', (0,0), (-1,-1), 0.8, colors.HexColor("#94a3b8")),
                ('TOPPADDING', (0,0), (-1,-1), 4),
                ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ]))
            story.append(t)
            story.append(Spacer(1, 10))
        elif q_type == 'qa':
            story.append(Paragraph(item['prompt'], q_style))
            for _ in range(item.get('lines', 2)):
                story.append(Paragraph("........................................................................................................................................................................................", dots_style))
            story.append(Spacer(1, 8))
        elif q_type == 'structured':
            story.append(Paragraph(item['prompt'], q_style))
            for sub in item['sub']:
                story.append(Paragraph(f"<b>{sub['label']}</b>", q_style))
                for _ in range(sub.get('lines', 2)):
                    story.append(Paragraph("........................................................................................................................................................................................", dots_style))
            story.append(Spacer(1, 8))

    # --- PAGE 2 ---
    story.append(PageBreak())
    story.append(add_page_header())
    story.append(Spacer(1, 14))

    for item in questions_page2:
        q_type = item.get('type')
        if q_type == 'table_box':
            story.append(Paragraph(item['prompt'], q_style))
            story.append(Spacer(1, 4))
            table_data = item['data']
            t = Table(table_data, colWidths=item.get('colWidths', [515]))
            t_styles = [
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
                ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
                ('FONTSIZE', (0,0), (-1,-1), 9),
                ('GRID', (0,0), (-1,-1), 0.8, colors.HexColor("#cbd5e1")),
                ('TOPPADDING', (0,0), (-1,-1), 5),
                ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ]
            for row_idx, row_bg in item.get('row_bgs', []):
                t_styles.append(('BACKGROUND', (0, row_idx), (-1, row_idx), row_bg))
            t.setStyle(TableStyle(t_styles))
            story.append(t)
            story.append(Spacer(1, 10))
        elif q_type == 'qa':
            story.append(Paragraph(item['prompt'], q_style))
            for _ in range(item.get('lines', 2)):
                story.append(Paragraph("........................................................................................................................................................................................", dots_style))
            story.append(Spacer(1, 8))
        elif q_type == 'structured':
            story.append(Paragraph(item['prompt'], q_style))
            for sub in item['sub']:
                story.append(Paragraph(f"<b>{sub['label']}</b>", q_style))
                for _ in range(sub.get('lines', 2)):
                    story.append(Paragraph("........................................................................................................................................................................................", dots_style))
            story.append(Spacer(1, 8))

    # Total Box
    story.append(Spacer(1, 16))
    total_table = Table(
        [[Paragraph("<b>Total:</b>", q_style), Paragraph(f"<b>/{total_marks}</b>", title_style)]],
        colWidths=[60, 60]
    )
    total_table.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1.2, colors.HexColor("#0f172a")),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(total_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {pdf_path}")

# ==============================================================================
# DEFINING ALL HOMEWORK WORKSHEETS
# ==============================================================================

# --- EARLY MULTITRACK HW 1 ---
build_homework_pdf(
    filename="c3_early_multitrack_hw1_beatles_4track.pdf",
    title="C3 Early Multitrack Recordings HW 1 – The Beatles 'Eleanor Rigby' & 4-Track Tape",
    artist="The Beatles (Producer: George Martin, Engineer: Geoff Emerick)",
    youtube_url="https://www.youtube.com/watch?v=HuS5NuXRb5Y",
    questions_page1=[
        {
            'type': 'table',
            'prompt': '1. In 1966, The Beatles recorded "Eleanor Rigby" onto a Studer J37 4-track tape machine at Abbey Road. Identify the track allocation for each instrument or vocal in the table below. (3)',
            'colWidths': [240, 275],
            'data': [
                ['Track Element', 'Assigned Tape Track & Panning'],
                ['String Octet (4 Violins, 2 Violas, 2 Cellos)', 'Track 1 & 2 (Panned Left & Right)'],
                ['Paul McCartney Lead Vocal', 'Track 3 (Centre / Hard Right in Stereo LP)'],
                ['John Lennon & George Harrison Backing Vocals', 'Track 4 (Centre / Hard Left)'],
                ['Vocal Double / Ad-Lib Strings', '']
            ]
        },
        {
            'type': 'qa',
            'prompt': '2. What rhythmic string articulation can be heard driving the rhythm from 0\'04"? (1)',
            'lines': 2
        },
        {
            'type': 'qa',
            'prompt': '3. What year was this track recorded in, and state ONE studio production technique that proves it was recorded on 4-track tape rather than direct-to-mono? (2)',
            'lines': 3
        },
        {
            'type': 'qa',
            'prompt': '4. Abbey Road technical engineers utilized the Studer J37 with Sel-Sync. Explain why Sel-Sync was essential during overdubbing and what would happen if the artist monitored off the playback head. (4)',
            'lines': 5
        }
    ],
    questions_page2=[
        {
            'type': 'qa',
            'prompt': '5. When recording ambitious multitrack arrangements with only 4 tracks, engineers performed "reduction mixing" (bouncing down). Explain how a 4-to-1 reduction mix works and state ONE sonic trade-off of this technique. (4)',
            'lines': 5
        },
        {
            'type': 'table_box',
            'prompt': '6. In "Eleanor Rigby", Geoff Emerick famously placed Neumann microphones closer to the strings than classical EMI protocol permitted. Describe how you would close-mic an acoustic cello or upright bass in a modern studio: (4)',
            'colWidths': [515],
            'row_bgs': [(0, colors.HexColor("#e2e8f0")), (2, colors.HexColor("#e2e8f0"))],
            'data': [
                ['Choice of Microphone & Polar Pattern (2)'],
                ['Microphone:\n\nPolar Pattern:\n '],
                ['Positioning and Distance of Microphone (2)'],
                ['\n\n\n ']
            ]
        }
    ]
)

# --- EARLY MULTITRACK HW 2 ---
build_homework_pdf(
    filename="c3_early_multitrack_hw2_aretha_outboard.pdf",
    title="C3 Early Multitrack Recordings HW 2 – Aretha Franklin 'Respect' & Studio Outboard",
    artist="Aretha Franklin (Atlantic Studios, NYC, Engineer: Tom Dowd)",
    youtube_url="https://www.youtube.com/watch?v=6FOUqQt3Kg0",
    questions_page1=[
        {
            'type': 'table',
            'prompt': '1. In 1967, Atlantic Records engineer Tom Dowd recorded Aretha Franklin on an 8-track tape machine. Identify the pan position / track allocation for the instruments shown below. (3)',
            'colWidths': [240, 275],
            'data': [
                ['Instrument / Vocal Group', 'Stereo Position / Track Element'],
                ['Lead Vocal (Aretha Franklin)', 'Centre'],
                ['Brass & Saxophone Section', ''],
                ['Rhythm Section (Drums & Bass)', ''],
                ['Backing Vocals ("Sock it to me")', '']
            ]
        },
        {
            'type': 'qa',
            'prompt': '2. What dynamic musical event and percussion element enters prominently at 0\'24"? (1)',
            'lines': 2
        },
        {
            'type': 'qa',
            'prompt': '3. What year was this track released, and give ONE reason based on the dynamic punch and clarity of the rhythm section why this was not recorded in the early 1950s? (2)',
            'lines': 3
        },
        {
            'type': 'qa',
            'prompt': '4. During the late 1960s, studios relied on optical and variable-mu compressors. Compare how the Teletronix LA-2A (optical) and the Fairchild 670 (variable-mu) control dynamic levels on vocals and drums. (4)',
            'lines': 5
        }
    ],
    questions_page2=[
        {
            'type': 'qa',
            'prompt': '5. Aretha\'s lead vocal features deep, shimmering acoustic ambience achieved with an EMT 140. Explain the mechanical and acoustic operation of a plate reverb and how decay time is adjusted. (4)',
            'lines': 5
        },
        {
            'type': 'table_box',
            'prompt': '6. Describe how you would close-mic a powerful soul/gospel lead vocal in a modern professional recording studio to avoid plosives and proximity bass boost: (4)',
            'colWidths': [515],
            'row_bgs': [(0, colors.HexColor("#e2e8f0")), (2, colors.HexColor("#e2e8f0"))],
            'data': [
                ['Choice of Microphone & Accessories (2)'],
                ['Microphone:\n\nAccessories (e.g. pop shield / shockmount):\n '],
                ['Microphone Polar Pattern & Singer Distance/Angle (2)'],
                ['\n\n\n ']
            ]
        }
    ]
)

# --- EARLY MULTITRACK HW 3 ---
build_homework_pdf(
    filename="c3_early_multitrack_hw3_hendrix_innovations.pdf",
    title="C3 Early Multitrack Recordings HW 3 – Jimi Hendrix 'Purple Haze' & Studio Innovation",
    artist="The Jimi Hendrix Experience (Producer: Chas Chandler, Engineer: Eddie Kramer)",
    youtube_url="https://www.youtube.com/watch?v=WGoDaYjdfSg",
    questions_page1=[
        {
            'type': 'table',
            'prompt': '1. In 1967, Eddie Kramer mixed "Purple Haze" at Olympic Studios. Identify the hard-panning characteristics of this classic 1960s multitrack stereo mix. (3)',
            'colWidths': [240, 275],
            'data': [
                ['Track Element', 'Stereo Pan Position'],
                ['Bass Guitar (Noel Redding)', 'Centre / Right'],
                ['Rhythm Guitar & Fuzz Overdubs', ''],
                ['Drums (Mitch Mitchell)', ''],
                ['Lead Vocal (Jimi Hendrix)', 'Centre']
            ]
        },
        {
            'type': 'qa',
            'prompt': '2. What distinctive non-standard guitar harmonic interval (dissonance) is played in the opening riff from 0\'00" to 0\'08"? (1)',
            'lines': 2
        },
        {
            'type': 'qa',
            'prompt': '3. Why did early stereo multitrack mixes between 1964 and 1968 feature extreme "hard-panning" (e.g. instruments hard-left, vocals hard-right) rather than smoothly variable panning? (2)',
            'lines': 3
        },
        {
            'type': 'qa',
            'prompt': '4. Ken Townsend invented Automatic Double Tracking (ADT) in 1966. Explain how ADT works using tape delay and a Variable Speed Oscillator (VSO) to create a natural doubled effect without re-recording. (4)',
            'lines': 5
        }
    ],
    questions_page2=[
        {
            'type': 'qa',
            'prompt': '5. Hendrix popularized extreme analog distortion and filtering effects. Explain how the Dallas-Arbiter Fuzz Face (germanium transistors) and the Vox Wah-Wah pedal modify audio waveforms. (4)',
            'lines': 5
        },
        {
            'type': 'table_box',
            'prompt': '6. Describe how you would close-mic a loud 4x12 Marshall valve guitar cabinet in a modern studio to capture high-gain rock tones without overloading the preamp: (4)',
            'colWidths': [515],
            'row_bgs': [(0, colors.HexColor("#e2e8f0")), (2, colors.HexColor("#e2e8f0"))],
            'data': [
                ['Choice of Microphone & Polar Pattern (2)'],
                ['Microphone (Dynamic / Ribbon):\n\nPolar Pattern:\n '],
                ['Placement, Angle & Distance relative to Speaker Cone / Cap Edge (2)'],
                ['\n\n\n ']
            ]
        }
    ]
)

# --- DIRECT TO TAPE HW 2 ---
build_homework_pdf(
    filename="c3_direct_to_tape_hw2_miles_davis.pdf",
    title="C3 Direct to Tape Mono Recordings HW 2 – Miles Davis 'So What' (Kind of Blue)",
    artist="Miles Davis (Columbia 30th Street Studio, NYC, 1959, Engineer: Fred Plaut)",
    youtube_url="https://www.youtube.com/watch?v=ylXk1LBvIqU",
    questions_page1=[
        {
            'type': 'table',
            'prompt': '1. In 1959, Miles Davis recorded "Kind of Blue" live in Columbia\'s cavernous 30th Street Studio. Identify the acoustic positioning and room placement of the ensemble. (3)',
            'colWidths': [240, 275],
            'data': [
                ['Instrument', 'Acoustic Room Placement / Direction'],
                ['Trumpet (Miles Davis)', 'Front Centre / Direct on Ribbon Mic'],
                ['Tenor Sax (John Coltrane)', ''],
                ['Upright Bass (Paul Chambers)', ''],
                ['Piano (Bill Evans)', '']
            ]
        },
        {
            'type': 'qa',
            'prompt': '2. What call-and-response bass motif opens the track between 0\'00" and 0\'32"? (1)',
            'lines': 2
        },
        {
            'type': 'qa',
            'prompt': '3. What year was "Kind of Blue" recorded, and state ONE acoustic feature of the recording environment that distinguishes Columbia 30th Street Studio from modern dry booths? (2)',
            'lines': 3
        },
        {
            'type': 'qa',
            'prompt': '4. During the 1950s direct-to-tape era, tape ran at 15 inches per second (ips). Explain the sonic advantages of higher tape speed (15 ips vs 7.5 ips) regarding frequency response, dynamic range, and tape hiss. (4)',
            'lines': 5
        }
    ],
    questions_page2=[
        {
            'type': 'qa',
            'prompt': '5. Without isolation booths or overdubbing, how did 1950s recording engineers control "acoustic bleed" (spill) between loud horns and quiet instruments like the upright bass? (4)',
            'lines': 5
        },
        {
            'type': 'table_box',
            'prompt': '6. Describe how you would close-mic an acoustic jazz trumpet in a modern studio to capture warmth while avoiding harsh high-frequency transients: (4)',
            'colWidths': [515],
            'row_bgs': [(0, colors.HexColor("#e2e8f0")), (2, colors.HexColor("#e2e8f0"))],
            'data': [
                ['Choice of Microphone (Ribbon vs Dynamic) & Polar Pattern (2)'],
                ['Microphone:\n\nPolar Pattern:\n '],
                ['Positioning, On-Axis vs Off-Axis Angle & Distance (2)'],
                ['\n\n\n ']
            ]
        }
    ]
)

# --- DIRECT TO TAPE HW 3 ---
build_homework_pdf(
    filename="c3_direct_to_tape_hw3_sun_slapback.pdf",
    title="C3 Direct to Tape Mono Recordings HW 3 – Elvis Presley 'Mystery Train' & Sun Studio",
    artist="Elvis Presley (Sun Studio, Memphis, TN, Producer & Engineer: Sam Phillips)",
    youtube_url="https://www.youtube.com/watch?v=Q_eE06ZAbCc",
    questions_page1=[
        {
            'type': 'table',
            'prompt': '1. In 1955, Sam Phillips recorded Elvis Presley direct-to-tape at Sun Studio. Identify the sonic characteristics and instrumentation in the table below. (3)',
            'colWidths': [240, 275],
            'data': [
                ['Instrument / Element', 'Performance & Acoustic Role'],
                ['Lead Vocals (Elvis Presley)', 'Slapback Tape Echo applied'],
                ['Lead Electric Guitar (Scotty Moore)', ''],
                ['Upright Slap Bass (Bill Black)', ''],
                ['Drums / Percussion', 'None / Percussive guitar body slap']
            ]
        },
        {
            'type': 'qa',
            'prompt': '2. Describe the vocal effect heard immediately following each vocal phrase (slapback echo). What is the approximate delay time in milliseconds? (1)',
            'lines': 2
        },
        {
            'type': 'qa',
            'prompt': '3. What year was this track recorded at Sun Studio, and give ONE reason why Sam Phillips did not use stereo panning? (2)',
            'lines': 3
        },
        {
            'type': 'qa',
            'prompt': '4. Explain the tape machine routing Sam Phillips used to create his legendary "slapback echo". Detail the role of the Record head, Playback head, tape speed (15 ips), and tape loop path. (4)',
            'lines': 5
        }
    ],
    questions_page2=[
        {
            'type': 'qa',
            'prompt': '5. In 1950s live room recordings, early hollow-body electric guitars suffered from severe acoustic feedback and 50/60 Hz hum. Explain how the invention of the humbucker pickup solved these issues. (4)',
            'lines': 5
        },
        {
            'type': 'table_box',
            'prompt': '6. Describe how you would mic a slap-bass upright acoustic bass in a modern studio to capture both the deep low-end resonance and the high-frequency fingerboard "click": (4)',
            'colWidths': [515],
            'row_bgs': [(0, colors.HexColor("#e2e8f0")), (2, colors.HexColor("#e2e8f0"))],
            'data': [
                ['Two-Microphone Setup / DI Choice (2)'],
                ['Mic 1 (Low End) / DI:\n\nMic 2 (Fingerboard Click):\n '],
                ['Placement, Polar Patterns & Phase Alignment (2)'],
                ['\n\n\n ']
            ]
        }
    ]
)

print("ALL HOMEWORK PDFS GENERATED SUCCESSFULLY!")
