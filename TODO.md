# Doing

## TODO

- fix HabitForm sizing, can't read fields on small screens
- add delete date property to entities
- add table for quotes instead if json
- add method to restore deleted habits
- add method to permanently delete habits

## TODO Frontend styling

- Move login to vertical middle
- Move Today / Week / Edit panel down so won't jump because of quote element
- Make UI responsive, possibly use grid for sizes of columns, description should be scrollable, hide scrollbar if possible
- Make Today / Week / Edit panel have rows surrounded with div that has no overflow
- Fix headers of Edit page

# Want to do

- Fix margin of barchart so text visible, fix so columns draw ontop of each other if possible (already fixed?)
- Use color of habit in graph
- add staggered entry animation to table
- dark mode
- Add user managemenent, ability to delete or edit account from frontend through backend (as practice).
- Type of habit that can take number input, like number of alcoholic drinks per day, meaning would also need to set if goal is above or below.
- Type of habits with clock, such as time to get in bed, is it possible unifying this with the number input? No, should be distinct
- Graph for clock habits
- Add button to close form / close on submit, what about the edit page?
- all time view
- endpoint to post & delete quotes
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
- Change the input border color to red when a field has an error and isn’t focused
- Add a shake animation to each field when it displays an error and has been visited
- Persist form state to the browser’s sessionStorage so that form progress is kept in between page refreshes

## To run fullstack project

Setup command that starts both frontend and backend

- https://ss64.com/nt/start.html
- https://stackoverflow.com/a/36275359
- https://stackoverflow.com/a/35455532

### For VS Code

- https://code.visualstudio.com/Docs/editor/tasks (compound tasks)
- SOLUTION create separate tasks and use dependsOn

# Web API ideas

# Front end ideas

1. Navigate through weeks

shadow

```
shadow-[0.5px_0_0_0_#BFDBFE,0_1px_0_0_#BFDBFE,1px_1px_0_0_#BFDBFE,1px_0_0_0_#BFDBFE_inset,0_1px_0_0_#BFDBFE_inset]
```

## Done

1. [x] Medium size ux
2. [x] Desktop size ux
3. Mobile first UX, managing habits need be mobile
   [x] Choose font
   [x] Fix header / navbar, make name + login an icon that expands?
   [x] Fix table,
   [x] Fix form
   [x] Fix chart
4. create datacontext so I can access the habits state anywhere, and make optimistic change of current entry (NOTE useHabitusAPI serves this function)
5. refactor useHabitusApi to dry, possibly similar to chuck-quotes
6. Fix bug toast message popping up on first render
7. Add authorization
8. Rewrite backend to fetch data for correct user
9. Fix optimistic update of entries, same as useCounter in chuck-quotes
10. Add logout button and turn off auto-login
11. Update frontend api requests to use user data,
12. Add authentication back end
13. Add authentication front end

- Add auth context
- Add firebase ui & login page

1.  Add toast message on update habit
2.  Show graph
3.  Stoic quotes GET random
4.  Show current score for each habit
5.  Update Habit
6.  Delete Habit button
7.  Edit Component v1
8.  Convert to formik and yup.
9.  Week, each day with done and unfinished habits

- View of weekly result

1.  Create new Habit button
2.  Week Component v1
3.  Finish the table component
4.  Convert repos to all implement their own methods, which also converts to and from DTO
5.  Create entries that contains adds empty entries for non-existing days and boolean
6.  Convert responses to use DTO
7.  Create endpoints

- [x] Habit: GetAll / GetOne / Delete / Create / Update
- [x] Entry: Delete / Create
- [x] Habit: Get all include filtered entries, by date

1.  Db, sqlite should be fine
2.  Design backend with this functionality in mind.
3.  Todays Component v1
4.  List habits --> each one has list of entries ids
5.  View result in column graph
6.  Create entry by crossing over day
7.  Take at least one typescript tutorial
8.  make a sketch of front end with functionality
9.  Take at least one tailwind css tutorial
10. Finish 'Web API 6 Best Practices' course
11. Take at least one next.js tutorial
12. make API async, leave sync for now and follow guide

- Fix sizing of HabitsTable
  - date labels should have day of week on top and number on bottom
  - if small screen date should be only initial of day
  - if larger screen day can be three letters
  - if larger screen date number can have suffix (st, nd, rd, th)
