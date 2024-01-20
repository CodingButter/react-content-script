import React, { useState, useEffect, useRef, useCallback } from "react";

interface ModalProps {
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
  mouseLeaveDistance: number;
  onClose?: () => void;
  shouldFollowMouse?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  triggerRef,
  mouseLeaveDistance = 50,
  onClose,
  shouldFollowMouse = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<{ [key: string]: number }>(
    { top: 0, left: 0 }
  );
  const modalRef = useRef<HTMLDivElement>(null);

  const updateModalPosition = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current) {
        //calculate the width and height of the modal and use that to center it to the mouse
        const modalWidth = modalRef.current.offsetWidth;
        const modalHeight = modalRef.current.offsetHeight;

        //calculate the distance from the mouse to the edge of the screen
        const shouldDisplayLeft = e.clientX < modalWidth;
        const shouldDisplayRight = window.innerWidth - e.clientX < modalWidth;
        const shouldDisplayAbove = window.innerHeight - e.clientY < modalHeight;
        const shouldDisplayBelow = e.clientY < modalHeight;
        setModalPosition({
          top: shouldDisplayAbove ? e.clientY - modalHeight : e.clientY,
          left: shouldDisplayLeft
            ? e.clientX
            : shouldDisplayRight
            ? e.clientX - modalWidth
            : e.clientX - modalWidth / 2,
        });
      }
    },
    [modalRef.current, setModalPosition]
  );

  const handleMouseEnter = useCallback(() => {
    setIsModalVisible(true);
    if (shouldFollowMouse && triggerRef.current) {
      triggerRef.current.addEventListener("mousemove", updateModalPosition);
    }
  }, [shouldFollowMouse, updateModalPosition, triggerRef]);

  const handleMouseLeave = useCallback(() => {
    setIsModalVisible(false);
    if (shouldFollowMouse && triggerRef.current) {
      triggerRef.current.removeEventListener("mousemove", updateModalPosition);
    }
    if (onClose) onClose();
  }, [shouldFollowMouse, updateModalPosition, onClose, triggerRef]);

  useEffect(() => {
    if (triggerRef && triggerRef.current) {
      triggerRef.current.onmouseenter = handleMouseEnter;
      triggerRef.current.onmouseleave = handleMouseLeave;
    }

    return () => {
      if (triggerRef.current) {
        triggerRef.current.removeEventListener(
          "mousemove",
          updateModalPosition
        );
      }
    };
  }, [triggerRef, handleMouseEnter, handleMouseLeave]);

  return isModalVisible ? (
    <div
      ref={modalRef}
      className="modal"
      style={{
        position: "fixed",
        top: `${modalPosition.top}px`,
        left: `${modalPosition.left}px`,
      }}
    >
      {children}
    </div>
  ) : null;
};

export default Modal;
