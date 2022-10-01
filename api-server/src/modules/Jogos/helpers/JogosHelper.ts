import knex from "@shared/database/connection";
import { convertToUpperCaseWithoutAccent, retiresCaracterHelper, removeComplements } from "@shared/helpers/FormatHelper";
import { logSyncLinx } from "@shared/helpers/sync";
import JogosRepository from "../repositories/JogosRepository";

const newRepository = new JogosRepository();

class FormatDataJogosPmzHelper {}

export default FormatDataJogosPmzHelper;
