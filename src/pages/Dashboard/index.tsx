/* eslint-disable import/no-unresolved */
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import {
  FiDollarSign, FiCreditCard, FiHardDrive, FiSearch,  FiPlusCircle,FiTrash2,FiMinusCircle, FiShoppingCart
} from 'react-icons/fi';

import * as s from './styled';
import Layout from '../../components/Layout';

import api from '../../service/api';
import { formatPrice } from '../../utils/formatPrice';
import { ProductList } from '../../components/ProductList';
import bebidas from '../../assets/images/my-icon.svg';

export interface Stock {
  id: number;
  amount: number;
}

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  image: string;
  priceFormatted: string;
}

export interface Cart {
  cart: Product[];
}

export interface Compra {
  total: Number;
  tipo_pagamento: string;
  status: string;
  produtos:Product[];
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCaixa, setTotalCaixa] = useState<Number>(0);
  const [countVendas, setCountVendas]= useState<Number>(0);
  const [countProdutos, setCountProdutos]= useState<Number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    refreshProduto();
  }, []);

  async function refreshProduto() {

    const count = await api.get<any[]>(
      '/produtos/count',
    );

    count.data.map((r) => (
      setCountProdutos(r['total'])
    ))
   
    setProducts([])

    const total = await api.get<[]>(
      '/compras/sum',
    );

    total.data.map((p) => (
      setTotalCaixa(p['total'])
    ))

    const venda = await api.get<[]>(
      '/compras/count',
    );

    venda.data.map((p) => (
      setCountVendas(p['total'])
    ))
  }

  const handleChange = (event: ChangeEvent<{ value: string }>) => {

    let value = event?.currentTarget?.value;
    if(value.length >= 3){

      api.get<Product[]>(
        `/produtos?code=${value}`,
      ) .then(response => response.data)
      .then(data => {
         const result = data.map((product: Product) => ({
          ...product,
          priceFormatted: formatPrice(product.preco),
        }));
    
        setProducts(result);
      });
    }
    if(value.length < 3 || value.length === 0){
      refreshProduto();
    }
  }

  function handleAddProduct(product: Product) {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }
  function handleReduceProduct(product: Product) {
    dispatch({ type: 'REDUCE_TO_CART', payload: product });
  }
  function handleRemoveProduct(product: Product) {
    dispatch({ type: 'REMOVE_TO_CART', payload: product });
  }

  return (
    <Layout>
      <s.Header>
        <s.Title>Painel</s.Title>
        <s.Info>
          <span className="cashier">
            CAIXA ABERTO
          </span>
          <span className="date">
            Sexta, 10 julho 2020
          </span>
        </s.Info>
      </s.Header>
      <s.CardContainer>
        <s.Card>
          <header>
            <p>Quantidade de venda no mês</p>
            <FiDollarSign size="24px" color="green" />
          </header>
          <section>
            <p>R$</p>
            <h1>
              {countVendas}
            </h1>
          </section>
        </s.Card>
        <s.Card>
          <header>
            <p>Produtos Cadastrado</p>
            <FiCreditCard size="24px" color="orange" />
          </header>
          <section>
            <p>R$</p>
            <h1>{countProdutos}</h1>
          </section>
        </s.Card>
        <s.Card>
          <header>
            <p>Caixa mês atual</p>
            <FiHardDrive size="24px" color="grey" />
          </header>
          <section>
            <p>R$</p>
            <h1>{totalCaixa}</h1>
          </section>
        </s.Card>
      </s.CardContainer>
      <s.Search>
        <FiSearch size="24px" color="grey" />
        <s.SearchInput placeholder="Consultar Material" onChange={handleChange}/>
      </s.Search>
  
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            
            <img src={bebidas} alt={product.nome} />
            <span>
             <strong>{product.nome}</strong>              
              <p>{product.priceFormatted}</p>
              <strong>{product.descricao} /QTD: {product.quantidade}</strong>
            </span>
            <span>
            <button id="add" type="button" onClick={() => handleAddProduct(product)}>
              <FiPlusCircle size="24px" color="grey" />
            </button>
            <button id="delete" type="button" onClick={() => handleReduceProduct(product)}>
              <FiMinusCircle size="24px" color="grey" />
            </button>
            <button id="delete" type="button" onClick={() => handleRemoveProduct(product)}>
              <FiTrash2 size="24px" color="grey" />
            </button>
            </span>

          </li>
        ))}
      </ProductList>
    </Layout>
  );
};

export default Dashboard;
