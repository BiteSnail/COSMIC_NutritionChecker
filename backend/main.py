from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import configparser
import uvicorn
from src.mydatabase import DATABASE

app = FastAPI()
db = DATABASE()
config = configparser.ConfigParser()
config.read('config.ini')
default_url = (
    config['DEFAULT']['service_url']
    + config['DEFAULT']['api_key'] + '/'
    + config['DEFAULT']['service_id'] + '/'
    + config['DEFAULT']['service_type'] + '/'
    + config['DEFAULT']['service_start_index'] + '/'
    + config['DEFAULT']['service_end_index'] + '/'
)

origins = {
    "http://localhost",
    "http://localhost:3000",
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)

@app.get("/api/food/{desc_kor}")
async def get_nutirition(desc_kor:str):
    if not db.is_searched(desc_kor):
        request_url = (default_url + 'DESC_KOR=' + desc_kor)
        response = requests.get(request_url)
        result = response.json()[config['DEFAULT']['service_id']]
        db.update(result['row'], keyword=desc_kor)
        print(result['RESULT'])
        result = result['row']
    else:
        result = db.find(desc_kor)
    return result

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)