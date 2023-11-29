<?php
include 'conexao.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $autorId = isset($_SESSION['cliente_id']) ? $_SESSION['cliente_id'] : null;

    if ($autorId) {
        $título = isset($_POST['texto']) ? $_POST['texto'] : '';
        $descricao = isset($_POST['descricao']) ? $_POST['descricao'] : '';
        $data = date('Y-m-d H:i:s');
        $criador = isset($_POST['criador']) ? $_POST['criador'] : '';
        $feito = false;
        $verificarAutor = "SELECT id FROM atores WHERE id = '$autorId'";
        $resultadoAutor = mysqli_query($conexao, $verificarAutor);

        if (mysqli_num_rows($resultadoAutor) > 0) {
            $sql = "INSERT INTO tarefas(texto, autor_id, criador, descricao, data_hora_criacao, feito)
                VALUES ('$título', '$autorId', '$criador', '$descricao', '$data', '$feito')";

            if (mysqli_query($conexao, $sql)) {
                echo "success";
            } else {
                echo "error";
            }
        } else {
            echo "invalid_author";
        }
    } else {
        echo "unauthenticated";
    }
} else {
    echo "invalid_request";
}

mysqli_close($conexao);
?>
