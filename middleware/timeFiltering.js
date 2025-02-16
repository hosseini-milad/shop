// Helper function for time filtering
const getTimeFilter = (filter) => {
    const now = new Date();
    let startDate;

    switch (filter) {
        case 'day':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case 'week':
            const weekStart = now.getDate() - now.getDay();
            startDate = new Date(now.getFullYear(), now.getMonth(), weekStart);
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        case 'all':
        default:
            startDate = null;
            break;
    }

    return startDate ? { initDate: { $gte: startDate } } : {};
};

module.exports = getTimeFilter;