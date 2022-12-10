export interface Question {
    id: string;
    text: string;
    answer: string;
    opt1: string;
    opt2: string;
    opt3: string;
    owner: {
        uid: string;
        name: string;
    };
    category: string;
    tags: Array<string>;
}
