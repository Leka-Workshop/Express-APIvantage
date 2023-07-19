# How to setup Databases

There are three methods:
* Local installation
* Database hosting
* Docker image

I used hosting method. It's free.

### PostgreSQL

* Go to [ElephantSQL.com](https://www.elephantsql.com/)
* Register/Login
* You should be redirected to the [main page](https://customer.elephantsql.com/instance)
* Click on green button Create New Instance button to the right
* Input the form. Name, Plan and Tags.
* For Plan choose Tiny Turtle if you want a *free* instance.
* Click on select Region green button
* Choose region nearest to you
* Once you land on the instances page click on your instance
* It will take you to the details page (Server, Region, CreatedAt...)
* Look for URL. Copy it
* Paste URL in the .env file

```
PGSQL_URI=YOUR-URL
```

[Video Tutorial](https://www.youtube.com/watch?v=BuJj4LCWP_4)

### MongoDB

* Go to [MongoDB.com](https://www.mongodb.com/)
* Register/Login
* You should be redirected to the [main page](https://cloud.mongodb.com/)
* Click on green Create button on the right
* Choose dedicated
* Choose region nearest to you
* Choose free option
* Click green Create Cluster button
* Once Cluster is up go the main page
* In the left side menu look for Security > Database Acceess
* Click on green Add New Database User button
* Modal form opens. Choose Password Authentication Method
* Once you're done click on green Add User button
* In the left side menu look for Deployment > Database
* On the main page click Connect button
* Choose MongoDB for VSCode option
* On the next screen find "Connect to your MongoDB deployment".
* Copy the connection URL
* The username and password will be those you set in the Database User modal
* Paste URL in the .env file

```
MONGODB_URI=YOUR-URL
```

[Video Tutorial](https://www.youtube.com/watch?v=084rmLU1UgA)
