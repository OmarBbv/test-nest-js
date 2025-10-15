"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
let UserService = class UserService {
    sequelize;
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async allUsers() {
        try {
            const users = await this.sequelize.models.User.findAll();
            return users;
        }
        catch (error) {
            console.error('❌ Kullanıcılar getirilirken hata oluştu:', error);
            throw error;
        }
    }
    ;
    async findUserById(id) {
        try {
            const user = await this.sequelize.models.User.findByPk(id);
            return user;
        }
        catch (error) {
            console.error('❌ Kullanıcı bulunurken hata oluştu:', error);
            throw error;
        }
    }
    ;
    async createUser(userData) {
        try {
            const newUser = await this.sequelize.models.User.create(userData);
            return newUser;
        }
        catch (error) {
            console.error('❌ Kullanıcı oluşturulurken hata oluştu:', error);
            throw error;
        }
    }
    ;
    async updateUser(id, userData) {
        try {
            if (!id)
                throw new Error('ID bulunamadı');
            const user = await this.sequelize.models.User.findByPk(id);
            if (!user)
                throw new Error('Kullanıcı bulunamadı');
            await user.update(userData);
            return user;
        }
        catch (error) {
            console.error('❌ Kullanıcı güncellenirken hata oluştu:', error);
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize])
], UserService);
//# sourceMappingURL=users.service.js.map