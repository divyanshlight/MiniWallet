import React, { useEffect } from 'react';
import { Sheet } from 'react-modal-sheet';

const BottomSheetIframe = ({ open, url, onClose }) => {
  useEffect(() => {
    console.log('BottomSheetIframe open:', open);
    console.log('BottomSheetIframe url:', url);
  }, [open, url]);

  return (
    <Sheet isOpen={open} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {open && url && (
            <iframe
              src={url}
              width="100%"
              height="100%"
              style={{ border: 'none', minHeight: '400px' }}
              title="OAuth Login"
              onLoad={() => console.log('iframe loaded')}
            />
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default BottomSheetIframe;
