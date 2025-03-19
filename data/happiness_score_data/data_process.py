import pandas as pd

def process_csv(input_file, output_file, columns, new_column_names):
    df = pd.read_csv(input_file)
    selected_columns = df[columns].copy()
    selected_columns.rename(columns=new_column_names, inplace=True)
    continent_df = pd.read_csv('world_happiness/2023_report.csv')
    
    # merge continent data
    merged_df = pd.merge(selected_columns, continent_df[['country', 'continent']], left_on='country', right_on='country', how='left')
    merged_df.to_csv(output_file, index=False)


if __name__ == "__main__":
    input_file = 'raw_data_csv/2024_raw.csv'
    output_file = 'world_happiness/2024_report.csv'
    columns = ['Country name',
               'Ladder score', 
               'Explained by: Log GDP per capita', 
               'Explained by: Social support',
               'Explained by: Healthy life expectancy',
               'Explained by: Freedom to make life choices',
               'Explained by: Generosity',
               'Explained by: Perceptions of corruption',
               'Dystopia + residual'
               ]  
    new_column_names = {
        'Country name': 'country',
        'Ladder score': 'happiness_score', 
        'Explained by: Log GDP per capita': 'gdp_per_capita', 
        'Explained by: Social support': 'social_support',
        'Explained by: Healthy life expectancy': 'health',
        'Explained by: Freedom to make life choices': 'freedom',
        'Explained by: Generosity': 'generosity',
        'Explained by: Perceptions of corruption': 'corruption',
        'Dystopia + residual': 'dystopia_residual',
        }  
    process_csv(input_file, output_file, columns, new_column_names)