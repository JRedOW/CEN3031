extends RichTextLabel;

func _process(_delta: float) -> void:
	if (MessageManager.last_message != ""):
		text = MessageManager.last_message;
	else:
		text = "N/A";
