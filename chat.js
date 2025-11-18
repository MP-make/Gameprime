// chat.js - Lógica del chat con IA
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos
    const chatModal = document.getElementById('chatModal');
    const openChatBtn = document.getElementById('openChatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatMessages = document.getElementById('chatMessages');

    // Obtener token del localStorage
    function getToken() {
        return localStorage.getItem('token');
    }

    // Abrir chat
    openChatBtn.addEventListener('click', () => {
        chatModal.classList.add('active');
        chatInput.focus();
    });

    // Cerrar chat
    closeChatBtn.addEventListener('click', () => {
        chatModal.classList.remove('active');
    });

    // Cerrar chat al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === chatModal) {
            chatModal.classList.remove('active');
        }
    });

    // Agregar mensaje al chat
    function addMessage(texto, tipo) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${tipo}`;
        messageDiv.textContent = texto;
        chatMessages.appendChild(messageDiv);
        
        // Scroll automático al último mensaje
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Enviar pregunta
    async function enviarPregunta() {
        const pregunta = chatInput.value.trim();
        
        if (!pregunta) return;
        
        // Verificar autenticación
        const token = getToken();
        if (!token) {
            addMessage('Por favor, inicia sesión para usar el chat.', 'bot');
            return;
        }
        
        // Mostrar pregunta del usuario
        addMessage(pregunta, 'user');
        chatInput.value = '';
        
        // Deshabilitar input mientras se procesa
        chatInput.disabled = true;
        sendChatBtn.disabled = true;
        
        // Mostrar "escribiendo..."
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.textContent = 'Escribiendo...';
        typingDiv.id = 'typing-indicator';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        try {
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ pregunta })
            });
            
            // Remover "escribiendo..."
            typingDiv.remove();
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
                }
                throw new Error('Error en la respuesta del servidor');
            }
            
            const data = await response.json();
            addMessage(data.respuesta, 'bot');
            
        } catch (error) {
            console.error('Error:', error);
            const errorMsg = error.message || 'Lo siento, hubo un error. Intenta de nuevo más tarde.';
            typingDiv.remove();
            addMessage(errorMsg, 'bot');
        } finally {
            // Rehabilitar input
            chatInput.disabled = false;
            sendChatBtn.disabled = false;
            chatInput.focus();
        }
    }

    // Event listeners
    sendChatBtn.addEventListener('click', enviarPregunta);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarPregunta();
        }
    });

    // Mensaje de bienvenida aleatorio
    const mensajesBienvenida = [
        '¡Hola! ¿Buscas información sobre nuestros videojuegos?',
        '¿Necesitas ayuda con tu compra?',
        '¿Tienes alguna pregunta sobre nuestros juegos?',
        '¡Bienvenido! Estoy aquí para ayudarte con GamePrime. 🎮'
    ];

    // Agregar mensaje de bienvenida aleatorio después de 2 segundos
    setTimeout(() => {
        const mensajeAleatorio = mensajesBienvenida[Math.floor(Math.random() * mensajesBienvenida.length)];
        addMessage(mensajeAleatorio, 'bot');
    }, 2000);
});