import { Router } from 'express';
import cadastroClienteRoutes from './cadastroClientes.routes';
import produtoRoutes from '../routes/produto.routes ';
import cadastroCompra from '../routes/cadastroCompra.routes';
import cadastroJogos from './cadastroJogos.routes';


const routes = Router();

routes.use('/clientes', cadastroClienteRoutes);
routes.use('/produtos', produtoRoutes);
routes.use('/compras', cadastroCompra);
routes.use('/jogos', cadastroJogos);

export default routes;