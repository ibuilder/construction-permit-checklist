# Construction Project Permit Checklist

A comprehensive web application for managing construction project permits, approvals, and inspections. This application helps construction teams track permit statuses, assign responsibilities, and monitor progress throughout the construction lifecycle.

## Features

- Interactive permit checklist with status tracking
- Project dashboard with progress visualization
- Four main categories of construction permits and requirements:
  - Permit and Plancheck Items
  - Utility Fees and Assessments
  - Special Approvals and Requirements
  - Testing and Inspection
- Ability to assign responsibilities to team members
- Add cost estimates and notes for each permit item
- Filter and search functionality
- Progress tracking and status updates
- Local storage for saving project data

## File Structure

```
construction-permit-checklist/
├── css/
│   ├── style.css                # Main application styles
│   └── dashboard.css            # Dashboard-specific styles
├── js/
│   ├── checklist.js             # Interactive checklist functionality
│   ├── dashboard.js             # Dashboard visualization scripts
│   ├── data.js                  # Data management for permit items
│   └── utils.js                 # Utility functions for the application
├── pages/
│   ├── checklist.html           # Interactive checklist page
│   ├── dashboard.html           # Project dashboard page
│   ├── permits-planchecks.html  # Permit and Plancheck details page
│   ├── utilities.html           # Utility Fees details page
│   ├── special-approvals.html   # Special Approvals details page
│   ├── testing-inspection.html  # Testing and Inspection details page
│   └── resources.html           # Resources and help page
├── index.html                   # Main landing page
└── README.md                    # Project documentation
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Navigate through the permit categories
4. Use the interactive checklist to track your project's permits

## Usage

### Setting Up Project Information

1. Navigate to the Interactive Checklist page
2. Enter your project details in the Project Information card
3. Click "Save Project Info" to store your data

### Managing Permit Items

1. Navigate to the desired permit category tab
2. For each permit item, assign a responsibility and set a status
3. Add cost estimates and notes as needed
4. Track progress on the dashboard

### Filtering and Searching

- Use the search box to find specific permit items
- Filter by status to focus on pending, in-progress, or approved items

## Browser Compatibility

This application is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- Bootstrap 5.3.0
- Font Awesome 6.0.0

## License

This project is available for use under the MIT License.