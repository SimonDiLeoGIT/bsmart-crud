import React, { useEffect, useState } from 'react';
import '../../public/styles/message.css';

interface Props {
  message: string | null;
}

const Message: React.FC<Props> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message]);

  return (
    <div className={`dialog  fixed top-4 left-1/3 right-1/3 p-4 mb-4 font-semibold text-green-700 bg-green-100 rounded-lg ${visible ? 'visible' : 'hidden'}`} role="alert">
      {message}
    </div>
  );
};

export default Message;
