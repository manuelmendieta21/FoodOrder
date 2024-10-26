import React, { useState, useCallback } from 'react';
import { MenuCard } from './components/MenuCard';
import { CategoryFilter } from './components/CategoryFilter';
import { CartBar } from './components/CartBar';
import { TableSelector } from './components/TableSelector';
import { menuItems, categories } from './data/menuItems';
import { tables } from './data/tables';
import { MenuItem, CartItem, Order } from './types';
import { UtensilsCrossed } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const filteredItems = menuItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleAddToCart = useCallback((item: MenuItem) => {
    if (!selectedTable) {
      alert('Please select a table first');
      return;
    }
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, [selectedTable]);

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemoveItem = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleSubmitOrder = useCallback((notes: string) => {
    if (!selectedTable) return;
    
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: Date.now().toString(),
      tableNumber: selectedTable,
      items: [...cartItems],
      status: 'pending',
      total,
      timestamp: new Date(),
      notes,
    };
    // Here you would typically send the order to your backend
    console.log('New order:', newOrder);
    setCartItems([]);
  }, [cartItems, selectedTable]);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">Food Order App</h1>
            </div>
          </div>
        </div>
      </header>

      <CartBar
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onSubmitOrder={handleSubmitOrder}
        selectedTable={selectedTable}
      />

      <main className="max-w-7xl mx-auto px-4 mt-32">
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">1. Select a Table</h2>
            <TableSelector
              tables={tables}
              selectedTable={selectedTable}
              onSelectTable={setSelectedTable}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">2. Choose Your Items</h2>
            {selectedTable ? (
              <>
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Please select a table first to start ordering
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;