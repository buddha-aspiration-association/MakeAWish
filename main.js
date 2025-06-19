   function isMobileDevice() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const isPhone = /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return (isTouchDevice && isSmallScreen) || isPhone;
}

function isIOSDevice() {
    return /iPhone|iPad|iPod/.test(navigator.userAgent);
}


function toggleMusic() {
    const musicPlayer = document.getElementById("musicPlayer");
    const musicIcon = document.getElementById("musicIcon");

    if (!musicPlayer || !musicIcon) {
        console.error("Music player or icon not found");
        return;
    }

    if (musicPlayer.paused) {
        const playPromise = musicPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicIcon.src = "./picture/music-icon.png";
                musicIcon.classList.remove('paused');
                
                if (isMobileDevice()) {
                    showMobileToast("🎵 音樂開始播放");
                }
            }).catch(error => {
                console.log("Audio play failed:", error);
                if (isMobileDevice()) {
                    showMobileToast("無法播放音樂，請檢查裝置設定");
                }
            });
        }
    } else {
        musicPlayer.pause();
        musicIcon.src = "./picture/music-stop-icon.png";
        musicIcon.classList.add('paused');
        
        if (isMobileDevice()) {
            showMobileToast("🔇 音樂已暫停");
        }
    }
}

function initializeMusic() {
    const musicPlayer = document.getElementById('musicPlayer');
    const musicIcon = document.getElementById('musicIcon');
    
    if (!musicPlayer || !musicIcon) return;


    musicIcon.style.display = 'block'; 
    musicPlayer.pause();
    musicIcon.src = "./picture/music-stop-icon.png";
    musicIcon.classList.add('paused');
}

function handleVisibilityChange() {
    const musicPlayer = document.getElementById("musicPlayer");
    if (musicPlayer && !musicPlayer.paused && document.hidden) {
        musicPlayer.pause();
    }
}


