"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Menu,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type Category = "cheesecakes" | "cookies" | "savory" | "specials";

type MenuItem = {
  name: string;
  image: string;
  category: Category;
  note: string;
};

const menuItems: MenuItem[] = [
  { name: "Burnt Basque Cheesecake", image: "/menu/menu-01.jpg", category: "cheesecakes", note: "Rich, creamy, and beautifully caramelized." },
  { name: "Cookies & Cheesecake Assortment", image: "/menu/menu-02.jpg", category: "specials", note: "A little bit of everything for sharing." },
  { name: "Fresh Savory Bakes", image: "/menu/menu-03.jpg", category: "savory", note: "Golden, cheesy, and baked fresh." },
  { name: "Cinnamon Rolls", image: "/menu/menu-04.jpg", category: "specials", note: "Soft swirls finished with a creamy topping." },
  { name: "Savory Pastry Bites", image: "/menu/menu-05.jpg", category: "savory", note: "Comforting, generously topped bites." },
  { name: "Cheese Buns", image: "/menu/menu-06.jpg", category: "savory", note: "Soft bread with a warm, cheesy center." },
  { name: "Freshly Packed Party Boxes", image: "/menu/menu-07.jpg", category: "specials", note: "A mixed box made for gatherings." },
  { name: "Cookies & Bento Cheesecakes", image: "/menu/menu-08.jpg", category: "specials", note: "Two favorites, packed and ready to gift." },
  { name: "Blueberry Cheesecake Collection", image: "/menu/menu-09.jpg", category: "cheesecakes", note: "Creamy cheesecake with a fruity finish." },
  { name: "Mango Cheesecake", image: "/menu/menu-10.jpg", category: "cheesecakes", note: "Bright mango over a creamy cheesecake base." },
  { name: "Classic Basque Cheesecake", image: "/menu/menu-11.jpg", category: "cheesecakes", note: "Deeply caramelized outside, soft inside." },
  { name: "Caramel Biscuit Cheesecake", image: "/menu/menu-12.jpg", category: "cheesecakes", note: "Silky cheesecake with caramel biscuit flavor." },
  { name: "Classic Chocolate Chip Cookies", image: "/menu/menu-13.jpg", category: "cookies", note: "Soft-centered cookies loaded with chocolate." },
  { name: "Chocolate Chunk Cookies", image: "/menu/menu-14.jpg", category: "cookies", note: "Handmade cookies with generous chocolate chunks." },
  { name: "Fudgy Brownies", image: "/menu/menu-15.jpg", category: "specials", note: "Dark, rich brownies with a satisfying bite." },
  { name: "Berry Cheesecake", image: "/menu/menu-16.jpg", category: "cheesecakes", note: "A colorful trio of berry and caramel flavors." },
  { name: "Gift-ready Cheesecake Boxes", image: "/menu/menu-17.jpg", category: "specials", note: "Wrapped with care for celebrations and thank-yous." },
  { name: "Cookie Batches", image: "/menu/menu-18.jpg", category: "cookies", note: "Classic and s'mores cookies, individually packed." },
  { name: "Fresh-baked Special", image: "/menu/menu-19.jpg", category: "savory", note: "A soft, filled bake straight from the oven." },
];

const featuredNames = [
  "Burnt Basque Cheesecake",
  "Cinnamon Rolls",
  "Chocolate Chunk Cookies",
];

const filters: { label: string; value: "all" | Category }[] = [
  { label: "All treats", value: "all" },
  { label: "Cheesecakes", value: "cheesecakes" },
  { label: "Cookies", value: "cookies" },
  { label: "Savory", value: "savory" },
  { label: "Specials", value: "specials" },
];

