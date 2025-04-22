#/bin/bash

if [ ! -f ./godot ]; then
    echo "Godot Editor Not Installed. Please Run ./install.sh"
    exit 1
fi

if [ ! -f /home/node/.local/share/godot/export_templates/4.4.stable/web_nothreads_release.zip ]; then
    echo "Godot Export Templates Not Installed (Or Out Of Date). Please Run ./install.sh"
    exit 1
fi

echo ""
echo "====    BUILDING BASE ENGINE    ===="
echo ""

if [ ! -d "../static/character_engine" ]; then
    mkdir ../static/character_engine
fi
if [ -d "../character_engine/.godot/" ]; then
    rm -r ../character_engine/.godot/
fi
./godot --path "../character_engine" --headless --export-release "Web" ../static/character_engine/character_engine.html

echo ""
echo "====    BUILDING CHARACTER PACKS    ===="

if [ ! -d "../static/characters" ]; then
    mkdir ../static/characters
fi

build_character_pack () {
    echo ""
    echo "====    BUILDING CHARACTER PACK '$1'    ===="
    echo ""

    if [ -d "../character_engine/.godot/" ]; then
        rm -r ../character_engine/.godot/
    fi
    ./godot --path "../character_engine" --headless --export-pack "$1" "../static/characters/$2"
}

build_character_pack "Testing Miku" testing_miku.pck
build_character_pack "Notsune Miku" notsune_miku.pck
