async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="forum-title"]').value;
    const forum_content = document.querySelector('input[name="forum-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/forums/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            forum_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        console.log(title);
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);