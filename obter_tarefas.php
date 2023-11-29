<?php
session_start();
include 'conexao.php';

if (isset($_SESSION['cliente_id'])) {
    $cliente_id = $_SESSION['cliente_id'];
    $query = "SELECT id, texto, autor_id, criador, descricao, data_hora_criacao, feito FROM tarefas WHERE autor_id = ?";
    $stmt = mysqli_prepare($conexao, $query);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $cliente_id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);

        if (mysqli_stmt_num_rows($stmt) > 0) {
            mysqli_stmt_bind_result($stmt, $id, $texto, $autor_id, $criador, $descricao, $data_hora_criacao, $feito);
            $tarefas = array();

            while (mysqli_stmt_fetch($stmt)) {
                $tarefa = array(
                    'id' => $id,
                    'texto' => $texto,
                    'autor_id' => $autor_id,
                    'criador' => $criador,
                    'descricao' => $descricao,
                    'data_hora_criacao' => date_format(date_create($data_hora_criacao), 'Y-m-d H:i:s'),
                    'feito' => $feito
                );
                
                $tarefas[] = $tarefa;
            }

            echo json_encode($tarefas);
        } else {
            echo "Nenhuma tarefa encontrada para este cliente.";
        }
    } else {
        echo "Erro na preparação da consulta.";
    }
} else {
    echo "Cliente não autenticado.";
}
?>
