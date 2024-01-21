const menuBtn = document.querySelector('.header__menu-button');
const navList = document.querySelector('.header__nav-list');
const tableBodyEl = document.querySelector('.main__table-body');
const totalAlbumsEl = document.querySelector('.total-albums');
const backdrop = document.querySelector('.header__backdrop');

fetch('../data/data.json')
  .then(res => res.json())
  .then(data => createTableData(data))
  .catch(err => console.log(err));

const createTableData = tableData => {
  let totalAlbums = 0;
  tableData.forEach(item => {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('main__table-row');

    const createCell = (data, label) => {
      const tdCell = document.createElement('td');
      tdCell.classList.add('main__table-cell');
      tdCell.setAttribute('data-label', label);
      tdCell.textContent = data;
      return tdCell;
    };

    tableRow.appendChild(createCell(item.band, 'Band:'));
    tableRow.appendChild(createCell(item.yearFormed, 'Year Formed:'));
    tableRow.appendChild(createCell(item.numberOfAlbums, 'No. of Albums:'));
    tableRow.appendChild(createCell(item.mostFamousSong, 'Most Famous Song:'));

    totalAlbums += +item.numberOfAlbums;
    totalAlbumsEl.textContent = totalAlbums;

    tableBodyEl.appendChild(tableRow);
  });
};

const toggleMenu = () => {
  const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', !isExpanded);
  menuBtn.classList.toggle('active');
  navList.classList.toggle('show-nav');
  backdrop.classList.toggle('show-nav');
};

const closeMenu = () => {
  menuBtn.setAttribute('aria-expanded', false);
  menuBtn.classList.remove('active');
  navList.classList.remove('show-nav');
  backdrop.classList.remove('show-nav');
};

menuBtn.addEventListener('click', toggleMenu);

backdrop.addEventListener('click', closeMenu);

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navList.classList.contains('show-nav')) {
    closeMenu();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navList.classList.contains('show-nav')) {
    closeMenu();
  }
});
