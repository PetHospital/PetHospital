import {Mistake} from '../../model/model';

export const Mistakes: Mistake[] = [
    {id: 1,
     question: {
        id: 1,
        type: '单选', 
        subject: '宠物狗能不能巧克力？', 
        options: [{id: 'A', content: '能'}, {id: 'B', content: '不能'}],
        answer: 'B',
        solution: '咖啡因对狗有致命效果',
     },
     wrongAnswer: 'A', 
     showSolution: false,
     collectStatus: false},
    {id: 2,
     question: {
        id: 2,
        type: '单选', 
        subject: '世界上最聪明的狗是哪个品种？', 
        options: [{id: 'A', content: '哈士奇'}, {id: 'B', content: '阿拉斯加犬'}, {id: 'C', content: '边境牧羊犬'}, {id: 'D', content: '德国牧羊犬'}],
        answer: 'C',
        solution: '暂无解析！！',
     },    
     wrongAnswer: 'D', 
     showSolution: false,
     collectStatus: false}
];
