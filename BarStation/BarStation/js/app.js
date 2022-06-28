//Mesa 1 --------------------------------------------------------------




var contPlatos = 0;
var arrayPlatos = new Array();
var arrycantPlatos = new Array(); 
var Mesa;
var contPlatosM = 0;
var idcomandaM;

function eliminarPlato(e) {  
    arrycantPlatos[e,1] = 0; 
    $("#divPlato" + e).remove();  
}

function platosModal(name) { 
    $("#btn-enviar-modal").attr("name", name);
    modal.showModal(); 
    $("#h3TituloCm").text("Mesa " + name);
}

function cargarPlato(id) {
    arrycantPlatos[id] = new Array();
    arrycantPlatos[id][0] = id;
    arrycantPlatos[id][1] = 1;
    id = "slcPlato" + id;
    $("#" + id+">   option").remove();
    $("#" + id).append("<option name='12255522' selected disabled>Seleccione plato</option>"    );
    for (var i = 0; i < arrayPlatos.length; i++) {
        $("#" + id).append("<option name='" + arrayPlatos[i][0]+"'>"+
            arrayPlatos[i][1]+"</option>"
        );
    } 
}

function cargarMesas() {
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "Services/ServiceComandas.svc/NumeroMesas",
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            processdata: true,
            success: function (Fotos) {
                var num = Fotos.NumeroMesasResult; 
                for (var i = 1; i <= num;i++) {
                    $("#contMesas").append('<div class="mesa" id="dvMesa' + i+'">' +
                        '<p class="mesa__nombre">Mesa ' + i+'</p>'+
                        '<button id="btn-abrir-modal" onclick="platosModal(this.name)" class="btnMesa" name="' + i+'"><img src="../img/mesa.jpg" alt=""></button>'+
            '</div>');
                }

            }
        });
    }) 
}

function cargarPlatos() {
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "Services/ServiceComandas.svc/CargarPlatos",
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            processdata: true,
            success: function (platos) { 
                var platosarr = platos.CargarPlatosResult;  
                for (var i = 0; i < platosarr.length; i++) {
                    var arr = platosarr[i].split("|");
                    arrayPlatos.push(arr);
                }
                cargarPlato(0);
            }
        });
    })
}


function TraerComandas() { 
        $.ajax({
            type: "POST",
            url: "Services/ServiceComandas.svc/TraerComandas",
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            processdata: true,
            success: function (Comands) {
                var flag = 0;
                var comanda = Comands.TraerComandasResult;
                $("#bodyOrdenes>tr").remove();
                for (var i = 0; i < comanda.length; i++) {
                    var arr = comanda[i].split("|");
                    if (arr[1] == 1) {
                        $("#btnNotify").removeClass("btnNotify");
                        $("#btnNotify").addClass("btnNotify2");
                        flag = 1;
                    }
                    if (flag == 0) {
                        $("#btnNotify").removeClass("btnNotify2");
                        $("#btnNotify").addClass("btnNotify");
                    }
                    $("#bodyOrdenes").append("<tr>"+
                        "<th>" + arr[0]+"</th>"+
                        "<th>" + arr[2]+"</th>"+
                        "<th>" + arr[3]+"</th>"+
                        "<th><button name='" + arr[0] + "' onclick='Modificar(this.name)'class='botoncierre'> Modificar</button></th>" +
                        "<th><button name='" + arr[0] + "' onclick='Entregar(this.name,this.id)' id='4' class='botoncierre'> Entregar</button></th>" +
                        "<th><button name='" + arr[0] + "' class='botoncierre' onclick='Entregar(this.name,this.id)' id='3'> Cancelar</button></th>" +
                           "</tr>");
                } 
            }
        })
} 
function Modificar(e) {
    $("#MorePlatosM>div").remove();
    idcomandaM = e;
    modal2.close(); 
    $.ajax({
        type: "POST",
        url: "Services/ServiceComandas.svc/CargarUnaComanda",
        data: '{"ID":"' + e + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        processdata: true,
        success: function (Comands) {
            var platos = Comands.CargarUnaComandaResult;
            modal3.showModal();
            cargarPlatoM(0);
            cargarEnMdal(0, platos[0].split("|"));
            for (var i = 1; i < platos.length; i++) {
                $("#MorePlatosM").append('    <div id="divPlatoM' + i + '" style = "margin-top:15px; display: inline-flex;" > <div>' +
                    '  <select id="slcPlatoM' + i + '" class="js-example-basic-single" name="state">' +
                    '</select> ' +
                    '   </div> ' +
                    '  <div> ' +
                    '<input type = "number" min="1" class="inpCantPlato" values="1" id="cantPlatoM' + i + '" /> ' +
                    '</div> ' +
                    ' <div> ' +
                    '<button id = "btnEliminarPLatoM" onclick="eliminarPlatoM(this.name)" name="' + i + ' "class="botoncierre" style ="margin-top: -2px;"> -</button> ' +
                    '</div> </div>');
                cargarPlatoM(i);
                contPlatosM = contPlatosM + 1;
                cargarEnMdal(i, platos[i].split("|"));
            }
            $.ajax({
                type: "POST",
                url: "Services/ServiceComandas.svc/CargarComentario",
                data: '{"IDComanda":"' + e + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                processdata: true,
                success: function (Comands) {
                    $("#txtComentarioM").val(Comands.CargarComentarioResult);
                }
            });
            
        }
    })
}

