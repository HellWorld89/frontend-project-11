document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rss-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');

    new Promise((resolve) => {
      console.log('Начало загрузки:', url);
      resolve(url);
    })
      .then((result) => {
        console.log('RSS загружен:', result);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
  });
});
