export default function NavButton({ active, icon, label, onClick }) {
  return (
    <button
      className={active ? 'nav-button nav-button-active' : 'nav-button'}
      type="button"
      onClick={onClick}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
