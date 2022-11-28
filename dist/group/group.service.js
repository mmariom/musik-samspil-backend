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
exports.GroupService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const group_schema_1 = require("./group.schema");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
let GroupService = class GroupService {
    constructor(groupModel, userService) {
        this.groupModel = groupModel;
        this.userService = userService;
    }
    async createGroup(createGroupDto) {
        if (!(createGroupDto.createdBy)) {
            throw new Error("You have to be logged in to assing the group");
        }
        createGroupDto.createdAt = new Date();
        const createdGroup = new this.groupModel(createGroupDto);
        return createdGroup.save();
    }
    async findAll() {
        return this.groupModel.find().exec();
    }
    async finbyGroupId(groupId) {
        const group = await this.groupModel.findById(groupId);
        if (!group) {
            console.log("errro in group service ");
            throw new Error("Group doesn't exist");
        }
        return group;
    }
    async findAllByUserId(userId) {
        const haveGroups = await this.groupModel.find({ user: userId });
        if (haveGroups.length < 1) {
            throw new Error("You dont have any groups ! ");
        }
        return await this.groupModel.find({ user: userId });
    }
    async assignUserToGroup(loggedUser, groupId) {
        const group = await this.groupModel.findById(groupId);
        return await group.updateOne({ $push: { assignedUsers: loggedUser } });
    }
};
GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=group.service.js.map