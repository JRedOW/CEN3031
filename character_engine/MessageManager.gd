extends Node;

signal update_debug(debug: bool);

var callback = JavaScriptBridge.create_callback(on_message_received)
var last_message = "";
var last_json;

func _ready() -> void:
	var window = JavaScriptBridge.get_interface("window");
	
	window.addEventListener("message", callback);
	
	send_message('{"command":"ready"}');

func on_message_received(event) -> void:
	var js_event = event[0];
	var message = js_event.data;
	
	last_message = message;
	
	parse_json_message();

func send_message(message: String) -> void:
	var window = JavaScriptBridge.get_interface("window");
	
	window.parent.postMessage(message, '*');

func parse_json_message():
	var json = JSON.new();
	var error = json.parse(last_message);
	
	if error != OK:
		print("JSON Parse Error: ", json.get_error_message(), " in ", last_message, " at line ", json.get_error_line());
		
		return;
	var data_received = json.data;
	
	if (!data_received.has("command")):
		print("Message has no command");
		
		return;
	
	match data_received["command"]:
		"new_emotion":
			EmotionManager.update_emotion(data_received["emotion"]);
		"debug":
			print("Debug Mode: ", data_received["debug"])
			update_debug.emit(data_received["debug"]);
		_:
			print("An unknown command was sent");
			
			return;
