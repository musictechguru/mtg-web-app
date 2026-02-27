import os
import glob
import shutil

src_dir = '/Users/thorhouse/.gemini/antigravity/brain/7446935f-32c4-41b0-a86d-c591b48b6e56'
dest_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/gen'

files = glob.glob(f"{src_dir}/t8_q*_hq_*.png")
print(f"Found {len(files)} images to copy.")

for f in files:
    basename = os.path.basename(f)
    parts = basename.split('_hq_')
    if len(parts) == 2:
        new_name = f"{parts[0]}_hq_123.png"
        dest_path = os.path.join(dest_dir, new_name)
        shutil.copy2(f, dest_path)

print("Images successfully copied and renamed.")
