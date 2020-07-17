# mmartan search
This is a simple mock of MMARTAN search page!

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
