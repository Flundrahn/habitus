# habitus

Ongoing project to create a habit builder app.

## Getting Started

1. Clone the repo
2. Setup GOOGLE_APPLICATION_CREDENTIALS in environment (Windows)

   - login to firebase console
   - go to project settings
   - go to service accounts
   - generate new private key, this will download a json file with credentials, see Environment Variables section below

3. In habitus.ui run `yarn install`
4. If using VS Code, in root directory run task `Run`, this will start both client and server.

### Environment Variables

The Google Application Credentials required to connect to Firebase are stored as json. The app attempts to retrieve them from an environment variable named `GOOGLE_APPLICATION_CREDENTIALS`. This variable can be either an absolute path to the json file or the json itself.

- If the variable is a path pointing to json, no change is needed after downloading from Firebase Console
- If using a Windows Environment Variable to store the json value directly, the whole object should be on a single line surrounded by double quotes while all quotes inside json should be single.

  ```
  "{'type': 'service_account','project_id': 'habitus-xxxxx', ... }"
  ```

  Beware issues with maximum variable length, validate that the full json is saved.

- If using Azure Application Settings as environment variable, all quotes inside json should be single

  ```
  {'type': 'service_account','project_id': 'habitus-xxxxx', ... }
  ```
