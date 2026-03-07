"use client";

import { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowUp, Sparkles, X } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { Streamdown } from "streamdown";

import {
  CHAT_INITIAL_MESSAGE_QUERY_KEY,
  CHAT_OPEN_QUERY_KEY,
  CHAT_SUGGESTION_MESSAGE,
} from "@/lib/chatbot-url";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n");
}

export function GlobalChatbot() {
  const [input, setInput] = useState("");
  const [{ chatOpen, chatInitialMessage }, setChatState] = useQueryStates(
    {
      chatOpen: parseAsBoolean.withDefault(false),
      chatInitialMessage: parseAsString,
    },
    {
      urlKeys: {
        chatOpen: CHAT_OPEN_QUERY_KEY,
        chatInitialMessage: CHAT_INITIAL_MESSAGE_QUERY_KEY,
      },
    },
  );

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/ai",
    }),
  });

  const hasMessages = messages.length > 0;
  const isSubmitting = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!chatOpen || !chatInitialMessage || isSubmitting) {
      return;
    }

    void setChatState({ chatInitialMessage: null });
    void sendMessage({ text: chatInitialMessage });
  }, [chatInitialMessage, chatOpen, isSubmitting, sendMessage, setChatState]);

  if (!chatOpen) {
    return null;
  }

  const handleClose = () => {
    void setChatState({ chatOpen: false, chatInitialMessage: null });
  };

  const handleSend = (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSubmitting) {
      return;
    }

    setInput("");
    void sendMessage({ text: trimmedMessage });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end bg-foreground/30 p-4 pt-40">
      <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-[20px] bg-card">
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
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground"
            onClick={handleClose}
            aria-label="Fechar chat"
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            {!hasMessages && (
              <div className="mr-10 rounded-xl bg-secondary p-3">
                <p className="font-heading text-sm leading-[1.4] text-foreground">
                  Ola! Sou sua IA personal. Como posso ajudar com seu treino hoje?
                </p>
              </div>
            )}

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

          {!hasMessages && (
            <div className="px-5 pb-3">
              <Button
                type="button"
                variant="ghost"
                className="h-auto rounded-full bg-primary-light/40 px-4 py-2 font-heading text-sm text-foreground hover:bg-primary-light/55"
                onClick={() => handleSend(CHAT_SUGGESTION_MESSAGE)}
              >
                {CHAT_SUGGESTION_MESSAGE}
              </Button>
            </div>
          )}

          <form
            className="flex items-center gap-2 border-t border-border p-5"
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
    </div>
  );
}
