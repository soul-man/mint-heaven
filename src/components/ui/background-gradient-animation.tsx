"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "transparent",
  gradientBackgroundEnd = "transparent",
  firstColor = "72, 126, 241",
  secondColor = "33, 22, 112",
  thirdColor = "8, 17, 103",
  fourthColor = "34, 47, 168",
  fifthColor = "30, 14, 151",
  pointerColor = "190, 47, 11", // red light
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    // Animation loop for smoother movement
    const animateGradient = () => {
      if (!interactiveRef.current) return;

      // Smoother easing with slightly faster response (1/15 instead of 1/20)
      setCurX(prevX => prevX + (tgX - prevX) / 15);
      setCurY(prevY => prevY + (tgY - prevY) / 15);

      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      animationRef.current = requestAnimationFrame(animateGradient);
    };

    if (interactive) {
      animationRef.current = requestAnimationFrame(animateGradient);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [curX, curY, tgX, tgY, interactive]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={interactive ? handleMouseMove : undefined}
      className={cn(
        "h-screen sm:w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg absolute top-0 left-0",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center]`,
            `animate-first`,
            `opacity-60`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)]`,
            `animate-second`,
            `opacity-60`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third`,
            `opacity-60`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-200px)]`,
            `animate-fourth`,
            `opacity-60`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth`,
            `opacity-60`
          )}
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};

// New component for a single orb animation
export const SingleOrbAnimation = ({
  orbColor = "190, 47, 11", // Default red color
  size = "300px",
  blendingValue = "hard-light",
  children,
  className,
  containerClassName,
  orbPosition = "bottom-[-50px] left-[-50px]", // Add position parameter
}: {
  orbColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  orbPosition?: string; // New parameter for custom positioning
}) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use local CSS variables instead of document.body to avoid conflicts
    if (containerRef.current) {
      containerRef.current.style.setProperty("--orb-color", orbColor);
      containerRef.current.style.setProperty("--orb-size", size);
      containerRef.current.style.setProperty("--orb-blending", blendingValue);
    }
  }, [orbColor, size, blendingValue]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  // Add animation effect with useEffect
  useEffect(() => {
    if (!orbRef.current) return;

    // Create animation keyframes
    const animate = () => {
      const duration = 8000; // 8 seconds
      const startTime = Date.now();

      const frame = () => {
        if (!orbRef.current) return;

        const elapsed = (Date.now() - startTime) % duration;
        const progress = elapsed / duration;

        // Calculate position based on sine waves for smooth movement
        const xOffset = Math.sin(progress * Math.PI * 2) * 60; // 60px horizontal movement
        const yOffset = Math.sin(progress * Math.PI * 4) * 40; // 40px vertical movement

        // Apply transform directly
        orbRef.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        orbRef.current.style.opacity = (0.8 + Math.sin(progress * Math.PI * 2) * 0.2).toString();

        requestAnimationFrame(frame);
      };

      const animationId = requestAnimationFrame(frame);
      return () => cancelAnimationFrame(animationId);
    };

    const cleanup = animate();
    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-visible",
        containerClassName
      )}
      style={{
        "--orb-color": orbColor,
        "--orb-size": size,
        "--orb-blending": blendingValue,
      } as React.CSSProperties}
    >
      <div className={cn("relative z-10", className)}>{children}</div>
      <div
        className={cn(
          "absolute inset-0 w-full h-full",
          isSafari ? "blur-xl" : "blur-lg"
        )}
      >
        <div
          ref={orbRef}
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--orb-color),_0.9)_0,_rgba(var(--orb-color),_0)_70%)_no-repeat]`,
            `[mix-blend-mode:var(--orb-blending)] w-[var(--orb-size)] h-[var(--orb-size)]`,
            orbPosition, // Use the position parameter
            // Remove the Tailwind animation class and use JS animation instead
            `opacity-90`
          )}
        ></div>
      </div>
    </div>
  );
};
