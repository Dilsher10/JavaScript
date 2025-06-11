export default function ContactSection() {
  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="contact-title">Contact</h2>
      <form
        className="contact-form"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Contact form"
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" required className="form-textarea"></textarea>
        </div>
        <button type="submit" className="form-button">Send</button>
      </form>
    </section>
  );
}
