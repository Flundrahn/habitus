# TODO

## MVP

1. Mobile first UX, managing habits need be mobile
2. Style depending on achieved goal or not

## Done

1.  Show graph
2.  Stoic quotes GET random
3.  Show current score for each habit
4.  Update Habit
5.  Delete Habit button
6.  Edit Component v1
7.  Convert to formik and yup.
8.  Week, each day with done and unfinished habits
    - View of weekly result
9.  Create new Habit button
10. Week Component v1
11. Finish the table component
12. Convert repos to all implement their own methods, which also converts to and from DTO
13. Create entries that contains adds empty entries for non-existing days and boolean
14. Convert responses to use DTO
15. Create endpoints

- [x] Habit: GetAll / GetOne / Delete / Create / Update
- [x] Entry: Delete / Create
- [x] Habit: Get all include filtered entries, by date

15. Db, sqlite should be fine
16. Design backend with this functionality in mind.
17. Todays Component v1
18. List habits --> each one has list of entries ids
19. View result in column graph
20. Create entry by crossing over day
21. Take at least one typescript tutorial
22. make a sketch of front end with functionality
23. Take at least one tailwind css tutorial
24. Finish 'Web API 6 Best Practices' course
25. Take at least one next.js tutorial

# Want to do

- Type of habit that can take number input, like alcoholic drinks
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

1. Can make startDate and endDate availabel through context, then can make copies of useHabitusApi wherever like

- Difference will be don't pass down different methods,
- but instead will subscribe through context, get dates, create instance of usehabitusapi
- destructure the methods necessary
- definitely unclear if it will actually be better

2. Navigate through weeks
