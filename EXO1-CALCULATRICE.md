# Exercice — Mini calculatrice (route `/exo/exo1`)

Objectif : à `/exo/exo1`, avoir un input, un bouton "Ajouter" qui cumule la valeur saisie dans un résultat, et un bouton "Reset" qui remet ce résultat à 0.

Ce fichier sert de fil rouge : on coche les étapes au fur et à mesure et on note les explications de chaque notion Angular rencontrée.

## Étape 1 — Générer le composant ✅

Fait via `ng generate component exo/exo1`. Ça a créé `exo1.ts`, `exo1.html`, `exo1.scss`, `exo1.spec.ts`, avec un composant standalone (`imports: []`) et le sélecteur `app-exo1`.

## Étape 2 — Déclarer la route ✅

Dans `app.routes.ts`, une entrée `{ path: 'exo/exo1', component: Exo1 }` a été ajoutée, sur le modèle des routes `demo` et `exo` déjà présentes.

*(Mise à jour à l'Étape 9 : cette route plate a ensuite été convertie en route imbriquée avec `children:`.)*

## Étape 3 — Modéliser l'état dans `exo1.ts` ✅

Une classe de composant Angular, c'est l'état + le comportement ; le template ne fait que l'afficher et déclencher des actions dessus. Il faut donc se demander : *quelles données dois-je stocker, et quelles actions puis-je faire dessus ?*

Données à stocker (propriétés de la classe) :
- le **résultat courant** — un nombre, qui commence à 0
- la **valeur en cours de saisie** dans l'input — un nombre (ou une chaîne, à voir selon le type de l'input)

Actions à exposer (méthodes de la classe) :
- une méthode qui remet le résultat à 0
- une méthode qui ajoute la valeur saisie au résultat courant

Point d'attention : que doit devenir la valeur saisie une fois qu'elle a été ajoutée ? Faut-il vider l'input après un clic sur "Ajouter" ? C'est un choix à faire, pas une obligation technique.

**Statut : fait.** Classe validée avec `result`, `inputNumber`, `resetCalc()`, `addInput()`.

## Étape 4 — Construire `exo1.html` ✅

Trois mécanismes de binding Angular différents étaient demandés dans l'énoncé, chacun avec une syntaxe et un sens de circulation de la donnée différents :

| Besoin | Mécanisme | Sens |
|---|---|---|
| Afficher le résultat | Interpolation `{{ }}` (one-way) | TS → HTML uniquement |
| Champ de saisie | `[(ngModel)]` (two-way) | TS ↔ HTML dans les deux sens |
| Clic sur les boutons | Event binding `(click)` | HTML → TS (déclenche une méthode) |

Piège classique : `ngModel` vient de `FormsModule`, qui n'est pas importé par défaut dans un composant standalone. Sans l'ajouter au tableau `imports` du composant, Angular ne reconnaîtra pas la directive `ngModel` dans le template et le build échouera avec une erreur explicite (`Can't bind to 'ngModel'...`). C'est un bon réflexe à retenir pour la suite du cours : chaque directive/module utilisé dans un template standalone doit être importé explicitement dans ce composant précis.

**Statut : fait.** Template final : input `[(ngModel)]="inputNumber"`, bouton "Ajouter" `(click)="addInput()"`, bouton "Reset" `[disabled]="isResetDisabled" (click)="resetCalc()"`.

## Étape 5 — Tester ✅

`ng serve`, aller sur `/exo/exo1`, vérifié :
- [x] la saisie dans l'input est bien reflétée dans la propriété TS
- [x] "Ajouter" incrémente le résultat affiché
- [x] "Reset" remet le résultat à 0

## Étape 6 — Bonus : désactiver Reset quand il n'y a rien à réinitialiser ✅

Besoin : désactiver le bouton "Reset" quand `result` vaut 0 — ce qui couvre à la fois "valeur à 0 dès le départ" et "on vient de cliquer sur Reset", puisque `resetCalc()` amène justement `result` à 0. Une seule condition suffit, pas besoin d'un état séparé pour "vient d'être cliqué".

Deux notions mobilisées :
- **Property binding** `[disabled]="expression"` : crochets seuls (à distinguer de `(click)` — événement — et de `[(ngModel)]` — two-way). Pilote un attribut HTML natif depuis une expression TS qui doit rendre un booléen.
- **Getter** : plutôt que d'écrire `[disabled]="result === 0"` directement dans le template, la condition a été déportée dans un `get isResetDisabled(): boolean` de la classe. Un getter se lit comme une propriété (`isResetDisabled`, **sans parenthèses**, contrairement à un appel de méthode comme `addInput()`), et se recalcule à chaque lecture — donc toujours synchronisé avec `result` sans effort supplémentaire.

**Statut : fait.**

## Étape 7 — Intégrer le lien dans la banner ✅

