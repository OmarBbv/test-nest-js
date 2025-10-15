import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.model';


// export const sequelize = new Sequelize("bir-bina-nest", "postgres", "metroboomin2425", {
//     host: "localhost",
//     dialect: "postgres",
//     logging: false,
// });

export const sequelize = (() => {
    const databaseUrl = process.env.DATABASE_URL || process.env.DB_URL;

    if (databaseUrl) {
        // Prefer a single connection string when provided (e.g. from Render)
        return new Sequelize(databaseUrl, {
            dialect: 'postgres',
            logging: false,
            dialectOptions: {
                // Render-managed Postgres typically requires SSL
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        });
    }

    return new Sequelize(
        process.env.DB_NAME!,
        process.env.DB_USER!,
        process.env.DB_PASS!,
        {
            host: process.env.DB_HOST!,
            port: Number(process.env.DB_PORT) || 5432,
            dialect: 'postgres',
            logging: false,
            // Enable SSL via env if needed for other providers
            dialectOptions: (process.env.DB_SSL === 'true')
                ? { ssl: { require: true, rejectUnauthorized: false } }
                : undefined,
        }
    );
})();



export const DatabaseProvider = {
    provide: 'SEQUELIZE',
    useFactory: async () => {
        try {
            await sequelize.authenticate();
            console.log('✅ PostgreSQL bağlantısı başarılı!');

            sequelize.addModels([User]);
            // await sequelize.sync({ alter: true });

            console.log('✅ Veritabanı tabloları oluşturuldu veya güncellendi');
            return sequelize;
        } catch (err) {
            console.error('❌ Veritabanı bağlantı hatası:', err);
            throw err;
        }
    }
}