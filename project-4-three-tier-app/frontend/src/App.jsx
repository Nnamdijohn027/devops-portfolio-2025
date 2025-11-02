import React, { useState, useEffect } from 'react'

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001'  // Changed to 5001

function App() {
  const [visitors, setVisitors] = useState(0)
  const [backendInfo, setBackendInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch visitor count
      const visitorsResponse = await fetch(`${API_BASE}/api/visitors`)
      if (visitorsResponse.ok) {
        const visitorsData = await visitorsResponse.json()
        setVisitors(visitorsData.visitors)
      }

      // Fetch backend info
      const infoResponse = await fetch(`${API_BASE}/api/info`)
      if (infoResponse.ok) {
        const infoData = await infoResponse.json()
        setBackendInfo(infoData)
      }

      setError(null)
    } catch (err) {
      setError('Backend service unavailable')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Three-Tier Kubernetes App</h1>
      <p>This demonstrates a full CI/CD pipeline to Kubernetes!</p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Visitor Counter</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>👥 {visitors} visitors</p>
            <button onClick={fetchData} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
              Refresh Count
            </button>
          </>
        )}
      </div>

      {backendInfo && (
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2>Backend Information</h2>
          <pre>{JSON.stringify(backendInfo, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <p><strong>Architecture:</strong> React Frontend → Node.js API → PostgreSQL Database</p>
        <p><strong>Deployment:</strong> Full CI/CD to Kubernetes with GitHub Actions</p>
      </div>
    </div>
  )
}

export default App
