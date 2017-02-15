<?php

$acc  = $_GET["acc"];
$user = $_GET["user"];
$pass = $_GET["pass"];

//登陆 注册
switch($acc){
	case "lgn":
	//1连接 mysql_connect(地址,用户名,密码)
	mysql_connect("qdm199469320.my3w.com","qdm199469320","chen1215");
	
	//2选库
	mysql_select_db("qdm199469320_db");
	
	//3发送
	$ret = mysql_query("select * from chen_log where user='".$user."' and pass='".$pass."' ");
	 
	
	//echo $ret;
	//4接收
	$row = mysql_fetch_row($ret);
	
	
	if($row){//成功
		echo "{error:1,msg:'恭喜您登陆成功'}";
	} else {//失败
		echo "{error:0,msg:'您的用户名或者密码错误！'}";
	}
	break;
	case "reg":
	
	//1连接
	mysql_connect("qdm199469320.my3w.com","qdm199469320","chen1215");
	//2选库
	mysql_select_db("qdm199469320_db");
	
	//判断
	$ret = mysql_query("select * from chen_log where user='".$user."'");
	
	$row = mysql_fetch_row($ret);
	
	if($row){//用户名重复
		echo "{error:0,msg:'用户名重复了，请换一个用户名！'}";
	} else {//没有重复可以注册
		//3发送
		mysql_query("insert into chen_log values('".$user."','".$pass."') ");
		
		echo "{error:1,msg:'恭喜您注册成功'}";
	}
	break;
	
}




?>