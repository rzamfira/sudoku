export function removeHighlight(cell){
        cell.classList.remove('highlight-neighbors');
        cell.classList.remove('highlight-value');
        cell.classList.remove('selected-cell');
}