function cargarPlatosM(platos) {
    for (var i = 1; i < platos.length; i++) {
        $("#MorePlatosM").append('    <div id="divPlatoM' + i + '" style = "margin-top:15px; display: inline-flex;" > <div>' +
            '  <select id="slcPlatoM' + i + '" class="js-example-basic-single" name="state">' +
            '</select> ' +
            '   </div> ' +
            '  <div> ' +
            '<input type = "number" min="1" class="inpCantPlato" values="1" id="cantPlatoM' + i + '" /> ' +
            '</div> ' +
            ' <div> ' +
            '<button id = "btnEliminarPLatoM" onclick="eliminarPlatoM(this.name)" name="' + i + ' "class="botoncierre" style ="margin-top: -2px;"> -</button> ' +
            '</div> </div>');
        cargarPlatoM(i);
        contPlatosM = contPlatosM + 1;
        cargarEnMdal(i, platos[i].split("|"));
    }
}

function eliminarPlatoM(e) { 
    $.ajax({
        type: "POST",
        url: "Services/ServiceComandas.svc/EliminarPlatoComanda",
        data: '{"IDComanda":"' + idcomandaM + '","IDPlato":"' + $("#slcPlatoM" + e).val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        processdata: true,
        success: function (Comands) {
            var comanda = Comands.EliminarPlatoComandaResult;
            if (comanda == 1) {
                $("#MorePlatosM>div").remove();
                $("#cantPlatoM0").val(0);
                $.ajax({
                    type: "POST",
                    url: "Services/ServiceComandas.svc/CargarUnaComanda",
                    data: '{"ID":"' + idcomandaM + '"}',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    processdata: true,
                    success: function (Comands) {
                        var platos = Comands.CargarUnaComandaResult;
                        cargarPlatoM(0);
                        cargarEnMdal(0, platos[0].split("|"));
                        for (var i = 1; i < platos.length; i++) {
                            $("#MorePlatosM").append('    <div id="divPlatoM' + i + '" style = "margin-top:15px; display: inline-flex;" > <div>' +
                                '  <select id="slcPlatoM' + i + '" class="js-example-basic-single" name="state">' +
                                '</select> ' +
                                '   </div> ' +
                                '  <div> ' +
                                '<input type = "number" min="1" class="inpCantPlato" values="1" id="cantPlatoM' + i + '" /> ' +
                                '</div> ' +
                                ' <div> ' +
                                '<button id = "btnEliminarPLatoM" onclick="eliminarPlatoM(this.name)" name="' + i + ' "class="botoncierre" style ="margin-top: -2px;"> -</button> ' +
                                '</div> </div>');
                            cargarPlatoM(i);
                            contPlatosM = contPlatosM + 1;
                            cargarEnMdal(i, platos[i].split("|"));
                        }

                    }
                })
            } else {
                alert("Error al eliminar");
            }

        }
    })
}

