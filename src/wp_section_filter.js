var $sectionNavs,
    killAfter = 5000,
    timer,
    timeout,
    $hotTopicFader = $("<div id='hotTopicFader'></div>"),
    $contentFader = $("<div id='contentFader'></div>"),
    // Regexs to identify sections
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

/**
 * Add show me links to each section in the masthead
 */
function addShowMes(){
    $sectionNavs.each(function(){
        section = $(this).data("tracking-section");
        if ( aRegexs[section] ){
            $(this).find("a.top").after("<a class='showme' title='filter "+section+" only' href='javascript:;' data-section='"+section+"'>Show Me</a>");
        }
    });
}

$(document).ready(function(){
    // Get necessary link wrappers
    $("#hot-topics-wrapper").append($hotTopicFader);
    $("#content").append($contentFader);
    
    /**
     * Show me link clicked
     */
    $(document).on("click","a.showme",function(e){
        // Remove highlite of what was previously showing
        $("a.reset").siblings("a.top").removeClass("showing");
        $("a.reset").removeClass("reset showing").addClass("showme").html("Show Me");
        
        // Highlite what is currently showing
        $(this).siblings("a.top").addClass("showing");
        $(this).addClass("reset showing").removeClass("showme").html("Reset");
        
        // Get appropriate regex
        reg = aRegexs[$(this).data("section")];
        
        // Fade everything
        $hotTopicFader.addClass("fader");
        $contentFader.addClass("fader");
        
        // Cause links to standout or not
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
    
    /**
     * Reset link clicked
     */
    $(document).on("click","a.reset",function(){
        // Remove highlite on what's showing
        $(this).siblings("a.top").removeClass("showing");
        $(this).removeClass("reset showing").addClass("showme").html("Show Me");
        
        // Clear all out sections
        $(".standout").removeClass("standout");
        $(".no-standout").removeClass("no-standout");
        $(".fader").removeClass("fader");
    });
});