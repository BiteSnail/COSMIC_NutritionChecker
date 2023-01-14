import { FoodInput } from './FoodInput';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {MyNavbar} from './MyNavbar'
import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Nutrient } from './Nutrient';
import { Notfound } from './Notfound';
import { FoodTable } from './FoodTable';

function App() {
  const [data, setData] = useState([]);
  const [isDisable, setIsDisable] = useState(false);

  return (
    <BrowserRouter>
      <Container>
      <MyNavbar/>
      <FoodInput setData={setData} disable ={isDisable} disableHandler={setIsDisable}/>
        <Routes>
          <Route path="/" element={""}/>
          <Route path="/food/:id" element= {<Nutrient foods={data}/>}/>
          <Route path="/*" element={<Notfound/>}/>
        </Routes>
        {isDisable ? "데이터를 불러오는 중입니다"  : <FoodTable data={data}/>}
      </Container>
    </BrowserRouter>
  );
}

export default App;
