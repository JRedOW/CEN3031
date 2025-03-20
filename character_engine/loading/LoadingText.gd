extends RichTextLabel;

var time = 0;
var loading: Loading;

func _ready():
	loading = get_parent().get_parent();

func _process(delta: float):
	time += delta;
	text = "[font_size=48]" + loading.character_name + ' \n';
	
	var time_calc: int = round(time * 2.0);
	text += "[/font_size][font_size=24]Calling ." + ".".repeat(time_calc % 3) + "[/font_size]";
