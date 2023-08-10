# WorkoutWebsite
## Inspiration

As someone who works out a lot, I have to find a fitness coach or to watch a lot of videos to make a workout plan that best fits me. So I wonder could AI help in gerenating a workout for me? Obviously, I can use languages models like chatGPT to give me an answer.

Here is the answer by GPT:

Day 1: Upper Body Strength
Warm-up: 5-10 minutes of light cardio (e.g., brisk walking or jogging)
Push-ups: 3 sets of 10 reps
Dumbbell Bench Press: 3 sets of 8 reps
Bent-Over Rows: 3 sets of 10 reps
Shoulder Press: 3 sets of 8 reps
Bicep Curls: 3 sets of 12 reps
Tricep Dips: 3 sets of 12 reps
Cool-down: 5-10 minutes of stretching

Day 2: Cardiovascular Training
Moderate-intensity Cardio: 30-45 minutes (e.g., jogging, cycling, swimming)
Cool-down: 5-10 minutes of stretching

Day 3: Lower Body Strength
Warm-up: 5-10 minutes of light cardio
Squats: 3 sets of 12 reps
Lunges: 3 sets of 10 reps (each leg)
Deadlifts: 3 sets of 8 reps
Leg Press: 3 sets of 10 reps
Calf Raises: 3 sets of 15 reps
Cool-down: 5-10 minutes of stretching

Day 4: Active Recovery
Low-intensity activity: 30-60 minutes (e.g., gentle yoga, walking, light swimming)
Foam rolling or gentle stretching

Day 5: HIIT (High-Intensity Interval Training)
Warm-up: 5-10 minutes of light cardio
HIIT Intervals: 20 minutes (e.g., 30 seconds of high-intensity exercise followed by 30 seconds of rest)
Bodyweight exercises like burpees, mountain climbers, jumping jacks, etc.
Cool-down: 5-10 minutes of stretching

Day 6: Flexibility and Core
Warm-up: 5-10 minutes of light cardio
Yoga or Pilates: 45 minutes
Core exercises: Planks, Russian twists, bicycle crunches, etc. - 3 sets of 15 reps
Cool-down: 10-15 minutes of deep stretching

Day 7: Active Rest
Engage in a fun and active outdoor activity like hiking, cycling, or playing a sport.
Remember to listen to your body and adjust the intensity as needed. Stay hydrated, eat well, and get adequate rest for optimal recovery. If you're new to exercise, consider starting with lighter weights and gradually increasing as you become more comfortable and stronger. It's also recommended to consult a fitness professional to tailor the plan to your individual needs and goals.

Can we do something similar to this but better? At least we can give it a try. The frontend is practicing REACT for me. I followed along with this Youtube video https://www.youtube.com/watch?v=gpqoZQ8GNK8&t=2387s. The backend is based on the workout dataset from Kaggle https://www.kaggle.com/datasets/drmkgray/workout-data .

### The website has 3 sections. First section is basically visuals displaying website information. Second is a filter and search section where users can select equipment type, difficulty level, and body part from the three drop down menus and the corresponding workouts will be displayed in a table format. Third is an AI powered section to auto generate workouts based on user attributes like age, height, weight and experience level.

## Steps for auto generating workouts
### 1. Data preprocessinng
### 2. Select relevant user and dataset features and combine
### 3. Perform one-hot encoding and standardize features
### 4. Perform PCA for dimensionality reduction
### 5. Determine optimal number of clusters using silhouette score
### 6. Perform clustering with optimal number of clusters(KNN)
### 7. Recommend workouts based on user attributes
