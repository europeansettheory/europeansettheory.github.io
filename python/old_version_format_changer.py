import pandas as pd



files_to_convert=["data", "records", "blog"]
for file_of_data in files_to_convert:
    file_name=file_of_data+".xlsx"
    df_to_convert = pd.read_excel(file_name)
    if file_of_data=="records":
        df_to_convert=df_to_convert.sort_values(axis=0,by=['Speaker'])
    new_file="../public/"+file_of_data+".csv"
    df_to_convert.to_csv(new_file, index = False, sep=';', quoting=1)
    