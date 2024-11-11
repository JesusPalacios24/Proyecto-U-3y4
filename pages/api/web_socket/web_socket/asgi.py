import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from web_socket.routing import websocket_urlpatterns  # Importa las rutas de WebSocket

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web_socket.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})
