
import os

images_dir = "public/images/explanations"
placeholders = []
simple = []
complex_files = []
pngs = []

for filename in os.listdir(images_dir):
    path = os.path.join(images_dir, filename)
    if not os.path.isfile(path):
        continue
        
    if filename.endswith(".png"):
        pngs.append(filename)
        continue
        
    if not filename.endswith(".svg"):
        continue
        
    size = os.path.getsize(path)
    
    with open(path, 'r') as f:
        content = f.read()
        
    # Check for placeholder indicators
    # 1. Very small size
    # 2. Text content equals filename
    is_placeholder = False
    if size < 500:
        is_placeholder = True
    elif filename in content:
        is_placeholder = True
        
    if is_placeholder:
        placeholders.append(filename)
    elif size < 5000:
        simple.append(filename)
    else:
        complex_files.append(filename)

print(f"Total SVGs: {len(placeholders) + len(simple) + len(complex_files)}")
print(f"PNGs (ignored): {len(pngs)}")
print(f"Placeholders: {len(placeholders)}")
print(f"Simple Diagrams: {len(simple)}")
print(f"Complex Diagrams: {len(complex_files)}")

print("\n--- Placeholders (Sample) ---")
for p in placeholders[:10]:
    print(p)

print("\n--- Simple (Sample) ---")
for s in simple[:10]:
    print(s)
