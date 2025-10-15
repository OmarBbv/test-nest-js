import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.model';


// export const sequelize = new Sequelize("bir-bina-nest", "postgres", "metroboomin2425", {
//     host: "localhost",
//     dialect: "postgres",
//     logging: false,
// });

export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
    }
);



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