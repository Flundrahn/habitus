# TODO

## MVP
Next step, display the habits in table, for this want to be able to click on the entry.
For this might want different cells for entry and data, since entry will include a onClick.

This mean it will be datacell(title), entrycell[], datacell(score), datacell(goal), datacell(description)

1. Week Component v1
1. Edit Component v1
1. Create new Habit button
2. Delete Habit button
3. Update Habit
4. Week, each day with done and unfinished habits
    - View of weekly result
5.  Mobile first, managing habits need be mobile
6. Show current score for each habit
7.  Stoic quotes GET random

## Done
8. Finish the table component
0. Convert repos to all implement their own methods, which also converts to and from DTO
1. Create entries that contains adds empty entries for non-existing days and boolean
2. Convert responses to use DTO
3.  Create endpoints
  - [x] Habit: GetAll / GetOne / Delete / Create / Update
  - [x] Entry: Delete / Create
  - [x] Habit: Get all include filtered entries, by date
4.  Db, sqlite should be fine
5. Design backend with this functionality in mind.
1. Todays Component v1
  1. List habits --> each one has list of entries ids
  2. View result in column graph
  3. Create entry by crossing over day
1. Take at least one typescript tutorial
1. make a sketch of front end with functionality
1. Take at least one tailwind css tutorial
1. Finish 'Web API 6 Best Practices' course
1. Take at least one next.js tutorial

# Want to do
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

# Web API ideas

# Front end ideas
4. Navigate through weeks