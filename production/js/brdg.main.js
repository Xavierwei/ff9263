/****************************************************
	Define brdg variables
****************************************************/
var monthShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var clickable = true;
var $width = $(window).width();
var current_item;
var current_day;
var loaded = 0;
var siteurl = "http://" + window.location.hostname + '/';
var imageWidth;
var perpage = 10;
var lastNid;
var transTimeout;
var datalist = new Array();
var datalistIndex = 0;
var submiting = true;
var isoTimeout;
var current_type = 0;
var animating = 1;
var preloadTimeout;
var itemsTimeout;
var $_node = $.Node();
var $_utility = $.BrdgUtility();
var loadedimg = 0;
var opend = 0;
var no3d = $('.no-csstransforms').length;
var current_cityid = null;
var xhr;
var STR_CITYLABEL = new Array('shanghai','paris','paris - shanghai');
var citylabel = 2;
var fireOnce = true;
var autoSlide;

/****************************************************
	Initialization
****************************************************/
brdgInit();

function brdgInit() {
    //Mobile version redirect
    if ($('html').hasClass('touch')) {
        window.location.href = "m";
        return false;
    }
    if ($_utility.getQueryString('screen') == 1)
    {
        $('.left_panel').hide().css('width',0);
        $('.vgrid').css('margin',0);
        $('body').css('overflow','hidden');
    }

    resizeWindow();
    $(window).bind('resize', resizeWindow);
    bindShortcutEvent();
    bindTextClockEvent();
    bindDcEventOnce();
    loadData('data/third_content/all_resources?perpage=' + perpage + "&page=0",1);
    setInterval(appendLatestItems, 1000 * 60 * 1);
    setInterval(removeUnpublishedContent, 1000 * 60 * 3);
    $('.vgrid').isotope({
        'resizable': false
    });
    $.address.externalChange(function (e) {
        if (!_.isEmpty(e.pathNames[0])) {
            loadSingleContent(e.pathNames[0], 1);
        }
    });
    
    //setPostion
    $('#dc3').css({
        'width': $(window).width() -$('#dc2').width()-$('#dc1').width()- 85
    });
     $('#dc3').css({
        'left': -$('#dc3').width()
    });
     $('#dc2').css({
        'left': -($('#dc3').width()+$('#dc2').width())
    });
    
   initInfinitescroll(siteurl+'data/third_content/all_resources?perpage=' + perpage + '&page=');
   
    $("body").queryLoader2({
        barColor: "#000",
        backgroundColor: "#000",
        percentage: true,
        barHeight: 1,
        completeAnimation: "fade",
        minimumTime: 100,
        onLoadComplete: loadComplete
    });
    
}



/****************************************************
	Define brdg functions
****************************************************/

/*
 * Fetach lastest items
 * @param data
 * JSON Object
 */
function removeUnpublishedContent() {
    $_node.getUnpublishedNodes(function (data) {
        for(i in data){
            var nid = data[i].nid;
            var _v_item = $('#media_'+nid);
            if(_v_item.length > 0)
            {
                _v_item.remove();
            }
        }
    });
}

/*
 * Remove unpublish content
 * @param data
 * JSON Object
 */
function appendLatestItems() {
    $_node.getPreNextNodes(lastNid, 20, current_type, null, 1, function (data) {
        if (data.next.length > 0) {
            lastNid = data.next[data.next.length - 1].nid;
            current_day = null;
            if ($('.vgrid').hasClass('isotope')) {
                $('.vgrid').isotope('destroy');
            }

            setTimeout(function () {
                renderItem(data.next, 'prepend');
                bindVgridEvent();
            }, 1000);
        }
    });
}

/*
 * Render vgrid item
 * @param data
 * JSON Object
 */
function renderItem(data, type) {
    for (var i in data) {
        if(!_.isEmpty(data[i]))
        {
            if (!lastNid) {
                lastNid = nid;
            }
            // Get unique id
            var nid = data[i].nid;
            // Get media type
            var media_type = data[i].source_type;
            // Get image
            var media_image = data[i].field_media_image;
            // Get video
            var media_video = data[i].field_video;
            if (media_video === null) media_video = new Array();
            // Get sound
            var media_sound = data[i].field_sound;
            if (media_sound === null) media_sound = new Array();
            // Get post date
            var media_date = data[i].post_date;
            // Get user city
            var user_city = data[i].field_user_city;
            if (_.isEmpty(user_city) || user_city === '1') {
                user_city = "Paris";
            }
            else
            {
                 user_city = "Shanghai";
            }


            // Parse datetime
            var str_media_date = media_date.replace(/-/g, "/");
            var date_media_date = new Date(str_media_date);
             if(data[i].field_user_city !== '0'){
                var parisTimeZone = 7;
                if (isBSTinEffect())
                    parisTimeZone = 6;
                date_media_date = new Date(date_media_date.getTime() - parisTimeZone * 60 * 60 * 1000);
            }
            media_date_year = date_media_date.getFullYear();
            media_date_month = date_media_date.getMonth() + 1;
            media_date_day = date_media_date.getDate();
            date_media_date = new Date(media_date_year,media_date_month-1,media_date_day);




            // Parse media type
            var media_source;
            if (media_type.toLowerCase() === 'instagram') {
                media_source = "instagram";
            }
            if (media_type.toLowerCase() === 'twitter tweets') {
                media_source = "twitter";
            }
            if (media_type.toLowerCase() === 'weibo') {
                media_source = "weibo";
            }

            if (media_sound.length > 0) {
                if (media_sound[0].indexOf('soundcloud') > 0 || media_sound.indexOf('soundcloud') > 0) {
                    media_source = "soundcloud";
                    media_image = data[i].field_sound_thumbnail;
                }
            }

            if (media_video.length > 0) {
                if (media_video[0].indexOf('youtu') > 0 || media_video.indexOf('youtu') > 0) {
                    media_source = "youtube";
                }

                if (media_video[0].indexOf('dailymotion') > 0 || media_video.indexOf('dailymotion') > 0) {
                    media_source = "dailymotion";
                }

                if (media_video[0].indexOf('vimeo') > 0 || media_video.indexOf('vimeo') > 0) {
                    media_source = "vimeo";
                }

                if (media_video[0].indexOf('youku') > 0 || media_video.indexOf('youku') > 0) {
                    media_source = "youku";
                }
                media_image = data[i].field_video_thumbnail;
            }

            var v_item = $('<div id="media_' + nid + '" class="v_item ' + media_source + '"><img  src="' + media_image + '"/><div class="item_info"><div class="city">' + user_city + '</div><div class="source"><div class="' + media_source + '"></div></div><div class="full_time">' + $_utility.formateNumber(media_date_day) + '/' + $_utility.formateNumber(media_date_month) + '/' + media_date_year + '</div></div><div class="item_icon"><div class="' + media_source + '"></div></div></div>');
            v_item.data('imgdata', {
                'nid': nid
            });

            var _daySpan = $('.date_span[rel = "' + date_media_date + '"]');
            // Render date cover


            var t = 0;
            if (_daySpan.length > 0) {
                if (type === 'prepend'){
                    t = 5000;
                     v_item.insertAfter(_daySpan);
               }
               else
               {
                   var next_item = _daySpan.nextAll('.v_item');
                    if(next_item.length > 0)
                    {
                        var _nextdaySpan = _daySpan.nextAll('.date_span');
                        if(_nextdaySpan.length > 0)
                        {
                            v_item.insertBefore(_nextdaySpan);
                        }
                        else
                        {
                            v_item.insertAfter(next_item.last());
                        }
                    }
                    else
                    {
                        v_item.insertAfter(_daySpan);
                    }
               }
            } else {
                var daySpan = $('<div class="date_span"><div class="full_time">' + $_utility.formateNumber(media_date_day) + '/' + $_utility.formateNumber(media_date_month) + '/' + $_utility.formateNumber(media_date_year) + '</div><div class="day">' + $_utility.formateNumber(media_date_day) + '</div><div class="city">'+STR_CITYLABEL[citylabel]+'</div></div>')
                if(date_media_date < new Date($('.date_span').eq(0).attr('rel'))){
                    daySpan.appendTo(".vgrid");
                }
                else
                {
                    daySpan.prependTo(".vgrid");
                }
                daySpan.css({
                    'width': imageWidth,
                    'height': imageWidth
                });
                //daySpan.delay(1000).fadeIn();
                daySpan.attr('rel', date_media_date);
                daySpan.find('.full_time').css({
                    'margin-top': (imageWidth - 109) / 2
                });
                v_item.insertAfter(daySpan);
            }
        }
        
    }

    var pageHeight = (Math.ceil($('.vgrid > *').length / (($width - 100) / imageWidth))) * imageWidth;
    $('.page').height(pageHeight);
    
    setTimeout(loadingCover, t);
    loadingCover();


}

