`Login Credentials:`
email: gsynergy@example.com
password: Test@123

`Extra Features implemented `

1. Authentication with email and password.
2. CI/CD pipeline on github.
3. logging of errors and warnings.

In this web app i have created 4 screens

1. Store
2. SKU
3. Planning
4. Chart

As per the Information given in the pdf shared the 4 screen serve different purposes

Store: To manage store data and all the modification in that data like adding removing
updating, and reordering the store.

SKU: To manage SKU data and all the modification adding, removing, and updating
SKUs and their Prices and Costs.

Planning: Contains Ag Grid for cross join of stores and SKU based on each week, with all the criteria's fulfilled

Chart: Chart for showing GM Dollars and weeks . All the calculation parameters are matched and consideredfor displaying charts.

Technical specification

1. Page routing with `react router dom` with route restriction so only auth users can see the inner routes.
2. State Management `Redux used` as state management for auth and all the other data as well
   for auth we have also encrypted the user details and stored it in localstorage.
3. I have put in some sample data so that we can see the UI.
4. The code modular and I have structured the code so that components, pages, and redux file are in seperate folders

5. Repo has all our code in the src/ folder with nodemodules outside it and a gitnore file is present to ingore data that is not to be pushed. And our whole application starts with index.jsx

6. The Routes are created in routes/GsynergyRoutes.tsx
