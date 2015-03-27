/****************************************************
	Define brdg variables
****************************************************/
var monthShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var clickable_left = true;
var clickable_right = true;
var $width = $(window).width();
var vg;
var current_item;
var pre_item = new Array();
var next_item = new Array();
var current_day;
var loaded = 0;
var siteurl = "http://"+window.location.hostname + '/brdg';
var imageWidth;
var perpage = 10;
var lastNid;
var transTimeout;
var datalist = new Array();
var datalistIndex;
var submiting = true;
var isoTimeout;
var current_type = 0;
var animating = 1;

/****************************************************
	Initialization
****************************************************/
brdgInit();
function brdgInit(){
	//Mobile version redirect
	if($('html').hasClass('touch')){
		window.location.href="m";
	}
	resizeWindow();
	$(window).bind('resize',resizeWindow);
	bindShortcutEvent();
	bindTextClockEvent();
	loadData('data/third_content/all_resources?perpage='+perpage+"&page=0");
	
	setInterval(appendLatestItems,1000*60*1); 
}

$('#additem').click(function(){
	var v_item = $('<div class="v_item instagram opened" id="media_365" style="display: block; transform: rotateY(0deg) perspective(9000px); opacity: 1; width: 206px; height: 206px; position: absolute; left: 206px; top: 412px;"><a><img width="206" height="206" src="http://localhost/brdg/data/sites/default/files/styles/400_400/public/instagram/efe9db9c970a11e29ad022000a1f9a79_7.jpg?itok=rb6UvYc5" style="width: 206px; height: 206px;"></a><div class="item_info" style="display: none;"><div class="city">paris</div><div class="source"><div class="instagram"></div></div><div class="full_time">28/03/2013</div></div><div class="item_icon"><div class="instagram"></div></div></div>');
	vg.prepend(v_item);
	vg.vgrefresh();
});



/****************************************************
	Define brdg functions
****************************************************/
/*
* Fetach lastest items
* @param data 
* JSON Object
*/
function appendLatestItems(){
	$.ajax({
		url: "data/third_content/node/pre_next_node",
		dataType: 'json',
		data: JSON.stringify({nid:lastNid,number:20}),
		contentType: "application/json",
		type: "POST",
		success: function (data) {
			if(data.next.length > 0)
			{
				lastNid = data.next[data.next.length-1].nid;
				//console.log(lastNid);
//				var pageHeight =  (Math.ceil($('.vgrid > *').length / ($('.vgrid').width()/imageWidth))+1)*imageWidth;
//				$('.page').height(pageHeight); //重新计算高度
				current_day = null;
				if($('.vgrid').hasClass('isotope'))
				{
					$('.vgrid').isotope('destroy');
				}
				
				setTimeout(
				function(){
					renderItem(data.next,'prepend');
					//itemAnimate();
					bindvgridEvent();
				},1000);
			}
		}
	});
}

/*
* Render vgrid item
* @param data 
* JSON Object
*/
function renderItem(data,type){
	
	for(var i in data)
	{
		if(!lastNid)
		{
			lastNid = nid;
		}
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
		if(media_video == null) media_video = new Array();
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
			daySpan.css({'width':imageWidth,'height':imageWidth});
			daySpan.delay(1000).fadeIn();
			daySpan.attr('rel', date_media_date);
			// tony411
			daySpan.find('.full_time').css({'margin-top':(imageWidth-109)/2});
		}
		
		// Parse media type
		var media_source;
		if(media_type.toLowerCase() == 'instagram')
		{
			media_source = "instagram";
		}
		if(media_type.toLowerCase() == 'twitter tweets')
		{
			media_source = "twitter";
		}
		
		if(media_type.toLowerCase() == 'soundcloud')
		{
			media_source = "soundcloud";
			// wait jackey formate the img link;
			//media_image = data[i].field_sound_thumbnail;
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
			
			if(media_video[0].indexOf('youku') > 0)
			{
				media_source = "youku";
			}
			media_image = data[i].field_video_thumbnail;
		}
		
			//console.log(data[i].field_video);
		var v_item = $('<div id="media_' + nid + '" class="v_item ' + media_source + '"><a><img  src="' + media_image + '"/></a><div class="item_info"><div class="city">paris</div><div class="source"><div class="' + media_source + '"></div></div><div class="full_time">'+formateNumber(media_date_day)+'/'+formateNumber(media_date_month)+'/'+media_date_year+'</div></div><div class="item_icon"><div class="' + media_source + '"></div></div></div>');
		v_item.data('imgdata',{'nid':nid});
		
		if(type == 'prepend')
		{
			var _daySpan = $('.date_span[rel = "'+ date_media_date +'"]');
			if(_daySpan.length > 0){
				v_item.insertAfter(_daySpan);
			}
			else
			{
				v_item.prependTo($('.vgrid'));
			}
			daySpan.addClass('close');
		}
		else
		if(type == 'append')
		{
			v_item.appendTo($('.vgrid'));
			v_item.addClass('close');
			
		}
		else
		{
			v_item.appendTo($('.vgrid'));
		}
		
	
	}
	//var v_item_group = $('.v_item.close');
