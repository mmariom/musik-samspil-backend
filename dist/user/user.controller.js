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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./user.dto");
const user_service_1 = require("./user.service");
const token_service_1 = require("./token.service");
const crypto_1 = require("crypto");
const sendEmail_1 = require("../utils/sendEmail");
let UserController = class UserController {
    constructor(userService, tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }
    findAll() {
        return 'This action returns all cats';
    }
    async registerNewUser(userDto) {
        try {
            return await this.userService.createUser(userDto);
        }
        catch (error) {
            console.log("controller catch block ");
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                message: [error.message],
            }, common_1.HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    findUserById(id) {
        return this.userService.findOne(id);
    }
    async generateResetEmail(email) {
        const user = await this.userService.findOne(email);
        if (!user)
            throw new common_1.HttpException('No user with this email', common_1.HttpStatus.BAD_REQUEST);
        let token = await this.tokenService.findOne({ email: email });
        if (!token) {
            token = await this.tokenService.createToken({
                userEmail: email,
                tokenString: (0, crypto_1.randomBytes)(32).toString("hex"),
            });
        }
        await (0, sendEmail_1.sendResetEmail)({ email, token });
    }
    async resetPassword(email, tokenString, userPassword) {
        try {
            console.log(email, tokenString);
            const token = await this.tokenService.findOne({
                email: email,
                token: tokenString,
            });
            if (!token)
                throw new common_1.HttpException("Invalid link or expired", common_1.HttpStatus.BAD_REQUEST);
            await this.userService.updatePassword({ email: email, password: userPassword.password });
            await this.tokenService.deleteToken(tokenString);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
};
__decorate([
    (0, common_1.Get)("testuser"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerNewUser", null);
__decorate([
    (0, common_1.Get)('/find/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUserById", null);
__decorate([
    (0, common_1.Post)('/generateResetEmail/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "generateResetEmail", null);
__decorate([
    (0, common_1.Post)('reset/:email/:token'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Param)('token')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, token_service_1.TokenService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map