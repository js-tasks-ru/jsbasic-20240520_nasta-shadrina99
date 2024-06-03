function showSalary(users, age) {
  let result = [];
  const filteredUsers = users.filter(user => user.age <= age);
  filteredUsers.map((user, userIndex, usersArr) => {
    result.push(`${user.name}, ${user.balance}`);
    if (userIndex !== usersArr.length - 1) {
      result.push('\n');
    }
  });
  return result.join('');
}