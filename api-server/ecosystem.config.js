module.exports = {
    apps: [{
        name: "api-server",
        script: "npm run start",
        watch: 'true',
        increment_var: "BACK_PORT",
        env: {
            NODE_ENV: "local",
            BACK_PORT: 3355,
        },
        env_development: {
            NODE_ENV: "development",
            BACK_PORT: 3355,
        },
        env_production: {
            NODE_ENV: "production",
            BACK_PORT: 3355
        }
    }]

};