# TODO
- Week Component v1
- Edit Component v1

# MVP
Next step, display the habits in table, for this want to be able to click on the entry.
For this might want different cells for entry and data, since entry will include a onClick.

This mean it will be datacell(title), entrycell[], datacell(score), datacell(goal), datacell(description)

1. Create new Habit POST
2. Delete Habit
3. Update Habit
4. Week, each day with done and unfinished habits
    - View of weekly result
5.  Mobile first, managing habits need be mobile
6. Show current score for each habit
7.  Stoic quotes GET random

# Done
1. Create entries that contains adds empty entries for non-existing days and boolean
2. Convert responses to use DTO
3.  Create endpoints
   1. [x] Habit: GetAll / GetOne / Delete / Create / Update
   2. [x] Entry: Delete / Create
   3. [x] Habit: Get all include filtered entries, by date
4.  Db, sqlite should be fine
5. Design backend with this functionality in mind.
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
 - Convert repos to all implement their own methods, which also converts to and from DTO
 - all time view
 - habits with clock, such as time to get in bed
 - graph for clock habits
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

# Front end
1. Daily component
2. Habit component (done or not done for day)
3. Week component
4. Navigate through weeks
5. Add button for new habit
6. Form for new habit
7. Edit and delete button for habit