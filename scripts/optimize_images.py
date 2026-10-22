import os
import sys
from PIL import Image

def optimize_images(target_dir='public/images', max_dimension=1280, min_size_kb=150):
    total_orig = 0
    total_new = 0
    optimized_count = 0
    skipped_count = 0
    error_count = 0

    image_exts = ('.png', '.jpg', '.jpeg')

    for root, dirs, files in os.walk(target_dir):
        for f in sorted(files):
            ext = os.path.splitext(f)[1].lower()
            if ext not in image_exts:
                continue

            full_path = os.path.join(root, f)
            try:
                orig_size = os.path.getsize(full_path)
            except OSError:
                continue

            if orig_size < min_size_kb * 1024:
                skipped_count += 1
                continue

            total_orig += orig_size
            temp_path = full_path + '.opt_tmp'

            try:
                with Image.open(full_path) as im:
                    # Save format
                    is_png = ext == '.png'
                    is_jpeg = ext in ('.jpg', '.jpeg')

                    # Resize if needed
                    w, h = im.size
                    if w > max_dimension or h > max_dimension:
                        im.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)

                    if is_png:
                        # Check if alpha is fully opaque
                        if im.mode == 'RGBA':
                            try:
                                extrema = im.getextrema()
                                if extrema[3] == (255, 255):
                                    im = im.convert('RGB')
                            except Exception:
                                pass
                        im.save(temp_path, format='PNG', optimize=True)
                    elif is_jpeg:
                        if im.mode in ('RGBA', 'P', 'LA'):
                            im = im.convert('RGB')
                        im.save(temp_path, format='JPEG', quality=82, optimize=True, progressive=True)
                    else:
                        im.save(temp_path, optimize=True)

                new_size = os.path.getsize(temp_path)
                if new_size < orig_size:
                    os.replace(temp_path, full_path)
                    total_new += new_size
                    optimized_count += 1
                    saved_kb = (orig_size - new_size) / 1024
                    if orig_size > 1024 * 1024:  # Print for files > 1MB
                        print(f"Optimized: {f[:35]:35} | {orig_size/(1024*1024):.2f}MB -> {new_size/(1024*1024):.2f}MB (-{saved_kb/1024:.2f}MB)")
                else:
                    if os.path.exists(temp_path):
                        os.remove(temp_path)
                    total_new += orig_size
                    skipped_count += 1

            except Exception as e:
                error_count += 1
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                total_new += orig_size
                print(f"Error processing {full_path}: {e}")

    saved_mb = (total_orig - total_new) / (1024 * 1024)
    pct = ((total_orig - total_new) / total_orig * 100) if total_orig > 0 else 0
    print("\n" + "=" * 50)
    print(f"Optimization Complete!")
    print(f"Files optimized : {optimized_count}")
    print(f"Files skipped   : {skipped_count}")
    print(f"Errors          : {error_count}")
    print(f"Original size   : {total_orig / (1024*1024):.2f} MB")
    print(f"New size        : {total_new / (1024*1024):.2f} MB")
    print(f"Total Saved     : {saved_mb:.2f} MB ({pct:.1f}% reduction)")
    print("=" * 50)

if __name__ == '__main__':
    optimize_images()
