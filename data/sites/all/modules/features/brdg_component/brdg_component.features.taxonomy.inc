<?php
/**
 * @file
 * brdg_component.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function brdg_component_taxonomy_default_vocabularies() {
  return array(
    'data_source' => array(
      'name' => 'Data Source',
      'machine_name' => 'data_source',
      'description' => 'Marked content form which source, such as twitter ',
      'hierarchy' => '0',
      'module' => 'taxonomy',
      'weight' => '0',
    ),
    'media_type' => array(
      'name' => 'Media Type',
      'machine_name' => 'media_type',
      'description' => 'image, sound, video',
      'hierarchy' => '0',
      'module' => 'taxonomy',
      'weight' => '0',
    ),
  );
}
