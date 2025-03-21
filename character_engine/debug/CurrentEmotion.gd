extends RichTextLabel;

func _process(_delta):
	text = "Current Emotion: ";
	text += EmotionManager.Emotions.keys()[EmotionManager.current_emotion];