function showMobileToast(message) {
    const existingToast = document.querySelector('.mobile-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'mobile-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.3s ease;
        font-family: "LXGW WenKai TC", cursive;
        pointer-events: none;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.style.opacity = '1', 10);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

function fixIOSScrolling() {
    if (isIOSDevice()) {
        document.body.style.overflow = 'auto';
        document.body.style.webkitOverflowScrolling = 'touch';
        document.body.style.height = 'auto';
        document.body.style.minHeight = '100vh';
        document.body.style.position = 'relative';
        
        const contentFrame = document.querySelector('.contentFrame');
        if (contentFrame) {
            contentFrame.style.overflow = 'auto';
            contentFrame.style.webkitOverflowScrolling = 'touch';
        }
    }
}

function initMobileOptimizations() {
    if (isMobileDevice()) {
        const cursor = document.getElementById('cursor');
        if (cursor) cursor.style.display = 'none';

        document.body.style.cursor = 'auto';
        
        const clickableElements = document.querySelectorAll('.clickable, .button, .image-box');
        clickableElements.forEach(element => {
            element.style.cursor = 'pointer';
        });
        
        fixIOSScrolling();

        addTouchFeedback();
        
        preventDoubleZoom();
    }
}

function addTouchFeedback() {
    const touchElements = document.querySelectorAll('.button, .image-box, .clickable, .icons img, .shareLine, .shareFacebook, .copyLink');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function preventDoubleZoom() {
    let lastTouchEnd = 0;
    
    document.addEventListener('touchend', function(event) {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

function enhancedShare() {
    const pageURL = window.location.href;
    const pageTitle = "滿願學會祈福網站";
    
    if (navigator.share && isMobileDevice()) {
        navigator.share({
            title: pageTitle,
            url: pageURL,
            text: `來${pageTitle}許願吧！`
        })
    } else {
        showShareBox();
    }
}

function showShareBox() {
    const shareBox = document.getElementById('shareBox');
    const overlay = document.getElementById('overlay');
    
    if (shareBox && overlay) {
        document.body.classList.add('share-active');
        
        overlay.style.display = 'block';
        shareBox.style.display = 'block';
        
        requestAnimationFrame(() => {
            shareBox.classList.add('show');
        });
    }
}

function hideShareBox() {
    const shareBox = document.getElementById('shareBox');
    const overlay = document.getElementById('overlay');
    
    if (shareBox && overlay) {
        shareBox.classList.remove('show');
        
        setTimeout(() => {
            shareBox.style.display = 'none';
            overlay.style.display = 'none';
            document.body.classList.remove('share-active');
        }, 300);
    }
}

function optimizedCopyLink() {
    const pageURL = window.location.href;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pageURL).then(() => {
            showMobileToast("連結已複製到剪貼簿！");
            hideShareBox();
        }).catch(() => {
            fallbackCopyLink(pageURL);
        });
    } else {
        fallbackCopyLink(pageURL);
    }
}

function fallbackCopyLink(url) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showMobileToast("連結已複製到剪貼簿！");
        hideShareBox();
    } catch (err) {
        showMobileToast("複製失敗，請手動複製連結！");
    }
    
    document.body.removeChild(textArea);
}

function enterLink(page) {
    const contentFrame = document.querySelector('.contentFrame');
    if (page !== 'wish' && page !== 'wishMake') {
        localStorage.removeItem('wishText');
    }
    if (!contentFrame) {
        console.error('Content frame not found');
        return;
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;


    if (isMobileDevice()) {
        document.body.style.overflow = 'auto';
        document.body.style.webkitOverflowScrolling = 'touch';
        contentFrame.style.overflow = 'auto';
        contentFrame.style.webkitOverflowScrolling = 'touch';
    }

    if (page === 'dumu' || page === 'drag') {
        localStorage.setItem('wishSource', page);
    }

    if (page === 'wish') {
        animateBackground(1500);
        setTimeout(() => loadPage(page, contentFrame), 1500);
    } else if (page === 'wishMake') {
        loadPage(page, contentFrame);
    } else {
        document.body.style.background = 'antiquewhite';
        loadPage(page, contentFrame);
    }

    document.body.classList.toggle("fireflies-active", (page === 'wish' || page === 'wishMake'));
}

function loadPage(page, contentFrame) {
    fetch(`${page}.html`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Page ${page}.html not found`);
        }
        return response.text();
      })
      .then(data => {
        const placeholder = contentFrame.querySelector('#indexContent-placeholder');
        if (placeholder) {
          placeholder.innerHTML = data;
          
          if (page === 'wish') {
            setupWishPage();
          }
          
          if (page === 'wishMake') {
            setupWishMakePage();
          }
        }
      })
      .catch(error => console.error('Error loading page:', error));
}

function setupWishPage() {
    const showCandle = document.querySelector("#showCandle");
    if (showCandle) {
        const source = localStorage.getItem('wishSource');
        if (source === 'dumu') {
            showCandle.src = "./picture/flowerCandle.png";
        } else if (source === 'drag') {
            showCandle.src = "./picture/glassCandle.png";
        }
    }
}

function setupWishMakePage() {
    const placeholder = document.querySelector('#indexContent-placeholder');
    

    const scripts = placeholder.querySelectorAll("script");
    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            newScript.textContent = oldScript.textContent;
        }
        document.body.appendChild(newScript);
    });

    const audioPlayer = placeholder.querySelector("audio");
    if (audioPlayer) {
        audioPlayer.id = "wishPlayer";
        audioPlayer.classList.add("clickable");
        audioPlayer.style.pointerEvents = "auto";
        audioPlayer.style.cursor = "pointer";

        const source = localStorage.getItem('wishSource');
        if (source === 'dumu') {
            audioPlayer.src = "./music/度母念誦.mp3";
        } else if (source === 'drag') {
            audioPlayer.src = "./music/藥師佛念誦.mp3";
        }
    }

    const showCandle = document.querySelector("#showCandle");
    const instructionText = document.querySelector("#instruction-text");
    if (instructionText && showCandle) {
        const source = localStorage.getItem('wishSource');
        if (source === 'dumu') {
            instructionText.innerText = `嗡 達列 都達列 都列 梭哈\nom tare tuttare ture soha`;
            showCandle.src = "./picture/flowerCandle.png";
        } else if (source === 'drag') {
            instructionText.innerText = `喋雅他 嗡 貝堪則 貝堪則 瑪哈貝堪則 喇雜薩目 嘎喋 梭哈\nTayata Om BekanzeBekanze Maha BeKanzeRadza Samudgate Soha`;
            showCandle.src = "./picture/glassCandle.png";
        }
    }

    const playerElements = placeholder.querySelectorAll('.player-section, .player-container');
    playerElements.forEach(element => {
        element.classList.add("clickable");
        element.style.pointerEvents = "auto";
    });


    const displayWish = placeholder.querySelector("#displayWish");
    const storedWish = localStorage.getItem("wishText");
    if (storedWish && displayWish) {
        displayWish.innerText = storedWish;
    }

    document.body.style.pointerEvents = "auto";
    
    setTimeout(() => {
        if (typeof setupWishButton === 'function') {
            setupWishButton();
        }
    }, 100);
}

function completeWishHandler() {
    const wishText = localStorage.getItem("wishText");
    if (wishText) {
        showSuccessAnimation(wishText);
    }
}

function initializeCursor() {
    if (isMobileDevice()) return;

    var cursor = document.getElementById('cursor');
    var halo = document.createElement('div');
    halo.classList.add('halo');
    document.body.appendChild(halo);

    var cursorText = document.createElement('div');
    cursorText.style.cssText = `
        position: absolute;
        pointer-events: none;
        background: rgba(255, 255, 255, 0.9);
        padding: 5px 10px;
        border-radius: 10px;
        color: #655753;
        font-size: 1em;
        font-family: "LXGW WenKai TC", cursive;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 10000;
    `;
    document.body.appendChild(cursorText);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';

        halo.style.left = (e.pageX - 20) + 'px';
        halo.style.top = (e.pageY - 20) + 'px';
        halo.style.opacity = 1;

        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        const tooltip = hoveredElement?.closest('.image-box')?.getAttribute('data-tooltip');

        if (tooltip) {
            cursorText.textContent = tooltip;
            cursorText.style.left = (e.pageX + 15) + 'px';
            cursorText.style.top = (e.pageY + 15) + 'px';
            cursorText.style.opacity = '1';
        } else {
            cursorText.style.opacity = '0';
        }
    });

    document.addEventListener('mouseout', function() {
        halo.style.opacity = 0;
    });
}

function initializeCloudAnimations() {
    const clouds = document.querySelectorAll('.cloud');
    if (!clouds.length) return;
    
    clouds.forEach((cloud, index) => {
        const startFromRight = index % 2 === 0;
        const startPosition = startFromRight ? '120vw' : '-20vw';
        const endPosition = startFromRight ? '-20vw' : '120vw';
        
        function animateCloud() {
            cloud.style.transform = `translateX(${startPosition})`;
            cloud.style.transition = 'none';
            
            cloud.offsetHeight;
            
            const duration = 15000 + Math.random() * 10000;
            cloud.style.transition = `transform ${duration}ms linear`;
            cloud.style.transform = `translateX(${endPosition})`;

            setTimeout(animateCloud, duration);
        }
        
        setTimeout(animateCloud, Math.random() * 3000);
    });
}

   function bindShareEvents() {
    document.addEventListener('click', function (e) {
      const t = e.target;
  
      if (t.classList.contains('shareLine')) {
        e.preventDefault();
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(document.title)}`, '_blank');
        hideShareBox();
      }
  
      else if (t.classList.contains('shareFacebook')) {
        e.preventDefault();
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`, '_blank');
        hideShareBox();
      }
  

      else if (t.classList.contains('copyLink')) {
        e.preventDefault();
        optimizedCopyLink();
      }
  
      else if (t.id === 'closeShareBox' || t.id === 'overlay') {
        e.preventDefault();
        hideShareBox();
      }
    }, { passive: true });
  }

function bindNavigationEvents() {
    const linkIcon = document.getElementById("linkButton");
    if (linkIcon) {
        linkIcon.addEventListener("click", function (e) {
            e.preventDefault();
            enhancedShare();
        });
    }
}

function bindWishEvents() {

    document.addEventListener('input', function(e) {
        if (e.target && e.target.id === 'wish') {
            const maxLength = 100;
            const currentLength = e.target.value.length;
            const countDisplay = document.getElementById('currentLength');
            
            if (countDisplay) {
                countDisplay.textContent = currentLength;
                countDisplay.style.color = currentLength >= maxLength ? '#ff4444' : '#888';
            }
        }
    });

    window.closeAlert = function() {
        const customAlert = document.querySelector('#custom-alert');
        if (customAlert) {
            customAlert.classList.remove('show');
            setTimeout(() => {
                customAlert.classList.add('hidden');
            }, 300);
        }
    };
}

function bindMobileImageEvents() {
    if (isMobileDevice()) {
        setTimeout(() => {
            const imageBoxes = document.querySelectorAll('.image-box');
            imageBoxes.forEach((box, index) => {
                box.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    const page = index === 0 ? 'drag' : 'dumu';
                    enterLink(page);
                });
            });
        }, 500);
    }
}

document.addEventListener('touchmove', function(e) {
    if (document.body.classList.contains('share-active')) {
        const shareBox = document.getElementById('shareBox');
        const target = e.target;
        
       
        if (shareBox && !shareBox.contains(target)) {
            e.preventDefault();
        }
    }
}, { passive: false });

window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        if (isMobileDevice()) {
            fixIOSScrolling();
        }
    }, 100);
});

window.addEventListener('resize', function() {
    if (isMobileDevice()) {
        fixIOSScrolling();
        initMobileOptimizations();
    }
});

window.initializeCloudAnimations = initializeCloudAnimations;
window.toggleMusic = toggleMusic;

document.addEventListener("DOMContentLoaded", function () {

    initMobileOptimizations();
    initializeCursor();

    bindNavigationEvents();
    bindShareEvents();
    bindWishEvents();
    bindMobileImageEvents();
    
    setTimeout(() => {
        initializeMusic();
    }, 500);


    document.addEventListener('visibilitychange', handleVisibilityChange);

    const nav = document.querySelector(".nav");
    if (nav) {
        let parent = nav.parentElement;
        while (parent) {
            parent.style.pointerEvents = 'none';
            parent = parent.parentElement;
        }
        nav.style.pointerEvents = 'auto';
    }

    const button = document.querySelector(".button");
    if (button) {
        let parent = button.parentElement;
        while (parent) {
            parent.style.pointerEvents = 'none';
            parent = parent.parentElement;
        }
        button.style.pointerEvents = 'auto';
    }
});
