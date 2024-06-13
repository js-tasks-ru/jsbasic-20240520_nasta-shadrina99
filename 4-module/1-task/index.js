function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  document.body.append(ul);

  friends.map(item => {
    const li = document.createElement('li');
    li.textContent = item.firstName + ' ' + item.lastName;
    ul.append(li);
  });
  
  return ul;
}
