export class Book {
    id: number;
    name: string;
    description: string;
    iconUrl: string;
    bookListIcon: string;
    bookLongDescription: string;
    category: string;
    chapterCount: number;
    releasedAt: Date;
    createdBy: string;
    creationDate: Date;
    constructor() {
        this.name = '';
        this.description = '';
        this.iconUrl = '';
        this.bookListIcon = '';
        this.bookLongDescription = '';
        this.category = '';
        this.chapterCount = 0;
        this.releasedAt = new Date();
        this.createdBy = 'FrontEnd';
        this.creationDate = new Date();
    }
}