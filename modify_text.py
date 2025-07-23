import pandas as pd

df = pd.read_csv("data.csv", sep=';')
file = open("text.txt", "w")

for index, row in df.iterrows():
    print(row["Seminar"])
    file.write(str(row["Seminar"]) + '\n')
    file.write("Date and time: ")
    file.write(row["Time_local"])
    file.write("\n")
    file.write("Speaker: ")
    file.write(row["Speaker"])
    file.write("\n")
    file.write("Title: ")
    file.write(row["Title"])
    file.write("\n")
    file.write("Abstract: ")
    file.write(row["Abstract"])
    file.write("\n")
    file.write("Information: ")
    file.write(row["Information"])
    file.write("\n \n")
