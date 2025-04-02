/**
 * dashboard.js - Dashboard visualization for Construction Project Permit Checklist
 * Handles all dashboard visualizations and data display
 */

// Chart objects
let statusChart, categoryChart, timelineChart;

// DOM Elements
let overallProgressEl, categoryProgressContainerEl;
let pendingItemsTableEl, recentUpdatesEl;

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data from storage
    initializeData();
    
    // Get DOM elements
    overallProgressEl = document.getElementById('overallProgress');
    categoryProgressContainerEl = document.getElementById('categoryProgressContainer');
    pendingItemsTableEl = document.getElementById('pendingItemsTable').getElementsByTagName('tbody')[0];
    recentUpdatesEl = document.getElementById('recentUpdates');
    
    // Load project info
    loadProjectInfo();
    
    // Initialize dashboard components
    initializeStatusChart();
    initializeCategoryChart();
    updateOverallProgress();
    updateCategoryProgress();
    populatePendingItems();
    populateRecentUpdates();
    
    // Set up refresh button
    document.getElementById('refreshDashboard').addEventListener('click', refreshDashboard);
});

/**
 * Load project information
 */
function loadProjectInfo() {
    const projectNameEl = document.getElementById('projectName');
    const projectLocationEl = document.getElementById('projectLocation');
    const projectManagerEl = document.getElementById('projectManager');
    const lastUpdatedEl = document.getElementById('lastUpdated');
    
    if (projectInfo.name) {
        projectNameEl.textContent = projectInfo.name;
        document.title = `Dashboard - ${projectInfo.name}`;
    } else {
        projectNameEl.textContent = 'New Project';
    }
    
    if (projectInfo.location) {
        projectLocationEl.textContent = projectInfo.location;
    } else {
        projectLocationEl.textContent = 'Location not set';
    }
    
    if (projectInfo.manager) {
        projectManagerEl.textContent = projectInfo.manager;
    } else {
        projectManagerEl.textContent = 'Manager not assigned';
    }
    
    if (projectInfo.lastUpdated) {
        const date = new Date(projectInfo.lastUpdated);
        lastUpdatedEl.textContent = formatDate(date);
    } else {
        lastUpdatedEl.textContent = 'Not saved yet';
    }
}

/**
 * Initialize the status chart
 */
