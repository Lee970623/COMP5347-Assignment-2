# COMP5347_Assignment_2
Repository of Group 4 for COMP5437 Assignment 2.
<<<<<<< HEAD

To start MongoDB:

Mac:
    brew services start mongodb-community@4.2

Windows:
    mongod -dbpath <"your specified location">

To import revisions into MongoDB, use the following scripts:
    
Mac:
    cd ./public/data/Dataset_22_March_2020/revisions
    for filename in *            
    do
    mongoimport --jsonArray --db Assignment --collection revisions --file $filename
    done

Windows:
    cd ./public/data/Dataset_22_March_2020/revisions
    @echo off
    for %%f in (*.json) do (
        "mongoimport.exe" --jsonArray --db Assignment --collection revision --file %%~nf.json
    )

## Start DB
start_db_server.bat
## Import revisions
import_revisions.bat
=======
>>>>>>> master
