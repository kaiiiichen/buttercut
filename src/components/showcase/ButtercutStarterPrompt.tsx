import { ButtercutCopyBlock } from "@/components/showcase/ButtercutCopyBlock";

type ButtercutStarterPromptProps = {
  prompt: string;
};

export function ButtercutStarterPrompt({ prompt }: ButtercutStarterPromptProps) {
  return <ButtercutCopyBlock label="AI prompt" text={prompt} className="mt-3" />;
}
