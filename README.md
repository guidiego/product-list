# mmartan search
This is a simple mock of MMARTAN search page! Using **next**, **typescript**, **react**, **koa** and **jest**

## How To Run
```
cp ./sample-env .env
docker-compose up
```

NOTICE: For images you should to add `STATIC_CACHE_URL` inside `.env` to point the start uri for static images

## Quality
You can run this scripts to ensure quality:
- yarn lint
- yarn tsc
- yarn test

## FAQ:
### You agree with all that you do in this project?
No! That's project was made like a "POC", so some decisions are based on "let it work" and not in "how do that in a best way", some files had a comment about "Ideal Case", like Product inside ProducList and the mocked tags list on `server/tag/model`

### Why KOA guidi?
https://nodesource.com/blog/Express-Koa-Hapi

### Why not HTTP2?
Configure the certificate will take some time, at least the code behind do that in KOA is simple too, but will take a time because I never do that in Heroku, so I prefere not setting it up

### Why not end PWA?
The idea is create a simple PWA with a plugin not to customize!

### Why not to Random Paginate?
I use mongoose for a reaso: Easy to deploy, fast to read (nice to views like that one) and had a nice API and sinergy with NODE. At least, mongo only give an option to sort a sample, what will take us to some solutions like:
- Save response on a redis with a random key (seed) and always consume that on a first entry. (I didn't had a redis instance)
- Skip a random number (could break pagination it self)
- Based on count select random elements (not a performatic choose)
- Create a lat/long component inside document with random lat/long and use a integer (seed) and use $near to sort by distance (creating diferent sorts of pagination), but that's not a semantic and not easy to implement at all, so I prefer take it.

## Why not cache?
As I said, that's a POC, but it's a nice stuff cache your SSR :)
