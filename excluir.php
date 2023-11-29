<?php
include 'conexao.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $autorId = isset($_SESSION['cliente_id']) ? $_SESSION['cliente_id'] : null;
    if (!$autorId) {
        echo "Não autenticado";
        exit;
    }
    $id_tarefa = isset($_POST['id_tarefa']) ? $_POST['id_tarefa'] : null;
    if (!$id_tarefa) {
        echo "Tarefa não encontrada";
        exit;
    }
    $verificarPropriedade = "SELECT id FROM tarefas WHERE id = '$id_tarefa' AND autor_id = '$autorId'";
    $resultadoPropriedade = mysqli_query($conexao, $verificarPropriedade);
    if (mysqli_num_rows($resultadoPropriedade) === 0) {
        exit;
    }

    $sqlExcluir = "DELETE FROM tarefas WHERE id = '$id_tarefa' AND autor_id = '$autorId'";

    if (mysqli_query($conexao, $sqlExcluir)) {
        echo "Exclusão feita";
    } else {
        echo "Erro";
    }
} else {
    echo "Requisição invalida";
}

mysqli_close($conexao);
?>
