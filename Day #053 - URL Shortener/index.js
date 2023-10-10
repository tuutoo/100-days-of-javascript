const shortBtn = document.getElementById('short-btn');
const reloadBtn = document.getElementById('reload-btn');

shortBtn.addEventListener('click', shortenUrl)
reloadBtn.addEventListener('click', () => {
  window.location.reload();
})

function shortenUrl() {
  let originalUrl = document.getElementById('originalUrl').value;
  let apiUrl = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(originalUrl);
  let shortenedUrlTextarea = document.getElementById('shortenedUrl')
  fetch(apiUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.text();
    })
    .then(data => {
      shortenedUrlTextarea.value = data
    })
    .catch(error => {
      shortenedUrlTextarea.value = 'Error: Unable to shorten URL!'
    })
}
