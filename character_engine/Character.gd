class_name Character extends Node2D;

func _ready():
	boot();
	
	EmotionManager.new_emotion.connect(update_emotion)
	
	MessageManager.send_message('{"command":"started"}');

func _exit_tree():
	MessageManager.send_message('{"command":"stopped"}');

func boot():
	pass;

func update_emotion(emotion: EmotionManager.Emotions):
	pass;
