// facilitates the creation of a comment on a post by a logged-in user
const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_body = document.querySelector('#comment-body').value.trim();
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  
  if(comment_body){
    const res = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_body}),
      headers: {'Content-Type': 'application/json'}
    });

    if(res.ok){
      document.location.reload();
    } else {
      alert('failed to comment content');
    }
  }
};

document.querySelector('#new-comment-form').addEventListener('submit', newCommentHandler);