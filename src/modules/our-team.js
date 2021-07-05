const ourTeam = () => {
  const command = document.querySelector('.command');
  let newPhoto, oldPhoto;

  command.addEventListener('mouseover', (element) => {
    newPhoto = element.target.dataset.img;
    oldPhoto = element.target.getAttribute('src');
    if (element.target.classList.contains('command__photo')) {
      element.target.src = newPhoto;
    }
  });
  command.addEventListener('mouseout', (element) => {
    if (element.target.classList.contains('command__photo')) {
      element.target.src = oldPhoto;
    }
  });
};

export { ourTeam };
