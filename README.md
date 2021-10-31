## Environment
* master branch - [http://sa-freelance-architect.vercel.app](http://sa-freelance-architect.vercel.app)
	* ![prod status](https://img.shields.io/github/deployments/cjtim/sa-freelance-architect/production)
* staging branch - [https://sa-freelance-staging.vercel.app](https://sa-freelance-staging.vercel.app/)
	* ![preview status](https://img.shields.io/github/deployments/cjtim/sa-freelance-architect/preview)



## Prerequisite
* Node 12-14
* yarn -  `npm install --global yarn`
* `.env.development` on root of repository

## Start Development
* `yarn install`
* `yarn dev`

## Database migration
1. export these env in terminal or edit directly into `ormconfig.js`
	```
	export PSQL_HOSTNAME=
	export PSQL_PASSWORD=
	export PSQL_USERNAME=postgres
	export PSQL_DATABASE=postgres
	```
2. `yarn db-generate`
3. `yarn db-migrate`

## env
```
NEXT_PUBLIC_LIFF_ID=
PSQL_HOSTNAME=
PSQL_PASSWORD=
PSQL_USERNAME=postgres
PSQL_DATABASE=postgres
FIREBASE_ACC=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xx-xxxxxxx-xxxxx
```
