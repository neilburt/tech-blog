// facilitates the creation of a comment on a post by a logged-in user
const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_body = document.querySelector('#comment-body').value.trim();

  if(comment_body){
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({comment_body}),
      headers: {'Content-Type': 'application/json'}
    });

    if(response.ok){
      document.location.replace('/homepage');
    }else{
      alert('failed to comment content');
    }
  }
};

document.querySelector('#new-comment-form').addEventListener('submit', newCommentHandler);