function loadingCover() {
    timeSpanAnimate();
    if ($('.vgrid').hasClass('isotope')) {
        $('.vgrid .v_item,.vgrid .date_span').css({
            '-webkit-transition-duration': '0',
            '-moz-transition-duration': '0'
        });
        $('.vgrid').isotope('destroy');
    }
    if (loadedimg === 0) {
        var v_item_imgs = $('.vgrid .v_item:not(.opened)').find('img');
        v_item_imgs.each(function () {
            $(this).ensureLoad(function () {
                loadedimg++;
                if (loadedimg === perpage / 1.5) {
                    setTimeout(itemAnimate,2000);
                    clearTimeout(preloadTimeout);
                }
            });
        });
        preloadTimeout = setTimeout(function () {
            itemAnimate();
            clearTimeout(preloadTimeout);
        }, 10000);
    } else {
        setTimeout(itemAnimate, 1500);
    }
}

/*
 * Photowall display animation
 */
function timeSpanAnimate() {
    animating = 1;
    var items = $('.date_span');
    var i = 0;
    items.each(function () {
        var _c = $(this);
        if (!_c.hasClass('opened')) {
            _c.css({
                'display': 'none',
                'rotateY': '-90deg',
                'opacity': 0,
                'width': imageWidth,
                'height': imageWidth
            });
            
            setTimeout(function () {
                _c.addClass('opened');
                _c.removeClass('close');
                _c.css({
                    'display': 'block'
                });
                _c.transition({
                    perspective: '9000px',
                    rotateY: '0deg',
                    opacity: 1
                }, 1200, 'easeOutQuart');
            }, (i * (500 || 0)));
            i++;
        }
    });

}

/*
 * Photowall display animation
 */
function itemAnimate() {
    animating = 1;
    var items = $('.v_item:not(.opened)');
    var i = 0;
    items.each(function () {
        var _c = $(this);
        if (!_c.hasClass('opened')) {
            _c.css({
                'display': 'none',
                'width': 0,
                'height': imageWidth
            });
            _c.find('img').css({
                'width': 0,
                'rotateY': '-90deg',
                'opacity': 0,
                'height': imageWidth
            });
            _c.find('.item_icon').hide();
            _c.find('.item_info .city').css({
                'margin-top': (imageWidth - 88) / 2
            });
            itemsTimeout = setTimeout(function () {
                _c.addClass('opened');
                _c.removeClass('close');
                _c.css({
                    'display': 'block'
                });
                _c.animate({
                    'width': imageWidth
                },400);
                _c.clearQueue().delay(200).find('img').animate({
                    'width': _c.height()
                }, 10);
                _c.clearQueue().delay(200).find('img').transition({
                    perspective: '500px',
                    rotateY: '0deg',
                    opacity: 1
                }, 1000, 'easeInOutQuart');
                _c.clearQueue().find('.item_icon').delay(350).fadeIn(800);
                
            }, (i * (400 || 0)));
            i++;
        }
    });

    clearTimeout(isoTimeout);
    isoTimeout = setTimeout(function () {
        animating = 0;
    }, (i) * 200 + 4000);
}

/*
 * Load photo wall
 * @param url
 * The ajax request url
 */
function loadData(url,isLoadDate) {
    // Destory exsit content
    clearTimeout(itemsTimeout);
    //$('.vgrid div').fadeOut(500);
    setTimeout(function(){
        $('.vgrid').empty();
        $('.loading2').fadeIn();
        if(xhr != undefined)
        {
            xhr.abort();
        }
        xhr = $_node.loadPhotowall(url, function (data) {
            loaded = 1;
            loadComplete();
            renderItem(data,'pend');
            $('.loading2').fadeOut();
            bindVgridEvent();
            if($_utility.getQueryString('slideshow') == 1)
            {
                $('.v_item').eq(0).click();
                autoSlide = setInterval(function(){
                    $('.nav_arrow_right').click();
                },10000);
            }
            $('.category_overlay').fadeOut();
            xhr = undefined;
        });
    },500);
    
}

/*
 * Load Single Content
 * @param media_data
 * Media Date, It's Object type
 * @param face
 * Cube face
 */
