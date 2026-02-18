import os
import difflib

def check_retroactive():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images'
    
    # Map of "New SVG Name" -> ["Keywords to search for"]
    # If we find an existing PNG with these keywords, it might be a "better older image"
    checks = {
        # Batch 4
        "drum_room_mic_setup.svg": ["drum", "room", "mic", "kit"],
        "cable_capacitance_filter.svg": ["capacitan", "cable", "filter"],
        "double_tracking_panning.svg": ["double", "track", "pan"],
        "vacuum_tube_bias_curve.svg": ["tube", "valve", "bias"],
        "balanced_cable_cmrr.svg": ["balanc", "cmrr"],
        "high_z_low_z_diagram.svg": ["impedance", "z", "di"],
        "transformer_isolation_diagram.svg": ["transform", "isolat"],
        "ground_loop_diagram.svg": ["ground", "loop", "hum"],
        "patchbay_normalisation.svg": ["patch", "normal"],
        "parallel_compression_routing.svg": ["parallel", "compress", "new york"],

        # Batch 5
        "near_field_setup.svg": ["near", "field", "monitor", "speaker"],
        "reflection_types.svg": ["reflect", "diffuse", "scatter"],
        "comb_filtering_graph.svg": ["comb", "filter"],
        "membrane_absorber.svg": ["membrane", "panel", "trap"],
        "air_gap_mounting.svg": ["air", "gap", "mount"],
        "sbir_boundary_effect.svg": ["sbir", "boundar"],
        "standing_waves_visual.svg": ["standing", "wave", "mode"],
        "aftertouch_curve.svg": ["aftertouch", "pressure"],
        "series_signal_flow.svg": ["series", "chain"],
        "balanced_vs_unbalanced.svg": ["balanc", "unbalanc"]
    }

    # Gather all existing images (excluding the ones we just made in /explanations/ if possible, or just ignore exact matches)
    existing_images = []
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, base_path)
                existing_images.append(rel_path)

    print("--- Retroactive Check: Potential 'Older Images' Missed ---")
    
    found_any = False
    for svg_name, keywords in checks.items():
        potential_matches = []
        for img in existing_images:
            img_lower = img.lower()
            # Simple keyword match: if ALL or MOST keywords are in the filename
            # Let's try matching at least one strong keyword, or a combo
            
            # Check for strong match
            match_count = sum(1 for k in keywords if k in img_lower)
            if match_count >= 1:
                # Exclude obvious things like "placeholder" or the SVG itself (though we only listed png/jpg)
                potential_matches.append(img)

        if potential_matches:
            # Filter for high relevance (e.g. >1 keyword or exact phrase)
            best_matches = [m for m in potential_matches if any(k in m for k in keywords)]
            
            if best_matches:
                print(f"\nFor '{svg_name}':")
                for m in best_matches[:5]: # Show top 5
                   print(f"  - Found: {m}")
                found_any = True
                
    if not found_any:
        print("\nNo obvious 'older images' found for these topics.")

if __name__ == "__main__":
    check_retroactive()
