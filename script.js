console.clear();
var _data = JSON.parse(`{
    "lyrics": [
        {"line": "Put your head on my shoulder", "time": 10920},
        {"line": "Hold me in your arms, baby", "time": 17630},
        {"line": "Squeeze me oh-so-tight", "time": 24140},
        {"line": "Show me that you love me too", "time": 27460},
        {"line": "Put your lips next to mine, dear", "time": 37360},
        {"line": "Won't you kiss me once, baby?", "time": 44090},
        {"line": "Just a kiss goodnight, maybe", "time": 50450},
        {"line": "You and I will fall in love (you and I will fall in love)", "time": 56890},
        {"line": "People say that love's a game", "time": 65980},
        {"line": "A game you just can't win", "time": 72700},
        {"line": "If there's a way", "time": 75150},
        {"line": "I'll find it someday", "time": 78120},
        {"line": "And then this fool will rush in", "time": 82570},
        {"line": "Put your head on my shoulder", "time": 93070},
        {"line": "Whisper in my ear, baby", "time": 99590},
        {"line": "Words I want to hear, tell me", "time": 106100},
        {"line": "Tell me that you love me too (tell me that you love me too)", "time": 112550},
        {"line": "Put your head on my shoulder", "time": 119400},
        {"line": "Whisper in my ear, baby", "time": 125900},
        {"line": "Words I want to hear, baby", "time": 132780},
        {"line": "Put your head on my shoulder", "time": 139260}
    ]
}

`);
var currentLine = "";

function align() {
    var a = $(".highlighted").height();
    var c = $(".content").height();
    var d = $(".highlighted").offset().top - $(".highlighted").parent().offset().top;
    var e = d + (a / 2) - (c / 2);
    $(".content").animate({ scrollTop: e + "px" }, { easing: "swing", duration: 250 });
}

var lyricHeight = $(".lyrics").height();
$(window).on("resize", function() {
    if ($(".lyrics").height() != lyricHeight) { //Either width changes so that a line may take up or use less vertical space or the window height changes, 2 in 1
        lyricHeight = $(".lyrics").height();
        align();
    }
});

$(document).ready(function() {
    $("video").on('timeupdate', function(e) {
        var time = this.currentTime * 1000;
        var past = _data["lyrics"].filter(function(item) {
            return item.time < time;
        });
        if (_data["lyrics"][past.length] != currentLine) {
            currentLine = _data["lyrics"][past.length];
            $(".lyrics div").removeClass("highlighted");
            $(`.lyrics div:nth-child(${past.length})`).addClass("highlighted"); //Text might take up more lines, do before realigning
            align();
        }
    });
});

generate();

function generate() {
    var html = "";
    for (var i = 0; i < _data["lyrics"].length; i++) {
        html += "<div";
        if (i == 0) {
            html += ` class="highlighted"`;
            currentLine = 0;
        }
        if (_data["lyrics"][i]["note"]) {
            html += ` note="${_data["lyrics"][i]["note"]}"`;
        }
        html += ">";
        html += _data["lyrics"][i]["line"] == "" ? "•" : _data["lyrics"][i]["line"];
        html += "</div>"
    }
    $(".lyrics").html(html);
    align();
}