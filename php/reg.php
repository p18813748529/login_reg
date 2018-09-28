
<?php
    header("Content-type:text/html; charset=utf-8");
    $inp = json_decode(file_get_contents("php://input"));
    $username = $inp -> {"username"};
    $password = $inp -> {"password"};
    $sqlInsert = "INSERT INTO login_reg (username,password) VALUES ('$username','$password');";
    $coon = new mysqli("localhost","root","","login_user","3306");
    $result = $coon -> query($sqlInsert);
    // if($result){
    //     if($row["password"]!==$password){
    //         $res["type"] = "pass";
    //     }else{
    //         $res["type"] = "yes";
    //     }
    // }else{
    //     $res["type"] = "user";
    // }
    echo json_encode($result);
?>