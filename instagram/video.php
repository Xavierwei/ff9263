<!doctype html>
<html>
<head>
  <title>Video</title>
  <style type="text/css">
   body {background:#000;margin:0;padding:0;}
  </style>
<link rel="stylesheet" href="../css/jquery-ui.css" />
<link rel="stylesheet" href="../css/jquery.video.css" />
</head>
<body>
<div id="FlashContent"></div>
<script src="../js/modernizr-2.5.3.min.js"></script>
<script src="../js/jquery.min.js"></script>
<script src="../js/jquery-ui.min.js"></script>
<script src="../js/jquery.video.js"></script>
<script type="text/javascript">

    var _isIpad = (function(){
        return !!navigator.userAgent.toLowerCase().match(/ipad/i) ;
    })();
    function showVideo( id , src , w , h ){
        if( $('html.video').length > 0 ){
            src = src.replace(/\.[^.]+$/ , '.mp4');
            src2 = src.replace(/\.[^.]+$/ , '.webm');
            initVideo( id , src , w , h );
        } else {
            initFlash( id , src , w , h );
        }
    }
    var initVideo = function( id , src ){
        var $wrap = $( '#' + id );
        var $video = $('<video autoplay="autoplay" loop="true" muted width="<?php print $_GET['w']; ?>" height="<?php print $_GET['w']; ?>" controls><source src="' + src + '" type="video/mp4" /></video>');
        $video.appendTo( $wrap );
        if($('.touch').length == 0)
        {
            $('video').video({'autoPlay':true,'loop':true});
            $('video').click(function(){
                if($(this).prop('paused'))
                {
                    $(this)[0].play();
                }
                else
                {
                    $(this)[0].pause();
                }
            });
        }
        var top = ($(window).height()-<?php print $_GET['w']; ?>)/2;
        if(top < 0) top = 0;
        $('.ui-video-widget').css({'padding-top':top});
    }

    initVideo( 'FlashContent' , '<?php print $_GET['u'];?>');

</script>
</body>
</html>