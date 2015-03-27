<?php 
	$checked = "checked";
	if($fields['status']->content == "Disabled")
	{
		$checked = "";	
	}
?>
<div class="node-item <?php print $fields['status']->content;?>">
    <div class="img"><a target="_blank" href="/#/<?php print $fields['nid']->content;?>"><?php print $fields['field_media_image']->content;?><?php print $fields['field_video_thumbnail']->content;?><?php print $fields['field_sound_thumbnail']->content;?></a></div>
    <div class="username"><?php print $fields['field_from_user_name']->content;?> <?php print $fields['field_post_date']->content;?></div>
    
    <div class="comment"><span>Like: <?php print $fields['field_anonymous_flaged']->content;?></span>  <span>Comments: <?php print $fields['comment_count']->content;?></span></div>
    <div class="checkbox"><?php print $fields['views_bulk_operations']->content;?></div>
    <div class="city_switch city_<?php print strtolower($fields['field_user_city']->content);?>" data-nid="<?php print $fields['nid']->content;?>">
        <div class="city_p" data-city="1" title="Paris">P</div>
        <div class="city_s" data-city="0" title="Shanghai">S</div>
    </div>
    <?php if(isset($fields['nid']->content)):?>
    <div class="switch"><input type="checkbox" value="<?php print $fields['nid']->content;?>" <?php print $checked?> /></div>
    <?php endif;?>
</div>