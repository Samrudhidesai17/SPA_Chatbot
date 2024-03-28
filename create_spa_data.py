import pandas as pd
from random import randint, choice
from datetime import datetime, timedelta

# Define the data for the SPA services
spa_services = ['Exclusive Massage', 'Premium Facial', 'Luxury Pedicure', 'Elite Manicure', 'VIP Body Wrap', 'Signature Aromatherapy']
therapists = ['Elite Therapist A', 'Elite Therapist B', 'Elite Therapist C', 'Elite Therapist D', 'Elite Therapist E']
client_names = ['VIP David Brown', 'VIP Susan Smith', 'VIP John Doe', 'VIP Emma Jones', 'VIP Michael Johnson', 'VIP Sarah Wilson']

# Randomly generate a larger set of records
num_records = 100  # You can change this to the desired number of records
start_date = pd.to_datetime('2023-01-01')
end_date = pd.to_datetime('2023-12-31')

# Helper function to generate random dates
def random_dates(start, end, num=10):
    start_u = start.value//10**9
    end_u = end.value//10**9
    return pd.to_datetime([datetime.utcfromtimestamp(randint(start_u, end_u)) for _ in range(num)], utc=True)

data = {
    'Date': random_dates(start_date, end_date, num=num_records),
    'Service': [choice(spa_services) for _ in range(num_records)],
    'Price': [randint(150, 500) for _ in range(num_records)],  # Random price between 150 and 500
    'Duration': [choice([60, 90, 120, 150]) for _ in range(num_records)],  # Duration in minutes
    'ClientName': [choice(client_names) for _ in range(num_records)],
    'Therapist': [choice(therapists) for _ in range(num_records)]
}

# Create a DataFrame
df_spa_premium = pd.DataFrame(data)

# Save the DataFrame to a CSV file
csv_file_path_premium = 'spa_services_data_premium.csv'
df_spa_premium.to_csv(csv_file_path_premium, index=False)

print(f'Premium spa services CSV file created: {csv_file_path_premium}')
