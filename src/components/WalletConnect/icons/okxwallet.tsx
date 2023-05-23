import { ComponentProps, forwardRef } from "react";

interface SvgProps extends Omit<ComponentProps<"svg">, "className"> {
  className?: string;
}

const OkxWalletIcon = forwardRef<
  SVGSVGElement,
  SvgProps
>(({ className, ...rest }, ref) => {
  return (
    <>
      <svg ref={ref} {...rest} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" className={className ? className : "h-4"} viewBox="0 0 251.95 251.95">
          <title>okx</title>
          <circle cx="125.98" cy="125.98" r="125.98" />
          <path fill="#fff" className="cls-1" d="M152.15,100.88H106.94a3.44,3.44,0,0,0-3.48,3.4v44.13a3.44,3.44,0,0,0,3.48,3.4h45.21a3.43,3.43,0,0,0,3.47-3.4V104.28A3.43,3.43,0,0,0,152.15,100.88Z" transform="translate(-3.52 -1.52)" />
          <path fill="#fff" className="cls-1" d="M100,50H54.75a3.43,3.43,0,0,0-3.47,3.39V97.49a3.43,3.43,0,0,0,3.47,3.39H100a3.44,3.44,0,0,0,3.48-3.39V53.35A3.44,3.44,0,0,0,100,50Z" transform="translate(-3.52 -1.52)" />
          <path fill="#fff" className="cls-1" d="M204.29,50H159.08a3.44,3.44,0,0,0-3.48,3.39V97.49a3.44,3.44,0,0,0,3.48,3.39h45.21a3.44,3.44,0,0,0,3.48-3.39V53.35A3.44,3.44,0,0,0,204.29,50Z" transform="translate(-3.52 -1.52)" />
          <path fill="#fff" className="cls-1" d="M100,151.81H54.75a3.43,3.43,0,0,0-3.47,3.39v44.13a3.43,3.43,0,0,0,3.47,3.4H100a3.44,3.44,0,0,0,3.48-3.4V155.2A3.44,3.44,0,0,0,100,151.81Z" transform="translate(-3.52 -1.52)" />
          <path fill="#fff" className="cls-1" d="M204.29,151.81H159.08a3.44,3.44,0,0,0-3.48,3.39v44.13a3.44,3.44,0,0,0,3.48,3.4h45.21a3.44,3.44,0,0,0,3.48-3.4V155.2A3.44,3.44,0,0,0,204.29,151.81Z" transform="translate(-3.52 -1.52)" />
        </svg>
    </>
  );
});

export default OkxWalletIcon;
