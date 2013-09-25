# Application for Mobile Backend Internship at Zappos: 
### Cameron Jackson
### 21 September 2013

## Summary:
* Web application written in javascript using Node.js
* User inputs email and product ID or product Name. When the price is at least 20% off,  
	  they get an email notifying them of the change.
* Not an app for iPhone/Android but does account for varying screen sizes. 

## Configuration:
* Currently deployed to heroku at: http://aqueous-savannah-2343.herokuapp.com/ 
* Or, you can run it locally: configure your local system to run node.js and mongodb
	- Node is downloadable from http://nodejs.org/ 
	- MongoDB is downloadable from http://www.mongodb.org/downloads 
	- Both can be installed using homebrew. 
 * Unzip this file (or fork from github) and run npm install 
 * Open up the local server (node app)
 * Point your browser at localhost: 5000 and go for it! 
 		
## Room for Future Growth: 
* Allow users to choose at which sale price they'd like to be notified.
* Currently, if given a product name, Iloop through the results and return the cheapest 
	item. In the future, I could provide a list of matching items that the user then chooses. 
* A "shopping cart" functionality, where users log in and see the sale prices of all
	of their tagged items
* Use Statistics API to filter results to show most popular 
* Use Reviews API to foster user interactivity and link to zappos.com.
* More strenuous input validation and more effective database storage when the same
	user searches multiple products. 