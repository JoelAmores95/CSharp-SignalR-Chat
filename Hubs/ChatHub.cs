using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task EliminarUltimoMensajeHub()
        {
            await Clients.All.SendAsync("EliminarUltimoMensajeJs");
        }

        public async Task EliminarPrimerMensajeHub()
        {
            await Clients.All.SendAsync("EliminarPrimerMensajeJs");
        }

        public async Task VaciarMensajesHub()
        {
            await Clients.All.SendAsync("VaciarMensajesJs");
        }

        public async Task AvisoMantenimientoHub()
        {
            await Clients.All.SendAsync("AvisoMantenimientoJs");
        }

        public async Task EnviarAlertaHub(string mensajeAlerta)
        {
            await Clients.All.SendAsync("EnviarAlertaJs", mensajeAlerta);
        }
        
    }
}