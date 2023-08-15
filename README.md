# Scratchpay API Tests

This project contains automated API tests for the Scratchpay application using [Cypress](https://www.cypress.io/).

### Prerequisites

Before running the tests, ensure that you have the following software installed:

- Node.js
- Cypress

### Getting Started

1. Clone the repository:

   ```
   git clone <repository_url>
   ```

2. Install the dependencies:

   ```
   cd <project_directory>
   npm install
   ```

3. Set up Environment Variables:

   Provide the `.env` JSON in `cypress.config.js` file and add the necessary environment variables required for the tests. The following variables should be defined:

   - `API_USER_EMAIL`: Email of the authorized user for API authentication.
   - `API_USER_PASSWORD`: Password of the authorized user for API authentication.
   - `USER_AGENT`: User agent string to be used in the request headers.

4. Running the Tests:

   To run the API tests, use the following command:

   ```
   npm test
   ```

   The tests will execute and display the test results in the command line.

## Project Structure

The project follows the following structure:

```
├── cypress
│   ├── e2e
│   |    ├── integration
│   │    |    └── scratchpay_api.spec.js
├── .gitignore
├── cypress.json
├── package-lock.json
└── package.json
```

- `cypress/e2e/integration`: Contains the test scripts organized by test suites.
- `.gitignore`: Specifies intentionally untracked files to be ignored by Git.
- `cypress.json`: Cypress configuration file.
- `package-lock.json` and `package.json`: Node.js dependencies and scripts.

## Test Cases

The project includes the following test cases:

1. **Scenario 1: Prevent user (without permission) from getting the list of email addresses**:
   - Verifies that a user without permission cannot access the list of email addresses for a specific practice ID.
   - Expected result: Response status code 400 and appropriate error message.

2. **Scenario 2: Search for clinics with the word "veterinary" in their name**:
   - Searches for clinics with the term "veterinary" in their name.
   - Expected result: Response status code 200 and a non-empty list of clinics.

3. **Scenario 3: Search term is not given**:
   - Tests the case where the search term is not provided.
   - Expected result: Response status code 422 and an error message indicating the missing parameter.

4. **Scenario 4: Prevent user (Unauthorized) from getting the list of email addresses**:
   - Verifies that an unauthorized user cannot access the list of email addresses for a specific practice ID.
   - Expected result: Response status code 401 and appropriate error message.

5. **Scenario 5: Prevent user (Unauthorized) from getting the list clinics with the word "veterinary" in their name**:
   - Tests the case where an unauthorized user tries to search for clinics with the

 term "veterinary" in their name.
   - Expected result: Response status code 401 and appropriate error message.

Happy testing!