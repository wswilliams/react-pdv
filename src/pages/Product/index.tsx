import React, { useEffect, useState, ChangeEvent } from 'react';
import Layout from '../../components/Layout';
import api from '../../service/api';
import { formatPrice } from '../../utils/formatPrice';
import { ProductList } from '../../components/ProductList';
import { useDispatch } from 'react-redux';
import * as s from '../Dashboard/styled';
import bebidas from '../../assets/images/my-icon.svg';
import {
  FiGrid, FiEdit
} from 'react-icons/fi';

export interface Stock {
  id: number;
  amount: number;
}

export interface Product {
  id: number;
  nome: string;
  descricao: string,
  preco: number;
  quantidade: number;
  image: string;
  priceFormatted: string;
}

const Product:React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [telaCadastro, setTelaCadastro] = useState<Boolean>(false);
  const [telaLista, setTelaLista] = useState<Boolean>(true);
  const [idProdutc, setIdProdutc] = useState<number>(0);
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(0);
  const [sucesso, setSucesso] = useState<Boolean>(false);
  const [errors, setErrors,] = useState<Boolean>(false);
  const [atualizando, setAtualizando] = useState<Boolean>(false);
  

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Product[]>(
        '/produtos',
      );

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.preco),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function showTelaCadastro() {
    limpaCampos();
    setAtualizando(false);
    setTelaLista(false);
    setTelaCadastro(true);

  }
 async function showTelaListar() {
    
    setAtualizando(false);
    setTelaCadastro(false);
    setTelaLista(true);
    const response = await api.get<Product[]>(
      '/produtos',
    );

    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.preco),
    }));

    setProducts(data);

  }

  const onChangeNome = (event: ChangeEvent<{ value: string }>) => {
    setNome(event?.currentTarget?.value)
  }
  const onChangeDescricao = (event: ChangeEvent<{ value: string }>) => {
    setDescricao(event?.currentTarget?.value)
  }
  const onChangePreco = (event: ChangeEvent<{ value: string }>) => {
    setPreco(event?.currentTarget?.value)
  }
  const onChangeQuantidade = (event: ChangeEvent<{ value: string }>) => {
    setQuantidade(Number(event?.currentTarget?.value))
  }
  function limpaCampos() {
    setIdProdutc(0)
    setNome('')
    setDescricao('')
    setPreco('')
    setQuantidade(0)
  }

  async function handleUpdatedProduct(params:Product) {

    setAtualizando(true);
    setTelaLista(false);
    setTelaCadastro(true);
    setIdProdutc(params.id)
    setNome(params.nome)
    setDescricao(params.descricao)
    setPreco(JSON.stringify(params.preco))
    setQuantidade(params.quantidade)
  }

  async function handleAddProduct() {

    let produto: any ={
      id: idProdutc,
      nome: nome,
      descricao: descricao,
      preco: parseFloat(preco),
      quantidade: quantidade
    }
    if(produto.id == 0)
      delete produto.id;

    await api.post('/produtos',produto)
            .then(res => {
              setSucesso(true);
              const timer = setTimeout(() => {
                setSucesso(false);
                limpaCampos()
              }, 2000);
              return () => clearTimeout(timer);
              
      }).catch(erro => {
              const data = [erro.response.data]
              console.log(data)
              setErrors(true);
              const timer = setTimeout(() => {
                setErrors(false);
                limpaCampos()
              }, 2000);
              return () => clearTimeout(timer);
        })
  }
  return (
  <Layout>
    <s.Header>
        <s.Title>Produtos</s.Title>
        <s.Info>
          <div className="Container">
            <div className="Row">
              <div className="Col">
                <button id="add" type="button" className="btn btn-secondary" onClick={() => showTelaCadastro()}>
                  CADASTRAR
                </button>  <FiGrid size="24px" color="grey" /> 
                <button id="list" type="button" className="btn btn-secondary" onClick={() => showTelaListar()}>
                  LISTAR
                </button>
              </div>
            </div>
          </div>

        </s.Info>
      </s.Header>
      {telaLista && 
      <s.CardContainer >
        <ProductList>
            {products.map((product) => (
              <li key={product.id}>
                <img src={bebidas} alt={product.nome} />
                <span>
                <strong>{product.nome}</strong>
                  <p>{product.priceFormatted}</p>
                  <strong>{product.descricao} DSP: {product.quantidade} </strong>
                </span>
                <span>
                <button id="add" type="button" onClick={() => handleUpdatedProduct(product)}>
                  <FiEdit size="24px" color="grey" />
                </button>
                </span>
              </li>
            ))}
          </ProductList>
      </s.CardContainer>
      }
      {telaCadastro && 
      <s.CardContainer >
      <div className="Card">
                  {
                         sucesso &&
                         <div className="alert alert-dismissible alert-success">
                         <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                         <strong>Bem feito!</strong> Realizado com sucesso .
                         </div>
                    }
                    {
                      errors && 
                      <div className="alert alert-dismissible alert-danger">
                      <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                      <strong>Erro!</strong> ao cadastrar o produto.
                      </div>
                    }

                    <div className="row">
                        <div className="col-md-10">

                            <div className="form-group">
                                <label > Nome: *</label>
                                <input type="text" required
                                name="nome" 
                                onChange = {onChangeNome}
                                value={nome} 
                                className="form-control" />
                            </div>

                        </div>
                      
                        <div className="col-md-10">
                        <div className="form-group">
                        <label>Descrição: *</label>
                                <input className="form-control"  required
                                name="descricao"
                                onChange = {onChangeDescricao}
                                value={descricao} 
                                />
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Preço: *</label>
                                <input type="text" required
                                value={preco} 
                                name="preco" 
                                onChange = {onChangePreco}
                                className="form-control" />
                            </div>

                        </div>
                        <br/>
                        <div className="col-md-6">

                            <div className="form-group">
                                <label > Quantidade: *</label>
                                <input type="text" required
                                value={quantidade} 
                                name="quantidade" 
                                onChange = {onChangeQuantidade}
                                className="form-control" />
                            </div>

                        </div>

                    </div>   

                    <div className="row mt-3">

                        <div className="col-md-1 mx-3">
                            <button onClick={() => handleAddProduct()} className="btn btn-success"> 
                            {atualizando ? 'Atualizar ' : 'Salvar '}
                            </button>
                        </div>
                        
                    </div> 
            </div>
      </s.CardContainer>
      }
  </Layout>

);
};

export default Product;
