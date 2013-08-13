<!DOCTYPE html>
<html>
<head>
    <title>Loren</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable = no">

    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/main.css">

    <script type="text/javascript" src="js/modernizr.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>
<body>

<?php

define('SMARTY_DIR', '../php-lib/smarty/');
require_once(SMARTY_DIR . 'Smarty.class.php');

$data = json_decode(file_get_contents('data/main.json'));

$postA = json_decode(file_get_contents('data/post-a.json'));
$postB = json_decode(file_get_contents('data/post-a.json'));
$postC = json_decode(file_get_contents('data/post-a.json'));

$smarty = new Smarty();

$smarty->assign('data', $data);
$smarty->assign('posts', array($postA, $postB, $postC));

$smarty->display('templates/main.html');

?>

<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>

</body>
</html>