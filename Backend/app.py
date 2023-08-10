from flask import Flask, request, jsonify, render_template
import pandas as pd
from flask_cors import CORS  # Import Flask-Cors
import random
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder

app = Flask(__name__)
CORS(app) 
# Read data from the CSV file and preprocess if needed
df = pd.read_csv('/Users/jingyaogu/Desktop/WorkoutWebsite/Backend/megaGymDataset.csv')
# df.drop(columns=['Rating', 'RatingDesc'], inplace=True)
# Preprocessing steps can be done here if required

# Define workout plan generation logic based on user input
def generate_workout_plan(equipment_type, body_part, difficulty_level):
    if equipment_type == "All":
        filtered_df = df[(df['Level'] == difficulty_level) & (df['BodyPart'] == body_part)]
    elif difficulty_level == "All":
        filtered_df = df[(df['Equipment'] == equipment_type)& (df['BodyPart'] == body_part)]
    elif body_part == "All":
        filtered_df = df[(df['Equipment'] == equipment_type) & (df['Level'] == difficulty_level)]
    else:
        filtered_df = df[(df['Equipment'] == equipment_type) & (df['Level'] == difficulty_level) & (df['BodyPart'] == body_part)]

    if filtered_df.empty:
        print("No matching rows in DataFrame.")
        return None
    workout_details_json = filtered_df.to_json(orient='records')
    return workout_details_json

def generateAI(age, height, weight, experience_level):
    selected_attributes = ['Type', 'BodyPart', 'Equipment', 'Level', 'Rating']
    workout_features = df[selected_attributes]

    # Combine user input with workout attributes
    user_attributes = [age, height, weight, experience_level]
    user_features = np.tile(user_attributes, (len(workout_features), 1))
    user_features = np.hstack((user_features, workout_features.values))

    # Perform one-hot encoding on categorical attributes
    encoder = OneHotEncoder()
    user_features_encoded = encoder.fit_transform(user_features)

    # Standardize features
    scaler = StandardScaler()
    user_features_scaled = scaler.fit_transform(user_features_encoded.toarray())

    # Perform PCA for dimensionality reduction
    pca = PCA(n_components=2)
    reduced_features = pca.fit_transform(user_features_scaled)

    # Determine optimal number of clusters using silhouette score
    silhouette_scores = []
    for num_clusters in range(2, 10):
        kmeans = KMeans(n_clusters=num_clusters)
        cluster_labels = kmeans.fit_predict(reduced_features)
        silhouette_scores.append(silhouette_score(reduced_features, cluster_labels))

    optimal_num_clusters = silhouette_scores.index(max(silhouette_scores)) + 4

    # Perform clustering with optimal number of clusters
    kmeans = KMeans(n_clusters=optimal_num_clusters)
    cluster_labels = kmeans.fit_predict(reduced_features)

    # Recommend workouts based on similarity using Nearest Neighbors
    nbrs = NearestNeighbors(n_neighbors=5, algorithm='ball_tree').fit(reduced_features)
    distances, indices = nbrs.kneighbors(reduced_features)

    # Generate workout plans based on clusters
    workout_plans = {}
    for cluster_id in range(optimal_num_clusters):
        similar_workouts = indices[cluster_labels == cluster_id]
        workout_plans[cluster_id] = similar_workouts.flatten().tolist()[:5]
    selected_items = []

    for key in workout_plans:
        selected_item = workout_plans[key][0]  # Select the first item from each array
        selected_items.append(selected_item)

    res = []
    for i in selected_items:
        res.append(df.iloc[i]['Title'])

    return res

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/workout', methods=['POST'])
def workout_endpoint():
    data = request.get_json()

    # Extract user inputs from the request data
    equipment_type = data.get('equipment_type')
    body_part = data.get('body_part')
    difficulty_level = data.get('difficulty_level')

    # Backend processing to generate workout plan based on exercise_type and difficulty_level
    workout_plan = generate_workout_plan(equipment_type, body_part, difficulty_level)

    # Return the generated workout plan as a JSON response
    return jsonify(workout_plan)

@app.route('/api/AIGenerate', methods=['POST'])
def AI_endpoint():
    data = request.get_json()
    # Extract user inputs from the request data
    age = data.get('age')
    height = data.get('height')
    weight = data.get('weight')
    experience_level = data.get('experience_level')
    content = generateAI(age, height, weight, experience_level)

    # Return the generated workout plan as a JSON response
    return jsonify(content)

if __name__ == '__main__':
    app.run(debug=True)
