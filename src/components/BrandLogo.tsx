interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function BrandLogo({ className = '', size = 'md', showTagline = false }: BrandLogoProps) {
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 56 : 44;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Architectural Logo Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]"
          aria-label="R.R Group Of Construction Logo"
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E29D" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9E7D23" />
            </linearGradient>
            <linearGradient id="charcoalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2F3D" />
              <stop offset="100%" stopColor="#12161E" />
            </linearGradient>
          </defs>

          {/* Background Rounded Shield / Hexagon Plate */}
          <rect width="100" height="100" rx="20" fill="url(#charcoalGrad)" stroke="url(#goldGrad)" strokeWidth="2.5" />

          {/* Cityscape Silhouette in Gold */}
          <rect x="36" y="22" width="7" height="24" fill="url(#goldGrad)" opacity="0.9" />
          <rect x="45" y="16" width="9" height="30" fill="url(#goldGrad)" />
          <rect x="56" y="24" width="7" height="22" fill="url(#goldGrad)" opacity="0.85" />
          {/* Windows inside tower */}
          <rect x="47.5" y="20" width="4" height="3" fill="#12161E" />
          <rect x="47.5" y="26" width="4" height="3" fill="#12161E" />
          <rect x="47.5" y="32" width="4" height="3" fill="#12161E" />

          {/* Roof Gable / Triangle */}
          <path
            d="M20 54 L50 32 L80 54"
            stroke="url(#goldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Window in Gable */}
          <rect x="46" y="42" width="8" height="8" rx="1" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <line x1="50" y1="42" x2="50" y2="50" stroke="url(#goldGrad)" strokeWidth="1" />
          <line x1="46" y1="46" x2="54" y2="46" stroke="url(#goldGrad)" strokeWidth="1" />

          {/* Double 'R' Monogram Base */}
          {/* Left R */}
          <path
            d="M26 80 V56 H39 C44 56 47 59 47 62 C47 66 44 69 39 69 H31 M37 69 L47 80"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right R (in Gold) */}
          <path
            d="M52 80 V56 H66 C71 56 74 59 74 62 C74 66 71 69 66 69 H58 M64 69 L74 80"
            stroke="url(#goldGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col text-left justify-center">
        <span className="font-display font-extrabold tracking-wider text-white text-base sm:text-xl leading-tight flex items-center gap-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          <span className="text-white font-black tracking-tight">R.R</span>
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent font-black tracking-wide">
            GROUP
          </span>
        </span>
        <span className="text-[9.5px] sm:text-[10.5px] tracking-[0.26em] font-bold text-amber-400/95 uppercase leading-snug flex items-center gap-1.5 mt-0.5">
          <span className="h-[1px] w-2.5 sm:w-3.5 bg-gradient-to-r from-amber-400/90 to-transparent inline-block" aria-hidden="true" />
          <span className="tracking-[0.24em] font-semibold text-amber-300/95">OF CONSTRUCTION</span>
          <span className="h-[1px] w-2.5 sm:w-3.5 bg-gradient-to-l from-amber-400/90 to-transparent inline-block" aria-hidden="true" />
        </span>
        {showTagline && (
          <span className="text-[10px] text-stone-400 font-normal tracking-wide hidden sm:inline mt-1">
            Building Dreams, Creating Excellence
          </span>
        )}
      </div>
    </div>
  );
}
