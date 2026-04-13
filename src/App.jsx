import React, { useState, useEffect } from 'react';
import { Upload, Send, Heart } from 'lucide-react';

export default function BiafraMemorial() {
  const [timeLeft, setTimeLeft] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    story: '',
    photo: null
  });
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Sample tributes (in production, these would come from backend after moderation)
  const [tributes] = useState([
    {
      id: 1,
      name: "Chinwe Okafor",
      story: "My grandmother survived the starvation. She told us stories of resilience, of mothers who shared their last cups of garri, of children who sang even when their bellies were empty. We remember. We honor. We stand.",
      photo: null
    },
    {
      id: 2,
      name: "Emeka Nwosu",
      story: "For the three million souls who never got to see independence. For the children who never grew old. For the dreams that were stolen. Your sacrifice planted seeds that still grow in us today. Ọzọ emena - never again.",
      photo: null
    },
    {
      id: 3,
      name: "Ada Eze",
      story: "My father was 7 years old when it ended. The trauma lived in his silence, in the way he never wasted food, in the tears he shed every May 30th. This memorial is for him, for all who carry that weight. We remember you.",
      photo: null
    }
  ]);

  // Countdown to May 30th
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetYear = now.getMonth() > 4 || (now.getMonth() === 4 && now.getDate() > 30) 
        ? now.getFullYear() + 1 
        : now.getFullYear();
      const target = new Date(targetYear, 4, 30, 0, 0, 0);
      const difference = target - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'story') {
      setCharCount(value.length);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.story.trim()) {
      newErrors.story = 'Story is required';
    } else if (formData.story.length < 500) {
      newErrors.story = 'Story must be at least 500 characters';
    } else if (formData.story.length > 800) {
      newErrors.story = 'Story must not exceed 800 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // In production, send to backend for moderation
      console.log('Submitting:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', story: '', photo: null });
        setCharCount(0);
        setSubmitted(false);
      }, 5000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0f0f 100%)',
      color: '#f5f5f5',
      fontFamily: "'Crimson Text', serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .rising-sun {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, #ffd700 0%, #d4af37 50%, transparent 70%);
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 60px rgba(255, 215, 0, 0.4);
        }
        
        .rising-sun::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200%;
          height: 200%;
          background: 
            linear-gradient(0deg, transparent 48%, #ffd700 50%, transparent 52%),
            linear-gradient(45deg, transparent 48%, #ffd700 50%, transparent 52%),
            linear-gradient(90deg, transparent 48%, #ffd700 50%, transparent 52%),
            linear-gradient(135deg, transparent 48%, #ffd700 50%, transparent 52%);
          opacity: 0.3;
        }
        
        .tribute-card {
          background: rgba(20, 20, 20, 0.6);
          border: 1px solid rgba(220, 38, 38, 0.2);
          border-radius: 4px;
          padding: 2rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .tribute-card:hover {
          border-color: rgba(220, 38, 38, 0.5);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(220, 38, 38, 0.15);
        }
        
        input, textarea {
          font-family: 'Inter', sans-serif;
        }
        
        ::placeholder {
          color: #666;
        }
      `}</style>

      {/* Header */}
      <header style={{
        textAlign: 'center',
        padding: '4rem 2rem 2rem',
        borderBottom: '1px solid rgba(220, 38, 38, 0.2)'
      }} className="fade-in-up">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '2rem'
        }}>
          <div className="rising-sun"></div>
        </div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 700,
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #dc2626, #ffd700, #16a34a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Biafra Genocide Memorial
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#a0a0a0',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.6,
          fontStyle: 'italic'
        }}>
          A living memorial where we remember and commemorate our heroes and heroines past and present
        </p>
      </header>

      {/* Countdown Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(220, 38, 38, 0.05) 100%)'
      }} className="fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '3rem',
          color: '#dc2626',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontSize: '0.875rem'
        }}>
          Until May 30th
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {['days', 'hours', 'minutes', 'seconds'].map((unit, idx) => (
            <div key={unit} style={{
              background: 'rgba(220, 38, 38, 0.1)',
              border: '2px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '8px',
              padding: '2rem 1rem',
              animationDelay: `${0.3 + idx * 0.1}s`
            }} className="fade-in-up">
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: '#ffd700',
                marginBottom: '0.5rem',
                fontFamily: 'Inter, sans-serif'
              }} className="pulse">
                {timeLeft[unit] || 0}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#a0a0a0',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: 'Inter, sans-serif'
              }}>
                {unit}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tribute Wall */}
      <section style={{
        padding: '5rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          textAlign: 'center',
          fontWeight: 600
        }}>
          Wall of Remembrance
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#a0a0a0',
          marginBottom: '3rem',
          fontSize: '1.125rem',
          fontStyle: 'italic'
        }}>
          Voices of memory, stories of resilience
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {tributes.map((tribute, idx) => (
            <div 
              key={tribute.id} 
              className="tribute-card fade-in-up"
              style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
                gap: '0.75rem'
              }}>
                <Heart size={20} style={{ color: '#dc2626', flexShrink: 0 }} />
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#ffd700'
                }}>
                  {tribute.name}
                </h3>
              </div>
              <p style={{
                lineHeight: 1.8,
                color: '#d0d0d0',
                fontSize: '1.0625rem'
              }}>
                {tribute.story}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Submission Form */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(180deg, transparent 0%, rgba(22, 163, 74, 0.05) 100%)',
        borderTop: '1px solid rgba(22, 163, 74, 0.2)'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: 600
          }}>
            Share Your Tribute
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#a0a0a0',
            marginBottom: '3rem',
            fontSize: '1.125rem',
            fontStyle: 'italic'
          }}>
            Your story will be reviewed before appearing on the memorial
          </p>

          {submitted && (
            <div style={{
              background: 'rgba(22, 163, 74, 0.2)',
              border: '2px solid rgba(22, 163, 74, 0.5)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem',
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif'
            }}>
              <p style={{ color: '#4ade80', fontSize: '1.125rem' }}>
                Thank you. Your tribute has been submitted for review.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Name */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#ffd700',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: 'Inter, sans-serif'
              }}>
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(20, 20, 20, 0.8)',
                  border: `2px solid ${errors.name ? '#dc2626' : 'rgba(255, 215, 0, 0.3)'}`,
                  borderRadius: '4px',
                  color: '#f5f5f5',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ffd700'}
                onBlur={(e) => !errors.name && (e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)')}
              />
              {errors.name && (
                <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem', fontFamily: 'Inter, sans-serif' }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#ffd700',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: 'Inter, sans-serif'
              }}>
                Email * <span style={{ color: '#a0a0a0', textTransform: 'none', fontSize: '0.75rem' }}>(Private)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(20, 20, 20, 0.8)',
                  border: `2px solid ${errors.email ? '#dc2626' : 'rgba(255, 215, 0, 0.3)'}`,
                  borderRadius: '4px',
                  color: '#f5f5f5',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ffd700'}
                onBlur={(e) => !errors.email && (e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)')}
              />
              {errors.email && (
                <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem', fontFamily: 'Inter, sans-serif' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Story */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#ffd700',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: 'Inter, sans-serif'
              }}>
                Your Story * <span style={{ color: '#a0a0a0', textTransform: 'none', fontSize: '0.75rem' }}>(500-800 characters)</span>
              </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleInputChange}
                rows={6}
                placeholder="Share your memory, your connection, your tribute..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(20, 20, 20, 0.8)',
                  border: `2px solid ${errors.story ? '#dc2626' : 'rgba(255, 215, 0, 0.3)'}`,
                  borderRadius: '4px',
                  color: '#f5f5f5',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: "'Crimson Text', serif",
                  lineHeight: 1.6,
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ffd700'}
                onBlur={(e) => !errors.story && (e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)')}
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '0.5rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem'
              }}>
                <span style={{ 
                  color: charCount < 500 ? '#dc2626' : charCount > 800 ? '#dc2626' : '#16a34a' 
                }}>
                  {charCount} characters
                </span>
                {errors.story && (
                  <p style={{ color: '#dc2626' }}>
                    {errors.story}
                  </p>
                )}
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#ffd700',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: 'Inter, sans-serif'
              }}>
                Photo <span style={{ color: '#a0a0a0', textTransform: 'none' }}>(Optional)</span>
              </label>
              <div style={{
                position: 'relative',
                border: '2px dashed rgba(255, 215, 0, 0.3)',
                borderRadius: '4px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: 'rgba(20, 20, 20, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ffd700';
                e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                e.currentTarget.style.background = 'rgba(20, 20, 20, 0.4)';
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
                <Upload size={32} style={{ color: '#ffd700', marginBottom: '0.5rem' }} />
                <p style={{ color: '#a0a0a0', fontFamily: 'Inter, sans-serif' }}>
                  {formData.photo ? formData.photo.name : 'Click to upload a photo'}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                padding: '1.25rem 3rem',
                background: 'linear-gradient(135deg, #dc2626, #16a34a)',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '1.125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                margin: '0 auto',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(220, 38, 38, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
              }}
            >
              <Send size={20} />
              Submit Tribute
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 215, 0, 0.2)',
        background: 'rgba(0, 0, 0, 0.3)'
      }}>
        <p style={{
          color: '#666',
          fontSize: '0.875rem',
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'italic'
        }}>
          In memory of all who were lost. In honor of all who survived. <br/>
          <span style={{ color: '#dc2626' }}>Ọzọ emena</span> — Never again.
        </p>
      </footer>
    </div>
  );
}
