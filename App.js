import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

// Mock data generator for demonstration
const generateMockData = () => {
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const genders = ['Male', 'Female', 'Other'];
  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Home'];
  const tags = ['Premium', 'Budget', 'Seasonal', 'Clearance', 'New'];
  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'];
  const orderStatuses = ['Completed', 'Pending', 'Cancelled', 'Processing'];
  const deliveryTypes = ['Home Delivery', 'Store Pickup', 'Express'];
  const names = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown', 
                 'Sarah Wilson', 'David Lee', 'Lisa Anderson', 'James Taylor', 'Maria Garcia',
                 'Christopher Martin', 'Jessica Martinez', 'Daniel Rodriguez', 'Ashley Lopez',
                 'Matthew Hernandez', 'Amanda Gonzalez', 'Andrew Wilson', 'Melissa Moore'];
  
  const data = [];
  for (let i = 1; i <= 150; i++) {
    const quantity = Math.floor(Math.random() * 10) + 1;
    const pricePerUnit = Math.floor(Math.random() * 500) + 50;
    const discount = Math.floor(Math.random() * 30);
    const totalAmount = quantity * pricePerUnit;
    const finalAmount = totalAmount - (totalAmount * discount / 100);
    
    data.push({
      customerId: `C${String(i).padStart(4, '0')}`,
      customerName: names[Math.floor(Math.random() * names.length)],
      phoneNumber: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      gender: genders[Math.floor(Math.random() * genders.length)],
      age: Math.floor(Math.random() * 50) + 18,
      customerRegion: regions[Math.floor(Math.random() * regions.length)],
      customerType: Math.random() > 0.5 ? 'Regular' : 'Premium',
      productId: `P${String(i).padStart(4, '0')}`,
      productName: `Product ${i}`,
      brand: `Brand ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
      productCategory: categories[Math.floor(Math.random() * categories.length)],
      tags: tags[Math.floor(Math.random() * tags.length)],
      quantity,
      pricePerUnit,
      discountPercentage: discount,
      totalAmount,
      finalAmount,
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      orderStatus: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
      deliveryType: deliveryTypes[Math.floor(Math.random() * deliveryTypes.length)],
      storeId: `S${String(Math.floor(Math.random() * 20) + 1).padStart(3, '0')}`,
      storeLocation: `Location ${Math.floor(Math.random() * 10) + 1}`,
      salespersonId: `SP${String(Math.floor(Math.random() * 30) + 1).padStart(3, '0')}`,
      employeeName: names[Math.floor(Math.random() * names.length)]
    });
  }
  return data;
};

const SalesManagementSystem = () => {
  const [allData] = useState(generateMockData());
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date-desc');
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    regions: [],
    genders: [],
    ageRange: { min: '', max: '' },
    categories: [],
    tags: [],
    paymentMethods: [],
    dateRange: { start: '', end: '' }
  });

  const itemsPerPage = 10;

  // Extract unique values for filters
  const filterOptions = useMemo(() => ({
    regions: [...new Set(allData.map(d => d.customerRegion))],
    genders: [...new Set(allData.map(d => d.gender))],
    categories: [...new Set(allData.map(d => d.productCategory))],
    tags: [...new Set(allData.map(d => d.tags))],
    paymentMethods: [...new Set(allData.map(d => d.paymentMethod))]
  }), [allData]);

  // Filter and search logic
  const filteredData = useMemo(() => {
    let result = allData;

    // Search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.customerName.toLowerCase().includes(search) ||
        item.phoneNumber.toLowerCase().includes(search)
      );
    }

    // Filters
    if (filters.regions.length > 0) {
      result = result.filter(item => filters.regions.includes(item.customerRegion));
    }
    
    if (filters.genders.length > 0) {
      result = result.filter(item => filters.genders.includes(item.gender));
    }
    
    if (filters.ageRange.min || filters.ageRange.max) {
      result = result.filter(item => {
        const age = item.age;
        const min = filters.ageRange.min ? parseInt(filters.ageRange.min) : 0;
        const max = filters.ageRange.max ? parseInt(filters.ageRange.max) : 150;
        return age >= min && age <= max;
      });
    }
    
    if (filters.categories.length > 0) {
      result = result.filter(item => filters.categories.includes(item.productCategory));
    }
    
    if (filters.tags.length > 0) {
      result = result.filter(item => filters.tags.includes(item.tags));
    }
    
    if (filters.paymentMethods.length > 0) {
      result = result.filter(item => filters.paymentMethods.includes(item.paymentMethod));
    }
    
    if (filters.dateRange.start || filters.dateRange.end) {
      result = result.filter(item => {
        const itemDate = new Date(item.date);
        const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : new Date(0);
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : new Date();
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    return result;
  }, [allData, searchTerm, filters]);

  // Sorting logic
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    
    switch (sortBy) {
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'quantity-desc':
        return sorted.sort((a, b) => b.quantity - a.quantity);
      case 'quantity-asc':
        return sorted.sort((a, b) => a.quantity - b.quantity);
      case 'name-asc':
        return sorted.sort((a, b) => a.customerName.localeCompare(b.customerName));
      case 'name-desc':
        return sorted.sort((a, b) => b.customerName.localeCompare(a.customerName));
      default:
        return sorted;
    }
  }, [filteredData, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (Array.isArray(prev[filterType])) {
        const newValues = prev[filterType].includes(value)
          ? prev[filterType].filter(v => v !== value)
          : [...prev[filterType], value];
        return { ...prev, [filterType]: newValues };
      }
      return { ...prev, [filterType]: value };
    });
  };

  const clearFilters = () => {
    setFilters({
      regions: [],
      genders: [],
      ageRange: { min: '', max: '' },
      categories: [],
      tags: [],
      paymentMethods: [],
      dateRange: { start: '', end: '' }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Retail Sales Management</h1>
          <p className="text-gray-600">Search, filter, and analyze sales transactions</p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by customer name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="quantity-desc">Quantity (High to Low)</option>
              <option value="quantity-asc">Quantity (Low to High)</option>
              <option value="name-asc">Customer Name (A-Z)</option>
              <option value="name-desc">Customer Name (Z-A)</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {paginatedData.length} of {sortedData.length} results
            {sortedData.length !== allData.length && ` (filtered from ${allData.length} total)`}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Region Filter */}
              <div>
                <h3 className="font-medium mb-2">Region</h3>
                <div className="space-y-2">
                  {filterOptions.regions.map(region => (
                    <label key={region} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.regions.includes(region)}
                        onChange={() => handleFilterChange('regions', region)}
                        className="mr-2"
                      />
                      <span className="text-sm">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div>
                <h3 className="font-medium mb-2">Gender</h3>
                <div className="space-y-2">
                  {filterOptions.genders.map(gender => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.genders.includes(gender)}
                        onChange={() => handleFilterChange('genders', gender)}
                        className="mr-2"
                      />
                      <span className="text-sm">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Range */}
              <div>
                <h3 className="font-medium mb-2">Age Range</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.ageRange.min}
                    onChange={(e) => handleFilterChange('ageRange', { ...filters.ageRange, min: e.target.value })}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="self-center">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.ageRange.max}
                    onChange={(e) => handleFilterChange('ageRange', { ...filters.ageRange, max: e.target.value })}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <div className="space-y-2">
                  {filterOptions.categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => handleFilterChange('categories', category)}
                        className="mr-2"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div>
                <h3 className="font-medium mb-2">Tags</h3>
                <div className="space-y-2">
                  {filterOptions.tags.map(tag => (
                    <label key={tag} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag)}
                        onChange={() => handleFilterChange('tags', tag)}
                        className="mr-2"
                      />
                      <span className="text-sm">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method Filter */}
              <div>
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="space-y-2">
                  {filterOptions.paymentMethods.map(method => (
                    <label key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.paymentMethods.includes(method)}
                        onChange={() => handleFilterChange('paymentMethods', method)}
                        className="mr-2"
                      />
                      <span className="text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="md:col-span-2">
                <h3 className="font-medium mb-2">Date Range</h3>
                <div className="flex gap-4">
                  <div>
                    <label className="text-sm text-gray-600">From</label>
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                      className="block w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">To</label>
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                      className="block w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.customerName}</div>
                        <div className="text-sm text-gray-500">{item.phoneNumber}</div>
                        <div className="text-xs text-gray-400">{item.customerRegion} • {item.gender}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{item.productName}</div>
                        <div className="text-sm text-gray-500">{item.productCategory}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">₹{item.finalAmount.toFixed(2)}</div>
                        {item.discountPercentage > 0 && (
                          <div className="text-xs text-green-600">{item.discountPercentage}% off</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                          item.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          item.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No results found. Try adjusting your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesManagementSystem;