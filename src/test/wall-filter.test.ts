import { describe, expect, it } from "vitest";
import { assess, flagText } from "@/lib/wall/moderation";

// Le filtre du Live Wall : ce qui monte, ce qui attend l'equipe, ce qui est
// bloque. Les phrases « ok » sont celles d'une vraie soiree : le pire defaut
// du filtre serait de retenir un remerciement.

const level = (s: string, extra?: string[]) => assess(s, extra).level;

describe("filtre du mur : ce qui monte tout seul", () => {
  it.each([
    "Merci pour cette soirée magique ❤",
    "Une soirée unique, technique au top, musique de folie",
    "Désolé pour le retard, quelle ambiance",
    "Toute la salle était debout",
    "Niquel la soirée, bravo !",
    "Bravo à Tahani et à toute l'équipe",
    "Allez Zamalek",
    "Un negroni au bar et c'est parti",
    "Bonne fête maman, ta mère est géniale",
    "Le député était là, une soirée très réputée",
    "On s'est connu ici il y a dix ans",
    "Best team night in years",
    "What a night. Thank you!",
    "I'm late but it was worth it",
    "شكرا على هذه الليلة",
    "يعطيكم الصحة على التنظيم",
    "ليلة لا تُنسى، شكراً لكم",
    "3aychin ya jme3a, nhebkom barcha",
    "ya3tikom sa7a, sahria behya barcha",
    "Rania, Karim et Yasmine 💛",
    "Scunthorpe united",
    "Toute la salle, ce soir !",
  ])("%s", (s) => expect(level(s)).toBe("ok"));
});

describe("filtre du mur : ce qui est bloque", () => {
  it.each([
    "quel connard",
    "fuuuuck this",
    "f.u.c.k",
    "f u c k you",
    "b1tch",
    "quel conn4rd ce DJ",
    "s4l0pe",
    "fils de pute",
    "enculés",
    "zebi",
    "9a7ba",
    "nayek omek",
    "zok omek",
    "قحبة",
    "والقحبة",
    "يلعن دين امك",
    "🖕",
  ])("%s", (s) => expect(level(s)).toBe("block"));

  it("un mot ajoute par la campagne est bloque", () => {
    expect(level("concurrent nul", ["concurrent"])).toBe("block");
  });
});

describe("filtre du mur : ce qui attend l'equipe", () => {
  it.each([
    "f*ck",
    "p#te",
    "fuuck",
    "conard",
    "lesconnards du fond",
    "ma chatte s'appelle Mimi",
    "putain c'était bien",
    "il est un peu con",
    "ya kalb",
    "va sur www.example.com",
    "appelle 22 333 444",
    "suivez @moncompte",
    "🍆🍑",
  ])("%s", (s) => expect(level(s)).toBe("doubt"));
});

describe("filtre du mur : compatibilite", () => {
  it("flagText donne la raison, ou null", () => {
    expect(flagText("Merci !")).toBeNull();
    expect(flagText("quel connard")).toBe("bloque");
    expect(flagText("va sur www.example.com")).toBe("lien");
    expect(flagText("appelle 22 333 444")).toBe("numero");
    expect(flagText("suivez @moncompte")).toBe("compte");
  });
});
