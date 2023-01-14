import React from "react";
import { Link, useParams } from "react-router-dom";
import Piechart from "./Piechart";

export const Nutrient = (props) => {
    const params = useParams();
    const food = props.foods.find((element) => { return params.id === element['FOOD_CD'] })
    return (
        food ? 
            <div class="card">
                <h5 className="card-header">{food['DESC_KOR']}의 영양정보</h5>
                <div className="card-body">
                    <h5 className="card-title">1회 섭취당 칼로리는 {food['NUTR_CONT1']}kcal입니다.</h5>
                    <p className="card-text">
                        <Piechart data={[
                            {
                                "id": "Carbohydrates",
                                "label": "Carbohydrates",
                                "value": Number(food['NUTR_CONT2'])*4,
                                "color": "hsl(121, 70%, 50%)"
                            },
                            {
                                "id": "Protein",
                                "label": "Protein",
                                "value": Number(food['NUTR_CONT3'])*4,
                                "color": "hsl(52, 70%, 50%)"
                            },
                            {
                                "id": "Fat",
                                "label": "Fat",
                                "value": Number(food['NUTR_CONT4'])*9,
                                "color": "hsl(344, 70%, 50%)"
                            },
                        ]}/>
                    </p>
                    <Link to="/" class="btn btn-primary">돌아가기</Link>
                </div>
            </div>
         : "검색 후 다시 시도해 주세요."
    );
}