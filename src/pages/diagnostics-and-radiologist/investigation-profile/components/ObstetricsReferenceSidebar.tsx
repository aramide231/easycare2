type PresentationDiagramProps = {
  className?: string;
};

/** Cross-section uterus + fetus — breech (buttocks/feet toward cervix). */
export function BreechPresentationDiagram({ className = "" }: PresentationDiagramProps) {
  return (
    <svg
      viewBox="0 0 220 300"
      className={className}
      role="img"
      aria-label="Breech presentation: fetus pelvis-first"
    >
      <defs>
        <radialGradient id="breechUterus" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fbe8e6" />
          <stop offset="100%" stopColor="#f0d0cc" />
        </radialGradient>
        <linearGradient id="breechSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0c4a8" />
          <stop offset="100%" stopColor="#d99a72" />
        </linearGradient>
      </defs>
      {/* Maternal torso outline */}
      <path
        d="M40 40 C40 20 70 8 110 8 C150 8 180 20 180 40 L185 250 C185 275 155 292 110 292 C65 292 35 275 35 250 Z"
        fill="#faf6f5"
        stroke="#c4a8a4"
        strokeWidth="2.5"
      />
      {/* Uterus */}
      <ellipse
        cx="110"
        cy="155"
        rx="68"
        ry="100"
        fill="url(#breechUterus)"
        stroke="#c98f8a"
        strokeWidth="2.5"
      />
      {/* Cervix / lower canal */}
      <path
        d="M95 245 Q110 268 125 245"
        fill="#e8c4bf"
        stroke="#c98f8a"
        strokeWidth="2"
      />
      {/* Fetus — head up (breech) */}
      <ellipse cx="110" cy="115" rx="26" ry="32" fill="url(#breechSkin)" />
      <circle cx="110" cy="78" r="20" fill="#e8b894" />
      <circle cx="103" cy="74" r="2.2" fill="#5c4033" />
      <circle cx="117" cy="74" r="2.2" fill="#5c4033" />
      <path d="M104 84 Q110 88 116 84" fill="none" stroke="#5c4033" strokeWidth="1.4" />
      {/* Arms */}
      <ellipse cx="82" cy="125" rx="9" ry="24" fill="url(#breechSkin)" transform="rotate(-25 82 125)" />
      <ellipse cx="138" cy="125" rx="9" ry="24" fill="url(#breechSkin)" transform="rotate(25 138 125)" />
      {/* Legs toward cervix */}
      <ellipse cx="96" cy="175" rx="10" ry="28" fill="url(#breechSkin)" />
      <ellipse cx="124" cy="175" rx="10" ry="28" fill="url(#breechSkin)" />
      <ellipse cx="94" cy="205" rx="8" ry="14" fill="#e8b894" />
      <ellipse cx="126" cy="205" rx="8" ry="14" fill="#e8b894" />
    </svg>
  );
}

/** Cross-section uterus + fetus — vertex / cephalic (head toward cervix). */
export function VertexPresentationDiagram({ className = "" }: PresentationDiagramProps) {
  return (
    <svg
      viewBox="0 0 220 300"
      className={className}
      role="img"
      aria-label="Vertex presentation: fetus head-first"
    >
      <defs>
        <radialGradient id="vertexUterus" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fbe8e6" />
          <stop offset="100%" stopColor="#f0d0cc" />
        </radialGradient>
        <linearGradient id="vertexSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0c4a8" />
          <stop offset="100%" stopColor="#d99a72" />
        </linearGradient>
      </defs>
      <path
        d="M40 40 C40 20 70 8 110 8 C150 8 180 20 180 40 L185 250 C185 275 155 292 110 292 C65 292 35 275 35 250 Z"
        fill="#faf6f5"
        stroke="#c4a8a4"
        strokeWidth="2.5"
      />
      <ellipse
        cx="110"
        cy="155"
        rx="68"
        ry="100"
        fill="url(#vertexUterus)"
        stroke="#c98f8a"
        strokeWidth="2.5"
      />
      <path
        d="M95 245 Q110 268 125 245"
        fill="#e8c4bf"
        stroke="#c98f8a"
        strokeWidth="2"
      />
      {/* Fetus — head down (vertex) */}
      <ellipse cx="110" cy="175" rx="26" ry="32" fill="url(#vertexSkin)" />
      <circle cx="110" cy="222" r="20" fill="#e8b894" />
      <circle cx="103" cy="218" r="2.2" fill="#5c4033" />
      <circle cx="117" cy="218" r="2.2" fill="#5c4033" />
      <path d="M104 228 Q110 232 116 228" fill="none" stroke="#5c4033" strokeWidth="1.4" />
      <ellipse cx="82" cy="155" rx="9" ry="24" fill="url(#vertexSkin)" transform="rotate(20 82 155)" />
      <ellipse cx="138" cy="155" rx="9" ry="24" fill="url(#vertexSkin)" transform="rotate(-20 138 155)" />
      <ellipse cx="96" cy="118" rx="10" ry="26" fill="url(#vertexSkin)" />
      <ellipse cx="124" cy="118" rx="10" ry="26" fill="url(#vertexSkin)" />
      <ellipse cx="94" cy="92" rx="8" ry="12" fill="#e8b894" />
      <ellipse cx="126" cy="92" rx="8" ry="12" fill="#e8b894" />
    </svg>
  );
}

/** Cross-section uterus + fetus — transverse / oblique (shoulder presentation). */
export function TransversePresentationDiagram({ className = "" }: PresentationDiagramProps) {
  return (
    <svg
      viewBox="0 0 220 300"
      className={className}
      role="img"
      aria-label="Transverse presentation: fetus lying sideways"
    >
      <defs>
        <radialGradient id="transUterus" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fbe8e6" />
          <stop offset="100%" stopColor="#f0d0cc" />
        </radialGradient>
        <linearGradient id="transSkin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f0c4a8" />
          <stop offset="100%" stopColor="#d99a72" />
        </linearGradient>
      </defs>
      <path
        d="M40 40 C40 20 70 8 110 8 C150 8 180 20 180 40 L185 250 C185 275 155 292 110 292 C65 292 35 275 35 250 Z"
        fill="#faf6f5"
        stroke="#c4a8a4"
        strokeWidth="2.5"
      />
      <ellipse
        cx="110"
        cy="155"
        rx="68"
        ry="100"
        fill="url(#transUterus)"
        stroke="#c98f8a"
        strokeWidth="2.5"
      />
      <path
        d="M95 245 Q110 268 125 245"
        fill="#e8c4bf"
        stroke="#c98f8a"
        strokeWidth="2"
      />
      {/* Fetus lying sideways */}
      <ellipse cx="110" cy="150" rx="48" ry="22" fill="url(#transSkin)" />
      <circle cx="62" cy="148" r="16" fill="#e8b894" />
      <circle cx="58" cy="144" r="1.8" fill="#5c4033" />
      <circle cx="66" cy="144" r="1.8" fill="#5c4033" />
      <ellipse cx="155" cy="142" rx="10" ry="16" fill="url(#transSkin)" />
      <ellipse cx="155" cy="160" rx="10" ry="16" fill="url(#transSkin)" />
      <ellipse cx="95" cy="128" rx="8" ry="14" fill="url(#transSkin)" transform="rotate(-40 95 128)" />
      <ellipse cx="95" cy="172" rx="8" ry="14" fill="url(#transSkin)" transform="rotate(40 95 172)" />
    </svg>
  );
}