function loadSingleContent(nid, isOpen) {
    clickable = false;
    $('.loading2').fadeIn();
    var _currentDatalistIndex = datalistIndex;
    $_node.getPreNextNodes(nid, 10, current_type, current_cityid, 0, function (data) {
        clickable = true;
        $('.loading2').fadeOut();
        datalist.length = 0; //empty array
        data.next.reverse();
        for (var d in data.next) {
            if(!isNaN(parseInt(d)))
            { 
                datalist.push(data.next[d]);
            }
        }
        datalist.push(data.current);
        for (var d in data.pre) {
            if(!isNaN(parseInt(d)))
            {
                datalist.push(data.pre[d]);
            }
        }
        var _indexOffset = datalistIndex - _currentDatalistIndex;
        datalistIndex = data.next.length + _indexOffset;
        for (var d in datalist) {
            if(!isNaN(parseInt(d)))
            {
                var url = datalist[d].field_media_image;
                var img = new Image();
                img.src = url;
            }
        }
        if (isOpen) {
            openBigImage(datalist[datalistIndex]);
        }
    });
}


/*
 * Open Image Animation
 * @param media_data
 * Media Date, It's Object type
 * @param face
 * Cube face
 */
function openBigImage(media_data) {
    if(opend==1)
        return false;
    opend = 1;
    $('.vgrid .v_item').unbind('click');
    $('.dc3_wrap').eq(0).hide();
    $('.dc3_wrap').eq(2).hide();
    $('#dc1').css({
        'display': 'block',
        'left': -200
    });
    $('.dc1_face').css({background:'#777'});
    $('#dc2').css({
        'display': 'block'
    });
    $('#dc3').css({
        'display': 'block'
    });
    $('body').css({
        'overflow': 'hidden'
    });
    setTimeout(function () {
        var dc3_left = $('#dc1').width() + $('#dc2').width();
        var dc2_left = $('#dc1').width();
        $('#dc3').addClass('opened');      
        $('#dc3').css('left', dc3_left);  
        $('#dc2').css('left', dc2_left);
        $('.left_panel').animate({'left': $width},800,'easeInOutQuart');
        $('.vgrid').animate({'margin-left': $width + 100},800,'easeInOutQuart');
        $('#dc2').addClass('opened');
    }, 100);
//    setTimeout(function () {
//    }, 300);
    setTimeout(function () {
        $('#dc1').addClass('opened').css({left:0});
    }, 350);
    setTimeout(function () {
        $('.dc1_face').css({background:'#000'});
    }, 550);
    $('.dc3_wrap').html('').removeData("fillmore");
    $('.dc3_wrap').show();
    $.address.path(media_data.nid);
    $('.input_nid').val(media_data.nid);
    $('#dc2 .avator img').attr('src','');
    // render current data
    renderMediaContent(media_data, 1);
    // rendernext data
    setTimeout(function(){
    if (datalistIndex < datalist.length)
        renderMediaContent(datalist[datalistIndex + 1], 2);
    // render prev data
    if (datalistIndex > 0)
        renderMediaContent(datalist[datalistIndex - 1], 4);
    $('#dc3_arrow').css({
        'opacity': 0.5,
        'display': 'block'
    });
    },2000);
    bindNodeEvent();
}

/*
 * Render Media Content
 * @param media_data
 * Media Date, It's Object type
 * @param face
 * @param noimg: only load text
 * Cube face
 */
