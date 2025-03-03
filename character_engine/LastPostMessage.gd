extends RichTextLabel

func _process(_delta: float) -> void:
	text = MessageManager.last_message;
