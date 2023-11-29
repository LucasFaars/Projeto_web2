<?php
include 'conexao.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $autorId = isset($_SESSION['cliente_id']) ? $_SESSION['cliente_id'] : null;

    if ($autorId) {
        $idTarefa = isset($_POST['edit_tarefa_id']) ? $_POST['edit_tarefa_id'] : '';
        $novoTitulo = isset($_POST['edit_titulo']) ? $_POST['edit_titulo'] : '';
        $novaDescricao = isset($_POST['edit_descricao']) ? $_POST['edit_descricao'] : '';
        $verificarAutor = "SELECT id FROM atores WHERE id = '$autorId'";
        $resultadoAutor = mysqli_query($conexao, $verificarAutor);

        if (mysqli_num_rows($resultadoAutor) > 0) {
            $sql = "UPDATE tarefas SET texto = ?, descricao = ? WHERE id = ? AND autor_id = ?";
            $stmt = mysqli_prepare($conexao, $sql);
            mysqli_stmt_bind_param($stmt, "ssii", $novoTitulo, $novaDescricao, $idTarefa, $autorId);
            mysqli_stmt_close($stmt);
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
