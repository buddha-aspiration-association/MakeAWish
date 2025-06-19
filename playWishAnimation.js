function showWishLantern(wishText) {

    const animationContainer = document.createElement('div');
    animationContainer.className = 'lantern-animation-container';
    document.body.appendChild(animationContainer);
    
    const lantern = document.createElement('div');
    lantern.className = 'wish-lantern';
    
    const lanternBody = document.createElement('div');
    lanternBody.className = 'lantern-body';
    
    const lanternTop = document.createElement('div');
    lanternTop.className = 'lantern-top';
    
    const lanternBottom = document.createElement('div');
    lanternBottom.className = 'lantern-bottom';
    
    const wishPaper = document.createElement('div');
    wishPaper.className = 'wish-paper';
    wishPaper.textContent = wishText || '願望已送出';
    
    const glow = document.createElement('div');
    glow.className = 'lantern-glow';
    

    lanternBody.appendChild(wishPaper);
    lantern.appendChild(glow);
    lantern.appendChild(lanternTop);
    lantern.appendChild(lanternBody);
    lantern.appendChild(lanternBottom);
    
    animationContainer.appendChild(lantern);

    createStars(animationContainer, 30);

    setTimeout(() => {
      animationContainer.classList.add('show');
      lantern.classList.add('float-up');

      setTimeout(() => {
        animationContainer.remove();
        if (typeof enterLink === 'function') {
          localStorage.removeItem("wishText");
          localStorage.removeItem('wishSource');
          enterLink('share');
        }
      }, 5000);
    }, 100);
  }
  
  function createStars(container, count) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.width = `${Math.random() * 3 + 2}px`;
      star.style.height = star.style.width;
      
      container.appendChild(star);
    }
  }
  
  function setupWishButton() {
    const completeButton = document.getElementById('completeWish');
    
    if (completeButton) {
      const newButton = completeButton.cloneNode(true);
      completeButton.parentNode.replaceChild(newButton, completeButton);

      newButton.addEventListener('click', function() {
        const wishText = localStorage.getItem("wishText");
        if (wishText) {

          // const successSound = new Audio('./music/success-sound.mp3');
          // successSound.volume = 0.5;
   
          showWishLantern(wishText);
        }
      }); 
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    setupWishButton();
    
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType === 1 && node.querySelector) {
              const button = node.querySelector('#completeWish');
              if (button) {
                setupWishButton();
              }
            }
          }
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // const audioPreload = new Audio();
    // audioPreload.src = './music/success-sound.mp3';
  });