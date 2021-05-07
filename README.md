# Welcome to SoundHealth Codebase

SoundHealth is a project based on the sound recognition work to recognize cough from patient. [Need new description]

# Project Structure 
The project divide into frontend and backend. Frontend directory is related with the design implementation using Reactjs with NextJs. For backend, it will consist of database and routing implementation. 

The deployement will consist two part, the frontend will automaticallyd deploy to Vercel and backend will deploy into firebase hosting. Github actions will automatically deploy backend into firebase. 

# Technology Stack
1. Reactjs with Nextjs, frontend. 
2. Express, backend routing 
3. Firebase and firestore, for database and backend hosting
4. Github Actions, for automated testing
5. Vercel, for deloyment


# How to Use
1. `Git Clone` project into your own local 
2. Everytime one working with new feature/bug, one should create a new branch and check out into it. 
3. The brach should follow naming standard of 
    
    `feature/{branch name}` for new feature 
    
    or `bugfix/{branch name}` for solving new bug.
    
    or `test/{brach name}` for test.
4. Follow the `git add`, `git commit` `git push` process. Remember to commit to the branch, not into the main branch.  
5. Create PR for when merging into the `main branch` with same naming convention above. 
6. Write a description to help the reviewer understand whats the intention behind the new branch.
7. After everything is accepted, the reviewer will merge into the `main branch` and github actions will automatically test and deploy new updated branch. 

# Standard Practice
1. Our work will divided into two structure the frontend and the backend
2. We strive to make clear structure of what we build by divided the work into small PR based on the branch of each of the feature or bug. 
3. Everytime someone work on new task make sure to create new branch, commit on that branch and send pull request. Never directly push into the `main` branch. 
4. Every new PR must follow the Code Review process to make sure the standard of code and avoid any bug.

# Requirement 
1. node.js
2. npm
3. firebase

# Environment 
There are `environment` need to consider : 
- `firebase` key for accessing to the firebase.
- `vercel` key for accessing to the vercel
- We strive for `production` and `development` key to divide the work into dev and production. In progress. 


# Current Note 
Tasknya 2 minggu kedepan adalah:
1. Buat SOP dan caranya untuk menyimpan data2 kita. Apakah pakai database? Online? Perlu sewa hosting kah? Aku ada hosting. Tp agak lemot 😓. Perlu bikin web kah seperti yang diatas tadi?
2. Bikin sistem seperti poin 1.
3. Mulai membagi mencari/menjadi nara sumber suara.
4. Belajar ttg MEPI UGM tentang ethical clearance (ini aku gpp)
5. Persiapan/SOP pengambilan data

# Contributors


# Note 28 April 2021
- ubah ke spektogram jadi ini udah bisa, 
- ini