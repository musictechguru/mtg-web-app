import { parseProducerRecreation } from './producerParser.js';

export function generateProducerPdfHtml({ content, trackName, artistName, daw }) {
  const data = parseProducerRecreation(content) || {};
  const effectiveTrack = data.trackName || trackName || 'Untitled Track';
  const effectiveArtist = data.artistName || artistName || 'Unknown Artist';
  const effectiveDaw = data.daw || daw || 'DAW Studio';
  const now = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return `
    <div class="pdf-container producer-pdf-container">
      <!-- Header -->
      <div class="pdf-header producer-header">
        <div class="pdf-badge-tag">TRACKSHEET CREATOR • STUDIO RECREATION DOSSIER</div>
        <h1 class="pdf-main-title">${effectiveTrack}</h1>
        <div class="pdf-sub-title">by ${effectiveArtist} • In-The-Box Recreation Blueprint for ${effectiveDaw}</div>
        <div class="pdf-meta-pills">
          <span class="pdf-pill"><strong>DAW:</strong> ${effectiveDaw}</span>
          ${data.tempoBpm ? `<span class="pdf-pill"><strong>Tempo:</strong> ${data.tempoBpm}</span>` : ''}
          ${data.keySignature ? `<span class="pdf-pill"><strong>Key:</strong> ${data.keySignature}</span>` : ''}
          <span class="pdf-pill"><strong>Master Target:</strong> ${data.masterBus?.targetLoudness || '-8 to -10 LUFS'}</span>
          <span class="pdf-pill"><strong>Date:</strong> ${now}</span>
        </div>
      </div>

      <!-- Section 1: Original Production Blueprint & Studio Metadata -->
      <div class="pdf-section pdf-avoid-break">
        <div class="pdf-section-title">1. Studio Production Blueprint & Original Instrumentation</div>
        <p style="font-size: 9pt; line-height: 1.5; color: #334155; margin-bottom: 8px;">
          ${data.summary || 'Authentic studio reconstruction detailing vintage hardware instrumentation, sound design recipes, and dual in-the-box DAW processing.'}
        </p>

        ${(data.audioInterface || data.monitoring) ? `
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            ${data.audioInterface ? `
              <div style="flex: 1; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 6px 10px; font-size: 7.5pt; color: #166534;">
                <strong>Audio Interface:</strong> ${data.audioInterface}
              </div>
            ` : ''}
            ${data.monitoring ? `
              <div style="flex: 1; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 6px 10px; font-size: 7.5pt; color: #1e40af;">
                <strong>Monitoring:</strong> ${data.monitoring}
              </div>
            ` : ''}
          </div>
        ` : ''}

        ${data.eraHeritage ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 10px; margin-bottom: 8px; font-size: 8pt; color: #475569;">
            <strong>Historical Session Context:</strong> ${data.eraHeritage}
          </div>
        ` : ''}

        ${data.originalGearRoster && data.originalGearRoster.length > 0 ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; margin-top: 6px;">
            <strong style="font-size: 8.5pt; color: #0f172a;">Verified Original Master Equipment:</strong>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
              ${data.originalGearRoster.map(g => `
                <span style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 2px 6px; font-size: 7.5pt; color: #334155;">
                  <strong>${g.name}:</strong> ${g.role}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Section 2: Master Track Sheet Table -->
      ${data.trackTable && data.trackTable.length > 0 ? `
        <div class="pdf-section pdf-avoid-break">
          <div class="pdf-section-title">2. Master Track Sheet & DAW Channel Allocation Table</div>
          <table class="pdf-table" style="font-size: 7.5pt;">
            <thead>
              <tr>
                <th style="width: 35px; text-align: center;">Trk</th>
                <th>Stem / Element</th>
                <th>Original Source</th>
                <th>Capture Pathway</th>
                <th>DAW Track Type</th>
                <th style="text-align: center;">Pan</th>
                <th style="text-align: center;">Fader</th>
                <th style="text-align: right;">Headroom</th>
                <th>Routing</th>
              </tr>
            </thead>
            <tbody>
              ${data.trackTable.map(row => `
                <tr>
                  <td style="text-align: center;"><strong>${row.trackNo}</strong></td>
                  <td><strong>${row.stem}</strong></td>
                  <td style="color: #475569;">${row.originalSource}</td>
                  <td>
                    <span style="font-size: 7pt; font-weight: 700; padding: 1px 5px; border-radius: 3px; ${
                      row.pathway?.includes('1') || row.pathway?.toLowerCase().includes('mic') ? 'background: #f3e8ff; color: #7e22ce; border: 1px solid #d8b4fe;' :
                      row.pathway?.includes('2') || row.pathway?.toLowerCase().includes('di') ? 'background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc;' :
                      'background: #fef9c3; color: #a16207; border: 1px solid #fde047;'
                    }">
                      ${row.pathway || 'Pathway 3: Audio Inst'}
                    </span>
                  </td>
                  <td style="color: #64748b;">${row.dawInput}</td>
                  <td style="text-align: center;">${row.pan}</td>
                  <td style="text-align: center;"><strong>${row.fader}</strong></td>
                  <td style="text-align: right; color: #059669;"><strong>${row.targetHeadroom}</strong></td>
                  <td>${row.routing}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- Section 3: Stems & Sound Design -->
      <div class="pdf-section">
        <div class="pdf-section-title">3. Stem-by-Stem Reconstruction, Sound Design & Processing</div>
        ${(data.stems || []).map((stem, sIdx) => `
          <div class="pdf-stem-card pdf-avoid-break" style="margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
              <div>
                <strong style="font-size: 10pt; color: #0f172a;">Stem ${sIdx + 1}: ${stem.name}</strong>
                ${stem.pathway ? `
                  <span style="font-size: 7pt; font-weight: 700; padding: 1px 5px; border-radius: 3px; margin-left: 6px; ${
                    stem.pathwayType === 1 ? 'background: #f3e8ff; color: #7e22ce; border: 1px solid #d8b4fe;' :
                    stem.pathwayType === 2 ? 'background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc;' :
                    'background: #fef9c3; color: #a16207; border: 1px solid #fde047;'
                  }">
                    ${stem.pathway}
                  </span>
                ` : ''}
              </div>
              ${stem.originalGear ? `<span style="font-size: 8pt; color: #64748b;">Original: <strong>${stem.originalGear}</strong></span>` : ''}
            </div>

            <!-- Pathway 1: Acoustic Microphone & Tracking Architecture -->
            ${stem.pathwayType === 1 ? `
              <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 6px 10px; margin-bottom: 8px; font-size: 8pt; color: #581c87;">
                <strong>🎙️ Pathway 1: Acoustic Microphone & Tracking Architecture:</strong>
                ${stem.microphoneSetup?.microphone ? `<div>• <strong>Microphone Model:</strong> ${stem.microphoneSetup.microphone}</div>` : ''}
                ${stem.microphoneSetup?.placement ? `<div>• <strong>Placement & Distance:</strong> ${stem.microphoneSetup.placement}</div>` : ''}
                ${stem.microphoneSetup?.preamp ? `<div>• <strong>Hardware Preamp:</strong> ${stem.microphoneSetup.preamp}</div>` : ''}
                ${stem.microphoneSetup?.comping ? `<div>• <strong>Comping Technique:</strong> ${stem.microphoneSetup.comping}</div>` : ''}
                ${stem.microphoneSetup?.rawText && !stem.microphoneSetup?.microphone ? `<div>${stem.microphoneSetup.rawText}</div>` : ''}
              </div>
            ` : ''}

            <!-- Pathway 2: Direct Injection (DI) & Line Tracking -->
            ${stem.pathwayType === 2 ? `
              <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 4px; padding: 6px 10px; margin-bottom: 8px; font-size: 8pt; color: #075985;">
                <strong>⚡ Pathway 2: Direct Injection (DI) & Line Tracking Architecture:</strong>
                ${stem.diSetup?.diBox ? `<div>• <strong>DI Box & Impedance:</strong> ${stem.diSetup.diBox}</div>` : ''}
                ${stem.diSetup?.preamp ? `<div>• <strong>Hardware Preamp & Line Trim:</strong> ${stem.diSetup.preamp}</div>` : ''}
                ${stem.diSetup?.rawText && !stem.diSetup?.diBox ? `<div>${stem.diSetup.rawText}</div>` : ''}
              </div>
            ` : ''}

            <!-- Pathway 3: Sound Design Recipe -->
            ${stem.pathwayType === 3 && stem.soundDesign && (stem.soundDesign.oscillators || stem.soundDesign.rawRecipe) ? `
              <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 4px; padding: 6px 10px; margin-bottom: 8px; font-size: 8pt; color: #713f12;">
                <strong>Pathway 3: Synthesizer Patch & Sound Design Blueprint:</strong>
                ${stem.soundDesign.oscillators ? `<div>• <strong>Oscillators:</strong> ${stem.soundDesign.oscillators}</div>` : ''}
                ${stem.soundDesign.filter ? `<div>• <strong>Filter / Cutoff:</strong> ${stem.soundDesign.filter}</div>` : ''}
                ${stem.soundDesign.envelope ? `<div>• <strong>Envelopes (ADSR):</strong> ${stem.soundDesign.envelope}</div>` : ''}
                ${stem.soundDesign.lfo ? `<div>• <strong>LFO / Modulation:</strong> ${stem.soundDesign.lfo}</div>` : ''}
                ${stem.soundDesign.effects ? `<div>• <strong>Character FX:</strong> ${stem.soundDesign.effects}</div>` : ''}
              </div>
            ` : ''}

            <!-- Pathway 3: MIDI Step Programming -->
            ${stem.pathwayType === 3 && stem.midiProgramming && (stem.midiProgramming.gridSwing || stem.midiProgramming.velocityDynamics) ? `
              <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 4px; padding: 6px 10px; margin-bottom: 8px; font-size: 8pt; color: #0369a1;">
                <strong>Pathway 3: MIDI Programming & Groove Architecture:</strong>
                ${stem.midiProgramming.gridSwing ? `<div>• <strong>Grid & Swing:</strong> ${stem.midiProgramming.gridSwing}</div>` : ''}
                ${stem.midiProgramming.velocityDynamics ? `<div>• <strong>Velocity:</strong> ${stem.midiProgramming.velocityDynamics}</div>` : ''}
                ${stem.midiProgramming.modulation ? `<div>• <strong>Modulation:</strong> ${stem.midiProgramming.modulation}</div>` : ''}
              </div>
            ` : ''}

            <!-- Stock Solution Block -->
            <div style="margin-top: 6px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 4px; padding: 6px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                <span style="font-size: 8pt; font-weight: 700; color: #0284c7;">
                  ${stem.pathwayType === 1 ? '🎙️ Native Stock Audio Track (Preamp Emulation)' :
                    stem.pathwayType === 2 ? '⚡ Native Stock Audio Track (DI Input)' :
                    `Native Stock Solution (${effectiveDaw})`}
                </span>
                ${(stem.stockPreamp || stem.stockInstrument) ? `
                  <span style="font-size: 7.5pt; font-weight: 700; color: #0369a1; background: #e0f2fe; padding: 1px 6px; border-radius: 3px;">
                    ${stem.stockPreamp || stem.stockInstrument}
                  </span>
                ` : ''}
              </div>
              ${stem.stockPreset ? `<div style="font-size: 7.5pt; margin-bottom: 2px;">• <strong>Channel Strip Preset:</strong> <span style="color: #047857; font-weight: 600;">${stem.stockPreset}</span></div>` : ''}
              ${stem.stockInstrumentSettings ? `<div style="font-size: 7.5pt; margin-bottom: 3px;">• <strong>${stem.pathwayType === 3 ? 'Instrument Settings' : 'Gain Staging'}:</strong> <code style="background: #e0f2fe; padding: 1px 4px; border-radius: 2px;">${stem.stockInstrumentSettings}</code></div>` : ''}

              ${stem.stockChain && stem.stockChain.length > 0 ? `
                <table class="pdf-table" style="margin-top: 4px; font-size: 7.5pt;">
                  <thead>
                    <tr>
                      <th style="width: 50px;">Slot</th>
                      <th>Plugin</th>
                      <th>Circuit / Type</th>
                      <th>Dialled Settings</th>
                      <th>Objective</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${stem.stockChain.map(row => `
                      <tr>
                        <td><strong>${row.slot}</strong></td>
                        <td><strong>${row.plugin}</strong></td>
                        <td>${row.type}</td>
                        <td><code style="background: #f1f5f9; padding: 1px 4px; border-radius: 3px;">${row.settings}</code></td>
                        <td>${row.objective}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              ` : ''}
            </div>

            <!-- 3rd-Party Solution Block -->
            <div style="margin-top: 6px; background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 6px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                <span style="font-size: 8pt; font-weight: 700; color: #7c3aed;">
                  ${stem.pathwayType === 1 ? '🎙️ Industry-Standard Preamp & Channel Strip VST' :
                    stem.pathwayType === 2 ? '⚡ Industry-Standard Pro DI & Amp VST' :
                    'Industry-Standard 3rd-Party Solution'}
                </span>
                ${(stem.thirdPartyPreamp || stem.thirdPartyInstrument) ? `
                  <span style="font-size: 7.5pt; font-weight: 700; color: #6d28d9; background: #f3e8ff; padding: 1px 6px; border-radius: 3px;">
                    ${stem.thirdPartyPreamp || stem.thirdPartyInstrument}
                  </span>
                ` : ''}
              </div>
              ${stem.thirdPartyPreset ? `<div style="font-size: 7.5pt; margin-bottom: 2px;">• <strong>Preset / Template:</strong> <span style="color: #b45309; font-weight: 600;">${stem.thirdPartyPreset}</span></div>` : ''}
              ${stem.thirdPartyInstrumentSettings ? `<div style="font-size: 7.5pt; margin-bottom: 3px;">• <strong>${stem.pathwayType === 3 ? 'VST Core Settings' : 'Gain & Trim Settings'}:</strong> <code style="background: #f3e8ff; padding: 1px 4px; border-radius: 2px;">${stem.thirdPartyInstrumentSettings}</code></div>` : ''}

              ${stem.thirdPartyChain && stem.thirdPartyChain.length > 0 ? `
                <table class="pdf-table" style="margin-top: 4px; font-size: 7.5pt;">
                  <thead>
                    <tr>
                      <th style="width: 50px;">Slot</th>
                      <th>Pro VST Plugin</th>
                      <th>Model / Circuit</th>
                      <th>Dialled Settings</th>
                      <th>Objective</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${stem.thirdPartyChain.map(row => `
                      <tr>
                        <td><strong>${row.slot}</strong></td>
                        <td><strong>${row.plugin}</strong></td>
                        <td>${row.type}</td>
                        <td><code style="background: #f1f5f9; padding: 1px 4px; border-radius: 3px;">${row.settings}</code></td>
                        <td>${row.objective}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Section 4: Mix Staging & Strategy -->
      <div class="pdf-section pdf-avoid-break">
        <div class="pdf-section-title">4. Comprehensive Mixdown Architecture & Commercial Mastering Suite</div>
        
        ${data.mixStrategy?.faderHierarchy && data.mixStrategy.faderHierarchy.length > 0 ? `
          <strong style="font-size: 8.5pt; color: #0f172a; margin-bottom: 4px; display: block;">4.1 Console Fader Balance & Stereo Staging:</strong>
          <table class="pdf-table" style="font-size: 7.5pt; margin-bottom: 10px;">
            <thead>
              <tr>
                <th>Stem / Element</th>
                <th style="width: 60px; text-align: center;">Fader</th>
                <th style="width: 60px; text-align: center;">Pan</th>
                <th>Mixdown Role</th>
                <th>Spatial Staging</th>
              </tr>
            </thead>
            <tbody>
              ${data.mixStrategy.faderHierarchy.map(row => `
                <tr>
                  <td><strong>${row.stem}</strong></td>
                  <td style="text-align: center;"><strong>${row.level}</strong></td>
                  <td style="text-align: center;">${row.pan}</td>
                  <td>${row.role}</td>
                  <td>${row.space}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}

        ${data.mixStrategy?.frequencySeparation ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 10px; margin-bottom: 6px; font-size: 8pt;">
            <strong style="color: #6b21a8;">4.2 Frequency Masking & Spectral Separation:</strong>
            <p style="margin: 2px 0 0; color: #334155;">${data.mixStrategy.frequencySeparation}</p>
          </div>
        ` : ''}

        ${data.mixStrategy?.dynamicControl ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 10px; margin-bottom: 6px; font-size: 8pt;">
            <strong style="color: #b45309;">4.3 Dynamic Control, Mix Subgroups & Bus Glue:</strong>
            <p style="margin: 2px 0 0; color: #334155;">${data.mixStrategy.dynamicControl}</p>
          </div>
        ` : ''}

        ${data.mixStrategy?.spatialDepth ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 10px; margin-bottom: 6px; font-size: 8pt;">
            <strong style="color: #047857;">4.4 Spatial Depth & Time-Based FX Architecture:</strong>
            <p style="margin: 2px 0 0; color: #334155;">${data.mixStrategy.spatialDepth}</p>
          </div>
        ` : ''}
      </div>

      <!-- Section 5: Master Bus Suite -->
      <div class="pdf-section pdf-avoid-break">
        <div class="pdf-section-title">5. Commercial Master Bus Suite & Loudness Targets</div>
        <div style="display: flex; gap: 10px; margin-bottom: 8px;">
          <div style="flex: 1; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 10px;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">INTEGRATED LOUDNESS</span>
            <div style="font-size: 11pt; font-weight: 700; color: #0284c7;">${data.masterBus?.targetLoudness || '-8 to -10 LUFS'}</div>
          </div>
          <div style="flex: 1; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 10px;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">TRUE PEAK CEILING</span>
            <div style="font-size: 11pt; font-weight: 700; color: #16a34a;">${data.masterBus?.truePeak || '-0.3 dBFS'}</div>
          </div>
          <div style="flex: 1; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 10px;">
            <span style="font-size: 7pt; color: #64748b; text-transform: uppercase;">STEREO PHASE CORRELATION</span>
            <div style="font-size: 11pt; font-weight: 700; color: #7c3aed;">${data.masterBus?.phaseCorrelation || '+0.8 to +1.0'}</div>
          </div>
        </div>

        ${data.masterBus?.stockChain && data.masterBus.stockChain.length > 0 ? `
          <div style="margin-top: 6px;">
            <strong style="font-size: 8pt; color: #0284c7;">100% Native Stock Master Bus (${effectiveDaw}):</strong>
            <table class="pdf-table" style="font-size: 7.5pt; margin-top: 4px;">
              <thead>
                <tr>
                  <th style="width: 50px;">Stage</th>
                  <th>Processor</th>
                  <th>Type</th>
                  <th>Settings</th>
                  <th>Objective</th>
                </tr>
              </thead>
              <tbody>
                ${data.masterBus.stockChain.map(row => `
                  <tr>
                    <td><strong>${row.slot}</strong></td>
                    <td><strong>${row.plugin}</strong></td>
                    <td>${row.type}</td>
                    <td><code style="background: #f1f5f9; padding: 1px 4px; border-radius: 3px;">${row.settings}</code></td>
                    <td>${row.objective}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}

        ${data.masterBus?.thirdPartyChain && data.masterBus.thirdPartyChain.length > 0 ? `
          <div style="margin-top: 8px;">
            <strong style="font-size: 8pt; color: #7c3aed;">Industry-Standard 3rd-Party Master Bus:</strong>
            <table class="pdf-table" style="font-size: 7.5pt; margin-top: 4px;">
              <thead>
                <tr>
                  <th style="width: 50px;">Stage</th>
                  <th>Processor</th>
                  <th>Type</th>
                  <th>Settings</th>
                  <th>Objective</th>
                </tr>
              </thead>
              <tbody>
                ${data.masterBus.thirdPartyChain.map(row => `
                  <tr>
                    <td><strong>${row.slot}</strong></td>
                    <td><strong>${row.plugin}</strong></td>
                    <td>${row.type}</td>
                    <td><code style="background: #f1f5f9; padding: 1px 4px; border-radius: 3px;">${row.settings}</code></td>
                    <td>${row.objective}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}
      </div>

      <!-- Footer -->
      <div class="pdf-footer">
        <span>Tracksheet Creator • Studio Production & Sound Design Suite • tracksheetcreator.com</span>
      </div>
    </div>
  `;
}

export async function downloadProducerPdf({ content, trackName, artistName, daw }) {
  const html2pdfModule = await import('html2pdf.js');
  const html2pdf = html2pdfModule.default || html2pdfModule;

  const element = document.createElement('div');
  element.className = 'pdf-render-root';
  element.innerHTML = generateProducerPdfHtml({ content, trackName, artistName, daw });
  document.body.appendChild(element);

  const opt = {
    margin: [10, 10, 12, 10],
    filename: `${(trackName || 'track').replace(/[^a-z0-9]/gi, '_')}_Producer_Recreation_${(daw || 'Studio').replace(/[^a-z0-9]/gi, '_')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } finally {
    if (document.body.contains(element)) {
      document.body.removeChild(element);
    }
  }
}
