# My-Ecommerce-Challenge
Project Description: I built the back end for an e-commerce site by modifying the starter code. I configured a working Express.js API to use Sequelize to interact with a MySQL database. Because this application won’t be deployed, I'll provide a link to a walkthrough video that demonstrates the application's functionality below.


## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

Challenges:
- I was having major issues seeding the models into the database. The paths and code were correct, but it kept giving me error messages. So I used the "associate" method instead of "async/await" method in each model file and they all finally seeded into the database. 
- I could not access the server properly on insomnia and double-checked all my paths and code format and syntax was correct. I even tried restarting/resetting the server, and still could not access it on insomnia.


Link to walkthrough video: https://drive.google.com/file/d/1A9Gn9JRR_ZhO42B-zOF5fFxZCjtpgLEn/view

Link to Github repository: https://github.com/dialaobeid/My-Ecommerce-Challenge/tree/main

Screenshot of deployed application: [!Alt](/images/Screenshot%201%20-%20Mod%2013.png) [!Alt](/images/Screenshot%202%20-%20Mod%2013.png)
