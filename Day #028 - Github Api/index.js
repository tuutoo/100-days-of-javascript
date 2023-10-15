const searchGithub = async () => {
  const username = document.getElementById("searchInput").value;
  const response = await fetch(`https://api.github.com/users/${username}`);
  const detailsContainer = document.querySelector(".details");
  const data = await response.json();

  if (response.ok) {
    detailsContainer.style.display = "flex";
    document.getElementById("result").innerHTML = `
            <div class="profile">
                <div class="profile-image">
                    <img src="${data.avatar_url}" />
                </div>
                </div>
        `;
  }
  else {
    alert(data.message);
  }
}