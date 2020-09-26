<?php
	session_start();
	
	session_destroy();
	//$BASE_URL	= 'http://172.20.8.14/dinkop/panel';
	$BASE_URL	= 'http://192.168.43.54/zendy/panel';
	header("Location: ".$BASE_URL);
	die();

?>