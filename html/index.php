<!DOCTYPE html>
<html>
<head>
    <title>Bartek Drozdz | Portfolio and experiments</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable = no">

    <link href="css/main.css" media="screen, projection" rel="stylesheet" type="text/css" />

    <?php //include 'js-lib.html' ?>

    <script type="text/javascript" src="js/require.js"></script>
    <script type="text/javascript" src="js/main.js"></script>

</head>
<body>

<?php

error_reporting(E_ERROR | E_PARSE);

define('SMARTY_DIR', '../php-lib/smarty/');
require_once(SMARTY_DIR . 'Smarty.class.php');

$data = json_decode(file_get_contents('data/main.json'));

$smarty = new Smarty();

$smarty->assign('data', $data);

$smarty->display('templates/main.html');

?>

<script>
	if(location.host == "localhost" || location.host.indexOf("192.168") > -1) {
		document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>');
	}
</script>

</body>
</html>