import { Router } from "express";

import CompraControllers from "@modules/Compra/controllers/CompraControllers";

const cadastroCompraRouter = Router();
const compraControllers = new CompraControllers();

cadastroCompraRouter.get("/", compraControllers.getCompras);
cadastroCompraRouter.get("/sum/", compraControllers.getSumCompras);
cadastroCompraRouter.get("/count/", compraControllers.getCountCompras);
cadastroCompraRouter.get("/relatorio/mes", compraControllers.getRelatorioMesCompras);
cadastroCompraRouter.post("/", compraControllers.postCompra);
cadastroCompraRouter.delete("/id:", compraControllers.deleteCompra);


export default cadastroCompraRouter;
