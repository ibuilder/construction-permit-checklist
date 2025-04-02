/**
 * checklist.js - Interactive checklist functionality
 * Handles all the interactive features of the checklist page
 */

// DOM Elements
let permitTable, utilityTable, specialTable, testingTable;
let editModal, editItemId, editItemCategory;
let searchInput, filterStatus, resetFiltersBtn;
let completedCountEl, totalCountEl, overallProgressEl;
let pendingCountEl, inProgressCountEl, approvedCountEl;

// Initialize the checklist page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data from storage
    initializeData();
    
    // Get DOM elements
    permitTable = document.getElementById('permitTable').getElementsByTagName('tbody')[0];
    utilityTable = document.getElementById('utilityTable').getElementsByTagName('tbody')[0];
    specialTable = document.getElementById('specialTable').getElementsByTagName('tbody')[0];
    testingTable = document.getElementById('testingTable').getElementsByTagName('tbody')[0];
    
    searchInput = document.getElementById('searchInput');
    filterStatus = document.getElementById('filterStatus');
    resetFiltersBtn = document.getElementById('resetFilters');
    
    completedCountEl = document.getElementById('completedCount');
    totalCountEl = document.getElementById('totalCount');
    overallProgressEl = document.getElementById('overallProgress');
    pendingCountEl = document.getElementById('pendingCount');
    inProgressCountEl = document.getElementById('inProgressCount');
    approvedCountEl = document.getElementById('approvedCount');
    
    // Setup edit modal
    editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editItemId = document.getElementById('editItemId');
    editItemCategory = document.getElementById('editItemCategory');
    
    // Load project info if available
    loadProjectInfo();
    
    // Populate tables
    populateTables();
    
    // Update statistics
    updateStatistics();
    
    // Add event listeners
    setupEventListeners();
});

/**
 * Load project information into form fields
 */
function loadProjectInfo() {
    if (projectInfo.name) {
        document.getElementById('projectName').value = projectInfo.name;
    }
    
    if (projectInfo.location) {
        document.getElementById('projectLocation').value = projectInfo.location;
    }
    
    if (projectInfo.manager) {
        document.getElementById('projectManager').value = projectInfo.manager;
    }
}

/**
 * Save project information
 */
function saveProjectInfo() {
    projectInfo.name = document.getElementById('projectName').value;
    projectInfo.location = document.getElementById('projectLocation').value;
    projectInfo.manager = document.getElementById('projectManager').value;
    projectInfo.startDate = projectInfo.startDate || new Date().toISOString();
    
    saveData();
    
    // Show feedback to user
    showAlert('Project information saved successfully!', 'success');
}

/**
 * Populate all tables with data
 */
function populateTables() {
    // Clear existing rows
    permitTable.innerHTML = '';
    utilityTable.innerHTML = '';
    specialTable.innerHTML = '';
    testingTable.innerHTML = '';
    
    // Populate permit items
    permitItems.forEach((item, index) => {
        permitTable.appendChild(createTableRow(item, index + 1));
    });
    
    // Populate utility items
    utilityItems.forEach((item, index) => {
        utilityTable.appendChild(createTableRow(item, index + 1));
    });
    
    // Populate special items
    specialItems.forEach((item, index) => {
        specialTable.appendChild(createTableRow(item, index + 1));
    });
    
    // Populate testing items
    testingItems.forEach((item, index) => {
        testingTable.appendChild(createTableRow(item, index + 1));
    });
}

/**
 * Create a table row for an item
 */
function createTableRow(item, index) {
    const row = document.createElement('tr');
    row.className = `status-${item.status}`;
    row.dataset.id = item.id;
    
    row.innerHTML = `
        <td>${index}</td>
        <td class="permit-name">${item.name}</td>
        <td>${item.responsibility}</td>
        <td>${formatStatus(item.status)}</td>
        <td>${item.notes}</td>
        <td class="action-buttons">
            <button class="btn btn-sm btn-primary edit-btn" data-id="${item.id}">
                <i class="fas fa-edit"></i> Edit
            </button>
        </td>
    `;
    
    return row;
}

/**
 * Format status for display
 */
