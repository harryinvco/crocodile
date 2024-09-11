import requests

api_key = "db2b53c7-ce2e-46b4-8cfb-f9ef8a9596bc"

# Create a new chat session
chat_session = requests.post(
  'https://agentivehub.com/api/chat/session',
json = {
 "api_key" : api_key,
 "assistant_id" : "f325ec77-f3ae-4b1a-bf82-cb03c3d73346",
}
)

# Get the chat session ID
chat_session_id = chat_session.json()["session_id"]

# Send a message to the chat session
chat_response = {
  "api_key" : api_key,
  "session_id" : chat_session_id,
  "assistant_id" : "f325ec77-f3ae-4b1a-bf82-cb03c3d73346",
  "messages" : [{"role": "user", "content": "Say Hello!"}]
}

req = requests.post(
   'https://agentivehub.com/api/chat',
 json = chat_response
)

resp = req.json()