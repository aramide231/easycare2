import React from "react";

interface AuthHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`mb-8 ${className}`.trim()}>
      <h2 className="text-xl font-medium text-txt mb-2">{title}</h2>
      {description && <p className="text-sm text-muted">{description}</p>}
    </div>
  );
};
