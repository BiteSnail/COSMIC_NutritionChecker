# 외부 API 받기
[식품안전나라](https://www.foodsafetykorea.go.kr/apiMain.do)

이번 프로젝트에서는 식품안전나라에서 제공하는 `식품영양정보DB(NEW)` 오픈 API를 사용할 것이다. 사용방법은 회원가입 후 해당 서비스를 사용신청하면 된다. 

요청 요구사항은 다음과 같다. 요청인자가 추가로 존재하지만 여기에서는 `DESC_KOR`만을 사용하기 때문에 따로 적지 않는다. 요청 주소를 보면 keyId 부분을 본인의 api key로 넣고 serviceId는 샘플에서 제공하는 것처럼 `I2790`을 사용하면 된다.

| 요청주소 | URL | http://openapi.foodsafetykorea.go.kr/api/keyId/serviceId/dataType/startIdx/endIdx |
| --- | --- | --- |
| 샘플 | http://openapi.foodsafetykorea.go.kr/api/sample/I2790/xml/1/5 |  |
| URL설명 | 추가요청인자가 없을 경우 | http://openapi.foodsafetykorea.go.kr/api/인증키/서비스명/요청파일타입/요청시작위치/요청종료위치 |
| 추가요청인자가 있을 경우 | http://openapi.foodsafetykorea.go.kr/api/인증키/서비스명/요청파일타입/요청시작위치/요청종료위치/변수명=값&변수명=값2 |  |
| 예시 | http://openapi.foodsafetykorea.go.kr/api/sample/I2790/xml/1/5/DESC_KOR=값 &RESEARCH_YEAR=값 &MAKER_NAME=값 &FOOD_CD=값 &CHNG_DT=값 |  |

<aside>
✅ openAPI를 사용하고 있기 때문에 api key를 외부로 유출시키지 않도록 관리하는 것이 중요하다. 아래 내용을 보면 react의 `.env`에 저장한 값도 사용자에게 노출될 수 있다고 경고하고 있다. 그래서 백엔드 서버를 따로 만들어서 백엔드 서버에서 식품의약안전처 공공데이터API를 불러와 저장하고 그 값을 다시 프론트 엔드 서버로 전달하도록 할 것이다.

[How do I hide API key in create-react-app?](https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app)

</aside>

# config
## config 만들기

backend 서버를 만들 때에도 api key값과 기타 외부로 유출되면 안되는 설정값이 존재하기 때문에 config를 만들어서 관리해준다. 실제로 배포하지 않을 것이기 때문에 개발 환경에 대한 정보만 config에 작성한다.

```
[DEFAULT]
api_key = sample
service_url = http://openapi.foodsafetykorea.go.kr/api/
service_id = I2790
service_type = json
service_start_index = 1
service_end_index = 5
```

파이썬에서 config 파일은 `configparser` 라이브러리를 통해 쉽게 저장 및 불러오기가 가능하다. 이번 프로젝트에서는 api request를 보내기 위한 기본 주소인 `default_url`을 만들 때 config를 사용하였다. 이 기본 주소에서 추가 인자를 넣어서 실제로 불러올 수 있다.

```python
import configparser

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
```

# FastAPI와 React 간의 CORS 설정
React 앱 과의 통신을 위해서 CORS를 설정해준다.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
```