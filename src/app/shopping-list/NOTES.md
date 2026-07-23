# Notes — Refactor de la shopping-list vers un service

## 1. Pourquoi un service ?

Avant : `ShoppingList` (le composant parent) portait l'état (`items`) et les méthodes
(`addItem`/`removeItem`). Les deux enfants (`shopping-list-form`, `shopping-list-items`)
ne pouvaient pas se parler directement — ils devaient passer par le parent via
`@Input`/`@Output`.

Un service Angular permet de sortir cet état du composant et de le rendre accessible
directement à n'importe quel composant qui en a besoin, sans intermédiaire. Comme le
service est un **singleton** (une seule instance dans toute l'application), tous les
composants qui l'injectent voient et modifient la **même** donnée.

Bénéfices :
- Découplage : les composants enfants ne se connaissent plus entre eux.
- Testabilité : le service se teste isolément (logique pure), les composants se testent
  en mockant le service.
- Extensibilité : ajouter une persistance (localStorage, API) ne touche que le service.

## 2. `@Service()` vs `@Injectable()`

Les deux marquent une classe comme injectable dans le système de DI d'Angular.

- `@Injectable({ providedIn: 'root' })` : la syntaxe "historique", vue en cours.
- `@Service()` : nouvelle syntaxe simplifiée. Par défaut (`autoProvided: true` implicite),
  elle équivaut exactement à `@Injectable({ providedIn: 'root' })` — un singleton
  automatiquement fourni à la racine, sans rien déclarer ailleurs.
  - `@Service({ autoProvided: false })` : il faut alors le déclarer soi-même dans une
    liste de `providers`.
  - `@Service({ factory: () => ... })` : fournit une valeur calculée plutôt qu'une
    instance de classe.

Le CLI Angular génère `@Service()` par défaut (`ng generate service`), `@Injectable`
reste disponible via `ng generate service --injectable`.

## 3. Anatomie de `signal<string[]>([])`

- `signal(...)` : fonction d'Angular qui crée une **boîte réactive** contenant une
  valeur. Alternative moderne à une simple propriété de classe : Angular détecte les
  changements sans Zone.js et ne re-rend que ce qui en dépend.
- `<string[]>` : type générique, précise que le signal contiendra un tableau de chaînes
  (nécessaire ici car `[]` seul ne permet pas à TypeScript de déduire le type).
- `([])` : valeur initiale (tableau vide).

Usage :
- Lire : `monSignal()` (avec parenthèses, comme un appel de fonction).
- Écrire : jamais de ré-assignation directe — on utilise `.set(nouvelleValeur)` ou
  `.update(ancienneValeur => nouvelleValeur)`.

## 4. Construire le service (`SLServices`)

1. **Signal privé** : `_items = signal<ShoppingItem[]>([])` — jamais exposé directement
   en écriture.
2. **Version publique en lecture seule** : `items = this._items.asReadonly()` — les
   composants peuvent lire mais jamais muter directement.
3. **Méthodes publiques** (`addItem`, `removeItem`) : seules autorisées à appeler
   `.update()` sur le signal privé.

## 5. Injecter le service dans un composant

```typescript
private sl = inject(SLServices);
```

`inject()` demande à Angular l'instance déjà existante du service (pas besoin de
constructeur, pas besoin de `providers: [...]` puisque `@Service()`/`providedIn: 'root'`
s'en charge).

Une fois injecté :
- Lire l'état : `this.sl.items()` dans le composant ou le template.
- Modifier l'état : appeler directement `this.sl.addItem(...)` / `this.sl.removeItem(...)`.

Conséquence : plus besoin de `@Input()`/`@Output()`/`EventEmitter` entre les composants
enfants — chacun accède directement à la même donnée partagée. Le composant parent
(`ShoppingList`) redevient un simple conteneur de mise en page, sans état ni méthode.

**Analogie** : avant, chaque enfant travaillait sur sa propre feuille et devait passer
par un intermédiaire (le parent) pour transmettre une info (`@Output` = "crier vers
l'extérieur"). Avec le service, tout le monde a un accès direct à la même feuille
partagée.

## 6. Gérer les doublons (quantités) — logique de `addItem(name, quantity)`

Modèle de données :

```typescript
export interface ShoppingItem {
  name: string;
  quantity: number;
}
```

Une `interface` définit une "forme" de données (contrat), sans logique. Elle se déclare
au niveau du fichier, en dehors de la classe, avant qu'on s'en serve.

Logique d'ajout, avec fusion insensible à la casse :

1. Normaliser le nom reçu : `name.trim().toLowerCase()`.
2. Chercher un article existant avec `list.findIndex(...)` (retourne la position ou
   `-1` si absent).
3. Si trouvé : reconstruire le tableau avec `list.map(...)`, en remplaçant l'article
   trouvé par une **copie** (`{ ...item, quantity: item.quantity + quantity }`) —
   jamais de mutation directe de l'objet existant.
4. Sinon : comportement classique, `[...list, { name: name.trim(), quantity }]`.

Concepts TS/JS utilisés :
- **Opérateur spread** (`...list`, `...item`) : copie le contenu d'un tableau/objet
  dans un nouveau, sans muter l'original (important pour que les signals détectent
  bien le changement).
- **Opérateur ternaire** (`condition ? siVrai : siFaux`) : raccourci d'un if/else en
  une expression.
- **`findIndex`** : trouve la position du premier élément qui matche une condition.
- **`map`** : reconstruit un tableau en transformant chaque élément.

## 7. Syntaxe du template `@for`

```html
@for (item of items(); track $index; let i = $index) {
  ...
}
```

- `@for (...) { ... }` : nouveau control-flow block d'Angular (remplace `*ngFor`).
- `item of items()` : `items()` lit la valeur du signal ; `item` est l'élément courant
  à chaque itération.
- `track $index` : **obligatoire**. Dit à Angular comment identifier chaque élément
  entre deux rendus (ici la position, faute d'ID unique sur les articles).
- `let i = $index` : `$index` est une variable spéciale fournie par `@for` (position
  courante) ; on la copie dans `i` pour pouvoir l'utiliser ailleurs dans le bloc
  (ex: `remove(i)`).

## 8. Piège Flexbox : le champ quantité restait large

Un `<input>` a par défaut une **largeur minimale intrinsèque** (`min-width: auto`) basée
sur son rendu natif, qui peut dépasser le `flex-basis` qu'on lui donne. Même avec
`flex: 0 0 70px`, le navigateur refuse de rétrécir l'élément en dessous de cette largeur
minimale native.

Fix : ajouter explicitement `min-width: 0` sur l'élément concerné pour lever cette
contrainte et laisser `flex-basis` faire foi.
