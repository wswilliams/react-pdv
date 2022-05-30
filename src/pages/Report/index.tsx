import React, { useState, ChangeEvent } from 'react';
import * as s from '../Dashboard/styled';
import Layout from '../../components/Layout';
import DatePicker from "react-datepicker";
import api from '../../service/api';
import Moment from 'moment';


import "react-datepicker/dist/react-datepicker.css";

import {
  FiDownload
} from 'react-icons/fi';

// import { Container } from './styles';

const Report: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  Moment.locale('en');

  const handleDateStartSelect = (date: Date ) => {
    console.log("handleDateStartSelect", date)
    setStartDate(date)

  }
  const handleDateStartChange = (date: Date) => {
    console.log("handleDateStartChange", date)
    setStartDate(date)
   
  }
  const handleDateEndSelect = (date: Date ) => {
    console.log("handleDateEndSelect", date)
    setEndDate(date)

  }
  const handleDateEndChange = (date: Date) => {
    console.log("handleDateEndChange", date)
    setEndDate(date)
   
  }

  async function  gerarPDF () {
    console.log("startDate", startDate)
    console.log("endDate", endDate)

      let datas: any ={
        startDate: Moment(startDate).format("YYYY-MM-DD"),
        endDate: Moment(endDate).format("YYYY-MM-DD")
      }
  
      await api.get<[]>(
            `compras/relatorio/mes?startDate=${datas.startDate}&endDate=${datas.endDate}`,
          ) .then(response => response.data)
          .then(data => {
            console.log(data)
          }).catch(erro => {
            const data = [erro]
            console.log(data)
      })
  }
  return (
    <Layout>
      <s.Header>
          <s.Title>Relatórios</s.Title>
          <s.Info>
          <span className="date">
            <button id="add" type="button" className="btn btn-secondary" onClick={() => gerarPDF()}>
              Gerar PDF
            </button>  <FiDownload size="24px" color="grey" /> 
          </span>
  
          </s.Info>
        </s.Header>

        <s.CardContainer >
        <div className="Card">
  
           <div className="row">
                <div className="col-md-5">
                    <label>Data Inicial: *</label>
                    <div className='daterangepicker-control-section'>
                      <DatePicker selected={startDate} onChange={(date: Date) => handleDateStartChange(date)} onSelect={(date: Date) => handleDateStartSelect(date)} />
                    </div>
  
                  </div>
                  <div className="col-md-5">
                    <label>Data Final: *</label>
                    <div className='daterangepicker-control-section'>
                      <DatePicker selected={endDate} onChange={(date: Date) => handleDateEndChange(date)} onSelect={(date: Date) => handleDateEndSelect(date)} />
                    </div>
  
                  </div>
            </div>
  
        </div>
        </s.CardContainer>
        
    </Layout>

  );
};

export default Report;
