> ⭐ **\*README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!\***
>
> 🎁 _Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**._

&nbsp;

# JavaScript: Testowanie

Twoim zadaniem jest stworzenie czegoś w rodzaju Klienta czy [SDK](https://pl.wikipedia.org/wiki/Software_development_kit) – narzędzia, które ułatwi korzystanie z [GitHub API](https://docs.github.com/en/rest).

Chodzi o to, aby nie musieć od nowa tworzyć w każdym projekcie rozbudowanych instrukcji typu:

```javascript
const secret = "secret-token";
const url = `https://api.github.com/repos/devmentor-pl/task-js-basics/collaborators/bogolubow`;
const promise = fetch(url, {
  method: "PUT",
  credentials: "same-origin",
  redirect: "follow",
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${secret}`,
  },
  body: JSON.stringify({
    permission: "pull",
  }),
});
```

Aby ułatwić sobie korzystanie z GitHub API, zbuduj klasę. Może się ona nazywać np. `GitHubSDK`.
Jeśli odpowiednio zaimplementujesz metodę o nazwie `.sendInvitation()`, to wystarczy wtedy wywołać:

```javascript
const gh = new GitHubSDK("devmentor-pl", "secret-token");
gh.sendInvitation("task-js-basics", "bogolubow");
```

> **Uwaga:** jeżeli wyślesz zaproszenie do użytkownika, który już został zaproszony do repo, to otrzymasz odpowiedź o statusie 204 bez zawartości. W takim przypadku próba zamienienia „niczego” na JSON będzie wywoływać błąd.

Wewnątrz tej metody mieści się oczywiście kod, który wstawiłem na samym początku, jednak będziesz go mógł wygodnie wykorzystać w wielu innych projektach. To pozwoli Ci zaoszczędzić sporo czasu i optymalizować tworzenie nowych rozwiązań.

> Zwróć uwagę, że w moim `fetch()` jest kilka dodatkowych opcji. Nie jest to związane z samym GitHub API. To opcje dostępne dla `fetch()`. Więcej o nich możesz przeczytać na [javascript.info](https://javascript.info/fetch-api).

GitHub API posiada bardzo duże możliwości zarządzania kontem. To, co robisz przy pomocy interfejsu, możesz również zrobić przy pomocy API, np. pobrać informacje o:

- [użytkowniku](https://docs.github.com/en/rest/reference/users#get-a-user)
- [repozytoriach](https://docs.github.com/en/rest/reference/repos#list-public-repositories)
- [commitach w repozytorium](https://docs.github.com/en/rest/reference/repos#list-commits)
- [komentarzach do commitów](https://docs.github.com/en/rest/reference/repos#list-commit-comments)
- [błędach w repozytorium](https://docs.github.com/en/rest/reference/issues#list-repository-issues)
- [aktywności](https://docs.github.com/en/rest/reference/activity#list-repository-events).

> Zauważ, że przykłady w dokumentacji są oparte na `curl`. To dość powszechne i uniwersalne rozwiązanie, dlatego powinieneś umieć przełożyć je na JavaScript. Pomoże Ci w tym [ta dokumentacja](https://idratherbewriting.com/learnapidoc/docapis_understand_curl.html).

Możesz również zarządzać swoim kontem jeśli [uwierzytelnisz](https://docs.github.com/en/rest/guides/basics-of-authentication) swoje zapytanie. Najprościej jest to zrobić przez [wygenerowanie odpowiedniego tokenu](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). Wówczas jego zawartość przesyłamy w nagłówku – tak jak w przykładzie na samym początku.

Jak widzisz, GitHub API daje mnóstwo możliwości. Dla swojego SDK wybierz te, które ułatwią Ci stworzenie własnego portfolio. Niech portfolio to samo się aktualizuje, czerpiąc dane o projektach z Twojego konta na GitHubie.

Stwórz SDK zgodnie z metodyką TDD, czyli red-green-refactor. Najpierw piszesz testy, które musisz sam skonfigurować. Potem dopiero zabierz się za implementację. Niech Twoje testy określają funkcjonalności Twojego narzędzia.

Pamiętaj, że najprościej jest napisać rozwiązanie pod konkretny przypadek, a dopiero potem kombinować z parametrami funkcji. Zgodnie z krokami:

- RED: napisanie testu
- GREEN: implementacja konkretnego przypadku
- REFACTOR: uogólnienie rozwiązania

> **Uwaga!** Ponownie rozmyślnie łamiemy zasadę [FIRST](https://devszczepaniak.pl/testy-jednostkowe-first/). Tym razem w punkcie _Isolated_, a nawet _Fast_. Będziemy wykonywać testy na żywym organizmie – np. przedstawiona na początku metoda do wysyłania zaproszenia będzie faktycznie wysyłać zaproszenie, czyli nasze testy będą komunikować się z API. Normalnie ten problem jest rozwiązywany przez [mocki](https://devenv.pl/jest-sposoby-mockowania/), które będziemy omawiać później.
>
> **Uwaga!** GitHub API umożliwia [60 odpytań na godzinę](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting). Każde odświeżenie projektu (w tym uruchomienie testu z aktywnym URL) będzie liczone jako odpytanie, dlatego łatwo jest przekroczyć ten limit. Aby tego uniknąć, masz dwie możliwości:
>
> - zakomentować kod odpowiedzialny za zapytania i uruchamiać go tylko na potrzeby sprawdzenia działania aplikacji (np. uruchomienia testów)
> - [autoryzować swoje zapytania](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#authentication), co zwiększy ich limit do 1000 na godzinę.

**Zadaniem dodatkowym** (na teraz lub potem) będzie stworzenie przynajmniej szkieletu „samoaktualizującego się” portfolio, które na pewno zostanie docenione przez Twojego potencjalnego pracodawcę.

## Konfiguracja

Aby móc testować zapytania do API przy użyciu `fetch()` musisz mieć zainstalowany np. `node-fetch` ([StackOverflow](https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined)):

```
npm i node-fetch@2
```

> Uwaga! Instalujemy wersję 2 ponieważ wersja 3 generuje błąd: "Cannot find module node:http"

Pamiętaj, aby zaimportować oraz przypisać do odpowiedniego elementu tj.:

```
import nodeFetch from "node-fetch"; // pobieram paczkę
global.fetch = nodeFetch; // przypisuję do fetch pobraną paczkę, w Node.js global === window
```

PS Nie zapomnij [skonfigurować wsparcia dla ES6](https://jestjs.io/docs/getting-started#using-babel).

Może się okazać, że po odpaleniu testów w terminalu zobaczysz błąd:

```
import http from 'http';
^^^^^^

SyntaxError: Cannot use import statement outside a module
import nodeFetch from "node-fetch";
```

To dlatego, że domyślnie `babel-jest` nie transpiluje plików wewnątrz katalogu `node_modules`. My chcemy to zmienić, dlatego w pliku `package.json` dodajemy klucz `jest` z odpowiednią pozycją:

```
  "scripts": {
    "test": "jest",
    "test-watch": "jest --watchAll",
    "start": "webpack serve --mode development --open",
    "build": "webpack --mode production"
  },
  "jest": {
    "transformIgnorePatterns": []
  },
```

Teraz już wszystko powinno działać, jak należy.

## Pull request i code review

1. Pamiętaj, aby nie pushować swojego _secret token_ na repozytorium na GitHubie. Możesz umieścić go np. w osobnym pliku, który dodasz do `.gitignore`.
2. Abym mógł przetestować Twoje rozwiązanie, po wykonaniu pull requesta **prześlij mi swój token na Slacku** (a najlepiej **cały plik**, w którym go umieściłeś). Nie chcę używać tokena do własnego konta i ryzykować, że przypadkowo coś zostanie na nim zmienione :)
3. Po otrzymaniu ode mnie code review usuń z GitHuba swój _secret token_, aby mieć pewność, że nie mam już dostępu.

&nbsp;

> ⭐ **\*README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!\***
>
> 🎁 _Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**._
