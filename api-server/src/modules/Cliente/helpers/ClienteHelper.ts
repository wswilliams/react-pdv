import knex from "../../../shared/database/connection";
import { convertToUpperCaseWithoutAccent, retiresCaracterHelper, removeComplements } from "@shared/helpers/FormatHelper";
import { logSyncLinx } from "../../../shared/helpers/sync";
import ClienteRepository from "../repositories/ClienteRepository";

const newRepository = new ClienteRepository();

class FormatDataClientePmzHelper {}

export default FormatDataClientePmzHelper;
