<?php

$base_url = 'http://brdg.local:81/third_content';

function json_post($url, $data, $files = array(), $method = "POST") {
	$content_type = 'Content-Type:application/json';
	if (!empty($files) && is_array($files)) {
		$data = array_merge($data, $files);
		$content_type = 'Content-Type:multipart/form-data';
	}
	else {
		$data = json_encode($data);
	}
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, FALSE);
	switch ($method) {
		case "POST":
			curl_setopt($ch, CURLOPT_POST, TRUE);
			break;
		case "PUT":
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
			break;
	}
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array($content_type));
	$ret_data = curl_exec($ch);
	if (!curl_errno($ch)) {
		$info = curl_getinfo($ch);
	}
	else {
		//error.
	}
	curl_close($ch);
	return $ret_data;
}

function get_url($api) {
	global $base_url;
	return $base_url.'/'.$api;
}

// pre_next_node test
$api = 'node/pre_next_node';

$response = json_post(get_url($api), array('nid' => 698));

print_r($response);

// // Update user object
// $api = 'user/update'. '/1';
// $account = array(
// 	'uid' => 1,
// 	'name' => 'admin',
// 	'mail' => '123@abc.com',
// );
// $url = get_url($api);

// $response = json_post($url, array('data' =>$account), array(), 'PUT');

// print_r($response);
