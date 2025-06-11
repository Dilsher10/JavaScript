export default function AboutSection() {
  return (
    <section className="about-section" aria-labelledby="about-heading">
      <h2 id="about-heading" className="about-title">About Me</h2>
      <p className="about-description">
        I am a frontend developer passionate about building accessible, performant, and secure web applications.
      </p>
      <img
        src="/profile.jpg"
        alt="Portrait of the developer"
        loading="lazy"
        className="about-image"
      />
    </section>
  );
}