function cargarEnMdal(id,plato) {
    $("#slcPlatoM" + id).val(plato[1]);
    $("#cantPlatoM" + id).val(plato[2]);
}

function cargarPlatoM(id) {
    arrycantPlatos[id] = new Array();
    arrycantPlatos[id][0] = id;
    arrycantPlatos[id][1] = 1;
    id = "slcPlatoM" + id;
    $("#" + id + ">   option").remove();
    $("#" + id).append("<option name='12255522' selected disabled>Seleccione plato</option>");
    for (var i = 0; i < arrayPlatos.length; i++) {
        $("#" + id).append("<option name='" + arrayPlatos[i][0] + "'>" +
            arrayPlatos[i][1] + "</option>"
        );
    }
}
function Entregar(e,i) {
    $.ajax({
        type: "POST",
        url: "Services/ServiceComandas.svc/EstdoComanda",
        data: '{"id":"'+e+'","estado":"'+i+'"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        processdata: true,
        success: function (Comands) {
            var comanda = Comands.EstdoComandaResult;
            if (comanda != 0) {

                modal2.close();
                swal("Genial", "Modificado correctamente", "success"); 
            } else {

                modal2.close();
                swal("Upss!!", "Error al modificar", "error"); 
            }
            
        }
    })
}

function AgregarPlato(e, i) {
    if ($("#slcPlatoM" + i).val() == 12255522 || $("#cantPlatoM" + i).val() == "") {
        alert("campos vacios");
    } else { 
        var idP = $("#slcPlatoM" + i).val(); 
        var can = $("#cantPlatoM" + i).val();
        $.ajax({
            type: "POST",
            url: "Services/ServiceComandas.svc/AgregarPlatoComanda",
            data: '{"IDComanda":"' + e + '","IDPlato":"' + idP + '","Cantidad":"' + can + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            processdata: true,
            success: function (Comands) {
                var comanda = Comands.AgregarPlatoComandaResult;
                if (comanda == 1) {
                    $("#MorePlatosM>div").remove();     
                    $.ajax({
                        type: "POST",
                        url: "Services/ServiceComandas.svc/CargarUnaComanda",
                        data: '{"ID":"' + e + '"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        processdata: true,
                        success: function (Comands) {
                            var platos = Comands.CargarUnaComandaResult;
                            cargarPlatoM(0);
                            cargarEnMdal(0, platos[0].split("|"));
                            for (var i = 1; i < platos.length; i++) {
                                $("#MorePlatosM").append('    <div id="divPlatoM' + i + '" style = "margin-top:15px; display: inline-flex;" > <div>' +
                                    '  <select id="slcPlatoM' + i + '" class="js-example-basic-single" name="state">' +
                                    '</select> ' +
                                    '   </div> ' +
                                    '  <div> ' +
                                    '<input type = "number" min="1" class="inpCantPlato" values="1" id="cantPlatoM' + i + '" /> ' +
                                    '</div> ' +
                                    ' <div> ' +
                                    '<button id = "btnEliminarPLatoM" onclick="eliminarPlatoM(this.name)" name="' + i + ' "class="botoncierre" style ="margin-top: -2px;"> -</button> ' +
                                    '</div> </div>');
                                cargarPlatoM(i);
                                contPlatosM = contPlatosM + 1;
                                cargarEnMdal(i, platos[i].split("|"));
                            }

                        }
                    })
                } else {
                    alert("Error al insertar");
                }

            }
        })
    }
}

let identificadorTiempoDeEspera;