function renderMediaContent(media_data, face, noimg) {
    var imgIndex = face;
    if (face === 4) {
        imgIndex = 0;
    }
    var user_url;
    // Parse media type
    if(media_data == undefined){
        return false;
    }
    media_data.media_source;
    if (media_data.source_type.toLowerCase() === 'instagram') {
        media_data.media_source = "instagram";
    }

    if (media_data.source_type.toLowerCase() === 'soundcloud') {
        media_data.media_source = "soundcloud";
    }

    if (!_.isEmpty(media_data.field_sound)) {
        if (media_data.field_sound.indexOf('soundcloud') > 0) {
            media_data.media_source = "soundcloud";
        }
    }

    if (!_.isEmpty(media_data.field_video)) {
        if (media_data.field_video.indexOf('youtu') > 0) {
            media_data.media_source = "youtube";
        }
        if (media_data.field_video.indexOf('youku') > 0) {
            media_data.media_source = "youku";
        }
        if (media_data.field_video.indexOf('vimeo') > 0) {
            media_data.media_source = "vimeo";
        }
        if (media_data.field_video.indexOf('dailymotion') > 0) {
            media_data.media_source = "dailymotion";
        }
        if (media_data.field_video.indexOf('vine') > 0) {
            media_data.media_source = "vine";
        }
    }

    // Parse Date
    var str_media_date = media_data.post_date.replace(/-/g, "/");
    var date_media_date = new Date(str_media_date);
    if(media_data.field_user_city !== '0'){
        var parisTimeZone = 7;
        if (isBSTinEffect())
            parisTimeZone = 6;
        date_media_date = new Date(date_media_date.getTime() - parisTimeZone * 60 * 60 * 1000);
    }
    // Covert Timezone
    
    var media_date_year = date_media_date.getFullYear();
    var media_date_month = date_media_date.getMonth() + 1;
    var media_date_day = date_media_date.getDate();
    var media_date_hrs = date_media_date.getHours();
    var media_date_min = date_media_date.getMinutes();
    var bigImage = media_data.field_media_image;
    var p_url = siteurl + "/#/" + media_data.nid;
    var city;
    if(media_data.field_user_city == '1')
    {
        city = 'Paris';
    }
    else
    {
        city = 'Shanghai';
    }

    if (media_data.media_source === 'instagram') {
        user_url = "http://instagram.com/" + media_data.field_user_name;
    }
    else if(media_data.source_type.toLowerCase() === 'twitter tweets')
    {
        user_url = "http://twitter.com/" + media_data.field_user_name;
    }
    else if(media_data.source_type.toLowerCase() === 'weibo')
    {
        user_url = "http://s.weibo.com/weibo/" + media_data.field_user_name;
    }
    
    if (media_data.field_anonymous_flaged === null) {
        media_data.field_anonymous_flaged = 0;
    }
    var like_counts = parseInt(media_data.field_anonymous_flaged);
    if (!noimg) {
        // Render content
        $('.dc3_wrap').eq(imgIndex).html('');
        if (media_data.media_source === 'youtube') {
            var url = media_data.field_video.split('=');
            var videourl;
            if(_.isEmpty(url[1]))
            {
                url = media_data.field_video.split('/');
                videourl = url[3];
            }
            else
            {
                videourl = url[1];
            }
            $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="90%" style="margin-top:5%;" src="youtube/video.php?q=' + videourl + '" frameborder="0" allowfullscreen></iframe>');
        } else if (media_data.media_source === 'vimeo') {
            $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="90%" style="margin-top:5%;" src="' + media_data.field_video.replace('vimeo.com', 'player.vimeo.com/video') + '" frameborder="0" allowfullscreen></iframe>');
        } else if (media_data.media_source === 'youku') {
            var url = media_data.field_video.split('id_');
            url = url[1].split('.html');
            $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="90%" style="margin-top:5%;" src="http://player.youku.com/embed/' + url[0] + '" frameborder="0" allowfullscreen></iframe>');
        } else if (media_data.media_source === 'dailymotion') {
            var url = media_data.field_video.split('video/');
            url = url[1].split('_');
            url = url[0];
            url = "http://www.dailymotion.com/embed/video/" + url;
            $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="90%" style="margin-top:5%;" src="' + url + '" frameborder="0" allowfullscreen></iframe>');
        } else if (media_data.media_source === 'soundcloud') {
            var url = media_data.field_sound;
            $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="166" scrolling="no" frameborder="no" class="soundcloud-iframe" src="soundcloud/soundcloud.php?q=' + encodeURIComponent(url) + '"></iframe>');
            var height = ($(window).height() - 166) / 2;
            $('.dc3_wrap').eq(imgIndex).find('.soundcloud-iframe').css({
                'margin-top': height
            });
            // show the soundcloud thumbnail in the next slider
            if (face === 2) {
                $('.dc3_wrap').eq(imgIndex).find('.soundcloud-iframe').hide();
                $('.dc3_wrap').eq(imgIndex).fillmore({
                    src: bigImage
                });
            }
        } else if (media_data.media_source === 'vine') {
            var url = media_data.field_video.split('/v/');
            $('.dc3_wrap').eq(imgIndex).html('<iframe src="vine/vine_resize.php?q='+url[1]+'&w='+ $('#dc3').width() +'" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>');
        }
        else if (media_data.media_source === 'instagram' && !_.isEmpty(media_data.field_video) && navigator.userAgent.toLowerCase().match(/webkit/i)) {
            $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="100%" scrolling="no" frameborder="no" src="instagram/video.php?u=' + media_data.field_video + '&w='+ $('#dc3').width()+'" frameborder="0" allowfullscreen></iframe>');
        }
        else {
            $('.dc3_wrap').eq(imgIndex).removeData('fillmore');
            $('.dc3_wrap').eq(imgIndex).fillmore({
                src: bigImage
            });
        }
        var fillmoreInner = $('.dc3_wrap').eq(imgIndex).find('.fillmoreInner').hide();
        if(fillmoreInner.length>0)
        {
            var img = new Image();
            img.src = bigImage;
            $(img).ensureLoad(function(){
                fillmoreInner.fadeIn(800);
            });
        }

    }

    $('.dc2_bigcube_face' + face + ' .avator img').attr('src', media_data.field_user_profile_image);
    $('.dc2_bigcube_face' + face + ' .username').html('<a target="_blank" href="' + user_url + '">' + media_data.field_user_name + '</a>');
    $('.dc2_bigcube_face' + face + ' input[name="nid"]').val(media_data.nid);
    $('.dc2_bigcube_face' + face + ' .like_counts').attr('data-counts', like_counts).html(like_counts);
    $('.dc1_face' + face + ' .city').html(city);
    $('.dc1_face' + face + ' .day').html(media_date_day);
    $('.dc1_face' + face + ' .date').html($_utility.formateNumber(media_date_day) + '/' + $_utility.formateNumber(media_date_month) + '/' + media_date_year);
    $('.dc1_face' + face + ' .time_clock').attr('data-hrs', media_date_hrs);
    $('.dc1_face' + face + ' .time_clock').attr('data-min', media_date_min);
    $('.dc1_face' + face + ' .time_text').html($_utility.formateNumber(media_date_hrs) + 'H' + $_utility.formateNumber(media_date_min));
    $('.dc1_face' + face + ' .time_clock').brdgClock();
    $('.dc1_face' + face + ' .source').html('').append('<div></div>');
    $('.dc1_face' + face + ' .source div').addClass(media_data.source_type.toLowerCase());

    // get tags
    var re = /#[^ ]*/gi;
    while(r = re.exec($_utility.clearHtmlTag(media_data.field_body))) {
      var tags = $('.dc1_face' + face + ' .source div').text();
      $('.dc1_face' + face + ' .source div').text(tags + " " + r[0]);
    }  
    $('.dc2_bigcube_face' + face + ' .body').html($_utility.replaceURLWithHTMLLinks(media_data.field_body.replace(re, '')));

    var domainbigImage = bigImage.replace('64.207.184.106', 'www.polyardshanghai.com'); //only for testing, beacuse facebook need real domain.
    var share_facebook = "http://www.facebook.com/sharer/sharer.php?s=100&p[title]=" + encodeURIComponent(media_data.field_body) + "&p[summary]=" + encodeURIComponent(media_data.field_body) + "&p[url]=" + encodeURIComponent(p_url) + "&p[images][0]=" + encodeURIComponent(domainbigImage);
    var share_google = "https://plusone.google.com/_/+1/confirm?hl=en&url=" + encodeURIComponent(p_url);
    var share_twitter = "http://twitter.com/share?text=" + encodeURIComponent(media_data.field_body) + "&url=" + encodeURIComponent(p_url) + "&img=" + encodeURIComponent(domainbigImage);
    var share_weibo = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(media_data.field_body) + "&pic=" + encodeURIComponent(domainbigImage) + "&url=" + encodeURIComponent(p_url);
    var share_pinterest = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(p_url) + "&media=" + encodeURIComponent(domainbigImage) + "&description=" + encodeURIComponent(media_data.field_body);
    var share_huaban = "http://huaban.com/bookmarklet/?url=" + encodeURIComponent(p_url) + "&media=" + encodeURIComponent(domainbigImage);

    // Render Sharing Buttons
    $('.dc2_bigcube_face' + face + ' .facebook').attr('href', share_facebook);
    $('.dc2_bigcube_face' + face + ' .google').attr('href', share_google);
    $('.dc2_bigcube_face' + face + ' .twitter').attr('href', share_twitter);
    $('.dc2_bigcube_face' + face + ' .weibo').attr('href', share_weibo);
    $('.dc2_bigcube_face' + face + ' .pinterest').attr('href', share_pinterest);
    $('.dc2_bigcube_face' + face + ' .huaban').attr('href', share_huaban);
    clickable = true;
}


function moveDc1(face) {
    var new_dc1_cube = $('<div />', {
        'class': 'dc1_cube'
    }).hide().appendTo('#dc1');
    var face1 = $('<div />', {
        'class': 'dc1_face1 dc1_face'
    }).appendTo(new_dc1_cube);
    var face2 = $('<div />', {
        'class': 'dc1_face2 dc1_face'
    }).appendTo(new_dc1_cube);
    var face4 = $('<div />', {
        'class': 'dc1_face4 dc1_face'
    }).appendTo(new_dc1_cube);
    face1.html($('.dc1_cube .dc1_face' + face).html());
    face2.html($('.dc1_cube .dc1_face' + face).html());
    face4.html($('.dc1_cube .dc1_face' + face).html());
    $('.dc1_cube .dc1_face1').css({'background':'#000'});
    var zWidth = $('#dc1').width();
    new_dc1_cube.transition({
        z: -zWidth / 2,
        rotateY: 0
    }, 0);
    new_dc1_cube.show();
    $('.dc1_cube').eq(0).remove();
    $('.dc1_face1 .time_clock').brdgClock();
    //$_utility.updateDay(date);
}

