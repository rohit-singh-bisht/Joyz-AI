var common = {
  openLeadForm: () => {
    const modal = document.getElementById("tryout_modal");
    modal.style.display = "flex";
  },

  closeLeadForm: () => {
    const modal = document.getElementById("tryout_modal");
    modal.style.display = "none";
  },

  load: () => {
    const modal = document.getElementById("tryout_modal");
    const closeFormModal = document.getElementById("close-modal");
    const openleadformBtns = document.querySelectorAll(".opentryoutform");
    if (closeFormModal) {
      closeFormModal.addEventListener("click", common.closeLeadForm);
    }

    if (openleadformBtns?.length) {
      openleadformBtns.forEach((btn) => {
        btn.addEventListener("click", common.openLeadForm);
      });
    }

    if (modal) {
      modal.style.display = "none";
    }
  },
};

common.load();
