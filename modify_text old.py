import pandas as pd


df = pd.read_csv("data.csv", sep=";")
f = open("texto.txt", "w")
for text in df["Time_UT"]:
	f.write(text + "\n")
f.close()
