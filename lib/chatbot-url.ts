export const CHAT_OPEN_QUERY_KEY = "chat_open";
export const CHAT_INITIAL_MESSAGE_QUERY_KEY = "chat_initial_message";
export const CHAT_SUGGESTION_MESSAGE = "Monte meu plano de treino";

export function getExerciseHelpMessage(exerciseName: string): string {
  return `Como executar o exercício ${exerciseName} corretamente?`;
}

export function buildOpenChatHref(pathname: string, initialMessage?: string) {
  const searchParams = new URLSearchParams();
  searchParams.set(CHAT_OPEN_QUERY_KEY, "true");

  if (initialMessage) {
    searchParams.set(CHAT_INITIAL_MESSAGE_QUERY_KEY, initialMessage);
  }

  const query = searchParams.toString();
  return query.length > 0 ? `${pathname}?${query}` : pathname;
}
