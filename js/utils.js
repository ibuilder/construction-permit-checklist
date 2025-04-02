/**
 * utils.js - Utility functions for Construction Project Permit Checklist
 * Contains common helper functions used across the application
 */

/**
 * Format currency value
 * @param {number|string} value - The value to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
    if (!value) return '$0.00';
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(numValue);
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date object or ISO string
 * @param {boolean} includeTime - Whether to include time in the output
 * @returns {string} Formatted date string
 */
function formatDateString(date, includeTime = false) {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    
    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }
    
    return dateObj.toLocaleDateString('en-US', options);
}

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
function truncateText(text, maxLength = 50) {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength) + '...';
}

/**
 * Generate a unique ID for new items
 * @param {string} prefix - Prefix for the ID (e.g., 'p' for permits)
 * @param {Array} existingItems - Array of existing items to avoid duplicate IDs
 * @returns {string} Unique ID
 */
function generateUniqueId(prefix, existingItems) {
    let highestNum = 0;
    
    existingItems.forEach(item => {
        const idNum = parseInt(item.id.substring(1));
        if (idNum > highestNum) {
            highestNum = idNum;
        }
    });
    
    return `${prefix}${highestNum + 1}`;
}

/**
 * Download data as a JSON file
 * @param {Object} data - Data to download
 * @param {string} filename - Name of the file
 */
function downloadJsonFile(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
}

/**
 * Calculate the percentage of completion
 * @param {number} completed - Number of completed items
 * @param {number} total - Total number of items
 * @returns {number} Percentage value
 */
function calculatePercentage(completed, total) {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
}

/**
 * Check if an element is in viewport
 * @param {HTMLElement} el - The element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Time to wait in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 300) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Create a copy of an object without reference
 * @param {Object} obj - Object to copy
 * @returns {Object} Copied object
 */
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Get browser locale for date/number formatting
 * @returns {string} Current locale
 */
function getCurrentLocale() {
    return navigator.language || 'en-US';
}

/**
 * Show a Bootstrap alert
 * @param {string} message - Alert message
 * @param {string} type - Alert type (success, danger, warning, info)
 * @param {number} duration - Duration in ms before auto-close (0 to disable)
 */
function showBootstrapAlert(message, type = 'info', duration = 5000) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Find container to insert alert
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto-dismiss after specified duration
    if (duration > 0) {
        setTimeout(() => {
            if (alertDiv.parentNode) {
                const bsAlert = new bootstrap.Alert(alertDiv);
                bsAlert.close();
            }
        }, duration);
    }
}