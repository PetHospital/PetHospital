import {Collection} from './collection';

export const Collections: Collection[] = [
    {
        id: 1,
        question: {
            id: 1,
            type: '单选',
            subject: '宠物狗能不能巧克力？', 
            options: [{id: 'A', content: '能'}, {id: 'B', content: '不能'}],
        },
        answer: 'A'
    }
];
