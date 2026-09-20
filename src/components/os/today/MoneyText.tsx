import { Fragment } from "react";
import { MONEY_SLOT } from "@/lib/os/today-copy";
import { Money } from "../Money";

/**
 * Rend une phrase qui contient MONEY_SLOT en injectant <Money> à la place, pour que la bascule
 * TND/€ et le mode présentation s'appliquent aussi aux montants écrits dans du texte.
 */
export function MoneyText({ text, amountTND }: { text: string; amountTND?: number }) {
  if (amountTND === undefined || !text.includes(MONEY_SLOT)) return <>{text}</>;
  const parts = text.split(MONEY_SLOT);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <Money amountTND={amountTND} />}
        </Fragment>
      ))}
    </>
  );
}
