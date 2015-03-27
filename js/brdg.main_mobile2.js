/****************************************************
	Define brdg variables
****************************************************/
var monthShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var pic1_left = -$(window).width()*0.85;
var pic2_left = $(window).width()*0.05;
var pic3_left = $(window).width()*0.95;
var cube1_width;
var cube2_width;
var comment_cube_width;
var loaded = 0;
var perpage = 5;
var siteurl = "http://"+window.location.hostname + '/brdg/';
var imageWidth = '100%';
var current_day;
var datalist = new Array();
var datalistIndex = 0;
var clickable = true;
$width = $(window).width();
var vg;
var current_day;
var loaded = 0;
var imageWidth;
var submiting = true;
var current_type = 0;

/****************************************************
	Initialization
****************************************************/
brdgInit();
function brdgInit(){
	
		//alert($(window).height());
	setTimeout(function(){
		window.scrollTo(0, 1);
		windowResize();
		bindTextClockEvent();
		$('.time_clock').brdgClock();
	},1000);
	$(window).resize(windowResize);
	loadData(siteurl+'data/third_content/all_resources?perpage='+perpage+"&page=0");
}




function renderItem(data){
	for(var i in data)
	{
		// Get unique id
		var nid = data[i].nid;
		// Get media type
		var media_type = data[i].source_type;
		// Get image
		var media_image = data[i].field_media_image;
		// Get sound cloud
		var media_sound = data[i].field_sould;
		// Get sound cloud thumbnail
		var media_sound_thumbnail = data[i].field_sound_thumbnail;
		// Get video
		var media_video = data[i].field_video;
		// Get video
		var media_video_thumbnail = data[i].field_video_thumbnail;
		// Get post date
		var media_date = data[i].post_date;
		// Get media content
		var media_body = data[i].field_body;
		// Get user name
		var user_name = data[i].field_user_name;
		// Get user avatar
		var user_avatar = data[i].field_user_profile_image;
		// Get user city
		var user_city = data[i].field_user_city;
		// Get like counts
		var like_counts = parseInt(data[i].field_anonymous_flaged) + parseInt(data[i].field_flag_counter);
		
		
		// Parse datetime
		var str_media_date =  media_date.split(' ')[0].replace(/-/g,"/");
		var date_media_date = new Date(str_media_date);
		media_date_year = date_media_date.getFullYear();
		media_date_month = date_media_date.getMonth()+1;
		media_date_day = date_media_date.getDate();
		
		// Render date cover
		if(Date.parse(current_day) != Date.parse(date_media_date))
		{
			current_day = date_media_date;
			var daySpan  = $('<div class="date_span"><div class="full_time">'+media_date_day+'/'+media_date_month+'/'+media_date_year+'</div><div class="day">'+media_date_day+'</div><div class="city">paris - shanghai</div></div>').appendTo(".vgrid");
			var spanWidth = $(window).width() - $('.home_header').width();
			var spanMargin = (spanWidth - 110)/2;
			daySpan.css({'width':spanWidth,'height':spanWidth});
			daySpan.find('.full_time').css({'margin-top':spanMargin});
			daySpan.delay(1000).fadeIn();
		}
		
		// Parse media type
		var media_source;
		if(media_type.toLowerCase() == 'instagram')
		{
			media_source = "instagram";
		}
		
		if(media_type.toLowerCase() == 'soundcloud')
		{
			media_source = "soundcloud";
		}
		
		if(media_video.length > 0)
		{
			if(media_video[0].indexOf('youtube') > 0)
			{
				media_source = "youtube";
			}
			
			if(media_video[0].indexOf('dailymotion') > 0)
			{
				media_source = "dailymotion";
			}
			
			if(media_video[0].indexOf('vimeo') > 0)
			{
				media_source = "vimeo";
			}
			media_image = data[i].field_video_thumbnail;
		}
		
		var v_item = $('<div id="media_' + nid + '" class="v_item ' + media_source + '"><a><img  src="' + media_image + '"/></a><div class="item_info"><div class="city">paris</div><div class="source"><div class="' + media_source + '"></div></div><div class="full_time">'+formateNumber(media_date_day)+'/'+formateNumber(media_date_month)+'/'+media_date_year+'</div></div><div class="item_icon"><div class="' + media_source + '"></div></div></div>').appendTo($('.vgrid'));
		v_item.data('imgdata',{'nid':nid});
	}
	setTimeout(itemAnimate,1500);
}

function itemAnimate(){
	var items = $('.v_item');
	var i = 0;
	items.each(function(){
		var _c = $(this);
		if(!_c.hasClass('opened'))
		{
			_c.css({'display':'none','rotateY':'-90deg','opacity':0,'width':0,'height':imageWidth});
			_c.find('img').css({'width':imageWidth,'height':imageWidth});
			setTimeout(function(){
				_c.addClass('opened');
				_c.css({'display':'block'}).animate({'width':imageWidth},10);
				_c.transition({
				  perspective: '9000px',
				  rotateY: '0deg',
				  opacity: 1
				},400);
			}, (i * (200 || 0)));
			i ++;
		}
	});
	
	
	
}

