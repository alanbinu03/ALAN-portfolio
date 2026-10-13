import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";

export default function Section({ id, children, className, as: Tag = "section" }) {
  return (
    <Tag id={id} className={cn("relative scroll-mt-28 py-20 sm:py-24 lg:py-28", className)}>
      <Container>{children}</Container>
    </Tag>
  );
}
