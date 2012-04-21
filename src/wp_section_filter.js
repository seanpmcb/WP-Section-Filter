var $sectionNavs,
    killAfter = 5000,
    timer,
    timeout,
    $hotTopicFader = $("<div id='hotTopicFader'></div>")
    $contentFader = $("<div id='contentFader'></div>")
    // TODO create regexs
    aRegexs = {
        "politics": new RegExp("\/politics\/"),
        "opinions": new RegExp("\/opinions\/"),
        "local": new RegExp("\/local\/"),
        "sports": new RegExp("\/sports\/"),
        "national": new RegExp("\/national\/"),
        "world": new RegExp("\/world\/"),
        "business": new RegExp("\/business\/"),
        "technology": new RegExp("\/technology\/"),
        "lifestyle": new RegExp("\/lifestyle\/"),
        "entertainment": new RegExp("\/entertainment\/"),
        "blogs": new RegExp("\/blogs\/"),
        //"photography": new RegExp("\/photography\/"),
        //"video": new RegExp("\/video\/"),
        //"more": new RegExp("\/politics\/")
    };

showMe();

if($sectionNavs.length === 0){
    timer = setInterval(showMe,250);
    timeout = setTimeout(killTimer,killAfter);
}

function showMe(){
    var selector = "#main-nav li.top";
    $sectionNavs = $(selector);
    if($sectionNavs.length >= 14){
        killTimer();    
        addShowMes();
    }
}

function killTimer(){
    timer && clearInterval(timer);
    timeout && clearTimeout(timeout);
}

function addShowMes(){
    $sectionNavs.each(function(){
        section = $(this).data("tracking-section");
        if ( aRegexs[section] ){
            $(this).find("a.top").after("<a class='showme' title='filter "+section+" only' href='javascript:;' data-section='"+section+"'>Show Me</a>");
        }
    });
}

$(document).ready(function(){
    $("#hot-topics-wrapper").append($hotTopicFader);
    $("#content").append($contentFader);
    $(document).on("click","a.showme",function(e){
        $(this).siblings("a.top").addClass("showing");
        $("a.reset").removeClass("reset showing").addClass("showme").html("Show Me")
        $(this).addClass("reset showing").removeClass("showme").html("Reset ");
        reg = aRegexs[$(this).data("section")];
        $hotTopicFader.addClass("fader");
        $contentFader.addClass("fader");
        $("#hot-topics-wrapper a").each(function(){
            if( reg.exec( $(this).attr("href") ) ){
                $(this).addClass("standout").removeClass("no-standout");
            } else {
                $(this).removeClass("standout").addClass("no-standout");
            }
        });
        $("#content a").each(function(){
            if( reg.exec( $(this).attr("href") ) ){
                $(this).addClass("standout").removeClass("no-standout");
            } else {
                $(this).removeClass("standout").addClass("no-standout");
            }
        });
    });
    $(document).on("click","a.reset",function(){
        $(this).siblings("a.top").removeClass("showing");
        $(this).removeClass("reset showing").addClass("showme").html("Show Me");
        $(".standout").removeClass("standout");
        $(".no-standout").removeClass("no-standout");
        $(".fader").removeClass("fader");
    });
});