class Modal {
  constructor(websiteNameEl) {
    this.websiteNameEl = websiteNameEl;
    this.modal = document.getElementById('modal');
    this._init();
  }

  _init() {
    this._addEvent();
  }

  // Show Modal, Focus on Input
  _showModal() {
    this.modal.classList.add('show-modal');
    this.websiteNameEl.focus();
  }

  // Close Modal
  _closeModal() {
    this.modal.classList.remove('show-modal');
  }

  _addEvent() {
    const modalShow = document.getElementById('show-modal');
    const modalClose = document.getElementById('close-modal');

    // Modal Event Listener
    modalShow.addEventListener('click', () => this._showModal());
    modalClose.addEventListener('click', () => this._closeModal());
    window.addEventListener('click', (e) => (e.target === this.modal ? this._closeModal() : false));
  }
}
