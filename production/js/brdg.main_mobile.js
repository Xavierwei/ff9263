/****************************************************
	Define brdg variables
****************************************************/
var monthShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var pic1_left = -$(window).width() * 0.85;
var pic2_left = $(window).width() * 0.05;
var pic3_left = $(window).width() * 0.95;
var cube1_width;
var cube2_width;
var comment_cube_width;
var loaded = 0;
var perpage = 5;
var siteurl = "http://" + window.location.hostname + '/';
var current_day;
var datalist = new Array();
var datalistIndex = 0;
var clickable = true;
$width = $(window).width();
var vg;
var current_day;
var loaded = 0;
var imageWidth;
var $_node = $.Node();
var $_utility = $.BrdgUtility();
var submiting = true;
var current_type = 0;
var isiPad = navigator.userAgent.match(/iPad/i) != null;
var STR_CITYLABEL = new Array('shanghai','paris','paris - shanghai');
var citylabel = 2;
var current_cityid = null;
if(isiPad)
{
    pic1_left = -$(window).width() * 0.7;
    pic2_left = $(window).width() * 0.1;
    pic3_left = $(window).width() * 0.9;
    perpage = 15;
}
var xhr;

/****************************************************
	Initialization
****************************************************/
$(document).bind("mobileinit", function(){
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
//    $.mobile.ajaxEnabled = false;
//    $.mobile.ignoreContentEnabled = false;
  //  $.mobile.linkBindingEnabled = false;
 //   $.mobile.loadingMessage = false;
    $.mobile.loadingMessage = " 1";
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.defaultPageTransition = 'none';
    
     
});

$(document).ready(function(){
    brdgInit();
});

function brdgInit() {
    if(isiPad)
    {
        $('head').append('<link rel="stylesheet" type="text/css" href="../css/ipad.css">');
        $('.d1_footer1').show();
    }
    //alert($(window).height());
    setTimeout(function () {
        window.scrollTo(0, 1);
        windowResize();
        bindTextClockEvent();
        bindShortcutEvent();
        bindDcEventOnce();
        $(".tapcover").show();
        $('.time_clock').brdgClock();
    }, 1000);
    $(window).resize(windowResize);
    loadData(siteurl + 'data/third_content/all_resources?perpage=' + perpage + "&page=0");
    
    var path = $.address.path();
    var nid = path.replace("/","");
    if (!_.isEmpty(nid)) {
        loadSingleContent(nid, 1);
    }
}



