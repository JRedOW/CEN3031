extends RichTextLabel;

var loading: Loading;

func _ready():
	loading = get_parent().get_parent().get_node("Loading");

func _process(_delta):
	text = "Current Character: ";
	text += loading.character_name;
