import { FunInfoGraph } from "@/components/fun-info-graph";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {site.name}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
        {site.description}
      </p>

      <div className="mt-12 sm:mt-16">
        <FunInfoGraph />
      </div>
    </div>
  );
}
