import {Mistake} from './mistake';

export const Mistakes: Mistake[] = [
    {id: 1,
    type: '单选', 
    subject: '宠物狗能不能巧克力？', 
    options: [{id: 'A', content: '能'}, {id: 'B', content: '不能'}],
    wrongAnswer: 'A', 
    correctAnswer: 'B',
    solution: '一般建议狗狗半岁过后再洗澡',
    showSolution: false,
    collectStatus: '收藏该题'},
    {id: 2,
     type: '单选', 
     subject: '世界上最聪明的狗是哪个品种？', 
     options: [{id: 'A', content: '哈士奇'}, {id: 'B', content: '阿拉斯加犬'}, {id: 'C', content: '边境牧羊犬'}, {id: 'D', content: '德国牧羊犬'}],
     wrongAnswer: 'D', 
     correctAnswer: 'C',
     solution: '暂无解析！！',
     showSolution: false,
     collectStatus: '收藏该题'}
];
