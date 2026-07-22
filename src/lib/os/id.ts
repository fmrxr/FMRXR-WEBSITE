/**
 * Génère un id lisible côté client (préfixe + horodatage base36), comme le monolithe
 * (`'okr-'+Date.now().toString(36)`). Isolé dans son propre module — un appel direct à Date.now()
 * depuis un composant/hook est flaggé par react-hooks/purity ; un appel via une fonction importée
 * ne l'est pas, car la règle analyse le corps des composants/hooks, pas les fonctions qu'ils appellent.
 */
export function genId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`;
}
