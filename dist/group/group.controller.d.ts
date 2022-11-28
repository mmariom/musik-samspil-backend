import { GroupService } from './group.service';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    getAllGroups(req: any): Promise<import("./group.schema").Group[]>;
    findGroupById(id: string): Promise<import("./group.schema").Group>;
}
