var idUsuario;
function TraerRoles() {
    $.ajax({
        type: "POST",
        url: "Services/ServiceComandas.svc/TraerRoles",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        processdata: true,
        success: function (dato) {
            var valor = dato.TraerRolesResult;
            $("#slcRol>option").remove();
            $("#slcRol").append("<option disabled selected name='0'> Rol </option>");
            for (var i = 0; i < valor.length; i++) { 
                var arr = valor[i].split("|"); 
                $("#slcRol").append("<option name='" + arr[0] + "'>" + arr[1] + "</option>");
            }

        }
    }); 
}

function CargarUsuarios() {
    $.ajax({
        type: "POST",
        url: "Services/ServiceComandas.svc/CargarUsuarios",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        processdata: true,
        success: function (dato) {
            var valor = dato.CargarUsuariosResult;
            $("#BodyTabla>tr").remove();
            for (var i = 0; i < valor.length; i++) {
                var arr = valor[i].split("|");
                if (arr[7] == "Activo") {
                    $("#BodyTabla").append('  <tr>  <th scope="col" class="col-md-1">' + arr[0] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[1] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[2] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[4] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[3] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[5] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[6] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[7] + '</th>'
                        + '<th scope="col" class="col-md-2">'
                        + '<button id="btnModificar" onclick="cargar_usuario(this.name)" name="' + arr[0] + '" class="btn col-md-12 my-1">Modificar</button>'
                        + '<button id="btnDesactivar" onclick="desactivar(this.name)" name="' + arr[0] + '" class="btn col my-1">Desactivar</button>'
                        + '</th>'
                        + '</tr>');
                } else {
                    $("#BodyTabla").append('  <tr>  <th scope="col" class="col-md-1">' + arr[0] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[1] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[2] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[4] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[3] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[5] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[6] + '</th>'
                        + '<th scope="col" class="col-md-1">' + arr[7] + '</th>'
                        + '<th scope="col" class="col-md-2">'
                        + '<button id="btnModificar" onclick="cargar_usuario(this.name)" name="' + arr[0] + '" class="btn col-md-12 my-1">Modificar</button>'
                        + '<button id="btnDesactivar" onclick="activar(this.name)" name="' + arr[0] + '" class="btn col my-1">Activar</button>'
                        + '</th>'
                        + '</tr>');
                }
            }

        }
    }); 
}
//Desactivar ingrediente por id
function desactivar(e) {
    $.ajax({
        type: "POST",
        url: "Services/ServiceComandas.svc/DesactivarUsuario",
        data: '{"idIng":"' + e + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        processdata: true,
        success: function (dato) {
            $("#BodyTabla>tr").remove();
            var validar = dato.DesactivarUsuarioResult;
            if (validar != 0) {
                swal("Genial!", "Se a desactivado correctamente!", "success");
                CargarUsuarios();
            } else {

                swal("Upss!", "Error al desactivar!", "error");
            }
        }
    });
}

//Desactivar activar por id
function activar(e) {
    $.ajax({
        type: "POST",
        url: "Services/ServiceComandas.svc/ActivarUsuario",
        data: '{"idIng":"' + e + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        processdata: true,
        success: function (dato) {
            $("#BodyTabla>tr").remove();
            var validar = dato.ActivarUsuarioResult;
            if (validar != 0) {
                swal("Genial!", "Activado Correctamente!", "success");
                CargarUsuarios();
            } else {
                swal("Upss!", "Error al activar!", "error");

            }
        }
    });
}

function cargar_usuario(e) {
    alert(e);
    $.ajax({
        type: "POST",
        url: "Services/ServiceComandas.svc/CargarUsuarioUno",
        data: '{"idIng":"' + e + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        processdata: true,
        success: function (dato) {
            var validar = dato.CargarUsuarioUnoResult;
            validar = validar.split("|"); 
            $("#inpCedula").val(validar[0]);
            $("#inpNombre").val(validar[1]);
            $("#inpApellido").val(validar[2]);
            $("#inpCelular").val(validar[3]);
            $("#inpCorreoElect").val(validar[4]);
            $("#slcRol").val(validar[5]);
            $("#inpCodProduct").attr("disable", "true");
            $("#btnRegistrar").addClass("invisible");
            $("#btnModificarT").removeClass("invisible");
            idUsuario = validar[0];
        }
    });
}


