const config = {
    production: {
        app: {
            name: "Natural Groundcare Website",
            port: 3000
        },
        session: {
            secret: 'NGC.Encrypt.me.Techmeleon@production'
        },
        database: 'mongodb://Techmeleon:tm101@techmeleon-shard-00-00-ubif4.mongodb.net:27017,techmeleon-shard-00-01-ubif4.mongodb.net:27017,techmeleon-shard-00-02-ubif4.mongodb.net:27017/NGC?ssl=true&replicaSet=Techmeleon-shard-0&authSource=admin',
        mail: {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'test',
                pass: 'test'
            }
        }
    },
    development: {
        app: {
            name: "Natural Groundcare Website",
            port: 3000
        },
        session: {
            secret: 'NGC.Encrypt.me.Techmeleon'
        },
        database: 'mongodb://localhost:27017/NGC',
        mail: {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'test',
                pass: 'test'
            }
        }
    }
}

exports.get = function get(env) {
return config[env] || config.development;
}