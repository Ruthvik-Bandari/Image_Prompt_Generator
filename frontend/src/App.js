import React, { useState } from 'react';

const ImagePromptGenerator = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
      setResults(null);
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('https://image-prompt-generator-68as.onrender.com/api/v1/analyze/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Error analyzing image: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, buttonElement) => {
    navigator.clipboard.writeText(text);
    const originalText = buttonElement.textContent;
    buttonElement.textContent = '✓ Copied!';
    buttonElement.style.backgroundColor = '#10b981';
    setTimeout(() => {
      buttonElement.textContent = originalText;
      buttonElement.style.backgroundColor = '#2563eb';
    }, 2000);
  };

  const formatJson = (json) => {
    return JSON.stringify(json, null, 2);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(37, 99, 235, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 30%),
        radial-gradient(circle at 80% 50%, rgba(29, 78, 216, 0.15) 0%, transparent 30%),
        linear-gradient(125deg, #000000 0%, #0f172a 25%, #020617 50%, #0c1f3d 75%, #000000 100%)
      `,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.4,
        background: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(59, 130, 246, 0.03) 35px,
            rgba(59, 130, 246, 0.03) 70px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 35px,
            rgba(37, 99, 235, 0.02) 35px,
            rgba(37, 99, 235, 0.02) 70px
          )
        `,
        pointerEvents: 'none'
      }}></div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', position: 'relative', zIndex: 1 }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
            marginBottom: '1rem' 
          }}>
            AI Image Analysis & Prompt Generator
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8' }}>
            Upload an image to generate multiple prompt formats for AI image/video generation
          </p>
        </header>

        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(59, 130, 246, 0.2)',
          border: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
              border: '2px dashed rgba(59, 130, 246, 0.3)',
              borderRadius: '16px',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              {preview ? (
                <div>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxHeight: '400px',
                      margin: '0 auto',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                  <button
                    onClick={() => document.getElementById('fileInput').click()}
                    style={{
                      marginTop: '1rem',
                      padding: '0.75rem 1.5rem',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      display: 'block',
                      margin: '1rem auto 0'
                    }}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 1rem',
                    opacity: '0.6'
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p style={{ fontSize: '1.25rem', color: '#93c5fd', marginBottom: '0.5rem' }}>
                    Click to upload or drag and drop
                  </p>
                  <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <button
                    onClick={() => document.getElementById('fileInput').click()}
                    style={{
                      padding: '1rem 2rem',
                      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                      color: 'white',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transform: 'scale(1)',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 4px 14px rgba(59, 130, 246, 0.4)';
                    }}
                  >
                    Select Image
                  </button>
                </div>
              )}
              <input
                id="fileInput"
                type="file"
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>

            {selectedFile && (
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  style={{
                    padding: '1rem 3rem',
                    background: loading ? '#6b7280' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? '0.5' : '1'
                  }}
                >
                  {loading ? 'Analyzing...' : 'Analyze Image'}
                </button>
              </div>
            )}
          </div>

          {error && (
            <div style={{
              padding: '1rem',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              color: '#fca5a5',
              marginBottom: '1.5rem'
            }}>
              {error}
            </div>
          )}

          {results && !results.error && (
            <div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
                padding: '0.25rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                {[
                  { id: 'description', label: '📝 Description' },
                  { id: 'json', label: '{ } JSON Format' },
                  { id: 'toon', label: '🎨 Cartoon Style' },
                  { id: 'detailed', label: '🔍 Detailed Prompt' },
                  { id: 'cinematic', label: '🎬 Cinematic' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: activeTab === tab.id 
                        ? 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)' 
                        : 'transparent',
                      color: activeTab === tab.id ? 'white' : '#64748b',
                      border: activeTab === tab.id ? '1px solid rgba(59, 130, 246, 0.3)' : 'none',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: activeTab === tab.id ? '0 2px 8px rgba(59, 130, 246, 0.3)' : 'none'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
              }}>
                {activeTab === 'description' && (
                  <div>
                    <h3 style={{ color: '#93c5fd', marginBottom: '1rem' }}>Image Description</h3>
                    <p style={{ color: '#cbd5e1', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {results.description}
                    </p>
                    <button
                      onClick={(e) => copyToClipboard(results.description, e.target)}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#2563eb',
                        color: 'white',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      📋 Copy Description
                    </button>
                  </div>
                )}

                {activeTab === 'json' && (
                  <div>
                    <h3 style={{ color: '#93c5fd', marginBottom: '1rem' }}>JSON Prompt Structure</h3>
                    <pre style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      padding: '1rem',
                      borderRadius: '8px',
                      overflowX: 'auto',
                      color: '#60a5fa',
                      fontSize: '0.9rem',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      {formatJson(results.jsonPrompt)}
                    </pre>
                    <button
                      onClick={(e) => copyToClipboard(formatJson(results.jsonPrompt), e.target)}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#2563eb',
                        color: 'white',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      📋 Copy JSON
                    </button>
                  </div>
                )}

                {activeTab === 'toon' && (
                  <div>
                    <h3 style={{ color: '#93c5fd', marginBottom: '1rem' }}>Cartoon Style Prompt</h3>
                    <p style={{
                      color: '#cbd5e1',
                      lineHeight: '1.6',
                      background: 'rgba(37, 99, 235, 0.1)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      {results.toonPrompt}
                    </p>
                    <button
                      onClick={(e) => copyToClipboard(results.toonPrompt, e.target)}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#2563eb',
                        color: 'white',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      📋 Copy Cartoon Prompt
                    </button>
                  </div>
                )}

                {activeTab === 'detailed' && results.detailedPrompt && (
                  <div>
                    <h3 style={{ color: '#93c5fd', marginBottom: '1rem' }}>Detailed Prompt Structure</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {Object.entries(results.detailedPrompt).map(([key, value]) => (
                        <div key={key} style={{
                          background: 'rgba(59, 130, 246, 0.15)',
                          padding: '0.75rem',
                          borderRadius: '6px'
                        }}>
                          <span style={{ color: '#93c5fd', fontWeight: '600', textTransform: 'capitalize' }}>
                            {key}:
                          </span>
                          <span style={{ color: '#cbd5e1', marginLeft: '0.5rem' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => copyToClipboard(
                        Object.entries(results.detailedPrompt)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join('\n'),
                        e.target
                      )}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#2563eb',
                        color: 'white',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      📋 Copy Detailed Prompt
                    </button>
                  </div>
                )}

                {activeTab === 'cinematic' && (
                  <div>
                    <h3 style={{ color: '#93c5fd', marginBottom: '1rem' }}>Cinematic Prompt</h3>
                    <p style={{
                      color: '#cbd5e1',
                      lineHeight: '1.6',
                      background: 'rgba(251, 146, 60, 0.1)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(251, 146, 60, 0.2)'
                    }}>
                      {results.cinematicPrompt}
                    </p>
                    <button
                      onClick={(e) => copyToClipboard(results.cinematicPrompt, e.target)}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#2563eb',
                        color: 'white',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      📋 Copy Cinematic Prompt
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <footer style={{ textAlign: 'center', marginTop: '3rem', color: '#64748b' }}>
          <p>Masters Final Project - Image Prompt Generator v1.0</p>
          <p style={{ marginTop: '0.5rem' }}>Built with Spring Boot & React</p>
        </footer>
      </div>
    </div>
  );
};

export default ImagePromptGenerator;