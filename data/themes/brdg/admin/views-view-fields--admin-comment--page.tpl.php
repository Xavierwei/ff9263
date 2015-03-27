<?php 
	$checked = "checked";
	if($fields['status']->content != "Yes")
	{
		$checked = "";	
	}
?>
<div class="comment_item <?php print $fields['status']->content;?>">
	<div class="switch"><input class="<?php print $fields['status']->content;?>" type="checkbox" value="<?php print $fields['cid']->content;?>" <?php print $checked?> /></div>
	<div class="img"><?php print $fields['field_media_image']->content;?><?php print $fields['field_sound_thumbnail']->content;?><?php print $fields['field_video_thumbnail']->content;?> </div>
    <div class="created"><?php print $fields['field_email']->content;?><span> post at </span><?php print $fields['created']->content;?></div>
    <div class="body"><?php print $fields['comment_body']->content;?></div>
    <div class="checkbox"><?php print $fields['views_bulk_operations']->content;?></div>
</div>