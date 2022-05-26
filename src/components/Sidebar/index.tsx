/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, {ChangeEvent, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from '../Profile';
import api from '../../service/api';

import * as s from './styled';

export interface Props {
  isSmall?: boolean;
}

export interface Stock {
  id: number;
  quantidade: number;
}

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  image: string;
  amount: number;
}

export interface Compra {
  id: number;
  total: Number;
  tipo_pagamento: string;
  status: string;
  produtos:Product[];
}

export interface Cart {
  cart: Product[];
}


const Sidebar: React.FC<Props> = ({ isSmall }) => {
  const cart = useSelector((state: Cart) => state.cart.map((product) => ({
    ...product,
  })));

  const [tipoPagamento, setTipoPagamento] = useState<String>("CREDITO");
  const [atualizando, setAtualizando] = useState<Boolean>(false);
  const dispatch = useDispatch();

  async function handleAddProduct() {
    setAtualizando(false)
    
    const compra = {
      total: 0,
      tipo_pagamento: tipoPagamento,
      status: "Finalizado",
      produtos: cart
    };
   await api.post(`/compras`,compra)
    .then(res => {

        setAtualizando(true)
        const timer = setTimeout(() => {
          setAtualizando(false);
          window.location.reload()
        }, 3000);
        return () => clearTimeout(timer);
       
    }).catch(erro => {
      setAtualizando(true)
    })
  }

  const handleChange = (event: ChangeEvent<{ value: string }>) => {

    setTipoPagamento(event?.currentTarget?.value);

  }

  function handleRemoveToProduct() {
    dispatch({ type: 'CLEAR_TO_CART', payload: 0 });
  }

  return (
    <s.SidebarWrapper>
      {
        atualizando &&
            <div className="alert alert-dismissible alert-success">
               <strong>Otimo!</strong> Venda Realizada com sucesso.
            </div>
      }
      <Profile />
      <div>            
          <select className="form-control" onChange={handleChange}>
            <option value="CREDITO">Cartão de credito</option>
            <option value="DEBITO">Cartão de debito</option>
            <option value="DINHEIRO">Dinheiro</option>
            <option value="PIX">Pix</option>
           </select>
      </div>
      <hr />
      <s.Receipt>
        <s.Item>
          <div>DESCRIÇÃO</div>
          <div>QTD</div>
        </s.Item>
        {cart.map((p) => (
          <s.Item>
            <div>{p.nome}/{p.descricao}</div>
            <span>{p.amount}</span>
          </s.Item>
        ))}
      </s.Receipt>
      <s.ReceiptButton>
        {cart.length > 0 &&
          <s.Item>
            
              <div>
                  <button id="add" type="button" onClick={() => handleAddProduct()}>
                        <label htmlFor="finalizar">Finalizar</label>
                </button>
              </div>
              <div>
                <button id="limpar" type="button" onClick={() => handleRemoveToProduct()}>
                    <label htmlFor="finalizar">Limpar</label>
                </button>
              </div>
          
          </s.Item>
         }
        
      </s.ReceiptButton>
     
    </s.SidebarWrapper>
  );
};

export default Sidebar;
