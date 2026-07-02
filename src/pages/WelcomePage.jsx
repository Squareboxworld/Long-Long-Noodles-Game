export default function WelcomePage({ onNavigate }) {
  return (
    <section className="welcome-page page-grid">
      <div className="intro-panel">
        <p className="eyebrow">A calm farming prototype</p>
        <h2>Patience becomes progress.</h2>
        <p>
          Grow wheat slowly, care for a small farm, and prepare the first steps
          toward Long Long Noodles.
        </p>
        <div className="button-row">
          <button className="primary-action" type="button" onClick={() => onNavigate('farm')}>
            Enter Farm
          </button>
          <button className="secondary-action" type="button" onClick={() => onNavigate('help')}>
            Read Manual
          </button>
        </div>
      </div>

      <div className="cloud-card farm-preview" aria-label="Placeholder farm preview">
        <div className="sun-dot" />
        <div className="preview-cloud preview-cloud-one" />
        <div className="preview-cloud preview-cloud-two" />
        <div className="preview-field">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="preview-sprout">
              🌱
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
