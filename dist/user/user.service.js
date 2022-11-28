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
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt_1 = require("../utils/bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        const user = await this.userModel.findOne({ email: createUserDto.email });
        if (user) {
            console.log("error v userservice if(user)");
            throw new Error('Email already existst');
        }
        const encryptedPassword = await (0, bcrypt_1.encodePassword)(createUserDto.password);
        createUserDto.password = encryptedPassword;
        const createdUser = new this.userModel(createUserDto);
        console.log("this is  created user from userservuice " + JSON.stringify(createdUser));
        return createdUser.save();
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findOne(email) {
        return this.userModel.findOne({ email: email });
    }
    async assignToNewGroup(group) {
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map