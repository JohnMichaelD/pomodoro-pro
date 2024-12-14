// components/InfoModal.tsx
interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-4 text-red-600">Attention span of a fish?</h2>
          <div className="text-gray-700 space-y-4">
            <p>The <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" className="underline hover:text-red-600">Pomodoro Technique</a> is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.</p>
            <div className="space-y-2">
              <h3 className="font-semibold">How to use:</h3>
              <ul className="list-disc pl-5">
                <li>Pomodoro: 25-minute work session</li>
                <li>Short Break: 5-minute rest</li>
                <li>Long Break: 15-minute rest</li>
              </ul>
            </div>
            <p>I see you&apos;ve already met Buddy, our resident tomato clownfish. He&apos;ll keep you company as you work through each cycle.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default InfoModal;