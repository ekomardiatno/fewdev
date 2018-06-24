/*var randomposts_number = 3;
var randomposts_chars = 110;
var randomposts_details = 1;
var randomposts_comments = 'Comments';
var randomposts_commentsd = 'Comments Disabled';
var randomposts_current = [];
var total_randomposts = 0;
var randomposts_current = new Array(randomposts_number);*/

function randomposts(json) {
    total_randomposts = json.feed.openSearch$totalResults.$t
}

$('.randp-wrapper').append('<script type=\"text/javascript\" src=\"/feeds/posts/default?alt=json-in-script&max-results=0&callback=randomposts\"><\/script>');

function getvalue() {
    for (var i = 0; i < randomposts_number; i++) {
        var found = false;
        var rndValue = get_random();
        for (var j = 0; j < randomposts_current.length; j++) {
            if (randomposts_current[j] == rndValue) {
                found = true;
                break
            }
        }
        if (found) {
            i--
        } else {
            randomposts_current[i] = rndValue
        }
    }
}

function get_random() {
    var ranNum = 1 + Math.round(Math.random() * (total_randomposts - 1));
    return ranNum
}

function random_posts(json) {
    for (var i = 0; i < randomposts_number; i++) {
        var entry = json.feed.entry[i];
        var randompoststitle = entry.title.$t;
        if ('content' in entry) {
            var randompostsnippet = entry.content.$t
        } else {
            if ('summary' in entry) {
                var randompostsnippet = entry.summary.$t
            } else {
                var randompostsnippet = "";
            }
        }
        randompostsnippet = randompostsnippet.replace(/<[^>]*>/g, "");
        if (randompostsnippet.length < randomposts_chars) {
            var randomposts_snippet = randompostsnippet
        } else {
            randompostsnippet = randompostsnippet.substring(0, randomposts_chars);
            var whitespace = randompostsnippet.lastIndexOf(" ");
            randomposts_snippet = randompostsnippet.substring(0, whitespace) + "&#133;";
        }
        for (var j = 0; j < entry.link.length; j++) {
            if ('thr$total' in entry) {
                var randomposts_commentsnum = entry.thr$total.$t + ' ' + randomposts_comments
            } else {
                randomposts_commentsnum = randomposts_commentsd
            }; if (entry.link[j].rel == 'alternate') {
                var randompostsurl = entry.link[j].href;
                var randomposts_date = entry.published.$t;
                if ('media$thumbnail' in entry) {
                    var randompoststhumb = entry.media$thumbnail.url
                } else {
                    randompoststhumb = "https://cdn.rawgit.com/ekomardiatno/fewdev/8a8395d7/assets/images/no-image-available.jpg"
                }
            }
        }
        if(randompoststitle.length >= 35){
            var rndpt = randompoststitle.substr(0,33)+' ...';
        }else{
            var rndpt = randompoststitle;
        }
        var r_thumbnail = '<img class="randp-thumbnail" alt="' + randompoststitle + '" title="' + randompoststitle + '" src="' + randompoststhumb.replace("/s72-c/","/w"+300+"-h"+250+"-c/") + '"/>', r_title = '<h2 class="randp-title">' + rndpt + '</h2>', r_detail = '', r_snippet = '<div class="random-summary">' + randomposts_snippet + '</div>', r_href = '<a href="' + randompostsurl + '" rel="nofollow"></a>';
        if (randomposts_details == 1) {
            var r_detail = '<div  class="randp-info"><span class="randp-date">' + randomposts_date.substring(8, 10) + '.' + randomposts_date.substring(5, 7) + '.' + randomposts_date.substring(0, 4) + '</span> - <span class="randp-comment">' + randomposts_commentsnum + '</span></div>'
        }
        $('.randp-wrapper').append('<div class="ct-randp">'+r_href+''+r_thumbnail+''+r_title+''+r_detail+'</div>');
    }
}
getvalue();
for (var i = 0; i < randomposts_number; i++) {
    $('.randp-wrapper').append('<script type=\"text/javascript\" src=\"/feeds/posts/default?alt=json-in-script&start-index=' + randomposts_current[i] + '&max-results=1&callback=random_posts\"><\/script>')
}