interface SummaryCardProps {
  title: string;
  countText: string;
  icon: React.ReactNode;
  bgClass: string;
  titleClass: string;
  subtitleClass: string;
  overlayImg?: string;
  onClick: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  countText,
  icon,
  bgClass,
  titleClass,
  subtitleClass,
  overlayImg,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-between py-4 px-6 h-[105px] rounded-lg w-1/2 shadow-sm cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-[1.02] ${bgClass}`}
    >
      <div className="flex items-center gap-4 z-10">
        <div className="flex items-center justify-center">{icon}</div>
        <div className="flex flex-col">
          <h3 className={`font-semibold text-lg tracking-wide ${titleClass}`}>
            {title}
          </h3>
          <p className={`text-sm font-medium mt-0.5 ${subtitleClass}`}>
            {countText}
          </p>
        </div>
      </div>

      {/* Decorative Wave Image */}
      {overlayImg && (
        <img
          src={overlayImg}
          alt="decoration"
          className="absolute right-0 top-0 h-full w-auto object-cover pointer-events-none"
        />
      )}
    </div>
  );
};
