import { initialComments } from './data/comments.js';
import { createCommentNode } from './components/comment.js';
import { findAndUpdate, deleteById, getTotalComments } from './utils/commentUtils.js';

// Clone original data
let comments = structuredClone(initialComments);
const commentsSection = document.getElementById('comments-section');

// All handler functions passed into each comment node
const handlers = {
  handleReply: (id, text) => {
    const reply = { id: crypto.randomUUID(), text, votes: 0, replies: [] };
    findAndUpdate(comments, id, c => c.replies.push(reply));
    renderComments();
  },
  handleEdit: (id, newText) => {
    findAndUpdate(comments, id, c => (c.text = newText));
    renderComments();
  },
  handleDelete: (id) => {
    comments = deleteById(comments, id);
    renderComments();
  },
  handleVote: (id, delta) => {
    findAndUpdate(comments, id, c => (c.votes += delta));
    renderComments();
  }
};

// Render all top-level comments
function renderComments() {
  commentsSection.innerHTML = '';
  const useVirtualization = getTotalComments(comments) > 100; // Enable virtualization only if large

  comments.forEach(comment => {
    const node = createCommentNode(comment, handlers, useVirtualization);
    commentsSection.appendChild(node);
  });
}

// Add new top-level comment
document.getElementById('add-comment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('new-comment');
  const text = input.value.trim();
  if (!text) return;
  comments.push({ id: crypto.randomUUID(), text, votes: 0, replies: [] });
  input.value = '';
  renderComments();
});

renderComments();