//	v_item_group.css({'width':imageWidth,'height':imageWidth});
//	v_item_group.find('img').css({'width':imageWidth,'height':imageWidth});
//	$('.vgrid').isotope( 'appended', v_item_group );
	var t = 0;
	if(type == 'prepend') t = 5000;
	setTimeout(loadingCover,t);
		loadingCover();
}

var loadedimg = 0;
function loadingCover(){
	if(loadedimg == 0)
	{
		var v_item_imgs = $('.vgrid .v_item img');
		v_item_imgs.each(function(){
			$(this).ensureLoad(function(){
				loadedimg++;
				if(loadedimg == perpage/2)
				{
					console.log('loaded');
					setTimeout(itemAnimate,1500);
				}
			});
		});
	}
	else
	{
		setTimeout(itemAnimate,1500);
	}	
}

function itemAnimate(){
	console.log('animating');
	animating = 1;
	if($('.vgrid').hasClass('isotope'))
	{
		$('.vgrid').isotope('destroy');
	}
//	var pageHeight =  (Math.ceil($('.vgrid > *').length / ($('.vgrid').width()/imageWidth))+1)*imageWidth;
//    $('.page').height(pageHeight); //重新计算高度
	var items = $('.v_item');
	var i = 0;
	items.each(function(){
		var _c = $(this);
		if(!_c.hasClass('opened'))
		{
			_c.css({'display':'none','rotateY':'-90deg','opacity':0,'width':imageWidth,'height':imageWidth});
			_c.find('img').css({'width':0,'height':imageWidth});
			_c.find('.item_info .city').css({'margin-top':(imageWidth-88)/2});
			setTimeout(function(){
				_c.addClass('opened');
				_c.removeClass('close');
				_c.css({'display':'block'});
				_c.find('img').animate({'width':_c.height()},10);
				_c.transition({
				  perspective: '9000px',
				  rotateY: '0deg',
				  opacity: 1
				},700);
			}, (i * (200 || 0)));
			i ++;
		}
	});
	
		
	clearTimeout(isoTimeout);
	isoTimeout = setTimeout(function(){
		animating = 0;
		//$('.v_item').css({'transition-duration':'0s'});
//		
//		//$('.vgrid').isotope();
//		$('body').infinitescroll('resume');
//		$('.page').height($('.page').height()+50);
	},(i)*200);
}

/*
* Load photo wall
* @param url 
* The ajax request url
*/
function loadData(url){
	// Destory exsit content
	$('.vgrid').empty();
	$('.loading3').fadeIn();
	$.ajax({
		url: url,
		dataType: 'json',
		method: "post",
		success: function (data) {
			//$('.loading2').fadeOut();
			loaded = 1;
			loadComplete();
			renderItem(data);
			$('.loading3').fadeOut();
			bindvgridEvent();
		}
	});
}

