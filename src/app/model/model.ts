export interface RoomInfo {
    name: string;
    intro: string;
    image: string;
}

export interface RoleInfo {
    id: string;
    data: {
        content: string;
        pic: string[];
        video: string;
    };
}

export interface MedicalRecord {
    name: string;
    id: number;
    children: Array<any>;
    isExpanded: boolean;
}
