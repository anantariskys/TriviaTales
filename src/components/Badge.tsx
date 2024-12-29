// components/Badge.tsx
interface BadgeProps {
    label: string;
    value: number | string;
    color?: string;
    textColor?: string;
  }
  
  const Badge: React.FC<BadgeProps> = ({ label, value, color = "bg-blue-100", textColor = "text-blue-800" }) => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-1  rounded-md ${color} ${textColor}`}
      >
        <span className="font-semibold">{label}:</span>
        <span className="font-bold">{value}</span>
      </div>
    );
  };
  
  export default Badge;
  