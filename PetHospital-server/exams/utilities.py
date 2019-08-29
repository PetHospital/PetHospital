import pandas as pd


def gen_question():
    data = pd.read_excel('data/问题.xlsx', header=0)
    for index, row in data.iterrows():
        print(row['Text'])
    return data
