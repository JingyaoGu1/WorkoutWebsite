# WorkoutWebsite with AI included
## Inspiration

As someone who works out a lot, I have to find a fitness coach or to watch a lot of videos to make a workout plan that best fits me. So I wonder could AI help in gerenating a workout for me? Obviously, I can use languages models like chatGPT to give me an answer. But can we do something similar to this but better? At least we can give it a try. The frontend is practicing REACT for me. I followed along with this Youtube video https://www.youtube.com/watch?v=gpqoZQ8GNK8&t=2387s. The backend is based on the workout dataset from Kaggle https://www.kaggle.com/datasets/drmkgray/workout-data .

### The website has 3 sections. First section is basically visuals displaying website information. 
![image](https://github.com/JingyaoGu1/WorkoutWebsite/blob/main/web1.png)
![image](https://github.com/JingyaoGu1/WorkoutWebsite/blob/main/web2.png)
![image](https://github.com/JingyaoGu1/WorkoutWebsite/blob/main/web3.png)

### Second is a filter and search section where users can select equipment type, difficulty level, and body part from the three drop down menus and the corresponding workouts will be displayed in a table format. Third is an AI powered section to auto generate workouts based on user attributes like age, height, weight and experience level.
![image](https://github.com/JingyaoGu1/WorkoutWebsite/blob/main/search.png)

## Steps for auto generating workouts
### 1. Data preprocessinng
Filtering out some invalid entries.
### 2. Select relevant user and dataset features and combine
    selected_attributes = ['Type', 'BodyPart', 'Equipment', 'Level', 'Rating']
    workout_features = df[selected_attributes]
    user_attributes = [age, height, weight, experience_level]
    user_features = np.tile(user_attributes, (len(workout_features), 1))
    user_features = np.hstack((user_features, workout_features.values))
### 3. Perform one-hot encoding and standardize features
    encoder = OneHotEncoder()
    user_features_encoded = encoder.fit_transform(user_features)
    scaler = StandardScaler()
    user_features_scaled = scaler.fit_transform(user_features_encoded.toarray())
### 4. Perform PCA for dimensionality reduction
    pca = PCA(n_components=2)
    reduced_features = pca.fit_transform(user_features_scaled)
### 5. Determine optimal number of clusters using silhouette score
    silhouette_scores = []
    for num_clusters in range(2, 10):
        kmeans = KMeans(n_clusters=num_clusters)
        cluster_labels = kmeans.fit_predict(reduced_features)
        silhouette_scores.append(silhouette_score(reduced_features, cluster_labels))
    optimal_num_clusters = silhouette_scores.index(max(silhouette_scores)) + 4
### 6. Perform clustering with optimal number of clusters(KNN)
    kmeans = KMeans(n_clusters=optimal_num_clusters)
    cluster_labels = kmeans.fit_predict(reduced_features)
### 7. Recommend workouts based on user attributes
    nbrs = NearestNeighbors(n_neighbors=5, algorithm='ball_tree').fit(reduced_features)
    distances, indices = nbrs.kneighbors(reduced_features)
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
 ### Visualization   
 
![image](https://github.com/JingyaoGu1/WorkoutWebsite/blob/main/Screenshot%202023-08-10%20at%2011.01.52.png)

In this visualization, the combined features is divided into 5 different clusters. I am randomly choosing 1 from each of the cluster so that the user has the most diverse workout. This can be used together with the previous part where the users can search and select workouts based on their preferences.
