# FullProject
This Project mainly focuses on Online Movie Booking System. We use Hapi Js for the backend and React Js for the frontend.

### Database
Other Tech used - Postgres for managing the database where we will have details stored (You can see the directory `Project/models` for the Sequelize  models we have used.), Sequelize(ORM), Redux store for front-end storing.


### Login/Registration
Also implemented logic for registering and login of the users and also maintained the state by setting cookie with the token generated on successful login (also maintained the session of the user in the browser). Also have written strategy for Admin user and registered user. 


### Routes 
You can check the routes(routes/routes.js) and the corresponding handlers(handlers/*handler.js).

### Redis Cache(Update coming soon):
Tried to have a cache for certain data's where the change is minimal(Like Movies and all can be pushed into the cache since only the admin changes and the changes are all happening at a large time-period only) , so that the retrieval of the data on request will be faster as it is stored in the Redis Cache.

### Elastic Search(update coming soon) :
Wherver the aggregation becomes slightly comoplex and time-consuming we can use Elastic Search(One of the use of the Elastic search) and store as and when the data is getting updated.

### Bull & Cron(update coming soon) :
Email send via Bull is being implemented and cron is used for deletion of the show times after every one hour, so that we don't show the users the not useful data(Expired shows).

Features :
1. You can book ticket without registering(just by providing mail-id and phone number) into the website and once you register with the website we would in-turn map the user properly and provide the other details (such as booked tickets,etc).
2. Admin's can only add movie for the theater for which the admin account was created.
3. All types of tech used - Redis, elastic search, bull, cron, Redux store.
