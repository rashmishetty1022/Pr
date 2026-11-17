import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './App.css'

function AppIcon({ name }) {
  return (
    <svg className="contact-svg-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}

const stats = [
  { value: 'Tulu', label: 'Language strength' },
  { value: 'Kannada', label: 'Regional reach' },
]

const roles = [
  {
    title: 'Master of Ceremonies',
    description:
      'Energetic event hosting for weddings, birthdays, formal programs, cultural events, and stage shows.',
  },
  {
    title: 'Comedy Actor & Drama Artist',
    description:
      'Comedy is my main acting style, with experience in short films and drama productions.',
  },
  {
    title: 'Voice-Over Artist',
    description:
      'Professional voice work for advertisements, narration, documentaries, dubbing, and character roles.',
  },
  {
    title: 'Television Actor',
    description:
      "Appeared in Namma TV's Bale Telipale show.",
  },
]

const serviceCategories = [
  {
    title: 'Event Hosting',
    items: ['Mehendi Functions', 'Birthday Celebrations', 'Formal Programs'],
    image: '/service-event.jpg',
    imageAlt: 'Henna designs on a hand at a traditional wedding ceremony',
    icon: '▦',
  },
  {
    title: 'Voice-Over',
    items: ['Commercials', 'Narration', 'Documentary Voice-Over', 'Corporate Videos'],
    image: '/service-voiceover.jpg',
    imageAlt: 'Studio microphone and headphones for voice recording',
    icon: '🎙',
  },
  {
    title: 'Arts & Performance',
    items: ['Stage Programs', 'Cultural Programs', 'Special Events', 'Drama Performances'],
    image: '/service-arts.jpg',
    imageAlt: 'Performers silhouetted against a theater curtain',
    icon: '🎭',
  },
]

const videoCollections = [
  {
    title: 'Drama',
    kind: 'drama',
    videos: [
      { title: 'Chaduranga Nataka', url: 'https://youtu.be/xJTsGG4RZyU' },
      { title: 'Pira Bannaga', url: 'https://youtu.be/NzbX487Oisw' },
      { title: 'Bakil Deppule', url: 'https://youtu.be/QXNrb5CP_aM' },
      { title: 'Tunga Bhadra', url: 'https://youtu.be/yp37uRirKJI' },
      { title: 'Kathe Yer Bareper', url: 'https://youtu.be/_OqoCKnbAUE' },
      { title: 'Ee porlu tuvodchi', url: 'https://youtu.be/NTwWg7y5Igw' },
    ],
  },
  {
    title: 'Short Films & Bale Telipale',
    subtitle: 'Short films and featured Namma TV appearances',
    kind: 'tv-show',
    videos: [
      { title: 'Dosti Masti', url: 'https://youtu.be/l9Juf9caVFg' },
      { title: 'Kudi Maathu', url: 'https://youtu.be/jIYoNu4mqRQ' },
      {
        title: 'Bale Telipale appearance 1',
        url: 'https://youtu.be/vHI48aPUZxM',
        thumbnail: 'https://img.youtube.com/vi/vHI48aPUZxM/hqdefault.jpg',
        featured: true,
      },
      {
        title: 'Bale Telipale appearance 2',
        url: 'https://youtu.be/BvVjNE_k314',
        thumbnail: 'https://img.youtube.com/vi/BvVjNE_k314/hqdefault.jpg',
        featured: true,
      },
      {
        title: 'Bale Telipale appearance 3',
        url: 'https://youtu.be/mX9yVgVgxcM',
        thumbnail: 'https://img.youtube.com/vi/mX9yVgVgxcM/hqdefault.jpg',
        featured: true,
      },
    ],
  },
]

const galleryItems = [
  { title: 'Mehendi host', image: '/m.jpg', alt: 'Pradeep hosting a Mehendi celebration' },
  { title: 'Stage event', image: '/stage.jpg', alt: 'Pradeep performing at a stage event' },
  { title: 'Birthday host', image: '/brdy.jpg', alt: 'Pradeep hosting a birthday celebration' },
]

const feedbackVideos = []

function PortfolioVideo({ video }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = video.url.split('/').pop()
  const thumbnail = video.thumbnail ?? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`

  useEffect(() => {
    if (!isPlaying) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsPlaying(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isPlaying])

  return (
    <>
      <article className="video-card">
        <button
          className="video-preview"
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play ${video.title}`}
        >
          <img src={thumbnail} alt="" loading="lazy" />
          <span className="video-preview-play" aria-hidden="true">▶</span>
          <span className="video-card-title">{video.title}</span>
        </button>
      </article>
      {isPlaying && createPortal(
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          onClick={() => setIsPlaying(false)}
        >
          <div className="video-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              className="video-modal-close"
              type="button"
              onClick={() => setIsPlaying(false)}
              aria-label="Close video"
              autoFocus
            >
              ×
            </button>
            <div className="video-modal-frame">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="eager"
                allowFullScreen
              />
            </div>
            <a
              className="video-modal-youtube-link"
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open on YouTube
            </a>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

function VideoCollection({ collection }) {
  const marqueeRef = useRef(null)
  const trackRef = useRef(null)

  function moveVideos(direction) {
    const marquee = marqueeRef.current
    const track = trackRef.current
    const firstSet = track?.querySelector('.video-set')
    const firstCard = firstSet?.querySelector('.video-card')

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 560px)').matches
    ) {
      if (marquee && firstSet && firstCard) {
        const gap = Number.parseFloat(window.getComputedStyle(firstSet).gap) || 0
        const step = firstCard.offsetWidth + gap
        marquee.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'auto' })
      }
      return
    }

    const animation = track?.getAnimations()[0]
    const duration = animation?.effect?.getComputedTiming().duration
    const setWidth = firstSet?.getBoundingClientRect().width

    if (animation && Number.isFinite(duration) && setWidth && firstCard) {
      const gap = Number.parseFloat(window.getComputedStyle(firstSet).gap) || 0
      const step = firstCard.offsetWidth + gap
      const reverse = window.getComputedStyle(track).animationDirection === 'reverse'
      const timeDirection = (direction === 'next' ? 1 : -1) * (reverse ? -1 : 1)
      animation.currentTime = Number(animation.currentTime ?? 0) +
        timeDirection * duration * step / setWidth
    } else if (marquee && firstSet && firstCard) {
      const gap = Number.parseFloat(window.getComputedStyle(firstSet).gap) || 0
      const step = firstCard.offsetWidth + gap
      marquee.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'smooth' })
    }
  }

  return (
    <article className={`video-group ${collection.kind ?? ''}`}>
      <div className="video-marquee" aria-label={`${collection.title} videos`}>
        <button
          className="video-marquee-button video-marquee-previous"
          type="button"
          onClick={() => moveVideos('previous')}
          aria-label={`Show previous ${collection.title} video`}
        >
          ‹
        </button>
        <div className="video-scroll" ref={marqueeRef}>
          <div className="video-track" ref={trackRef}>
            {[0, 1].map((copy) => (
              <div
                className="video-set"
                key={copy}
                aria-hidden={copy === 1 ? 'true' : undefined}
                inert={copy === 1}
              >
                {collection.videos.map((video) => (
                  <PortfolioVideo
                    key={`${video.url}-${copy}`}
                    video={video}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          className="video-marquee-button video-marquee-next"
          type="button"
          onClick={() => moveVideos('next')}
          aria-label={`Show next ${collection.title} video`}
        >
          ›
        </button>
      </div>
    </article>
  )
}

function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const isLightboxOpen = lightboxIndex !== null

  function moveCarousel(direction) {
    setActiveIndex((index) => (index + direction + images.length) % images.length)
  }

  function moveLightbox(direction) {
    if (lightboxIndex === null) return
    const nextIndex = (lightboxIndex + direction + images.length) % images.length
    setLightboxIndex(nextIndex)
    setActiveIndex(nextIndex)
  }

  useEffect(() => {
    if (!isLightboxOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isLightboxOpen])

  useEffect(() => {
    if (!isLightboxOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setLightboxIndex(null)
      } else if (event.key === 'ArrowLeft') {
        const nextIndex = (lightboxIndex - 1 + images.length) % images.length
        setLightboxIndex(nextIndex)
        setActiveIndex(nextIndex)
      } else if (event.key === 'ArrowRight') {
        const nextIndex = (lightboxIndex + 1) % images.length
        setLightboxIndex(nextIndex)
        setActiveIndex(nextIndex)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length, isLightboxOpen, lightboxIndex])

  return (
    <>
      <div className="image-carousel" role="region" aria-label="Gallery photos" aria-roledescription="carousel">
        <button
          className="image-carousel-control image-carousel-previous"
          type="button"
          onClick={() => moveCarousel(-1)}
          aria-label="Show previous photo"
          disabled={images.length < 2}
        >
          ‹
        </button>
        <div className="image-carousel-stage">
          {images.map((image, index) => {
            let offset = index - activeIndex
            if (offset > images.length / 2) offset -= images.length
            if (offset < -images.length / 2) offset += images.length
            const distance = Math.abs(offset)
            const isVisible = distance <= 1

            return (
              <button
                className={`image-slide${distance === 0 ? ' is-active' : ''}`}
                key={image.title}
                type="button"
                style={{
                  zIndex: images.length - distance,
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isVisible ? 'auto' : 'none',
                  transform: `translate(-50%, -50%) translateX(${offset * 38}%) translateZ(${distance === 0 ? 0 : -90}px) rotateY(${-offset * 14}deg) scale(${distance === 0 ? 1 : 0.8})`,
                }}
                aria-hidden={!isVisible}
                aria-label={`Open ${image.title} photo`}
                tabIndex={isVisible ? 0 : -1}
                onClick={() => {
                  setActiveIndex(index)
                  setLightboxIndex(index)
                }}
              >
                <img className="gallery-image" src={image.image} alt={image.alt} loading="lazy" />
                <span className="image-slide-caption">{image.title}</span>
              </button>
            )
          })}
        </div>
        <button
          className="image-carousel-control image-carousel-next"
          type="button"
          onClick={() => moveCarousel(1)}
          aria-label="Show next photo"
          disabled={images.length < 2}
        >
          ›
        </button>
      </div>
      <p className="image-carousel-counter" aria-live="polite">
        {activeIndex + 1} <span>/</span> {images.length}
      </p>

      {isLightboxOpen && createPortal(
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={images[lightboxIndex].title}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="gallery-lightbox-close"
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close image"
            autoFocus
          >
            ×
          </button>
          <button
            className="gallery-lightbox-control gallery-lightbox-previous"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              moveLightbox(-1)
            }}
            aria-label="Show previous image"
          >
            ‹
          </button>
          <figure className="gallery-lightbox-figure" onClick={(event) => event.stopPropagation()}>
            <img src={images[lightboxIndex].image} alt={images[lightboxIndex].alt} />
            <figcaption>{images[lightboxIndex].title}</figcaption>
          </figure>
          <button
            className="gallery-lightbox-control gallery-lightbox-next"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              moveLightbox(1)
            }}
            aria-label="Show next image"
          >
            ›
          </button>
          <p className="gallery-lightbox-counter" aria-live="polite">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>,
        document.body,
      )}
    </>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="portfolio-shell">
      <div className="depth-scene" aria-hidden="true">
        <div className="depth-grid" />
        <div className="depth-orb depth-orb-one" />
        <div className="depth-orb depth-orb-two" />
        <div className="depth-ring depth-ring-one" />
        <div className="depth-ring depth-ring-two" />
      </div>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">PSK</span>
          <div>
            <strong>Pradeep Shetty Kukkuje</strong>
            <small>Actor • MC • Voice Artist • Business Man</small>
          </div>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="header-menu"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`header-menu${isMenuOpen ? ' is-open' : ''}`} id="header-menu">
          <nav className="nav" aria-label="Main navigation">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#videos" onClick={() => setIsMenuOpen(false)}>Videos</a>
            <a href="#business" onClick={() => setIsMenuOpen(false)}>Business</a>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </nav>

          <div className="header-actions">
            <a
              className="button secondary header-directions"
              href="https://www.google.com/maps/search/?api=1&query=13.35375%2C74.9474722"
              target="_blank"
              rel="noreferrer"
            >
              Directions
            </a>

            <a
              className="button primary header-booking"
              href="https://wa.me/919845065974?text=Hello%20Pradeep%20Shetty%20Kukkuje%2C%20I%20would%20like%20to%20enquire%20about%20booking%20you%20as%20the%20host%20for%20an%20event."
              target="_blank"
              rel="noreferrer"
            >
              Enquire Here
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <video
            className="hero-background-video"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            aria-hidden="true"
            tabIndex="-1"
          >
            <source src="/Video%20Project%205.mp4" type="video/mp4" />
          </video>
          <div className="hero-copy">
            <p className="eyebrow">Event Host <span aria-hidden="true">•</span> Master of Ceremonies</p>
            <h1>Make your occasion memorable</h1>
            <p className="lead">
              Make your wedding, celebration, or cultural program memorable with engaging
              hosting in Tulu and Kannada. I’m Pradeep Shetty Kukkuje, a Master of Ceremonies
              and performer, also known for comedy, drama, voice-over, and Namma TV’s
              Bale Telipale.
            </p>

            <div className="cta-row">
              <a
                className="button primary hero-booking"
                href="https://wa.me/919845065974?text=Hello%20Pradeep%20Shetty%20Kukkuje%2C%20I%20would%20like%20to%20enquire%20about%20booking%20you%20as%20the%20host%20for%20an%20event."
                target="_blank"
                rel="noreferrer"
              >
                Book for Your Event
              </a>
              <a
                className="button secondary"
                href="https://www.google.com/maps/search/?api=1&query=13.35375%2C74.9474722"
                target="_blank"
                rel="noreferrer"
              >
                Get Directions
              </a>
              <a className="button secondary" href="#services">
                Hosting Services
              </a>
            </div>

            <div className="stats-grid">
              {stats.map((item) => (
                <div className="stat-box" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        <section className="info-section" id="about">
          <div className="about-showcase">
            <div className="about-visual" aria-label="Pradeep Shetty Kukkuje at events">
              <div className="about-photo-glow" />
              <img className="about-main-photo" src="/psk.jpg" alt="Pradeep Shetty Kukkuje hosting an event" />
              <img className="about-floating-photo about-floating-photo-one" src="/m.jpg" alt="Pradeep hosting a celebration" loading="lazy" />
              <img className="about-floating-photo about-floating-photo-two" src="/stage.jpg" alt="Pradeep performing at a stage event" loading="lazy" />
              <img className="about-floating-photo about-floating-photo-three" src="/brdy.jpg" alt="Pradeep hosting a birthday event" loading="lazy" />
              <div className="about-film-line" aria-hidden="true" />
            </div>

            <div className="about-copy">
              <p className="eyebrow">About me</p>
              <h2>Creative, versatile, and rooted in <span>community.</span></h2>
              <div className="about-biography">
                <p>
                  I bring energy and creativity to stage events, cultural programs, celebrations,
                  and professional functions. Comedy is my main acting style, with experience
                  in short films and drama productions. I also work in Kannada and Tulu across
                  hosting and voice performance.
                </p>
                <p>
                  My work includes an appearance in Namma TV's Bale Telipale. Alongside my
                  artistic work, I run Bramashree Chicken Centre in Kukkuje.
                </p>
              </div>

              <div className="about-identity-heading">
                <span />
                <h3>Professional Identity</h3>
                <span />
              </div>
              <div className="about-role-grid">
                <div className="about-role-card"><span aria-hidden="true">🎙️</span><p>Master of<br />Ceremonies</p></div>
                <div className="about-role-card"><span aria-hidden="true">🎭</span><p>Comedy<br />Actor</p></div>
                <div className="about-role-card"><span aria-hidden="true">🎬</span><p>Drama<br />Artist</p></div>
                <div className="about-role-card"><span aria-hidden="true">🎤</span><p>Voice-Over<br />Artist</p></div>
                <div className="about-role-card"><span aria-hidden="true">📺</span><p>Television<br />Actor</p></div>
                <div className="about-role-card"><span aria-hidden="true">💼</span><p>Businessman</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section business-section" id="business">
          <div className="section-heading business-section-heading">
            <p className="eyebrow">Business</p>
            <h2>Community-driven presence beyond the stage</h2>
          </div>
          <div className="business-visual">
            <div className="business-photo">
              <img src="/b.png" alt="Bramashree Chicken Centre" />
              <div className="business-photo-caption">
                <span>Local business</span>
                <strong>Kukkuje, Udupi</strong>
              </div>
            </div>
            <div className="business-content">
              <div className="business-details">
                <p className="tag">Visit us</p>
                <h3>Bramashree Chicken Centre</h3>
                <address className="business-address">
                  <strong>Gurudeva Complex, Donderangadi</strong>
                  <span>College Road, Kukkuje, Udupi - 574108, Karnataka</span>
                </address>
                <p className="business-description">
                  Alongside my artistic work, I run Bramashree Chicken Centre and serve the
                  Kukkuje community.
                </p>
                <div className="business-footer">
                  <div className="business-hours">
                    <span>Opening hours</span>
                    <strong>8:00 AM - 8:00 PM</strong>
                    <small>Every day</small>
                  </div>
                  <a
                    className="button primary"
                    href="https://www.google.com/maps/search/?api=1&query=13.35375%2C74.9474722"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get Directions <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section" id="services">
          <div className="services-showcase">
            <div className="services-showcase-content">
              <div className="services-showcase-heading">
                <p className="eyebrow">What I do</p>
                <h2>Performance, hosting, and voice services tailored to every occasion.</h2>
              </div>
              <div className="services-grid">
                {serviceCategories.map((service) => (
                  <article className="service-card" key={service.title}>
                    <div className="service-card-visual">
                      <img src={service.image} alt={service.imageAlt} loading="lazy" />
                    </div>
                    <h3>
                      <span className="service-card-title-icon" aria-hidden="true">{service.icon}</span>
                      {service.title}
                    </h3>
                    <ul>
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="info-section" id="videos">
          <div className="section-heading">
            <p className="eyebrow">Watch my work</p>
            <h2>Drama, short films And Namma Telipale shows</h2>
          </div>

          <div className="video-collections">
            {videoCollections.map((collection) => (
              <VideoCollection collection={collection} key={collection.title} />
            ))}
          </div>
        </section>

        <section className="info-section" id="gallery">
          <div className="section-heading">
            <p className="eyebrow">Gallery</p>
            <h2>Moments of performance, celebration, and presence</h2>
          </div>

          <div className="gallery-panels">
            <section className="gallery-panel" aria-labelledby="gallery-photos-heading">
              <div className="gallery-panel-heading">
                <h3 id="gallery-photos-heading">Photos</h3>
              </div>
              {galleryItems.length > 0 ? (
                <ImageGallery images={galleryItems} />
              ) : (
                <p className="gallery-empty">Photos coming soon...</p>
              )}
            </section>

            <section className="gallery-panel testimonials-panel" aria-labelledby="feedback-videos-heading">
              <div className="gallery-panel-heading">
                <h3 id="feedback-videos-heading">Feedback &amp; Testimonials</h3>
              </div>
              {feedbackVideos.length > 0 ? (
                <div className="video-grid testimonial-video-grid">
                  {feedbackVideos.map((video) => (
                    <PortfolioVideo key={video.url} video={video} />
                  ))}
                </div>
              ) : (
                <div className="testimonial-empty" role="status">
                  <span className="testimonial-quote" aria-hidden="true">“</span>
                  <p>Feedback and review videos coming soon....</p>
                </div>
              )}
            </section>
          </div>
        </section>

        <section className="info-section contact-section" id="contact">
          <div className="section-heading contact-heading">
            <p className="eyebrow">Contact</p>
            <h2>Book the Best for Your <span>Next Event</span></h2>
            <p className="contact-intro">Book Pradeep Shetty Kukkuje for your next event or project.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-card contact-booking-card">
              <div className="contact-card-heading">
                <span className="contact-card-icon" aria-hidden="true">
                  <AppIcon name="calendar-icon" />
                </span>
                <div>
                  <h3>Booking details</h3>
                  <p>To make bookings or discuss event requirements, reach out directly with your preferred date and event type</p>
                </div>
              </div>
              <ul className="contact-details-list">
                <li>
                  <span className="contact-item-icon" aria-hidden="true">
                    <AppIcon name="phone-icon" />
                  </span>
                  <span className="contact-item-content">
                    <strong>Phone:</strong>
                    <a href="tel:+919845065974">+91 98450 65974</a>
                  </span>
                </li>
                <li>
                  <span className="contact-item-icon contact-whatsapp" aria-hidden="true">
                    <AppIcon name="whatsapp-icon" />
                  </span>
                  <span className="contact-item-content">
                    <strong>WhatsApp:</strong>
                    <a
                      href="https://wa.me/919845065974?text=Hello%20Pradeep%20Shetty%20Kukkuje%2C%20I%20would%20like%20to%20enquire%20about%20booking%20you%20as%20the%20host%20for%20an%20event."
                      target="_blank"
                      rel="noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </span>
                </li>
                <li>
                  <span className="contact-item-icon contact-facebook" aria-hidden="true">
                    <AppIcon name="facebook-icon" />
                  </span>
                  <span className="contact-item-content">
                    <strong>Facebook:</strong>
                    <a href="https://www.facebook.com/share/18hQ7h7FPF/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
                      Visit Facebook
                    </a>
                  </span>
                </li>
                <li>
                  <span className="contact-item-icon contact-youtube" aria-hidden="true">
                    <AppIcon name="youtube-icon" />
                  </span>
                  <span className="contact-item-content">
                    <strong>YouTube:</strong>
                    <a href="https://www.youtube.com/@pradeepshettykukkuje8955" target="_blank" rel="noreferrer">
                      Visit YouTube channel
                    </a>
                  </span>
                </li>
                <li>
                  <span className="contact-item-icon contact-instagram" aria-hidden="true">
                    <AppIcon name="instagram-icon" />
                  </span>
                  <span className="contact-item-content">
                      <strong>Instagram (Business):</strong>
                      <a href="https://www.instagram.com/pskc_reation/" target="_blank" rel="noreferrer">
                        Visit business Instagram
                      </a>
                    </span>
                  </li>
                  <li>
                    <span className="contact-item-icon contact-instagram" aria-hidden="true">
                      <AppIcon name="instagram-icon" />
                    </span>
                    <span className="contact-item-content">
                      <strong>Instagram (Personal):</strong>
                      <a
                        href="https://www.instagram.com/kukkujepradeepshetty?utm_source=qr&obrf=bmd5ZGQ0cG1uc3Rz"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit personal Instagram
                    </a>
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Pradeep Shetty Kukkuje | PSK</p>
      </footer>
    </div>
  )
}

export default App