function formatStatus(status) {
    switch (status) {
        case 'pending':
            return '<span class="badge bg-warning text-dark">Pending</span>';
        case 'inprogress':
            return '<span class="badge bg-info">In Progress</span>';
        case 'approved':
            return '<span class="badge bg-success">Approved</span>';
        case 'notapplicable':
            return '<span class="badge bg-secondary">N/A</span>';
        default:
            return '<span class="badge bg-light text-dark">Unknown</span>';
    }
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Edit button click
    document.addEventListener('click', function(e) {
        if (e.target.closest('.edit-btn')) {
            const button = e.target.closest('.edit-btn');
            const id = button.dataset.id;
            openEditModal(id);
        }
    });
    
    // Save changes button
    document.getElementById('saveChangesBtn').addEventListener('click', saveItemChanges);
    
    // Search functionality
    document.getElementById('searchButton').addEventListener('click', filterItems);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterItems();
        }
    });
    
    // Filter by status
    filterStatus.addEventListener('change', filterItems);
    
    // Reset filters
    resetFiltersBtn.addEventListener('click', resetFilters);
}

/**
 * Open the edit modal for an item
 */
function openEditModal(id) {
    const item = getItemById(id);
    if (item) {
        // Set the item ID and category
        editItemId.value = id;
        editItemCategory.value = id.charAt(0);
        
        // Populate form fields
        document.getElementById('editItemName').value = item.name;
        document.getElementById('editResponsibility').value = item.responsibility;
        document.getElementById('editStatus').value = item.status;
        document.getElementById('editEstimate').value = item.estimate;
        document.getElementById('editNotes').value = item.notes;
        
        // Set modal title
        document.getElementById('editModalLabel').textContent = `Edit: ${item.name}`;
        
        // Show the modal
        editModal.show();
    }
}

/**
 * Save changes from the edit modal
 */
function saveItemChanges() {
    const id = editItemId.value;
    
    // Get updated values
    const updatedData = {
        responsibility: document.getElementById('editResponsibility').value,
        status: document.getElementById('editStatus').value,
        estimate: document.getElementById('editEstimate').value,
        notes: document.getElementById('editNotes').value
    };
    
    // Update the item
    if (updateItem(id, updatedData)) {
        // Close the modal
        editModal.hide();
        
        // Refresh the tables
        populateTables();
        
        // Update statistics
        updateStatistics();
        
        // Show success message
        showAlert('Item updated successfully!', 'success');
    } else {
        showAlert('Error updating item', 'danger');
    }
}

/**
 * Update statistics display
 */
function updateStatistics() {
    const counts = getStatusCounts();
    
    // Update counts
    completedCountEl.textContent = counts.completed;
    totalCountEl.textContent = counts.total;
    pendingCountEl.textContent = counts.pending;
    inProgressCountEl.textContent = counts.inprogress;
    approvedCountEl.textContent = counts.approved;
    
    // Update progress bar
    overallProgressEl.style.width = `${counts.progress}%`;
    overallProgressEl.textContent = `${counts.progress}%`;
}

/**
 * Filter items based on search and status
 */
function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusFilter = filterStatus.value;
    
    filterTable(permitTable, permitItems, searchTerm, statusFilter);
    filterTable(utilityTable, utilityItems, searchTerm, statusFilter);
    filterTable(specialTable, specialItems, searchTerm, statusFilter);
    filterTable(testingTable, testingItems, searchTerm, statusFilter);
}

/**
 * Filter a specific table
 */
function filterTable(table, items, searchTerm, statusFilter) {
    // Clear the table
    table.innerHTML = '';
    
    // Filter items
    const filteredItems = items.filter(item => {
        const matchesSearch = searchTerm === '' || 
            item.name.toLowerCase().includes(searchTerm) || 
            item.notes.toLowerCase().includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    // Populate with filtered items
    filteredItems.forEach((item, index) => {
        table.appendChild(createTableRow(item, index + 1));
    });
}

/**
 * Reset all filters
 */
function resetFilters() {
    searchInput.value = '';
    filterStatus.value = 'all';
    populateTables();
}

/**
 * Generate a report for download
 */
function generateReport() {
    const reportData = exportChecklistData();
    
    // Create a Blob with the data
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectInfo.name || 'project'}_permit_checklist_report.json`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
    
    showAlert('Report generated and downloaded', 'success');
}

/**
 * Show an alert message
 */
function showAlert(message, type) {
    // Create alert element
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
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }
    }, 5000);
}