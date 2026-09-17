export function createNotes(notesButton) {
    if (notesButton.classList.contains('notes-active'))
        notesButton.classList.remove('notes-active');
    else
        notesButton.classList.add('notes-active');
}