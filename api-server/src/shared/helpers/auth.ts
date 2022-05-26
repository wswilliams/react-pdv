const compare = require('tsscmp')

export const authorization = async (credentials: any) => {

    // Check credentials
    if (!credentials || !check(credentials.name, credentials.pass)) {
        return 401;
    } else {
        return 200;
    }

    function check(name: string, pass: string) {
        var valid = true

        // Simple method to prevent short-circut and use timing-safe compare
        valid = compare(name, process.env.AUTH_PMZ_USERNAME) && valid
        valid = compare(pass, process.env.AUTH_PMZ_PASSWORD) && valid

        return valid
    }
}