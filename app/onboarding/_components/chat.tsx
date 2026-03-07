"use client";

import Link from "next/link";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowUp, Sparkles } from "lucide-react";
import { Streamdown } from "streamdown";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n");
}

const ONBOARDING_MESSAGES = [
  "Bem-vindo ao FIT.AI! 🎉",
  "O app que vai transformar a forma como você treina. Aqui você monta seu plano de treino personalizado, acompanha sua evolução com estatísticas detalhadas e conta com uma IA disponível 24h para te guiar em cada exercício.",
  "Tudo pensado para você alcançar seus objetivos de forma inteligente e consistente.",
  "Vamos configurar seu perfil?",
];

export function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/ai",
    }),
  });

  const isSubmitting = status === "submitted" || status === "streaming";

  const handleSend = (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSubmitting) {
      return;
    }

    setInput("");
    void sendMessage({ text: trimmedMessage });
  };

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-2">
          <div className="flex size-11 items-center justify-center rounded-full border border-primary-light bg-primary-light/50">
            <Sparkles className="size-4.5 text-primary" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-heading text-base font-semibold leading-[1.05] text-foreground">
              Coach AI
            </p>
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-online" />
              <span className="font-heading text-xs text-primary">Online</span>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-auto rounded-full px-4 py-2 font-heading text-xs font-semibold"
          asChild
        >
          <Link href="/">Acessar FIT.AI</Link>
        </Button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-3 overflow-y-auto px-5 pt-5">
          {ONBOARDING_MESSAGES.map((message) => (
            <div key={message} className="max-w-[calc(100%-40px)] rounded-xl bg-secondary p-3">
              <p className="font-heading text-sm leading-[1.4] text-foreground">
                {message}
              </p>
            </div>
          ))}

          <div className="flex justify-end pt-5">
            <div className="rounded-xl bg-primary p-3">
              <p className="font-heading text-sm leading-[1.4] text-primary-foreground">
                Começar!
              </p>
            </div>
          </div>

          {messages.map((message) => {
            const text = getMessageText(message);

            if (!text) {
              return null;
            }

            const isUserMessage = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 ${
                    isUserMessage
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <Streamdown className="font-heading text-sm leading-[1.4]">
                    {text}
                  </Streamdown>
                </div>
              </div>
            );
          })}
        </div>

        <form
          className="mt-5 flex items-center gap-2 border-t border-border p-5"
          onSubmit={(event) => {
            event.preventDefault();
            handleSend(input);
          }}
        >
          <Input
            placeholder="Digite sua mensagem"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="h-12 rounded-full border-border bg-secondary px-4 font-heading text-sm"
          />
          <Button
            type="submit"
            size="icon"
            className="size-10 rounded-full"
            disabled={isSubmitting}
            aria-label="Enviar mensagem"
          >
            <ArrowUp className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
