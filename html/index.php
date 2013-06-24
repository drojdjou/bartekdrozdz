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