 
<?php 
/**
 * This is a very small Directory Listing - to get some Symbols
 */
function listdir($dir='.') { 
    if (!is_dir($dir)) { 
        return false; 
    } 
    
    $files = array(); 
    listdiraux($dir, $files); 

    return $files; 
} 

function listdiraux($dir, &$files) { 
    $handle = opendir($dir); 
    while (($file = readdir($handle)) !== false) { 
        if ($file == '.' || $file == '..') { 
            continue; 
        } 
        $filepath = $dir == '.' ? $file : $dir . '/' . $file; 
        if (is_link($filepath)) 
            continue; 
        if (is_file($filepath)) 
            $files[] = $filepath; 
        else if (is_dir($filepath)) 
            listdiraux($filepath, $files); 
    } 
    closedir($handle); 
} 

$files = listdir('../svg/source/symbols'); 
sort($files, SORT_LOCALE_STRING); 
$array = array( );
foreach ($files as $f) { 
    $f= str_replace("../","",$f);
    array_push($array,["file"=>$f]);
} 
echo json_encode($array);
?>