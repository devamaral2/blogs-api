# blogs-api

This is a project made on Trybe full stack course. 

This project present a simulation of the back end of a blog website, where users can write messages to other
users with different categories. 
The project test the ability of the developers in use Sequelize to connect with a SQL data base, and in 
developed all the structure of the application.

Instalation:
Users can install this aplication with npm install directly on their computers or they can use the docker-compose
file using the command docker-compose -up -d and then the command docker exec -it blogs-api bash to enter on the 
container and then use the npm install.
Then the users need to make sure they made an SQL connection and  after use the command npm prestart to set all
migrations from the Sequelize.
Now to be able to see the results the users can use the command npm run debug and start the server.
