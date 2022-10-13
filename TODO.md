# TODO
- Week Component v1
- Edit Component v1

# MVP
1. Create new Habit POST
3. Delete Habit
4. Update Habit
5. Week, each day with done and unfinished habits
    - View of weekly result
6.  Mobile first, managing habits need be mobile
7.  Stoic quotes GET random
9.  Db, sqlite should be fine

NOTE Should I start backend before continuing with Week and Edit component
Edit will be a form to edit existing habits.
First do add habit, then edit habit, then delete habit, then week component.

# Done
1.  Create endpoints
   1. [x] Habit: GetAll / GetOne / Delete / Create / Update
   2. [x] Entry: Delete / Create
   3. [x] Habit: Get all include filtered entries, by date
1. Design backend with this functionality in mind.
- Todays Component v1
  1. List habits --> each one has list of entries ids
  2. View result in column graph
  3. Create entry by crossing over day
- Take at least one typescript tutorial
- make a sketch of front end with functionality
- Take at least one tailwind css tutorial
- Finish 'Web API 6 Best Practices' course
- Take at least one next.js tutorial

# Web API Design Planning
Model --> DTO focused on views

For Todays Component need list of habits with entries filtered by date == today.

Habit (possible use struct or record?)
- int Id
- string Title
- int Goal per week
- string Note
- string Color length 6 or 7 if include #
- Entries ICollection 

Entry (possible use struct or record?
- int Id
- datetime Date
- HabitId

Create new habit through form, post to API
get habits for specific week

get entries for week

Want to return a list of habits with entries filtered by date

# Want to do
 - all time view
 - habits with clock, such as time to get in bed
 - graph for clock habits
 - authentication
 - endpoint to post & delete quotes
 - make API async, leave sync for now and follow guide
 - go through access modifiers and set to lowest possible

# Front end
1. Daily component
2. Habit component (done or not done for day)
3. Week component
4. Navigate through weeks
5. Add button for new habit
6. Form for new habit
7. Edit and delete button for habit