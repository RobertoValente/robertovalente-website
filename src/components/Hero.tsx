import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Linkedin } from "lucide-react";

export function Hero() {
    return (
        <section id="about" className="px-4">
            <div className="mb-6 group">
                <div className="relative">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-200">
                            <span className="text-xl">🧑‍💻</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-foreground uppercase underline underline-offset-4">
                                About Me
                            </h2>
                        </div>
                    </div>
                    <div className="absolute left-5 top-12 w-px h-4 bg-gradient-to-b from-primary/40 to-transparent"></div>
                </div>
            </div>
            <Card className="p-0 transition-all duration-300 hover:shadow-lg">
                <CardContent className="flex flex-row p-6 gap-6 items-center group">
                    <div id="text" className="flex-1 max-w-[420px]">
                        <h1 className="font-bold text-3xl mb-4 tracking-tight">{"What's Up! 🫡"}</h1>
                        <p className="text-base leading-7 mb-4 text-muted-foreground">
                            <span className="font-semibold text-foreground underline underline-offset-2">
                                {"I'm Roberto"}
                            </span>
                            {" — a developer and a dreamer with action! Always learning, always building."}
                        </p>

                        <div className="flex flex-row gap-2 mt-4">
                            <Button
                                asChild
                                variant="outline"
                                className="cursor-pointer hover:scale-105 hover:shadow-md hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                            >
                                <Link href="https://github.com/RobertoValente" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
                                    Github
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="cursor-pointer hover:scale-105 hover:shadow-md hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"

                            >
                                <Link href="https://www.linkedin.com/in/robertovalennte/" target="_blank">
                                    <Linkedin className="size-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200" />
                                    LinkedIn
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div id="img" className="hidden sm:flex items-center justify-center sm:basis-1/3">
                        <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-6xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">👨‍💻</div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}