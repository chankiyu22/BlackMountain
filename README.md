# CMPSCI 326 Web Programming: Team Black Mountain

## How to Run
Run our app using 'node app.js'. This will open a server on port 3000.

## Project Assignment 5
Additions that we made for this project:

1. Database
   - 326.sqlite: created and filled tables for users, groups, groupmembers, tweets, followers, hashtags
   - Modified /lib folder to incorporate the new database

## Project Assignment 4
Additions that we made for this project:

1. Ajax
   - Follow User button no longer refreshes page
   - Join Group button no longer refreshes page
   - Post Tweet button no longer refreshes page
   - Signup will validate username and password without refreshing

2. Websockets
   - Tweet feed is immediately updated with new tweets
   - /mentions and /connect pages will immediately update with new information
   - Profile pages update immediately
   - /group will immediately update with any new tweets

3. Other Additions
   - Hashtags
      - lib/util/util.js: updated to look for tweets that include a hashtag
   - Search 
      - routes/search.js: new route for search page that gets all tweets from the query string
      - lib/tweets/tweetdb.js: added getTweetsContaining function that is used for the search

4. Relevant Files
   - lib/sockets/sockets.js for server side sockets
   - public/javascript/*.js for client side sockets and ajax

## Project Assignment 3
Additions that we made for this project:

1. Sessions
   - app.js: cleaned up sessions coding completed in previous project

2. Mentions
   - lib/util/util.js: created mention link to profiles
   - public/stylesheets/style.css: added styling to the mentions
   - routes/connect.js: shows mentions on connect page

3. Interactions
   - lib/util/util.js: added functionality to get all messages for a given user to be put in the interactions timeline

4. Groups
   - lib/groups/groupdb.js: functionality for creating groups, checking if a user is a member, getting members of a group, and adding members
   - routes/profile.js: added route for group 
   - views/group_profile.ejs: html for group profiles

5. Functional Spec
   - added TwitterFunctionalSpecification.pdb to public folder, with extensions details and scenario added

6. Documentation
   - added documentation to missing areas and new additions
