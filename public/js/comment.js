async function commentFormHandler(event) {
    const comment_content = document.querySelector('textarea[name="comment-bod"]').value.trim();
    const forum_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (comment_content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                album_id,
                comment_content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);