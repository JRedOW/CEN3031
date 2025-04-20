extends Character;

var reset_clock := -1.0;
@export var MikuSprite: AnimatedSprite2D;
@export var ResetTime := 2.0;


func _process(delta: float) -> void:
	if (reset_clock > 0.0):
		reset_clock -= delta;
	
		if (reset_clock <= 0.0):
			reset_clock = -1.0;
			
			EmotionManager.update_emotion("neutral");

func update_emotion(emotion: EmotionManager.Emotions):
	match emotion:
		EmotionManager.Emotions.Excited:
			reset_clock = ResetTime;
			
			MikuSprite.frame = 3;
		EmotionManager.Emotions.Happy:
			reset_clock = ResetTime;
			
			MikuSprite.frame = 2;
		EmotionManager.Emotions.Neutral:
			MikuSprite.frame = 0;
		EmotionManager.Emotions.Sad:
			reset_clock = ResetTime;
			
			MikuSprite.frame = 1;
		_:
			print("Notsune Miku Does Not Support Emotion: ", emotion);
			
			return;
	
	print("Updated Notsune Miku's Emotion To: ", emotion);
	
	pass;
