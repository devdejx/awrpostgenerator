
import { Loader } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background dot-pattern flex items-center justify-center z-50">
      <div className="text-primary animate-spin">
        <Loader size={48} className="text-[#D4AF37]" />
      </div>
    </div>
  );
};

export default LoadingScreen;
