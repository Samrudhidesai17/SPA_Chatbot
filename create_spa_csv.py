import csv

# Expanded spa data
spa_data = [
    ["Name", "Service", "Price", "Duration"],
    ["Zen Spa", "Massage", "50", "60"],
    ["Healing Hands", "Facial", "40", "30"],
    ["Tranquil Waves", "Manicure", "25", "45"],
    ["Soothing Escape", "Pedicure", "30", "50"],
    ["Pure Bliss", "Hot Stone Massage", "70", "90"],
    ["Serenity Now", "Aromatherapy", "55", "60"],
    ["Calm Waters", "Body Wrap", "65", "75"],
    ["Glowing Radiance", "Exfoliation", "45", "40"],
    ["Harmony Retreat", "Reflexology", "50", "50"],
    ["Paradise Found", "Deep Tissue Massage", "75", "80"]
]

# Writing to a CSV file
with open('spa_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(spa_data)

print("CSV file with extended data created successfully.")
