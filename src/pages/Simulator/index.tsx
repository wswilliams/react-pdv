import React, { useEffect, useState, ChangeEvent } from 'react';
import Layout from '../../components/Layout';
import api from '../../service/api';
import { ProductList } from '../../components/ProductList';
import { useDispatch } from 'react-redux';
import * as s from '../Dashboard/styled';
import bol from '../../assets/images/football-sport-futbol-icon.svg';
import {
  FiGrid, FiEdit, FiGlobe
} from 'react-icons/fi';

export interface Stock {
  id: number;
  amount: number;
}

export interface Jogos {
  id: number;
  bol1: number,
  bol2: number,
  bol3: number,
  bol4: number,
  bol5: number,
  bol6: number,
  data_jogo: string 
}

const Simulator:React.FC = () => {
  const [jogos, setJogos] = useState<Jogos[]>([]);
  const [sucesso, setSucesso] = useState<Boolean>(false);
  const [errors, setErrors,] = useState<Boolean>(false);
  const [atualizando, setAtualizando] = useState<Boolean>(false);
  

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadJogos() {
      const response = await api.get<Jogos[]>(
        '/jogos/simulador-jogos',
      );

      const data = response.data.map((jogos) => ({
        ...jogos
      }));

      setJogos(data);
    }

    loadJogos();
  }, []);

  return (
  <Layout>
    <s.Header>
        <s.Title>Simulador de Jogos</s.Title>
        <s.Info>
          <div className="Container">
            <div className="Row">
              <div className="Col">
              </div>
            </div>
          </div>

        </s.Info>
      </s.Header>
      <s.CardContainer >
        <ProductList>
            {jogos.map((jogo) => (
              <li key={jogo.id}>
                <img src={bol} />
                <span>
                <strong>Jogo: {jogo.id}</strong>
                  <p>{jogo.bol1} - {jogo.bol2} - {jogo.bol3} - {jogo.bol4} - {jogo.bol5} - {jogo.bol6}</p>
                </span>
              </li>
            ))}
          </ProductList>
      </s.CardContainer>
  </Layout>

);
};

export default Simulator;
