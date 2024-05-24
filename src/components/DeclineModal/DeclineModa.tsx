import React from 'react';
import {
  ContextualMenu,
  IDragOptions,
  IconButton,
  Modal,
  IIconProps,
} from '@fluentui/react';

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const DeclineModal: React.FC = () => {
  const keepInBounds = true;

  const dragOptions = React.useMemo(
    (): IDragOptions => ({
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu,
      keepInBounds,
      dragHandleSelector: '.ms-Modal-scrollableContent > div:first-child',
    }),
    [keepInBounds]
  );

  return (
    <Modal
      isOpen={true}
      isBlocking={false}
      dragOptions={dragOptions}
      containerClassName="modal-container"
    >
      <div className="modal-header">
        <IconButton
          styles={{ root: { float: 'right' } }}
          iconProps={cancelIcon}
          ariaLabel="Close popup modal"
          onClick={() => console.log('Modal closed')}
        />
        <h2>Draggable Modal Header</h2>
      </div>
      <div style={{ padding: '20px' }}>
        <p>
          This is a draggable modal. Click and drag the header to move the modal around.
        </p>
      </div>
    </Modal>
  );
};

export default DeclineModal;