function renderItem(data,timeout) {
    for (var i in data) {
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
        if (media_type.toLowerCase() == 'instagram') {
            media_source = "instagram";
        }

        if (media_type.toLowerCase() === 'twitter tweets') {
            media_source = "twitter";
        }

        if (media_type.toLowerCase() === 'weibo') {
            media_source = "weibo";
        }

        if (media_type.toLowerCase() == 'soundcloud') {
            media_source = "soundcloud";
            media_image = data[i].field_sound_thumbnail;
        }

        if (media_sound.length > 0) {
            if (media_sound[0].indexOf('soundcloud') > 0) {
                media_source = "soundcloud";
                media_image = data[i].field_sound_thumbnail;
            }
        }

        if (media_video.length > 0) {
            if (media_video[0].indexOf('youtu') > 0) {
                media_source = "youtube";
            }

            if (media_video[0].indexOf('dailymotion') > 0) {
                media_source = "dailymotion";
            }

            if (media_video[0].indexOf('vimeo') > 0) {
                media_source = "vimeo";
            }
            media_image = data[i].field_video_thumbnail;
        }


        var v_item = $('<div id="media_' + nid + '" class="v_item ' + media_source + '"><a><img  src="' + media_image + '"/></a><div class="item_info"><div class="city">' + user_city + '</div><div class="source"><div class="' + media_source + '"></div></div><div class="full_time">' + $_utility.formateNumber(media_date_day) + '/' + $_utility.formateNumber(media_date_month) + '/' + media_date_year + '</div></div><div class="item_icon"><div class="' + media_source + '"></div></div></div>');
        v_item.data('imgdata', {
            'nid': nid
        });

        var _daySpan = $('.date_span[rel = "' + date_media_date + '"]');

        // Render date cover
        if (_daySpan.length > 0) {
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
        } else {
            var daySpan = $('<div class="date_span"><div class="full_time">' + $_utility.formateNumber(media_date_day) + '/' + $_utility.formateNumber(media_date_month) + '/' + $_utility.formateNumber(media_date_year) + '</div><div class="day">' + $_utility.formateNumber(media_date_day) + '</div><div class="city">'+STR_CITYLABEL[citylabel]+'</div></div>');
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
    setTimeout(itemAnimate, timeout);
}

function itemAnimate() {
    var items = $('.v_item');
    var i = 0;
    items.each(function () {
        var _c = $(this);
        if (!_c.hasClass('opened')) {
            _c.css({
                'display': 'none',
                'rotateY': '-90deg',
                'opacity': 0,
                'width': 0,
                'height': imageWidth
            });
            _c.find('img').css({
                'width': imageWidth,
                'height': imageWidth
            });
            setTimeout(function () {
                _c.addClass('opened');
                _c.css({
                    'display': 'block'
                }).animate({
                    'width': imageWidth
                }, 10);
                _c.transition({
                    perspective: '9000px',
                    rotateY: '0deg',
                    opacity: 1
                }, 400);
            }, (i * (200 || 0)));
            i++;
        }
    });



}

/*
 * Load photo wall
 * @param url
 * The ajax request url
 */
function loadData(url) {
    // Destory exsit content
    $('.vgrid').empty();
    if(xhr != undefined)
    {
        xhr.abort();
    }
    xhr = $_node.loadPhotowall(url, function (data) {
        $('.loading').css({
                'top': '-100%'
            });
            loaded = 1;
            loadComplete();
            renderItem(data,1500);
            setTimeout(function () {
                itemAnimate();
            }, 1500);

            bindvgridEvent();
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

    var width = $(window).width();
   
    $('.d1').css({
        'left': 0
    });
    $('.home').css('margin-left', -width);
    $('.page').css({'overflow':'hidden','height':window.innerHeight});

    $('.dc3_wrap').html('').removeData("fillmore");
    //windowResize();

    renderMediaContent(media_data, 1);
    loadcomment(media_data);
    $('.dc3_wrap').show();
    $('.dc3_wrap').eq(0).animate({
        'opacity': 0.3
    });
    $('.dc3_wrap').eq(2).animate({
        'opacity': 0.3
    });
    
    moveDc1(1);
    moveDc2(1);
    moveDc3(1);

    //还需要判断第一个最后一个得情况
    //next data
    if (datalistIndex < datalist.length)
        renderMediaContent(datalist[datalistIndex + 1], 2);
    //prev data
    if (datalistIndex > 0)
        renderMediaContent(datalist[datalistIndex - 1], 4);

    $('.dc3_wrap').eq(2).click(function () {
        $('.nav_arrow_right').eq(0).click();
    });
    $('#dc3_arrow').css({
        'opacity': 0.5,
        'display': 'block'
    });
    
    $.address.path(media_data.nid);
    document.ontouchmove = function(e){ e.preventDefault(); }
}


/*
 * Render Media Content
 * @param media_data
 * Media Date, It's Object type
 * @param face
 * Cube face
 */
/*
 * Render Media Content
 * @param media_data
 * Media Date, It's Object type
 * @param face
 * Cube face
 */
function renderMediaContent(media_data, face) {
    //console.log(media_data);
    var imgIndex = face;
    if (face == 3) {
        imgIndex = 0;
    }
    var user_url;

    if (media_data.source_type.toLowerCase() == 'instagram') {
        media_data.media_source = "instagram";
    }

    if (media_data.source_type.toLowerCase() == 'soundcloud') {
        media_data.media_source = "soundcloud";
    }

    if (!_.isEmpty(media_data.field_sound)) {
        if (media_data.field_sound.indexOf('soundcloud') > 0) {
            media_data.media_source = "soundcloud";
        }
    }

    if (media_data.field_video) {
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
    
    // Parse Date
    
    var media_date_year = date_media_date.getFullYear();
    var media_date_month = date_media_date.getMonth() + 1;
    var media_date_day = date_media_date.getDate();
    var media_date_hrs = date_media_date.getHours();
    var media_date_min = date_media_date.getMinutes();
    var bigImage = media_data.field_media_image.replace('files/', 'files/styles/400_400/public/');
    if(isiPad)
    {
        bigImage = media_data.field_media_image;
    }

    updateDay(media_date_day);
    if (media_data.media_source === 'instagram') {
        user_url = "http://instagram.com/" + media_data.field_user_name;
    }
    else if(media_data.source_type.toLowerCase() === 'twitter tweets')
    {
        user_url = "http://twitter.com/" + media_data.field_user_name;
    }
    //TODO: add weibo link
    
   

    // Render content
    $('.dc3_wrap').eq(imgIndex).html('');
    if (media_data.media_source == 'youtu' || media_data.media_source == 'youtube') {
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
        $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="100%"  src="http://www.youtube.com/embed/' + videourl + '" frameborder="0" allowfullscreen></iframe>');
    } else if (media_data.media_source == 'vimeo') {
        $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%"  height="100%" src="' + media_data.field_video.replace('vimeo.com', 'player.vimeo.com/video') + '" frameborder="0" allowfullscreen></iframe>');
    } else if (media_data.media_source == 'youku') {
        var url = media_data.field_video.split('id_');
        url = url[1].split('.html');
        $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="90%" style="margin-top:5%;" src="http://player.youku.com/embed/' + url[0] + '" frameborder="0" allowfullscreen></iframe>');
    } else if (media_data.media_source == 'dailymotion') {
        var url = media_data.field_video.split('video/');
        url = url[1].split('_');
        url = url[0];
        url = "http://www.dailymotion.com/embed/video/" + url;
        $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="100%" src="' + url + '" frameborder="0" allowfullscreen></iframe>');
    } else if (media_data.media_source == 'soundcloud') {
        var url = media_data.field_sound;
        $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="166" scrolling="no" frameborder="no" class="soundcloud-iframe" src="../soundcloud/soundcloud.php?q=' + encodeURIComponent(url) + '"></iframe>');
        var height = (window.innerHeight - 266) / 2;
        $('.dc3_wrap').eq(imgIndex).find('.soundcloud-iframe').css({
            'margin-top': height,
            'margin-left': -20
        });
        // show the soundcloud thumbnail in the next slider
        if (face == 2) {
            $('.dc3_wrap').eq(imgIndex).find('.soundcloud-iframe').hide();
            $('.dc3_wrap').eq(imgIndex).fillmore({
                src: bigImage
            });
        }
    } else if (media_data.media_source === 'vine') {
        var url = media_data.field_video.split('/v/');
        var frame_path = "vine_resize";
        $('.dc3_wrap').eq(imgIndex).html('<iframe src="../vine/'+frame_path+'.php?q='+url[1]+ '&w='+$('.dc3_wrap').eq(0).width()*0.95+'" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>');
    }
    else if (media_data.media_source === 'instagram' && !_.isEmpty(media_data.field_video)) {
        $('.dc3_wrap').eq(imgIndex).html('<iframe width="100%" height="100%" scrolling="no" frameborder="no" src="../instagram/video.php?u=' + media_data.field_video + '&w='+ $('.dc3_wrap').eq(0).width()*0.95+'" frameborder="0" allowfullscreen></iframe>');
    }
    else {
        $('.dc3_wrap').eq(imgIndex).removeData('fillmore');
        $('.dc3_wrap').eq(imgIndex).fillmore({
            src: bigImage
        });
    }

    clickable = true;
    //$('.dc2_bigcube_face' + face + ' .avator img').attr('src',media_data.user_avatar);
    //$('.dc2_bigcube_face' + face + ' .username').html('<a target="_blank" href="' + user_url + '">' + media_data.field_user_name + '</a>');
    //$('.dc2_bigcube_face' + face + ' .body').html(media_data.field_body.replace('#9263',''));
    //$('.dc2_bigcube_face' + face + ' input[name="nid"]').val(media_data.nid);
    $('.cube1_face' + face + ' .day').html(media_date_day);
    $('.cube1_face' + face + ' .date').html(formateNumber(media_date_day) + '/' + formateNumber(media_date_month) + '/' + media_date_year);
    $('.cube2_face' + face + ' .time_clock').attr('data-hrs', media_date_hrs);
    $('.cube2_face' + face + ' .time_clock').attr('data-min', media_date_min);
    $('.cube2_face' + face + ' .time_text').html(formateNumber(media_date_hrs) + 'H' + formateNumber(media_date_min));
    $('.cube2_face' + face + ' .time_clock').brdgClock();
    $('.cube3_face' + face).html('').append('<div>#9263</div>');
    $('.cube3_face' + face + ' div').addClass(media_data.source_type.toLowerCase());


    
}

function bindDcEventOnce() {
    
    setTimeout(function(){ 
        initInfinitescroll(siteurl+'data/third_content/all_resources?perpage='+perpage+'&page=');
    },2000);
   
    
    $('.d1_header .back').click(function () {
        $('.home').css({
            'margin-left': 0
        });
        $('.d1').css({
            'left': '100%'
        });

        $('.page').css({'overflow':'visible','height':'auto'});
        
        $.address.path('#');
        document.ontouchmove = function(e){ return true; }
    });

    //go right
    $(document).on("swiperight", function (e) {
        if (e && e.target.className) {
            if (e.target.className ===  'tapcover') {
                 goright();
            }

        }
    });

    //go left
    $(document).on("swipeleft", function (e) {
        if (e && e.target.className ===  'tapcover') {
          goleft();
        }
    });

    $('.comments_list_wrap').on("swiperight",function(e){
        var left = $('.comments_list').offset().left;
        if ($(e.target).parent().parent().nextAll('.comment_item_wrap').length > 0)
        {
            $('.comments_list').animate({
                'margin-left': left - $(window).width()
            });
        }
    });

    $('.comments_list_wrap').on("swipeleft",function(e){
        var left = $('.comments_list').offset().left;
        if (left < 0) {
            $('.comments_list').animate({
                'margin-left': left + $(window).width()
            });
        }
    });

    checkOrientation();
    $(window).on("orientationchange", function (event) {
        checkOrientation();
    });


    $('.v_item').on('tap', function () {
        windowResize();
        //$('.home').fadeOut();
        $('.d1').fadeIn(function () {

            $('.cube1').transition({
                z: -cube1_width / 2,
                rotateY: 0
            });

            $('.cube2').transition({
                z: -cube1_width / 2,
                rotateY: 0
            });

            $('.cube3').transition({
                z: -cube3_width / 2,
                rotateY: 0
            });

            $('.cube1_face1').css({
                rotateY: 0,
                z: cube1_width / 2
            });
            $('.cube1_face2').css({
                rotateY: 90,
                z: cube1_width / 2
            });
            $('.cube1_face3').css({
                rotateY: -90,
                z: cube1_width / 2
            });

            $('.cube2_face1').css({
                rotateY: 0,
                z: cube3_width / 2
            });
            $('.cube2_face2').css({
                rotateY: 90,
                z: cube3_width / 2
            });
            $('.cube2_face3').css({
                rotateY: -90,
                z: cube3_width / 2
            });

            $('.cube3_face1').css({
                rotateY: 0,
                z: cube3_width / 2
            });
            $('.cube3_face2').css({
                rotateY: 90,
                z: cube3_width / 2
            });
            $('.cube3_face3').css({
                rotateY: -90,
                z: cube3_width / 2
            });
        });
    });



    $('.nav_arrow_left').click(function () {
        goright();
    });

    $('.nav_arrow_right').click(function () {
        goleft();
    });

    $('.btn_comments').click(function () {
        $('.d1_footer1').animate({
            'bottom': -200,
            'opacity': 0
        }, 1000, function () {


        });
        var d1_col1_wrap_width = $('.btn_like').width() + 1;
        $('.d1_col1').animate({
            'margin-left': -d1_col1_wrap_width
        });
        var top = window.innerHeight - 93;
        if(isiPad)
        {
            top = top - 200;
        }
        setTimeout(function () {
            $('.d1_msg').css({
                'width': '100%'
            });
            $('.d1_msg').animate({
                'height': top
            });
        }, 400);

        $(".comments_cube").animate({
            'margin-left': 0
        }, 200);

        var widnowWidth = $(window).width();
        $('.comment_item').width(widnowWidth);
        $(".tapcover").hide();
        //$('.comments_cube').transition({
        //	  z: -comment_cube_width/2,
        //	  rotateY: 0
        //	});

    });

    $('.btn_share').click(function () {
        $('.d1_footer1').animate({
            'bottom': -200,
            'opacity': 0
        }, 1000);
        var d1_col1_wrap_width = $('.btn_like').width() + 1;
        $('.d1_col1').animate({
            'margin-left': -d1_col1_wrap_width
        });
        var top = window.innerHeight - 93;
         if(isiPad)
        {
            top = top - 200;
        }
        setTimeout(function () {
            $('.d1_msg').css({
                'width': '100%'
            });
            $('.d1_msg').animate({
                'height': top
            });
        }, 400);

        $(".comments_cube").animate({
            'margin-left': '-100%'
        }, 200);
        $(".tapcover").hide();
        //$('.comments_cube').transition({
        //	  z: -comment_cube_width/2,
        //	  rotateY: -90
        //	});
    });
    
    var comment_btn_height = 50;
    var comment_btn_bottom = 51;
    if(isiPad)
    {
        comment_btn_height = 60;
        comment_btn_bottom = 61;
    }
    $('.btn_close').click(function () {
        $('.d1_col1').animate({
            'margin-left': 0
        });
        $('.d1_msg').delay(400).animate({
            'height': comment_btn_height
        }, function () {
            $('.d1_msg').css({
                'width': '70%'
            });
        });
        $('.d1_footer1').animate({
            'bottom': comment_btn_bottom,
            'opacity': 1
        }, 1000);
        $(".tapcover").show();
    });

    $('.tapcover').bind('tap', function () {
        console.log('cover tap');
        $(this).hide();
        setTimeout(function(){
            $(".tapcover").show();
        },1000);
    });

}

function bindvgridEvent() {
    
    $('.category li,.logo,.city_time').unbind('click');
    //filter all
    $('.logo').click(function () {
        $('.category a').removeClass('actived');
        $('.city_time').removeClass('actived');
        $('.category a').eq(0).addClass('actived');
        current_day = null;
        current_type = 0;
        current_cityid = null;
        citylabel = 2;
        loadData(siteurl + 'data/third_content/all_resources?page=0');
    });
    $('.category li').eq(0).click(function () {
        $('.category a').removeClass('actived');
        $('.city_time').removeClass('actived');
        $('a', this).addClass('actived');
        current_day = null;
        current_type = 0;
        current_cityid = null;
        citylabel = 2;
        loadData(siteurl + 'data/third_content/all_resources?perpage=' + perpage + '&page=0');
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
        loadData(siteurl + 'data/third_content/services_picture?perpage=' + perpage + '&page=0');
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
        loadData(siteurl + 'data/third_content/services_video?perpage=' + perpage + '&page=0');
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
        loadData(siteurl + 'data/third_content/services_sould?perpage=' + perpage + '&page=0');
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
        loadData(siteurl + 'data/third_content/all_resources?perpage=' + perpage + '&page=0&city_id=' + cityid);
        initInfinitescroll(siteurl + 'data/third_content/all_resources?perpage=' + perpage + '&city_id=' + cityid + '&page=');
    });


    /****************************************************
	bind data
	****************************************************/
    $('.vgrid .v_item').unbind('click');
    $('.vgrid .v_item').bind('click', function () {
        current_item = $(this);
        //current data
        var media_data = $(this).data('imgdata');
        $('<div class="loading2"></div>').appendTo(current_item).css({
            'display': 'none',
            'width': current_item.width(),
            'height': current_item.width()
        }).fadeIn();

        loadSingleContent(media_data.nid, 1);
        return false;
    });


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
    console.log("before loadid:" + datalistIndex);
    var _currentDatalistIndex = datalistIndex;
    $_node.getPreNextNodes(nid, 10, current_type, current_cityid, 0, function (data) {
       $('.loading2').fadeOut();
        datalist.length = 0; //empty array
        data.next.reverse();
        for (var d in data.next) {
            datalist.push(data.next[d]);
        }

        datalist.push(data.current);

        for (var d in data.pre) {
            datalist.push(data.pre[d]);
        }

        var _indexOffset = datalistIndex - _currentDatalistIndex;
        datalistIndex = data.next.length + _indexOffset;
        for (var d in datalist) {
            var url = datalist[d].field_media_image;
            var img = new Image();
            img.src = url;
        }

        if (isOpen) {
            openBigImage(datalist[datalistIndex]);
        }

        clickable = true;
    });
}



function moveDc1(face) {
    var new_cube1 = $('<div />', {
        'class': 'cube1'
    }).hide().appendTo('.cube_wrap1');
    var face1 = $('<div />', {
        'class': 'cube1_face1 photo_date'
    }).appendTo(new_cube1);
    var face2 = $('<div />', {
        'class': 'cube1_face2 photo_date'
    }).appendTo(new_cube1);
    var face3 = $('<div />', {
        'class': 'cube1_face3 photo_date'
    }).appendTo(new_cube1);
    face1.html($('.cube1_face' + face).html());
    face2.html($('.cube1_face' + face).html());
    face3.html($('.cube1_face' + face).html());
    new_cube1.transition({
        z: -cube1_width / 2,
        rotateY: 0
    }, 0);
    $('.cube1_face1').css({
        rotateY: 0,
        z: cube1_width / 2
    });
    $('.cube1_face2').css({
        rotateY: 90,
        z: cube1_width / 2
    });
    $('.cube1_face3').css({
        rotateY: -90,
        z: cube1_width / 2
    });

    new_cube1.show();
    $('.cube1').eq(0).remove();
}

function moveDc2(face) {
    var new_cube2 = $('<div />', {
        'class': 'cube2'
    }).hide().appendTo('.cube_wrap2');
    var face1 = $('<div />', {
        'class': 'cube2_face1 photo_time'
    }).appendTo(new_cube2);
    var face2 = $('<div />', {
        'class': 'cube2_face2 photo_time'
    }).appendTo(new_cube2);
    var face3 = $('<div />', {
        'class': 'cube2_face3 photo_time'
    }).appendTo(new_cube2);
    face1.html($('.cube2_face' + face).html());
    face2.html($('.cube2_face' + face).html());
    face3.html($('.cube2_face' + face).html());
    new_cube2.transition({
        z: -cube1_width / 2,
        rotateY: 0
    }, 0);
    $('.cube2_face1').css({
        rotateY: 0,
        z: cube1_width / 2
    });
    $('.cube2_face2').css({
        rotateY: 90,
        z: cube1_width / 2
    });
    $('.cube2_face3').css({
        rotateY: -90,
        z: cube1_width / 2
    });
    $('.time_clock').brdgClock();
    new_cube2.show();
    $('.cube2').eq(0).remove();
}

function moveDc3(face) {
    var new_cube3 = $('<div />', {
        'class': 'cube3'
    }).hide().appendTo('.cube_wrap3');
    var face1 = $('<div />', {
        'class': 'cube3_face1 source twitter'
    }).appendTo(new_cube3);
    var face2 = $('<div />', {
        'class': 'cube3_face2 source twitter'
    }).appendTo(new_cube3);
    var face3 = $('<div />', {
        'class': 'cube3_face3 source twitter'
    }).appendTo(new_cube3);
    face1.html($('.cube3_face' + face).html());
    face2.html($('.cube3_face' + face).html());
    face3.html($('.cube3_face' + face).html());
    new_cube3.transition({
        z: -cube1_width / 2,
        rotateY: 0
    }, 0);
    $('.cube3_face1').css({
        rotateY: 0,
        z: cube1_width / 2
    });
    $('.cube3_face2').css({
        rotateY: 90,
        z: cube1_width / 2
    });
    $('.cube3_face3').css({
        rotateY: -90,
        z: cube1_width / 2
    });
    new_cube3.show();
    $('.cube3').eq(0).remove();
}




function windowResize() {
    var widnowWidth = $(window).width();
    var percent_b = 0.9;
    var percent_s = 0.05;
    if(isiPad){
        percent_b = 0.8;
        percent_s = 0.1;
    }
    imageWidth = widnowWidth - $('.home_header').width();
    if(isiPad)
    {
        imageWidth = imageWidth/3;
    }
    
    var v_item = $('.v_item');
    v_item.css({'width':imageWidth, 'height':imageWidth});
    v_item.find('img').css({'width':imageWidth, 'height':imageWidth});
    
    var mid_height = window.innerHeight - $('.d1_header').height() - $('.d1_footer2').height() - 2;
    
    var daySpan = $('.date_span');
    var spanWidth = $(window).width() - $('.home_header').width();
    if(isiPad)
    {
       spanWidth = ($(window).width() - $('.home_header').width())/3;
    }
    var spanMargin = (spanWidth - 110) / 2;
    daySpan.css({
       'width': spanWidth,
       'height': spanWidth
    });
    daySpan.find('.full_time').css({
       'margin-top': spanMargin
    });
    
    if(isiPad)
    {
        mid_height = mid_height - $('.d1_footer1').height() + 5;
    }
    $('.vgrid').css('min-height', window.innerHeight);
    $('.d1_mid,.dc3_wrap').height(mid_height);

    cube1_width = $('.cube_wrap1').width();
    cube3_width = $('.cube_wrap3').width();
    comment_cube_width = widnowWidth;

    d1_col1_wrap_width = $('.d1_col1_wrap').width();
    $('.d1_col1').width(d1_col1_wrap_width * 2 + 1);
    $('.btn_like').width(d1_col1_wrap_width);
    $('.btn_close').width(d1_col1_wrap_width);
    
    
    var dc3_width = $(window).width() * percent_b;
    $('.dc3_wrap').width(dc3_width);
    $('.dc3_wrap').eq(0).css({
        'left': -dc3_width + widnowWidth * percent_s
    });
    $('.dc3_wrap').eq(1).css({
        'left': widnowWidth * percent_s
    });
    $('.dc3_wrap').eq(2).css({
        'left': dc3_width + widnowWidth * percent_s
    });

    $('.tapcover').height(mid_height - 50);

    $('.comment_item').width(widnowWidth);


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


function formateNumber(number) {
    number = (number < 10) ? "0" + number : number;
    return number;
}

function updateDay(day) {
    var iDay = 0;

    var updateDayTO = setInterval(function () {
        iDay++;
        iDayText = (iDay < 10) ? "0" + iDay : iDay;
        $('.photo_date .day').html(iDayText);
        if (iDay === day) {
            clearInterval(updateDayTO);
        }
    }, 30);
};


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
        debug: true,
        dataType: 'json',
        extraScrollPx: 10,
        state: {
            currPage: 0
        },
        appendCallback: false,
        path: [url, ''],
        loading: {
            img: '../images/loading2.gif',
            msgText: ''
        }
    }, function (data) {
        if (data.lenght == 0) {
            $('body').infinitescroll('destroy');
        }
        renderItem(data, 200);
        bindvgridEvent();
    });
    $('body').infinitescroll('bind');
}


function loadComplete() {
    if (loaded) {
        $('.logo_inner').fadeIn(function () {
            $('.logo_loading').fadeOut();
            $('#qLoverlay').fadeOut(500, function () {
                $('#qLoverlay').remove();
            });
        });
    }
}

function checkOrientation() {
    var orientation = window.orientation;
    if (orientation != 0) {
        $('.turnphone').show();
    } else {
        $('.turnphone').hide();
    }
}




function loadcomment(_item) {
    
    
    
    var bigImage = _item.field_media_image.replace('files/', 'files/styles/400_400/public/');
    var p_url = siteurl + "/#/" + _item.nid;
    var domainbigImage = bigImage.replace('64.207.184.106', 'www.polyardshanghai.com'); //only for testing, beacuse facebook need real domain.
    var share_facebook = "http://www.facebook.com/sharer/sharer.php?s=100&p[title]=" + encodeURIComponent(_item.field_body) + "&p[summary]=" + encodeURIComponent(_item.field_body) + "&p[url]=" + encodeURIComponent(p_url) + "&p[images][0]=" + encodeURIComponent(domainbigImage);
    var share_google = "https://plusone.google.com/_/+1/confirm?hl=en&url=" + encodeURIComponent(p_url);
    var share_twitter = "http://twitter.com/share?text=" + encodeURIComponent(_item.field_body) + "&url=" + encodeURIComponent(p_url) + "&img=" + encodeURIComponent(domainbigImage);
    var share_weibo = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(_item.field_body) + "&pic=" + encodeURIComponent(domainbigImage) + "&url=" + encodeURIComponent(p_url);
    var share_pinterest = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(p_url) + "&media=" + encodeURIComponent(domainbigImage) + "&description=" + encodeURIComponent(_item.field_body);
    var share_huaban = "http://huaban.com/bookmarklet/?url=" + encodeURIComponent(p_url) + "&media=" + encodeURIComponent(domainbigImage);

    // Render Sharing Buttons
    $('.d1_msg .facebook').attr('href', share_facebook);
    $('.d1_msg .google').attr('href', share_google);
    $('.d1_msg .twitter').attr('href', share_twitter);
    $('.d1_msg .weibo').attr('href', share_weibo);
    $('.d1_msg .pinterest').attr('href', share_pinterest);
    $('.d1_msg .huaban').attr('href', share_huaban);
    $('.d1_footer1 .body').fadeOut(400,function(){
        $('.d1_footer1 .body').html('<p>'+$_utility.replaceURLWithHTMLLinks(_item.field_body)+'</p>');
        $('.d1_footer1 .username').html(_item.field_user_name);
        $('.d1_footer1 .avator img').attr('src', _item.field_user_profile_image);
    });
    $('.d1_footer1 .username').fadeOut(400);
    $('.d1_footer1 .avator img').fadeOut(400);
    
    $('.d1_footer1 .body').delay(400).fadeIn(400);
    $('.d1_footer1 .username').delay(400).fadeIn(400);
    $('.d1_footer1 .avator img').delay(400).fadeIn(400);
    
    if (_item.field_anonymous_flaged === null) _item.field_anonymous_flaged = 0;
    var like_counts = parseInt(_item.field_anonymous_flaged);
    $('.d1_msg .like_counts').attr('data-counts', like_counts).html(like_counts);
    $('.input_nid').eq(0).val(_item.nid);
    $(".comment_form").validate({
        rules: {
            email: {
                required: true,
            },
            comment: "required"
        },
        messages: {
            email: "",
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
                            //$(this).after('<span>Please check your email to get validation mail.</span>');
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
    var _loadComment = function(){
        $.Comment(_item.nid).loadComment(function (data) {
            var comments_wrap = $('.comments_list').empty().fadeOut();
            for (var c in data) {
                var date_media_date = new Date(parseInt(data[c].field_post_date + '000'));
                var media_date_year = date_media_date.getFullYear();
                var media_date_month = date_media_date.getMonth();
                var media_date_day = date_media_date.getDate();
                var name = data[c].field_email.split('@');
                var classname = '';
                if(c == 0) classname = "first";
                if(c == (data.length-1)) classname = "last";
                comments_wrap.append('<div class="comment_item_wrap '+classname+'"><div class="comment_item"><div class="comment_title"><span class="name">' + name[0] + '</span><span class="date">' + media_date_day + " " + monthShortName[media_date_month] + ", " + media_date_year + '</span></div><div class="comment_body">' + data[c].field_comment + '</div></div></div>');
            }
            var widnowWidth = $(window).width();
            $('.comment_item').width(widnowWidth);
            comments_wrap.fadeIn();
        });
    }
    _loadComment();

    var like_counts = parseInt(_item.field_flag_counter) + parseInt(_item.field_anonymous_flaged);
    $('.d1_msg .like_counts').attr('data-counts', like_counts).html(like_counts);
    $('.input_nid').val(_item.nid);
    $('.d1_col1_wrap .btn_like').unbind('click');
    $('.d1_col1_wrap .btn_like').bind('click', function () {
        
        
        var apipath = siteurl + "data/third_content";
        var nid = $('.input_nid').eq(0).val();
        var cookie = $.cookie('like_' + nid);
        var like = {
            nid: nid
        };
        var _this = $(this);
        if (!cookie) {
            $.ajax({
                url: apipath + "/node/likeit",
                dataType: "JSON",
                type: "POST",
                data: JSON.stringify(like),
                contentType: "application/json",
                success: function (data) {
                    $.cookie('like_' + nid, 1);
                    var count_wrap = _this.find('.like_counts');
                    count_wrap.attr('data-counts',data.count);
                    count_wrap.animate({
                        'opacity': 0
                    }, function () {
                        _this.find('.like_counts').html(data.count);
                        _this.find('.like_icon').transition({
                            perspective: '9000px',
                            rotateY: '180deg',
                            opacity: 1
                        }, 700);;
                        $(this).animate({
                            'opacity': 1
                        });
                    });
                }
            });
        } else {
            var count_wrap = _this.find('.like_counts');
            var count = parseInt(count_wrap.attr('data-counts'));
            count_wrap.animate({
                'opacity': 0
            }, function () {
                _this.find('.like_counts').html(count);
                _this.find('.like_icon').transition({
                    perspective: '9000px',
                    rotateY: '180deg',
                    opacity: 1
                }, 700);;
                $(this).animate({
                    'opacity': 1
                });
            });
        }
    });
}

//next
function goleft() {
    if (clickable == true) {
        datalistIndex++;
        _item = datalist[datalistIndex];
        loadcomment(_item);
        clickable = false;
        $('.d1_mid .dc3_wrap').eq(0).css({
            left: pic1_left * 2
        }).animate({
            'opacity': 0.3
        });
        $('.d1_mid .dc3_wrap').eq(1).css({
            left: pic1_left
        }).animate({
            'opacity': 0.3
        });
        $('.d1_mid .dc3_wrap').eq(2).css({
            left: pic2_left
        }).animate({
            'opacity': 1
        });

        //add
        var mid_height = window.innerHeight - $('.d1_header').height() - $('.d1_footer2').height() - 2;
        $('.d1_mid').append('<div class="dc3_wrap" />');
        $('.d1_mid .dc3_wrap').eq(3).height(mid_height).css({
            left: pic3_left,
            'opacity': 0
        }).animate({
            'opacity': 0.3
        });
        $('.d1_mid .dc3_wrap').eq(0).remove();

        $('.cube1').transition({
            z: -cube1_width / 2,
            rotateY: -90
        });

        $('.cube2').transition({
            z: -cube1_width / 2,
            rotateY: -90
        });

        $('.cube3').transition({
            z: -cube1_width / 2,
            rotateY: -90
        });

        $('.cube1_face2,.cube1_face3,.cube2_face2,.cube2_face3,.cube3_face2,.cube3_face3').css({
            'background': '#333'
        });
        
        setTimeout(function () {

            $('.cube1_face2,.cube1_face3,.cube2_face2,.cube2_face3,.cube3_face2,.cube3_face3').css({
                'background': '#000'
            });
        }, 200);

        setTimeout(function () {
            moveDc1(2);
            moveDc2(2);
            moveDc3(2);
            //next data
            if (!_.isEmpty(datalist[datalistIndex + 1])) {
                renderMediaContent(datalist[datalistIndex + 1], 2);
            }

            //prev data
            renderMediaContent(datalist[datalistIndex-1],3);

            if (datalistIndex + 2 == datalist.length) {
                loadSingleContent(datalist[datalistIndex].nid, 0);

            }

            clickable = true;
            $(".tapcover").show();
        }, 400);
        $.address.path(_item.nid);
        afterChangedPhoto();
    }
}


//prev
function goright() {
    if (clickable == true) {
        clickable = false;
        datalistIndex--;
        if (datalistIndex < 0) {
            datalistIndex = 0;
            clickable = true;
            return false;
        }
        _item = datalist[datalistIndex];
        loadcomment(_item);
        $('.d1_mid .dc3_wrap').eq(0).css({
            left: pic2_left
        }).animate({
            'opacity': 1
        });
        $('.d1_mid .dc3_wrap').eq(1).css({
            left: pic3_left
        }).animate({
            'opacity': 0.3
        });
        $('.d1_mid .dc3_wrap').eq(2).css({
            left: pic3_left * 2
        }).animate({
            'opacity': 0.3
        });
        var mid_height = window.innerHeight - $('.d1_header').height() - $('.d1_footer2').height() - 2;
        $('.d1_mid .dc3_wrap').eq(0).before('<div class="dc3_wrap" />');
        $('.d1_mid .dc3_wrap').eq(0).height(mid_height).css({
            left: pic1_left,
            opacity: 0
        }).animate({
            opacity: 0.3
        });
        $('.d1_mid .dc3_wrap').eq(3).remove();

        $('.cube1').transition({
            z: -cube1_width / 2,
            rotateY: 90
        });

        $('.cube2').transition({
            z: -cube1_width / 2,
            rotateY: 90
        });

        $('.cube3').transition({
            z: -cube1_width / 2,
            rotateY: 90
        });

        $('.cube1_face2,.cube1_face3,.cube2_face2,.cube2_face3,.cube3_face2,.cube3_face3').css({
            'background': '#333'
        });

        setTimeout(function () {

            $('.cube1_face2,.cube1_face3,.cube2_face2,.cube2_face3,.cube3_face2,.cube3_face3').css({
                'background': '#000'
            });
        }, 200);

        setTimeout(function () {
            moveDc1(3);
            moveDc2(3);
            moveDc3(3);
            //prev data
            if (!_.isEmpty(datalist[datalistIndex - 1])) {
                renderMediaContent(datalist[datalistIndex - 1], 3);
            }
            //next data
            renderMediaContent(datalist[datalistIndex + 1],2);
            if (datalistIndex - 2 == 0) {
                loadSingleContent(datalist[datalistIndex].nid, 0);

            } else {
                clickable = true;
            }

            $(".tapcover").show();
        }, 400);
        $.address.path(_item.nid);
        afterChangedPhoto();
    }
}

function afterChangedPhoto(){
    $('.dc3_wrap').unbind('click');
    $('.dc3_wrap').eq(0).click(function () {
        $('.nav_arrow_left').eq(0).click();
    });
    $('.dc3_wrap').eq(2).click(function () {
        $('.nav_arrow_right').eq(0).click();
    });
}

function bindShortcutEvent() {
    $('textarea,input').bind('keydown', function () {
        $('.comment_form .button_input').removeAttr('disabled');
    });
}