<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates
 */
?>

  

  <?php print $list_type_prefix; ?>
    <?php foreach ($rows as $id => $row): ?>
      <div class="user_item"><?php print $row; ?></div>
    <?php endforeach; ?>
  <?php print $list_type_suffix; ?>

