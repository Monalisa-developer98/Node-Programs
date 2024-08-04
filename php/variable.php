<?php 
$name="Harry";
function global_var(){
    global $name;
    echo "Varibale outside the function". $name;
    echo "</br>";
}
global_var();
echo "Variable outside the function".$name;
?>