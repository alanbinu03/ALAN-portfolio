import Link from "@/components/ui/Link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-20">
      <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">404</p>
      <h1 className="mt-4 text-balance text-3xl tracking-tight text-text sm:text-4xl">This page is not in the graph.</h1>
      <p className="mt-4 max-w-lg text-muted">
        The route does not exist. Return home or open the project index.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/" variant="primary">
          Home
        </Button>
        <Button href="/#projects" variant="secondary">
          Projects
        </Button>
      </div>
      <p className="mt-8 text-sm text-dim">
        Looking for a project slug that moved? Start from{" "}
        <Link href="/#projects" className="text-text underline-offset-4 hover:underline">
          featured work
        </Link>
        .
      </p>
    </Container>
  );
}