function moveDc2(face) {
    var new_dc2_cube = $('<div />', {
        'class': 'dc2_bigcube'
    }).hide().appendTo('#dc2');
    var face1 = $('<div />', {
        'class': 'dc2_bigcube_face1 dc2_bigcube_face'
    }).appendTo(new_dc2_cube);
    var face2 = $('<div />', {
        'class': 'dc2_bigcube_face2 dc2_bigcube_face'
    }).appendTo(new_dc2_cube);
    var face4 = $('<div />', {
        'class': 'dc2_bigcube_face4 dc2_bigcube_face'
    }).appendTo(new_dc2_cube);
    face1.html($('.dc2_bigcube .dc2_bigcube_face' + face).html());
    face2.html($('.dc2_bigcube .dc2_bigcube_face' + face).html());
    face4.html($('.dc2_bigcube .dc2_bigcube_face' + face).html());
    new_dc2_cube.transition({
        z: -195,
        rotateY: 0
    }, 0);
    new_dc2_cube.show();
    $('.dc2_bigcube').eq(0).remove();
    $('#dc2 .btn_close').css({
        'background-position': '0 0'
    }).spriteOnHover({
        fps: 20,
        orientation: 'vertical',
        width: 100,
        height: 100
    });
    bindNodeEvent();
    var date = $('.dc1_face1 .day').html();
    //$_utility.updateDay(date);
}


function bindVgridEvent() {
    var duration = 300;
    if($('.csstransforms3d').length == 0)
    {
        duration = 200;
    }
    $('.v_item').hoverIntent(function () {
        $(this).find('.item_info').fadeIn(duration);
    }, function () {
        $(this).find('.item_info').fadeOut(duration);
    }, 200);
    $('.vgrid .v_item').unbind('click');
    $('.vgrid .v_item').bind('click', function () {
        current_item = $(this);
        //current data
        var media_data = $(this).data('imgdata');
        loadSingleContent(media_data.nid, 1);
        return false;
    });
}


function bindDcEventOnce() {
    $('.category li,.logo,.city_time').unbind('click');
    $('.logo').click(function () {
        $('.category a').removeClass('actived');
        $('.city_time').removeClass('actived');
        $('.category a').eq(0).addClass('actived');
        current_day = null;
        current_type = 0;
        current_cityid = null;
        citylabel = 2;
        openCategoryOverlay();
        loadData('data/third_content/all_resources?page=0',1);
    });
    $('.category li').eq(0).click(function () {
        $('.category a').removeClass('actived');
        $('.city_time').removeClass('actived');
        $('a', this).addClass('actived');
        current_day = null;
        current_type = 0;
        citylabel = 2;
        openCategoryOverlay();
        loadData('data/third_content/all_resources?perpage=' + perpage + '&page=0',1);
        initInfinitescroll(siteurl + 'data/third_content/all_resources?perpage='+ perpage +'&page=');
    });
    //filter picture
    $('.category li').eq(1).click(function () {
        $('.category a').removeClass('actived');
        $('.city_time').removeClass('actived');
        $('a', this).addClass('actived');
        current_day = null;
        current_type = 1;
        current_cityid = null;
        citylabel = 2;
        openCategoryOverlay();
        loadData('data/third_content/services_picture?perpage=' + perpage + '&page=0',1);
        initInfinitescroll(siteurl + 'data/third_content/services_picture?perpage=' + perpage + '&page=');
    });

    //filter videos
    $('.category li').eq(2).click(function () {
        $('.category a').removeClass('actived');
        $('.city_time').removeClass('actived');
        $('a', this).addClass('actived');
        current_day = null;
        current_type = 3;
        current_cityid = null;
        citylabel = 2;
        openCategoryOverlay();
        loadData('data/third_content/services_video?perpage=' + perpage + '&page=0');
        initInfinitescroll(siteurl + 'data/third_content/services_video?perpage=' + perpage + '&page=');
    });
    //filter music
    $('.category li').eq(3).click(function () {
        $('.category a').removeClass('actived');
        $('.city_time').removeClass('actived');
        $('a', this).addClass('actived');
        current_day = null;
        current_type = 2;
        current_cityid = null;
        citylabel = 2;
        openCategoryOverlay();
        loadData('data/third_content/services_sould?perpage=' + perpage + '&page=0');
        initInfinitescroll(siteurl + 'data/third_content/services_sould?perpage=' + perpage + '&page=');
    });

    $('.city_time').click(function () {
        var cityid = $(this).attr('data-city');
        $('.category a').removeClass('actived');
        $('.city_time').removeClass('actived');
        $(this).addClass('actived');
        current_day = null;
        current_cityid = parseInt(cityid);
        citylabel = current_cityid;
        openCategoryOverlay();
        loadData('data/third_content/all_resources?perpage=' + perpage + '&page=0&city_id=' + cityid);
        initInfinitescroll(siteurl + 'data/third_content/all_resources?perpage=' + perpage + '&city_id=' + cityid + '&page=');
    });
}

function openCategoryOverlay(){
    $('.category_overlay').fadeIn();
}


