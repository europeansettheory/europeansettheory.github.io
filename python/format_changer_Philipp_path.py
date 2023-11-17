import pandas as pd

world_seminars=pd.read_csv("seminars.csv", sep=";")
data=pd.read_excel("data.xlsx")

for seminar in world_seminars["Seminar"]:
    file_seminar=seminar+".xlsx"
    new_seminar=pd.read_excel(file_seminar)
    data=data.append(new_seminar)

new_file="/Users/philipp.schlicht/Documents/europeansettheory.github.io/static/data.csv"
data.to_csv(new_file, index = False, sep=';', quoting=1)


files_to_convert=["records", "blog"]
for file_of_data in files_to_convert:
    file_name=file_of_data+".xlsx"
    df_to_convert = pd.read_excel(file_name)
    if file_of_data=="records":
        df_to_convert=df_to_convert.sort_values(axis=0,by=['Speaker'])
    new_file="/Users/philipp.schlicht/Documents/ESTS_webpage/static/"+file_of_data+".csv"
    df_to_convert.to_csv(new_file, index = False, sep=';', quoting=1)
