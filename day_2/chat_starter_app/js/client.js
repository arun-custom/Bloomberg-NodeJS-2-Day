$(document).ready(function() {
	resizeChat();

	getName();
});

function getName() {
	var name = prompt("What is your name?");

	if (name === "" || !name) {
		getName();
	} else {
		localStorage.setItem("user_name", name);
	}
}

$(window).resize(function() {
	resizeChat();
});

function resizeChat() {
	$(".container").height($(document).height() - 80);
	$(".chat-container").height($(".container").height() - 50)
}

function scrollBottom() {
	$(".chat-container").animate({
		scrollTop: $(".chat-container")[0].scrollHeight
	});
}

$(document).on("keyup", "#chat-input", function(event) {
	if (event.which === 13) {
		getMessage({
			name: localStorage.getItem("user_name"),
			message: $(this).val()
		});

		sendMessage({
			name: localStorage.getItem("user_name"),
			message: $(this).val()
		});

		$(this).val("");

		scrollBottom();
	}
});

function getMessage(messageInfo) {
	var html = '<div class="chat-item"><span class="bold">' + messageInfo.name + ':</span> <span>' + messageInfo.message + '</span></div>';
	$(".chat-container").append(html);
}