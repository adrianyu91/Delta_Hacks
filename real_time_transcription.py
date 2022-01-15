# from curses import flash
from email.mime import base
import websockets
import asyncio
import base64
import json
from configure import auth_key
import pyaudio 
import time

import streamlit as st

FRAMES_PER_BUFFER = 3200
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
p = pyaudio.PyAudio()

str_old = ""
str_new = ""
word_difference = 4
character_difference = 13
min_confidence = 0.775

TOO_FAST = False

#starts recording 
stream = p.open(
    format = FORMAT,
    channels = CHANNELS,
    rate = RATE,
    input = True,
    frames_per_buffer = FRAMES_PER_BUFFER
)

st.title('Transcriptor - The Presentation Assitant')

URL = "wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000"

async def send_receive():
    
    print(f'Connecting websocket to url ${URL}')
    
    async with websockets.connect(
        URL, 
        extra_headers = (("Authorization", auth_key), ),
        ping_interval = 5,
        ping_timeout = 20
    ) as _ws:
        
        temp = await asyncio.sleep(0.1)
        print("Receiving Session Begins...")
        
        session_begins = await _ws.recv()
        print(session_begins)
        print("Sending messages...")
        
        async def send():
            while True:
                try:
                    data = stream.read(FRAMES_PER_BUFFER)
                    data = base64.b64encode(data).decode("utf-8")
                    json_data = json.dumps({"audio_data":str(data)})
                    temp = await _ws.send(json_data)
                except websockets.exceptions.ConnectionClosedError as e:
                    print(e)
                    assert e.code == 4000
                    break
                except Exception as e:
                    assert False, "Not a websocket 4008 error"
                temp = await asyncio.sleep(0.05)
            return True
        
        async def receive():
            global str_old
            global str_new
            global TOO_FAST
            last_updated = time.time()
            while True:
                try:
                    result_str = await _ws.recv()
                    str_new = json.loads(result_str)['text']
                    confidence = json.loads(result_str)['confidence']
                    print(str_new + " " + str(confidence))
                    if json.loads(result_str)['message_type'] == 'FinalTranscript':
                        st.markdown(str_new)
                    
                    if time.time_ns() - last_updated > 1000000000:
                        TOO_FAST = False
                   
                    counter = 0
                    if len(str_new.split()) - len(str_old.split()) >= word_difference:
                        print("Flag 1")
                        counter += 1
                    if len(str_new) - len(str_old) >= character_difference:
                        print("Flag 2")
                        counter += 1
                    if confidence < min_confidence and confidence > 0.4:
                        print("Flag 3")
                        counter += 1

                    if counter >= 2:
                        print("You're talking too fast!")
                        TOO_FAST = True
                        last_updated = time.time_ns()
                            
                            
                    str_old = str_new
                except websockets.exceptions.ConnectionClosedError as e:
                    print(e)
                    assert e.code == 4008
                    break
                except Exception as e:
                    assert False, "Not a websocket 4008 error"
                    
        send_result, receive_result = await asyncio.gather(send(), receive())
        
# while True:
#     asyncio.run(send_receive())