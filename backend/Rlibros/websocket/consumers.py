import json
from channels.generic.websocket import WebsocketConsumer

class ChatConsumer(WebsocketConsumer):
    clients = set()
    
    def connect(self):
        self.accept()
        ChatConsumer.clients.add(self)
        print("Conexión aceptada")

    def disconnect(self, close_code):
        ChatConsumer.clients.remove(self)
        print("Conexión cerrada")

    def receive(self, text_data):
        # Recibe el mensaje del cliente
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type')

        if message_type == "rent_book":
            book_id = text_data_json.get('bookId')
            title = text_data_json.get('title')
            
            # Procesa el libro rentado y envía una respuesta
            print(f"Libro rentado: ID {book_id}, Título {title}")
            
            # Enviar el mensaje a todos los clientes conectados
            for client in ChatConsumer.clients:
                client.send(text_data=json.dumps({
                    "type": "rent_book",
                    "bookId": book_id,
                    "title": title,  # Indica que el libro fue rentado
                }))
        
        else:
            # Si el mensaje no es de tipo "rent_book", ignóralo o maneja otro tipo de mensaje
            print("Tipo de mensaje no reconocido")

