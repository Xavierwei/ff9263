<?php 
	$checked = "checked";
	if($fields['status']->content == "Disabled")
	{
		$checked = "";	
	}
?>
<div class="user_box <?php print $fields['status']->content;?>">

	<div class="tools">
		<div class="switch"><input class="<?php print $fields['status']->content;?>" type="checkbox" value="<?php print $fields['uid_2']->content;?>" <?php print $checked?> /></div>
		<div class="edit"><?php print $fields['edit_node']->content;?></div>
	</div>
	<div class="user_body">
		<div class="city"><?php print $fields['field_user_city']->content;?></div>
		<div class="email"><?php print $fields['mail']->content;?> (<?php print $fields['field_email_validated']->content;?>)</div>
		<div class="expand">
			<div class="sns1"><?php print $fields['field_instagram_screen_name']->content;?></div>
			<div class="sns2"><?php print $fields['field_twitter_screen_name']->content;?></div>
			<div class="sns3"><?php print $fields['field_weibo_screen_name']->content;?></div>
		</div>
	</div>
</div>