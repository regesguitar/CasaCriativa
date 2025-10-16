/**
 * Modern Casa Criativa Frontend JavaScript
 * Updated with ES6+ features and better UX
 */

class CasaCriativaApp {
    constructor() {
        this.modal = document.querySelector('#modal');
        this.body = document.querySelector('body');
        this.form = document.querySelector('form[action="/"]');

        this.init();
    }

    init() {
        // Initialize event listeners
        this.setupEventListeners();

        // Setup form validation
        this.setupFormValidation();

        // Setup modal behavior
        this.setupModalBehavior();
    }

    setupEventListeners() {
        // Global click handler for modal toggle buttons
        document.addEventListener('click', (event) => {
            if (event.target.matches('[onclick="onOff()"]') || event.target.closest('[onclick="onOff()"]')) {
                event.preventDefault();
                this.toggleModal();
            }
        });
    }

    setupFormValidation() {
        if (this.form) {
            this.form.addEventListener('submit', (event) => {
                if (!this.validateForm()) {
                    event.preventDefault();
                }
            });
        }
    }

    setupModalBehavior() {
        // Close modal when clicking outside
        if (this.modal) {
            this.modal.addEventListener('click', (event) => {
                if (event.target === this.modal) {
                    this.toggleModal();
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && !this.modal.classList.contains('hide')) {
                    this.toggleModal();
                }
            });
        }
    }

    toggleModal() {
        if (this.modal) {
            this.modal.classList.toggle('hide');
            this.body.classList.toggle('hideScroll');
            this.modal.classList.toggle('addScroll');
        }
    }

    validateForm() {
        const requiredFields = ['title', 'category', 'description'];
        const formData = new FormData(this.form);
        let isValid = true;
        let firstInvalidField = null;

        for (const field of requiredFields) {
            const value = formData.get(field)?.trim();

            if (!value) {
                this.showFieldError(field, 'Este campo é obrigatório');
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        }

        // Validate URLs if provided
        const imageUrl = formData.get('image')?.trim();
        const linkUrl = formData.get('link')?.trim();

        if (imageUrl && !this.isValidUrl(imageUrl)) {
            this.showFieldError('image', 'Por favor, insira uma URL válida');
            if (!firstInvalidField) {
                firstInvalidField = 'image';
            }
            isValid = false;
        } else {
            this.clearFieldError('image');
        }

        if (linkUrl && !this.isValidUrl(linkUrl)) {
            this.showFieldError('link', 'Por favor, insira uma URL válida');
            if (!firstInvalidField) {
                firstInvalidField = 'link';
            }
            isValid = false;
        } else {
            this.clearFieldError('link');
        }

        // Focus first invalid field
        if (firstInvalidField) {
            const fieldElement = document.querySelector(`[name="${firstInvalidField}"]`);
            if (fieldElement) {
                fieldElement.focus();
            }
        }

        return isValid;
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.style.borderColor = '#ff5e84';

            // Remove existing error message
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            // Add new error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = 'color: #ff5e84; font-size: 12px; margin-top: 4px;';
            errorDiv.textContent = message;

            field.parentNode.appendChild(errorDiv);
        }
    }

    clearFieldError(fieldName) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.style.borderColor = '';

            const errorMessage = field.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    }
}

// Modern function for backward compatibility
function onOff() {
    window.casaCriativaApp.toggleModal();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.casaCriativaApp = new CasaCriativaApp();
});

// Export for potential use in other modules
export { CasaCriativaApp };
