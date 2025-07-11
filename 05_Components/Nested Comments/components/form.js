export function createReplyForm(parentId, handleReply) {
  const formWrapper = document.createElement('div');
  formWrapper.className = 'reply-form';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Write your reply...';
  input.required = true;

  const submit = document.createElement('button');
  submit.textContent = 'Submit';
  submit.type = 'button';

  const cancel = document.createElement('button');
  cancel.textContent = 'Cancel';
  cancel.type = 'button';

  submit.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) handleReply(parentId, text);
  });

  cancel.addEventListener('click', () => {
    formWrapper.remove();
  });

  formWrapper.append(input, submit, cancel);
  return formWrapper;
}





export function createEditForm(id, currentText, handleEdit, originalContent) {
  const formWrapper = document.createElement('div');
  formWrapper.className = 'edit-form comment-content';

  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.required = true;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.type = 'button';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.type = 'button';

  saveBtn.addEventListener('click', () => {
    const updated = input.value.trim();
    if (updated) handleEdit(id, updated);
  });

  cancelBtn.addEventListener('click', () => {
    originalContent.parentElement.replaceChild(originalContent, formWrapper);
  });

  formWrapper.append(input, saveBtn, cancelBtn);
  return formWrapper;
}