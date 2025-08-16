document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const id = event.target.getAttribute('data-id');
        try {
            const response = await fetch(`/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                event.target.parentElement.remove();
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});