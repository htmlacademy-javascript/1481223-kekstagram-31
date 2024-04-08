import {onEscapeEditFormClose} from './edit-form.js';
const editFormAlertOpen = new Event('editFormAlertOpen');
const editFormAlertClose = new Event('editFormAlertClose');
document.addEventListener('editFormAlertOpen', () => {
  document.removeEventListener('keydown', onEscapeEditFormClose);
});
document.addEventListener('editFormAlertClose', () => {
  document.addEventListener('keydown', onEscapeEditFormClose);
});

export {editFormAlertOpen, editFormAlertClose};
