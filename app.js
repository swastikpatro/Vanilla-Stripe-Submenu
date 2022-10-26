import sublinks from './data.js';

const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');
const linkBtns = [...document.querySelectorAll('.link-btn')];
const submenu = document.querySelector('.submenu');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show');
});

function returnSublinks(listLinks = []) {
  return listLinks
    .map(({ label, icon, url }) => {
      return `
      <a href="${url}">
        <i class="${icon}"></i>
        ${label}
      </a>`;
    })
    .join('');
}

sidebar.innerHTML = sublinks
  .map((item) => {
    const { links, page } = item;
    return `
  <article>
    <h4>${page}</h4>
    <div class="sidebar-sublinks">
    ${returnSublinks(links)}
    </div>
  </article>
  `;
  })
  .join('');

function handleMouseHover(e) {
  // if(e.target)
  if (!e.target.closest('li')) {
    return;
  }
  const listHovered = e.target.closest('li');
  const btnHovered = listHovered.querySelector('button');
  const btnHoveredText = btnHovered.innerText.toLowerCase();
  const tempBtn = btnHovered.getBoundingClientRect();
  const center = (tempBtn.left + tempBtn.right) / 2;
  const bottom = tempBtn.botton - 3;

  const tempPage = sublinks.find((link) => link.page === btnHoveredText);
  if (tempPage) {
    const { page, links } = tempPage;
    submenu.classList.add('show');
    submenu.style.left = center + 'px';
    submenu.style.bottom = bottom + 'px';

    const columns = `col${links.length >= 4 ? 4 : links.length}`;
    submenu.innerHTML = `
    <section>
      <h4>${page}</h4>
      <div class="submenu-center ${columns}">
      ${returnSublinks(links)}
      </div>
    </section>
      `;
  }
}

// navLinks.addEventListener('mouseover', handleMouseHover);

hero.addEventListener('mouseover', () => {
  submenu.classList.remove('show');
});

nav.addEventListener('mouseover', (e) => {
  if (e.target.closest('.nav-links')) {
    handleMouseHover(e);
    return;
  } else {
    submenu.classList.remove('show');
  }
});