/*
* Load Single Content
* @param media_data 
* Media Date, It's Object type
* @param face 
* Cube face
*/
function openSignleContent(nid,isOpen){
	$.ajax({
		url: "data/third_content/node/pre_next_node",
		dataType: "JSON",
		type: "POST",
		data: JSON.stringify({nid:nid,number:4,resource_type:current_type}),
		contentType: "application/json",
		success: function (data) {
			
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
			datalistIndex = data.next.length;
			for(var d in datalist)
			{
				var url = datalist[d].field_media_image;
				var img = new Image();
 				img.src = url;
			}
			
			clickable_left = true;
			clickable_right = true;
			
			if(isOpen)
			{
				openBigImage(datalist[datalistIndex]);
			}
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
	
	
	$('#dc1').css({'display':'block','left':0});
	$('#dc2').css({'display':'block'});
	$('#dc3').css({'display':'block'});
	$('body').css({'overflow':'hidden'});
	setTimeout(function(){
		$('#dc3').addClass('opened');
		$('.left_panel').css('left',$width);
		$('.vgrid').css('margin-left',$width+100);
	},100);
	setTimeout(function(){
		$('#dc2').addClass('opened');
	},300);
	setTimeout(function(){
		$('#dc1').addClass('opened');
		
	},350);
	
	$( '.dc3_wrap' ).html('').removeData("fillmore");
	
	renderMediaContent(media_data,1);
	$('.dc3_wrap' ).show();
	$('.dc3_wrap').eq(2).click(function(){
		$('.nav_arrow_right').eq(0).click();
	}).css({'opacity':0.3});
	$.address.path(media_data.nid);
	$('.input_nid').val(media_data.nid);
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
* @param noimg: only load text
* Cube face
*/
function renderMediaContent(media_data, face, noimg){
	var imgIndex = face;
	if(face == 4)
	{
		imgIndex = 0;
	}
	var user_url;
	
	// Parse media type
	media_data.media_source;
	if(media_data.source_type.toLowerCase() == 'instagram')
	{
		media_data.media_source = "instagram";
	}
	
	if(media_data.source_type.toLowerCase() == 'soundcloud')
	{
		media_data.media_source = "soundcloud";
	}
	
	if(!_.isEmpty(media_data.field_video))
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
	var bigImage = media_data.field_media_image;
	var p_url = siteurl + "/#/" + media_data.nid;
	
	updateDay(media_date_day);
	if(media_data.media_source == 'instagram')
	{
		user_url = "http://web.stagram.com/n/"+media_data.field_user_name;
	}
	if(media_data.field_anonymous_flaged == null)
	{
		media_data.field_anonymous_flaged = 0;
	}
	var like_counts = parseInt(media_data.field_flag_counter) + parseInt(media_data.field_anonymous_flaged);
	
	if(!noimg)
	{
		// Render content
		$( '.dc3_wrap' ).eq(imgIndex).html('');
		if(media_data.media_source == 'youtube')
		{
			var url = media_data.field_video.split('=');
			$( '.dc3_wrap' ).eq(imgIndex).html('<iframe width="100%" height="90%" style="margin-top:5%;" src="youtube/video.php?q='+ url[1] +'" frameborder="0" allowfullscreen></iframe>');
		}
		else if(media_data.media_source == 'vimeo')
		{
			$( '.dc3_wrap' ).eq(imgIndex).html('<iframe width="100%" height="90%" style="margin-top:5%;" src="'+media_data.field_video.replace('vimeo.com','player.vimeo.com/video')+'" frameborder="0" allowfullscreen></iframe>');
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
			$( '.dc3_wrap' ).eq(imgIndex).html('<iframe width="100%" height="90%" style="margin-top:5%;" src="'+url+'" frameborder="0" allowfullscreen></iframe>');
		}
		else if(media_data.media_source == 'soundcloud')
		{
			var url = media_data.field_sound;
			console.log(url);
			$( '.dc3_wrap' ).eq(imgIndex).html('<iframe width="100%" height="166" scrolling="no" frameborder="no" class="soundcloud-iframe" src="soundcloud/soundcloud.php?q=' + encodeURIComponent(url) +'"></iframe>');
			var height = ($(window).height() - 166)/2;
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
	}
	
	clickable_left = true;
	clickable_right = true;
	
	$('.dc2_bigcube_face' + face + ' .avator img').attr('src',media_data.field_user_profile_image);
	$('.dc2_bigcube_face' + face + ' .username').html('<a target="_blank" href="' + user_url + '">' + media_data.field_user_name + '</a>');
	$('.dc2_bigcube_face' + face + ' .body').html(media_data.field_body.replace('#9263',''));
	$('.dc2_bigcube_face' + face + ' input[name="nid"]').val(media_data.nid);
	$('.dc2_bigcube_face' + face + ' .like_counts').attr('data-counts', like_counts).html('+');
	
	$('.dc1_face' + face + ' .day').html(media_date_day);
	$('.dc1_face' + face + ' .date').html(formateNumber(media_date_day)+'/'+formateNumber(media_date_month)+'/'+media_date_year);
	$('.dc1_face' + face + ' .time_clock').attr('data-hrs',media_date_hrs);
	$('.dc1_face' + face + ' .time_clock').attr('data-min',media_date_min);
	$('.dc1_face' + face + ' .time_text').html(formateNumber(media_date_hrs)+'H'+formateNumber(media_date_min));
	$('.dc1_face' + face + ' .time_clock').brdgClock();	
	$('.dc1_face' + face + ' .source').html('').append('<div>#9263</div>');
	$('.dc1_face' + face + ' .source div').addClass(media_data.source_type.toLowerCase());
	
	
	var domainbigImage = bigImage.replace('64.207.184.106','www.polyardshanghai.com'); //only for testing, beacuse facebook need real domain.
	var share_facebook = "http://www.facebook.com/sharer/sharer.php?s=100&p[title]=" + encodeURIComponent(media_data.field_body) + "&p[summary]=" + encodeURIComponent(media_data.field_body) + "&p[url]=" + encodeURIComponent(p_url) + "&p[images][0]=" + encodeURIComponent(domainbigImage);
	var share_google = "https://plusone.google.com/_/+1/confirm?hl=en&url=" + encodeURIComponent(p_url);
	var share_twitter = "http://twitter.com/share?text="+ encodeURIComponent(media_data.field_body) +"&url=" + encodeURIComponent(p_url) +"&img=" + encodeURIComponent(domainbigImage);
	var share_weibo = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(media_data.field_body) + "&pic=" + encodeURIComponent(domainbigImage) + "&url=" + encodeURIComponent(p_url);
	var share_pinterest = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(p_url) + "&media=" + encodeURIComponent(domainbigImage) + "&description=" + encodeURIComponent(media_data.field_body);
	var share_huaban = "http://huaban.com/bookmarklet/?url=" + encodeURIComponent(p_url) + "&media=" + encodeURIComponent(domainbigImage);
	
	// Render Sharing Buttons
	$('.dc2_bigcube_face' + face + ' .facebook').attr('href',share_facebook);
	$('.dc2_bigcube_face' + face + ' .google').attr('href',share_google);
	$('.dc2_bigcube_face' + face + ' .twitter').attr('href',share_twitter);
	$('.dc2_bigcube_face' + face + ' .weibo').attr('href',share_weibo);
	$('.dc2_bigcube_face' + face + ' .pinterest').attr('href',share_pinterest);
	$('.dc2_bigcube_face' + face + ' .huaban').attr('href',share_huaban);
	
	// Load comments
	$.ajax({
		url: "data/third_content/source_content_comments",
		dataType: "JSON",
		method: 'GET',
		data: {nid: media_data.nid},
		contentType: "application/json",
		success: function(data) {
			var comments_wrap = $('.dc2_bigcube_face' + face + ' .comments_list').empty();
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
	$('textarea').bind('keydown',function(e){
		if(e.ctrlKey && e.which == 13 || e.which == 10) {
			$(".comment_form").submit();
		}
		if(e.metaKey && e.which == 13 ) {
			$(".comment_form").submit();
		}
	});
	
	 
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
				 var apipath = "data/third_content";
				 var comment = {
					nid: $('.dc2_bigcube_face1 input[name="nid"]').val(),
					comment_body: {und: [{value: $('.dc2_bigcube_face1 textarea[name="comment"]').val(), summary: $('.dc2_bigcube_face1 textarea[name="comment"]').val()}]},
					field_email: {und: [{value: $('.dc2_bigcube_face1 input[name="email"]').val()}]}
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
						console.log(e.statusText);
						$('.comment_form .loading').fadeOut(200);
						$('.comment_form .button_input').delay(200).fadeIn(200,function(){
							$(this).after('<span>'+e.statusText+'</span>')
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
	
	// Ajax submit comments content
	$('.btn_like').unbind('click');
	$('.dc2_bigcube_face1 .btn_like').bind('click',function(){
		var apipath = "data/third_content";
		var nid = $('.input_nid').eq(0).val();
		console.log(nid);
		var like = {content_id: nid, flag_name: 'like', uid: 0, action: 'flag','skip_permission_check':1};
		console.log(like);
		var _this = $(this);
		$.ajax({
			url: apipath + "/flag/flag",
			dataType: "JSON",
			type: "POST",
			data: JSON.stringify(like),
			contentType: "application/json",
			success: function (data) {
				console.log(data);
				if(data[0] == true)
				{
					var count_wrap = _this.find('.like_counts');
					var count = parseInt(count_wrap.attr('data-counts'));
					count ++;
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
	});
	
	
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
		
	$('.v_item').hoverIntent(function(){
		$(this).find('.item_info').fadeIn(300);
	},function(){
		$(this).find('.item_info').fadeOut(300);
	},200);
		
	$('.category li,.logo,.city_time').unbind('click');
	//filter all
	$('.logo').click(function(){
		$('.category a').removeClass('actived');
		$('.category a').eq(0).addClass('actived');
		current_day = null;
		current_type = 0;
		loadData('data/third_content/all_resources?page=0');
	});
	$('.category li').eq(0).click(function(){
		$('.category a').removeClass('actived');
		$('a',this).addClass('actived');
		current_day = null;
		current_type = 0;
		loadData('data/third_content/all_resources?perpage='+perpage+'&page=0');
	});
	//filter picture
	$('.category li').eq(1).click(function(){
		$('.category a').removeClass('actived');
		$('a',this).addClass('actived');
		current_day = null;
		current_type = 1;
		loadData('data/third_content/services_picture?perpage='+perpage+'&page=0');
	});
	
	//filter videos
	$('.category li').eq(2).click(function(){
		$('.category a').removeClass('actived');
		$('a',this).addClass('actived');
		current_day = null;
		current_type = 3;
		loadData('data/third_content/services_video?perpage='+perpage+'&page=0');
	});
	//filter music
	$('.category li').eq(3).click(function(){
		$('.category a').removeClass('actived');
		$('a',this).addClass('actived');
		current_day = null;
		current_type = 2;
		loadData('data/third_content/services_sould?perpage='+perpage+'&page=0');
	});
	
	$('.city_time').click(function(){
		var cityid = $(this).attr('data-city');
		$('.category a').removeClass('actived');
		$('a',this).addClass('actived');
		current_day = null;
		loadData('data/third_content/all_resources?perpage='+perpage+'&page=0&city_id='+cityid);
	});
	
	
	/****************************************************
	bind data
	****************************************************/
	$('.vgrid .v_item').unbind('click');
	$('.vgrid .v_item').bind('click',function(){
		current_item = $(this);
		//current data
		var media_data = $(this).data('imgdata');
		//$('<div class="loading"></div>').appendTo(current_item).css({'display':'none','width':current_item.width(),'height':current_item.width()}).fadeIn();
		
		openSignleContent(media_data.nid,1);
		return false;
	});
	
	bindDcEventOnce();
	
}

function bindDcEventOnce(){
	
	bindDc1Event();
	
	$('#dc1 .back').live('click',function(e){
		e.stopImmediatePropagation();
		setTimeout(function(){
			$('#dc2').removeClass('opened');
			$('#dc3').removeClass('opened');
			$('.left_panel').css('left',0);
			$('.vgrid').css('margin-left',100);
			$('#dc3 iframe').remove();
			$('#dc3_arrow').hide();
		},500);
		setTimeout(function(){
			$('#dc1').css('left',-300);
			$('#dc1').removeClass('opened');
		},600);
		
		setTimeout(function(){
			$('#dc1').css({'display':'none'});
			$('#dc2').css({'display':'none'});
			$('#dc3').css({'display':'none'});
		},1000);
		$('body').css({'overflow':'visible'});
		$.address.path('');
	});
	
	
	$('.nav_arrow_right').live('click',function(e){
		e.stopImmediatePropagation();
		if(clickable_right)
		{
			clickable_right = false;
			datalistIndex ++;
			_item = datalist[datalistIndex];
			
			
			$.address.path(_item.nid);
			$('.input_nid').val(_item.nid);
			// 3D Animation
			var rotateY = parseInt($('.dc1_cube').css('rotateY'));
			rotateY -= 90;
			
			$('.dc1_cube').transition({
			  z: -100,
			  rotateY: rotateY
			});
			$('.dc2_bigcube').transition({
			  z: -195,
			  rotateY: rotateY
			});
			
			$('.dc1_face').css({'background-color':'#000'});
			$('.dc2_bigcube_face').css({'background-color':'#000'});
			$('#dc3').append('<div class="dc3_wrap" style="left: '+$('#dc3').width()+'px;"></div>');
			$('#dc3 .dc3_wrap').eq(0).remove();
			$( '.dc3_wrap' ).eq(0).css({'left':-$('#dc3').width(),'opacity':0});
			$( '.dc3_wrap' ).eq(1).css({'left':0,'opacity':1});
			$( '.dc3_wrap' ).eq(2).css({'display':'block','opacity':0}).animate({'opacity':0.3},400);
			//stop video in iframe
			$( '.dc3_wrap iframe' ).each(function(i){
				$(this).attr('src',$(this).attr('src'));
			});
			var soundcloud_iframe = $( '.dc3_wrap' ).eq(1).find('.soundcloud-iframe');
			if(soundcloud_iframe.length > 0)
			{
				soundcloud_iframe.fadeIn();
				$( '.dc3_wrap' ).eq(1).find('.fillmoreInner').fadeOut();
			}
			
			setTimeout(function(){
				moveDc1(2);
				moveDc2(2);
				
				//next data
				if(!_.isEmpty(datalist[datalistIndex+1]))
				{
					renderMediaContent(datalist[datalistIndex+1],2);
				}
				
				//prev data
				renderMediaContent(datalist[datalistIndex-1],4,1);
//				
				if(datalistIndex+2 == datalist.length)
				{
					openSignleContent(datalist[datalistIndex+1],0);
					
				}
				
			},500);
		}
	});
	
	$('.nav_arrow_left').live('click',function(e){
		e.stopImmediatePropagation();
		if(clickable_left)
		{
			clickable_left = false;
			datalistIndex--;
			_item = datalist[datalistIndex];
			
			//current_data = current_item.data('imgdata');
			$.address.path(_item.nid);
			$('.input_nid').val(_item.nid);
			var rotateY = parseInt($('.dc1_cube').css('rotateY'));
			rotateY += 90;
			$('.dc1_cube').transition({
			  z: -100,
			  rotateY: rotateY
			});
			
			$('.dc2_bigcube').transition({
			  z: -195,
			  rotateY: rotateY
			});
			
			$('.dc1_face').css({'background-color':'#000'});
			$('.dc2_bigcube_face').css({'background-color':'#000'});
			$('#dc3 .dc3_wrap').eq(0).before('<div class="dc3_wrap" style="left: -'+$('#dc3').width()+'px;"></div>');
			$( '.dc3_wrap' ).eq(0).css({'opacity':0});
			$( '.dc3_wrap' ).eq(0).css({'left':-$('#dc3').width(),'opacity':0.3});
			$( '.dc3_wrap' ).eq(1).css({'left':0,'opacity':1});
			$( '.dc3_wrap' ).eq(2).css({'left':$('#dc3').width(),'opacity':0.3});
			$( '.dc3_wrap' ).eq(3).css({'left':$('#dc3').width()*2,'opacity':0.3});
			$('#dc3 .dc3_wrap').eq(3).remove();
			//stop video in iframe
			$( '.dc3_wrap iframe' ).each(function(){
				$(this).attr('src',$(this).attr('src'));
			});
			
			setTimeout(function(){
				moveDc1(4);
				moveDc2(4);
				
				//prev data
				if(!_.isEmpty(datalist[datalistIndex-1]))
				{
					renderMediaContent(datalist[datalistIndex-1],4);
				}
				//next data
				renderMediaContent(datalist[datalistIndex+1],2,1);
				if(datalistIndex-2 == 0)
				{
					openSignleContent(datalist[datalistIndex-1],0);
					
				}
				
			},500);
		}
	});

	$('.dc2_bigcube').transition({
	  z: -195,
	  rotateY: 0
	},0);
	
	$('.dc2_bigcube_face1 .btn_share').live('click',function(){
		$('.btn_comments').removeClass('actived');
		$(this).addClass('actived');
		$('.dc2_cube').addClass('show_share');
		var top = $(window).height()-100;
		if(top > 0)
			$('.dc2_bigcube_face1 .dc2_section1').delay(300).animate({'margin-top':-top},800,'easeOutCubic');
		$('.dc2_bigcube_face1 .dc2_header').delay(500).animate({'margin-left':-100},800,'easeOutCubic');
	});
	
	$('.dc2_bigcube_face1 .btn_comments').live('click',function(){
		$('.btn_share').removeClass('actived');
		$(this).addClass('actived');
		$('.dc2_cube').removeClass('show_share');
		var top = $(window).height()-100;
		if(top > 0)
			$('.dc2_bigcube_face1 .dc2_section1').delay(300).animate({'margin-top':-top});
		$('.dc2_bigcube_face1 .dc2_header').delay(500).animate({'margin-left':-100},800,'easeOutCubic');
	});
	
	// Ajax submit comments content
	//$('.button_input').live('click',function(){
//		var apipath = "data/third_content";
//		 var comment = {
//			nid: $('.dc2_bigcube_face1 input[name="nid"]').val(),
//			comment_body: {und: [{value: $('.dc2_bigcube_face1 textarea[name="comment"]').val(), summary: $('.dc2_bigcube_face1 textarea[name="comment"]').val()}]},
//			field_email: {und: [{value: $('.dc2_bigcube_face1 input[name="email"]').val()}]}
//		 };
//		 $.ajax({
//			url: apipath + "/comment",
//			dataType: "JSON",
//			type: "POST",
//			data: JSON.stringify(comment),
//			contentType: "application/json",
//			success: function (data) {
//				alert(data);
//				if(data.cid)
//				{
//					var comments_wrap = $('.dc2_bigcube_face' + 1 + ' .comments_list');
//					comments_wrap.prepend('<div class="comment_item"><div class="comment_title"><span class="name">' + $('.dc2_bigcube_face1 input[name="email"]').val() + '</span><span class="date">' + media_date_day + " " + monthShortName[media_date_month] + ", " + media_date_year + '</span></div><div class="comment_body">' + $('.dc2_bigcube_face1 textarea[name="comment"]').val() + '</div></div>');
//				}
//			}
//		 });
//	});
	
	
	
	
	$('#dc2 .dc2_bigcube_face1 .btn_close').spriteOnHover({fps:24,orientation:'vertical',width:100,height:100});
	$('#dc2 .dc2_bigcube_face1 .btn_close').live('click',function(){
		console.log(1);
		$('.dc2_bigcube_face1 .dc2_header').animate({'margin-left':0},1000,'easeOutCubic');
		$('.dc2_bigcube_face1 .dc2_section1').delay(100).animate({'margin-top':0},1000,'easeOutCubic');
		$('.dc2_bigcube_face1 .dc2_header div').removeClass('actived');
	});
	
	
	
	$('#dc3_arrow').live('mouseenter',function(){
		$('.dc3_wrap').eq(2).css('opacity',1);
	});
	
	$('#dc3_arrow').live('mouseleave',function(){
		$('.dc3_wrap').eq(2).css('opacity',0.3);
	});
	
	$('#dc3_arrow').live('click',function(){
		$('.nav_arrow_right').eq(0).click();
	});

}

function moveDc1(face){
	var new_dc1_cube = $('<div />',{'class':'dc1_cube'}).hide().appendTo('#dc1');
	var face1 = $('<div />',{'class':'dc1_face1 dc1_face'}).appendTo(new_dc1_cube);
	var face2 = $('<div />',{'class':'dc1_face2 dc1_face'}).appendTo(new_dc1_cube);
	var face4 = $('<div />',{'class':'dc1_face4 dc1_face'}).appendTo(new_dc1_cube);
	face1.html($('.dc1_cube .dc1_face'+face).html());
	face2.html($('.dc1_cube .dc1_face'+face).html());
	face4.html($('.dc1_cube .dc1_face'+face).html());
	new_dc1_cube.transition({
	  z: -100,
	  rotateY: 0
	},0);
	new_dc1_cube.show();
	$('.dc1_cube').eq(0).remove();
	bindDc1Event();
	$('.dc1_face1 .time_clock').brdgClock();
	
}

function bindDc1Event(){
	$('.dc1_cube').transition({
	  z: -100,
	  rotateY: 0
	},0);
	$('.dc2_bigcube').transition({
	  z: -100,
	  rotateY: 0
	},0);
	$('#dc1 .nav_arrow_right').css({'background-position':'0'}).spriteOnHover({fps:20,orientation:'vertical',width:98,height:98});
	$('#dc1 .nav_arrow_left').css({'background-position':'0'}).spriteOnHover({fps:20,orientation:'vertical',width:98,height:98});
	$('#dc1 .back').css({'background-position':'0 0'}).spriteOnHover({fps:20,orientation:'vertical',width:199,height:98});
	//$('.time_clock').brdgClock();
}


function moveDc2(face){
	var new_dc2_cube = $('<div />',{'class':'dc2_bigcube'}).hide().appendTo('#dc2');
	var face1 = $('<div />',{'class':'dc2_bigcube_face1 dc2_bigcube_face'}).appendTo(new_dc2_cube);
	var face2 = $('<div />',{'class':'dc2_bigcube_face2 dc2_bigcube_face'}).appendTo(new_dc2_cube);
	var face4 = $('<div />',{'class':'dc2_bigcube_face4 dc2_bigcube_face'}).appendTo(new_dc2_cube);
	face1.html($('.dc2_bigcube .dc2_bigcube_face'+face).html());
	face2.html($('.dc2_bigcube .dc2_bigcube_face'+face).html());
	face4.html($('.dc2_bigcube .dc2_bigcube_face'+face).html());
	new_dc2_cube.transition({
	  z: -195,
	  rotateY: 0
	},0);
	new_dc2_cube.show();
	$('.dc2_bigcube').eq(0).remove();
	$('#dc2 .btn_close').css({'background-position':'0 0'}).spriteOnHover({fps:20,orientation:'vertical',width:100,height:100});
	
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

function formateNumber(number)
{
	number = (number < 10) ? "0" + number : number;
	return number;
}
	

	

function bindShortcutEvent(){
	$('body').bind('keyup',function(event){
		console.log($(event.target).prop("tagName"));
		if($(event.target).prop("tagName").toLowerCase() == "body")
		{
			if(event.keyCode == 39)
			{
				$('.nav_arrow_right').eq(0).click();
			}
			if(event.keyCode == 37)
			{
				$('.nav_arrow_left').eq(0).click();
			}
			if(event.keyCode == 27)
			{
				$('#dc1 .back').click();
			}
		}
	});
}



//window resize
function resizeWindow(){
	$width = $(window).width();
	//var pageHeight =  (Math.ceil($('.vgrid > *').length / ($('.vgrid').width()/imageWidth))+2)*imageWidth;
//    $('.page').height(pageHeight); //重新计算高度
	
	var dc2_section1_height = $(window).height() - $('.dc2_header').height();
	$('.dc2_section1').height(dc2_section1_height);
	
	var body_margin_top = (dc2_section1_height - $('.dc2_section1 .body').height())/2;
	$('.dc2_section1 .body').css({'margin-top':body_margin_top});
	
	var dc3_width = $(window).width() - 590-80;
	$('#dc3').css({'width':dc3_width});
	
	if($('#dc1').hasClass('opened')){
		$('.left_panel').css({'left':$width});
		$('.vgrid').css({'margin-left':$width+100});
	}
	
	$('.dc3_wrap').eq(0).css({'left':-dc3_width});
	$('.dc3_wrap').eq(2).css({'left':dc3_width});
	//get image with
	var bodyWidth = $('body').width()-100;
	var minWidth = 170;
	var numberChilds = parseInt(bodyWidth / minWidth);
	imageWidth = parseInt(bodyWidth / numberChilds)+1;
	
	
	var v_item_group = $('.v_item,.date_span');
	v_item_group.css({'width':imageWidth,'height':imageWidth});
	v_item_group.find('img').css({'width':imageWidth,'height':imageWidth});
	v_item_group.find('.item_info .city').css({'margin-top':(imageWidth-88)/2});
	perpage = parseInt(($(window).width()/imageWidth)) * Math.ceil(($(window).height()/imageWidth));
	
	// tony411
	$('.date_span .full_time').css({'margin-top':(imageWidth-109)/2});
	
	//console.log(animating);
//	if(!$('.vgrid').hasClass('isotope') && animating==0)
//	{
//		$('.isotope-item').css({'transition-duration':'0'});
//		console.log('start isotope');
//		$('.vgrid').isotope();
//	}
//	//Add resize animation
//	clearTimeout(transTimeout);
//	transTimeout = setTimeout(function(){
//		$('.vgrid').width($width);
//		$('.vgrid').isotope('reLayout',function(){
//			$('.vgrid').isotope('destory');
//		});
//	},1000);
}

//Left Text Time Clock
function bindTextClockEvent()
{
	var parisTimeZone = 1;
	if(isBSTinEffect())
		parisTimeZone = 2;
	$('#paris_time').textClock(parisTimeZone);
	$('#shanghai_time').textClock(8);
	setInterval(function(){
		$('#paris_time').textClock(parisTimeZone);
		$('#shanghai_time').textClock(8);
	},1000*30);
}



$('body').infinitescroll({
	
	navSelector  	: "a#next_page:last",
	nextSelector 	: "a#next_page:last",
	itemSelector 	: "div",
	debug		 	: true,
	dataType	 	: 'json',
	state			:{ currPage: 0 },
	appendCallback	: false, 
	path: ['/brdg/data/third_content/all_resources?perpage=30&page=','']
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

$("body").queryLoader2({
	barColor: "#000",
	backgroundColor: "#000",
	percentage: true,
	barHeight: 1,
	completeAnimation: "fade",
	minimumTime: 100,
	onLoadComplete: loadComplete
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
			$('.page').show();
			$('.logo_loading').fadeOut();
			$('#qLoverlay').fadeOut(500, function () {
				$('#qLoverlay').remove();
			});
		});
	}
}

$.address.externalChange(function(e){
	if(!_.isEmpty(e.pathNames[0]))
	{
		openSignleContent(e.pathNames[0],1);
	}
});

jQuery.fn.extend({
    ensureLoad: function(handler) {
        return this.each(function() {
            if(this.complete) {
                handler.call(this);
            } else {
                $(this).load(handler);
            }
        });
    }
});