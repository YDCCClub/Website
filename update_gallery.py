import os
import json

# --- Configuration ---
# The directory where your album folders are located
ALBUMS_ROOT_DIR = os.path.join("images", "Albums")

# Path to the JavaScript album configuration file to be updated
ALBUM_CONFIG_JS = os.path.join("js", "album-config.js")

# --- Main Script ---
def scan_and_update_gallery():
    """Scans the local albums directory and updates the gallery config file."""
    print(f"Scanning for albums in: {ALBUMS_ROOT_DIR}")

    if not os.path.isdir(ALBUMS_ROOT_DIR):
        print(f"Error: The albums directory was not found at '{ALBUMS_ROOT_DIR}'")
        return

    albums_list = []
    album_folders = sorted([f for f in os.listdir(ALBUMS_ROOT_DIR) if os.path.isdir(os.path.join(ALBUMS_ROOT_DIR, f))])

    if not album_folders:
        print("No album folders found.")
    else:
        print(f"Found albums: {', '.join(album_folders)}")

    for album_name in album_folders:
        album_path = os.path.join(ALBUMS_ROOT_DIR, album_name)
        allowed_extensions = ['.png', '.jpg', '.jpeg', '.gif']
        image_files = sorted([f for f in os.listdir(album_path)
                              if os.path.isfile(os.path.join(album_path, f)) and os.path.splitext(f)[1].lower() in allowed_extensions])

        if not image_files:
            print(f"- Skipping '{album_name}', no images found.")
            continue

        # Find a specific thumbnail file or default to the first image
        thumbnail_file = next((f for f in image_files if f.lower().startswith('thumbnail.') or f.lower().startswith('thumnail.')), image_files[0])
        
        # Use forward slashes for web paths
        thumbnail_path = os.path.join(album_path, thumbnail_file).replace('\\', '/')
        image_paths = [os.path.join(album_path, img).replace('\\', '/') for img in image_files]

        albums_list.append({
            "name": album_name,
            "thumbnail": thumbnail_path,
            "images": image_paths
        })

    # Reconstruct the js/album-config.js file content
    # Using json.dumps for proper formatting and escaping
    js_content = f"const albums = {json.dumps(albums_list, indent=4)};"

    try:
        with open(ALBUM_CONFIG_JS, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"\nSuccessfully updated {ALBUM_CONFIG_JS}!")
    except Exception as e:
        print(f"\nError writing to {ALBUM_CONFIG_JS}: {e}")

if __name__ == "__main__":
    scan_and_update_gallery()
