import Image from 'next/image';

export default function LogoBar() {
  return (
    <Image
      src="/images/auvp-logo.png"
      alt="Wren AI"
      width={80}
      height={40}
    />
  );
}
