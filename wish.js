document.addEventListener("DOMContentLoaded", function () {

    const contentPlaceholder = document.querySelector('#indexContent-placeholder');
    if (contentPlaceholder) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                const wishTextarea = document.querySelector('#wish');
                const submitButton = document.querySelector('.submit-button');
                
                if (wishTextarea && submitButton) {
                    initializeWishFeature(wishTextarea, submitButton);
                }
            });
        });

        observer.observe(contentPlaceholder, {
            childList: true,
            subtree: true
        });
    }
});

function initializeWishFeature(textarea, button) {
    function updateButtonState() {
        const wishText = textarea.value;
        if (wishText.trim().length > 0) {
            button.classList.add('show');
            button.disabled = false;
        } else {
            button.classList.remove('show');
            button.disabled = true;
        }
    }

    try {
        const storedWish = localStorage.getItem('wishText');
        if (storedWish) {
            textarea.value = storedWish;
        }
    } catch (e) {
        console.error('讀取願望時發生錯誤:', e);
    }

    textarea.addEventListener('input', updateButtonState);

    updateButtonState();
}

window.validateWish = function() {
    const wishTextarea = document.querySelector('#wish');
    
    if (!wishTextarea) return;

    const wishText = wishTextarea.value.trim();
    if (!wishText) {
        return;
    }

    try {
        localStorage.setItem('wishText', wishText);
        enterLink('wishMake');
    } catch (e) {
        console.error('儲存願望時發生錯誤:', e);
    }
};

function showSuccessAnimation(wishText) {
    const wishPaper = document.querySelector('.wishM-paper');
    if (!wishPaper) return;
    wishText = wishText.replace(/\n/g, '<br>').trim(); 
    wishPaper.innerHTML = wishText;
}