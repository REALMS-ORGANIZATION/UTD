
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pymongo import MongoClient

# MongoDB connection string
mongodb_uri = 'mongodb+srv://socialcures2:5ocialcuresfal12024%23%23@socialcures2.6tiqn.mongodb.net/socialcures2?retryWrites=true&w=majority'
client = MongoClient(mongodb_uri, tlsAllowInvalidCertificates=True)

db = client.get_database('socialcures2')
collection_name = 'student_sentiment_data'
collection = db[collection_name]

# CSV file path
csv_file_path = '/Users/theredrighthand/Others/organized_data_files/UTD/UTD_Campus_Student_Sentiment_Data_with_Location.csv'
data_frame = pd.read_csv(csv_file_path)
records = data_frame.to_dict(orient='records')
collection.insert_many(records)

data = collection.find({}, {'sentiment_score': 1, 'emotion_intensity': 1, 'year_of_study': 1, '_id': 0})
plot_data = pd.DataFrame(list(data))

plt.figure(figsize=(10, 6))
sns.scatterplot(data=plot_data, x='sentiment_score', y='emotion_intensity', hue='year_of_study', palette='viridis')
plt.title('Sentiment Score vs Emotion Intensity by Year of Study')
plt.xlabel('Sentiment Score')
plt.ylabel('Emotion Intensity')
plt.legend(title='Year of Study')
plt.show()

