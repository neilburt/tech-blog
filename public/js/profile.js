// facilitates the creation of a new post by a logged-in user
const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const post_body = document.querySelector('#post-body').value.trim();

  if(title && post_body){
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({title, post_body}),
      headers: {'Content-Type': 'application/json'}
    });

    if(response.ok){
      document.location.replace('/profile');
    }else{
      alert('failed to post content');
    }
  }
};

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

// facilitates the deletion of a post
const deleteBtnHandler = async (event) => {
  if(event.target.hasAttribute('data-id')){
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });

    if(response.ok){
      document.location.replace('/profile');
    }else{
      alert('failed to delete post');
    }
  }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);

document.querySelector('#post-list').addEventListener('click', deleteBtnHandler);

document.querySelector('#new-comment-form').addEventListener('submit', newCommentHandler);