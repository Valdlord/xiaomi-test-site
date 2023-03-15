<?php

header('Content-Type: application/json; charset=utf-8');

$data = json_decode(file_get_contents("php://input"));
$name = $data->name;
$phone = $data->phone;

$errors = false;
if (!preg_match("/^[а-яА-яa-zA-Z]+$/", $name)) {
    $errors = "name";
}
if (!preg_match("/^((\+7|7|8)+([0-9]){10})$/", $phone)) {
    $errors = "phone";
}

if (!$errors) {
    $to = "mendelev.vladimir@gmail.com";
    $from = "test.ru";
    $subject = "Заявка с саайта";

    $msg = "Имя: $name \nТелефон: $phone \n";
    $result = mail($to, $subject, $msg, "From: $from");

    if ($result) {
        $responce = [
            "success" => true
        ];
    } else {
        $response = [
            "success" => false,
            "error" => "Произошла ошибка, попробуйте еще раз."
        ];
    }
} else {
    $responce = [
        "success" => false,
        "error" => $errors
    ];
}

echo json_encode($responce);
die();