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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./utils/jwt-auth.guard");
const local_auth_guard_1 = require("./utils/local-auth.guard");
const jwt_1 = require("@nestjs/jwt");
const group_dto_1 = require("../group/group.dto");
const group_service_1 = require("../group/group.service");
let AuthController = class AuthController {
    constructor(authService, userService, jwtService, groupService) {
        this.authService = authService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.groupService = groupService;
    }
    async login(req, response) {
        const user = await this.userService.findOne(req.user._doc.email);
        const jwt = this.jwtService.sign({ user: user });
        return {
            statusCode: 201,
            message: "Logged in successfully!",
            token: jwt
        };
    }
    getProfile(req) {
        return this.userService.findOne(req.user.email);
    }
    async createGroup(req, groupDto) {
        try {
            groupDto.createdBy = req.user.id;
            groupDto.userName = req.user.name;
            return await this.groupService.createGroup(groupDto);
        }
        catch (error) {
            console.log("controller catch block ");
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: [error.message],
            }, common_1.HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    async findUserById(req) {
        try {
            console.log("kokot mail ");
            console.log(req.user.id);
            return await this.groupService.findAllByUserId(req.user.id);
        }
        catch (error) {
            console.log("controller catch block ");
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: [error.message],
            }, common_1.HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    async assignUserToGroup(req, groupId) {
        const loggedUser = req.user;
        return await this.groupService.assignUserToGroup(loggedUser, groupId);
    }
    async findUsersJoinedGroups(req) {
        try {
            return await this.groupService.findUsersJoinedGroups(req.user.id);
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: [error.message],
            }, common_1.HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('group/create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, group_dto_1.GroupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createGroup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('user/groups'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findUserById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('assignUserToGroup/:groupid'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('groupid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "assignUserToGroup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('user/userJoinedGroups'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findUsersJoinedGroups", null);
AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        jwt_1.JwtService,
        group_service_1.GroupService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map