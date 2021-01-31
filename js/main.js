document.addEventListener('DOMContentLoaded', () => {
  const main = new Main();

  const fetchBookmarks = main.bookmark.fetchBookmarks.bind(this);
  const closeIcons = document.querySelectorAll('.delete-bookmark');
  closeIcons.forEach((closeIcon) => {
    const id = closeIcon.getAttribute('id');
    closeIcon.addEventListener('click', {
      id: id,
      fetchBookmarks: fetchBookmarks,
      handleEvent: main.deleteBookmark,
    });
  });
});

class Main {
  constructor() {
    this._init();
  }

  _init() {
    const websiteNameEl = document.querySelector('#website-name');
    this.validate = new Validate();
    this.bookmark = new Bookmark(websiteNameEl, this.validate.validate);
    this.modal = new Modal(websiteNameEl);
    // On Load, check Local Storage and Fetch Bookmarks
    this.bookmark.fetchBookmarks();
  }

  // Delete Bookmark
  deleteBookmark() {
    // Loop through the bookmarks array
    if (bookmarks[this.id]) {
      delete bookmarks[this.id];
    }
    // // Update bookmarks array in localStorage, re-populate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    this.fetchBookmarks();
  }
}