function bindNodeEvent() {
    var nid = $('.input_nid').eq(0).val();
    $('#dc1 .back').unbind('click');
    $('#dc1 .back').bind('click', function (e) {
        clearInterval(autoSlide);
        opend = 0;
        e.stopImmediatePropagation();
        $('.dc3_wrap').eq(0).hide();
        $('.dc3_wrap').eq(2).hide();
        setTimeout(function () {
             $('#dc3').css({
                'left': -$('#dc3').width()
            });
             $('#dc2').css({
                'left': -($('#dc3').width()+$('#dc2').width())
            });


            var left_panel_width = $('.left_panel').width();
            $('.left_panel').animate({'left': 0},800,'easeInOutQuart');
            $('.vgrid').animate({'margin-left':left_panel_width},800,'easeInOutQuart',function(){
                setTimeout(bindVgridEvent,500);
            });
            $('#dc3 iframe').remove();
            $('#dc3_arrow').hide();
        }, 500);
        setTimeout(function () {
             $('#dc1').css('left', -300);
            $('.dc1_face').css({background:'#777'});
            $('#dc1').removeClass('opened');
        }, 500);
            
        setTimeout(function () {
            $('#dc1').css({
                'display': 'none'
            });
            $('#dc2').css({
                'display': 'none'
            });
            $('#dc3').css({
                'display': 'none'
            });
            $('#dc2').removeClass('opened');
            $('#dc3').removeClass('opened');
        }, 2000);
        if($_utility.getQueryString('screen') != 1)
        {
            $('body').css({
                'overflow': 'visible'
            });
        }
        $.address.path('#');
    });

    $('.nav_arrow_right').unbind('click');
    $('.nav_arrow_right').bind('click', function (e) {
        e.stopImmediatePropagation();
        goRight();
    });


    $('.nav_arrow_left').unbind('click');
    $('.nav_arrow_left').bind('click', function (e) {
        e.stopImmediatePropagation();
        goLeft();
    });


    $('.btn_share').unbind('click');
    $('.dc2_bigcube_face1 .btn_share').bind('click', function () {
        $('.btn_comments').removeClass('actived');
        if(no3d)
        {
            $('.comments_box').hide();
            $('.icons_share').show();
        }

        $(this).addClass('actived');
        $('.dc2_cube').addClass('show_share');
        var top = $(window).height() - 100;
        if (top > 0)
            $('.dc2_bigcube_face1 .dc2_section1').delay(300).stop(false, false).animate({
                'margin-top': -top
            }, 800, 'easeInOutQuart');
        $('.dc2_bigcube_face1 .dc2_header').delay(500).stop(false, false).animate({
            'margin-left': -100
        }, 800, 'easeInOutQuart');
    });

    $('.btn_comments').unbind('click');
    $('.dc2_bigcube_face1 .btn_comments').bind('click', function () {
        $('.btn_share').removeClass('actived');
        if(no3d)
        {
            $('.icons_share').hide();
            $('.comments_box').show();
        }
        $(this).addClass('actived');
        $('.dc2_cube').removeClass('show_share');
        var top = $(window).height() - 100;
        if (top > 0)
            $('.dc2_bigcube_face1 .dc2_section1').delay(300).stop(false, false).animate({
                'margin-top': -top
            },800,'easeInOutQuart');
        $('.dc2_bigcube_face1 .dc2_header').delay(500).stop(false, false).animate({
            'margin-left': -100
        }, 800, 'easeInOutQuart');
    });


    $('#dc2 .dc2_bigcube_face1 .btn_close').spriteOnHover({
        fps: 24,
        orientation: 'vertical',
        width: 100,
        height: 100
    });

    $('#dc2 .dc2_bigcube_face1 .btn_close').unbind('click');
    $('#dc2 .dc2_bigcube_face1 .btn_close').bind('click', function () {
        $('.dc2_bigcube_face1 .dc2_header').stop(false, false).animate({
            'margin-left': 0
        }, 800, 'easeInOutQuart');
        $('.dc2_bigcube_face1 .dc2_section1').delay(100).stop(false, false).animate({
            'margin-top': 0
        }, 800, 'easeInOutQuart');
        $('.dc2_bigcube_face1 .dc2_header div').removeClass('actived');
    });

    $('#dc3_arrow').unbind('hover');
    $('.dc3_wrap').eq(2).css({
        opacity: 0.3
    });
    $('#dc3_arrow').hover(function () {
        $('.dc3_wrap').eq(2).clearQueue().animate({
            opacity: 1
        });
    }, function () {
        $('.dc3_wrap').eq(2).clearQueue().animate({
            opacity: 0.3
        });
    });

    $('#dc3_arrow').unbind('click');
    $('#dc3_arrow').bind('click', function () {
        $('.nav_arrow_right').eq(0).click();
    });

    $('#dc1 .nav_arrow_right').css({
        'background-position': '0'
    }).spriteOnHover({
        fps: 20,
        orientation: 'vertical',
        width: 98,
        height: 98
    });
    $('#dc1 .nav_arrow_left').css({
        'background-position': '0'
    }).spriteOnHover({
        fps: 20,
        orientation: 'vertical',
        width: 98,
        height: 98
    });
    $('#dc1 .back').css({
        'background-position': '0 0'
    }).spriteOnHover({
        fps: 20,
        orientation: 'vertical',
        width: 199,
        height: 98
    });

    // Submit comments
    $(".dc2_bigcube_face1 .comment_form").validate({
        rules: {
            email: {
                required: true
            },
            comment: "required"
        },
        messages: {
            email: "Please enter your pseudo",
            comment: "Please leave comments"
        },
        submitHandler: function (form) {
            if (submiting) {
                submiting = false;
                $(form).find('.button_input').attr('disabled', 'disabled');
                $.Comment().submitComment($(form), function (data) {
                    if (data.cid) {
                        $(form).find('.loading').fadeOut(200);
                        $(form).find('.button_input').delay(200).fadeIn(200, function () {
                            _loadComment();
                            $(this).after('<span>Your comment is now posted</span>');
                        });
                        submiting = true;
                    }
                }, function (e) {
                    $(form).find('.loading').fadeOut(200);
                    $(form).find('.button_input').delay(200).fadeIn(200, function () {
                        $(this).after('<span>' + e.statusText + '</span>');
                    }).removeAttr('disabled');
                    submiting = true;
                });

                $(form).find('.form_item_submit span').remove();
                $(form).find('.button_input').fadeOut(200);
                $(form).find('.loading').delay(200).fadeIn(200);
                return false;
            }
            return false;
        }
    });

    // Load comments
    var _loadComment = function(){$.Comment(nid).loadComment(function (data) {
            var comments_wrap = $('.dc2_bigcube_face1 .comments_list').empty().fadeOut();
            $('.comments_list_wrap').hide();
            for (var c in data) {
                var date_media_date = new Date(parseInt(data[c].field_post_date + '000'));
                var media_date_year = date_media_date.getFullYear();
                var media_date_month = date_media_date.getMonth();
                var media_date_day = date_media_date.getDate();
                var name = data[c].field_email.split('@');
                comments_wrap.append('<div class="comment_item"><div class="comment_title"><span class="name">' + name[0] + '</span><span class="date">' + media_date_day + " " + monthShortName[media_date_month] + ", " + media_date_year + '</span></div><div class="comment_body">' + data[c].field_comment + '</div></div>');
            }
            if(data.length>0)
            {
                $('.comments_list_wrap').fadeIn();
                comments_wrap.fadeIn(function(){
                    var comment_max_height = $(window).height()-390;
                    var comments_list_height = comments_wrap.height();
                    if(comments_list_height > comment_max_height) comments_list_height = comment_max_height;
                    comments_wrap.css('height',comments_list_height+20);
                    comments_wrap.jScrollPane({autoReinitialise:true});
                });
            }

        });
    }
    _loadComment();

    // Ajax submit comments content
    $('.btn_like').unbind('click');
    var liking = 0;
    $('.dc2_bigcube_face1 .btn_like').bind('click', function () {
        _this = $(this);
        liking = 1;
        $.Like(nid).likeit(function (data) {
            var count_wrap = _this.find('.like_counts');
            if (!_.isEmpty(data)) {
                $.cookie('like_' + nid, 1);
            }
            count_wrap.attr('data-counts', data.count);
            datalist[datalistIndex].field_anonymous_flaged=data.count;
            count_wrap.animate({
                'opacity': 0
            }, function () {
                _this.find('.like_counts').html(data.count);
                _this.find('.like_icon').transition({
                    perspective: '9000px',
                    rotateY: '180deg',
                    opacity: 1
                }, 700);
                $(this).animate({
                    'opacity': 1
                },function(){
                    liking = 0;
                });
            });
        });
    });
    
    $('.dc2_bigcube_face1 .btn_like').hover(function(){
        if(!liking)
        {
            var count_wrap = $(this).find('.like_counts');
            count_wrap.fadeOut(
                function(){
                    count_wrap.html("+");
                    $(this).fadeIn();
                }
            );
        }

    },function(){

        var count_wrap = $(this).find('.like_counts');
        var count = parseInt(count_wrap.attr('data-counts'));
        count_wrap.fadeOut(
            function(){
                count_wrap.html(count);
                $(this).fadeIn();
            }
        );

    });

}

