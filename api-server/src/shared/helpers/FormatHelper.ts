/**
 * @author Caio César Lacerda
 * @method Mais usado no DTO Linx >> PMZ
 */
export const retiresCaracterHelper = (param: string) => {
  if (!param) {
    return "";
  }

  return param.replace(/[^a-zA-Z 0-9 ]/g, "").trim();
}

/**
 * @author Caio César Lacerda
 * @method Mais usado no DTO Linx >> PMZ
 */
export const convertToUpperCaseWithoutAccent = (param: string) => {
  if (!param) {
    return "";
  }

  let removeComplemento = param.split(',');

  return removeComplemento[0]
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
};

/**
 * @author Caio César Lacerda
 * @method Mais usado no DTO PMZ >> Linx
 */
export const validateCpf = (cpf: string) => {

  if (cpf.length == 11) {
    let newCpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    newCpf = newCpf.replace(/(\d{3})(\d)/, "$1.$2");
    newCpf = newCpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return newCpf;
  }

  return null;
}

/**
 * @author Caio César Lacerda
 * @method Mais usado no DTO PMZ >> Linx
 */
export const validatePerson = (cnpj: string) => {

  const tipoPessoas: any = {
    14(cnpj_forn: Number) {
      let newCnpj = cnpj.replace(/(\d{2})(\d)/, "$1.$2");
      newCnpj = newCnpj.replace(/(\d{3})(\d)/, "$1.$2");
      newCnpj = newCnpj.replace(/(\d{3})(\d)/, "$1/$2");
      newCnpj = newCnpj.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      return newCnpj;
    },
    11(cpf: Number) {
      let newCpf = cnpj.replace(/(\d{3})(\d)/, "$1.$2");
      newCpf = newCpf.replace(/(\d{3})(\d)/, "$1.$2");
      newCpf = newCpf.replace(/(\d{3})(\d)/, "$1-$2");
      return newCpf;
    },
    18(cpf: Number) {
      return cnpj;
    }
  }

  if (tipoPessoas[cnpj.length]) {
    const validaPessoa = tipoPessoas[cnpj.length];
    return validaPessoa(cnpj.length);
  }
  return null;
}

/**
 * @author wssouza
 * @method Mais usado no DTO Linx >> PMZ
 * @mensage reduzir string
 */
export const removeComplements = (param: string) => {
  if (!param) {
    return "";
  }

  let removeComplemento = param.split(',');

  return removeComplemento.length ? removeComplemento[0] : "";
};

/**
 * @author Williams Silva
 * @method Mais usado no DTO PMZ >> Linx
 */
export const validateIE = (ie: string) => {

  if (ie.length <= 1) {

    return 'ISENTO';
  }
  return ie;
}

/**
 * @author wssouza
 * @method Mais usado no DTO PMZ >> LINX
 * @mensage cast the string to boolean
 */
export const parseStringToBoolean = (param: string) => {


  const newParam = !!JSON.parse(String(param).toLowerCase());;

  return newParam;
}

/**
 * @author williams silva
 * @method Mais usado no repository
 */
export const replaceCommaToScore = (param: string) => {

  return param.replace(",", ".").trim();
}

/**
 * @author williams silva
 * @method Mais usado no repository
 */
export const replaceFormartXML = (param: string) => {

  return param.replace('\\\\', '\\').trim();
}
