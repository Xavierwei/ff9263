<?php
/**
 * @file
 * brdg_component.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function brdg_component_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'admin_comment';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'comment';
  $view->human_name = 'admin comment';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'admin comment';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '60';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'There\'s no comment yet.';
  $handler->display->display_options['empty']['area']['format'] = 'filtered_html';
  /* Relationship: Comment: Content */
  $handler->display->display_options['relationships']['nid']['id'] = 'nid';
  $handler->display->display_options['relationships']['nid']['table'] = 'comment';
  $handler->display->display_options['relationships']['nid']['field'] = 'nid';
  $handler->display->display_options['relationships']['nid']['required'] = TRUE;
  /* Field: Comment: Comment */
  $handler->display->display_options['fields']['comment_body']['id'] = 'comment_body';
  $handler->display->display_options['fields']['comment_body']['table'] = 'field_data_comment_body';
  $handler->display->display_options['fields']['comment_body']['field'] = 'comment_body';
  $handler->display->display_options['fields']['comment_body']['label'] = 'Comment Body';
  /* Field: Comment: Delete link */
  $handler->display->display_options['fields']['delete_comment']['id'] = 'delete_comment';
  $handler->display->display_options['fields']['delete_comment']['table'] = 'comment';
  $handler->display->display_options['fields']['delete_comment']['field'] = 'delete_comment';
  $handler->display->display_options['fields']['delete_comment']['label'] = '';
  $handler->display->display_options['fields']['delete_comment']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['delete_comment']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['delete_comment']['text'] = 'Delete';
  /* Field: Comment: Email */
  $handler->display->display_options['fields']['field_email']['id'] = 'field_email';
  $handler->display->display_options['fields']['field_email']['table'] = 'field_data_field_email';
  $handler->display->display_options['fields']['field_email']['field'] = 'field_email';
  $handler->display->display_options['fields']['field_email']['label'] = '';
  $handler->display->display_options['fields']['field_email']['element_type'] = '0';
  $handler->display->display_options['fields']['field_email']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_email']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_email']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_email']['element_default_classes'] = FALSE;
  /* Field: Comment: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'comment';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = '';
  $handler->display->display_options['fields']['created']['element_type'] = '0';
  $handler->display->display_options['fields']['created']['element_label_type'] = '0';
  $handler->display->display_options['fields']['created']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['created']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['created']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['created']['date_format'] = 'short';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'nid';
  /* Field: Content: Media Image */
  $handler->display->display_options['fields']['field_media_image']['id'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['fields']['field_media_image']['field'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['relationship'] = 'nid';
  $handler->display->display_options['fields']['field_media_image']['label'] = '';
  $handler->display->display_options['fields']['field_media_image']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_media_image']['alter']['path'] = 'http://64.207.184.106/brdg/#/[nid]';
  $handler->display->display_options['fields']['field_media_image']['alter']['absolute'] = TRUE;
  $handler->display->display_options['fields']['field_media_image']['alter']['target'] = '_blank';
  $handler->display->display_options['fields']['field_media_image']['element_type'] = '0';
  $handler->display->display_options['fields']['field_media_image']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_media_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_image']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_media_image']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_media_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_media_image']['settings'] = array(
    'image_style' => '80x80',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_media_image']['delta_offset'] = '0';
  /* Field: Comment: Edit link */
  $handler->display->display_options['fields']['edit_comment']['id'] = 'edit_comment';
  $handler->display->display_options['fields']['edit_comment']['table'] = 'comment';
  $handler->display->display_options['fields']['edit_comment']['field'] = 'edit_comment';
  $handler->display->display_options['fields']['edit_comment']['label'] = 'Edit';
  /* Field: Comment: ID */
  $handler->display->display_options['fields']['cid']['id'] = 'cid';
  $handler->display->display_options['fields']['cid']['table'] = 'comment';
  $handler->display->display_options['fields']['cid']['field'] = 'cid';
  $handler->display->display_options['fields']['cid']['label'] = '';
  $handler->display->display_options['fields']['cid']['element_type'] = '0';
  $handler->display->display_options['fields']['cid']['element_label_type'] = '0';
  $handler->display->display_options['fields']['cid']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['cid']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['cid']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['cid']['link_to_comment'] = FALSE;
  /* Field: Comment: Published */
  $handler->display->display_options['fields']['field_published']['id'] = 'field_published';
  $handler->display->display_options['fields']['field_published']['table'] = 'field_data_field_published';
  $handler->display->display_options['fields']['field_published']['field'] = 'field_published';
  $handler->display->display_options['fields']['field_published']['label'] = '';
  $handler->display->display_options['fields']['field_published']['element_type'] = '0';
  $handler->display->display_options['fields']['field_published']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_published']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_published']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_published']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_published']['type'] = 'list_key';
  /* Field: Comment: Approved */
  $handler->display->display_options['fields']['status']['id'] = 'status';
  $handler->display->display_options['fields']['status']['table'] = 'comment';
  $handler->display->display_options['fields']['status']['field'] = 'status';
  $handler->display->display_options['fields']['status']['label'] = '';
  $handler->display->display_options['fields']['status']['element_type'] = '0';
  $handler->display->display_options['fields']['status']['element_label_type'] = '0';
  $handler->display->display_options['fields']['status']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['status']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['status']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['status']['empty'] = 'No';
  $handler->display->display_options['fields']['status']['not'] = 0;
  /* Sort criterion: Comment: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'comment';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Comment: Approved */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'comment';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = '0';

  /* Display: comment managment */
  $handler = $view->new_display('page', 'comment managment', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'admin/content/admincomment/%';

  /* Display: Comments list */
  $handler = $view->new_display('page', 'Comments list', 'page_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Comment: Approved */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'comment';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = '1';
  $handler->display->display_options['path'] = 'admin/comments/list';

  /* Display: Comments list */
  $handler = $view->new_display('page', 'Comments list', 'page_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Comment: Comment */
  $handler->display->display_options['fields']['comment_body']['id'] = 'comment_body';
  $handler->display->display_options['fields']['comment_body']['table'] = 'field_data_comment_body';
  $handler->display->display_options['fields']['comment_body']['field'] = 'comment_body';
  $handler->display->display_options['fields']['comment_body']['label'] = 'Comment Body';
  /* Field: Comment: Delete link */
  $handler->display->display_options['fields']['delete_comment']['id'] = 'delete_comment';
  $handler->display->display_options['fields']['delete_comment']['table'] = 'comment';
  $handler->display->display_options['fields']['delete_comment']['field'] = 'delete_comment';
  $handler->display->display_options['fields']['delete_comment']['label'] = '';
  $handler->display->display_options['fields']['delete_comment']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['delete_comment']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['delete_comment']['text'] = 'Delete';
  /* Field: Comment: Email */
  $handler->display->display_options['fields']['field_email']['id'] = 'field_email';
  $handler->display->display_options['fields']['field_email']['table'] = 'field_data_field_email';
  $handler->display->display_options['fields']['field_email']['field'] = 'field_email';
  $handler->display->display_options['fields']['field_email']['label'] = '';
  $handler->display->display_options['fields']['field_email']['element_type'] = '0';
  $handler->display->display_options['fields']['field_email']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_email']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_email']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_email']['element_default_classes'] = FALSE;
  /* Field: Comment: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'comment';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = '';
  $handler->display->display_options['fields']['created']['element_type'] = '0';
  $handler->display->display_options['fields']['created']['element_label_type'] = '0';
  $handler->display->display_options['fields']['created']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['created']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['created']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['created']['date_format'] = 'short';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['relationship'] = 'nid';
  /* Field: Content: Media Image */
  $handler->display->display_options['fields']['field_media_image']['id'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['fields']['field_media_image']['field'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['relationship'] = 'nid';
  $handler->display->display_options['fields']['field_media_image']['label'] = '';
  $handler->display->display_options['fields']['field_media_image']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_media_image']['alter']['path'] = 'http://64.207.184.106/brdg/#/[nid]';
  $handler->display->display_options['fields']['field_media_image']['alter']['absolute'] = TRUE;
  $handler->display->display_options['fields']['field_media_image']['alter']['target'] = '_blank';
  $handler->display->display_options['fields']['field_media_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_media_image']['settings'] = array(
    'image_style' => '80x80',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_media_image']['delta_offset'] = '0';
  /* Field: Comment: Edit link */
  $handler->display->display_options['fields']['edit_comment']['id'] = 'edit_comment';
  $handler->display->display_options['fields']['edit_comment']['table'] = 'comment';
  $handler->display->display_options['fields']['edit_comment']['field'] = 'edit_comment';
  $handler->display->display_options['fields']['edit_comment']['label'] = 'Edit';
  /* Field: Bulk operations: Comment */
  $handler->display->display_options['fields']['views_bulk_operations']['id'] = 'views_bulk_operations';
  $handler->display->display_options['fields']['views_bulk_operations']['table'] = 'comment';
  $handler->display->display_options['fields']['views_bulk_operations']['field'] = 'views_bulk_operations';
  $handler->display->display_options['fields']['views_bulk_operations']['label'] = '';
  $handler->display->display_options['fields']['views_bulk_operations']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['display_type'] = '0';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['enable_select_all_pages'] = 1;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['force_single'] = 0;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['entity_load_capacity'] = '10';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_operations'] = array(
    'action::views_bulk_operations_delete_item' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::views_bulk_operations_script_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::flag_comment_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::views_bulk_operations_modify_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
      'settings' => array(
        'show_all_tokens' => 1,
        'display_values' => array(
          '_all_' => '_all_',
        ),
      ),
    ),
    'action::views_bulk_operations_argument_selector_action' => array(
      'selected' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
      'settings' => array(
        'url' => '',
      ),
    ),
    'action::comment_publish_action' => array(
      'selected' => 1,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::comment_save_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::system_send_email_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::comment_unpublish_action' => array(
      'selected' => 1,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::comment_unpublish_by_keyword_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
  );
  $handler->display->display_options['path'] = 'admin/comments/list_waiting';
  $export['admin_comment'] = $view;

  $view = new view();
  $view->name = 'admin_pages';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'admin_pages';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'admin_pages';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '50';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Media Image */
  $handler->display->display_options['fields']['field_media_image']['id'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['fields']['field_media_image']['field'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['label'] = '';
  $handler->display->display_options['fields']['field_media_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_media_image']['settings'] = array(
    'image_style' => '150_150',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_media_image']['delta_offset'] = '0';
  /* Field: Content: From User Name */
  $handler->display->display_options['fields']['field_from_user_name']['id'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['table'] = 'field_data_field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['field'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['label'] = '';
  $handler->display->display_options['fields']['field_from_user_name']['element_label_colon'] = FALSE;
  /* Field: Content: Source Type */
  $handler->display->display_options['fields']['field_source_type']['id'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['table'] = 'field_data_field_source_type';
  $handler->display->display_options['fields']['field_source_type']['field'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['label'] = '';
  $handler->display->display_options['fields']['field_source_type']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_source_type']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['element_type'] = '0';
  $handler->display->display_options['fields']['nid']['element_label_type'] = '0';
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nid']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['nid']['element_default_classes'] = FALSE;
  /* Field: Bulk operations: Content */
  $handler->display->display_options['fields']['views_bulk_operations']['id'] = 'views_bulk_operations';
  $handler->display->display_options['fields']['views_bulk_operations']['table'] = 'node';
  $handler->display->display_options['fields']['views_bulk_operations']['field'] = 'views_bulk_operations';
  $handler->display->display_options['fields']['views_bulk_operations']['label'] = '';
  $handler->display->display_options['fields']['views_bulk_operations']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['display_type'] = '0';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['enable_select_all_pages'] = 1;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['force_single'] = 0;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['entity_load_capacity'] = '10';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_operations'] = array(
    'action::node_assign_owner_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::views_bulk_operations_delete_item' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::views_bulk_operations_script_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::flag_node_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::node_make_sticky_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::node_make_unsticky_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::views_bulk_operations_modify_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
      'settings' => array(
        'show_all_tokens' => 1,
        'display_values' => array(
          '_all_' => '_all_',
        ),
      ),
    ),
    'action::views_bulk_operations_argument_selector_action' => array(
      'selected' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
      'settings' => array(
        'url' => '',
      ),
    ),
    'action::node_promote_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::node_publish_action' => array(
      'selected' => 1,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::node_unpromote_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::node_save_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::system_send_email_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::node_unpublish_action' => array(
      'selected' => 1,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::node_unpublish_by_keyword_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
  );
  /* Field: Content: Post Date */
  $handler->display->display_options['fields']['field_post_date']['id'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['fields']['field_post_date']['field'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['label'] = '';
  $handler->display->display_options['fields']['field_post_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_post_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Published */
  $handler->display->display_options['fields']['status']['id'] = 'status';
  $handler->display->display_options['fields']['status']['table'] = 'node';
  $handler->display->display_options['fields']['status']['field'] = 'status';
  $handler->display->display_options['fields']['status']['label'] = '';
  $handler->display->display_options['fields']['status']['element_type'] = '0';
  $handler->display->display_options['fields']['status']['element_label_type'] = '0';
  $handler->display->display_options['fields']['status']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['status']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['status']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['status']['type'] = 'enabled-disabled';
  $handler->display->display_options['fields']['status']['not'] = 0;
  /* Field: Content: Video Thumbnail */
  $handler->display->display_options['fields']['field_video_thumbnail']['id'] = 'field_video_thumbnail';
  $handler->display->display_options['fields']['field_video_thumbnail']['table'] = 'field_data_field_video_thumbnail';
  $handler->display->display_options['fields']['field_video_thumbnail']['field'] = 'field_video_thumbnail';
  $handler->display->display_options['fields']['field_video_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_video_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_video_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_video_thumbnail']['settings'] = array(
    'image_style' => '150_150',
    'image_link' => '',
  );
  /* Field: Content: Sound Thumbnail */
  $handler->display->display_options['fields']['field_sound_thumbnail']['id'] = 'field_sound_thumbnail';
  $handler->display->display_options['fields']['field_sound_thumbnail']['table'] = 'field_data_field_sound_thumbnail';
  $handler->display->display_options['fields']['field_sound_thumbnail']['field'] = 'field_sound_thumbnail';
  $handler->display->display_options['fields']['field_sound_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_sound_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_sound_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_sound_thumbnail']['settings'] = array(
    'image_style' => '150_150',
    'image_link' => '',
  );
  /* Field: Field: User City */
  $handler->display->display_options['fields']['field_user_city']['id'] = 'field_user_city';
  $handler->display->display_options['fields']['field_user_city']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['fields']['field_user_city']['field'] = 'field_user_city';
  $handler->display->display_options['fields']['field_user_city']['label'] = '';
  $handler->display->display_options['fields']['field_user_city']['element_type'] = '0';
  $handler->display->display_options['fields']['field_user_city']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_user_city']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_user_city']['element_wrapper_type'] = '0';
  /* Sort criterion: Like */
  $handler->display->display_options['sorts']['field_anonymous_flaged_value']['id'] = 'field_anonymous_flaged_value';
  $handler->display->display_options['sorts']['field_anonymous_flaged_value']['table'] = 'field_data_field_anonymous_flaged';
  $handler->display->display_options['sorts']['field_anonymous_flaged_value']['field'] = 'field_anonymous_flaged_value';
  $handler->display->display_options['sorts']['field_anonymous_flaged_value']['ui_name'] = 'Like';
  $handler->display->display_options['sorts']['field_anonymous_flaged_value']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['field_anonymous_flaged_value']['expose']['label'] = 'Like';
  /* Sort criterion: Content: Comment count */
  $handler->display->display_options['sorts']['comment_count']['id'] = 'comment_count';
  $handler->display->display_options['sorts']['comment_count']['table'] = 'node_comment_statistics';
  $handler->display->display_options['sorts']['comment_count']['field'] = 'comment_count';
  $handler->display->display_options['sorts']['comment_count']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['comment_count']['expose']['label'] = 'Comments';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Post date */
  $handler->display->display_options['filters']['created']['id'] = 'created';
  $handler->display->display_options['filters']['created']['table'] = 'node';
  $handler->display->display_options['filters']['created']['field'] = 'created';
  $handler->display->display_options['filters']['created']['operator'] = '>=';
  $handler->display->display_options['filters']['created']['value']['value'] = '+30 day';
  $handler->display->display_options['filters']['created']['value']['type'] = 'offset';

  /* Display: Simple Sort Page */
  $handler = $view->new_display('page', 'Simple Sort Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Media Image */
  $handler->display->display_options['fields']['field_media_image']['id'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['fields']['field_media_image']['field'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['label'] = '';
  $handler->display->display_options['fields']['field_media_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_media_image']['settings'] = array(
    'image_style' => '150_150',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_media_image']['delta_offset'] = '0';
  /* Field: Content: From User Name */
  $handler->display->display_options['fields']['field_from_user_name']['id'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['table'] = 'field_data_field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['field'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['label'] = '';
  $handler->display->display_options['fields']['field_from_user_name']['element_label_colon'] = FALSE;
  /* Field: Content: Source Type */
  $handler->display->display_options['fields']['field_source_type']['id'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['table'] = 'field_data_field_source_type';
  $handler->display->display_options['fields']['field_source_type']['field'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['label'] = '';
  $handler->display->display_options['fields']['field_source_type']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_source_type']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Post Date */
  $handler->display->display_options['fields']['field_post_date']['id'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['fields']['field_post_date']['field'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['label'] = '';
  $handler->display->display_options['fields']['field_post_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_post_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Anonymous Flaged */
  $handler->display->display_options['fields']['field_anonymous_flaged']['id'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['table'] = 'field_data_field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['field'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['label'] = '';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_anonymous_flaged']['settings'] = array(
    'thousand_separator' => ',',
    'prefix_suffix' => 1,
  );
  /* Field: Content: Comment count */
  $handler->display->display_options['fields']['comment_count']['id'] = 'comment_count';
  $handler->display->display_options['fields']['comment_count']['table'] = 'node_comment_statistics';
  $handler->display->display_options['fields']['comment_count']['field'] = 'comment_count';
  $handler->display->display_options['fields']['comment_count']['label'] = '';
  $handler->display->display_options['fields']['comment_count']['element_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_label_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['comment_count']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_default_classes'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  $handler->display->display_options['path'] = 'admin/content/sort';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Sorted Content';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Simple Sort (Week) Page */
  $handler = $view->new_display('page', 'Simple Sort (Week) Page', 'page_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Media Image */
  $handler->display->display_options['fields']['field_media_image']['id'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['fields']['field_media_image']['field'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['label'] = '';
  $handler->display->display_options['fields']['field_media_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_media_image']['settings'] = array(
    'image_style' => '150_150',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_media_image']['delta_offset'] = '0';
  /* Field: Content: From User Name */
  $handler->display->display_options['fields']['field_from_user_name']['id'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['table'] = 'field_data_field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['field'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['label'] = '';
  $handler->display->display_options['fields']['field_from_user_name']['element_label_colon'] = FALSE;
  /* Field: Content: Source Type */
  $handler->display->display_options['fields']['field_source_type']['id'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['table'] = 'field_data_field_source_type';
  $handler->display->display_options['fields']['field_source_type']['field'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['label'] = '';
  $handler->display->display_options['fields']['field_source_type']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_source_type']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Post Date */
  $handler->display->display_options['fields']['field_post_date']['id'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['fields']['field_post_date']['field'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['label'] = '';
  $handler->display->display_options['fields']['field_post_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_post_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Anonymous Flaged */
  $handler->display->display_options['fields']['field_anonymous_flaged']['id'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['table'] = 'field_data_field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['field'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['label'] = '';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_anonymous_flaged']['settings'] = array(
    'thousand_separator' => ',',
    'prefix_suffix' => 0,
  );
  /* Field: Content: Comment count */
  $handler->display->display_options['fields']['comment_count']['id'] = 'comment_count';
  $handler->display->display_options['fields']['comment_count']['table'] = 'node_comment_statistics';
  $handler->display->display_options['fields']['comment_count']['field'] = 'comment_count';
  $handler->display->display_options['fields']['comment_count']['label'] = '';
  $handler->display->display_options['fields']['comment_count']['element_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_label_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['comment_count']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['comment_count']['empty'] = '0';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Post date */
  $handler->display->display_options['filters']['created']['id'] = 'created';
  $handler->display->display_options['filters']['created']['table'] = 'node';
  $handler->display->display_options['filters']['created']['field'] = 'created';
  $handler->display->display_options['filters']['created']['operator'] = '>=';
  $handler->display->display_options['filters']['created']['value']['value'] = '-7 days';
  $handler->display->display_options['filters']['created']['value']['type'] = 'offset';
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value']['id'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value']['value'] = 'RT @';
  $handler->display->display_options['path'] = 'admin/content/sort/week';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Sort One Week';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Simple Sort (Month) Page */
  $handler = $view->new_display('page', 'Simple Sort (Month) Page', 'page_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Media Image */
  $handler->display->display_options['fields']['field_media_image']['id'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['fields']['field_media_image']['field'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['label'] = '';
  $handler->display->display_options['fields']['field_media_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_media_image']['settings'] = array(
    'image_style' => '150_150',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_media_image']['delta_offset'] = '0';
  /* Field: Content: From User Name */
  $handler->display->display_options['fields']['field_from_user_name']['id'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['table'] = 'field_data_field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['field'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['label'] = '';
  $handler->display->display_options['fields']['field_from_user_name']['element_label_colon'] = FALSE;
  /* Field: Content: Source Type */
  $handler->display->display_options['fields']['field_source_type']['id'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['table'] = 'field_data_field_source_type';
  $handler->display->display_options['fields']['field_source_type']['field'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['label'] = '';
  $handler->display->display_options['fields']['field_source_type']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_source_type']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Post Date */
  $handler->display->display_options['fields']['field_post_date']['id'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['fields']['field_post_date']['field'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['label'] = '';
  $handler->display->display_options['fields']['field_post_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_post_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Anonymous Flaged */
  $handler->display->display_options['fields']['field_anonymous_flaged']['id'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['table'] = 'field_data_field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['field'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['label'] = '';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_anonymous_flaged']['settings'] = array(
    'thousand_separator' => ',',
    'prefix_suffix' => 1,
  );
  /* Field: Content: Comment count */
  $handler->display->display_options['fields']['comment_count']['id'] = 'comment_count';
  $handler->display->display_options['fields']['comment_count']['table'] = 'node_comment_statistics';
  $handler->display->display_options['fields']['comment_count']['field'] = 'comment_count';
  $handler->display->display_options['fields']['comment_count']['label'] = '';
  $handler->display->display_options['fields']['comment_count']['element_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_label_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['comment_count']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['comment_count']['empty'] = '0';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Post date */
  $handler->display->display_options['filters']['created']['id'] = 'created';
  $handler->display->display_options['filters']['created']['table'] = 'node';
  $handler->display->display_options['filters']['created']['field'] = 'created';
  $handler->display->display_options['filters']['created']['operator'] = '>=';
  $handler->display->display_options['filters']['created']['value']['value'] = '-30 day';
  $handler->display->display_options['filters']['created']['value']['type'] = 'offset';
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value']['id'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value']['value'] = 'RT @';
  $handler->display->display_options['path'] = 'admin/content/sort/month';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Sort One Month';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: node managent */
  $handler = $view->new_display('page', 'node managent', 'page_3');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Post Date (field_post_date) */
  $handler->display->display_options['sorts']['field_post_date_value']['id'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['sorts']['field_post_date_value']['field'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['order'] = 'DESC';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value']['id'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['body_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['body_value']['expose']['operator_id'] = 'body_value_op';
  $handler->display->display_options['filters']['body_value']['expose']['label'] = 'Keyword';
  $handler->display->display_options['filters']['body_value']['expose']['operator'] = 'body_value_op';
  $handler->display->display_options['filters']['body_value']['expose']['identifier'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Field: User City (field_user_city) */
  $handler->display->display_options['filters']['field_user_city_value']['id'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['filters']['field_user_city_value']['field'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator_id'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['label'] = 'City Location';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['identifier'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Post Date (field_post_date) */
  $handler->display->display_options['filters']['field_post_date_value']['id'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['filters']['field_post_date_value']['field'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_post_date_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_post_date_value']['expose']['operator_id'] = 'field_post_date_value_op';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['label'] = 'Date';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['operator'] = 'field_post_date_value_op';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['identifier'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Source Type (field_source_type) */
  $handler->display->display_options['filters']['field_source_type_tid']['id'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['table'] = 'field_data_field_source_type';
  $handler->display->display_options['filters']['field_source_type_tid']['field'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['operator_id'] = 'field_source_type_tid_op';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['label'] = 'From';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['operator'] = 'field_source_type_tid_op';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['identifier'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['filters']['field_source_type_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_source_type_tid']['vocabulary'] = 'data_source';
  /* Filter criterion: Content: From User Name (field_from_user_name) */
  $handler->display->display_options['filters']['field_from_user_name_value']['id'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['table'] = 'field_data_field_from_user_name';
  $handler->display->display_options['filters']['field_from_user_name_value']['field'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['field_from_user_name_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['operator_id'] = 'field_from_user_name_value_op';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['label'] = 'User Name';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['operator'] = 'field_from_user_name_value_op';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['identifier'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Media Type (field_media_type) */
  $handler->display->display_options['filters']['field_media_type_tid']['id'] = 'field_media_type_tid';
  $handler->display->display_options['filters']['field_media_type_tid']['table'] = 'field_data_field_media_type';
  $handler->display->display_options['filters']['field_media_type_tid']['field'] = 'field_media_type_tid';
  $handler->display->display_options['filters']['field_media_type_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_media_type_tid']['expose']['operator_id'] = 'field_media_type_tid_op';
  $handler->display->display_options['filters']['field_media_type_tid']['expose']['label'] = 'Media Type';
  $handler->display->display_options['filters']['field_media_type_tid']['expose']['operator'] = 'field_media_type_tid_op';
  $handler->display->display_options['filters']['field_media_type_tid']['expose']['identifier'] = 'field_media_type_tid';
  $handler->display->display_options['filters']['field_media_type_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['filters']['field_media_type_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_media_type_tid']['vocabulary'] = 'media_type';
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value_1']['id'] = 'body_value_1';
  $handler->display->display_options['filters']['body_value_1']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value_1']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value_1']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value_1']['value'] = 'RT @';
  $handler->display->display_options['path'] = 'admin/content/sourcemanage';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Manage Content';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Image Node Manage */
  $handler = $view->new_display('page', 'Image Node Manage', 'page_4');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '40';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Post Date (field_post_date) */
  $handler->display->display_options['sorts']['field_post_date_value']['id'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['sorts']['field_post_date_value']['field'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['order'] = 'DESC';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value']['id'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['body_value']['group'] = 1;
  $handler->display->display_options['filters']['body_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['body_value']['expose']['operator_id'] = 'body_value_op';
  $handler->display->display_options['filters']['body_value']['expose']['label'] = 'keyword';
  $handler->display->display_options['filters']['body_value']['expose']['operator'] = 'body_value_op';
  $handler->display->display_options['filters']['body_value']['expose']['identifier'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Field: User City (field_user_city) */
  $handler->display->display_options['filters']['field_user_city_value']['id'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['filters']['field_user_city_value']['field'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['group'] = 1;
  $handler->display->display_options['filters']['field_user_city_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator_id'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['label'] = 'City';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['identifier'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Post Date (field_post_date) */
  $handler->display->display_options['filters']['field_post_date_value']['id'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['filters']['field_post_date_value']['field'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_post_date_value']['group'] = 1;
  $handler->display->display_options['filters']['field_post_date_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_post_date_value']['expose']['operator_id'] = 'field_post_date_value_op';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['label'] = 'Post Date';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['operator'] = 'field_post_date_value_op';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['identifier'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Source Type (field_source_type) */
  $handler->display->display_options['filters']['field_source_type_tid']['id'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['table'] = 'field_data_field_source_type';
  $handler->display->display_options['filters']['field_source_type_tid']['field'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_source_type_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['operator_id'] = 'field_source_type_tid_op';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['label'] = 'From';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['operator'] = 'field_source_type_tid_op';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['identifier'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['filters']['field_source_type_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_source_type_tid']['vocabulary'] = 'data_source';
  /* Filter criterion: Content: Media Image (field_media_image:fid) */
  $handler->display->display_options['filters']['field_media_image_fid']['id'] = 'field_media_image_fid';
  $handler->display->display_options['filters']['field_media_image_fid']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['filters']['field_media_image_fid']['field'] = 'field_media_image_fid';
  $handler->display->display_options['filters']['field_media_image_fid']['operator'] = '!=';
  $handler->display->display_options['filters']['field_media_image_fid']['value']['value'] = '0';
  $handler->display->display_options['filters']['field_media_image_fid']['group'] = 1;
  /* Filter criterion: Content: From User Name (field_from_user_name) */
  $handler->display->display_options['filters']['field_from_user_name_value']['id'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['table'] = 'field_data_field_from_user_name';
  $handler->display->display_options['filters']['field_from_user_name_value']['field'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['field_from_user_name_value']['group'] = 1;
  $handler->display->display_options['filters']['field_from_user_name_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['operator_id'] = 'field_from_user_name_value_op';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['label'] = 'User';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['operator'] = 'field_from_user_name_value_op';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['identifier'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value_1']['id'] = 'body_value_1';
  $handler->display->display_options['filters']['body_value_1']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value_1']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value_1']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value_1']['value'] = 'RT @';
  $handler->display->display_options['path'] = 'admin/content/sourcemanage/image';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Image Media Manage';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Video  Node Manage */
  $handler = $view->new_display('page', 'Video  Node Manage', 'page_5');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '12';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Post Date (field_post_date) */
  $handler->display->display_options['sorts']['field_post_date_value']['id'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['sorts']['field_post_date_value']['field'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['order'] = 'DESC';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Video (field_video) */
  $handler->display->display_options['filters']['field_video_value']['id'] = 'field_video_value';
  $handler->display->display_options['filters']['field_video_value']['table'] = 'field_data_field_video';
  $handler->display->display_options['filters']['field_video_value']['field'] = 'field_video_value';
  $handler->display->display_options['filters']['field_video_value']['operator'] = '!=';
  /* Filter criterion: Content: Post Date (field_post_date) */
  $handler->display->display_options['filters']['field_post_date_value']['id'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['filters']['field_post_date_value']['field'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_post_date_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_post_date_value']['expose']['operator_id'] = 'field_post_date_value_op';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['label'] = 'Post Date';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['operator'] = 'field_post_date_value_op';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['identifier'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Source Type (field_source_type) */
  $handler->display->display_options['filters']['field_source_type_tid']['id'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['table'] = 'field_data_field_source_type';
  $handler->display->display_options['filters']['field_source_type_tid']['field'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['operator_id'] = 'field_source_type_tid_op';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['label'] = 'From';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['operator'] = 'field_source_type_tid_op';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['identifier'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['filters']['field_source_type_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_source_type_tid']['vocabulary'] = 'data_source';
  /* Filter criterion: Content: From User Name (field_from_user_name) */
  $handler->display->display_options['filters']['field_from_user_name_value']['id'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['table'] = 'field_data_field_from_user_name';
  $handler->display->display_options['filters']['field_from_user_name_value']['field'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['field_from_user_name_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['operator_id'] = 'field_from_user_name_value_op';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['label'] = 'User Name';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['operator'] = 'field_from_user_name_value_op';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['identifier'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Field: User City (field_user_city) */
  $handler->display->display_options['filters']['field_user_city_value']['id'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['filters']['field_user_city_value']['field'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator_id'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['label'] = 'City';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['identifier'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value']['id'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['body_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['body_value']['expose']['operator_id'] = 'body_value_op';
  $handler->display->display_options['filters']['body_value']['expose']['label'] = 'keyword';
  $handler->display->display_options['filters']['body_value']['expose']['operator'] = 'body_value_op';
  $handler->display->display_options['filters']['body_value']['expose']['identifier'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value_1']['id'] = 'body_value_1';
  $handler->display->display_options['filters']['body_value_1']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value_1']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value_1']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value_1']['value'] = 'RT @';
  $handler->display->display_options['path'] = 'admin/content/sourcemanage/video';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Video Media Manage';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Audio Node Manage */
  $handler = $view->new_display('page', 'Audio Node Manage', 'page_6');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '12';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Post Date (field_post_date) */
  $handler->display->display_options['sorts']['field_post_date_value']['id'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['sorts']['field_post_date_value']['field'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['order'] = 'DESC';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Sound (field_sound) */
  $handler->display->display_options['filters']['field_sound_value']['id'] = 'field_sound_value';
  $handler->display->display_options['filters']['field_sound_value']['table'] = 'field_data_field_sound';
  $handler->display->display_options['filters']['field_sound_value']['field'] = 'field_sound_value';
  $handler->display->display_options['filters']['field_sound_value']['operator'] = '!=';
  /* Filter criterion: Content: Post Date (field_post_date) */
  $handler->display->display_options['filters']['field_post_date_value']['id'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['filters']['field_post_date_value']['field'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['operator'] = '>=';
  $handler->display->display_options['filters']['field_post_date_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_post_date_value']['expose']['operator_id'] = 'field_post_date_value_op';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['label'] = 'Post Date';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['operator'] = 'field_post_date_value_op';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['identifier'] = 'field_post_date_value';
  $handler->display->display_options['filters']['field_post_date_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Source Type (field_source_type) */
  $handler->display->display_options['filters']['field_source_type_tid']['id'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['table'] = 'field_data_field_source_type';
  $handler->display->display_options['filters']['field_source_type_tid']['field'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['operator_id'] = 'field_source_type_tid_op';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['label'] = 'From';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['operator'] = 'field_source_type_tid_op';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['identifier'] = 'field_source_type_tid';
  $handler->display->display_options['filters']['field_source_type_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['filters']['field_source_type_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_source_type_tid']['vocabulary'] = 'data_source';
  /* Filter criterion: Content: From User Name (field_from_user_name) */
  $handler->display->display_options['filters']['field_from_user_name_value']['id'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['table'] = 'field_data_field_from_user_name';
  $handler->display->display_options['filters']['field_from_user_name_value']['field'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['field_from_user_name_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['operator_id'] = 'field_from_user_name_value_op';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['label'] = 'User Name';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['operator'] = 'field_from_user_name_value_op';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['identifier'] = 'field_from_user_name_value';
  $handler->display->display_options['filters']['field_from_user_name_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Field: User City (field_user_city) */
  $handler->display->display_options['filters']['field_user_city_value']['id'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['filters']['field_user_city_value']['field'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator_id'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['label'] = 'City';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['identifier'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value']['id'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['operator'] = 'contains';
  $handler->display->display_options['filters']['body_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['body_value']['expose']['operator_id'] = 'body_value_op';
  $handler->display->display_options['filters']['body_value']['expose']['label'] = 'keyword';
  $handler->display->display_options['filters']['body_value']['expose']['operator'] = 'body_value_op';
  $handler->display->display_options['filters']['body_value']['expose']['identifier'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value_1']['id'] = 'body_value_1';
  $handler->display->display_options['filters']['body_value_1']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value_1']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value_1']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value_1']['value'] = 'RT @';
  $handler->display->display_options['path'] = 'admin/content/sourcemanage/audio';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Audio Media Manage';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Simple Sort(Year) Page */
  $handler = $view->new_display('page', 'Simple Sort(Year) Page', 'page_7');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Media Image */
  $handler->display->display_options['fields']['field_media_image']['id'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['fields']['field_media_image']['field'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['label'] = '';
  $handler->display->display_options['fields']['field_media_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_media_image']['settings'] = array(
    'image_style' => '150_150',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_media_image']['delta_offset'] = '0';
  /* Field: Content: From User Name */
  $handler->display->display_options['fields']['field_from_user_name']['id'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['table'] = 'field_data_field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['field'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['label'] = '';
  $handler->display->display_options['fields']['field_from_user_name']['element_label_colon'] = FALSE;
  /* Field: Content: Source Type */
  $handler->display->display_options['fields']['field_source_type']['id'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['table'] = 'field_data_field_source_type';
  $handler->display->display_options['fields']['field_source_type']['field'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['label'] = '';
  $handler->display->display_options['fields']['field_source_type']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_source_type']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Post Date */
  $handler->display->display_options['fields']['field_post_date']['id'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['fields']['field_post_date']['field'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['label'] = '';
  $handler->display->display_options['fields']['field_post_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_post_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Anonymous Flaged */
  $handler->display->display_options['fields']['field_anonymous_flaged']['id'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['table'] = 'field_data_field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['field'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['label'] = '';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_anonymous_flaged']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_anonymous_flaged']['settings'] = array(
    'thousand_separator' => ',',
    'prefix_suffix' => 1,
  );
  /* Field: Content: Comment count */
  $handler->display->display_options['fields']['comment_count']['id'] = 'comment_count';
  $handler->display->display_options['fields']['comment_count']['table'] = 'node_comment_statistics';
  $handler->display->display_options['fields']['comment_count']['field'] = 'comment_count';
  $handler->display->display_options['fields']['comment_count']['label'] = '';
  $handler->display->display_options['fields']['comment_count']['element_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_label_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['comment_count']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['comment_count']['empty'] = '0';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Post date */
  $handler->display->display_options['filters']['created']['id'] = 'created';
  $handler->display->display_options['filters']['created']['table'] = 'node';
  $handler->display->display_options['filters']['created']['field'] = 'created';
  $handler->display->display_options['filters']['created']['operator'] = '>=';
  $handler->display->display_options['filters']['created']['value']['value'] = '-365 day';
  $handler->display->display_options['filters']['created']['value']['type'] = 'offset';
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value']['id'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value']['value'] = 'RT @';
  $handler->display->display_options['path'] = 'admin/content/sort/year';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Sort One Year';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Page 8 */
  $handler = $view->new_display('page', 'Page 8', 'page_8');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'admin/people_ranking';

  /* Display: user nodes */
  $handler = $view->new_display('page', 'user nodes', 'page_9');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: Post Date (field_post_date) */
  $handler->display->display_options['sorts']['field_post_date_value']['id'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['sorts']['field_post_date_value']['field'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['order'] = 'DESC';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Post Owed User (field_post_owed_user) */
  $handler->display->display_options['arguments']['field_post_owed_user_target_id']['id'] = 'field_post_owed_user_target_id';
  $handler->display->display_options['arguments']['field_post_owed_user_target_id']['table'] = 'field_data_field_post_owed_user';
  $handler->display->display_options['arguments']['field_post_owed_user_target_id']['field'] = 'field_post_owed_user_target_id';
  $handler->display->display_options['arguments']['field_post_owed_user_target_id']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_post_owed_user_target_id']['default_argument_type'] = 'php';
  $handler->display->display_options['arguments']['field_post_owed_user_target_id']['default_argument_options']['code'] = 'return arg(1);';
  $handler->display->display_options['arguments']['field_post_owed_user_target_id']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_post_owed_user_target_id']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_post_owed_user_target_id']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value_1']['id'] = 'body_value_1';
  $handler->display->display_options['filters']['body_value_1']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value_1']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value_1']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value_1']['value'] = 'RT @';
  $handler->display->display_options['filters']['body_value_1']['group'] = 1;
  $handler->display->display_options['path'] = 'admin/usernodes';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Manage Content';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;
  $export['admin_pages'] = $view;

  $view = new view();
  $view->name = 'admin_users';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'users';
  $view->human_name = 'admin_users';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'admin_users';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['access']['perm'] = 'access user profiles';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '50';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: User: Created date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'users';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['date_format'] = 'long';
  /* Field: User: Uid */
  $handler->display->display_options['fields']['uid']['id'] = 'uid';
  $handler->display->display_options['fields']['uid']['table'] = 'users';
  $handler->display->display_options['fields']['uid']['field'] = 'uid';
  $handler->display->display_options['fields']['uid']['label'] = 'Opration';
  $handler->display->display_options['fields']['uid']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['uid']['alter']['text'] = '<a href="/user/[uid]/block">Disable This Account</a>';
  $handler->display->display_options['fields']['uid']['link_to_user'] = FALSE;
  /* Field: User: Uid */
  $handler->display->display_options['fields']['uid_1']['id'] = 'uid_1';
  $handler->display->display_options['fields']['uid_1']['table'] = 'users';
  $handler->display->display_options['fields']['uid_1']['field'] = 'uid';
  $handler->display->display_options['fields']['uid_1']['label'] = 'Enable This User';
  $handler->display->display_options['fields']['uid_1']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['uid_1']['alter']['text'] = '<a href="/user/[uid_1]/unblock">Enable This User</a>';
  $handler->display->display_options['fields']['uid_1']['link_to_user'] = FALSE;
  /* Field: Bulk operations: User */
  $handler->display->display_options['fields']['views_bulk_operations']['id'] = 'views_bulk_operations';
  $handler->display->display_options['fields']['views_bulk_operations']['table'] = 'users';
  $handler->display->display_options['fields']['views_bulk_operations']['field'] = 'views_bulk_operations';
  $handler->display->display_options['fields']['views_bulk_operations']['label'] = '';
  $handler->display->display_options['fields']['views_bulk_operations']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['display_type'] = '0';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['enable_select_all_pages'] = 1;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['force_single'] = 0;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['entity_load_capacity'] = '10';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_operations'] = array(
    'action::user_block_user_action' => array(
      'selected' => 1,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::views_bulk_operations_delete_item' => array(
      'selected' => 1,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::views_bulk_operations_script_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::flag_user_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::views_bulk_operations_modify_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
      'settings' => array(
        'show_all_tokens' => 1,
        'display_values' => array(
          '_all_' => '_all_',
        ),
      ),
    ),
    'action::views_bulk_operations_user_roles_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::views_bulk_operations_argument_selector_action' => array(
      'selected' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
      'settings' => array(
        'url' => '',
      ),
    ),
    'action::system_send_email_action' => array(
      'selected' => 0,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
    'action::mymodule_unblock_user_action' => array(
      'selected' => 1,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 0,
      'label' => '',
    ),
  );
  /* Field: Field: User City */
  $handler->display->display_options['fields']['field_user_city']['id'] = 'field_user_city';
  $handler->display->display_options['fields']['field_user_city']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['fields']['field_user_city']['field'] = 'field_user_city';
  $handler->display->display_options['fields']['field_user_city']['label'] = '';
  $handler->display->display_options['fields']['field_user_city']['element_type'] = '0';
  $handler->display->display_options['fields']['field_user_city']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_user_city']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_user_city']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_user_city']['element_default_classes'] = FALSE;
  /* Field: User: E-mail */
  $handler->display->display_options['fields']['mail']['id'] = 'mail';
  $handler->display->display_options['fields']['mail']['table'] = 'users';
  $handler->display->display_options['fields']['mail']['field'] = 'mail';
  $handler->display->display_options['fields']['mail']['label'] = '';
  $handler->display->display_options['fields']['mail']['element_type'] = '0';
  $handler->display->display_options['fields']['mail']['element_label_type'] = '0';
  $handler->display->display_options['fields']['mail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['mail']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['mail']['element_default_classes'] = FALSE;
  /* Field: User: Instagram Screen Name */
  $handler->display->display_options['fields']['field_instagram_screen_name']['id'] = 'field_instagram_screen_name';
  $handler->display->display_options['fields']['field_instagram_screen_name']['table'] = 'field_data_field_instagram_screen_name';
  $handler->display->display_options['fields']['field_instagram_screen_name']['field'] = 'field_instagram_screen_name';
  $handler->display->display_options['fields']['field_instagram_screen_name']['label'] = '';
  $handler->display->display_options['fields']['field_instagram_screen_name']['element_type'] = '0';
  $handler->display->display_options['fields']['field_instagram_screen_name']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_instagram_screen_name']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_instagram_screen_name']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_instagram_screen_name']['element_default_classes'] = FALSE;
  /* Field: User: Twitter Screen Name */
  $handler->display->display_options['fields']['field_twitter_screen_name']['id'] = 'field_twitter_screen_name';
  $handler->display->display_options['fields']['field_twitter_screen_name']['table'] = 'field_data_field_twitter_screen_name';
  $handler->display->display_options['fields']['field_twitter_screen_name']['field'] = 'field_twitter_screen_name';
  $handler->display->display_options['fields']['field_twitter_screen_name']['label'] = '';
  $handler->display->display_options['fields']['field_twitter_screen_name']['element_type'] = '0';
  $handler->display->display_options['fields']['field_twitter_screen_name']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_twitter_screen_name']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_twitter_screen_name']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_twitter_screen_name']['element_default_classes'] = FALSE;
  /* Field: User: Weibo Screen Name */
  $handler->display->display_options['fields']['field_weibo_screen_name']['id'] = 'field_weibo_screen_name';
  $handler->display->display_options['fields']['field_weibo_screen_name']['table'] = 'field_data_field_weibo_screen_name';
  $handler->display->display_options['fields']['field_weibo_screen_name']['field'] = 'field_weibo_screen_name';
  $handler->display->display_options['fields']['field_weibo_screen_name']['label'] = '';
  $handler->display->display_options['fields']['field_weibo_screen_name']['element_type'] = '0';
  $handler->display->display_options['fields']['field_weibo_screen_name']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_weibo_screen_name']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_weibo_screen_name']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_weibo_screen_name']['element_default_classes'] = FALSE;
  /* Field: User: Uid */
  $handler->display->display_options['fields']['uid_2']['id'] = 'uid_2';
  $handler->display->display_options['fields']['uid_2']['table'] = 'users';
  $handler->display->display_options['fields']['uid_2']['field'] = 'uid';
  $handler->display->display_options['fields']['uid_2']['label'] = '';
  $handler->display->display_options['fields']['uid_2']['element_type'] = '0';
  $handler->display->display_options['fields']['uid_2']['element_label_type'] = '0';
  $handler->display->display_options['fields']['uid_2']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['uid_2']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['uid_2']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['uid_2']['link_to_user'] = FALSE;
  /* Field: User: Active */
  $handler->display->display_options['fields']['status']['id'] = 'status';
  $handler->display->display_options['fields']['status']['table'] = 'users';
  $handler->display->display_options['fields']['status']['field'] = 'status';
  $handler->display->display_options['fields']['status']['label'] = '';
  $handler->display->display_options['fields']['status']['element_type'] = '0';
  $handler->display->display_options['fields']['status']['element_label_type'] = '0';
  $handler->display->display_options['fields']['status']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['status']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['status']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['status']['type'] = 'enabled-disabled';
  $handler->display->display_options['fields']['status']['not'] = 0;
  /* Field: User: Edit link */
  $handler->display->display_options['fields']['edit_node']['id'] = 'edit_node';
  $handler->display->display_options['fields']['edit_node']['table'] = 'users';
  $handler->display->display_options['fields']['edit_node']['field'] = 'edit_node';
  $handler->display->display_options['fields']['edit_node']['element_label_colon'] = FALSE;
  /* Field: User: Email Validated */
  $handler->display->display_options['fields']['field_email_validated']['id'] = 'field_email_validated';
  $handler->display->display_options['fields']['field_email_validated']['table'] = 'field_data_field_email_validated';
  $handler->display->display_options['fields']['field_email_validated']['field'] = 'field_email_validated';
  $handler->display->display_options['fields']['field_email_validated']['label'] = '';
  $handler->display->display_options['fields']['field_email_validated']['element_type'] = '0';
  $handler->display->display_options['fields']['field_email_validated']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_email_validated']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_email_validated']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_email_validated']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_email_validated']['empty'] = 'Not Validated';
  /* Sort criterion: User: Created date */
  $handler->display->display_options['sorts']['created_1']['id'] = 'created_1';
  $handler->display->display_options['sorts']['created_1']['table'] = 'users';
  $handler->display->display_options['sorts']['created_1']['field'] = 'created';
  $handler->display->display_options['sorts']['created_1']['order'] = 'DESC';
  $handler->display->display_options['sorts']['created_1']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['created_1']['expose']['label'] = 'Created Date';
  /* Filter criterion: User: Active */
  $handler->display->display_options['filters']['status_1']['id'] = 'status_1';
  $handler->display->display_options['filters']['status_1']['table'] = 'users';
  $handler->display->display_options['filters']['status_1']['field'] = 'status';
  $handler->display->display_options['filters']['status_1']['value'] = '1';
  $handler->display->display_options['filters']['status_1']['expose']['operator_id'] = '';
  $handler->display->display_options['filters']['status_1']['expose']['label'] = 'Enabled';
  $handler->display->display_options['filters']['status_1']['expose']['operator'] = 'status_1_op';
  $handler->display->display_options['filters']['status_1']['expose']['identifier'] = 'status_1';
  $handler->display->display_options['filters']['status_1']['expose']['required'] = TRUE;
  $handler->display->display_options['filters']['status_1']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: User: Name (raw) */
  $handler->display->display_options['filters']['name']['id'] = 'name';
  $handler->display->display_options['filters']['name']['table'] = 'users';
  $handler->display->display_options['filters']['name']['field'] = 'name';
  $handler->display->display_options['filters']['name']['operator'] = 'contains';
  $handler->display->display_options['filters']['name']['exposed'] = TRUE;
  $handler->display->display_options['filters']['name']['expose']['operator_id'] = 'name_op';
  $handler->display->display_options['filters']['name']['expose']['label'] = 'User Name';
  $handler->display->display_options['filters']['name']['expose']['operator'] = 'name_op';
  $handler->display->display_options['filters']['name']['expose']['identifier'] = 'name';
  $handler->display->display_options['filters']['name']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Field: User City (field_user_city) */
  $handler->display->display_options['filters']['field_user_city_value']['id'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['filters']['field_user_city_value']['field'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator_id'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['label'] = 'City Location';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['identifier'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: User: The user ID */
  $handler->display->display_options['filters']['uid_raw']['id'] = 'uid_raw';
  $handler->display->display_options['filters']['uid_raw']['table'] = 'users';
  $handler->display->display_options['filters']['uid_raw']['field'] = 'uid_raw';
  $handler->display->display_options['filters']['uid_raw']['operator'] = '!=';
  $handler->display->display_options['filters']['uid_raw']['value']['value'] = '0';

  /* Display: User Manage */
  $handler = $view->new_display('page', 'User Manage', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: User: Name (raw) */
  $handler->display->display_options['filters']['name']['id'] = 'name';
  $handler->display->display_options['filters']['name']['table'] = 'users';
  $handler->display->display_options['filters']['name']['field'] = 'name';
  $handler->display->display_options['filters']['name']['operator'] = 'contains';
  $handler->display->display_options['filters']['name']['exposed'] = TRUE;
  $handler->display->display_options['filters']['name']['expose']['operator_id'] = 'name_op';
  $handler->display->display_options['filters']['name']['expose']['label'] = 'User Name';
  $handler->display->display_options['filters']['name']['expose']['operator'] = 'name_op';
  $handler->display->display_options['filters']['name']['expose']['identifier'] = 'name';
  $handler->display->display_options['filters']['name']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Field: User City (field_user_city) */
  $handler->display->display_options['filters']['field_user_city_value']['id'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['filters']['field_user_city_value']['field'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator_id'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['label'] = 'City Location';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['identifier'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: User: The user ID */
  $handler->display->display_options['filters']['uid_raw']['id'] = 'uid_raw';
  $handler->display->display_options['filters']['uid_raw']['table'] = 'users';
  $handler->display->display_options['filters']['uid_raw']['field'] = 'uid_raw';
  $handler->display->display_options['filters']['uid_raw']['operator'] = '!=';
  $handler->display->display_options['filters']['uid_raw']['value']['value'] = '0';
  /* Filter criterion: User: Active */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'users';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 'All';
  $handler->display->display_options['filters']['status']['exposed'] = TRUE;
  $handler->display->display_options['filters']['status']['expose']['operator_id'] = '';
  $handler->display->display_options['filters']['status']['expose']['label'] = 'Active';
  $handler->display->display_options['filters']['status']['expose']['operator'] = 'status_op';
  $handler->display->display_options['filters']['status']['expose']['identifier'] = 'status';
  $handler->display->display_options['filters']['status']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['path'] = 'admin/people/user-list';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Manage People';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: No Approved User */
  $handler = $view->new_display('page', 'No Approved User', 'page_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: User: Active */
  $handler->display->display_options['filters']['status_1']['id'] = 'status_1';
  $handler->display->display_options['filters']['status_1']['table'] = 'users';
  $handler->display->display_options['filters']['status_1']['field'] = 'status';
  $handler->display->display_options['filters']['status_1']['value'] = '0';
  $handler->display->display_options['filters']['status_1']['expose']['operator_id'] = '';
  $handler->display->display_options['filters']['status_1']['expose']['label'] = 'Enabled';
  $handler->display->display_options['filters']['status_1']['expose']['operator'] = 'status_1_op';
  $handler->display->display_options['filters']['status_1']['expose']['identifier'] = 'status_1';
  $handler->display->display_options['filters']['status_1']['expose']['required'] = TRUE;
  $handler->display->display_options['filters']['status_1']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: User: Name (raw) */
  $handler->display->display_options['filters']['name']['id'] = 'name';
  $handler->display->display_options['filters']['name']['table'] = 'users';
  $handler->display->display_options['filters']['name']['field'] = 'name';
  $handler->display->display_options['filters']['name']['operator'] = 'contains';
  $handler->display->display_options['filters']['name']['exposed'] = TRUE;
  $handler->display->display_options['filters']['name']['expose']['operator_id'] = 'name_op';
  $handler->display->display_options['filters']['name']['expose']['label'] = 'User Name';
  $handler->display->display_options['filters']['name']['expose']['operator'] = 'name_op';
  $handler->display->display_options['filters']['name']['expose']['identifier'] = 'name';
  $handler->display->display_options['filters']['name']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Field: User City (field_user_city) */
  $handler->display->display_options['filters']['field_user_city_value']['id'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['filters']['field_user_city_value']['field'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator_id'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['label'] = 'City Location';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['identifier'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: User: The user ID */
  $handler->display->display_options['filters']['uid_raw']['id'] = 'uid_raw';
  $handler->display->display_options['filters']['uid_raw']['table'] = 'users';
  $handler->display->display_options['filters']['uid_raw']['field'] = 'uid_raw';
  $handler->display->display_options['filters']['uid_raw']['operator'] = '!=';
  $handler->display->display_options['filters']['uid_raw']['value']['value'] = '0';
  /* Filter criterion: User: Email Validated (field_email_validated) */
  $handler->display->display_options['filters']['field_email_validated_value']['id'] = 'field_email_validated_value';
  $handler->display->display_options['filters']['field_email_validated_value']['table'] = 'field_data_field_email_validated';
  $handler->display->display_options['filters']['field_email_validated_value']['field'] = 'field_email_validated_value';
  $handler->display->display_options['filters']['field_email_validated_value']['value'] = array(
    1 => '1',
    0 => '0',
  );
  $handler->display->display_options['filters']['field_email_validated_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_email_validated_value']['expose']['operator_id'] = 'field_email_validated_value_op';
  $handler->display->display_options['filters']['field_email_validated_value']['expose']['label'] = 'Email Validated';
  $handler->display->display_options['filters']['field_email_validated_value']['expose']['operator'] = 'field_email_validated_value_op';
  $handler->display->display_options['filters']['field_email_validated_value']['expose']['identifier'] = 'field_email_validated_value';
  $handler->display->display_options['filters']['field_email_validated_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['path'] = 'admin/people/user-list/blocked';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Manage Disabled User';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Approved User */
  $handler = $view->new_display('page', 'Approved User', 'page_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: User: Active */
  $handler->display->display_options['filters']['status_1']['id'] = 'status_1';
  $handler->display->display_options['filters']['status_1']['table'] = 'users';
  $handler->display->display_options['filters']['status_1']['field'] = 'status';
  $handler->display->display_options['filters']['status_1']['value'] = '1';
  $handler->display->display_options['filters']['status_1']['expose']['operator_id'] = '';
  $handler->display->display_options['filters']['status_1']['expose']['label'] = 'Enabled';
  $handler->display->display_options['filters']['status_1']['expose']['operator'] = 'status_1_op';
  $handler->display->display_options['filters']['status_1']['expose']['identifier'] = 'status_1';
  $handler->display->display_options['filters']['status_1']['expose']['required'] = TRUE;
  $handler->display->display_options['filters']['status_1']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: User: Name (raw) */
  $handler->display->display_options['filters']['name']['id'] = 'name';
  $handler->display->display_options['filters']['name']['table'] = 'users';
  $handler->display->display_options['filters']['name']['field'] = 'name';
  $handler->display->display_options['filters']['name']['operator'] = 'contains';
  $handler->display->display_options['filters']['name']['exposed'] = TRUE;
  $handler->display->display_options['filters']['name']['expose']['operator_id'] = 'name_op';
  $handler->display->display_options['filters']['name']['expose']['label'] = 'User Name';
  $handler->display->display_options['filters']['name']['expose']['operator'] = 'name_op';
  $handler->display->display_options['filters']['name']['expose']['identifier'] = 'name';
  $handler->display->display_options['filters']['name']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Field: User City (field_user_city) */
  $handler->display->display_options['filters']['field_user_city_value']['id'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['filters']['field_user_city_value']['field'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator_id'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['label'] = 'City Location';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['operator'] = 'field_user_city_value_op';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['identifier'] = 'field_user_city_value';
  $handler->display->display_options['filters']['field_user_city_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: User: The user ID */
  $handler->display->display_options['filters']['uid_raw']['id'] = 'uid_raw';
  $handler->display->display_options['filters']['uid_raw']['table'] = 'users';
  $handler->display->display_options['filters']['uid_raw']['field'] = 'uid_raw';
  $handler->display->display_options['filters']['uid_raw']['operator'] = '!=';
  $handler->display->display_options['filters']['uid_raw']['value']['value'] = '0';
  $handler->display->display_options['path'] = 'admin/people/user-list/actived';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Manage White User ';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'management';
  $handler->display->display_options['menu']['context'] = 0;
  $export['admin_users'] = $view;

  $view = new view();
  $view->name = 'comments';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'comment';
  $view->human_name = 'comments';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Relationship: Comment: Content */
  $handler->display->display_options['relationships']['nid']['id'] = 'nid';
  $handler->display->display_options['relationships']['nid']['table'] = 'comment';
  $handler->display->display_options['relationships']['nid']['field'] = 'nid';
  $handler->display->display_options['relationships']['nid']['required'] = TRUE;
  /* Field: Comment: Comment */
  $handler->display->display_options['fields']['comment_body']['id'] = 'comment_body';
  $handler->display->display_options['fields']['comment_body']['table'] = 'field_data_comment_body';
  $handler->display->display_options['fields']['comment_body']['field'] = 'comment_body';
  $handler->display->display_options['fields']['comment_body']['label'] = 'field_comment';
  $handler->display->display_options['fields']['comment_body']['type'] = 'text_plain';
  /* Field: Comment: Email */
  $handler->display->display_options['fields']['field_email']['id'] = 'field_email';
  $handler->display->display_options['fields']['field_email']['table'] = 'field_data_field_email';
  $handler->display->display_options['fields']['field_email']['field'] = 'field_email';
  $handler->display->display_options['fields']['field_email']['label'] = 'field_email';
  $handler->display->display_options['fields']['field_email']['type'] = 'text_plain';
  /* Field: Comment: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'comment';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = 'field_post_date';
  $handler->display->display_options['fields']['created']['date_format'] = 'long';
  /* Field: Comment: Title */
  $handler->display->display_options['fields']['subject']['id'] = 'subject';
  $handler->display->display_options['fields']['subject']['table'] = 'comment';
  $handler->display->display_options['fields']['subject']['field'] = 'subject';
  /* Sort criterion: Comment: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'comment';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Comment: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'comment';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'php';
  $handler->display->display_options['arguments']['nid']['default_argument_options']['code'] = 'return $_GET[\'nid\'];';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: Comment: Approved */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'comment';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status_node']['id'] = 'status_node';
  $handler->display->display_options['filters']['status_node']['table'] = 'node';
  $handler->display->display_options['filters']['status_node']['field'] = 'status';
  $handler->display->display_options['filters']['status_node']['relationship'] = 'nid';
  $handler->display->display_options['filters']['status_node']['value'] = 1;
  $handler->display->display_options['filters']['status_node']['group'] = 1;
  $handler->display->display_options['filters']['status_node']['expose']['operator'] = FALSE;

  /* Display: Comments From Source Content */
  $handler = $view->new_display('services', 'Comments From Source Content', 'services_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'source_content_comments';

  /* Display: Services 2 */
  $handler = $view->new_display('services', 'Services 2', 'services_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;

  /* Display: Services 3 */
  $handler = $view->new_display('services', 'Services 3', 'services_3');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $export['comments'] = $view;

  $view = new view();
  $view->name = 'pictures';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'pictures';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'pictures';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '100';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'full';
  $handler->display->display_options['row_options']['links'] = FALSE;
  /* Relationship: Content: Author */
  $handler->display->display_options['relationships']['uid']['id'] = 'uid';
  $handler->display->display_options['relationships']['uid']['table'] = 'node';
  $handler->display->display_options['relationships']['uid']['field'] = 'uid';
  /* Relationship: Flags: like counter */
  $handler->display->display_options['relationships']['flag_count_rel']['id'] = 'flag_count_rel';
  $handler->display->display_options['relationships']['flag_count_rel']['table'] = 'node';
  $handler->display->display_options['relationships']['flag_count_rel']['field'] = 'flag_count_rel';
  $handler->display->display_options['relationships']['flag_count_rel']['required'] = 0;
  $handler->display->display_options['relationships']['flag_count_rel']['flag'] = 'like';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = 'nid';
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = 'field_body';
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: From User Name */
  $handler->display->display_options['fields']['field_from_user_name']['id'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['table'] = 'field_data_field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['field'] = 'field_from_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['label'] = 'field_user_name';
  $handler->display->display_options['fields']['field_from_user_name']['type'] = 'text_plain';
  /* Field: Content: From User Profile Image */
  $handler->display->display_options['fields']['field_from_user_profile_image']['id'] = 'field_from_user_profile_image';
  $handler->display->display_options['fields']['field_from_user_profile_image']['table'] = 'field_data_field_from_user_profile_image';
  $handler->display->display_options['fields']['field_from_user_profile_image']['field'] = 'field_from_user_profile_image';
  $handler->display->display_options['fields']['field_from_user_profile_image']['label'] = 'field_user_profile_image';
  $handler->display->display_options['fields']['field_from_user_profile_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_from_user_profile_image']['type'] = 'services';
  $handler->display->display_options['fields']['field_from_user_profile_image']['settings'] = array(
    'skip_safe' => 0,
    'skip_empty_values' => 0,
  );
  /* Field: Content: Media Image */
  $handler->display->display_options['fields']['field_media_image']['id'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['fields']['field_media_image']['field'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['label'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_media_image']['settings'] = array(
    'image_style' => '400_400',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_media_image']['delta_offset'] = '0';
  /* Field: Content: Post Date */
  $handler->display->display_options['fields']['field_post_date']['id'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['fields']['field_post_date']['field'] = 'field_post_date';
  $handler->display->display_options['fields']['field_post_date']['label'] = 'post_date';
  $handler->display->display_options['fields']['field_post_date']['type'] = 'date_plain';
  $handler->display->display_options['fields']['field_post_date']['settings'] = array(
    'format_type' => 'long',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Sound */
  $handler->display->display_options['fields']['field_sound']['id'] = 'field_sound';
  $handler->display->display_options['fields']['field_sound']['table'] = 'field_data_field_sound';
  $handler->display->display_options['fields']['field_sound']['field'] = 'field_sound';
  $handler->display->display_options['fields']['field_sound']['label'] = 'field_sound';
  $handler->display->display_options['fields']['field_sound']['type'] = 'text_plain';
  $handler->display->display_options['fields']['field_sound']['delta_offset'] = '0';
  /* Field: Content: Sound Thumbnail */
  $handler->display->display_options['fields']['field_sound_thumbnail']['id'] = 'field_sound_thumbnail';
  $handler->display->display_options['fields']['field_sound_thumbnail']['table'] = 'field_data_field_sound_thumbnail';
  $handler->display->display_options['fields']['field_sound_thumbnail']['field'] = 'field_sound_thumbnail';
  $handler->display->display_options['fields']['field_sound_thumbnail']['label'] = 'field_sound_thumbnail';
  $handler->display->display_options['fields']['field_sound_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_sound_thumbnail']['settings'] = array(
    'image_style' => '400_400',
    'image_link' => '',
  );
  /* Field: Content: Source Type */
  $handler->display->display_options['fields']['field_source_type']['id'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['table'] = 'field_data_field_source_type';
  $handler->display->display_options['fields']['field_source_type']['field'] = 'field_source_type';
  $handler->display->display_options['fields']['field_source_type']['label'] = 'source_type';
  $handler->display->display_options['fields']['field_source_type']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Video */
  $handler->display->display_options['fields']['field_video']['id'] = 'field_video';
  $handler->display->display_options['fields']['field_video']['table'] = 'field_data_field_video';
  $handler->display->display_options['fields']['field_video']['field'] = 'field_video';
  $handler->display->display_options['fields']['field_video']['label'] = 'field_video';
  $handler->display->display_options['fields']['field_video']['type'] = 'text_plain';
  $handler->display->display_options['fields']['field_video']['delta_offset'] = '0';
  /* Field: Content: Video Thumbnail */
  $handler->display->display_options['fields']['field_video_thumbnail']['id'] = 'field_video_thumbnail';
  $handler->display->display_options['fields']['field_video_thumbnail']['table'] = 'field_data_field_video_thumbnail';
  $handler->display->display_options['fields']['field_video_thumbnail']['field'] = 'field_video_thumbnail';
  $handler->display->display_options['fields']['field_video_thumbnail']['label'] = 'field_video_thumbnail';
  $handler->display->display_options['fields']['field_video_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_video_thumbnail']['settings'] = array(
    'image_style' => '400x400_2',
    'image_link' => '',
  );
  /* Field: Flags: Flag counter */
  $handler->display->display_options['fields']['count']['id'] = 'count';
  $handler->display->display_options['fields']['count']['table'] = 'flag_counts';
  $handler->display->display_options['fields']['count']['field'] = 'count';
  $handler->display->display_options['fields']['count']['relationship'] = 'flag_count_rel';
  $handler->display->display_options['fields']['count']['label'] = 'field_flag_counter';
  $handler->display->display_options['fields']['count']['separator'] = '';
  /* Field: Field: User City */
  $handler->display->display_options['fields']['field_user_city_1']['id'] = 'field_user_city_1';
  $handler->display->display_options['fields']['field_user_city_1']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['fields']['field_user_city_1']['field'] = 'field_user_city';
  $handler->display->display_options['fields']['field_user_city_1']['label'] = 'field_user_city';
  $handler->display->display_options['fields']['field_user_city_1']['type'] = 'list_key';
  $handler->display->display_options['fields']['field_user_city_1']['settings'] = array(
    'skip_safe' => 0,
    'skip_empty_values' => 0,
  );
  /* Field: Content: Anonymous Flaged */
  $handler->display->display_options['fields']['field_anonymous_flaged']['id'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['table'] = 'field_data_field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['field'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['label'] = 'field_anonymous_flaged';
  $handler->display->display_options['fields']['field_anonymous_flaged']['type'] = 'number_unformatted';
  $handler->display->display_options['fields']['field_anonymous_flaged']['settings'] = array(
    'thousand_separator' => ' ',
    'prefix_suffix' => 1,
  );
  /* Sort criterion: Content: Post Date (field_post_date) */
  $handler->display->display_options['sorts']['field_post_date_value']['id'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['table'] = 'field_data_field_post_date';
  $handler->display->display_options['sorts']['field_post_date_value']['field'] = 'field_post_date_value';
  $handler->display->display_options['sorts']['field_post_date_value']['order'] = 'DESC';
  /* Contextual filter: Field: User City (field_user_city) */
  $handler->display->display_options['arguments']['field_user_city_value']['id'] = 'field_user_city_value';
  $handler->display->display_options['arguments']['field_user_city_value']['table'] = 'field_data_field_user_city';
  $handler->display->display_options['arguments']['field_user_city_value']['field'] = 'field_user_city_value';
  $handler->display->display_options['arguments']['field_user_city_value']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_user_city_value']['default_argument_type'] = 'php';
  $handler->display->display_options['arguments']['field_user_city_value']['default_argument_options']['code'] = 'return isset($_GET[\'city_id\']) ? $_GET[\'city_id\'] : \'all\';';
  $handler->display->display_options['arguments']['field_user_city_value']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_user_city_value']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_user_city_value']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'content_from_source' => 'content_from_source',
  );
  /* Filter criterion: Content: Sound (field_sound) */
  $handler->display->display_options['filters']['field_sound_value']['id'] = 'field_sound_value';
  $handler->display->display_options['filters']['field_sound_value']['table'] = 'field_data_field_sound';
  $handler->display->display_options['filters']['field_sound_value']['field'] = 'field_sound_value';
  $handler->display->display_options['filters']['field_sound_value']['operator'] = '!=';
  $handler->display->display_options['filters']['field_sound_value']['value'] = '0';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Media Image */
  $handler->display->display_options['fields']['field_media_image']['id'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['fields']['field_media_image']['field'] = 'field_media_image';
  $handler->display->display_options['fields']['field_media_image']['label'] = '';
  $handler->display->display_options['fields']['field_media_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_media_image']['settings'] = array(
    'image_style' => '',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_media_image']['delta_offset'] = '0';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = 'nid';
  $handler->display->display_options['path'] = 'pictures';

  /* Display: Pictures Services */
  $handler = $view->new_display('services', 'Pictures Services', 'services_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'content_from_source' => 'content_from_source',
  );
  /* Filter criterion: Content: Media Image (field_media_image:fid) */
  $handler->display->display_options['filters']['field_media_image_fid']['id'] = 'field_media_image_fid';
  $handler->display->display_options['filters']['field_media_image_fid']['table'] = 'field_data_field_media_image';
  $handler->display->display_options['filters']['field_media_image_fid']['field'] = 'field_media_image_fid';
  $handler->display->display_options['filters']['field_media_image_fid']['operator'] = '!=';
  $handler->display->display_options['filters']['field_media_image_fid']['value']['value'] = '0';
  /* Filter criterion: Content: Video (field_video) */
  $handler->display->display_options['filters']['field_video_value']['id'] = 'field_video_value';
  $handler->display->display_options['filters']['field_video_value']['table'] = 'field_data_field_video';
  $handler->display->display_options['filters']['field_video_value']['field'] = 'field_video_value';
  $handler->display->display_options['filters']['field_video_value']['operator'] = 'empty';
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value']['id'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value']['value'] = 'RT @';
  $handler->display->display_options['path'] = 'services_picture';

  /* Display: Video Services */
  $handler = $view->new_display('services', 'Video Services', 'services_2');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'content_from_source' => 'content_from_source',
  );
  /* Filter criterion: Content: Video (field_video) */
  $handler->display->display_options['filters']['field_video_value']['id'] = 'field_video_value';
  $handler->display->display_options['filters']['field_video_value']['table'] = 'field_data_field_video';
  $handler->display->display_options['filters']['field_video_value']['field'] = 'field_video_value';
  $handler->display->display_options['filters']['field_video_value']['operator'] = '!=';
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value']['id'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value']['value'] = 'RT @';
  $handler->display->display_options['path'] = 'services_video';

  /* Display: Video/Picture/soundcloud Services */
  $handler = $view->new_display('services', 'Video/Picture/soundcloud Services', 'services_3');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '100';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'content_from_source' => 'content_from_source',
  );
  /* Filter criterion: Content: Body (body) */
  $handler->display->display_options['filters']['body_value']['id'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['table'] = 'field_data_body';
  $handler->display->display_options['filters']['body_value']['field'] = 'body_value';
  $handler->display->display_options['filters']['body_value']['operator'] = 'not';
  $handler->display->display_options['filters']['body_value']['value'] = 'RT @';
  $handler->display->display_options['path'] = 'all_resources';

  /* Display: Sound Services */
  $handler = $view->new_display('services', 'Sound Services', 'services_4');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'services_sould';

  /* Display: Services 5 */
  $handler = $view->new_display('services', 'Services 5', 'services_5');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $export['pictures'] = $view;

  return $export;
}
