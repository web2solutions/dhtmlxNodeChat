# dhtmlxNodeChat  [![NPM version](https://badge.fury.io/js/dhtmlx-node-chat.png)](http://badge.fury.io/js/dhtmlx-node-chat) [![Build Status](https://travis-ci.org/web2solutions/dhtmlxNodeChat.svg?branch=master)](https://travis-ci.org/web2solutions/dhtmlxNodeChat)

Just a simple chat built using DHTMLX on client and Node.js (Express + ws) && Redis on back end


## Installation

List of softwares that you need to have already installed:

 - Redis (running on localhost)
 - Node.js
 - Grunt

Download this repository and uncompress to a given directory, lets assume: ***/Users/YourName/apps/dhtmlxNodeChat/***

Or, use ***npm***

    npm i dhtmlx-node-chat


##  Command line testing

#### Step 1

On terminal, navigate to the project directory:

    $ cd /Users/YourName/apps/dhtmlxNodeChat/

Install grunt (if you don't have it installed):

    $ npm install -g grunt-cli

Install dependencies:

    $ npm install grunt-contrib-qunit --save-dev

    $ npm install express --save

    $ npm install --save ws

    $ npm install grunt-express --save-dev

    $ npm install redis


#### Step 2

Now , type on terminal:

    $ grunt test


##  Browser testing

#### Step 1

    $ grunt server

Then open the browser and reach the following address to see the tests: 

	http://localhost:4080/test/t.html

Or open the browser and reach the following address to see the application running:

	http://localhost:4080/


## Starting application with node

	 $ cd /Users/YourName/apps/dhtmlxNodeChat/

	 $ node app.js
