/* ==========================================================================
   WHISPER LUXURY COSMETICS — MAIN JAVASCRIPT & CART LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
    initGalleryLightbox();
    initCartSystem();
    renderCartPage();
});

/* --------------------------------------------------------------------------
   1. GLOBAL TAB SWITCHER FUNCTION
   -------------------------------------------------------------------------- */
window.switchForm = function(formType) {
    const contactForm = document.getElementById('contactForm');
    const enquiryForm = document.getElementById('enquiryForm');
    const tabContactBtn = document.getElementById('tabContactBtn');
    const tabEnquiryBtn = document.getElementById('tabEnquiryBtn');
    const feedback = document.getElementById('enquiryFeedback');

    if (feedback) feedback.style.display = 'none';

    if (formType === 'contact') {
        if (contactForm) contactForm.style.display = 'block';
        if (enquiryForm) enquiryForm.style.display = 'none';
        if (tabContactBtn) { tabContactBtn.style.background = '#ffffff'; tabContactBtn.style.color = '#000000'; }
        if (tabEnquiryBtn) { tabEnquiryBtn.style.background = 'transparent'; tabEnquiryBtn.style.color = '#ffffff'; }
    } else if (formType === 'enquiry') {
        if (contactForm) contactForm.style.display = 'none';
        if (enquiryForm) enquiryForm.style.display = 'block';
        if (tabEnquiryBtn) { tabEnquiryBtn.style.background = '#ffffff'; tabEnquiryBtn.style.color = '#000000'; }
        if (tabContactBtn) { tabContactBtn.style.background = 'transparent'; tabContactBtn.style.color = '#ffffff'; }
    }
};

/* --------------------------------------------------------------------------
   2. FORM VALIDATION
   -------------------------------------------------------------------------- */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const enquiryForm = document.getElementById('enquiryForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent to Whisper Support.');
            contactForm.reset();
        });
    }

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Enquiry submitted successfully!');
            enquiryForm.reset();
        });
    }
}

/* --------------------------------------------------------------------------
   3. GALLERY LIGHTBOX
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
    const images = document.querySelectorAll('.product-card img, .block-media img');
    if (images.length === 0) return;

    const modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.style.cssText = 'display:none; position:fixed; z-index:2000; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); justify-content:center; align-items:center; cursor:pointer;';

    const modalImg = document.createElement('img');
    modalImg.style.cssText = 'max-width:90%; max-height:85%; border:1px solid #222; border-radius:4px; box-shadow:0 0 20px rgba(0,0,0,0.8);';

    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modal.style.display = 'flex';
        });
    });

    modal.addEventListener('click', () => { modal.style.display = 'none'; });
}

/* --------------------------------------------------------------------------
   4. CART FUNCTIONALITY & LOCALSTORAGE (Takealot-Style Quantity Editing)
   -------------------------------------------------------------------------- */
function initCartSystem() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));
            
            const qtyInput = card.querySelector('.item-qty-input');
            const quantityToAdd = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

            let cart = JSON.parse(localStorage.getItem('whisperCart')) || [];
            
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += quantityToAdd;
            } else {
                cart.push({ name: name, price: price, quantity: quantityToAdd });
            }

            localStorage.setItem('whisperCart', JSON.stringify(cart));
            alert(`${quantityToAdd} x ${name} added to your shopping bag!`);
            updateCartBadge();
        });
    });

    updateCartBadge();
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('whisperCart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.cart-label');
    if (badge) {
        badge.textContent = totalCount > 0 ? '(' + totalCount + ')' : '';
    }
}

function renderCartPage() {
    const cartContainer = document.getElementById('cartItemsContainer');
    if (!cartContainer) return;

    const cart = JSON.parse(localStorage.getItem('whisperCart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="color: #888; text-align: center; padding: 2rem;">Your shopping bag is empty.</p>';
        const totalEl = document.getElementById('cartTotalAmount');
        if (totalEl) totalEl.textContent = 'R0.00';
        return;
    }

    let html = '<table style="width: 100%; border-collapse: collapse; color: #fff; margin-bottom: 2rem;">';
    html += '<tr style="border-bottom: 1px solid #333; text-align: left;"><th style="padding: 1rem;">Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th>Action</th></tr>';

    let grandTotal = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        grandTotal += subtotal;
        html += '<tr style="border-bottom: 1px solid #222;">' +
            '<td style="padding: 1rem;">' + item.name + '</td>' +
            '<td>R' + item.price + '.00</td>' +
            '<td><input type="number" min="1" max="99" value="' + item.quantity + '" onchange="updateCartQuantity(' + index + ', this.value)" style="width: 60px; padding: 0.3rem; background: #111; color: #fff; border: 1px solid #333; text-align: center;"></td>' +
            '<td>R' + subtotal + '.00</td>' +
            '<td><button onclick="removeItem(' + index + ')" style="background: none; border: none; color: #e74c3c; cursor: pointer;">Remove</button></td>' +
            '</tr>';
    });

    html += '</table>';
    cartContainer.innerHTML = html;

    const totalEl = document.getElementById('cartTotalAmount');
    if (totalEl) {
        totalEl.textContent = 'R' + grandTotal + '.00';
    }
}

window.updateCartQuantity = function(index, newQty) {
    let cart = JSON.parse(localStorage.getItem('whisperCart')) || [];
    const parsedQty = parseInt(newQty);
    if (parsedQty > 0) {
        cart[index].quantity = parsedQty;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('whisperCart', JSON.stringify(cart));
    renderCartPage();
    updateCartBadge();
};

window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('whisperCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('whisperCart', JSON.stringify(cart));
    renderCartPage();
    updateCartBadge();
};