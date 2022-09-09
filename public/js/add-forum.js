async function newForumHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="forum-title]').value;
    const forum_content = document.querySelector('input[name="forum-content"]').value;

    const response = await fetch(`/api/forums`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            forum_content,
            date_created
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (response.ok) {
        console.log(forum_content);

        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newForumHandler);