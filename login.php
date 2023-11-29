<?php
include 'conexao.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST["login"];
    $senha = $_POST["senha"];

    $verificar = "SELECT id, email, senha FROM atores WHERE email = ? AND senha = ?";
    $stmt = mysqli_prepare($conexao, $verificar);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ss", $login, $senha);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);

        if (mysqli_stmt_num_rows($stmt) > 0) {
            mysqli_stmt_bind_result($stmt, $id, $email, $senha);
            mysqli_stmt_fetch($stmt);

            // Armazena o ID do usuário na sessão
            $_SESSION['cliente_id'] = $id;

            // Redireciona para a página principal
            header("Location: index.html");
            exit();
        } else {
            // Redireciona de volta para a página de login se as credenciais estiverem incorretas
            header("Location: login.html");
            exit();
        }
    } else {
        echo "Erro na preparação da consulta.";
    }
}
?>
