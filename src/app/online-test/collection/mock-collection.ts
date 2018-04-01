import {Collection} from '../../model/model';

export const Collections: Collection[] = [
    {
        id: 1,
        question: {
            id: 1,
            type: '单选',
            subject: '宠物狗能不能巧克力？', 
            options: [{id: 'A', content: '能'}, {id: 'B', content: '不能'}],
            answer: 'A',
            solution: '吃巧克力真的会死'
        },
        showSolution: false
    },
    {
        id: 2,
        question: {
            id: 2,
            type: '单选',
            subject: '犬最原始的用途是什么', 
            options: [{id: 'A', content: '护卫'}, {id: 'B', content: '狩猎'}, {id: 'C', content: '伴侣'}],
            answer: 'A',
            solution: '抓猎物吃！狗跑得快呀'
        },
        showSolution: false
    }
];
