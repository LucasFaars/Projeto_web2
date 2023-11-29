<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conexao = new mysqli('seu_host', 'seu_usuario', 'sua_senha', 'seu_banco');

    if ($conexao->connect_error) {
        die("Erro na conexão com o banco de dados: " . $conexao->connect_error);
    }
    $taskId = $_POST['id'];
    $feito = $_POST['feito'];
    $sql = "UPDATE tarefas SET feito = $feito WHERE id = $taskId";

    if ($conexao->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conexao->error]);
    }

    $conexao->close();
} else {
    // Se a requisição não for do tipo POST, responder com erro
    http_response_code(405); 
    echo json_encode(['error' => 'Método não permitido']);
}
?>