// Photo go left

function goLeft() {
    if (clickable) {
        clickable = false;
        datalistIndex--;
        if (datalistIndex < 0) {
            datalistIndex = 0;
            clickable = true;
            return false;
        }
        _item = datalist[datalistIndex];
        $.address.path(_item.nid);
        $('.input_nid').val(_item.nid);
        var rotateY = parseInt($('.dc1_cube').css('rotateY'));
        rotateY += 90;
        var zWidth = $('#dc1').width();
        $('.dc1_cube').transition({
            z: -zWidth / 2,
            rotateY: rotateY
        }, 800);

        $('.dc2_bigcube').transition({
            z: -195,
            rotateY: rotateY
        }, 800);

        $dc3 = $('#dc3');
        $('.dc1_face').css({
            'background-color': '#000'
        });
        $('.dc2_bigcube_face').css({
            'background-color': '#000'
        });
        $dc3.find('.dc3_wrap').eq(0).before('<div class="dc3_wrap" style="left: -' + $dc3.width() + 'px;"></div>');
        $dc3.find('.dc3_wrap').eq(0).css({
            'opacity': 0
        });
        $dc3.find('.dc3_wrap').eq(0).clearQueue().animate({
            'left': -$dc3.width(),
            'opacity': 0.3
        }, 1000, 'easeInOutQuint');
        $dc3.find('.dc3_wrap').eq(1).clearQueue().animate({
            'left': 0,
            'opacity': 1
        }, 1000, 'easeInOutQuint');
        $dc3.find('.dc3_wrap').eq(2).clearQueue().animate({
            'left': $dc3.width(),
            'opacity': 0.3
        }, 1000, 'easeInOutQuint');
        $dc3.find('.dc3_wrap').eq(3).clearQueue().animate({
            'left': $dc3.width() * 2,
            'opacity': 0.3
        }, 1000, 'easeInOutQuint');
        $dc3.find('.dc3_wrap').eq(3).remove();
        //stop video in iframe
        $('.dc3_wrap iframe').each(function () {
            $(this).attr('src', $(this).attr('src'));
        });

        setTimeout(function () {
            moveDc1(4);
            moveDc2(4);

            //prev data
            if (!_.isEmpty(datalist[datalistIndex - 1])) {
                renderMediaContent(datalist[datalistIndex - 1], 4);
            }
            //next data
            renderMediaContent(datalist[datalistIndex + 1], 2, 1);
            if (datalistIndex - 2 === 0) {
                loadSingleContent(datalist[datalistIndex].nid, 0);

            }

        }, 800);
    }
}

// Photo go right

function goRight() {
    if (clickable) {
        clickable = false;
        datalistIndex++;
        _item = datalist[datalistIndex];
        if(_item == undefined)
        {
            $('.v_item').eq(0).click();
            return false;
        }
        $.address.path(_item.nid);
        $('.input_nid').val(_item.nid);
        // 3D Animation
        var rotateY = parseInt($('.dc1_cube').css('rotateY'));
        rotateY -= 90;
        var zWidth = $('#dc1').width();
        $('.dc1_cube').transition({
            z: -zWidth / 2,
            rotateY: rotateY
        }, 800);
        $('.dc2_bigcube').transition({
            z: -195,
            rotateY: rotateY
        }, 800);

        $dc3 = $('#dc3');
        $('.dc1_face').css({
            'background-color': '#000'
        });
        $('.dc2_bigcube_face').css({
            'background-color': '#000'
        });
        $dc3.append('<div class="dc3_wrap" style="left: ' + $dc3.width() + 'px;"></div>');
        $dc3.find('.dc3_wrap').eq(0).remove();
        $dc3.find('.dc3_wrap').eq(0).clearQueue().animate({
            'left': -$dc3.width(),
            'opacity': 0
        }, 1000, 'easeInOutQuint');
        $dc3.find('.dc3_wrap').eq(1).clearQueue().animate({
            'left': 0,
            'opacity': 1
        }, 1000, 'easeInOutQuint');
        $dc3.find('.dc3_wrap').eq(2).css({
            'display': 'block',
            'opacity': 0
        }).animate({
            'opacity': 0.3
        }, 400);
        //stop video in iframe
        $dc3.find('.dc3_wrap iframe').each(function (i) {
            $(this).attr('src', $(this).attr('src'));
        });
        var soundcloud_iframe = $('.dc3_wrap').eq(1).find('.soundcloud-iframe');
        if (soundcloud_iframe.length > 0) {
            soundcloud_iframe.fadeIn();
            $dc3.find('.dc3_wrap').eq(1).find('.fillmoreInner').fadeOut();
        }

        setTimeout(function () {
            moveDc1(2);
            moveDc2(2);

            //next data
            if (!_.isEmpty(datalist[datalistIndex + 1])) {
                renderMediaContent(datalist[datalistIndex + 1], 2);
            }

            //prev data
            renderMediaContent(datalist[datalistIndex - 1], 4, 1);
            if (datalistIndex + 2 === datalist.length) {
                loadSingleContent(datalist[datalistIndex].nid, 0);

            }

        }, 800);
    }
}


