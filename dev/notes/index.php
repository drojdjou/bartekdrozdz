<?php

$parts = explode("/", $_SERVER["REQUEST_URI"]);

while(empty($notepath)) {
    $notepath = array_pop($parts);
}

?>
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=2.0, initial-scale=1">

<link rel="stylesheet" href="../css/notes.css">

<title><?php echo ucfirst(preg_replace("/[-_]/", " ", $notepath)); ?></title>
<meta name="description" content="Interactive designer, co-founder of Kuula.">

</head>

<body>
    
<header></header>

<nav></nav>

<main>
    <article><?php echo file_get_contents("raw/$notepath.md"); ?></article>
</main>


<script src="../src/marked.js"></script>
<script src="../src/noteloader.js"></script>

<html>