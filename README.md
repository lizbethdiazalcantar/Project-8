# Sprint 8 project

# Project Overview

This project tests the application Urban Routes, which is an application designed to create routes, estimate travel time and costs for different trasportation modes and offer additional delivery services.

# Project Scope

The testing performed covers the following features:

Setting the address
Selecting a Supportive Plan
Filling in the phone number field
Adding a credit card
Writing a message to the driver
Ordering a blanket and handkerchief
Ordering 2 ice creams
The search modal appears
Waiting for the driver information to appear in the modal

# Technologies Used:

Javascript tests were developed for the WebdriverIO framework for automated and functional testing as the testing techniques used. Utilization of modules and implementation of the Page Object Model were also used.

npm

# Instructions on How to Run Tests

1. Clone the repository:

git clone git@github.com:lizbethdiazalcantar/hm08-qa-us.git

2. Navigate to project directory:

cd hm07-qa-us

3. Install dependencies:

npm install

4. Set the test URL:

In wdio.conf.js, replace the API URL with the unique link generated after the launch of Urban Grocers server.

5. Run the tests using:

npm run wdio