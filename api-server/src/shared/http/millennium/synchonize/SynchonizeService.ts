import MilleniumService from "@shared/http/millennium/MilleniumService";
import SynchonizeNotasController from '@modules/Notas/controllers/SynchonizeNotasController';

const cron = require('node-cron');

const synchonizeNotasController = new SynchonizeNotasController();

class SynchonizeService {


    public async index() {

        // cron.schedule('2 * * * * *', function () {
        //     console.log('---------------------');
        //     console.log(`${new Date()}`);
        //     console.log('Running Cron Job synchonize synchonizeNotasController');
        //     // synchonizeNotasController.index();
        // });

        return null;
    }
}

export default SynchonizeService;
