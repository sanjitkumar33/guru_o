import { ActionIcon, Tooltip, rem } from '@mantine/core';
import { useState } from 'react';

export function QRCodeButton({ size = 24, data, openModal, style, ...others }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    openModal(data); // Call the passed function to open the modal and pass the UPI data
  };

  return (
    <Tooltip label={clicked ? 'Clicked' : 'Show UPI ID'} withArrow position="right">
      <ActionIcon
        color={clicked ? 'teal' : 'transparent'}
        variant="subtle"
        onClick={handleClick}
        style={{ backgroundColor: 'var(--heading-color)', ...style }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={rem(size)}
          height={rem(size)}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-qrcode"
          {...others}
        >
         <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M7 17l0 .01" />
        <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M7 7l0 .01" />
        <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M17 7l0 .01" />
        <path d="M14 14l3 0" />
        <path d="M20 14l0 .01" />
        <path d="M14 14l0 3" />
        <path d="M14 20l3 0" />
        <path d="M17 17l3 0" />
        <path d="M20 17l0 3" />
        </svg>
      </ActionIcon>
    </Tooltip>
  );
}

export default QRCodeButton;
