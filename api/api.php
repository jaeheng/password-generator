<?php
/**
* api
*/
class api {
	var $salt;
	var $website;
	var $username;
	var $specialCharacter;

	function __construct($salt, $website, $username, $specialCharacter)
	{
		$this->salt 				= $salt;
		$this->website 				= $website;
		$this->username 			= $username;
		$this->specialCharacter 	= $specialCharacter;
	}

	/**
	 * 创建密码并返回
	 * @param  string $salt             盐
	 * @param  string $website          网站域名
	 * @param  string $username         用户名
	 * @param  string $specialCharacter 特殊字符
	 * @return string                   生成的含有大小写字母、数字、特殊字符的10-12位的密码
	 */
	function createPassword() {

		$salt 				= $this->salt;
		$website 			= $this->website;
		$username 			= $this->username;
		$specialCharacter 	= $this->specialCharacter;

		// 拼接字符串
		$str = $username . '@' . $website . '&&' . $salt;
		// md5加密并取前10位，最后添加特殊字符
		$str = mb_strcut(md5($str), 0,10) . $specialCharacter;

		// 未匹配出小写字母， 添加a
		if(!preg_match('/[a-z]+/', $str)){
		    $str .= 'a';
		}
		// 未匹配出大写字母， 添加A
		if(!preg_match('/[A-Z]+/', $str)){
		    $str .= 'A';
		}
		// 未匹配出数字， 添加0
		if(!preg_match('/[1-9]\d+/', $str)){
			$str .= '0';
		}
		$this->savePassword($str);
		// 最终生成了一个，含有大小写字母、数字、特殊字符的10-12位的密码
		return $str;
	}

	// 保存密码到文件
	function savePassword($pwd) {
		$str = 'username:' . $this->username . ' website:' . $this->website . ' password:' . $pwd . "\n";
		$myfile = fopen("./logs/pwd_logs.txt", "a") or die("Unable to open file!");
		fwrite($myfile, $str);
		fclose($myfile);
	}
}