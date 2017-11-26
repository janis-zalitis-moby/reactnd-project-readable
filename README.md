# Readable Project

This is my submission for Udacity's React Fundamentals course second Project - Readable.

## TL;DR

To start app:

1. Server:
* go into server folder `cd api-server`
* install dependencies with `npm install`
* start the server with `npm start`

2. Frontend
* go into server folder `cd frontend`
* install dependencies with `npm install`
* start the frontend with `npm start`

## Common scenarios:
1. To see all posts in category, click on category name on the "Categories" list.
2. To see post contents and comments, click on post title from posts table.
3. To manipulate content, use buttons at the bottom right
  * "Add New Post"
  * "Edit"
  * "Delete"
  * "Agree" (VoteScore+)
  * "Disagree" (VoteScore-)
  * "Reply" (= "Add new comment")
  
## Notes:
* best viewed on a screen resolution at least 1000px wide
* used popular libs for ui - material-ui and react-virtualized
* kept visuals to minimum, some minor styling glitches may happen
* used AirBnB config for ESlint with minor changes, ignored a couple of non-fatal eslint warnings/errors where too strict
* Table.noRowsRenderer doesn't appear to work in installed version of react-virtualized (non-stable?), didn't dig in which it does
* Opted for always fully refreshing data when adding/editing/updating to reduce logic necessary for syncing
* Used Yarn to develop locally