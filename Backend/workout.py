# import pandas as pd

# df = pd.read_csv('/Users/jingyaogu/Desktop/FitClub-Starter-master/Backend/megaGymDataset.csv')
# # df.drop(columns=['Rating', 'RatingDesc'], inplace=True)

# # Replace 'column_name_to_print' with the name of the column you want to print
# column_name_to_print = 'Rating'  # Replace with the actual column name

# # Get unique values from the specified column
# unique_values = df[column_name_to_print].unique()

# print("Unique values in the column:")
# for value in unique_values:
#     print(value)

import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder
import matplotlib.pyplot as plt

# Load your dataset
data = pd.read_csv('/Users/jingyaogu/Desktop/FitClub-Starter-master/Backend/megaGymDataset.csv')

# Select relevant workout attributes for clustering
selected_attributes = ['Type', 'BodyPart', 'Equipment', 'Level', 'Rating']
workout_features = data[selected_attributes]

# Perform one-hot encoding on categorical attributes
encoder = OneHotEncoder()
workout_features_encoded = encoder.fit_transform(workout_features)

# Standardize features
scaler = StandardScaler()
scaled_features = scaler.fit_transform(workout_features_encoded.toarray())

# Perform PCA for dimensionality reduction
pca = PCA(n_components=2)
reduced_features = pca.fit_transform(scaled_features)

# Determine optimal number of clusters using silhouette score
silhouette_scores = []
for num_clusters in range(2, 10):
    kmeans = KMeans(n_clusters=num_clusters)
    cluster_labels = kmeans.fit_predict(reduced_features)
    silhouette_scores.append(silhouette_score(reduced_features, cluster_labels))

optimal_num_clusters = silhouette_scores.index(max(silhouette_scores)) + 4

print(optimal_num_clusters)

# Perform clustering with optimal number of clusters
kmeans = KMeans(n_clusters=optimal_num_clusters)
cluster_labels = kmeans.fit_predict(reduced_features)

# Recommend workouts based on similarity using Nearest Neighbors
nbrs = NearestNeighbors(n_neighbors=3, algorithm='ball_tree').fit(reduced_features)
distances, indices = nbrs.kneighbors(reduced_features)

# Generate workout plans based on clusters
workout_plans = {}
for cluster_id in range(optimal_num_clusters):
    similar_workouts = indices[cluster_labels == cluster_id]
    workout_plans[cluster_id] = similar_workouts.flatten().tolist()[:10]
selected_items = []

for key in workout_plans:
    selected_item = workout_plans[key][0]  # Select the first item from each array
    selected_items.append(selected_item)

res = []
for i in selected_items:
    res.append(data.iloc[i]['Title'])

print(res)

# Print workout plans
# for cluster_id, workouts in workout_plans.items():
#     print("cluster", cluster_id)
#     print(f"Cluster {cluster_id} Workout Plan:")
#     for workout_index in workouts:
#         print(f"- {data.iloc[workout_index]['Title']}")
#     print("this is the end")

# You can further refine this code and extend it to include user-specific attributes and recommendations.

# # Plot clusters
# plt.figure(figsize=(10, 6))
# for cluster_id in range(optimal_num_clusters):
#     plt.scatter(
#         reduced_features[cluster_labels == cluster_id, 0],
#         reduced_features[cluster_labels == cluster_id, 1],
#         label=f'Cluster {cluster_id}'
#     )
# plt.title('Cluster Visualization')
# plt.xlabel('Principal Component 1')
# plt.ylabel('Principal Component 2')
# plt.legend()
# plt.show()
