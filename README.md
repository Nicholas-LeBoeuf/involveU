<h1 align = "center"> involveU </h1>
<p  align = "center" > <img src = "https://user-images.githubusercontent.com/59942769/199515690-39584d38-d989-41ef-b7f9-bf47716a10a4.png"/> </p>

## Description
<p font-size = "18px">InvolveU is a one stop shop for everything student involvment. Students will be able to view events on campus as well as favorite their favorite clubs. This bridges the gap between all parts of campus life. This means not only student involvment recieves benifit from this application. involveU can serve admissions, womens centers any many more offices. </p>

## Structure

involveU is set up with a front-end (Angular), a back-end (Java), and Database (MySQL). The front-end and the back-end is connected through a RESTful API. The Database is connected through JDBC with BeanPropertyRowMapper to map the data to objects. Please see [Dependencies](README.md#dependencies) section for more info!

## Set-Up
### Database

Database for involveU is hosted on an aws mySQL RDS server and is a mySQL Relational database. Please name the database involveU as that is how it is configured within the application. You may have to change the username and password to access your specific databse

- Please refer to the schema model in the database to view how the schema is structured
[Database Schema Model](https://github.com/Nicholas-LeBoeuf/involveU/blob/main/Database)

- The query sheet will help build the inital database and should not be tempered with as it will mess with the configuration:
  [DDL Queries](https://github.com/Nicholas-LeBoeuf/involveU/blob/main/Database)
  
 > Database Information Last Updated: 11/2/2022 1:26pm EST
 
 ### Enviornment 
 
 The two main enviornemnts our team uses is [WebStorm](https://www.jetbrains.com/webstorm/) (Angular) and, [IntelliJ](https://www.jetbrains.com/idea/) (Java). We reccommend you stay with the same IDE's as it will prevent any unneeded issues further on into development. Some dependencies will be missing on first start, we recommend running any npm installs that the IDE asks of as it will make it quick and easy to start up. All dependencies will be listed bellow.
 
## Dependencies
              
