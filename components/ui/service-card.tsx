import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col justify-between w-full p-6 overflow-hidden rounded-2xl border transition-all duration-300 ease-in-out group text-[var(--text-primary)]",
  {
    variants: {
      variant: {
        default: "border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-cyan-300/40 hover:shadow-[0_14px_40px_rgba(34,211,238,0.18)]",
        red: "border-red-400/35 bg-red-500/10 hover:shadow-[0_14px_40px_rgba(248,113,113,0.2)]",
        blue: "border-blue-400/35 bg-blue-500/10 hover:shadow-[0_14px_40px_rgba(96,165,250,0.2)]",
        gray: "border-violet-400/35 bg-violet-500/10 hover:shadow-[0_14px_40px_rgba(167,139,250,0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ServiceCardProps
  extends VariantProps<typeof cardVariants> {
  className?: string;
  title: string;
  href: string;
  imgSrc?: string;
  imgAlt?: string;
  ctaLabel?: string;
  cornerGraphic?: React.ReactNode;
  children?: React.ReactNode;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, variant, title, href, imgSrc, imgAlt, ctaLabel = "Learn More", cornerGraphic, children }, ref) => {
    const cardAnimation = {
      hover: {
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 },
      },
    };

    const imageAnimation = {
      hover: {
        scale: 1.08,
        rotate: 3,
        x: 10,
        transition: { duration: 0.4, ease: "easeInOut" },
      },
    };

    const arrowAnimation = {
      hover: {
        x: 5,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse" as const,
        },
      },
    };

    return (
      <motion.div
        className={cn(cardVariants({ variant, className }))}
        ref={ref}
        variants={cardAnimation}
        whileHover="hover"
      >
        <div className="relative z-10 flex flex-col h-full gap-3">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h3>
          {children}
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Learn more about ${title}`}
            className="mt-auto inline-flex items-center text-sm font-semibold tracking-wide uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            {ctaLabel}
            <motion.div variants={arrowAnimation}>
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </a>
        </div>

        {cornerGraphic ? (
          <motion.div
            className="absolute right-5 bottom-4 opacity-75 group-hover:opacity-95"
            variants={imageAnimation}
          >
            {cornerGraphic}
          </motion.div>
        ) : (
          imgSrc && (
            <motion.img
              src={imgSrc}
              alt={imgAlt || `${title} illustration`}
              className="absolute -right-8 -bottom-8 w-40 h-40 object-cover rounded-3xl opacity-70 group-hover:opacity-95"
              variants={imageAnimation}
            />
          )
        )}
      </motion.div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
