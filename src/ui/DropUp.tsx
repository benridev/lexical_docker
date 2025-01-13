/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Dispatch
} from 'react';
import {createPortal} from 'react-dom';

type DropUpContextType = {
  registerItem: (ref: React.RefObject<HTMLButtonElement>) => void;
};

const DropUpContext = React.createContext<DropUpContextType | null>(null);

const dropUpPadding = 4;

export function DropUpItem({
  children,
  className,
  onClick,
  title,
}: {
  children: React.ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const dropUpContext = React.useContext(DropUpContext);

  if (dropUpContext === null) {
    throw new Error('DropUpItem must be used within a DropUp');
  }

  const {registerItem} = dropUpContext;

  useEffect(() => {
    if (ref && ref.current) {
      registerItem(ref);
    }
  }, [ref, registerItem]);

  return (
    <button
      className={className}
      onClick={onClick}
      ref={ref}
      title={title}
      type="button">
      {children}
    </button>
  );
}

function DropUpItems({
  children,
  dropUpRef,
  onClose,
}: {
  children: React.ReactNode;
  dropUpRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
}) {
  const [items, setItems] = useState<React.RefObject<HTMLButtonElement>[]>();
  const [highlightedItem, setHighlightedItem] =
    useState<React.RefObject<HTMLButtonElement>>();

  const registerItem = useCallback(
    (itemRef: React.RefObject<HTMLButtonElement>) => {
      setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]));
    },
    [setItems],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!items) {
      return;
    }

    const key = event.key;

    if (['Escape', 'ArrowUp', 'ArrowDown', 'Tab'].includes(key)) {
      event.preventDefault();
    }

    if (key === 'Escape' || key === 'Tab') {
      onClose();
    } else if (key === 'ArrowUp') {
      setHighlightedItem((prev) => {
        if (!prev) {
          return items[0];
        }
        const index = items.indexOf(prev) - 1;
        return items[index === -1 ? items.length - 1 : index];
      });
    } else if (key === 'ArrowDown') {
      setHighlightedItem((prev) => {
        if (!prev) {
          return items[0];
        }
        return items[items.indexOf(prev) + 1];
      });
    }
  };

  const contextValue = useMemo(
    () => ({
      registerItem,
    }),
    [registerItem],
  );

  useEffect(() => {
    if (items && !highlightedItem) {
      setHighlightedItem(items[0]);
    }

    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current.focus();
    }
  }, [items, highlightedItem]);

  return (
    <DropUpContext.Provider value={contextValue}>
      <div className="dropdown" ref={dropUpRef} onKeyDown={handleKeyDown}>
        {children}
      </div>
    </DropUpContext.Provider>
  );
}

export default function DropUp({
  disabled = false,
  buttonLabel,
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  children,
  stopCloseOnClickSelf,
  // onClose,
  setShow
}: {
  disabled?: boolean;
  buttonAriaLabel?: string;
  buttonClassName: string;
  buttonIconClassName?: string;
  buttonLabel?: string;
  children: ReactNode;
  stopCloseOnClickSelf?: boolean;
  // onClose:()=>void;
  setShow?:Dispatch<boolean>;
}): JSX.Element {
  const dropUpRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showDropUp, setShowDropUp] = useState(false);

  const handleClose = () => {
    console.log('closed');
    setShowDropUp(false);
    if (buttonRef && buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  useEffect(() => {
    if(typeof setShow === 'function'){
      setShow(showDropUp)
    };
    const button = buttonRef.current;
    const dropUp = dropUpRef.current;

    if (showDropUp && button !== null && dropUp !== null) {
      const {top, left} = button.getBoundingClientRect();
      dropUp.style.top = `${top - dropUp.offsetHeight -  dropUpPadding}px`;
      dropUp.style.left = `${Math.min(
        left,
        window.innerWidth - dropUp.offsetWidth - 20,
      )}px`;
    }
  }, [dropUpRef, buttonRef, showDropUp]);

  useEffect(() => {
    const button = buttonRef.current;

    if (button !== null && showDropUp) {
      const handle = (event: MouseEvent) => {
        const target = event.target;
        if (stopCloseOnClickSelf) {
          if (
            dropUpRef.current &&
            dropUpRef.current.contains(target as Node)
          ) {
            return;
          }
        }
        if (!button.contains(target as Node)) {
          setShowDropUp(false);
          // onClose();
          // console.log('click close');
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropUpRef, buttonRef, showDropUp, stopCloseOnClickSelf]);

  useEffect(() => {
    const handleButtonPositionUpdate = () => {
      if (showDropUp) {
        const button = buttonRef.current;
        const dropUp = dropUpRef.current;
        if (button !== null && dropUp !== null) {
          const {top} = button.getBoundingClientRect();
          const newPosition = top + button.offsetHeight + dropUpPadding;
          if (newPosition !== dropUp.getBoundingClientRect().top) {
            dropUp.style.top = `${newPosition}px`;
          }
        }
      }
    };

    document.addEventListener('scroll', handleButtonPositionUpdate);

    return () => {
      document.removeEventListener('scroll', handleButtonPositionUpdate);
    };
  }, [buttonRef, dropUpRef, showDropUp]);

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        aria-label={buttonAriaLabel || buttonLabel}
        className={buttonClassName}
        onClick={() => {setShowDropUp(!showDropUp)}}
        ref={buttonRef}>
        {buttonIconClassName && <span className={buttonIconClassName} />}
        {buttonLabel && (
          <span className="text dropup-button-text">{buttonLabel}</span>
        )}
        <i className="chevron-down" />
      </button>

      {showDropUp &&
        createPortal(
          <DropUpItems dropUpRef={dropUpRef} onClose={handleClose}>
            {children}
          </DropUpItems>,
          document.body,
        )}
    </>
  );
}
