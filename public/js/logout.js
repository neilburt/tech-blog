// allows a user to end their session
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: {'Content-Type': 'application'},
  });

  if(response.ok){
    document.location.replace('/');
  }else{
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);