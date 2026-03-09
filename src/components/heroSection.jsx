import { useState, useEffect, useRef } from "react";
import "../styles/heroSection.css";
import Churchhero from "../hero/ChurchHero.mp4";

const WORDS = ["Worship", "Fellowship", "Community", "Grace", "Purpose"];

export default function ChurchHero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);

  // Cycle animated word
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 500);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Trigger entrance animation
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      

      <section className="hero">
        {/* Video — using a free Pexels embed */}
        <video
          ref={videoRef}
          className={`hero__video${loaded ? " playing" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setLoaded(true)}
          src={Churchhero}
          // ↑ Replace with your actual church video URL
          //poster="https://images.unsplash.com/photo-1438232992991-995b671e4b8e?w=1920&q=80"
        />

        {/* Overlays */}
        <div className="hero__overlay" />
        <div className="hero__vignette" />
        <div className={`hero__bar${loaded ? " in" : ""}`} />

        {/* Navigation */}
        <nav className={`hero__nav${loaded ? " in" : ""}`}>
          <a href="#" className="nav__logo">
            <div className="nav__cross" />
            <span className="nav__brand">Grace <span>Community</span></span>
          </a>
          <ul className="nav__links">
            {["About", "Sermons", "Ministries", "Events", "Give"].map((l) => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="hero__content">
          <div className={`hero__eyebrow${loaded ? " in" : ""}`}>
            <span className="eyebrow__line" />
            <span className="eyebrow__text">Nairobi, Kenya · Est. 1998</span>
            <span className="eyebrow__line" />
          </div>

          <h1 className={`hero__heading${loaded ? " in" : ""}`}>
            Welcome to <em>Grace</em>
          </h1>

          {/* Animated word cycling */}
          <div className={`hero__word-row${loaded ? " in" : ""}`}>
            <span className="word__static">A Place of</span>
            <span className={`word__cycling${visible ? " show" : ""}`}>
              {WORDS[wordIndex]}
            </span>
          </div>

          <div className={`hero__divider${loaded ? " in" : ""}`} />

          <p className={`hero__description${loaded ? " in" : ""}`}>
            We are a Christ-centered community dedicated to worship, fellowship,
            and serving others. Whether you are new to faith or looking for a
            church family — you are welcome here.
          </p>

          <div className={`hero__actions${loaded ? " in" : ""}`}>
            <button className="btn--primary">
              <span>Plan Your Visit</span>
            </button>
            <button className="btn--secondary">
              <span className="btn__icon">
                <span className="play-icon" />
                Watch Sermons
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`hero__scroll${loaded ? " in" : ""}`}>
          <div className="scroll__track">
            <div className="scroll__thumb" />
          </div>
          <span className="scroll__label">Scroll</span>
        </div>

        {/* Bottom Info Strip */}
        <div className={`hero__strip${loaded ? " in" : ""}`}>
          {[
            { label: "Sunday Service", value: "8:00 AM & 10:30 AM" },
            { label: "Location", value: "Westlands, Nairobi" },
            { label: "Midweek Service", value: "Wednesday · 6:30 PM" },
            { label: "Youth Church", value: "Every Sunday · 10:30 AM" },
          ].map(({ label, value }) => (
            <div className="strip__item" key={label}>
              <span className="strip__dot" />
              <div>
                <div className="strip__label">{label}</div>
                <div className="strip__value">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}