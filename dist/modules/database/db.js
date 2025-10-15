"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProvider = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../users/user.model");
exports.sequelize = (() => {
    const databaseUrl = process.env.DATABASE_URL || process.env.DB_URL;
    if (databaseUrl) {
        return new sequelize_typescript_1.Sequelize(databaseUrl, {
            dialect: 'postgres',
            logging: false,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        });
    }
    return new sequelize_typescript_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
        dialectOptions: (process.env.DB_SSL === 'true')
            ? { ssl: { require: true, rejectUnauthorized: false } }
            : undefined,
    });
})();
exports.DatabaseProvider = {
    provide: 'SEQUELIZE',
    useFactory: async () => {
        try {
            await exports.sequelize.authenticate();
            console.log('✅ PostgreSQL bağlantısı başarılı!');
            exports.sequelize.addModels([user_model_1.User]);
            console.log('✅ Veritabanı tabloları oluşturuldu veya güncellendi');
            return exports.sequelize;
        }
        catch (err) {
            console.error('❌ Veritabanı bağlantı hatası:', err);
            throw err;
        }
    }
};
//# sourceMappingURL=db.js.map