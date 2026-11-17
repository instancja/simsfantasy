export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">LIFE<span>VERSE</span></div>
        <p className="eyebrow">YOUR PRIVATE WORLD</p>
        <nav aria-label="Główna nawigacja">
          <a className="navItem active" href="/">⌂ <span>Przegląd</span></a>
          <a className="navItem" href="#characters">♙ <span>Postacie</span></a>
          <a className="navItem" href="#story">✧ <span>Wydarzenia</span></a>
          <a className="navItem" href="#social">◉ <span>Social</span></a>
          <a className="navItem" href="#relationships">♡ <span>Relacje</span></a>
          <a className="navItem" href="#world">▤ <span>World Bible</span></a>
        </nav>
        <div className="sidebarFoot">LOCAL WORLD · PRIVATE SPACE</div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p className="eyebrow">TWOJA PRZESTRZEŃ</p><h1>Witaj w LIFEVERSE.</h1></div>
          <span className="status"><i /> Świat lokalny</span>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">A WORLD OF YOUR OWN</p>
            <h2>Każda historia<br />zaczyna się od postaci.</h2>
            <p className="muted">Stwórz bohaterkę lub bohatera, zbuduj relacje i pozwól światu rozwijać się wokół nich.</p>
            <a className="primaryButton" href="#characters">Przejdź do postaci <span>→</span></a>
          </div>
          <div className="ornament" aria-hidden="true">L</div>
        </section>

        <div className="sectionHeading"><div><p className="eyebrow">CENTRUM DOWODZENIA</p><h2>Twój świat</h2></div><span className="muted small">MVP · ETAP 1</span></div>
        <div className="cards">
          <article className="tile" id="characters"><span className="tileIcon">♙</span><p className="eyebrow">CHARACTERS</p><h3>Postacie</h3><p className="muted">Zaprojektuj szczegółowy profil i osobowość postaci.</p><span className="tileFoot">MODUŁ W PRZYGOTOWANIU ↗</span></article>
          <article className="tile" id="story"><span className="tileIcon">✧</span><p className="eyebrow">STORY</p><h3>Wydarzenia</h3><p className="muted">Pojedyncze sceny, które po zakończeniu stają się wspomnieniami.</p><span className="tileFoot">MODUŁ W PLANIE ↗</span></article>
          <article className="tile" id="social"><span className="tileIcon">◉</span><p className="eyebrow">SOCIAL</p><h3>Social</h3><p className="muted">Życie świata toczy się także poza główną historią.</p><span className="tileFoot">MODUŁ W PLANIE ↗</span></article>
        </div>
        <footer className="footer">LIFEVERSE <span>—</span> YOUR STORY, YOUR WORLD.</footer>
      </section>
    </main>
  );
}
