<?php

define('DRUPAL_ROOT', getcwd());

// $_SERVER['HTTP_HOST'] = 'subdomain1.example.com';

//$_SERVER['HTTP_HOST']       = 'http://action-catering.com';
$_SERVER['HTTP_HOST']       = 'default';
$_SERVER['PHP_SELF']        = '/index.php';
$_SERVER['REMOTE_ADDR']     = '127.0.0.1';
$_SERVER['SERVER_SOFTWARE'] = NULL;
$_SERVER['REQUEST_METHOD']  = 'GET';
$_SERVER['QUERY_STRING']    = '';
$_SERVER['PHP_SELF']        = $_SERVER['REQUEST_URI'] = '/';
$_SERVER['HTTP_USER_AGENT'] = 'console';
// $_SERVER['SCRIPT_NAME'] = '/'.'_actcat_import-cn.php';

require_once DRUPAL_ROOT . '/includes/bootstrap.inc';


drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

$excel_path = "./csv/data.xlsx";

/** Include path **/
set_include_path(get_include_path() . PATH_SEPARATOR . 'scripts/libraries/phpexcel/Classes/');

/** PHPExcel_IOFactory */
include 'PHPExcel/IOFactory.php';

if (!file_exists($excel_path)) {
	echo "Store excel doesn't exists!";
	die;
}

$file_type = PHPExcel_IOFactory::identify($excel_path);

$reader = PHPExcel_IOFactory::createReader($file_type);

$dataObj = $reader->load($excel_path);

$sheetData = $dataObj->getActiveSheet()->toArray(null,true,true,true);

//$node1 = node_load(1600);
//print_r($node1);

foreach ($sheetData as $item) {
    try{
//	if (!empty($item["B"])) {
//		$department = $item["A"];
//		$name = strtolower($item["B"]);
//		$first_name = strtolower($item["C"]);
//		$twitter = $item["D"];
//		$instagram = $item["E"];
//		$weibo = $item["F"];
//		$user = new stdClass;
//		$user->mail = $first_name.'.'.$name."@fredfarid.com";
//		$user->pass = "fredfarid";
//		$user->field_instagram_screen_name[LANGUAGE_NONE][] = array('value' => $instagram);
//		$user->field_twitter_screen_name[LANGUAGE_NONE][] = array('value' => $twitter);
//		$user->field_weibo_screen_name[LANGUAGE_NONE][] = array('value' => $weibo);
//		if (user_load(array('name' => $name))) {
//			$name = $name+'_'+$first_name;
//		}
//		$user->name = $name;
//		$user = user_save($user);
//		print_r($user->uid.'.');
//	}
    $_path = $item["D"];
    $_city = $item["F"];
    $text = $item["B"];
    $username = $item["E"];
    $date = $item["G"];
    $json = $item["H"];

    $path = str_replace('www.ff9263.com/uploads/','',$_path);
    $path = str_replace('-BLACK','',$path);

    $city = 0;
    if($_city == 'Paris'){
        $city = 1;
    }
    $twitterData = json_decode($json);

    $ID = $twitterData->id_str;
    $twitter_uid = $twitterData->from_user_id;
    $twitter_user_profile_image = add_image_from_url($twitterData->profile_image_url);
    $drupal_account = brdg_core_load_drupal_user_with_screen_name($username, 'twitter');
        print_r($drupal_account);
    $uid = $drupal_account->uid;
    if(!isset($uid)){
        $uid = 20;
    }
    $file = new stdClass();
    $file->fid = NULL;
    $file->uri = "public://".$path;
    $file->filename = $path;
    $file->filemime = "image/jpeg";
    $file->uid = 1;
    $file->status = 1;
    $file = file_save($file);

    $node = new stdClass();
    $node->type = "content_from_source";
    node_object_prepare($node);
    $node->title = 'from twitter';
    $node->language = 'en';
    $node->uid = 1;
    $node->status = 1;
    $node->comment = 2;
    // Sometimes it has "Incorrect string value" error from mysql;
    $node->body[LANGUAGE_NONE][0]['value'] = remove_non_utf8_string($text);
    $node->body[LANGUAGE_NONE][0]['summary'] = remove_non_utf8_string($text);
    $node->body[LANGUAGE_NONE][0]['format'] = 'full_html';
    $node->field_source_id[LANGUAGE_NONE][0]['value'] = $ID;
    $node->field_from_user_id[LANGUAGE_NONE][0]['value'] = $twitter_uid;
    $node->field_from_user_name[LANGUAGE_NONE][0]['value'] = $username;
    $node->field_user_city[LANGUAGE_NONE][0]['value'] = $city;
    $node->field_post_owed_user[LANGUAGE_NONE][0]['target_id'] = $uid;
    $node->field_source_type[LANGUAGE_NONE][0]['tid'] = 1;
    $node->field_from_user_profile_image[LANGUAGE_NONE][0] = (array)$twitter_user_profile_image;
    $node->field_post_date[LANGUAGE_NONE][0]['value'] = date('Y-m-d H:i:s', strtotime($date));
    $node->field_media_image[LANGUAGE_NONE][] = (array)$file;

    //print_r($node);
    node_save($node);
    echo $node->nid."<br/>";
    }
    catch (Exception $e){
        print $e->getMessage();
    }
}

