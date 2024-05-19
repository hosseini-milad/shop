

// Function to get filters from URL
// export function getFiltersFromUrl() {
//     const searchParams = new URLSearchParams(window.location.search);
//     const filters = {};
//     for (const [key, value] of searchParams.entries()) {
//       filters[key] = value;
//     }
//     return filters;
//   }
export function getFiltersFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const filters = {};
  for (const [key, value] of searchParams.entries()) {
    // Deserialize the store filter value
    if (key === 'store') {
      filters[key] = JSON.parse(value);
    } else {
      filters[key] = value;
    }
  }
  return filters;
}
  
  // Default filter values
export const defaultFilterValues = {
    offset: "0",
    pageSize: "10",
  };

  // Function to update URL with filters
// export function updateUrlWithFilters(newFilters) {
//     const searchParams = new URLSearchParams(window.location.search);
//     for (const key in newFilters) {
//       if (newFilters[key]) {
//         searchParams.set(key, newFilters[key]);
//       } else {
//         searchParams.delete(key); // Remove the parameter if the value is falsy
//       }
//     }
//     const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//     window.history.replaceState({}, "", newUrl);
//   }
export function updateUrlWithFilters(newFilters) {
  const searchParams = new URLSearchParams(window.location.search);
  for (const key in newFilters) {
    if (newFilters[key]) {
      // Serialize the store filter value
      if (key === 'store') {
        searchParams.set(key, JSON.stringify(newFilters[key]));
      } else {
        searchParams.set(key, newFilters[key]);
      }
    } else {
      searchParams.delete(key); // Remove the parameter if the value is falsy
    }
  }
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

  // Function to handle filter changes
export function handleFilterChange(setFilters) {
    return function(newFilters) {
      setFilters(newFilters);
      updateUrlWithFilters(newFilters);
    };
  }


// Function to handle filter changes
export function handleFilterChangeInFilters(setFilters, updateUrlWithFilters) {
    return function(property, value, prevState) {
      const newValue = value ? (value._id ? value._id : value) : "";
      setFilters((prevState) => ({
        ...prevState,
        [property]: newValue,
      }));
      // Update URL here
      updateUrlWithFilters({
        ...prevState,
        [property]: newValue,
      });
    };
  }