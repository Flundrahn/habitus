# TODO
- Take at least one typescript tutorial
- make a sketch of front end with functionality
- design backend with this functionality in mind.

# Done
- Take at least one tailwind css tutorial
- Finish 'Web API 6 Best Practices' course
- Take at least one next.js tutorial

# Web API Design Planning
Model

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

# MVP
0. Create Today page (Home)
1. Create new Habit POST
2. List habits --> each one has list of entries ids
3. View result in column graph
4. Delete Habit
5. Update Habit
6. Create entry by crossing over day
7. View week, each day with done and unfinished habits
8. View today / week
9. View of weekly result
10. Mobile first, managing habits need be mobile
11. Stoic quotes GET random
12. Db, sqlite should be fine
    
# Want to do
 - all time view
 - habits with clock, such as time to get in bed
 - graph for clock habits
 - authentication
 - endpoint to post & delete quotes

# Front end
1. Daily component
2. Habit component (done or not done for day)
3. Week component
4. Navigate through weeks
5. Add button for new habit
6. Form for new habit
7. Edit and delete button for habit