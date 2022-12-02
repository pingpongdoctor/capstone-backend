module.exports = [
  {
    id: 1,
    recipes_id: 2,
    users_id: 1,
    comment: "this is the comment of user 1 for recipe 2",
  },
  {
    id: 2,
    recipes_id: 3,
    users_id: 2,
    comment: "this is the comment of user 2 for recipe 3",
  },
  {
    id: 3,
    recipes_id: 3,
    users_id: 1, //comapare with user_id in the recipes table to allow the user delete the comments
    comment: "this is the comment of user 1 for recipe 3",
  },
];
