import { useState, useEffect } from 'react'
import './App.css'

interface ClothingItem {
  id: number
  name: string
  imageUrl: string
  category: string
}

function App() {
  const [items, setItems] = useState<ClothingItem[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [uploading, setUploading] = useState(false)

  const fetchItems = async () => {
    const res = await fetch('http://localhost:8080/api/items')
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !name) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)

    await fetch('http://localhost:8080/api/items/upload', {
      method: 'POST',
      body: formData,
    })

    setFile(null)
    setName('')
    setUploading(false)
    fetchItems()
  }

  return (
    <div className="app">
      <header>
        <h1>My Wardrobe</h1>
      </header>

      <section className="upload-section">
        <h2>Add Item</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="text"
            placeholder="Item name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files?.[0] ?? null)}
            required
          />
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </section>

      <section className="wardrobe-section">
        <h2>My Items</h2>
        {items.length === 0 ? (
          <p className="empty">No items yet. Upload something!</p>
        ) : (
          <div className="wardrobe-grid">
            {items.map(item => (
              <div key={item.id} className="item-card">
                <img src={item.imageUrl} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default App
