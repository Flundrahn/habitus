# 12/10
Today starting on building a generic repository. The pattern seems to be
create an interace for base repo, implement in a generic baserepo with methods for findAll, findByCondition, Update, Delete, and Create. Then create a specific repo for each entity that inherits from the generic repo. This way you can have a generic repo that can be used for any entity.

