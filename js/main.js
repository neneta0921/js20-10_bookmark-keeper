const websiteNameEl = document.querySelector('#website-name');

const validate = new Validate();
const bookmark = new Bookmark(websiteNameEl, validate.validate);
const modal = new Modal(websiteNameEl);

// On Load, check Local Storage and Fetch Bookmarks
bookmark.fetchBookmarks();

const closeIcons = document.querySelectorAll('.delete-bookmark');

// Delete Bookmark
function deleteBookmark() {
  // Loop through the bookmarks array
  if (bookmarks[this.id]) {
    delete bookmarks[this.id];
  }
  // // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  bookmark.fetchBookmarks();
}

closeIcons.forEach((closeIcon) => {
  const id = closeIcon.getAttribute('id');
  closeIcon.addEventListener('click', { id: id, handleEvent: deleteBookmark });
});
