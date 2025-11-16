import Modal from "../Modal/Modal";
import "./ConfirmationModal.css";

const ConfirmationModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="small">
      <div className="confirmation-modal-content">
        <p className="confirmation-message">{message}</p>

        <div className="confirmation-actions">
          <button className="btn cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>

          <button className="btn confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
