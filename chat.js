<!DOCTYPE html>
<html>

<head>
    <title>Chat Application</title>
    <link rel="stylesheet" type="text/css" href="styles.css">    
</head>

<body>
    <div id="app">
        <div class="chat-container">
            <div id="chat-messages" class="chat-messages">
                <ul>
                    <li v-for="message in messages":key="message">{{ message }}
                    </li>
                </ul>
            </div>
            <div class="chat-input">
                <input type="text" v-model="newMessage" placeholder="Type your message">
                <button @click="sendMessage">Send</button>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                messages: [],
                newMessage: ''
            },
            mounted() {
                const socket = new WebSocket('ws://localhost:8080/chat'); // Replace with your WebSocket endpoint

                socket.addEventListener('message', (event) => {
                    const message = event.data;
                    this.messages.push(message);
                });
            },
            methods: {
                sendMessage() {
                    const message = this.newMessage;
                    this.messages.push(message);
                    this.newMessage = '';

                    const socket = new WebSocket('ws://localhost:8080/chat'); // Replace with your WebSocket endpoint
                    socket.addEventListener('open', () => {
                        socket.send(message);
                    });
                }
            }
        });
    </script>
</body>

</html>
