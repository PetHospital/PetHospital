export class SingleItem {
    id: number;
    name: String;
    level: String;
}

export class PracticeItem {
    id: number;
    name: String;
    items: SingleItem[];
}
