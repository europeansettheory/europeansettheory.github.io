#!/usr/local/bin/python3

import pandas as pd
import numpy as np

world_seminars=pd.read_csv("/Users/philipp.schlicht/Dropbox/Backend/seminars.csv", sep=";")
data=pd.read_excel("/Users/philipp.schlicht/Dropbox/Backend/data.xlsx")

for seminar in world_seminars["Seminar"]:
    file_seminar=seminar+".xlsx"
    new_seminar=pd.read_excel("/Users/philipp.schlicht/Dropbox/Backend/"+file_seminar)
    data=pd.concat([data,new_seminar])

#CHANGE LATER: 
#a. data.sort does not do years correctly, since it orders strings  
#b. need automatic conversion of time zones, seminar organisers should only input local time
data=data.sort_values(axis=0,by=['Time_UT'])

idx=np.arange(data.index.size)
data["Unique_Index"]=idx
data.index=idx

print(data)

new_file="/Users/philipp.schlicht/Dropbox/Backend/data_check.csv"
data.to_csv(new_file, index = False, sep=';', quoting=1)

new_file="data_doublecheck.csv"
data.to_csv(new_file, index = False, sep=';', quoting=1)

new_file="/Users/philipp.schlicht/Documents/europeansettheory.github.io/data.csv"
data.to_csv(new_file, index = False, sep=';', quoting=1)

files_to_convert=["records", "blog"]
for file_of_data in files_to_convert:
    file_name=file_of_data+".xlsx"
    df_to_convert = pd.read_excel("/Users/philipp.schlicht/Dropbox/Backend/"+file_name)
    if file_of_data=="records":
        df_to_convert=df_to_convert.sort_values(axis=0,by=['Speaker'])
    new_file="/Users/philipp.schlicht/Documents/europeansettheory.github.io/"+file_of_data+".csv"
    df_to_convert.to_csv(new_file, index = False, sep=';', quoting=1)
