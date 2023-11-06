const transformUsersForSelect = (users) => {
  let transformUsers = [];

  users?.forEach((user) => {
    transformUsers?.push({
      _id: user._id,
      name: `${user.name.lastName} ${user.name.firstName}`,
    });
  });

  return transformUsers;
};

export default transformUsersForSelect;
