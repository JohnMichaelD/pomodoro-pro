import Button from "./components/buttons/Button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col h-full">
        <h1>Pomodoro Timer</h1>
        <img src="GreenTomato.png"></img>
        <section className="flex gap-2">
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </section>
      </main>
    </div>
  );
}