function initializeStatusChart() {
    const ctx = document.getElementById('statusChart').getContext('2d');
    const counts = getStatusCounts();
    
    // Destroy existing chart if it exists
    if (statusChart) {
        statusChart.destroy();
    }
    
    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pending', 'In Progress', 'Approved', 'Not Applicable'],
            datasets: [{
                data: [counts.pending, counts.inprogress, counts.approved, counts.notapplicable],
                backgroundColor: ['#ffc107', '#0dcaf0', '#198754', '#6c757d'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize the category progress chart
 */
function initializeCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const progress = getCategoryProgress();
    
    // Destroy existing chart if it exists
    if (categoryChart) {
        categoryChart.destroy();
    }
    
    categoryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Permits & Planchecks', 'Utility Fees', 'Special Approvals', 'Testing & Inspection'],
            datasets: [{
                label: 'Completion Progress (%)',
                data: [
                    progress.permit.progress,
                    progress.utility.progress,
                    progress.special.progress,
                    progress.testing.progress
                ],
                backgroundColor: ['rgba(13, 110, 253, 0.7)', 'rgba(25, 135, 84, 0.7)', 'rgba(255, 193, 7, 0.7)', 'rgba(13, 202, 240, 0.7)'],
                borderColor: ['rgb(13, 110, 253)', 'rgb(25, 135, 84)', 'rgb(255, 193, 7)', 'rgb(13, 202, 240)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Completion: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Update overall progress section
 */
function updateOverallProgress() {
    const counts = getStatusCounts();
    
    // Update the counts
    document.getElementById('totalItemsCount').textContent = counts.total;
    document.getElementById('completedItemsCount').textContent = counts.completed;
    document.getElementById('pendingItemsCount').textContent = counts.pending;
    document.getElementById('inProgressItemsCount').textContent = counts.inprogress;
    
    // Update progress bar
    const progressBar = document.getElementById('overallProgressBar');
    progressBar.style.width = `${counts.progress}%`;
    progressBar.textContent = `${counts.progress}%`;
    
    // Update text
    document.getElementById('progressPercentage').textContent = `${counts.progress}%`;
}

/**
 * Update category progress bars
 */
function updateCategoryProgress() {
    const progress = getCategoryProgress();
    
    // Clear existing progress bars
    categoryProgressContainerEl.innerHTML = '';
    
    // Create permit progress section
    const permitProgress = createProgressSection(
        'Permits & Planchecks',
        progress.permit.complete,
        progress.permit.total,
        progress.permit.progress,
        'bg-primary'
    );
    categoryProgressContainerEl.appendChild(permitProgress);
    
    // Create utility progress section
    const utilityProgress = createProgressSection(
        'Utility Fees & Assessments',
        progress.utility.complete,
        progress.utility.total,
        progress.utility.progress,
        'bg-success'
    );
    categoryProgressContainerEl.appendChild(utilityProgress);
    
    // Create special progress section
    const specialProgress = createProgressSection(
        'Special Approvals',
        progress.special.complete,
        progress.special.total,
        progress.special.progress,
        'bg-warning'
    );
    categoryProgressContainerEl.appendChild(specialProgress);
    
    // Create testing progress section
    const testingProgress = createProgressSection(
        'Testing & Inspection',
        progress.testing.complete,
        progress.testing.total,
        progress.testing.progress,
        'bg-info'
    );
    categoryProgressContainerEl.appendChild(testingProgress);
}

/**
 * Create a progress section for a category
 */
function createProgressSection(title, complete, total, percentage, barClass) {
    const section = document.createElement('div');
    section.className = 'category-progress';
    
    section.innerHTML = `
        <div class="progress-title">
            <span class="title">${title}</span>
            <span class="percentage">${complete}/${total} (${percentage}%)</span>
        </div>
        <div class="progress">
            <div class="progress-bar ${barClass}" role="progressbar" 
                style="width: ${percentage}%" aria-valuenow="${percentage}" 
                aria-valuemin="0" aria-valuemax="100">
                ${percentage}%
            </div>
        </div>
    `;
    
    return section;
}

/**
 * Populate pending items table
 */
function populatePendingItems() {
    // Clear the table
    pendingItemsTableEl.innerHTML = '';
    
    // Get all items that are pending or in progress
    const allItems = [...permitItems, ...utilityItems, ...specialItems, ...testingItems];
    const activeItems = allItems.filter(item => 
        item.status === 'pending' || item.status === 'inprogress'
    );
    
    // Sort by status (in progress first)
    activeItems.sort((a, b) => {
        if (a.status === 'inprogress' && b.status === 'pending') return -1;
        if (a.status === 'pending' && b.status === 'inprogress') return 1;
        return 0;
    });
    
    // Take only top 5 for dashboard
    const displayItems = activeItems.slice(0, 5);
    
    if (displayItems.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="4" class="text-center">No pending items found</td>
        `;
        pendingItemsTableEl.appendChild(emptyRow);
        return;
    }
    
    // Add rows to table
    displayItems.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.responsibility || 'Not assigned'}</td>
            <td><span class="status-badge badge-${item.status}">${formatStatus(item.status)}</span></td>
            <td>
                <a href="checklist.html" class="btn btn-sm btn-outline-primary">
                    <i class="fas fa-edit"></i> Update
                </a>
            </td>
        `;
        
        pendingItemsTableEl.appendChild(row);
    });
    
    // Add "View All" link if there are more items
    if (activeItems.length > 5) {
        const viewAllRow = document.createElement('tr');
        viewAllRow.className = 'table-light';
        viewAllRow.innerHTML = `
            <td colspan="4" class="text-center">
                <a href="checklist.html" class="text-primary">
                    View all ${activeItems.length} pending items <i class="fas fa-arrow-right"></i>
                </a>
            </td>
        `;
        pendingItemsTableEl.appendChild(viewAllRow);
    }
}

/**
 * Populate recent updates
 */
function populateRecentUpdates() {
    // Clear the container
    recentUpdatesEl.innerHTML = '';
    
    // Create sample update items (in a real app, these would be stored events)
    if (!projectInfo.name) {
        const emptyNotice = document.createElement('div');
        emptyNotice.className = 'text-center text-muted my-4';
        emptyNotice.textContent = 'No project data available yet. Complete project information to track updates.';
        recentUpdatesEl.appendChild(emptyNotice);
        return;
    }
    
    // Create timeline container
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'timeline-container';
    
    // Add project creation as first event
    const projectCreationDate = projectInfo.startDate ? new Date(projectInfo.startDate) : new Date();
    
    const creationItem = document.createElement('div');
    creationItem.className = 'timeline-item';
    creationItem.innerHTML = `
        <div class="timeline-date">${formatDate(projectCreationDate)}</div>
        <div class="timeline-title">Project Created</div>
        <div class="timeline-content">
            Project "${projectInfo.name}" was set up in the system.
        </div>
    `;
    timelineContainer.appendChild(creationItem);
    
    // Add last update event if available
    if (projectInfo.lastUpdated && projectInfo.lastUpdated !== projectInfo.startDate) {
        const updateDate = new Date(projectInfo.lastUpdated);
        
        const updateItem = document.createElement('div');
        updateItem.className = 'timeline-item';
        updateItem.innerHTML = `
            <div class="timeline-date">${formatDate(updateDate)}</div>
            <div class="timeline-title">Project Updated</div>
            <div class="timeline-content">
                Project information or permits were last updated.
            </div>
        `;
        timelineContainer.appendChild(updateItem);
    }
    
    recentUpdatesEl.appendChild(timelineContainer);
}

/**
 * Format status for display
 */
function formatStatus(status) {
    switch (status) {
        case 'pending':
            return 'Pending';
        case 'inprogress':
            return 'In Progress';
        case 'approved':
            return 'Approved';
        case 'notapplicable':
            return 'N/A';
        default:
            return 'Unknown';
    }
}

/**
 * Format date for display
 */
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Refresh the dashboard
 */
function refreshDashboard() {
    // Re-initialize data
    initializeData();
    
    // Update all dashboard components
    loadProjectInfo();
    initializeStatusChart();
    initializeCategoryChart();
    updateOverallProgress();
    updateCategoryProgress();
    populatePendingItems();
    populateRecentUpdates();
    
    // Show success message
    showAlert('Dashboard refreshed with latest data', 'success');
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