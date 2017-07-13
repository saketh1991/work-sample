Getting Started
===============

The TDMC UI application is written on Angular2, Material Design and Covelant

* Angular2 - https://angular.io
* Covelant - https://teradata.github.io/covalent
* Material Design - https://material.io/guidelines/material-design/introduction.html

Prerequisites
-------------

Your development machine should have current versions of the following installed:

* NodeJS - https://nodejs.org/en/
* NPM - https://www.npmjs.com/
* Angular CLI - https://cli.angular.io/
* Git - https://git-scm.com/

Recommended Tools
-----------------

We use a number of tools to streamline development. These are not required, and you are welcome to use whatever dev 
tools you are most comfortable with.

* MS Visual Code, Free IDE - https://code.visualstudio.com/
* WebStorm, my personal IDE of choice - https://www.jetbrains.com/webstorm/
* TowerGit, simple git client - https://www.git-tower.com

Installation
------------

First clone the source code from our git repository: https://github.td.teradata.com/tdmc/tdmc-ui.git

Then go to the project root and install the project dependencies.

    cd path/to/tdmc-ui
    npm install
    
Running the App
---------------

Once the app is installed you can run it locally with the AngularCLI testing server:

    cd path/to/tdmc-ui
    ng serve
 
The browse to http://localhost:4200

If you are running multiple instances you can specify the port

    cd path/to/tdmc-ui
    ng serve --port 8888
 
The browse to http://localhost:8888

If you are running into CORS related issues when running the application, you can run it using a proxy.
This recommendation applies basically to developers.

To run the application in proxy mode:

Edit `src/app/api-url.ts` file and update line 2 to:

    import { environment } from '../environments/environment.proxy';

Run the app using the command:

    cd path/to/tdmc-ui
    npm run proxy

Reminder: do not commit the changes to `src/app/api-url.ts`.

Building the App
----------------

AngularCLI also offers a utility to build the application into packed JS files:

    cd path/to/tdmc-ui
    ng build
    
The project will build into the /dist directory

Unit Testing
----------------

We run the unit test suite with NPM

    cd path/to/tdmc-ui
    npm test
    
Any test cases found in the /src directory will be automatically run. 

You run the end to end tests with NPM as well

    cd path/to/tdmc-ui
    npm run e2e

_Note that this must be done prior to submitting a pull request!_

Continuous Integration
----------------------

We are in the process of setting up continuous integration using Jenkins. There are two jobs currently:

* Nebula Demo: http://sdlc7609.labs.teradata.com:8080/job/TDMC%20UI%20Testing/
* AMI Build: http://sdlc7609.labs.teradata.com:8080/view/Packaging/job/nebula-ui-build/101/console

WorkFlow
--------

We manage our work with Jira Agile. You will be assigned descriptive tickets that:

* describe the issue
* include a link to an example
* include detailed exit criteria

To get started drag one of your issues into the In Progress column.

We develop using a version of GitFlow, but with a single Master branch:

1. Pull the most recent master
2. Create a feature branch for your work called `feature/some-descriptive-name`
3. When your feature is complete (manually tested with updated/passing unit tests) push your feature branch to GitHub
4. Create a new pull request

Once the pull request is complete open your Jira Ticket:

1. Drag the issue into the Done column
2. Add a link to the pull request to the issue
3. Add a screenshot confirming the visual fix
4. Add a step by step description of the testing you completed

    

 
 






