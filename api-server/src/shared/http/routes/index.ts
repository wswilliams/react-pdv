import { Router } from 'express';
import cadastroClienteRoutes from './cadastroClientes.routes';
import produtoRoutes from '../routes/produto.routes ';
import cadastroCompra from './cadastroCompra.routes';


const routes = Router();

routes.use('/clientes', cadastroClienteRoutes);
routes.use('/produtos', produtoRoutes);
routes.use('/compras', cadastroCompra);

export default routes;