Un lien "Calculatrice" a été ajouté dans `banner.html`, sur le modèle des liens Demo/Exo existants (`routerLink="/exo/exo1"` + `routerLinkActive="banner__button--active"`). Comme `RouterLink`/`RouterLinkActive` sont déjà importés dans `banner.ts`, aucun câblage supplémentaire n'était nécessaire.

Point de vigilance (comportement par défaut d'Angular, pas un bug) : `routerLinkActive` matche par défaut en mode "subset" — le lien "Exo" (`/exo`) peut donc s'activer visuellement en même temps que "Calculatrice" (`/exo/exo1`), puisque ce dernier chemin contient le premier. À surveiller si un jour le style doit distinguer précisément la route active (solution possible : l'option `[routerLinkActiveOptions]="{ exact: true }"`).

**Statut : fait.**

## Étape 8 — Mise en forme CSS ✅

Ajout de classes dans `exo1.html` (`calculator`, `calculator__result`, `calculator__controls`, `calculator__input`, `calculator__button`, `calculator__button--secondary`) pour avoir des points d'accroche stables, sans toucher à la logique existante. Style dans `exo1.scss` : carte arrondie, thème violet/indigo cohérent avec la banner, boutons avec état `:hover` et `:disabled` visuellement distincts (le `[disabled]` posé à l'Étape 6 se traduit ici par un `opacity` réduit + `cursor: not-allowed`).

**Statut : fait.**

## Étape 9 — Passage à une route imbriquée (`children:`) ✅

Question de départ : pourquoi ne pas écrire `exo/exo1` comme enfant de `exo` plutôt que comme chemin plat ?

Différence de fond entre les deux approches :
- **Chemin plat** (`{ path: 'exo/exo1', component: Exo1 }`) : une simple chaîne qui matche l'URL, sans lien avec la route `exo`. Le `<router-outlet>` racine (celui de `app.html`) affiche directement `Exo1` en remplaçant tout — `ExoMain` n'est jamais rendu au passage.
- **Route imbriquée** (`children:`) : le composant parent doit posséder son propre `<router-outlet>` dans son template, et l'enfant vient s'afficher **à l'intérieur** de lui. C'est fait pour des layouts partagés (un shell qui reste affiché pendant qu'une sous-partie change).

Trois fichiers modifiés pour basculer :
- `app.routes.ts` : la route `exo` porte maintenant `children: [{ path: 'exo1', component: Exo1 }]` — le `path` de l'enfant est **relatif** (`'exo1'`, pas `'exo/exo1'`), Angular concatène automatiquement avec le chemin du parent.
- `exo/main/main.ts` (le composant `ExoMain`) : ajout de `RouterOutlet` dans les `imports`.
- `exo/main/main.html` : ajout d'un `<router-outlet></router-outlet>` — c'est cet outlet, propre à `ExoMain`, qui accueille `Exo1`.

Vérifié visuellement : sur `/exo`, seul "exo works!" s'affiche ; sur `/exo/exo1`, "exo works!" **et** la calculatrice s'affichent ensemble, la seconde étant nichée dans le template du premier.

**Statut : fait.**

## Étape 10 — Passage de `result` et `resetEnable` en signaux ✅

Objectif : remplacer des propriétés classiques par l'API `signal()` d'Angular pour `result` et `resetEnable`.

Règle centrale des signaux, à respecter partout où ils sont utilisés : **plus aucune affectation directe avec `=`**.
- **Lire** la valeur : appeler le signal comme une fonction — `this.result()`.
- **Écrire** la valeur : appeler sa méthode `.set(nouvelleValeur)` — `this.result.set(0)`.
- Le signal lui-même (`this.result`, sans parenthèses) est l'objet réactif, jamais la valeur qu'il contient.

Changements dans `exo1.ts` :
- `result` et `resetEnable` déclarés `WritableSignal<number>` / `WritableSignal<boolean>` (et non plus `number`/`boolean` — l'ancienne annotation de type était incompatible avec ce que `signal(...)` retourne réellement).
- `resetCalc()` : `this.result.set(0)` et `this.resetEnable.set(false)` au lieu d'affectations directes.
- `addInput()` : lecture via `this.result()` / `this.inputNumber` dans le calcul, écriture via `.set(...)`.

Décision prise sur `inputNumber` : il **reste une propriété classique**, pas un signal. Raison : il est lié via `[(ngModel)]`, un two-way binding qui fonctionne en réassignant directement la propriété à chaque frappe (`inputNumber = valeurSaisie`) — si c'était un signal, cette réassignation écraserait silencieusement l'objet signal par une valeur brute, cassant tout. Les signaux et le two-way binding `ngModel` classique (forms template-driven) ne se combinent pas nativement ; seule une propriété simple convient ici.

Changements dans `exo1.html` :
- `{{ result }}` → `{{ result() }}`
- `[disabled]="!resetEnable"` → `[disabled]="!resetEnable()"`
- `[(ngModel)]="inputNumber"` inchangé (propriété classique, pas de parenthèses)

Note d'évolution : le mécanisme de désactivation du bouton Reset (Étape 6) est passé d'un **getter dérivé** (`isResetDisabled`, recalculé à chaque lecture à partir de `result`) à un **flag imprératif** (`resetEnable`, mis à jour manuellement dans `resetCalc()` et `addInput()`). Les deux fonctionnent, mais le getter garantissait par construction qu'on ne pouvait pas désynchroniser l'état d'affichage de `result` ; le flag manuel demande de penser à le mettre à jour à chaque endroit qui touche `result`.

**Statut : fait.**

## Journal des points appris

*(à compléter au fil de l'exercice — les "aha" moments, les erreurs rencontrées et pourquoi elles se produisent)*

- **Type de retour vs corps de la méthode** : si une méthode est typée pour retourner autre chose que `void`/`any`, TypeScript exige un `return` de ce type sur tous les chemins d'exécution. Une méthode qui ne fait que muter l'état (effet de bord) doit être typée `void`, pas un type arbitraire choisi par l'autocomplétion (piège rencontré avec `BigInt`, sans rapport avec l'exercice).
- **Les noms d'événements Angular sont ceux du DOM, pas une traduction** : `(clic)="resetCalc()"` ne fait rien, car `clic` n'est pas un événement du navigateur — Angular l'interprète comme l'écoute d'un `@Output()` personnalisé inexistant sur un `<button>`. Il faut `(click)`, en anglais. Symptôme trompeur : aucune erreur de compilation, juste un clic qui ne déclenche rien.
- **`{{ }}` se rafraîchit automatiquement** : pas besoin de mécanisme manuel pour "forcer" l'affichage à jour — dès qu'une propriété liée par interpolation change (via une méthode appelée par un event binding, par exemple), Angular re-render tout seul.
- **Un `get`/`set` ne peut être qu'un membre direct de la classe** : en collant un getter à l'intérieur du corps d'une autre méthode (entre ses instructions et son `}` de fermeture), la structure devient invalide et génère une cascade d'erreurs de syntaxe. Toujours vérifier l'équilibre des accolades après un copier-coller dans une classe.
- **Un getter se lit sans parenthèses** : `isResetDisabled`, pas `isResetDisabled()` — ni dans le template, ni depuis une autre méthode TS (`this.isResetDisabled`). Les parenthèses sont réservées aux vraies méthodes.
- **`routerLinkActive` matche par défaut en "subset"** : une route imbriquée dans le chemin d'une autre (`/exo/exo1` contient `/exo`) peut activer les deux liens de navigation simultanément — comportement par défaut d'Angular, pas une erreur.
- **Chemin plat vs `children:`** : un chemin plat (`'exo/exo1'`) n'est qu'un pattern d'URL, indépendant des autres routes. `children:` crée une vraie relation parent-enfant, mais qui exige que le composant parent ait lui-même un `<router-outlet>` — sans ça, l'enfant matche l'URL mais ne s'affiche nulle part. Le choix entre les deux dépend de l'intention : page indépendante vs contenu imbriqué dans un layout partagé.
- **`path` relatif dans `children`** : à l'intérieur d'un tableau `children`, le `path` de chaque route enfant s'écrit relatif au parent (`'exo1'`, pas `'exo/exo1'`) — Angular concatène automatiquement les segments.
- **Un signal se lit avec `()`, s'écrit avec `.set(...)`, jamais avec `=`** : `signal(0)` renvoie un `WritableSignal<number>`, pas un `number` — l'annoter `: number` est un mensonge de type que TypeScript finit par rejeter. Affecter directement (`this.result = 0`) écrase l'objet signal au lieu de changer sa valeur.
- **Les signaux ne remplacent pas systématiquement toutes les propriétés** : une propriété liée en two-way via `[(ngModel)]` doit rester une propriété classique, car ce binding réassigne directement la variable à chaque frappe — incompatible avec l'API `.set()` des signaux. Introduire des signaux se décide propriété par propriété, pas globalement.
- **Le `!` a plusieurs sens différents en TypeScript, à ne pas confondre** (question posée à propos d'un exemple du prof, sens exact non confirmé) :
  - **`!` logique** (`!resetEnable()`) : "l'inverse de", déjà utilisé dans cet exercice.
  - **Non-null assertion** (`maVariable!`) : dit au compilateur "fais-moi confiance, ça ne sera jamais `null`/`undefined` ici" — n'a aucun effet à l'exécution, purement pour faire taire TypeScript.
  - **Definite assignment assertion** (`monChamp!: number;`, sur une propriété de classe) : dit "cette propriété n'a pas de valeur au moment de la construction, mais elle sera remplie avant d'être utilisée" — courant avec `@ViewChild`/`@Input()`, dont la valeur est fournie par Angular après la construction de la classe.
