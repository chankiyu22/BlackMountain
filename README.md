# CMPSCI 326 Web Programming: Team Black Mountain

## How to Run
Run our app using 'node app.js'. This will open a server on port 3000.

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
