document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const links = document.querySelectorAll('.nav-link');
    const scrollSpeed = 0.9;

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            container.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    let scrollPosition = window.scrollY;
    let isScrolling = false;

    const smoothScroll = (e) => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                scrollPosition += e.deltaY * scrollSpeed;
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'aggressive'
                });
                isScrolling = false;
            });
        }
    };

    window.addEventListener('wheel', smoothScroll, { passive: true });

    const observerOptions = {
        root: container,
        rootMargin: '0px',
        threshold: 0.9
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const link = document.querySelector(`a[href="#${sectionId}"]`);

            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                if (link) {
                    link.classList.add('active');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.page').forEach(section => {
        observer.observe(section);
    });

    const goToSetButton = document.querySelector('.go-to-set');
    if (goToSetButton) {
        goToSetButton.addEventListener('click', (event) => {
            event.preventDefault();
            scrollToSection('set');
        });
    }

    const goToSetPageButton = document.querySelector('.go-to-set-page');
    if (goToSetPageButton) {
        goToSetPageButton.addEventListener('click', (event) => {
            event.preventDefault();
            scrollToSection('set');
        });
    }

    const backToHomeButton = document.querySelector('.back-to-home');
    if (backToHomeButton) {
        backToHomeButton.addEventListener('click', (event) => {
            event.preventDefault();
            scrollToSection('home');
        });
    }

    const bottomToHomeButton = document.querySelector('.bottom-to-home');
    if (bottomToHomeButton) {
        bottomToHomeButton.addEventListener('click', (event) => {
            event.preventDefault();
            scrollToSection('home');
        });
    }

    const goToAboutButton = document.querySelector('.go-to-about');
    if (goToAboutButton) {
        goToAboutButton.addEventListener('click', (event) => {
            event.preventDefault();
            scrollToSection('about');
        });
    }
});

document.querySelectorAll('.flip-container').forEach(container => {
    container.addEventListener('click', () => {
      container.querySelector('.card').classList.toggle('flipped');
    });
  });


const header = document.querySelector('header');

const observerOptions = {
  root: null,
  threshold: 0.6 // 60% of section must be visible to trigger
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;

      if (id === 'home') {
        header.style.background = 'linear-gradient(180deg, #78352a, #00000056)';
      } else if (id === 'set') {
        header.style.background = 'linear-gradient(180deg,rgba(13, 95, 55, 0.75),rgba(0, 0, 0, 0.75))';
      } else if (id === 'about') {
        header.style.background = 'linear-gradient(180deg,rgba(13, 36, 79, 0.6),rgba(0, 0, 0, 0.75))';
      }
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});


function handleSubmit(event) {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const overlay = document.getElementById("loadingOverlay");
    const progressText = document.getElementById("progressPercent");
    const form = document.getElementById("uploadForm");

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert("Please upload the image");
        return;
    }

    overlay.style.display = "flex";
    progressText.textContent = "0%";

    let progress = 0;

    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
        } else {
            progress += Math.floor(Math.random() * 4) + 2; // +2% to +5%
            if (progress > 100) progress = 100;
            progressText.textContent = progress + "%";
        }
    }, 200);

    setTimeout(() => {
        clearInterval(interval);
        progressText.textContent = "100%";
        form.submit(); // Now submit to Flask
    }, 3000); // 5 seconds delay to simulate loading time
  }


window.onload = function () {
    const form = document.getElementById("uploadForm");
    if (form) {
        form.addEventListener("submit", validateForm);
    }
};


function t_flipAvatar() {
    document.querySelector(".t-avatar-container").classList.toggle("flipped");
}

function k_flipAvatar() {
    document.querySelector(".k-avatar-container").classList.toggle("flipped");
}

function p_flipAvatar() {
    document.querySelector(".p-avatar-container").classList.toggle("flipped");
}

setInterval(() => {
    const avatars = [
        ".t-avatar-container",
        ".k-avatar-container",
        ".p-avatar-container"
    ];

    avatars.forEach((selector, index) => {
        setTimeout(() => {
            document.querySelector(selector).classList.toggle("flipped");
        }, index * 150); 
    });

}, 3000);


function showContent() {
    var contentBox = document.getElementById("contentbox");
    if (contentBox.style.display === "none") {
        contentBox.style.display = "block";
    } else {
        contentBox.style.display = "none";
    }
}


const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const fileNameDisplay = document.getElementById("fileName");

uploadArea.addEventListener("click", () => fileInput.click());

uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("hover");
});

uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("hover");
});

uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("hover");
    const file = e.dataTransfer.files[0];
    fileInput.files = e.dataTransfer.files;
    showFileName(file);
});

fileInput.addEventListener("change", (e) => {
    showFileName(e.target.files[0]);
});

function showFileName(file) {
    if (file && file.name) {
        fileNameDisplay.textContent = "Selected file: " + file.name;
    } else {
        fileNameDisplay.textContent = "";
    }
}

let activeNotification = null;
let notificationTimeout = null;

function copyEmail(email, element, event) {
    event.preventDefault();
    
    if (activeNotification) {
        activeNotification.classList.remove('show');
        clearTimeout(notificationTimeout);
    }

    const notification = element.parentElement.querySelector('.copy-message');
    if (!notification) return;

    const textarea = document.createElement('textarea');
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        const success = document.execCommand('copy');
        if (success) {
            activeNotification = notification;
            notification.classList.add('show');
            
            notificationTimeout = setTimeout(() => {
                notification.classList.remove('show');
                activeNotification = null;
            }, 1000);
        }
    } catch (err) {
        console.error('Failed to copy email:', err);
    } finally {
        document.body.removeChild(textarea);
    }
}

document.querySelectorAll('.email-copy-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const email = this.getAttribute('data-email');
        copyEmail(email, this, e);
    });
});