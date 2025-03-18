extends Node;

enum Emotions {
	Excited,
	Happy,
	Neutral,
	Sad
}

signal new_emotion(emotion: Emotions);

var current_emotion := Emotions.Neutral;

func update_emotion(emotion: String):
	match emotion.to_lower():
		"excited":
			current_emotion = Emotions.Excited;
		"happy":
			current_emotion = Emotions.Happy;
		"neutral":
			current_emotion = Emotions.Neutral;
		"sad":
			current_emotion = Emotions.Sad;
		_:
			print("Attempt to update emotion with invalid name");
			
			return;
	
	new_emotion.emit(current_emotion);
	
	print("Emotion updated to: ", emotion);
