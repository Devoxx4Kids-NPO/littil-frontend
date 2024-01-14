[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=littil-frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=littil-frontend)
![Build image workflow status](https://github.com/Devoxx4Kids-NPO/littil-frontend/actions/workflows/publish-build-container.yml/badge.svg)
![Known Vulnerabilities](https://snyk.io/test/github/Devoxx4Kids-NPO/littil-frontend/badge.svg)

# LITTIL website

This project contains the sourcecode of the LITTIL website.

## Setup your local environment

For more information about setting up your local development environment, please read [set up your development environment](https://devoxx4kids-npo.github.io/littil-documentation/platform/local-development/set-up-frontend-environment).

## Project files organization

The project files are split into two main folders: 'components' and 'pages'.

- Components: re-useable UI-components
- Pages: page level components

## Styling rules with TailwindCSS

We are using [TailwindCSS](https://tailwindcss.com/) to style our application. Keep these few rules in mind when styling:

1. Tailwind classes first: use tailwind classes for all the styling. If you are missing something in tailwind: try to use arbitrary values [(example)](https://tailwindcss.com/docs/width#arbitrary-values) or check the config file for missing colors etc.
1. HTMl first: use as much as tailwind classes in the html. Do not add your own classes to add tailwind classes in the `.scss`.
1. Use `@apply`: if styling in the `.scss` is nesseccary, add ALL classes to the `.scss`. Tailwind classes can be added by using @apply:

```
body {
    @apply w-10;
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Open api generator

Run `npm run openapi` to generate API servicees and models

## Manual deployment to a staging environment

Note that production-grade deployments should happen from a pipeline so that one single build (artifact) can be tested on staging, then deployed production, and persisted in the pipeline (for at least some time).

To do a manual deployment to staging though, run `npm run build` to produce the compiled application in `./dist`. Deploy this application by copying all files in `./dist/littil-org-website/` to a static web server file-system (such as the S3 bucket used in AWS). Finally, copy the local `config.staging.js` to `config.js` in the target.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Running the littil-backend

There are different solutions to run the littil backend. You can run the backend by pulling the repository from GitHub and start it with quarkus:dev. 
It is also possible to run the backend with docker. 

Use the .env.example to create a .env file with the credentials that are required to run the backend.

**running backend with local build image**
Pull the littil-backend from GibHub and build a docker image with the docker file src/main/docker/Dockerfile.jvm in this project.
Follow the instructions in this file to build the docker image.

Start the backend with this docker image with the command `docker-compose -f docker/docker-compose-local.yml up -d`


**running backend with ghcr.io image**
Instead of building a local docker image it is also possible to run the backend with a docker image from ghcr.io. 
This image is build  by the workflow of the littil-backend repository in GitHb.

First login with  `docker login -u <username> -p <accessToken>` followed by `docker-compose -f docker/docker-compose-ghcr.yml up -d` to start the backend.
