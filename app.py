import threading
from flask import Flask, render_template
# from real_time_transcription import TOO_FAST, send_receive,asyncio
import real_time_transcription
import asyncio
 
app = Flask(__name__)
 
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/toofast')
def tooFast():
    # return render_template('index.html')
    return str(real_time_transcription.TOO_FAST) 

if __name__=="__main__":
    # threading.Thread(target=lambda: asyncio.run(real_time_transcription.send_receive())).start()
    app.run(debug=True)

