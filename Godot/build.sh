#/bin/bash

if [ ! -f ./godot ]; then
    echo "Godot Editor Not Installed. Please Run ./install.sh"
    exit 1
fi

if [ ! -f /home/node/.local/share/godot/export_templates/4.4.stable/web_nothreads_release.zip ]; then
    echo "Godot Export Templates Not Installed (Or Out Of Date). Please Run ./install.sh"
    exit 1
fi

mkdir ../static/character_engine
./godot --path "../character_engine" --headless --export-release "Web" ../static/character_engine/character_engine.html
