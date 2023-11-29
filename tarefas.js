$(document).ready(function () {
    mostrarTarefas();
    $("#todo-form").submit(function (event) {
        event.preventDefault(); 
        salvarTarefa();
    });

    // Adiciona um ouvinte de eventos para os botões
    $("#todo-list").on('click', '.excluir-tarefa', function () {
        var idTarefa = $(this).data('tarefa-id');
        excluirTarefa(idTarefa, $(this).closest('.tarefa'));
    });

    $("#todo-list").on('click', '.editar-tarefa', function () {
        var idTarefa = $(this).data('tarefa-id');
        abrirFormularioEdicao(idTarefa);
    });

    $("#todo-list").on('click', '.feito-tarefa', function () {
        alert("Implemente a marcação da tarefa como feita aqui. ID da Tarefa: " + $(this).data('tarefa-id'));
    });

    $("#cancel-edit-btn").click(function () {
        $("#barra-de-feramentas").show();
    });

    $("#confirm-edit-btn").click(function (event) {
        event.preventDefault();  // Evita o envio padrão do formulário
        confirmarEdicao();
});


function mostrarTarefas() {
    $.ajax({
        type: 'GET',
        url: 'obter_tarefas.php',
        dataType: 'json',
        success: function (data) {
            if (data && data.length > 0) {
                var tarefasHtml = '';

                data.forEach(function (tarefa) {
                    tarefasHtml += "<div class='tarefa'>";
                    tarefasHtml += "<br>Título: " + tarefa.texto + " | Autor: " + tarefa.criador + "</p>";
                    tarefasHtml += "<br><p>Descrição: " + tarefa.descricao + "</p>";
                    tarefasHtml += "<br><div class='botoes-tarefa'>";
                    tarefasHtml += "<button class='excluir-tarefa' data-tarefa-id='" + tarefa.id + "'><i class='fas fa-trash'></i></button> ";
                    tarefasHtml += "<button class='editar-tarefa' data-tarefa-id='" + tarefa.id + "'><i class='fas fa-edit'></i></button> ";
                    tarefasHtml += "<button class='feito-tarefa' data-tarefa-id='" + tarefa.id + "'><i class='fas fa-check'></i></button>";
                    tarefasHtml += "</div>";
                    tarefasHtml += "<hr>";
                    tarefasHtml += "</div>";
                });

                document.getElementById("todo-list").innerHTML = tarefasHtml;
            } else {
                alert("Nenhuma tarefa encontrada para este cliente.");
            }
        },
        error: function () {
            alert("Erro ao conectar ao servidor.");
        }
    });
}

function salvarTarefa() {
    $.ajax({
        type: 'POST',
        url: 'salvar_tarefa.php',
        data: $("#todo-form").serialize(),
        success: function (response) {
            if (response === "success") {
                mostrarTarefas();
                $("#todo-input").val("");
                $("#teste").val("");
                $("#descricao").val("");
            } else {
                alert("Erro ao salvar a tarefa no servidor.");
            }
        },
        error: function () {
            alert("Erro ao conectar ao servidor.");
        }
    });
}

function excluirTarefa(idTarefa, elementoTarefa) {
    $.ajax({
        type: 'POST',
        url: 'excluir.php',
        data: { id_tarefa: idTarefa },
        success: function (response) {
            if (response === "success") {
                elementoTarefa.remove();
            } else {
                alert("Erro ao excluir a tarefa no servidor.");
            }
        },
        error: function () {
            alert("Erro ao conectar ao servidor.");
        }
    });
}



function abrirFormularioEdicao(idTarefa) {
    var tarefaElement = $('.tarefa[data-tarefa-id="' + idTarefa + '"]');
    var titulo = tarefaElement.find('.titulo-tarefa').text().trim(); // Essas classes não existem no seu HTML gerado
    var autor = tarefaElement.find('.autor-tarefa').text().trim(); // Essas classes não existem no seu HTML gerado
    var descricao = tarefaElement.find('.descricao-tarefa').text().trim();

    $("#edit-tarefa-id").val(idTarefa);
    $("#edit-titulo").val(titulo);
    $("#edit-autor").val(autor);
    $("#edit-descricao").val(descricao);

    $("#edit-form").show();
    $("#todo-form").hide();

    $("#barra-de-feramentas").hide();
}

function fecharFormularioEdicao() {
    $("#edit-form").hide();
    $("#todo-form").show();

    $("#barra-de-feramentas").show();
}

function confirmarEdicao() {
    var idTarefa = $("#edit-tarefa-id").val();
    var novoTitulo = $("#edit-titulo").val();
    var novaDescricao = $("#edit-descricao").val();

    $.ajax({
        type: 'POST',
        url: 'editar_tarefa.php',
        data: {
            edit_tarefa_id: idTarefa,
            edit_titulo: novoTitulo,
            edit_descricao: novaDescricao
        },
        success: function () {
            fecharFormularioEdicao();
            mostrarTarefas();
        },
        error: function () {
            alert("Erro ao conectar ao servidor.");
        }
    });
}})