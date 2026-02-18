import json
import os

def update_cardioid_image():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    if not os.path.exists(file_path):
        print(f"Error: File not found at {file_path}")
        return

    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        # Traverse and find questions using the old cardioid image
        # Target Image: /images/svg/polar_pattern_cardioid.svg OR generic references
        # New Image: /images/svg/stylized_cardioid.svg
        
        updates_count = 0
        
        def update_node(node):
            nonlocal updates_count
            if isinstance(node, dict):
                # Check explanation_image
                if 'explanation_image' in node:
                    img_data = node['explanation_image']
                    if isinstance(img_data, dict):
                        src = img_data.get('src', '')
                        if 'cardioid' in src.lower() and 'stylized' not in src.lower():
                            print(f"Updating image in node: {node.get('id', 'unknown')}")
                            node['explanation_image']['src'] = "/images/svg/stylized_cardioid.svg"
                            node['explanation_image']['alt'] = "Stylized Cardioid Pattern"
                            updates_count += 1
                    elif isinstance(img_data, str):
                        if 'cardioid' in img_data.lower() and 'stylized' not in img_data.lower():
                            print(f"Updating image string in node: {node.get('id', 'unknown')}")
                            node['explanation_image'] = "/images/svg/stylized_cardioid.svg"
                            updates_count += 1
                
                # Check img property (top level)
                if 'img' in node:
                     src = node['img']
                     if isinstance(src, str) and 'cardioid' in src.lower() and 'stylized' not in src.lower():
                        print(f"Updating 'img' prop in node: {node.get('id', 'unknown')}")
                        node['img'] = "/images/svg/stylized_cardioid.svg"
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
            print(f"Success: Updated {updates_count} occurrences of Cardioid image.")
        else:
            print("No Cardioid images found to update.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    update_cardioid_image()
