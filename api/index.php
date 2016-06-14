<?php 
include('api.php');

$data = $_GET;
$data['website'] = htmlspecialchars($data['website']);
$data['username'] = htmlspecialchars($data['username']);

if(!isset($data['website']) || !isset($data['username']) || !isset($data['salt'])){
	die(json_encode(array('info'=>'参数错误')));
}

// 盐
$salt = preg_replace("/\s/","",$data['salt']);
// 网站域名
$website = preg_replace("/\s/","",$data['website']);
// 用户名
$username = preg_replace("/\s/","",$data['username']);
// 特殊字符
$specialCharacter = "/";


$api = new api($salt, $website, $username, $specialCharacter);
$pwd = $api->createPassword();
$msg = array('info'=>'Successfully get your password','password'=>$pwd);
echo json_encode($msg);