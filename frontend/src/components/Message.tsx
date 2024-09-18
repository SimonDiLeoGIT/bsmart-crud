import { useEffect } from 'react';
import '../../public/styles/message.css';

interface Props {
  message: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const Message: React.FC<Props> = ({ message, visible, setVisible }) => {

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [visible, setVisible]);

  return (
    <div className={`dialog  fixed top-4 left-1/3 right-1/3 p-4 mb-4 font-semibold text-green-700 bg-green-200 border-green-700 border-2 rounded-lg ${visible ? 'visible' : 'hidden'} z-50`} role="alert">
      {message}
    </div>
  );
};

export default Message;
