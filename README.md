# password generator

用于生成密码

## 密码规则：

- $str = 用户名@网站域名&&自己的标识符
- base64_encode(md5($str))
- 取前10，在最后添加特殊字符/
- 如果这些字符里没有数字，最后加0
- 如果这些字符里没有小写字母，最后加a
- 如果这些字符里没有大写字母，最后加A
- 最终生成了一个，含有大小写字母、数字、特殊字符的11-12位的密码

== 最重要的是自己的标识符 ==