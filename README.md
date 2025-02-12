# AwesomeGicBank

LIVE DEMO Link [AwesomeGicBank](https://awesome-gic-bank.web.app/)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```




## Problem Statement

You're designing a simple banking system that handles operations on bank accounts. At the moment, your system is capable of three features:
- depositing an amount
- withdrawing an amount
- printing account statement

When account is created, its balance is 0.

When launching the application, it prompts user for actions:
```
Welcome to AwesomeGIC Bank! What would you like to do?
Deposit
Withdraw
Print statement
Quit
```

User should be to select any of the options from the UI.

## Deposit
Upon selecting `Deposit` from the UI, application prompts user for amount:
```
Please enter the amount to deposit:
```

User is then able to enter:
```
500
```

Then system responds with:
```
Thank you. $500.00 has been deposited to your account.
Is there anything else you'd like to do?
Deposit
Withdraw
Print statement
Quit
```

## Withdraw
Upon selecting `Withdraw` from the UI, system then responds with:
```
Please enter the amount to withdraw:
```

User is able to enter:
```
100
```

Then system responds with:
```
Thank you. $100.00 has been withdrawn.
Is there anything else you'd like to do?
Deposit
Withdraw
Print statement
Quit
```
You can ignore where the withdrawn amount goes for now.

## Print Statement
Upon choosing to `Print statement` from the UI, system then responds with:
```
Date                  | Amount  | Balance
8 Jul 2022 11:12:30AM | 500.00  | 500.00
8 Jul 2022 11:14:15AM | -100.00 | 400.00
```

## Quit
When a user chooses to `Quit`, the system responds with:
```
Thank you for banking with AwesomeGIC Bank.
Have a nice day!
```
------------------------------------------INSTRUCTIONS TO RUN-------------------------------
# Assumptions
    MIN_DEPOSIT = 1;
    MAX_DEPOSIT = 100_000;
    MIN_WITHDRAW = 1;
    MAX_WITHDRAW = 100_000;
    DEFAULT_CURRENCY = 'USD';

# Pre-requisite to run this application
To run this Angular application, ensure you have the following prerequisites installed on your system:

1. **Node.js**: Download and install the latest LTS version of Node.js from [nodejs.org](https://nodejs.org/).
2. **Angular CLI**: Install Angular CLI globally using npm:
    ```bash
    npm install -g @angular/cli
    ```
3. **Dependencies**: Navigate to the project directory and install the required dependencies:
    ```bash
    /awesome-gic-bank
    npm install
    ```
3. **Run**: Navigate to the project directory:
    ```bash
    /awesome-gic-bank
    ```bash
    ng serve
    ```

    Once the server runs, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

# Click the below link to see it live deployed on Firebase
    [AwesomeGicBank](https://awesome-gic-bank.web.app/)


