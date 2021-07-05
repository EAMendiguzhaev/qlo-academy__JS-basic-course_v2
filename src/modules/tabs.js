const tabs = () => {
  const tabHeadear = document.querySelector('.service-header');
  const tab = tabHeadear.querySelectorAll('.service-header-tab');
  const tabContent = document.querySelectorAll('.service-tab');
  const toggleTabContent = (index) => {
    for (let i = 0; i < tabContent.length; i++) {
      if (index === i) {
        tab[i].classList.add('active');
        tabContent[i].classList.remove('d-none');
      } else {
        tab[i].classList.remove('active');
        tabContent[i].classList.add('d-none');
      }
    }
  };

  tabHeadear.addEventListener('click', (evt) => {
    let target = evt.target;
    target = target.closest('.service-header-tab');

    if (target) {
      tab.forEach((item, i) => {
        if (item === target) {
          toggleTabContent(i);
        }
      });
    }
  });
};

export { tabs };
