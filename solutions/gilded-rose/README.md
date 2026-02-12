# Gilded Rose

This is the Gilded Rose kata in TypeScript.

https://kata-log.rocks/gilded-rose-kata

<img width="1536" height="1024" alt="ChatGPT generated image aid" src="https://github.com/user-attachments/assets/99f313df-b114-43e8-8c07-64a9972f2539" />

## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

There are two unit test frameworks to choose from, Jest and Mocha.

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

Mocha

```sh
npm run test:mocha
```


## Run the TextTest fixture from the Command-Line

_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

You should make sure the command shown above works when you execute it in a terminal before trying to use TextTest (see below).


## Run the TextTest approval test that comes with this project

There are instructions in the [TextTest Readme](../texttests/README.md) for setting up TextTest. You will need to specify the Python executable and interpreter in [config.gr](../texttests/config.gr). Uncomment these lines:

    executable:${TEXTTEST_HOME}/python/texttest_fixture.py
    interpreter:python


## Analysis

```sh
export SONARQUBE_URL=http://localhost:9000
export SONARQUBE_TOKEN=sqp_
export SONARQUBE_REPO=/my/app/repo
```

```sh
docker run \
    --rm \
    -e SONAR_HOST_URL="${SONARQUBE_URL}"  \
    -e SONAR_TOKEN="${SONARQUBE_TOKEN}" \
    -v "${SONARQUBE_REPO}:/usr/src" \
    sonarsource/sonar-scanner-cli
```
