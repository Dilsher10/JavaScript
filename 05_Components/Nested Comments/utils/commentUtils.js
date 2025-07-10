// Recursively finds a comment by ID and applies a mutation via callback
export function findAndUpdate(list, id, callback) {
    for (let comment of list) {
        if (comment.id === id) {
            callback(comment);
            return true;
        }
        if (findAndUpdate(comment.replies, id, callback)) return true;
    }
    return false;
}

// Recursively deletes a comment by ID from nested structure
export function deleteById(list, id) {
    return list
        .map(c => ({
            ...c,
            replies: deleteById(c.replies, id)
        }))
        .filter(c => c.id !== id);
}

// Recursively counts total comments (for virtualization threshold)
export function getTotalComments(list) {
    return list.reduce((sum, c) => {
        return sum + 1 + getTotalComments(c.replies || []);
    }, 0);
}