/*
* Load photo wall
* @param url 
* The ajax request url
*/
function loadData(url){
	// Destory exsit content
	$('.vgrid').empty();
	$.ajax({
		url: url,
		dataType: 'json',
		method: "post",
		success: function (data) {
			$('.loading').css({'top':'-100%'});
			loaded = 1;
			loadComplete();
			renderItem(data);
			setTimeout(function(){
				itemAnimate();
			},1500);
			
			bindvgridEvent();
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
function openBigImage(media_data){
	
	var width = $(window).width();
	$('.d1').css({'left':0});
	$('.home').css('margin-left',-width);
	
	$( '.dc3_wrap' ).html('').removeData("fillmore");
	//windowResize();
	
	renderMediaContent(media_data,1);
	loadcomment(media_data);
	$('.dc3_wrap' ).show();
	$('.dc3_wrap' ).eq(0).animate({'opacity':0.3});
	$('.dc3_wrap' ).eq(2).animate({'opacity':0.3});
	//还需要判断第一个最后一个得情况
	//next data
	if(datalistIndex<datalist.length)
		renderMediaContent(datalist[datalistIndex+1],2);
	//prev data
	if(datalistIndex > 0)
		renderMediaContent(datalist[datalistIndex-1],4);
	
	$('.dc3_wrap').eq(2).click(function(){
		$('.nav_arrow_right').eq(0).click();
	});
	$('#dc3_arrow').css({'opacity':0.5,'display':'block'});
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
function renderMediaContent(media_data, face){
	//console.log(media_data);
	var imgIndex = face;
	if(face == 4)
	{
		imgIndex = 0;
	}
	var user_url;
	
	if(media_data.source_type.toLowerCase() == 'instagram')
	{
		media_data.media_source = "instagram";
	}
	
	if(media_data.source_type.toLowerCase() == 'soundcloud')
	{
		media_data.media_source = "soundcloud";
	}
	
	if(media_data.field_video)
	{
		if(media_data.field_video.indexOf('youtube') > 0)
		{
			media_data.media_source = "youtube";
		}
		if(media_data.field_video.indexOf('youku') > 0)
		{
			media_data.media_source = "youku";
		}
		if(media_data.field_video.indexOf('vimeo') > 0)
		{
			media_data.media_source = "vimeo";
		}
		if(media_data.field_video.indexOf('dailymotion') > 0)
		{
			media_data.media_source = "dailymotion";
		}
	}
	// Parse Date
	var str_media_date =  media_data.post_date.replace(/-/g,"/");
	var date_media_date = new Date(str_media_date);
	var media_date_year = date_media_date.getFullYear();
	var media_date_month = date_media_date.getMonth()+1;
	var media_date_day = date_media_date.getDate();
	var media_date_hrs = date_media_date.getHours();
	var media_date_min = date_media_date.getMinutes();
	var bigImage = media_data.field_media_image.replace('files/','files/styles/400_400/public/');
	var p_url = siteurl + "/#/" + media_data.nid;
	
	updateDay(media_date_day);
	if(media_data.media_source == 'instagram')
	{
		user_url = "http://web.stagram.com/n/"+media_data.field_user_name;
	}
	if(media_data.field_anonymous_flaged == null) media_data.field_anonymous_flaged = 0;
	var like_counts = parseInt(media_data.field_flag_counter) + parseInt(media_data.field_anonymous_flaged);
	
	// Render content
	$( '.dc3_wrap' ).eq(imgIndex).html('');
	if(media_data.media_source == 'youtube')
	{
		var url = media_data.field_video.split('=');
		$( '.dc3_wrap' ).eq(imgIndex).html('<iframe width="100%" height="100%"  src="http://www.youtube.com/embed/'+ url[1] +'" frameborder="0" allowfullscreen></iframe>');
	}
	else if(media_data.media_source == 'vimeo')
	{
		$( '.dc3_wrap' ).eq(imgIndex).html('<iframe width="100%"  height="100%" src="'+media_data.field_video.replace('vimeo.com','player.vimeo.com/video')+'" frameborder="0" allowfullscreen></iframe>');
	}
	else if(media_data.media_source == 'youku')
	{
		var url = media_data.field_video.split('id_');
		url = url[1].split('.html');
		$( '.dc3_wrap' ).eq(imgIndex).html('<iframe width="100%" height="90%" style="margin-top:5%;" src="http://player.youku.com/embed/'+ url[0] +'" frameborder="0" allowfullscreen></iframe>');
	}
	else if(media_data.media_source == 'dailymotion')
	{
		var url = media_data.field_video.split('video/');
		url = url[1].split('_');
		url = url[0];
		url = "http://www.dailymotion.com/embed/video/" + url;
		$( '.dc3_wrap' ).eq(imgIndex).html('<iframe width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen></iframe>');
	}
	else if(media_data.media_source == 'soundcloud')
	{
		$( '.dc3_wrap' ).eq(imgIndex).html('<iframe width="100%" height="166" scrolling="no" frameborder="no" class="soundcloud-iframe" src="https://w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/85228326"></iframe>');
		var height = (window.innerHeight - 166)/2;
		$( '.dc3_wrap' ).eq(imgIndex).find('.soundcloud-iframe').css({'margin-top':height});
		// show the soundcloud thumbnail in the next slider
		if(face == 2)
		{
			$( '.dc3_wrap' ).eq(imgIndex).find('.soundcloud-iframe').hide();
			$( '.dc3_wrap' ).eq(imgIndex).fillmore( { src: bigImage } );
		}
	}
	else
	{
		$( '.dc3_wrap' ).eq(imgIndex).removeData('fillmore');
		$( '.dc3_wrap' ).eq(imgIndex).fillmore( { src: bigImage } );
	}
	
	clickable = true;
	//$('.dc2_bigcube_face' + face + ' .avator img').attr('src',media_data.user_avatar);
	//$('.dc2_bigcube_face' + face + ' .username').html('<a target="_blank" href="' + user_url + '">' + media_data.field_user_name + '</a>');
	//$('.dc2_bigcube_face' + face + ' .body').html(media_data.field_body.replace('#9263',''));
	//$('.dc2_bigcube_face' + face + ' input[name="nid"]').val(media_data.nid);
	$('.cube1_face' + face + ' .day').html(media_date_day);
	$('.cube1_face' + face + ' .date').html(formateNumber(media_date_day)+'/'+formateNumber(media_date_month)+'/'+media_date_year);
	$('.cube2_face' + face + ' .time_clock').attr('data-hrs',media_date_hrs);
	$('.cube2_face' + face + ' .time_clock').attr('data-min',media_date_min);
	$('.cube2_face' + face + ' .time_text').html(formateNumber(media_date_hrs)+'H'+formateNumber(media_date_min));
	$('.cube2_face' + face + ' .time_clock').brdgClock();	
	$('.cube3_face' + face).html('').append('<div>#9263</div>');
	$('.cube3_face' + face + ' div').addClass(media_data.source_type.toLowerCase());
	
	
	if(face == 1)
	{
		var domainbigImage = bigImage.replace('64.207.184.106','www.polyardshanghai.com'); //only for testing, beacuse facebook need real domain.
		var share_facebook = "http://www.facebook.com/sharer/sharer.php?s=100&p[title]=" + encodeURIComponent(media_data.field_body) + "&p[summary]=" + encodeURIComponent(media_data.field_body) + "&p[url]=" + encodeURIComponent(p_url) + "&p[images][0]=" + encodeURIComponent(domainbigImage);
		var share_google = "https://plusone.google.com/_/+1/confirm?hl=en&url=" + encodeURIComponent(p_url);
		var share_twitter = "http://twitter.com/share?text="+ encodeURIComponent(media_data.field_body) +"&url=" + encodeURIComponent(p_url) +"&img=" + encodeURIComponent(domainbigImage);
		var share_weibo = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(media_data.field_body) + "&pic=" + encodeURIComponent(domainbigImage) + "&url=" + encodeURIComponent(p_url);
		var share_pinterest = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(p_url) + "&media=" + encodeURIComponent(domainbigImage) + "&description=" + encodeURIComponent(media_data.field_body);
		var share_huaban = "http://huaban.com/bookmarklet/?url=" + encodeURIComponent(p_url) + "&media=" + encodeURIComponent(domainbigImage);
		
		// Render Sharing Buttons
		$('.d1_msg .facebook').attr('href',share_facebook);
		$('.d1_msg .google').attr('href',share_google);
		$('.d1_msg .twitter').attr('href',share_twitter);
		$('.d1_msg .weibo').attr('href',share_weibo);
		$('.d1_msg .pinterest').attr('href',share_pinterest);
		$('.d1_msg .huaban').attr('href',share_huaban);
		
		
		$('.d1_msg .like_counts').attr('data-counts', like_counts).html('+');
		$('.input_nid').val(media_data.nid);
		
		
	}
	
	
	
}

function bindDcEventOnce(){
	//alert(1);
	//$('.d1_col1_wrap').click(function(){alert(1);});
	// Ajax submit comments content
	
	

}

function bindvgridEvent(){
	//vg = $('.vgrid').vgrid({
//		easing: "easeOutQuint",
//		time: 0,
//		delay: 0,
//		fadeIn: {
//			time: 0,
//			delay: 0
//		}
//	});
		
	
		
	$('.category li,.logo,.city_time').unbind('click');
	//filter all
	$('.logo').click(function(){
		$('.category a').removeClass('actived');
		$('.category a').eq(0).addClass('actived');
		current_day = null;
		current_type = 0;
		loadData(siteurl+'data/third_content/all_resources?page=0');
	});
	$('.category li').eq(0).click(function(){
		$('.category a').removeClass('actived');
		$('a',this).addClass('actived');
		current_day = null;
		current_type = 0;
		loadData(siteurl+'data/third_content/all_resources?perpage='+perpage+'&page=0');
	});
	//filter picture
	$('.category li').eq(1).click(function(){
		$('.category a').removeClass('actived');
		$('a',this).addClass('actived');
		current_day = null;
		current_type = 1;
		loadData(siteurl+'data/third_content/services_picture?perpage='+perpage+'&page=0');
	});
	
	//filter videos
	$('.category li').eq(2).click(function(){
		$('.category a').removeClass('actived');
		$('a',this).addClass('actived');
		current_day = null;
		current_type = 3;
		loadData(siteurl+'data/third_content/services_video?perpage='+perpage+'&page=0');
	});
	//filter music
	$('.category li').eq(3).click(function(){
		$('.category a').removeClass('actived');
		$('a',this).addClass('actived');
		current_day = null;
		current_type = 2;
		loadData(siteurl+'data/third_content/services_sould?perpage='+perpage+'&page=0');
	});
	
	$('.city_time').click(function(){
		var cityid = $(this).attr('data-city');
		$('.category a').removeClass('actived');
		$('a',this).addClass('actived');
		current_day = null;
		loadData(siteurl+'data/third_content/all_resources?perpage='+perpage+'&page=0&city_id='+cityid);
	});
	
	
	/****************************************************
	bind data
	****************************************************/
	$('.vgrid .v_item').unbind('click');
	$('.vgrid .v_item').bind('click',function(){
		current_item = $(this);
		//current data
		var media_data = $(this).data('imgdata');
		$('<div class="loading2"></div>').appendTo(current_item).css({'display':'none','width':current_item.width(),'height':current_item.width()}).fadeIn();
		
		openSignleContent(media_data.nid,1);
		return false;
	});
	
	bindDcEventOnce();
	
}

/*
* Load Single Content
* @param media_data 
* Media Date, It's Object type
* @param face 
* Cube face
*/
function openSignleContent(nid,isOpen){
	clickable = false;
	$('.loading2').fadeIn();
	console.log("before loadid:"+datalistIndex);
	var _currentDatalistIndex =  datalistIndex;
	$.ajax({
		url: siteurl+"data/third_content/node/pre_next_node",
		dataType: "JSON",
		type: "POST",
		data: JSON.stringify({nid:nid,number:10,resource_type:current_type}),
		contentType: "application/json",
		success: function (data) {
			$('.loading2').fadeOut();
			datalist.length = 0; //empty array
			data.next.reverse();
			for(var d in data.next)
			{
				datalist.push(data.next[d]);
			}
			
			datalist.push(data.current);
			
			for(var d in data.pre)
			{
				datalist.push(data.pre[d]);
			}
			
			var _indexOffset = datalistIndex - _currentDatalistIndex;
			datalistIndex = data.next.length + _indexOffset;
			console.log("after loadid:"+datalistIndex);
			for(var d in datalist)
			{
				var url = datalist[d].field_media_image;
				var img = new Image();
 				img.src = url;
			}
			
			console.log(datalist);
			console.log(datalistIndex);
			if(isOpen)
			{
				openBigImage(datalist[datalistIndex]);
			}
			
			clickable = true;
		}
	 });
}


//go right
$( document ).live( "swiperight", function(e) {
	if(e.target.className == 'tapcover' || e.target.className == 'nav_arrow'){
		if(clickable==true)
		{
			clickable = false;
			datalistIndex --;
			_item = datalist[datalistIndex];
			loadcomment(_item);
			$( '.d1_mid .dc3_wrap' ).eq(0).css({left:pic2_left}).animate({'opacity':1});
			$( '.d1_mid .dc3_wrap' ).eq(1).css({left:pic3_left}).animate({'opacity':0.3});
			$( '.d1_mid .dc3_wrap' ).eq(2).css({left:pic3_left*2}).animate({'opacity':0.3});
			
			
			
			
			var mid_height = window.innerHeight - $('.d1_header').height() - $('.d1_footer2').height() - 2;
			$( '.d1_mid .dc3_wrap' ).eq(0).before('<div class="dc3_wrap" />');
			$( '.d1_mid .dc3_wrap' ).eq(0).height(mid_height).css({left:pic1_left,opacity:0}).animate({opacity:0.3});
			$( '.d1_mid .dc3_wrap' ).eq(3).remove();
			
			$('.cube1').transition({
			  z: -cube1_width/2,
			  rotateY: 90
			});
			
			$('.cube2').transition({
			  z: -cube1_width/2,
			  rotateY: 90
			});
			
			$('.cube3').transition({
			  z: -cube1_width/2,
			  rotateY: 90
			});
			
			$('.cube1_face2,.cube1_face3,.cube2_face2,.cube2_face3,.cube3_face2,.cube3_face3').css({'background':'#333'});
			
			setTimeout(function(){
				
				$('.cube1_face2,.cube1_face3,.cube2_face2,.cube2_face3,.cube3_face2,.cube3_face3').css({'background':'#000'});
			},200);
			
			setTimeout(function(){
				moveDc1(2);
				moveDc2(2);
				moveDc3(2);	
			},400);
			
			//prev data
			if(!_.isEmpty(datalist[datalistIndex-1]))
			{
				renderMediaContent(datalist[datalistIndex-1],4);
			}
			//next data
			//renderMediaContent(datalist[datalistIndex],2);
			if(datalistIndex-2 == 0)
			{
				openSignleContent(datalist[datalistIndex].nid,0);
				
			}
			else
			{
				clickable = true;
			}
			
			
			
		}
	}
	if(e && e.target.className)
	{
		if(e.target.className.indexOf('comment') != -1){
			var left = $('.comments_list').offset().left;
			console.log(left);
			if(left<0)
			{
				$('.comments_list').animate({'margin-left':left+$(window).width()});
			}
		}
	}
});

//go left
$( document ).live( "swipeleft", function(e) {
console.log(e);
	if(e.target.className == 'tapcover' || e.target.className == 'nav_arrow'){
		if(clickable==true)
		{
			datalistIndex ++;
			_item = datalist[datalistIndex];
			loadcomment(_item);
			clickable = false;
			$( '.d1_mid .dc3_wrap' ).eq(0).css({left:pic1_left*2}).animate({'opacity':0.3});
			$( '.d1_mid .dc3_wrap' ).eq(1).css({left:pic1_left}).animate({'opacity':0.3});
			$( '.d1_mid .dc3_wrap' ).eq(2).css({left:pic2_left}).animate({'opacity':1});
			
			//add
			var mid_height = window.innerHeight - $('.d1_header').height() - $('.d1_footer2').height() - 2;
				$( '.d1_mid' ).append('<div class="dc3_wrap" />');
				$( '.d1_mid .dc3_wrap' ).eq(3).height(mid_height).css({left:pic3_left,'opacity':0}).animate({'opacity':0.3});
				$( '.d1_mid .dc3_wrap' ).eq(0).remove();
				
				$('.cube1').transition({
				  z: -cube1_width/2,
				  rotateY: -90
				});
				
				$('.cube2').transition({
				  z: -cube1_width/2,
				  rotateY: -90
				});
				
				$('.cube3').transition({
				  z: -cube1_width/2,
				  rotateY: -90
				});
				
				$('.cube1_face2,.cube1_face3,.cube2_face2,.cube2_face3,.cube3_face2,.cube3_face3').css({'background':'#333'});
				
				setTimeout(function(){
					
					$('.cube1_face2,.cube1_face3,.cube2_face2,.cube2_face3,.cube3_face2,.cube3_face3').css({'background':'#000'});
				},200);
				
				setTimeout(function(){
					moveDc1(2);
					moveDc2(2);
					moveDc3(2);
				},400);
				
				//next data
				if(!_.isEmpty(datalist[datalistIndex+1]))
				{
					renderMediaContent(datalist[datalistIndex+1],2);
				}
				
				//prev data
				//renderMediaContent(datalist[datalistIndex-1],4);
				
				if(datalistIndex+2 == datalist.length)
				{
					openSignleContent(datalist[datalistIndex].nid,0);
					
				}
				
				clickable = true;
		}
	}
	if(e && e.target.className){
		if(e.target.className.indexOf('comment') != -1){
			var left = $('.comments_list').offset().left;
			if($(e.target).parent().nextAll('.comment_item').length > 0)
				$('.comments_list').animate({'margin-left':left-$(window).width()});
		}
	}
});

checkOrientation();
$( window ).on( "orientationchange", function( event ) {
	checkOrientation();
});


$('.v_item').on('tap',function(){
	windowResize();
	$('.home').fadeOut();
	$('.d1').fadeIn(function(){
		
		$('.cube1').transition({
		  z: -cube1_width/2,
		  rotateY: 0
		});
		
		$('.cube2').transition({
		  z: -cube1_width/2,
		  rotateY: 0
		});
		
		$('.cube3').transition({
		  z: -cube3_width/2,
		  rotateY: 0
		});
		
		$('.cube1_face1').css({rotateY: 0,z: cube1_width/2});
		$('.cube1_face2').css({rotateY: 90,z: cube1_width/2});
		$('.cube1_face3').css({rotateY: -90,z: cube1_width/2});
		
		$('.cube2_face1').css({rotateY: 0,z: cube3_width/2});
		$('.cube2_face2').css({rotateY: 90,z: cube3_width/2});
		$('.cube2_face3').css({rotateY: -90,z: cube3_width/2});
		
		$('.cube3_face1').css({rotateY: 0,z: cube3_width/2});
		$('.cube3_face2').css({rotateY: 90,z: cube3_width/2});
		$('.cube3_face3').css({rotateY: -90,z: cube3_width/2});
		
		
	});
	
	
		
});

function moveDc1(face){
	var new_cube1 = $('<div />',{'class':'cube1'}).hide().appendTo('.cube_wrap1');
	var face1 = $('<div />',{'class':'cube1_face1 photo_date'}).appendTo(new_cube1);
	var face2 = $('<div />',{'class':'cube1_face2 photo_date'}).appendTo(new_cube1);
	var face3 = $('<div />',{'class':'cube1_face3 photo_date'}).appendTo(new_cube1);
	face1.html($('.cube1_face'+face).html());
	face2.html($('.cube1_face'+face).html());
	face3.html($('.cube1_face'+face).html());
	new_cube1.transition({
	  z: -cube1_width/2,
	  rotateY: 0
	},0);
	$('.cube1_face1').css({rotateY: 0,z: cube1_width/2});
	$('.cube1_face2').css({rotateY: 90,z: cube1_width/2});
	$('.cube1_face3').css({rotateY: -90,z: cube1_width/2});
	
	new_cube1.show();
	$('.cube1').eq(0).remove();
}

function moveDc2(face){
	var new_cube2 = $('<div />',{'class':'cube2'}).hide().appendTo('.cube_wrap2');
	var face1 = $('<div />',{'class':'cube2_face1 photo_time'}).appendTo(new_cube2);
	var face2 = $('<div />',{'class':'cube2_face2 photo_time'}).appendTo(new_cube2);
	var face3 = $('<div />',{'class':'cube2_face3 photo_time'}).appendTo(new_cube2);
	face1.html($('.cube2_face'+face).html());
	face2.html($('.cube2_face'+face).html());
	face3.html($('.cube2_face'+face).html());
	new_cube2.transition({
	  z: -cube1_width/2,
	  rotateY: 0
	},0);
	$('.cube2_face1').css({rotateY: 0,z: cube1_width/2});
	$('.cube2_face2').css({rotateY: 90,z: cube1_width/2});
	$('.cube2_face3').css({rotateY: -90,z: cube1_width/2});
	$('.time_clock').brdgClock();
	new_cube2.show();
	$('.cube2').eq(0).remove();
}

function moveDc3(face){
	var new_cube3 = $('<div />',{'class':'cube3'}).hide().appendTo('.cube_wrap3');
	var face1 = $('<div />',{'class':'cube3_face1 source twitter'}).appendTo(new_cube3);
	var face2 = $('<div />',{'class':'cube3_face2 source twitter'}).appendTo(new_cube3);
	var face3 = $('<div />',{'class':'cube3_face3 source twitter'}).appendTo(new_cube3);
	face1.html($('.cube3_face'+face).html());
	face2.html($('.cube3_face'+face).html());
	face3.html($('.cube3_face'+face).html());
	new_cube3.transition({
	  z: -cube1_width/2,
	  rotateY: 0
	},0);
	$('.cube3_face1').css({rotateY: 0,z: cube1_width/2});
	$('.cube3_face2').css({rotateY: 90,z: cube1_width/2});
	$('.cube3_face3').css({rotateY: -90,z: cube1_width/2});
	new_cube3.show();
	$('.cube3').eq(0).remove();
}

$('.d1_header .back').click(function(){
	$('.home').css({'margin-left':0});
	$('.d1').css({'left':'100%'});
});


function windowResize(){
	var widnowWidth = $(window).width();
	imageWidth = widnowWidth - 76;
	var mid_height = window.innerHeight - $('.d1_header').height() - $('.d1_footer2').height() - 2;
	$('.vgrid').css('min-height',window.innerHeight);
	$('.d1_mid,.dc3_wrap').height(mid_height);
	
	cube1_width = $('.cube_wrap1').width();
	cube3_width = $('.cube_wrap3').width();
	comment_cube_width = widnowWidth;
	
	d1_col1_wrap_width = $('.d1_col1_wrap').width();
	$('.d1_col1').width(d1_col1_wrap_width*2+1);
	$('.btn_like').width(d1_col1_wrap_width);
	$('.btn_close').width(d1_col1_wrap_width);
	
	var dc3_width = $(window).width()*0.9;
	$('.dc3_wrap').width(dc3_width);
	$('.dc3_wrap').eq(0).css({'left':-dc3_width+widnowWidth*0.05});
	$('.dc3_wrap').eq(1).css({'left':widnowWidth*0.05});
	$('.dc3_wrap').eq(2).css({'left':dc3_width+widnowWidth*0.05});
	
	$('.tapcover').height(mid_height - 50);
	
	$('.comment_item').width(widnowWidth);
}

//Left Text Time Clock
function bindTextClockEvent()
{
	$('#paris_time').textClock(1);
	$('#shanghai_time').textClock(8);
	setInterval(function(){
		$('#paris_time').textClock(1);
		$('#shanghai_time').textClock(8);
	},1000*30);
}

$('.nav_arrow_left').click(function(){
	$( document ).trigger('swiperight');
});

$('.nav_arrow_right').click(function(){
	$( document ).trigger('swipeleft');
});

$('.btn_comments').click(function(){
	$('.d1_footer1').animate({'bottom':-200,'opacity':0},1000,function(){
		
		
	});
	var d1_col1_wrap_width = $('.btn_like').width()+1;
	$('.d1_col1').animate({'margin-left':-d1_col1_wrap_width});
	var top = window.innerHeight-93;
	setTimeout(function(){
		$('.d1_msg').css({'width':'100%'});
		$('.d1_msg').animate({'height':top});
	},400);
	
	$(".comments_cube").animate({'margin-left':0},200);
	$(".tapcover").hide();
	
	var widnowWidth = $(window).width();
	$('.comment_item').width(widnowWidth);
	//$('.comments_cube').transition({
//	  z: -comment_cube_width/2,
//	  rotateY: 0
//	});

});

$('.btn_share').click(function(){
	$('.d1_footer1').animate({'bottom':-200,'opacity':0},1000);
	var d1_col1_wrap_width = $('.btn_like').width()+1;
	$('.d1_col1').animate({'margin-left':-d1_col1_wrap_width});
	var top = window.innerHeight-93;
	setTimeout(function(){
		$('.d1_msg').css({'width':'100%'});
		$('.d1_msg').animate({'height':top});
	},400);
	
	$(".comments_cube").animate({'margin-left':'-100%'},200);
	$(".tapcover").hide();
	
	//$('.comments_cube').transition({
//	  z: -comment_cube_width/2,
//	  rotateY: -90
//	});
});

$('.btn_close').click(function(){
	$('.d1_col1').animate({'margin-left':0});
	$('.d1_msg').delay(400).animate({'height':50},function(){
		$('.d1_msg').css({'width':'70%'});
	});
	$('.d1_footer1').animate({'bottom':51,'opacity':1},1000);	
	$(".tapcover").show();
});


//$(".v_item").each(function(i)
//{
//	var _c = $(this);
//	if(_c.hasClass('date_span'))
//	{
//		_c.css({'display':'block'});
//	}
//	else
//	{
//		_c.css({'display':'none','rotateY':'-90deg','opacity':0});
//	}
//	setTimeout(function(){
//		_c.css({'display':'block'});
//		_c.transition({
//		  perspective: '9000px',
//		  rotateY: '0deg',
//		  opacity: 1
//		},700);
//	}, (i * (300 || 0)+1000));
//});

function formateNumber(number)
{
	number = (number < 10) ? "0" + number : number;
	return number;
}

function updateDay(day) {
	var iDay = 0;
	
	var updateDayTO = setInterval(function(){
		iDay++;
		iDayText = (iDay < 10) ? "0" + iDay : iDay;
		$('.photo_date .day').html(iDayText);
		if(iDay == day)
		{
			clearInterval(updateDayTO);
		}
	},30);
};


$('body').infinitescroll({
	
	navSelector  	: "a#next_page:last",
	nextSelector 	: "a#next_page:last",
	itemSelector 	: "div",
	debug		 	: true,
	dataType	 	: 'json',
	state			:{ currPage: 0 },
	appendCallback	: false,
	path: ['/brdg/data/third_content/all_resources?perpage=5&page=',''],
	loading			: {img:'../images/loading2.gif',msgText:''}
}, function( data ) {
	if(data.lenght==0)
	{
		$('body').infinitescroll('destroy');
	}
	renderItem(data,'append');
	bindvgridEvent();
	//$('body').infinitescroll('pause');
	//Resume after 3 mins
	//setTimeout(function(){
//		//$('body').infinitescroll('resume');
//	},data.lenght*200);
});

function loadComplete(){
	if(loaded)
	{
		//$('.logo').css({'opacity':0});
		$('.logo_inner').fadeIn(function(){
			//$('.logo_loading').animate({'left':0,'top':0},function(){
//				$('.logo').css({'opacity':1});
//				$('.left_panel').fadeIn(function(){
//					$('.logo_loading').fadeOut();
//				});
//				$('#qLoverlay').fadeOut(500, function () {
//					$('#qLoverlay').remove();
//				});
//			});
			
			$('.logo_loading').fadeOut();
			$('#qLoverlay').fadeOut(500, function () {
				$('#qLoverlay').remove();
			});
		});
	}
}

function checkOrientation()
{
	if(window.innerHeight < window.innerWidth){
		$('.turnphone').show();
	}
	else
	{
		$('.turnphone').hide();
	}
	
	setTimeout(function()
	{
		var imageWidth = $(window).width() - 76;
		var _c = $('.v_item').add('.date_span');
		_c.find('img').css({'width':imageWidth,'height':imageWidth});
	},500);
}

$.address.externalChange(function(e){
	if(!_.isEmpty(e.pathNames[0]))
	{
		openSignleContent(e.pathNames[0],1);
	}
});


function loadcomment(_item){
	$('.input_nid').eq(0).val(_item.nid);
	$(".comment_form").validate({
			rules: {
				email: {
					required: true,
					email: true
				},
				comment: "required"
			},
			messages: {
				email: "Please enter your email",
				comment: "Please leave comments"
			},
			submitHandler: function (form) {
				if(submiting)
				{
					submiting = false;
					 var apipath = siteurl+"data/third_content";
					 var comment = {
						nid: $('input[name="nid"]').val(),
						comment_body: {und: [{value: $('textarea[name="comment"]').val(), summary: $('textarea[name="comment"]').val()}]},
						field_email: {und: [{value: $('input[name="email"]').val()}]}
					 };
					 
					 $.ajax({
						url: apipath + "/comment",
						dataType: "JSON",
						type: "POST",
						data: JSON.stringify(comment),
						contentType: "application/json",
						success: function (data) {
							if(data.cid)
							{
								//var comments_wrap = $('.dc2_bigcube_face' + 1 + ' .comments_list');
								//comments_wrap.prepend('<div class="comment_item"><div class="comment_title"><span class="name">' + $('.dc2_bigcube_face1 input[name="email"]').val() + '</span><span class="date">' + media_date_day + " " + monthShortName[media_date_month] + ", " + media_date_year + '</span></div><div class="comment_body">' + $('.dc2_bigcube_face1 textarea[name="comment"]').val() + '</div></div>');
								$('.comment_form .loading').fadeOut(200);
								$('.comment_form .button_input').delay(200).fadeIn(200,function(){
									$(this).after('<span>Please check your email to get validation mail.</span>')
								});
								submiting = true;
							}
						},
						error: function(e)
						{
							$('.comment_form .loading').fadeOut(200);
							$('.comment_form .button_input').delay(200).fadeIn(200,function(){
								$(this).after('<span>Your Email is not allowed</span>')
							});
							submiting = true;
						}
					 });
					$('.form_item_submit span').remove();
					$('.comment_form .button_input').fadeOut(200);
					$('.comment_form .loading').delay(200).fadeIn(200);
				}
				
				return false;
				
			}
		});
		// Load comments
		$.ajax({
			url: siteurl+"data/third_content/source_content_comments",
			dataType: "JSON",
			method: 'GET',
			data: {nid: _item.nid},
			contentType: "application/json",
			success: function(data) {
				var comments_wrap = $('.comments_list').empty();
				
				for(var c in data)
				{
					var date_media_date = new Date(parseInt(data[c].field_post_date+'000'));
					var media_date_year = date_media_date.getFullYear();
					var media_date_month = date_media_date.getMonth();
					var media_date_day = date_media_date.getDate();
					comments_wrap.append('<div class="comment_item"><div class="comment_title"><span class="name">'+data[c].field_email+'</span><span class="date">' + media_date_day + " " + monthShortName[media_date_month] + ", " + media_date_year + '</span></div><div class="comment_body">' + data[c].field_comment + '</div></div>');
				}
			}
		});	
		
	var like_counts = parseInt(_item.field_flag_counter) + parseInt(_item.field_anonymous_flaged);
	$('.d1_msg .like_counts').attr('data-counts', like_counts).html('+');
	$('.input_nid').val(_item.nid);
	$('.d1_col1_wrap .btn_like').unbind('click');
	$('.d1_col1_wrap .btn_like').bind('click',function(){
		var apipath = siteurl+"data/third_content";
		var nid = $('.input_nid').eq(0).val();
		var cookie = $.cookie('like_'+nid);
		var like = {content_id: nid, flag_name: 'like', uid: 0, action: 'flag'};
		var _this = $(this);
		if(!cookie)
		{
		$.ajax({
			url: apipath + "/flag/flag",
			dataType: "JSON",
			type: "POST",
			data: JSON.stringify(like),
			contentType: "application/json",
			success: function (data) {
				if(data[0] == true)
				{
					var count_wrap = _this.find('.like_counts');
					var count = parseInt(count_wrap.attr('data-counts'));
					count ++;
					count_wrap.attr('data-counts',count);
					count_wrap.animate({'opacity':0},function(){
						_this.find('.like_counts').html(count);
						_this.find('.like_icon').transition({
						  perspective: '9000px',
						  rotateY: '180deg',
						  opacity: 1
						},700);;
						$(this).animate({'opacity':1});
					});
					
					
					
				}
				
			}
		 });
		}
		else
		{
			var count_wrap = _this.find('.like_counts');
			var count = parseInt(count_wrap.attr('data-counts'));
			count_wrap.animate({'opacity':0},function(){
				_this.find('.like_counts').html(count);
				_this.find('.like_icon').transition({
				  perspective: '9000px',
				  rotateY: '180deg',
				  opacity: 1
				},700);;
				$(this).animate({'opacity':1});
			});
		}
	});
}
