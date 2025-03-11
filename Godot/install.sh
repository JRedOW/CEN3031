#/bin/bash

curl -o Godot.zip -L https://github.com/godotengine/godot/releases/download/4.4-stable/Godot_v4.4-stable_linux.x86_64.zip
unzip Godot.zip
mv Godot_v4.4-stable_linux.x86_64 godot
chmod +x godot

curl -o export_templates.tpz -L https://github.com/godotengine/godot/releases/download/4.4-stable/Godot_v4.4-stable_export_templates.tpz
mkdir -p /home/node/.local/share/godot/export_templates/4.4.stable/
unzip -j export_templates.tpz -d /home/node/.local/share/godot/export_templates/4.4.stable/
