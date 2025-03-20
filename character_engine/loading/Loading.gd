class_name Loading extends Control;

var character_name := "NULL";
var default_character_icon := preload("res://icons/Default.png");
var character_icon := default_character_icon;
var character_scene_path: String;
var character_scene: PackedScene;
var character: Character;

var visuals: Control;
var client: HTTPRequest;

func _ready():
	visuals = get_node("Center");

func start_load(char_name: String, pack_path: String, scene_path: String):
	character_name = char_name;
	character_scene_path = scene_path;
	
	var new_icon: CompressedTexture2D;
	if (ResourceLoader.exists("res://icons/" + char_name + ".png")):
		new_icon = load("res://icons/" + char_name + ".png");
	else:
		new_icon = default_character_icon;
	update_icon(new_icon);
	
	if (character):
		character.queue_free();
	
	visuals.visible = true;
	
	if (client):
		client.cancel_request();
		client.queue_free();
	
	client = HTTPRequest.new();
	client.connect('request_completed', self._request_completed);
	add_child(client);
	client.download_file = "res://" + character_name + ".pck";
	client.request(pack_path);

func _request_completed(result, response_code, headers, body):
	if result != HTTPRequest.RESULT_SUCCESS:
		print("UHOH, HTTP ERROR " + str(result));
		
		character_name = "NULL";
		
		return;
	
	client.queue_free();
	
	load_character("res://" + character_name + ".pck");
	
	visuals.visible = false;

func load_character(path: String):
	var status = ProjectSettings.load_resource_pack(path);
	
	if (!status):
		print("UHOH, Could Not Load Character Pack.");
		
		return;
	
	character_scene = load(character_scene_path);
	
	character = character_scene.instantiate();
	
	add_child(character);

func update_icon(icon: CompressedTexture2D):
	character_icon = icon;
	var texture_rect: TextureRect = get_node("Center/TextureRect");
	texture_rect.texture = character_icon;
