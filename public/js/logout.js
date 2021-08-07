// allows a user to end their session
const logout = async () => {
  const res = await fetch('/logout', {
    method: 'POST',
    headers: {'Content-Type': 'application'},
  });

  if(res.ok){
    document.location.replace('/');
  } else {
    alert(res.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);