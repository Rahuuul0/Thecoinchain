import { cn } from "./cn";

const WIDTHS = {
  xs: "max-w-[444px]",
  sm: "max-w-[600px]",
  md: "max-w-[900px]",
  lg: "max-w-[1200px]",
  xl: "max-w-[1536px]",
  fluid: "max-w-none",
};

export function Container({ as: Tag = "div", maxWidth = "lg", className, ...props }) {
  return <Tag className={cn("container-app", WIDTHS[maxWidth], className)} {...props} />;
}