$("#btnModificarT").click(function () {
    if ($("#slcRol option:selected").attr("name") == 0 || $("#inpCedula").val() == "" || $("#inpNombre").val() == "" || $("#inpApellido").val() == "" || $("#inpCorreoElect").val() == "" || $("#inpCelular").val() == "" || $("#inpContraseña").val() == "") {
        swal("Upps!", "Todos los campos deben estar llenos!", "error");
    } else {
        var datos = $("#inpCedula").val() + "|" + $("#inpNombre").val() + "|" + $("#inpApellido").val() + "|" + $("#inpCorreoElect").val() + "|" + $("#inpCelular").val() + "|" + $("#inpContraseña").val() + "|" + $("#slcRol option:selected").attr("name") + "|" + idUsuario; 
        $.ajax({
            type: "POST",
            url: "Services/ServiceComandas.svc/Actualizar_Usuario",
            data: '{"Usuario":"' + datos + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            processdata: true,
            success: function (dato) {
                var valor = dato.Actualizar_UsuarioResult;
                if (valor == "0") {
                    swal("Upps!", "Usuario no registrado!", "error");
                } else if (valor == "1") {
                    swal("Buen trabajo!", "Usuario registrado correctamente!", "success");
                    $("#inpCedula").val("");
                    $("#inpNombre").val("");
                    $("#inpApellido").val("");
                    $("#inpCorreoElect").val("");
                    $("#inpCelular").val("");
                    $("#inpContraseña").val("");
                    TraerRoles();
                    CargarUsuarios();
                }

            }
                  
        });


    }
});

$(document).ready(function () {
    CargarUsuarios();
    TraerRoles();
    $("#btnLogin").click(function () {
        if ($("#inpCorreo").val() == "" || $("#inpContras").val() == "") {
            swal("Upps!", "Todos los campos deben estar llenos!", "error");
        } else {
            var datos = $("#inpCorreo").val() + "|" + $("#inpContras").val();
            $.ajax({
                type: "POST",
                url: "Services/ServiceComandas.svc/Login",
                data: '{"datos":"' + datos + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                processdata: true,
                success: function (dato) {
                    var valor = dato.LoginResult;
                    if (valor == "Mesero") {
                        location.href = "Comandas.html"
                    } else if (valor == "Administrador") {
                        location.href = "Registro_inventario.html"
                    } else if (valor == "Cocinero") {
                        location.href = "Cocinero.html"
                    } else if (valor == "No existe") {

                        swal("Upps!", "Usuario o contraseña incorrecta!", "error");
                    } 
                    
                }
            }); 
            
            }
    });

    $("#btnRegistrar").click(function () {
        if ($("#slcRol option:selected").attr("name") == 0 || $("#inpCedula").val() == "" || $("#inpNombre").val() == "" || $("#inpApellido").val() == "" || $("#inpCorreoElect").val() == "" || $("#inpCelular").val() == "" || $("#inpContraseña").val() == "") {
            swal("Upps!", "Todos los campos deben estar llenos!", "error");
        } else {
            var datos = $("#inpCedula").val() + "|" + $("#inpNombre").val() + "|" + $("#inpApellido").val() + "|" + $("#inpCorreoElect").val() + "|" + $("#inpCelular").val() + "|" + $("#inpContraseña").val() + "|" +$("#slcRol option:selected").attr("name");
         
                      $.ajax({
                            type: "POST",
                            url: "Services/ServiceComandas.svc/Insertar_Usuario",
                            data: '{"datos":"' + datos + '"}',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            async: false,
                            processdata: true,
                            success: function (dato) {
                                var valor = dato.Insertar_UsuarioResult;
                                if (valor == "0") {
                                    swal("Upps!", "Usuario no registrado!", "error");
                                } else if (valor == "1") {
                                    swal("Buen trabajo!", "Usuario registrado correctamente!", "success");
                                    $("#inpCedula").val("");
                                    $("#inpNombre").val("");
                                    $("#inpApellido").val("");
                                    $("#inpCorreoElect").val("");
                                    $("#inpCelular").val("");
                                    $("#inpContraseña").val("");
                                    TraerRoles();
                                }

                            }
            });
            CargarUsuarios();
                
        
        }
    });

});