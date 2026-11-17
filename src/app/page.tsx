export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">LIFE<span>VERSE</span></div>
        <p className="eyebrow">YOUR PRIVATE WORLD</p>
        <nav aria-label="Main navigation">
          <a className="navItem active" href="/">⌂ <span>Overview</span></a>
          <a className="navItem" href="#characters">♙ <span>Characters</span></a>
          <a className="navItem" href="#story">✧ <span>Events</span></a>
          <a className="navItem" href="#social">◉ <span>Social</span></a>
          <a className="navItem" href="#relationships">♡ <span>Relationships</span></a>
          <a className="navItem" href="#world">▤ <span>World Bible</span></a>
        </nav>
        <div className="sidebarFoot">LOCAL WORLD · PRIVATE SPACE</div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p className="eyebrow">YOUR SPACE</p><h1>Welcome to LIFEVERSE.</h1></div>
          <span className="status"><i /> Local world</span>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">A WORLD OF YOUR OWN</p>
            <h2>Every story<br />begins with a character.</h2>
            <p className="muted">Create a character, build relationships, and let the world unfold around them.</p>
            <a className="primaryButton" href="#characters">Explore characters <span>→</span></a>
          </div>
          <div className="ornament" aria-hidden="true">L</div>
        </section>

        <div className="sectionHeading"><div><p className="eyebrow">DASHBOARD</p><h2>Your world</h2></div><span className="muted small">MVP · ETAP 1</span></div>
        <div className="cards">
          <article className="tile" id="characters"><span className="tileIcon">♙</span><p className="eyebrow">CHARACTERS</p><h3>Characters</h3><p className="muted">Create a detailed character profile and personality.</p><span className="tileFoot">COMING SOON ↗</span></article>
          <article className="tile" id="story"><span className="tileIcon">✧</span><p className="eyebrow">STORY</p><h3>Events</h3><p className="muted">One-time scenes that become memories when completed.</p><span className="tileFoot">PLANNED ↗</span></article>
          <article className="tile" id="social"><span className="tileIcon">◉</span><p className="eyebrow">SOCIAL</p><h3>Social</h3><p className="muted">The world keeps living beyond the main story.</p><span className="tileFoot">PLANNED ↗</span></article>
        </div>
        <footer className="footer">LIFEVERSE <span>—</span> YOUR STORY, YOUR WORLD.</footer>
      </section>
    </main>
  );
}
