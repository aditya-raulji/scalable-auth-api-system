import { Toaster } from 'react-hot-toast';

const Toast = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        color: '#fff',
        fontWeight: '600',
      },
      success: {
        style: { background: '#00C896' },
      },
      error: {
        style: { background: '#FF4D4D' },
      },
    }}
  />
);

export default Toast;
