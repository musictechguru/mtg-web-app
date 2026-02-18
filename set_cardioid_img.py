import json
import os

def set_cardioid_image():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    target_image = "/images/vol2/explanation_understanding_polar_patterns_cardioid.svg"
    
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
                # Update Cardioid Image references
                # We look for "cardioid" in the current src or alt, or if it was recently changed/reverted.
                # The previous revert set it to "/images/svg/polar_pattern_cardioid.svg".
                # We want to change that to the new target.
                
                # Check explanation_image
                if 'explanation_image' in node:
                    img_data = node['explanation_image']
                    current_src = ""
                    if isinstance(img_data, dict):
                        current_src = img_data.get('src', '')
                    elif isinstance(img_data, str):
                        current_src = img_data
                    
                    # Target existing cardioid images
                    if 'cardioid' in current_src.lower() and 'hyper' not in current_src.lower() and 'super' not in current_src.lower():
                         # Exclude hyper/super cardioid unless we are sure.
                         # The user said "for cardiod polar pattyern picture".
                         
                         if isinstance(img_data, dict):
                             print(f"Updating explanation_image in node: {node.get('id', 'unknown')}")
                             node['explanation_image']['src'] = target_image
                             updates_count += 1
                         elif isinstance(img_data, str):
                             print(f"Updating explanation_image (str) in node: {node.get('id', 'unknown')}")
                             node['explanation_image'] = target_image
                             updates_count += 1

                # Check img property
                if 'img' in node:
                    src = node['img']
                    if isinstance(src, str) and 'cardioid' in src.lower() and 'hyper' not in src.lower() and 'super' not in src.lower():
                        print(f"Updating img in node: {node.get('id', 'unknown')}")
                        node['img'] = target_image
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
            print(f"Success: set {updates_count} images to {target_image}")
        else:
            print("No suitable Cardioid images found to update.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    set_cardioid_image()
