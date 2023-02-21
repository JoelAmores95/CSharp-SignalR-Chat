"use strict";

// Crea e inicia una conexión.
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("sendButton").disabled = true;

connection
  .start()
  .then(function () {
    document.getElementById("sendButton").disabled = false;
  })
  .catch(function (err) {
    return console.error(err.toString());
  });

// Escribir mensaje
document
  .getElementById("sendButton")
  .addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
  });

connection.on("ReceiveMessage", function (user, message) {
  var li = document.createElement("li");
  document.getElementById("messagesList").appendChild(li);
  li.textContent = `${user} says ${message}`;
});

// Eliminar primer mensaje
document
  .getElementById("deleteFirstButton")
  .addEventListener("click", function (event) {
    // Llama a un método del HUB
    connection.invoke("EliminarPrimerMensajeHub").catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
  });

connection.on("EliminarPrimerMensajeJs", function () {
  var listaMensajes = document.querySelector("#messagesList");
  listaMensajes.removeChild(listaMensajes.firstChild);
});

// Eliminar último mensaje
document
  .getElementById("deleteLastButton")
  .addEventListener("click", function (event) {
    // Llama a un método del HUB
    connection.invoke("EliminarUltimoMensajeHub").catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
  });

connection.on("EliminarUltimoMensajeJs", function () {
  var listaMensajes = document.querySelector("#messagesList");
  listaMensajes.removeChild(listaMensajes.lastChild);
});

// Eliminar último mensaje
document
  .getElementById("deleteAllButton")
  .addEventListener("click", function (event) {
    // Llama a un método del HUB
    connection.invoke("VaciarMensajesHub").catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
  });

connection.on("VaciarMensajesJs", function () {
  var listaMensajes = document.querySelector("#messagesList");
  while (listaMensajes.firstChild) {
    listaMensajes.removeChild(listaMensajes.firstChild);
  }
});

// Mantenimiento Alerta
document
  .getElementById("mensajeAlertaButton")
  .addEventListener("click", function (event) {
    // Llama a un método del HUB
    connection.invoke("AvisoMantenimientoHub").catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
  });

connection.on("AvisoMantenimientoJs", function () {
  alert("Se recomienda salir de la sala, entraremos en mantenimiento en breves")
});

// Alerta Personalizada
document
  .getElementById("alertaInputButton")
  .addEventListener("click", function (event) {
    var alerta = document.getElementById("alertaInput").value;
    connection.invoke("EnviarAlertaHub", alerta).catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
  });

connection.on("EnviarAlertaJs", function (mensajeAlerta) {
  alert(mensajeAlerta)
});
