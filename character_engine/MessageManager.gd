extends Node;

var callback = JavaScriptBridge.create_callback(on_message_received)
var last_message = "";

func _ready() -> void:
	var window = JavaScriptBridge.get_interface("window");
	
	window.addEventListener("message", callback);

func on_message_received(event) -> void:
	var js_event = event[0];
	var message = js_event.data;
	
	last_message = message;

func send_message(message: String) -> void:
	var window = JavaScriptBridge.get_interface("window");
	
	window.parent.postMessage(message, '*');
