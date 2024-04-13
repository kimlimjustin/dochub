import shutil
import glob
import os

# Define the source and destination paths
src_extensions = [".ts", ".tsx", ".scss"]
src_paths = ["./src/**/*", "./src/lib/**/*", "./build/**/*"]
dest_path = "out"

# Copy the files
for src_path in src_paths:
    files = glob.glob(src_path, recursive=True)
    for file in files:
        if not os.path.isdir(file) and not any(file.endswith(ext) for ext in src_extensions):
            base_path = src_path.replace("**/*", "")
            out_path = file.replace(base_path, dest_path  + "/")
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            shutil.copy2(file, out_path)