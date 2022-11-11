# TODO

## MVP

1. Add logout button and turn off auto-login
1. Rewrite backend to have unique data per user
1. Mobile first UX, managing habits need be mobile
1. Style depending on achieved goal or not,
1. Add authorization, user & admin
1. Fix margin of barchart so text visible, fix so columns draw ontop of each other if possible
1. Fix optimistic update of entries
1. Fix bug toast message popping up on first render

## Done

1. Update frontend api requests to use user data,
1. Add authentication back end
1. Add authentication front end
   - Add auth context
   - Add firebase ui & login page
1. Add toast message on update habit
1. Show graph
1. Stoic quotes GET random
1. Show current score for each habit
1. Update Habit
1. Delete Habit button
1. Edit Component v1
1. Convert to formik and yup.
1. Week, each day with done and unfinished habits
   - View of weekly result
1. Create new Habit button
1. Week Component v1
1. Finish the table component
1. Convert repos to all implement their own methods, which also converts to and from DTO
1. Create entries that contains adds empty entries for non-existing days and boolean
1. Convert responses to use DTO
1. Create endpoints
   - [x] Habit: GetAll / GetOne / Delete / Create / Update
   - [x] Entry: Delete / Create
   - [x] Habit: Get all include filtered entries, by date
1. Db, sqlite should be fine
1. Design backend with this functionality in mind.
1. Todays Component v1
1. List habits --> each one has list of entries ids
1. View result in column graph
1. Create entry by crossing over day
1. Take at least one typescript tutorial
1. make a sketch of front end with functionality
1. Take at least one tailwind css tutorial
1. Finish 'Web API 6 Best Practices' course
1. Take at least one next.js tutorial

# Want to do

- Add user managemenent, ability to delete or edit account from frontend through backend (as practice).
- Type of habit that can take number input, like number of alcoholic drinks per day, meaning would also need to set if goal is above or below.
- Type of habits with clock, such as time to get in bed, is it possible unifying this with the number input? No, should be distinct
- Graph for clock habits
- Add button to close form / close on submit, what about the edit page?
- create datacontext so I can access the habits state anywhere, and make optimistic change of current entry
- all time view
- authentication
- endpoint to post & delete quotes
- make API async, leave sync for now and follow guide
- go through access modifiers and set to lowest possible
- IDEA Redesign repository, put all CRUD methods in class corresponding to current RepositoryManager.
  - That way can use methods from both habitrepo and entryrepo in one place
  - Can give it the save method, do multiple queries only one save
  - Let RepositoryManager handle dto mapping
  - Naming of methods "CreateHabit" will make more sense, as is now I can't use name Create because it belongs to RepositoryBase
  - Allthough, is there a way I can go back to calling base class methods right away? Naaah this is better, handle the logic and problems better without throwing exceptions.

## Want to do Formik

- Disable the submit button while the user has attempted to submit (hint: formik.isSubmitting)
- Add a reset button with formik.handleReset or <button type="reset">.
- Pre-populate initialValues based on URL query string or props passed to <SignupForm>.
- Change the input border color to red when a field has an error and isn’t focused
- Add a shake animation to each field when it displays an error and has been visited
- Persist form state to the browser’s sessionStorage so that form progress is kept in between page refreshes

## To run fullstack project

Setup command that starts both frontend and backend

- https://ss64.com/nt/start.html
- https://stackoverflow.com/a/36275359
- https://stackoverflow.com/a/35455532

# Web API ideas

# Front end ideas

2. Navigate through weeks
