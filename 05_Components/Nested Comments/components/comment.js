// Create a DOM node for a single comment (and its replies)
export function createCommentNode(comment, handlers, useVirtualization = false) {
  const { handleReply, handleEdit, handleDelete, handleVote } = handlers;

  const container = document.createElement('li');
  container.className = 'comment';
  container.setAttribute('role', 'listitem');

  // === Comment Text & Voting ===
  const content = document.createElement('div');
  content.className = 'comment-content';

  const textSpan = document.createElement('span');
  textSpan.textContent = comment.text;

  const voteWrapper = document.createElement('div');
  voteWrapper.className = 'vote-controls';

  const upvoteBtn = createActionButton('👍', () => handleVote(comment.id, +1), 'Upvote');
  const scoreText = document.createElement('span');
  scoreText.textContent = comment.votes;
  scoreText.style.margin = '0 5px';
  const downvoteBtn = createActionButton('👎', () => handleVote(comment.id, -1), 'Downvote');

  voteWrapper.append(upvoteBtn, scoreText, downvoteBtn);
  content.append(textSpan, voteWrapper);

  // === Action Buttons: Reply / Edit / Delete ===
  const actions = document.createElement('div');
  actions.className = 'actions';

  const replyBtn = createActionButton('Reply', () => {
    if (!container.querySelector('.reply-form')) {
      const form = createReplyForm(comment.id, handleReply);
      container.appendChild(form);
      form.querySelector('input').focus();
    }
  }, 'Reply to this comment');

  const editBtn = createActionButton('Edit', () => {
    if (!container.querySelector('.edit-form')) {
      const form = createEditForm(comment.id, comment.text, handleEdit, content);
      container.replaceChild(form, content);
      form.querySelector('input').focus();
    }
  }, 'Edit this comment');

  const deleteBtn = createActionButton('Delete', () => {
    if (confirm('Delete this comment?')) handleDelete(comment.id);
  }, 'Delete this comment');

  actions.append(replyBtn, editBtn, deleteBtn);
  container.append(content, actions);

  // === Virtualized Rendering of Replies ===
  if (comment.replies?.length) {
    if (!useVirtualization) {
      const replies = document.createElement('ul');
      replies.className = 'replies';
      replies.setAttribute('role', 'list');

      comment.replies.forEach(reply => {
        replies.appendChild(createCommentNode(reply, handlers, useVirtualization));
      });

      container.appendChild(replies);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'lazy-replies';
      placeholder.textContent = 'Loading replies...';
      container.appendChild(placeholder);

      const observer = new IntersectionObserver(([entry], obs) => {
        if (entry.isIntersecting) {
          const replies = document.createElement('ul');
          replies.className = 'replies';
          replies.setAttribute('role', 'list');

          comment.replies.forEach(reply => {
            replies.appendChild(createCommentNode(reply, handlers, useVirtualization));
          });

          container.replaceChild(replies, placeholder);
          obs.disconnect();
        }
      }, { rootMargin: '100px' });

      observer.observe(placeholder);
    }
  }

  return container;
}

// Create a button with click handler and ARIA label
function createActionButton(label, onClick, ariaLabel) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.setAttribute('aria-label', ariaLabel);
  btn.addEventListener('click', onClick);
  return btn;
}

// Inline reply form
function createReplyForm(parentId, handleReply) {
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

// Inline edit form
function createEditForm(id, currentText, handleEdit, originalContent) {
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
