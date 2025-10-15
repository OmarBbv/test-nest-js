import { Sequelize } from 'sequelize-typescript';
export declare const sequelize: Sequelize;
export declare const DatabaseProvider: {
    provide: string;
    useFactory: () => Promise<Sequelize>;
};
