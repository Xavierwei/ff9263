<?php 
$_SERVER['HTTP_USER_AGENT']  = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3";
?>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=1024px, height=768px, user-scalable=1, minimum-scale=0.1, maximum-scale=1.0"> 
<script type="text/javascript" src="../js/jquery.min.js"></script>
<script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>

</head>
<body style="background:#000; text-align:center;">
<iframe class="vine-embed" src="https://vine.co/v/<?php print $_GET['q']; ?>/embed/simple" width="<?php print $_GET['w']; ?>" height="<?php print $_GET['w']; ?>" frameborder="0"></iframe>
<script type="text/javascript">
var windowResize = function(){
	var margin_top = ($(window).height() - <?php print $_GET['w']; ?>)/2;
	$('.vine-embed').css('margin-top',margin_top);
}
windowResize();
$(window).resize(windowResize);
</script>
</body>

</html>