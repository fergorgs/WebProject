npm install
cd backend
npm install
cd database
for file in *.json; do
    mongoimport --db petshop --collection ${file%.*} < $file
done