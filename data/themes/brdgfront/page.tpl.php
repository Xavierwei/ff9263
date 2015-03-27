<?php
if($is_front){
	include('page-front.tpl.php');
	return;
}
else if (arg(0) == 'node' && is_numeric(arg(1))) {
	$nid = arg(1);
	$node = node_load(array('nid' => $nid));
	$type = $node->type;
	$path = drupal_lookup_path('alias',"node/".$node->nid);
	if($path == 'registered')
	{
		include('page-registered.tpl.php');
		return;
	}
	if($path == 'validated-email')
	{
		include('page-validated.tpl.php');
		return;
	}
    if($path == 'comment-validated')
    {
        include('page-comment-validated.tpl.php');
        return;
    }
	if($path == 'session')
    {
        include('page-session.tpl.php');
        return;
    }
}
global $user;
?>
		
<a id="logout" href="<?php print $base_path;?>user/logout">Logout</a>
<div id="header">
<a href="../"><img src="<?php print base_path().path_to_theme();?>/images/logo.gif" /></a>	
</div>

<!--div id="user-nav" class="navbar navbar-inverse">
    <ul class="nav btn-group">
        <li class="btn btn-inverse"><a title="" href="login.html"><i class="icon icon-share-alt"></i> <span class="text">Logout</span></a></li>
    </ul>
</div-->
    
<div id="sidebar">
    <a href="#" class="visible-phone"><i class="icon icon-home"></i> Dashboard</a>
    <ul>
        <li class="active"><a href="dashboard.html"><i class="icon icon-home"></i> <span>Dashboard</span></a></li>
        
    </ul>

</div>



<div id="content">
  
    <div id="content-header">
        <?php if ($title): ?>
          <h1 class="page-title"><?php print $title; ?></h1>
        <?php endif; ?>
        <?php if($user->uid != 0):?>
        <?php endif;?>
    </div>
    
    <div id="breadcrumb">
        <?php print $breadcrumb; ?>
    </div>
    
    <?php if ($tabs): ?><div id="tabs"><?php print render($tabs); ?></div><?php endif; ?>
    <div class="clear"></div>
    <div class="container-fluid">
        
        
        <?php if ($page['help']): ?>
        <div id="help">
          <?php print render($page['help']); ?>
        </div>
      <?php endif; ?>
      <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
      <?php print $messages; ?>
	  <?php print render($page['content']); ?>
        
        
    </div>
</div>
		