function bindShortcutEvent() {
    $('body').bind('keyup', function (event) {
        if($('#dc1').css('display') === 'block'){
            var targetTag = $(event.target).prop("tagName").toLowerCase();
            if (targetTag !== "input" || targetTag !== "textarea") {
                if (event.keyCode === 39) {
                    $('.nav_arrow_right').eq(0).click();
                }
                if (event.keyCode === 37) {
                    $('.nav_arrow_left').eq(0).click();
                }
                if (event.keyCode === 27 || event.keyCode === 38) {
                    $('#dc1 .back').click();
                }
            }
        }
        else
        {
            if (event.keyCode === 39) {
                $('.v_item').eq(0).click();
            }
        }
    });
    $('body').bind('keydown', function (event) {
        if (event.keyCode == 9) {
           event.preventDefault();
            return false;
        }
    });
    
    $('textarea').bind('keydown', function (e) {
        if (e.ctrlKey && e.which == 13 || e.which == 10) {
            $(".dc2_bigcube_face1 .comment_form").submit();
        }
        if (e.metaKey && e.which == 13) {
            $(".dc2_bigcube_face1 .comment_form").submit();
        }
    });
    $('textarea,input').bind('keydown', function () {
        $('.dc2_bigcube_face1 .button_input').removeAttr('disabled');
    });
}



//window resize

function resizeWindow() {
    if (!$('.vgrid').hasClass('isotope') && animating === 0) {
        $('.vgrid .v_item,.vgrid .date_span').css({
            '-webkit-transition-duration': '0',
            '-moz-transition-duration': '0'
        });
        $('.vgrid').isotope({
            'resizable': false
        });
    }
    $width = $(window).width();
    var pageHeight = (Math.ceil($('.vgrid > *').length / ($('.vgrid').width() / imageWidth)) + 2) * imageWidth;
    $('.page').height(pageHeight);

    var dc2_section1_height = $(window).height() - $('.dc2_header').height();
    $('.dc2_section1').height(dc2_section1_height);

    var body_margin_top = (dc2_section1_height - $('.dc2_section1 .body').height()) / 2;
    $('.dc2_section1 .body').css({
        'margin-top': body_margin_top
    });

    var dc2_section1_top = parseInt($('.dc2_bigcube_face1 .dc2_section1').css('margin-top'));
    if(dc2_section1_top<0)
    {
        var comments_wrap = $('.dc2_bigcube_face1 .comments_list');
        $('.dc2_bigcube_face1 .dc2_section1').css('margin-top',-($(window).height()-100));
        var comment_max_height = $(window).height()-390;
        var comments_list_height = comments_wrap.height();
        if(comments_list_height > comment_max_height) comments_list_height = comment_max_height;
        comments_wrap.css('height',comments_list_height+20);
    }
    
    
    setTimeout(function(){
        var d1_width = parseInt($('#dc1').css('width'));
        var d2_width = parseInt($('#dc2').css('width'));
        var dc3_width = $(window).width() - d1_width - d2_width - 85;
        if (opend) {
            $('.left_panel').css({
                'left': $width
            });
            $('.vgrid').css({
                'margin-left': $width + 100
            });
            $('#dc3').css({
                 'width': dc3_width,
                 'left': d1_width+d2_width
            });
            $('#dc2').css({
                'left': d1_width
            });
        }
        else
        {
            $('#dc3').css({  
                'width': dc3_width,
                 'left': -dc3_width
            });
        }
        
        $('.dc3_wrap').eq(0).css({
            'left': -dc3_width
        });
        $('.dc3_wrap').eq(2).css({
            'left': dc3_width
        });
        
         var arrow_width = $('#dc1 .nav_arrow_right').width();
        var back_width = $('#dc1 .back').width();
        var back_height = $('#dc1 .back').height();
        $('#dc1 .nav_arrow_right').css({
            'background-position': '0'
        }).spriteOnHover({
            fps: 20,
            orientation: 'vertical',
            width: arrow_width,
            height: arrow_width
        });
        $('#dc1 .nav_arrow_left').css({
            'background-position': '0'
        }).spriteOnHover({
            fps: 20,
            orientation: 'vertical',
            width: arrow_width,
            height: arrow_width
        });
        $('#dc1 .back').css({
            'background-position': '0 0'
        }).spriteOnHover({
            fps: 20,
            orientation: 'vertical',
            width: back_width,
            height: back_height
        });
    },1000);
     
    
    //get image with
    var bodyWidth = $('body').width() - $('.left_panel').width();
    if(fireOnce)
    {
        fireOnce = false;
        if($.browser.mozilla && $('body').css('overflow') != 'hidden')
        {
            bodyWidth -= 15;
        }
    }
    var minWidth = 170;
    var numberChilds = parseInt(bodyWidth / minWidth);
    imageWidth = parseInt(bodyWidth / numberChilds) + 1;


    var v_item_group = $('.v_item,.date_span');
    v_item_group.css({
        'width': imageWidth,
        'height': imageWidth
    });
    v_item_group.find('img').css({
        'width': imageWidth,
        'height': imageWidth
    });
    v_item_group.find('.item_info .city').css({
        'margin-top': (imageWidth - 88) / 2
    });
    perpage = parseInt(($(window).width() / imageWidth)) * Math.ceil(($(window).height() / imageWidth));
    $('.date_span .full_time').css({
        'margin-top': (imageWidth - 109) / 2
    });
    $('.vgrid .isotope-item').css({
        '-webkit-transition-duration': '0.5s',
        '-moz-transition-duration': '0.5s'
    });
    if ($('.vgrid').hasClass('isotope') && animating === 0) {
        clearTimeout(transTimeout);
        transTimeout = setTimeout(function () {
            $('.vgrid').isotope('reLayout');
        },
            300);
    }
    
   
}

//Left Text Time Clock
function bindTextClockEvent() {
    var parisTimeZone = 1;
    if (isBSTinEffect())
        parisTimeZone = 2;
    $('#paris_time').textClock(parisTimeZone);
    $('#shanghai_time').textClock(8);
    setInterval(function () {
        $('#paris_time').textClock(parisTimeZone);
        $('#shanghai_time').textClock(8);
    }, 1000 * 30);
}

function loadComplete() {
    
    if (loaded) {
        $('.logo_inner').fadeIn(function () {
            $('.page').show();
            $('.logo_loading').fadeOut();
            $('#qLoverlay').fadeOut(500, function () {
                $('#qLoverlay').remove();
            });
        });
    }
}


function initInfinitescroll(url) { 
    $('body').infinitescroll('destroy');
    $('body').infinitescroll({
        state: {
            isDestroyed: false,
            isDone: false
        }
    });
    $('body').infinitescroll({
        navSelector: "a#next_page:last",
        nextSelector: "a#next_page:last",
        itemSelector: "div",
        debug: false,
        dataType: 'json',
        state: {
            currPage: 0
        },
        appendCallback: false,
        //path: [siteurl+'data/third_content/all_resources?perpage=' + perpage + '&page=', '']
        path: [url, '']
    }, function (data) {
        if (data.lenght === 0) {
            $('body').infinitescroll('destroy');
        }
        renderItem(data, 'append');
        bindVgridEvent();
    });
    $('body').infinitescroll('bind');
}