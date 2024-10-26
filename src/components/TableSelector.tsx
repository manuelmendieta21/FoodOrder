import React from 'react';
import { Table } from '../types';

interface TableSelectorProps {
  tables: Table[];
  selectedTable: number | null;
  onSelectTable: (tableId: number) => void;
}

export const TableSelector: React.FC<TableSelectorProps> = ({
  tables,
  selectedTable,
  onSelectTable,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {tables.map((table) => (
        <button
          key={table.id}
          onClick={() => onSelectTable(table.id)}
          className={`
            p-4 rounded-lg border-2 transition-all
            ${
              selectedTable === table.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-400'
            }
          `}
        >
          <div className="text-lg font-semibold">Table {table.id}</div>
          <div className="text-sm text-gray-600">{table.seats} seats</div>
          <div className={`text-sm ${table.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
            {table.status}
          </div>
        </button>
      ))}
    </div>
  );
};