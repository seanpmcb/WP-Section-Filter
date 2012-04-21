var $sectionNavs,
    killAfter = 5000,
    timer,
    timeout,
    // TODO create regexs
    aRegexs = {
        "politics": new RegExp("washingtonpost.com\/politics\/"),
        "opinions": new RegExp("washingtonpost.com\/opinions\/"),
        "local": new RegExp("washingtonpost.com\/local\/"),
        "sports": new RegExp("washingtonpost.com\/sports\/"),
        "national": new RegExp("washingtonpost.com\/national\/"),
        "world": new RegExp("washingtonpost.com\/world\/"),
        "business": new RegExp("washingtonpost.com\/business\/"),
        "technology": new RegExp("washingtonpost.com\/(business\/)?technology\/"),
        "lifestyle": new RegExp("washingtonpost.com\/lifestyle\/"),
        "entertainment": new RegExp("washingtonpost.com\/entertainment\/"),
        "blogs": new RegExp("washingtonpost.com\/blogs\/"),
        //"photography": new RegExp("washingtonpost.com\/politics\/"),
        //"video": new RegExp("washingtonpost.com\/politics\/"),
        //"more": new RegExp("washingtonpost.com\/politics\/")
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
            console.log($(this))
            $(this).find("a.top").after("<a class='showme' title='filter " + section + " only' href='javascript:;'>Show Me</a>");
        }
        // TODO: add links
    });
}