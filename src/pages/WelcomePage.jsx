const welcomeLoopSteps = [
  'Plant wheat seeds.',
  'Water wheat.',
  'Wait for wheat to mature.',
  'Harvest wheat.',
  'Sell wheat at the Pawn Shop.',
  'Buy more wheat seeds.',
];

export default function WelcomePage({ onNavigate }) {
  return (
    <section className="welcome-page page-grid">
      <div className="intro-panel">
        <p className="eyebrow">Cozy farming prototype</p>
        <h2>Grow wheat first.</h2>
        <p>
          Road to Long Long Noodles starts as a small farming test. Your first goal is
          to grow wheat, sell it, and buy more wheat seeds.
        </p>
        <p className="welcome-start-note">Recommended first page: Farm.</p>
        <div className="button-row">
          <button
            className="primary-action welcome-start-action"
            type="button"
            onClick={() => onNavigate('farm')}
          >
            Start Farming
          </button>
          <button className="secondary-action" type="button" onClick={() => onNavigate('help')}>
            Read Help
          </button>
        </div>
      </div>

      <div className="cloud-card farm-preview" aria-label="First farming loop preview">
        <div className="sun-dot" />
        <div className="preview-cloud preview-cloud-one" />
        <div className="preview-cloud preview-cloud-two" />
        <div className="welcome-loop-card">
          <p className="eyebrow">First-time path</p>
          <h3>Basic wheat loop</h3>
          <ol>
            {welcomeLoopSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="preview-field" aria-hidden="true">
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
