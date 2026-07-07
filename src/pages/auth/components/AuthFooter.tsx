export const AuthFooter: React.FC = () => {
  return (
    <footer className="px-8 py-6 border-t border-border/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted">
      <p>2026 EasyCare Inc. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="#" className="hover:text-muted hover:underline">
          Privacy Policy
        </a>
        <span>|</span>
        <a href="#" className="hover:text-muted hover:underline">
          Terms and Conditions
        </a>
      </div>
    </footer>
  );
};
