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

//echo(DRUPAL_ROOT . '/includes/bootstrap.inc > ');
//echo(DRUPAL_BOOTSTRAP_FULL);

drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

$excel_path = "./csv/user.xlsx";

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

$i = 0;
foreach ($sheetData as $item) {
    try{
    if (!empty($item["B"])) {
        $name = strtolower($item["B"]);
		$first_name = strtolower($item["C"]);
        $user = user_load_by_name($first_name.'.'.$name);
        //print_r($user);
        if(!empty($user))
        {
            $twitter = $item["E"];
            $instagram = $item["F"];
            $weibo = $item["G"];
//            $user->field_instagram_screen_name['und'][0]['value'] = array('value' => $instagram);
//            $user->field_instagram_screen_name['und'][0]['safe_value'] = array('value' => $instagram);
//            $user->field_twitter_screen_name['und'][0]['value'] = array('value' => $twitter);
//            $user->field_twitter_screen_name['und'][0]['safe_value'] = array('value' => $twitter);
            $user->field_weibo_screen_name[und][0][value] = array('value' => $weibo);
            $user->field_weibo_screen_name[und][0][safe_value] = array('value' => $weibo);
            if(!empty($weibo))
            {
            $_user = user_save($user);
            $i++;
            }
            //print_r($_user);
        }
        else
        {
            echo $first_name.'.'.$name.'<br/>';
        }
    }
    }
    catch (Exception $e){
        print $e->getMessage();
    }
//	if (!empty($item["B"])) {
//		$department = $item["A"];
//		$name = strtolower($item["B"]);
//		$first_name = strtolower($item["C"]);
//		$twitter = $item["E"];
//		$instagram = $item["F"];
//		$weibo = $item["G"];
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
}
echo $i;