const orderUrl = "https://www.facebook.com/dasweetsco";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | Category>("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const featuredItems = menuItems.filter((item) => featuredNames.includes(item.name));
  const visibleItems = useMemo(
    () => activeFilter === "all" ? menuItems : menuItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  const selectedIndex = selectedItem ? menuItems.findIndex((item) => item.image === selectedItem.image) : -1;
  const moveSelection = (direction: number) => {
    if (selectedIndex < 0) return;
    const nextIndex = (selectedIndex + direction + menuItems.length) % menuItems.length;
    setSelectedItem(menuItems[nextIndex]);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Sweets Co. by Noella home">
          <img className="brand-logo" src="/sweets-co-logo.jpg" alt="" />
          <span><b>Sweets Co.</b><small>by Noella</small></span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span className="sr-only">Toggle navigation</span>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav id="primary-navigation" className={menuOpen ? "nav-links is-open" : "nav-links"}>
          <a href="#treats" onClick={closeMenu}>Favorites</a>
          <a href="#menu" onClick={closeMenu}>Menu</a>
          <a href="#our-story" onClick={closeMenu}>Our story</a>
          <a className="nav-order" href={orderUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Order on Facebook <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-kicker"><Sparkles aria-hidden="true" /><span>Homemade since 2021</span></div>
          <h1 id="hero-title">A little joy,<br /><em>freshly baked.</em></h1>
          <p className="hero-text">
            Homemade desserts and savory bakes made for cravings, celebrations, and everything in between.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href={orderUrl} target="_blank" rel="noreferrer">
              Start an order <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="button button-ghost" href="#menu">
              Explore the menu <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="hero-proof" aria-label="Sweets Co. qualities">
            <span>Small batch</span><i aria-hidden="true" />
            <span>Made with care</span><i aria-hidden="true" />
            <span>Ready to gift</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Featured Sweets Co. products">
          <div className="hero-photo hero-photo-main">
            <img src="/menu/menu-08.jpg" alt="Sweets Co. cookies and bento cheesecakes" />
          </div>
          <div className="hero-photo hero-photo-small">
            <img src="/menu/menu-04.jpg" alt="Sweets Co. cinnamon rolls" />
          </div>
          <div className="hero-seal" aria-hidden="true">
            <Heart />
            <span>Made<br />at home</span>
          </div>
          <div className="hero-caption">
            <span>Today&apos;s mood</span>
            <strong>Something sweet</strong>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Freshly baked</span><b>✦</b><span>Made to order</span><b>✦</b><span>Celebration ready</span><b>✦</b><span>From Noella&apos;s kitchen</span><b>✦</b>
          <span>Freshly baked</span><b>✦</b><span>Made to order</span><b>✦</b><span>Celebration ready</span><b>✦</b><span>From Noella&apos;s kitchen</span><b>✦</b>
        </div>
      </div>

      <section id="treats" className="favorites-section" aria-labelledby="favorites-title">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Crowd favorites</p>
            <h2 id="favorites-title">The treats everyone<br />comes back for.</h2>
          </div>
          <p>Start here if choosing is the hardest part. Availability changes, so send a message to reserve your favorites.</p>
        </div>

        <div className="favorite-grid">
          {featuredItems.map((item, index) => (
            <article className="favorite-card" key={item.name}>
              <button className="favorite-image" type="button" onClick={() => setSelectedItem(item)} aria-label={`View ${item.name}`}>
                <img src={item.image} alt="" />
                <span className="card-number">0{index + 1}</span>
                <span className="view-pill"><ZoomIn aria-hidden="true" /> View</span>
              </button>
              <div className="favorite-copy">
                <div><p>{item.category}</p><h3>{item.name}</h3></div>
                <a href={orderUrl} target="_blank" rel="noreferrer" aria-label={`Ask about ${item.name} on Facebook`}><ArrowUpRight /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="menu" className="menu-section" aria-labelledby="menu-title">
        <div className="section-heading menu-heading">
          <div>
            <p className="eyebrow">Pick your craving</p>
            <h2 id="menu-title">Browse the bake table.</h2>
          </div>
          <p>Tap any photo for a closer look.</p>
        </div>

        <div className="filter-bar" role="group" aria-label="Filter menu photos">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={activeFilter === filter.value ? "is-active" : ""}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="menu-gallery" aria-live="polite">
          {visibleItems.map((item, index) => (
            <button
              className={`gallery-card gallery-card-${(index % 5) + 1}`}
              type="button"
              key={item.image}
              onClick={() => setSelectedItem(item)}
              aria-label={`View ${item.name}`}
            >
              <img src={item.image} alt="" loading="lazy" />
              <span className="gallery-overlay"><small>{item.category}</small><strong>{item.name}</strong><ZoomIn aria-hidden="true" /></span>
            </button>
          ))}
        </div>
      </section>

      <section id="our-story" className="story-section" aria-labelledby="story-title">
        <div className="story-visual">
          <img src="/menu/menu-07.jpg" alt="Boxes of freshly baked Sweets Co. treats" loading="lazy" />
          <div className="story-badge" aria-hidden="true"><span>Est.</span><strong>2021</strong></div>
        </div>
        <div className="story-copy">
          <p className="eyebrow">The Sweets Co. way</p>
          <h2 id="story-title">Made by Noella.<br />Shared by everyone.</h2>
          <p>
            Sweets Co. began with a love for homemade desserts that feel familiar, generous, and worth sharing. Every order is prepared with care—from the first mix to the final ribbon.
          </p>
          <div className="story-values">
            <span><Heart aria-hidden="true" /> Homemade</span>
            <span><Sparkles aria-hidden="true" /> Small batch</span>
          </div>
        </div>
      </section>

      <section id="how-to-order" className="order-section" aria-labelledby="order-title">
        <div className="order-intro">
          <p className="eyebrow">Ready when you are</p>
          <h2 id="order-title">Your next treat is only a message away.</h2>
          <a className="button button-light" href={orderUrl} target="_blank" rel="noreferrer">
            Visit Sweets Co. on Facebook <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <ol className="steps">
          <li><span>01</span><div><h3>Choose your craving</h3><p>Browse the menu and save the treats you like.</p></div></li>
          <li><span>02</span><div><h3>Message Sweets Co.</h3><p>Ask what&apos;s available and confirm your order details.</p></div></li>
          <li><span>03</span><div><h3>Enjoy something special</h3><p>Arrange pickup or delivery directly with Noella.</p></div></li>
        </ol>
      </section>

      <footer>
        <div className="footer-main">
          <a className="brand brand-footer" href="#top" aria-label="Back to top">
            <img className="brand-logo" src="/sweets-co-logo.jpg" alt="" />
            <span><b>Sweets Co.</b><small>by Noella</small></span>
          </a>
          <p>Homemade desserts for life&apos;s sweetest moments.</p>
        </div>
        <a className="footer-link" href={orderUrl} target="_blank" rel="noreferrer">Facebook <ArrowUpRight aria-hidden="true" /></a>
      </footer>

      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="product-dialog" showCloseButton={false}>
          {selectedItem && (
            <>
              <DialogTitle className="sr-only">{selectedItem.name}</DialogTitle>
              <DialogDescription className="sr-only">{selectedItem.note}</DialogDescription>
              <button className="dialog-close" type="button" onClick={() => setSelectedItem(null)} aria-label="Close image"><X /></button>
              <div className="dialog-image"><img src={selectedItem.image} alt={selectedItem.name} /></div>
              <div className="dialog-info">
                <p>{selectedItem.category}</p>
                <h3>{selectedItem.name}</h3>
                <span>{selectedItem.note}</span>
                <a href={orderUrl} target="_blank" rel="noreferrer">Ask about this treat <ArrowUpRight aria-hidden="true" /></a>
              </div>
              <button className="dialog-nav dialog-prev" type="button" onClick={() => moveSelection(-1)} aria-label="Previous menu item"><ChevronLeft /></button>
              <button className="dialog-nav dialog-next" type="button" onClick={() => moveSelection(1)} aria-label="Next menu item"><ChevronRight /></button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
