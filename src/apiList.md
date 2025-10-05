# Api's

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectRequestRouter
- POST /request/send/:status/:userId
status = interested or ignored
- POST /request/send/accepted/:userId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on platform

/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

skip = (page-1)*limit;


