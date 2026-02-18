import json
import os

def revert_images():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    if not os.path.exists(file_path):
        print(f"Error: File not found at {file_path}")
        return

    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        updates_count = 0
        
        def update_node(node):
            nonlocal updates_count
            if isinstance(node, dict):
                # Revert Cardioid Image
                # Target: stylized_cardioid.svg -> polar_pattern_cardioid.svg
                if 'explanation_image' in node:
                    img_data = node['explanation_image']
                    if isinstance(img_data, dict):
                        src = img_data.get('src', '')
                        if 'stylized_cardioid.svg' in src:
                            print(f"Reverting Cardioid in node: {node.get('id', 'unknown')}")
                            node['explanation_image']['src'] = "/images/svg/mic_placement_snare.svg" if 'snare' in node.get('id', '') else "/images/svg/polar_pattern_cardioid.svg"
                            # Actually, wait. The user hated "These images" (plural).
                            # So revert stylized_cardioid to polar_pattern_cardioid.svg (standard).
                            node['explanation_image']['src'] = "/images/svg/polar_pattern_cardioid.svg"
                            node['explanation_image']['alt'] = "Cardioid Polar Pattern"
                            updates_count += 1
                    elif isinstance(img_data, str):
                        if 'stylized_cardioid.svg' in img_data:
                            print(f"Reverting Cardioid (str) in node: {node.get('id', 'unknown')}")
                            node['explanation_image'] = "/images/svg/polar_pattern_cardioid.svg"
                            updates_count += 1

                if 'img' in node:
                    src = node['img']
                    if isinstance(src, str) and 'stylized_cardioid.svg' in src:
                         print(f"Reverting Cardioid (img) in node: {node.get('id', 'unknown')}")
                         node['img'] = "/images/svg/polar_pattern_cardioid.svg"
                         updates_count += 1
                
                # Revert Drums Q1 Image
                # Target: snare_mic_position.svg -> mic_placement_snare.png (Legacy/Real image)
                # Drums Q1 ID: v2_t5_b_1
                if isinstance(node, dict) and node.get('id') == 'v2_t5_b_1':
                    print(f"Reverting Drums Q1 ({node.get('id')})")
                    # Use the legacy PNG if possible, or the more standard SVG
                    # Let's try mic_placement_snare.png based on "older images"
                    legacy_img = "/images/explanations/mic_placement_snare.png"
                    
                    if 'img' in node:
                        node['img'] = legacy_img
                        updates_count += 1
                        
                    if 'explanation_image' in node:
                        if isinstance(node['explanation_image'], dict):
                            node['explanation_image']['src'] = legacy_img
                            # Start fresh for explanation_image
                        elif isinstance(node['explanation_image'], str):
                            node['explanation_image'] = legacy_img
                        updates_count += 1

                for key, value in node.items():
                    update_node(value)
            elif isinstance(node, list):
                for item in node:
                    update_node(item)

        update_node(data)
        
        if updates_count > 0:
            with open(file_path, 'w') as f:
                json.dump(data, f, indent=4)
            print(f"Success: Reverted/Updated {updates_count} image references.")
        else:
            print("No images found to revert.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    revert_images()
