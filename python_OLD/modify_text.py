import pandas as pd


df = pd.read_csv("seminars.csv")
f = open("texto.txt", "w")
for text in df["Seminar"]:
	f.write(text + "\n")
f.close()
