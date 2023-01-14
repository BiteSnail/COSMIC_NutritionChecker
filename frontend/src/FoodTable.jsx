import React from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

export const FoodTable = (props) => {
    const foods = props.data.map((food, id) => {
      return (<tr key={id}>
              <td>{food['GROUP_NAME']}</td>
              <td><Link to={"/food/"+ food['FOOD_CD']}>{food['DESC_KOR']}</Link></td>
              <td>{food['MAKER_NMAE']}</td>
              <td>{food['SERVING_SIZE']}</td>
              <td>{food['NUTR_CONT1']}</td>
      </tr>)
  });
    return (
        <div>
        <Table bordered hover>
          <thead>
            <tr>
              <th scope="col">식품군</th>
              <th scope="col">식품이름</th>
              <th scope="col">제조사명</th>
              <th scope="col">총내용량(g)</th>
              <th scope="col">열량(kcal)(1회제공량당)</th>
            </tr>
          </thead>
          <tbody>
            {foods}
          </tbody>
        </Table>
      </div>
    )
}