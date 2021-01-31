const websiteNameEl = document.querySelector('#website-name');
const validate = new Validate();
const bookmark = new Bookmark(websiteNameEl);
const modal = new Modal(websiteNameEl);

// On Load, check Local Storage and Fetch Bookmarks
bookmark.fetchBookmarks();

const deleteBookmark = (id) => {
  //  Loop through the bookmarks array
  if (bookmarks[id]) {
    delete bookmarks[id];
  }
  // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  bookmark.fetchBookmarks();
};
