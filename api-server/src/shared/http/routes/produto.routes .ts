import { Router } from "express";
import ProdutoControllers from "../../../modules/Produto/controllers/ProdutoControllers";

const produtoRouter = Router();

const produtoController = new ProdutoControllers();


produtoRouter.get("/", produtoController.getProdutos);
produtoRouter.get("/count", produtoController.getCountProdutos);
produtoRouter.post("/", produtoController.postProduto);
produtoRouter.delete("/", produtoController.deleteProduto);


export default produtoRouter;