function temporizadorDeRetraso() {
    identificadorTiempoDeEspera = setInterval(TraerComandas, 3000);
}
$(document).ready(function () {
    TraerComandas();
    temporizadorDeRetraso();
    $("#btn-enviar-modal").click(function () {
        var Platos = ""; 
        for (var i = 0; i < arrycantPlatos.length; i++) {
            var arr = arrycantPlatos[i]; 
            if (arr[1] == 1) {
                Platos += $("#slcPlato" + i).val() + "|" + $("#cantPlato" + i).val()+"*";
            }          
          
        }
        Mesa = $(this).attr("name");
        var comentario = $("#txtComentario").val(); 
        $.ajax({
            type: "POST",
            url: "Services/ServiceComandas.svc/crearComandas",
            data: '{"Platos": "' + Platos + '", "idMesa": "' + Mesa + '","Comentario":"' + comentario+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            processdata: true,
            success: function (Fotos) {
                var num = Fotos.CrearComandasResult;  
                swal(num[2], num[1], num[0]);
                    cargarPlato(0); 
            }
        });
        modal.close();
        $("#txtComentario").val(""); 
            $("#MorePlatos").remove();
            $("#cantPlato0").val("0");
    });
    cargarMesas(); 
    cargarPlatos();
    $('#slcPlato0').select2({
        dropdownParent: $('#modal')
    });


    $("#CerrarOrden").click(function () {

        modal2.close();
    });

    $("#btnAddPlato").click(function () {
        contPlatos = contPlatos + 1;
        $("#MorePlatos").append('    <div id="divPlato' + contPlatos+'" style = "margin-top:15px; display: inline-flex;" > <div>' +
            '  <select id="slcPlato' + contPlatos + '" class="js-example-basic-single" name="state">' +
            '</select> ' +
            '   </div> ' +
            '  <div> ' +
            '<input type = "number" min="1" class="inpCantPlato" values="1" id="cantPlato' + contPlatos + '" /> ' +
            '</div> ' +
            ' <div> ' +
            '<button id = "btnEliminarPLato" onclick="eliminarPlato(this.name)" name="' + contPlatos + ' "class="botoncierre" style ="margin-top: -2px;"> -</button> ' +
            '</div> </div>');
        cargarPlato(contPlatos);
        $('#slcPlato' + contPlatos).select2({
            dropdownParent: $('#modal')
        });
        arrycantPlatos[contPlatos][0] = contPlatos;
        arrycantPlatos[contPlatos][1] = 1;

    }); 
    $("#btnAddPlatoM").click(function () { 
        contPlatosM = contPlatosM + 1;
        $("#MorePlatosM").append('    <div id="divPlato' + contPlatosM + '" style = "margin-top:15px; display: inline-flex;" > <div>' +
            '  <select id="slcPlatoM' + contPlatosM + '" class="js-example-basic-single" name="state">' +
            '</select> ' +
            '   </div> ' +
            '  <div> ' +
            '<input type = "number" min="1" class="inpCantPlato" values="1" id="cantPlatoM' + contPlatosM + '" /> ' +
            '</div> ' +
            ' <div> ' +
            '<button id = "btnEliminarPLato" onclick="eliminarPlato(this.name)" name="' + contPlatosM + ' "class="botoncierre" style ="margin-top: -2px;"> -</button> ' +
            '<button id = "'+contPlatosM+'" onclick="AgregarPlato(this.name,this.id)" name="' + idcomandaM + ' "class="botoncierre" style ="margin-top: -2px;"> OK</button> ' +
           '</div> </div>');
        cargarPlatoM(contPlatosM); 

    });
    $(".btnMesa").click(function () { 
        Mesa = $(this).attr("name");
        $("#btn-enviar-modal").attr("name", name);
        modal.showModal();
        contPlatos = 1;
        $("#h3TituloCm").text("Mesa " + name);
    });

    $(".boton-orden").click(function () {
        var name = $(this).attr("name");
    }); 

    $("#btn-cerrar-modal").click(function () {
        modal.close();
        $("#MorePlatos").remove();
        $("#cantPlato1").val("0");
    });

    $("#btn-cerrar-modal3").click(function () {
        modal3.close(); 
        $.ajax({
            type: "POST",
            url: "Services/ServiceComandas.svc/ActualizaComentario",
            data: '{"IDComanda": "' + idcomandaM + '", "comentario": "' + $("#txtComentarioM").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            processdata: true,
            success: function (Fotos) {
                var num = Fotos.CrearComandasResult; 
                alert(num);
            }
        });
        modal2.showModal();
    });
    $(".btnMesa").hover(function () {
        var name = $(this).attr("name");
        $("#dvMesa" + name).removeClass("mesa");
        $("#dvMesa" + name).addClass("mesa_ov");
    }, function () {
        var name = $(this).attr("name");
        $("#dvMesa" + name).removeClass("mesa_ov");
        $("#dvMesa" + name).addClass("mesa");
    });

});

 