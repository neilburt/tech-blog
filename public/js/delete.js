// facilitates the deletion of a post
const deleteBtnHandler = async (event) => {
  if(event.target.hasAttribute('data-id')){
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });

    if(response.ok){
      document.location.replace('/dashboard');
    }else{
      alert('failed to delete post');
    }
  }
};

document.querySelector('#post-list').addEventListener('click', deleteBtnHandler);