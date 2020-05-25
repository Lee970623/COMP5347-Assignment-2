# COMP5347_Assignment_2
Repository of Group 4 for COMP5437 Assignment 2.

This project is about the statistics of wiki-pedia revisions of articles. It includes several analysis, such as overall, individual and author. The different analysis consist of related statistics of the revisions. For example, the overall analysis
will show the revisions with longest or shortest history, the individual analysis will show the top five users of one particular
article.
This application is a single page application and the technical stack is MEAN, which stands for __MongoDB__, __Express,js__, __AngularJS__ and
__Node.js__ .

## Start DB
To start the database, make sure you have already downloaded MongoDB on your computer. The website for downloading is:
[Download MongoDB](https://www.mongodb.com/download-center/community)
The version used here is community 4.2.

### Batch script
start_db_server.bat

### Command line
Mac:
```
brew services start mongodb-community@4.2
```
Windows:
```
mongod -dbpath <"your specified location">
```

## Import revisions

### Batch script
import_revisions.bat

### Command line

**Mac:**
```
cd ./public/data/Dataset_22_March_2020/revisions
for filename in *            
do
mongoimport --jsonArray --db Assignment --collection revisions --file $filename
done
```

**Windows:**
```
cd ./public/data/Dataset_22_March_2020/revisions
@echo off
for %%f in (*.json) do (
    "mongoimport.exe" --jsonArray --db Assignment --collection revision --file %%~nf.json
)
```

## Start Application
In order to start the application, the dependencies specified in package.json must be meet. Just simply
```
npm install <moduls> --save
```
for each module shown in package.json.

## Open Application on Broswer
The default port is set as [localhost:3000](localhost:3000), if this one is occupied, please either choose another browser or
modify the port number in __index.js__ on line 26. The alternaltive port would be 80.

