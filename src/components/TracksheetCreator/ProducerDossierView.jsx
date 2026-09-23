import React from 'react';
import LogbookDossierView from './LogbookDossierView';

/**
 * ProducerDossierView
 * Replicates the complete Component 1 (C1) solution architecture, layout, and visual fidelity
 * onto the Producer Studio solution with dedicated studio recreation branding.
 *
 * Includes:
 * 1. Hero Card parity with historical tracksheet (spinning vinyl, release metadata, key/tempo/meter/tuning, confidence gauge)
 * 2. Section 2: Virtual Console Mixing Desk with faders, pans, slot chips, 3rd-party toggle, and interactive pop-up inspector
 * 3. Section 3: Collapsible Modular Signal Path & Channel Strip (Hardware Setup & In-The-Box DAW Processing)
 * 4. Section 4: Modular Mix Strategy (4 Core Pillars with tabbed & accordion layout)
 * 5. Section 5: Standalone Master Bus Processing Chain & Metering Architecture (HUD targets & 4-stage serial rack flow)
 */
export default function ProducerDossierView({ data, daw, tracksheetData = null }) {
  if (!data) return null;

  return (
    <LogbookDossierView 
      data={data} 
      daw={daw} 
      tracksheetData={tracksheetData} 
      isProducer={true} 
    />
  );
}
