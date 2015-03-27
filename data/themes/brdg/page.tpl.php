<?php
if((arg(0) == 'user' && arg(2) != 'edit') || (arg(0) == 'admin' && arg(1)=='')):
?>
<script>
window.location.href="<?php print base_path();?>admin/content/sourcemanage/image";
</script>
<?php 
endif;
?>


<div id="header">
<img src="<?php print base_path().path_to_theme();?>/images/logo.gif" />	
</div>

<div id="logout" style="position:absolute;top:20px;right:20px;color:#eee;">
   <a title="" href="<?php print base_path();?>/user/logout"><i class="icon icon-share-alt"></i> <span class="text">Logout</span></a>
</div>
    
<div id="sidebar">
    <a href="#" class="visible-phone"><i class="icon icon-home"></i> Dashboard</a>
    <ul>
        <li class="submenu">
            <a href="#"><i class="icon icon-th-list"></i> <span>Data</span> </a>
            <ul>
                <li><a href="<?php print base_path();?>/admin/content/sourcemanage">All</a></li>
                <li><a href="<?php print base_path();?>/admin/content/sourcemanage/image">Pictures</a></li>
                <li><a href="<?php print base_path();?>/admin/content/sourcemanage/video">Video</a></li>
                <li><a href="<?php print base_path();?>/admin/content/sourcemanage/audio">Music</a></li>
            </ul>
        </li>
        <li class="submenu">
            <a href="#"><i class="icon icon-user"></i> <span>People</span> </a>
            <ul>
                <li><a href="<?php print base_path();?>/admin/people/user-list">User List</a></li>
                <li><a href="<?php print base_path();?>/admin/people/user-list/actived">White List</a></li>
            </ul>
        </li>
        <li class="submenu">
            <a href="#"><i class="icon icon-comment"></i> <span>Comments</span></a>
            <ul>
                <li><a href="<?php print base_path();?>/admin/comments/list">Comments</a></li>
                <li><a href="<?php print base_path();?>/admin/comments/list_waiting">Unapproval Comments</a></li>
            </ul>
        </li>
        <li class="submenu">
            <a href="#"><i class="icon icon-signal"></i> <span>Ranking</span></a>
            <ul>
                <li><a href="<?php print base_path();?>admin/content/sort/year?sort_by=field_anonymous_flaged_value&sort_order=DESC">Content Ranking</a></li>
                <li><a href="<?php print base_path();?>admin/people_ranking">User Ranking</a></li>
            </ul>
        </li>
        <li class="submenu">
            <a href="<?php print base_path();?>admin/config/system/user_allowed_email"><i class="icon icon-pencil"></i> <span>Settings</span></a>
            <ul>
                <li><a href="<?php print base_path();?>admin/config/system/user_allowed_email">General  Settings</a></li>
            </ul>
        </li>
    </ul>

</div>



<div id="content">
   
    <div class="container-fluid">
        
        
        <?php if ($page['help']): ?>
        <div id="help">
          <?php print render($page['help']); ?>
        </div>
      <?php endif; ?>
      <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
      <?php print render($page['content']); ?>
        
        
    </div>
</div>