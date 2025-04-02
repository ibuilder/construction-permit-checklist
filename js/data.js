/**
 * data.js - Data management for the Construction Project Permit Checklist
 * Contains all permit item data and storage management functions
 */

// Initialize permit items from local storage or default data
const permitItems = [
    { id: 'p1', name: 'Architectural Planning Board Approval', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p2', name: 'Filing Fee', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p3', name: 'Planning Fee', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p4', name: 'Preliminary Soils Report (Borings)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p5', name: 'Environmental Fee (Review EIR)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p6', name: 'Demolition Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p7', name: 'Building Department Permit and Plan Check', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p8', name: 'Precise Grading Plan', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p9', name: 'Shoring Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p10', name: 'Grading Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p11', name: 'Foundation Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p12', name: 'Structural Frame Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p13', name: 'Public Improvements Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p14', name: 'OSHPD Plan Check and Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p15', name: 'ODS (Office of Design Services) Plancheck', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p16', name: 'ORS (Office of Regulatory Services) Plancheck', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p17', name: 'Tenant Improvement Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p18', name: 'Department of Public Works Plancheck', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p19', name: 'Fire Marshall Plancheck', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p20', name: 'Electrical Plancheck and Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p21', name: 'Mechanical Plancheck and Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p22', name: 'Self-Regulating Agency Plan Check', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p23', name: 'State Agency Plancheck', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p24', name: 'Unified School District Authority', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p25', name: 'Police Department Approval', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p26', name: 'Core and Shell Permit', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p27', name: 'OSHA Permits', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p28', name: 'Tie-back Easement', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p29', name: 'Encroachment Fee (Adjacent)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'p30', name: 'Plan Check Expediting', responsibility: '', status: 'pending', estimate: '', notes: '' },
];

// Utility Fees and Assessments
const utilityItems = [
    { id: 'u1', name: 'Underground Utility Easements', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u2', name: 'Sewer Tap and Impact Fees', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u3', name: 'Storm Drain Tap Fee', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u4', name: 'Storm Drainage Impact (Water Storage)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u5', name: 'Water Impact Fees', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u6', name: 'Public Services Impact Fees', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u7', name: 'Utility Relocation Fees (Electrical, Sewer, Gas)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u8', name: 'Transit District Fees', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u9', name: 'Underground Transit Fees', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u10', name: 'Automatic Transfer Switch Fee', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u11', name: 'Water Meter', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u12', name: 'Gas Connection Fees (meter)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u13', name: 'Electric Connection Fees (meter)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u14', name: 'Cable Connection Fees (Data)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u15', name: 'Telephone Service Origination Fee', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u16', name: 'Consumption Fees', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u17', name: 'Sidewalk Closure Permits', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u18', name: 'Street Use Permits', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u19', name: 'Street Lighting Assessment', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u20', name: 'Traffic Impact Assessment', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u21', name: '"B" Permit Work (Public right-of-way)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u22', name: 'Joint-Trench Work', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 'u23', name: 'Sewer Inspection Fee (video existing sewer)', responsibility: '', status: 'pending', estimate: '', notes: '' },
];

// Special Approvals and Requirements
const specialItems = [
    { id: 's1', name: 'SWPPP (Storm Water Pollution Prevention) Fee', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's2', name: 'AQMD (Air Quality Management District)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's3', name: 'Community Outreach Plan', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's4', name: 'Noise Abatement Plan', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's5', name: 'Seismic Survey and Program Fee', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's6', name: 'School Assessment and School District Fees', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's7', name: 'Coastal Development Commission Approval', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's8', name: 'Parks & Recreation Assessments', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's9', name: 'Hazardous Abatement Permit and Fee', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's10', name: 'Environmental Habitat Fees', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's11', name: 'Approval to Work within Utility Easements', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's12', name: 'Acreage Reserve Fees (water rights)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's13', name: 'Water Quality Board', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's14', name: 'Handicap Access Fee (ADA)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's15', name: 'Community Redevelopment Agency Fee', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's16', name: 'Business License Fee', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's17', name: 'Mapping Fee (Boundary Survey)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's18', name: 'Planning Commission Process', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's19', name: 'Design Review Process', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's20', name: 'Selection Process (Artwork Approval)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's21', name: 'Corp. of Engineers', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's22', name: 'Fire District Assessments', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's23', name: 'Low Income Housing Assessment', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's24', name: 'Lighting District Assessment', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 's25', name: 'FAA Permit and Assessment', responsibility: '', status: 'pending', estimate: '', notes: '' },
];

// Testing and Inspection
const testingItems = [
    { id: 't1', name: 'City Inspection Fees (includes all Disciplines)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't2', name: 'Lab Testing', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't3', name: 'Soils compaction testing (engineering)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't4', name: 'Certification of Building Pads', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't5', name: 'Materials Testing Program', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't6', name: 'Concrete strength tests (Cylinders)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't7', name: 'Masonry grout and mortar strength tests', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't8', name: 'Fireproofing inspection', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't9', name: 'Roofing inspection (consultant)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't10', name: 'Curtainwall testing', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't11', name: 'Special testing (water, wind, and seismic)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't12', name: 'Welding and bolt torque inspection & testing', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't13', name: 'Shop fabrication inspections (off-site)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't14', name: 'Commissioning inspections', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't15', name: 'Overtime inspection fees', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't16', name: '"Re-inspection" fees (changes & failed tests)', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't17', name: 'City Planning Inspection', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't18', name: 'Factory Mutual Inspections', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't19', name: 'Safety and OSHA Inspections', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't20', name: 'Off-site Special Inspections', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't21', name: 'Health Department Inspections', responsibility: '', status: 'pending', estimate: '', notes: '' },
    { id: 't22', name: 'Early Occupancy Inspection', responsibility: '', status: 'pending', estimate: '', notes: '' },
];

// Project Information
let projectInfo = {
    name: '',
    location: '',
    manager: '',
    startDate: '',
    lastUpdated: ''
};

/**
 * Initialize data from local storage
 */
function initializeData() {
    // Load project info
    const savedProjectInfo = localStorage.getItem('projectInfo');
    if (savedProjectInfo) {
        projectInfo = JSON.parse(savedProjectInfo);
    }
    
    // Load permit items
    const savedPermitItems = localStorage.getItem('permitItems');
    if (savedPermitItems) {
        Object.assign(permitItems, JSON.parse(savedPermitItems));
    }
    
    // Load utility items
    const savedUtilityItems = localStorage.getItem('utilityItems');
    if (savedUtilityItems) {
        Object.assign(utilityItems, JSON.parse(savedUtilityItems));
    }
    
    // Load special items
    const savedSpecialItems = localStorage.getItem('specialItems');
    if (savedSpecialItems) {
        Object.assign(specialItems, JSON.parse(savedSpecialItems));
    }
    
    // Load testing items
    const savedTestingItems = localStorage.getItem('testingItems');
    if (savedTestingItems) {
        Object.assign(testingItems, JSON.parse(savedTestingItems));
    }
}

/**
 * Save data to local storage
 */
function saveData() {
    localStorage.setItem('projectInfo', JSON.stringify(projectInfo));
    localStorage.setItem('permitItems', JSON.stringify(permitItems));
    localStorage.setItem('utilityItems', JSON.stringify(utilityItems));
    localStorage.setItem('specialItems', JSON.stringify(specialItems));
    localStorage.setItem('testingItems', JSON.stringify(testingItems));
    
    // Update last saved timestamp
    projectInfo.lastUpdated = new Date().toISOString();
    localStorage.setItem('projectInfo', JSON.stringify(projectInfo));
}

/**
 * Get item by ID from all categories
 */
function getItemById(id) {
    const category = id.charAt(0);
    const itemArray = 
        category === 'p' ? permitItems :
        category === 'u' ? utilityItems :
        category === 's' ? specialItems :
        category === 't' ? testingItems : null;
    
    if (!itemArray) return null;
    
    return itemArray.find(item => item.id === id);
}

/**
 * Update item by ID
 */
function updateItem(id, updatedData) {
    const item = getItemById(id);
    if (item) {
        Object.assign(item, updatedData);
        saveData();
        return true;
    }
    return false;
}

/**
 * Get counts for dashboard
 */
function getStatusCounts() {
    const allItems = [...permitItems, ...utilityItems, ...specialItems, ...testingItems];
    
    const counts = {
        total: allItems.length,
        pending: allItems.filter(item => item.status === 'pending').length,
        inprogress: allItems.filter(item => item.status === 'inprogress').length,
        approved: allItems.filter(item => item.status === 'approved').length,
        notapplicable: allItems.filter(item => item.status === 'notapplicable').length
    };
    
    counts.completed = counts.approved + counts.notapplicable;
    counts.progress = Math.round((counts.completed / counts.total) * 100);
    
    return counts;
}

/**
 * Get category progress counts
 */
function getCategoryProgress() {
    const permitTotal = permitItems.length;
    const permitComplete = permitItems.filter(item => 
        item.status === 'approved' || item.status === 'notapplicable'
    ).length;
    
    const utilityTotal = utilityItems.length;
    const utilityComplete = utilityItems.filter(item => 
        item.status === 'approved' || item.status === 'notapplicable'
    ).length;
    
    const specialTotal = specialItems.length;
    const specialComplete = specialItems.filter(item => 
        item.status === 'approved' || item.status === 'notapplicable'
    ).length;
    
    const testingTotal = testingItems.length;
    const testingComplete = testingItems.filter(item => 
        item.status === 'approved' || item.status === 'notapplicable'
    ).length;
    
    return {
        permit: {
            total: permitTotal,
            complete: permitComplete,
            progress: Math.round((permitComplete / permitTotal) * 100)
        },
        utility: {
            total: utilityTotal,
            complete: utilityComplete,
            progress: Math.round((utilityComplete / utilityTotal) * 100)
        },
        special: {
            total: specialTotal,
            complete: specialComplete,
            progress: Math.round((specialComplete / specialTotal) * 100)
        },
        testing: {
            total: testingTotal,
            complete: testingComplete,
            progress: Math.round((testingComplete / testingTotal) * 100)
        }
    };
}

/**
 * Export data for reporting
 */
function exportChecklistData() {
    const data = {
        projectInfo: projectInfo,
        categories: {
            permitItems: permitItems,
            utilityItems: utilityItems,
            specialItems: specialItems,
            testingItems: testingItems
        },
        statistics: getStatusCounts(),
        categoryProgress: getCategoryProgress(),
        exportDate: new Date().toISOString()
    };
    
    return data;
}