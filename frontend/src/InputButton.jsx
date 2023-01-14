import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export const InputButton = (props) => {
    const [descKor, setDescKor] = useState("");
  
    const inputHandler = (event) => {
      setDescKor(event.target.value);
    }

    const onSubmit = () => {
        if(descKor){
            fetch('http://127.0.0.1:8000/api/food/'+descKor)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                props.dataHandler(data);
                props.disableHandler(false);
            })
            .catch(error => {
                console.log(error)
            })
        }
        else{
            alert('뭐라도 입력해주세요')
            props.disableHandler(false);
        }
    }

    return (
        <div className="row g-2">
            <div className="col-10 ms-md-auto">
                <FloatingLabel
                    controlId="floatingInput"
                    label="식품 이름"
                >
                    <Form.Control 
                    type="text"
                    value={descKor}
                    onChange={inputHandler}
                    />
                </FloatingLabel>
            </div>
            <div className="col-2 align-self-center ms-md-auto">
                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={props.isDisable}
                    onClick={()=>{
                        new Promise((resolve, reject) => {
                            resolve(props.disableHandler(true))
                        })
                        .then((resolve) => {
                            onSubmit()
                        })
                    }}
                >
                    {props.isDisable ? 
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : "검색하기"}
                    <span className="visually-hidden">Loading...</span>
                </Button>
            </div>
        </div>
    )    
}