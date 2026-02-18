import os

def find_placeholders():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations'
    placeholders = []
    
    for filename in os.listdir(base_path):
        if not filename.endswith('.svg'):
            continue
            
        filepath = os.path.join(base_path, filename)
        try:
            with open(filepath, 'r') as f:
                content = f.read()
                
            # Check for the specific placeholder signature
            # The previous generator used: s.add_text(400, 300, name, ...)
            # So looking for the filename inside the SVG text is a good heuristic
            if f">{filename}</text>" in content:
                placeholders.append(filename)
                
        except Exception as e:
            print(f"Error reading {filename}: {e}")

    print(f"Found {len(placeholders)} placeholder images:")
    for p in placeholders:
        print(p)

if __name__ == "__main__":
    find_placeholders()
