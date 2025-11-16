import { useState, useRef, useEffect } from 'react';
import './MultiSelectDropdown.css';
import {  ChevronsUpDown } from 'lucide-react';

const MultiSelectDropdown = ({
  label,
  options = [],
  selectedIds = [],
  onToggle,
  onAddNew,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  addNewPlaceholder = 'Enter name...',
  loading = false,
  error = null,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    if (newItemName.trim() && onAddNew) {
      onAddNew(newItemName.trim());
      setNewItemName('');
      setSearchTerm('');
    }
  };

  const selectedCount = selectedIds.length;
  const displayText = selectedCount > 0 
    ? `${selectedCount} profile${selectedCount > 1 ? 's' : ''} selected`
    : placeholder;

  return (
    <div className="multi-select-wrapper" ref={dropdownRef}>
      {label && (
        <label className="multi-select-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}

      <button
        type="button"
        className={`multi-select-button ${error ? 'multi-select-error' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedCount > 0 ? 'has-selection' : 'no-selection'}>
          {displayText}
        </span>

        <ChevronsUpDown strokeWidth={1} height={14} />
      </button>

      {isOpen && (
        <div className="multi-select-dropdown">
          <div className="dropdown-search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M14 14L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="dropdown-options">
            {loading ? (
              <div className="dropdown-loading">Loading...</div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = selectedIds.includes(option._id);
                return (
                  <div
                    key={option._id}
                    className={`dropdown-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => onToggle(option)}
                  >
                    <div className="option-checkbox">
                      {isSelected && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M11.667 3.5L5.25 9.917 2.333 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="option-text">{option.name}</span>
                  </div>
                );
              })
            ) : (
              <div className="dropdown-empty">No profiles found.</div>
            )}
          </div>

          {onAddNew && (
            <div className="dropdown-add-new">
              <input
                type="text"
                placeholder={addNewPlaceholder}
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddNew()}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                onClick={handleAddNew}
                disabled={!newItemName.trim()}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}

      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default MultiSelectDropdown;