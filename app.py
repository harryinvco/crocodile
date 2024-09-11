from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

api_key = "db2b53c7-ce2e-46b4-8cfb-f9ef8a9596bc"
assistant_id = "f325ec77-f3ae-4b1a-bf82-cb03c3d73346"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data['message']
    session_id = data.get('session_id')

    if not session_id:
        # Create a new chat session
        chat_session = requests.post(
            'https://agentivehub.com/api/chat/session',
            json={
                "api_key": api_key,
                "assistant_id": assistant_id,
            }
        )
        session_id = chat_session.json()["session_id"]

    # Send a message to the chat session
    chat_response = requests.post(
        'https://agentivehub.com/api/chat',
        json={
            "api_key": api_key,
            "session_id": session_id,
            "assistant_id": assistant_id,
            "messages": [{"role": "user", "content": message}]
        }
    )

    response = chat_response.json()
    return jsonify({
        "session_id": session_id,
        "response": response['messages'][-1]['content']
    })

if __name__ == '__main__':
    app.run(debug=True)