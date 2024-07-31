import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="mx-auto max-w-[980px]">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              A Simple NEXT.JS / PocketBase Demo
              <br className="hidden sm:inline" />
              that supports SSR & App router.
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-lg">
              Check the GitHub repo for instructions on how to get started.
            </p>
            <section className="mt-8 flex justify-center">
              <Link
                target="_blank"
                rel="noreferrer"
                href="/"
                className={buttonVariants()}
              >
                GitHub
              </Link>
            </section>
          </header>
        </div>
      </div>
    </div>
  );
}
