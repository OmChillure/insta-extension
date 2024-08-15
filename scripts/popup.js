document.getElementById("sendButton").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!username || !message) {
        alert("Please enter both username and message.");
        return;
    }

    chrome.runtime.sendMessage({
        action: "openDM",
        username: username,
        message: message,
    });
});

// Handle the "Log Followers" button click
document.getElementById('logFollowersButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getFollowers' }, function (response) {
            const followerUsernames = response.followers;

            const followersListDiv = document.getElementById('followersList');
            const followersUl = document.getElementById('followers');
            followersUl.innerHTML = ''; 

            followerUsernames.forEach(username => {
                const li = document.createElement('li');
                li.textContent = username;
                followersUl.appendChild(li);
            });

            followersListDiv.style.display = 'block';
        });
    });
});

// Document ready event
document.addEventListener('DOMContentLoaded', function () {
    const goToPostButton = document.getElementById('goToPostButton');
    const postUsernamesButton = document.getElementById('postUsernamesButton');
    const postUsernamesList = document.getElementById('postUsernamesList');
    const postUsernamesUl = document.getElementById('postUsernames');
    const postLinkInput = document.getElementById('postLink');

    // Handle the "Go" button click for post link
    goToPostButton.addEventListener('click', function () {
        const postLink = postLinkInput.value;
        if (postLink) {
            chrome.tabs.update({ url: postLink });
        } else {
            alert('Please enter a valid Instagram post link.');
        }
    });

    // Handle the "Post Usernames" button click
    postUsernamesButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getPostUsernames' }, function (response) {
                const userLinks = response.userLinks;
                postUsernamesUl.innerHTML = '';
                userLinks.forEach(userLink => {
                    const li = document.createElement('li');
                    li.textContent = userLink.username;
                    postUsernamesUl.appendChild(li);
                });
                postUsernamesList.style.display = 'block';
            });
        });
    });
});

// Handle the "Check Authentication" button click
document.getElementById('authButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "checkAuth" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        alert('Error checking authentication');
      } else {
        if (response.isLoggedIn) {
          alert(`User is logged in as ${response.username}`);
        } else {
          alert('User is not logged in');
        }
      }
    });
});
