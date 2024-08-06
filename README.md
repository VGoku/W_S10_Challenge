# Sprint 10 Challenge

## ✨ Requirements

1. Node >= 18.x
2. Git Bash (Windows users)
3. Redux Devtools Chrome extension

## ✨ Usage

1. `npm install`
2. `npm run dev`
3. `npm test`

## Introduction

Welcome to Sprint 10 Challenge! In this project, you will demonstrate your ability performing advanced state management in React.

It's up to you whether to track the totality of app state using Redux, or go instead with a combination of different approaches.

The main goal is to implement a form that can POST pizza orders to a server. The finished product will also display a list of past orders obtained via GET.

## 🥷 Tasks

### TASK 1 - Study the mock site

Your fully-functional **design mock** is [HERE](https://w-s10-challenge-ac3b8bb5dab3.herokuapp.com/).

Study it using Chrome Devtools, paying special attention to the Network and the Redux tabs.

After completing the following tasks, your app must match the functionality of the design.

You are free to design the state of the app however you'd like, so the structure of your Redux store might not match that of the mock.

### 👉 TASK 2 - Study the API using Postman

#### Endpoint A: [GET] `http://localhost:9009/api/pizza/history`

This endpoint allows you to GET the list of past orders from the server.

#### Endpoint B: [POST] `http://localhost:9009/api/pizza/order`

This endpoint allows you to POST a new pizza order. Here is an example of a valid request payload:

```json
{ "fullName": "Jane Doe", "size": "L", "toppings": ["1","2","3","4","5"] }
```

- `fullName` is required and must have min length of 3 chars, and max length of 20 chars.
- `size` is required and only allows one of three possible values: "S", "M" or "L".
- `toppings` is an optional array that can only contain valid topping IDs:
  - "1" or 1 means Pepperoni
  - "2" or 2 means Green Peppers
  - "3" or 3 means Pineapple
  - "4" or 4 means Mushrooms
  - "5" or 5 means Ham

❗ If the POSTed order **fails server-side validation**, a 422 response will be returned containing an error message:

```json
{ "message": "fullName is required" }
```

### 👉 TASK 3 - Redux setup

- Inside [store.js](./frontend/state/store.js) lives the setup of your Redux store
- Setup is simplified due to the use of Redux Toolkit, and might look different to what you're used to
- Redux, Redux Toolkit, Redux Thunk and Redux Devtools are already installed and configured
- The Redux store is already available for use by components (see Redux Devtools)
- Plug in your own reducer(s) as you build them in the following tasks, see example

### 👉 TASK 4 - Track the history of orders using Redux

- Use Endpoint A to GET the history of orders from the server
- Render the orders in [OrderList.js](./frontend/components/OrderList.js)

❗ Make sure all readable texts match those of the prototype

### 👉 TASK 5 - Track the size filter using Redux

- The default value of this state is "All"
- Possible values for this state are "All", "L", "M" and "S"
- Clicking the different buttons in [OrderList.js](./frontend/components/OrderList.js) updates this state

### 👉 TASK 6 - Create a new pizza order

- Use Endpoint B to POST a new order to the server
- Complete the form in [PizzaForm.js](./frontend/components/PizzaForm.js)
- A message should render informing the user that the POST request is in progress (see prototype)
- Validation errors should render on the page (see prototype)
- Reset the inputs to their original state on successful POST
- **The state of the inputs** of the form must be tracked using one of the following options:
  - The Reducer Hook
  - Context + the Reducer Hook
  - The Redux store

❗ Validation is performed server-side only, do not implement frontend validation
tests in [codegrade.test.js](./codegrade.test.js) depend on being able to locate the elements containing the following `data-testid` attributes. Careful not delete neither the elements nor the attributes from the JSX:

- `data-testid="fullNameInput"` for the input box
- `data-testid="sizeSelect"` for the dropdown
- `data-testid="checkPepperoni"` **etc** for the checkboxes
- `data-testid="submit"` for the submit button
- `data-testid="filterBtnAll"` **etc** for the filter buttons
❗ Make sure all readable texts match those of the prototype

## 📝 Notes on the tests

❗ The 

## FAQ

<details>
  <summary>I feel very stuck. What can I do?</summary>

Do not struggle for an unreasonable amount of time! Request support via one of the available channels.

</details>

<details>
  <summary>How do I run tests against my code?</summary>

Run `npm test`. Note that Codegrade will run your code against its own copy the `codegrade.test.js` test file so there is no point in manipulating the tests.

</details>

<details>
  <summary>I believe my code is correct and the test is wrong. What can I do?</summary>

On occasion the test runner will get stuck. Use CTRL-C to kill the tests, and then `npm test` to launch them again. Try to replicate the problem the test is warning about by interacting with the site in Chrome, and do not code "to make the test happy". Code so that **your app does exactly what the mock site does**. The tests are there for confirmation. Although it's possible that a particular test be flawed, it's more likely that the bug is in your own code. If the problem persists, please request assistance from staff.

</details>

<details>
  <summary>The terminal output of the tests is just too overwhelming! What can I do?</summary>

If you need to disable all tests except the one you are focusing on, edit the test file and, as an example, change `test('👉 focus on this', () => { etc })` to be `test.only('👉 focus on this', () => { etc })`. (Note the "only".) This won't affect Codegrade, because Codegrade runs its own version of the tests. Keep in mind though, if there is a syntax problem with your code that is causing an error to be thrown, all tests will fail.

</details>

<details>
  <summary>I am getting errors when I run npm install. What is going on?</summary>

This project requires Node to be correctly installed on your computer to work. Try deleting the `node_modules` folder and running `npm install`. If that fails, try deleting both `node_modules` and `package-lock.json` before reinstalling. If all fails, please request support!

</details>

<details>
  <summary>Do I need to install extra libraries with NPM?</summary>

No. Everything you need should be installed already.

</details>

<details>
  <summary>Can I edit the styles?</summary>

Of course! Have at it. But solve the challenge first, and then be careful not to break any tests!

</details>

<details>
  <summary>My page does not work! How do I debug it?</summary>

With React, it's very important that we use React Devtools and Redux Devtools to monitor the state of our components as we interact with the App. If the state is not adjusting like it should, that's one situation. If the state does change correctly but the UI does not respond, that's a different problem.

If your code has a syntax problem, the app will print error messages in the console. Focus on the first message. Place console logs right before the crash site and see if your variables contain the data you think they do. Comment out chunks of code until you get the app to compile!

</details>

<details>
  <summary>I messed up and want to start over! How do I do that?</summary>

**Do NOT delete your repository from GitHub!** Instead, commit frequently as you work. Make a commit whenever you achieve anything and the app isn't crashing in Chrome. This in practice creates restore points you can use should you wreak havoc with your app. If you find yourself in a mess, use git reset --hard to simply discard all changes to your code since your last commit.

</details>

## Staff Only

- Solution repo using Redux Toolkit and RTK Query [HERE](https://github.com/bloominstituteoftechnology/W_S10_Challenge_End)
- Solution repo using Redux and Redux Thunk [HERE](https://github.com/bloominstituteoftechnology/W_S10_Challenge_End_Old_Syntax)
