extends Control;

func _ready():
	visible = false;
	
	MessageManager.update_debug.connect(update_debug);

func update_debug(debug: bool):
	visible = debug;
