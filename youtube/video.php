<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-2" />
<title></title>
<script type="text/javascript" src="../js/jquery.min.js"></script>
<script src="swfobject.js" language="javascript"></script>
<script language="javascript">
	function clearloading(){
		$('body').css("background","#000");
	}
</script>
<style type="text/css">
<!--
body {
	background:#000 url(loading.gif) no-repeat center;
	text-align: center;
	padding:0;
	margin:0;
}
-->
</style>
</head>
<body>
<div id="flashArea" class="flashArea" style="width:100%;height:100%;"><p align="center">This content requires the Adobe Flash Player.<br /><a href="http://www.adobe.com/go/getflashplayer">
						<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /><br />
    <a href="http://www.macromedia.com/go/getflash/">Get Flash</a></p>
	</div>


  <script type="text/javascript">
	var mainswf = new SWFObject("youtube_player_standalone.swf", "main", "100%", "100%", "9","#000000");
	mainswf.addParam("scale", "noscale");
	mainswf.addParam("wmode", "transparent");
	mainswf.addParam("allowFullScreen", "true");
	mainswf.addVariable("youtube_id", "<?php print $_GET['q'] ?>"); //NGgx7jbjbDE
	mainswf.addVariable("title", "");
	mainswf.addVariable("controls_always_on", "false");
	mainswf.addVariable("controls_fade_out_time", "5");
	mainswf.addVariable("volume_cookie_on", "true");
	mainswf.addVariable("autoplay", "false");
	mainswf.write("flashArea");
  </script>

  
</body>
</html>
