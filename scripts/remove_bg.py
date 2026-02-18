from PIL import Image

def remove_background(input_path, output_path, tolerance=30):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    # Get the background color from the top-left pixel
    bg_color = datas[0][:3]
    print(f"Detected background color: {bg_color}")

    newData = []
    for item in datas:
        # Check if the pixel matches the background color within tolerance
        if all(abs(item[i] - bg_color[i]) < tolerance for i in range(3)):
            newData.append((255, 255, 255, 0))  # Transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    remove_background(
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/assets/mascot_sprites.jpg",
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/assets/mascot_sprites.png"
    )
