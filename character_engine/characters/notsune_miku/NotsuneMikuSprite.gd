extends AnimatedSprite2D;
var screen: Vector2i = get_viewport().size;

func _ready() -> void:
	screen = get_viewport().size;
	
	reposition();

func _process(_delta: float) -> void:
	reposition();

func reposition():
	position = Vector2(screen.x/2, screen.y - 280);
