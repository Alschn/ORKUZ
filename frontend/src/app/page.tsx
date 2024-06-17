import ColorModeToggle from "~/components/ColorModeToggle";
import UserLoginIndicator from "~/components/UserLoginIndicator";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Hello world
        </h1>
        <div className="align-center flex">
          <ColorModeToggle />
          <UserLoginIndicator />
        </div>
      </div>
    </main>
  );
}
