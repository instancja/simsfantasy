# LIFEVERSE — MVP Specification

**Wersja:** 1.7 — wyłączna kontrola gracza nad Player Character  
**Data:** 17 listopada 2026  
**Status:** Specyfikacja robocza; formularz expanded i stack technologiczny zatwierdzone  
**Dokument nadrzędny:** `LIFEVERSE_MASTER_PLAN.md`

> Dokument przekłada zatwierdzoną koncepcję LIFEVERSE na wymagania pierwszej działającej wersji. Elementy oznaczone jako **OPEN** wymagają decyzji właścicielki. **PROPOZYCJA** oznacza rozwiązanie robocze, a nie zatwierdzony wymóg. Dokument nie ustanawia kanonu świata ani biografii postaci.

---

## 1. Cel MVP

MVP ma udowodnić, że LIFEVERSE potrafi przechowywać postacie, prowadzić wydarzenie z perspektywy jednej grywalnej postaci oraz zachowywać wydarzenia jako wspomnienia. Pozostałe postacie mają istnieć jako autonomiczne osoby, które mogą wchodzić ze sobą w interakcje zgodnie z charakterami, relacjami i posiadaną wiedzą, także poza bezpośrednim udziałem postaci graczki.

Pierwszy pionowy wycinek obejmuje:

1. Uruchomienie lokalnej aplikacji.
2. Wyświetlenie dashboardu i nawigacji.
3. Utworzenie, zapisanie, wyświetlenie i edycję postaci.
4. Utworzenie historii/sceny i wskazanie uczestników.
5. Wprowadzenie przez gracza tury własnej postaci.
6. Otrzymanie odpowiedzi narracyjnej obejmującej otoczenie i NPC — po skonfigurowaniu dostawcy AI.
7. Zapis tur i wznowienie sceny po ponownym uruchomieniu aplikacji.

MVP nie ma jeszcze symulować pełnego, autonomicznego życia całego świata. Najpierw musi niezawodnie zapisywać i odtwarzać podstawową rozgrywkę.

## 2. Zakres

### 2.1 W zakresie MVP

- Lokalna aplikacja desktopowa uruchamiana na komputerze właścicielki.
- Dashboard i nawigacja do podstawowych modułów.
- Baza postaci z formularzem dodawania i edycji.
- Podstawowe profile postaci.
- Lista wydarzeń / wspomnień.
- Widok sceny z kontekstem, historią tur i polem na turę gracza.
- Trwały zapis danych i możliwość wznowienia pracy.
- Jedna stała postać graczki; pozostałe postacie są NPC.
- Podstawowy zapis wydarzenia jako wspomnienia.
- Fundament danych pod autonomiczne interakcje NPC w tle; zakres automatyzacji i częstotliwość symulacji pozostają do zaprojektowania.
- Warstwa integracji AI zaprojektowana jako wymienny adapter.
- Czytelne komunikaty o błędach i stanie integracji AI.

### 2.2 Poza zakresem pierwszego MVP

Poniższe elementy pozostają częścią docelowej wizji, ale nie są warunkiem ukończenia pierwszego pionowego wycinka:

- Pełny feed Social i automatyczna aktywność NPC.
- Likes, reposts, quote posts, following i profile społecznościowe.
- DMs, czaty grupowe i powiadomienia.
- Zaawansowana symulacja autonomicznego życia wszystkich NPC.
- Automatyczne, numeryczne przeliczanie relacji.
- Pełna World Bible z edytorem wszystkich kategorii lore.
- Zaawansowana oś czasu świata i automatyczne przeskoki czasu.
- Generowanie i przechowywanie obrazów.
- Wiele kont użytkowników i funkcje multiplayer.

Wyłączenie z MVP nie oznacza rezygnacji z tych funkcji w docelowym LIFEVERSE.

## 3. Nawigacja i ekrany

### 3.1 Główny układ aplikacji

**Cel:** zapewnić stały dostęp do głównych modułów bez imitowania interfejsu telefonu.

Elementy:
- Stały panel nawigacyjny.
- Obszar głównej treści.
- Nagłówek bieżącego modułu.
- Widoczne stany ładowania, pustej zawartości i błędów.

Pozycje nawigacji:
- Dashboard
- Story
- Characters
- Social — oznaczone jako „w przygotowaniu”, dopóki moduł nie zostanie wdrożony.
- Relationships — „w przygotowaniu”.
- World Bible — „w przygotowaniu”.
- World State / Timeline — „w przygotowaniu”.

Nieaktywne moduły nie mogą wyglądać jak działające funkcje. Powinny informować, że zostaną dodane w kolejnych etapach.

### 3.2 Dashboard

**Cel:** punkt wejścia do aplikacji i szybki dostęp do bieżącej pracy.

Elementy:
- Nazwa LIFEVERSE.
- Skrót do utworzenia nowej postaci.
- Skrót do rozpoczęcia nowej sceny.
- Lista ostatnio otwieranych historii/scen.
- Informacja o stanie integracji AI (skonfigurowana / nieskonfigurowana / błąd).
- Informacja o lokalnym zapisie danych.

Akcje:
- Kliknięcie „Characters” otwiera listę postaci.
- Kliknięcie „New Character” otwiera formularz nowej postaci.
- Kliknięcie „New Story” rozpoczyna proces tworzenia historii/sceny.
- Kliknięcie ostatniej sceny otwiera ją w miejscu ostatniej zapisanej tury.

Stan pusty:
- Jeśli nie ma postaci, dashboard zachęca do utworzenia pierwszej.
- Jeśli nie ma scen, dashboard proponuje rozpoczęcie pierwszej sceny.
- Nie tworzyć przykładowych postaci ani fikcyjnych wpisów bez zgody właścicielki.

### 3.3 Characters — lista postaci

**Cel:** przeglądanie i zarządzanie postaciami.

Elementy:
- Lista lub siatka kart postaci.
- Imię i nazwisko jako podstawowa etykieta.
- Opcjonalny krótki opis, jeśli został wprowadzony.
- Wyszukiwanie po nazwie.
- Przycisk „+ Add Character”.

Akcje:
- „Add Character” otwiera pusty formularz.
- Kliknięcie postaci otwiera jej profil.
- „Edit” otwiera formularz z istniejącymi danymi.
- „Delete” nie może usuwać danych bez potwierdzenia.

Zasada: nie wymagać ręcznej edycji plików ani duplikowania informacji pomiędzy modułami.

### 3.4 Characters — formularz dodawania i edycji

**Cel:** umożliwić zapisanie podstawowych informacji o postaci.

**Zatwierdzony kierunek formularza: rozbudowany, podzielony na sekcje.** Właścicielka wybrała wariant „expanded”. Formularz ma pozwalać na szczegółowe opisanie postaci, ale nie może wymagać wypełnienia wszystkich pól.

Sekcje i pola:

**1. Informacje podstawowe**
- Imię — wymagane.
- Nazwisko — opcjonalne.
- Wiek — opcjonalny; techniczny typ pola (liczba / tekst) do ustalenia podczas projektowania modelu danych.
- Status / rola — opcjonalne, swobodny opis.
- Przynależność / grupa / dom — opcjonalne; nie narzucać wartości ani kategorii, dopóki nie zostaną ustalone w kanonie.

**2. Wygląd — osobna zakładka Appearance w formularzu**
- Pole tekstowe na opis wyglądu: sylwetka, twarz, włosy, oczy, cechy szczególne, postura i styl ubioru.
- Możliwość wgrania jednego zdjęcia avatara z lokalnego komputera.
- Podgląd wybranego zdjęcia przed zapisaniem.
- Obsługiwane formaty: JPG, PNG, WEBP i GIF; limit rozmiaru 5 MB.
- Plik jest przechowywany lokalnie w katalogu aplikacji `public/uploads/avatars`, a ścieżka zapisywana w polu `avatarUrl` rekordu Character.
- Istniejący avatar pozostaje zachowany podczas edycji, jeśli właścicielka nie wybierze nowego.

**3. Osobowość**
- Cechy osobowości i temperament.
- Typowe zachowania i reakcje.
- Sposób traktowania innych.

**4. Psychologia**
- Lęki i obawy.
- Pragnienia i potrzeby.
- Kompleksy / niepewności.
- Wartości i przekonania.
- Słabości i wewnętrzne konflikty.

**5. Historia**
- Przeszłość i pochodzenie.
- Ważne wydarzenia z życia.
- Inne informacje biograficzne.

**6. Motywacje i cele**
- Bieżące cele.
- Ambicje i długoterminowe pragnienia.
- Motywacje stojące za działaniami.

**7. Mocne i słabe strony**
- Atuty, umiejętności i zasoby.
- Ograniczenia i słabości.

**8. Relacje**
- Sekcja informacyjna / skrót powiązań z modułem Relationships.
- Relacje między konkretnymi postaciami powinny być docelowo zarządzane w osobnym module, a nie jako niezależne, niesynchronizowane opisy w profilu.
- Możliwość zapisania ogólnej notatki o relacjach, jeśli nie zastępuje ona właściwych rekordów relacji.

**9. Sekrety**
- Informacje prywatne i tajemnice postaci.
- Sekcja powinna być wizualnie oznaczona jako prywatna.
- Sam fakt zapisania sekretu w profilu nie oznacza, że inne postacie go znają.

**10. Komunikacja**
- Sposób mówienia i charakterystyczne zwroty.
- Styl wypowiedzi / pisania.
- Nawyki komunikacyjne i sposób wyrażania emocji.

**11. Dodatkowe informacje**
- Dowolne notatki, które nie pasują do pozostałych sekcji.

Pola opisowe są opcjonalne poza imieniem. Formularz ma być sekcyjny i czytelny; konkretna prezentacja (np. karty, zakładki lub rozwijane sekcje) pozostaje decyzją UX. Nie tworzyć wymuszonych list wyboru dla cech charakteru ani innych elementów, które powinny być swobodnie opisywane.

Przynależność, dom, grupa, lokalizacja i inne pola zależne od kanonu nie mogą być wymagane, ponieważ ich struktura nie została jeszcze określona.

Akcje:
- „Save” waliduje wymagane pole i zapisuje postać.
- „Cancel” wraca bez zapisu.
- Przy niezapisanych zmianach aplikacja pyta, czy je porzucić.
- Po zapisie profil jest dostępny na liście i może zostać przypisany do wydarzenia.
- Edycja istniejącej postaci zachowuje wszystkie wcześniej zapisane sekcje i treści.

Wybór wariantu formularza „expanded” został zatwierdzony. Szczegółowe typy danych i sposób prezentacji pól wielowartościowych zostaną ustalone w etapie Data Architecture / UX.

### 3.5 Characters — profil postaci

**Cel:** czytelny podgląd danych jednej postaci.

Sekcje:
- Podstawowe informacje.
- Wygląd.
- Osobowość.
- Historia.
- Motywacje i cele.
- Mocne i słabe strony.
- Sekrety i informacje prywatne.

Akcje:
- Edytuj postać.
- Wróć do listy.
- Rozpocznij scenę z udziałem tej postaci (jeśli dostępny jest kreator scen).

Profil nie może prezentować nieuzupełnionych danych jako faktów.

### 3.6 Story — lista wydarzeń i wspomnień

**Cel:** przeglądanie wydarzeń fabularnych. Jedna historia odpowiada jednemu wydarzeniu/scenie; po zakończeniu wydarzenie zostaje zachowane jako wspomnienie. Nie projektujemy na tym etapie wieloscenowej kampanii.

Elementy:
- Lista historii/scen.
- Tytuł roboczy.
- Ostatnia aktywność.
- Uczestnicy, jeśli zostali określeni.
- Stan wydarzenia: w toku lub zakończone, jeśli status zostanie wdrożony.
- Wspomnienia pozostają dostępne jako zapis przeszłych wydarzeń.

Akcje:
- „New Story” / „New Scene” uruchamia kreator.
- Kliknięcie pozycji otwiera zapisany kontekst i historię tur.
- Wznowienie sceny nie może resetować wcześniejszej treści.

Decyzja właścicielki: jedna historia = jedno wydarzenie / jedna scena. Po zakończeniu wydarzenie zostaje zapisane jako wspomnienie. Nie ma potrzeby budowania struktury rozdziałów i wielu scen w ramach jednej historii w MVP.

### 3.7 Story — tworzenie sceny

**Cel:** rozpoczęcie sceny z wybranymi postaciami i podstawowym kontekstem.

Pola:
- Tytuł sceny — roboczy, wymagane.
- Postać graczki — jedna stała postać przypisana do profilu graczki; nie wybiera się innej postaci przy każdym wydarzeniu.
- Pozostali uczestnicy — wybór zero lub więcej postaci NPC.
- Miejsce — opcjonalny tekst; nie wymaga wcześniejszej bazy lokalizacji.
- Czas / moment — opcjonalny tekst.
- Wprowadzenie sytuacji — opcjonalny tekst od gracza.

Akcje:
- „Create Scene” zapisuje scenę i otwiera widok rozgrywki.
- „Cancel” wraca do listy.
- Nie wolno automatycznie dopisywać lokalizacji, historii ani faktów świata.

**Decyzja właścicielki:** graczka odgrywa tylko jedną stałą postać. Nie ma przełączania się na inne postacie ani tworzenia równoległych rozgrywek prowadzonych z perspektywy innych grywalnych postaci. Wszystkie pozostałe postacie są NPC, także wtedy, gdy prowadzą interakcje między sobą poza udziałem postaci graczki.

### 3.8 Story — widok wydarzenia

**Prezentacja treści (UI):**
- Segmenty `NARRATOR` są wyświetlane jako osobne bloki prozy bez avatara. Narrator opisuje wyłącznie otoczenie i atmosferę: miejsce, pogodę, światło, dźwięki tła, przedmioty i zmiany w otoczeniu. Nie opisuje działań ani wypowiedzi postaci.
- Segmenty `NPC` zawierają kompletny wkład danej postaci: jej dialog, działania, gesty, mimikę, ruchy i widoczne reakcje. Całość jest prezentowana razem w jednym dymku z avatarem i imieniem tej postaci.
- Tura `PLAYER` jest prezentowana w jednym dymku z avatarem Player Character. Fragmenty ujęte w pojedyncze gwiazdki (`*...*`) oznaczają działania postaci; tekst poza gwiazdkami oznacza jej dialog. Oba rodzaje treści pozostają razem w dymku; działania są wyświetlane kursywą, a gwiazdki nie są widoczne.
- W jednej turze gracza można mieszać fragmenty akcji i dialogu; kolejność jest zachowana. AI nie dopisuje ani nie powtarza działań czy dialogów Player Character.
- Wszystkie elementy pozostają w chronologicznej osi sceny.


**Cel:** prowadzenie pojedynczego wydarzenia prozą z perspektywy jednej postaci graczki. Wydarzenie po zakończeniu staje się wspomnieniem w historii świata.

Elementy:
- Tytuł sceny.
- Kontekst: miejsce, czas i uczestnicy (tylko jeśli określone).
- Chronologiczna historia tur.
- Wyraźne rozróżnienie tur gracza i odpowiedzi narracyjnej.
- Pole tekstowe na turę gracza z prostą konwencją: `*działanie postaci*` oraz zwykły tekst jako jej dialog. Oba rodzaje treści są wyświetlane razem w jednym dymku postaci; działania kursywą, bez widocznych gwiazdek.
- Przycisk wysłania tury.
- Stan przetwarzania i komunikaty błędów.
- Dostęp do profili uczestników bez utraty bieżącej sceny.

Przepływ tury:
1. Graczka wpisuje deklarację swojej postaci.
2. Aplikacja zapisuje turę gracza.
3. Aplikacja przekazuje do warstwy narracyjnej niezbędny kontekst sceny, uczestników i wcześniejszy przebieg.
4. Skonfigurowany dostawca AI generuje odpowiedź jako narrator i NPC.
5. Odpowiedź zostaje zapisana jako kolejna tura.
6. Widok przewija się do najnowszej treści i pozwala graczce kontynuować.

Zachowanie:
- Nie oferować wymuszonych wyborów A/B/C.
- Nie dopisywać wypowiedzi, działań, decyzji, myśli, uczuć ani intencji postaci gracza poza treścią zadeklarowaną przez gracza.
- Dymki NPC zawierają łącznie wypowiadane słowa i działania danej postaci; narrator opisuje wyłącznie otoczenie i atmosferę.
- Działania Player Character oznaczone przez gracza gwiazdkami są prezentowane razem z jej dialogiem w jej własnym dymku; działania są kursywą, a gwiazdki ukryte. AI nie dopisuje ani nie powtarza działań lub dialogów Player Character. Nie generuje również żadnych nowych myśli, emocji, intencji, decyzji, percepcji ani reakcji tej postaci. NPC mogą zwracać się do niej i zadawać pytania, ale AI musi zakończyć kontynuację przed odpowiedzią lub działaniem Player Character.
- NPC mogą odmówić, skłamać, zignorować lub działać wbrew oczekiwaniom gracza.
- Nie przeskakiwać czasu bez uzasadnienia.
- Nie kończyć sztucznie sceny po jednej krótkiej odpowiedzi.
- Nie ujawniać postaci informacji, których nie mogła poznać.
- Nie przedstawiać sugestii AI jako zatwierdzonego kanonu.

**Ważne:** aplikacja musi zachować turę gracza nawet wtedy, gdy wywołanie AI zakończy się błędem. Powinna umożliwić ponowienie generowania bez duplikowania tury gracza.

### 3.9 Wymagana naprzemienność tur i wielogłosowa odpowiedź AI

Podstawowa pętla rozgrywki:

**Player Character → AI continuation (narrator + one or more relevant NPCs) → Player Character → AI continuation.**

- Każda poprawnie zapisana tura gracza uruchamia generowanie kontynuacji AI, o ile dostawca jest skonfigurowany.
- Jedna odpowiedź AI może zawierać kilka uporządkowanych segmentów: narrację, wypowiedzi i działania kilku NPC.
- NPC mogą wchodzić w dialog i interakcje między sobą; odpowiedź nie może być ograniczona do jednej postaci reagującej bezpośrednio na gracza.
- Możliwe jest opisywanie równoległych reakcji NPC w tej samej chwili sceny, bez sztucznego wykonywania osobnej tury gracza pomiędzy nimi.
- Nie każdy NPC musi reagować na każdą turę. Reakcje mają wynikać z sytuacji, charakteru, motywacji, relacji i posiadanej wiedzy.
- Każdy segment NPC musi być przypisany do właściwego Character, a segment narratora oznaczony osobno.
- Żaden segment AI nie może dopisywać działań, dialogów, myśli, uczuć ani decyzji Player Character.
- Awaria dostawcy nie może usuwać tury gracza; aplikacja musi umożliwić ponowienie generowania bez ponownego zapisywania tej tury.

### 3.10 Autonomiczne interakcje NPC w tle

Docelowe zachowanie świata zakłada, że NPC mogą wchodzić w interakcje również wtedy, gdy postać graczki nie uczestniczy w danej scenie. Ich działania powinny wynikać z osobowości, motywacji, relacji, wcześniejszych wydarzeń i informacji, które rzeczywiście posiadają.

Wymagania projektowe:
- NPC nie są wyłącznie postaciami reagującymi na gracza.
- NPC mogą inicjować i prowadzić interakcje między sobą.
- Wyniki istotnych interakcji mogą stawać się wydarzeniami i wspomnieniami.
- Postacie nie mogą znać informacji, do których nie miały wiarygodnego dostępu.
- Symulacja nie może dowolnie zmieniać charakteru ani relacji postaci.
- Częstotliwość, harmonogram i techniczny sposób symulowania zdarzeń w tle pozostają do zaprojektowania z uwzględnieniem wydajności.

Pełna autonomia NPC w tle nie musi być w całości częścią pierwszego MVP, ale model danych i architektura powinny jej nie blokować.

### 3.11 Social, Relationships, World Bible i World State

W pierwszym MVP moduły mogą być widoczne w nawigacji jako przyszłe obszary, ale ich pełna funkcjonalność nie jest wymagana. Nie należy tworzyć atrap, które zapisują fikcyjne dane lub sugerują działanie niezaimplementowanej symulacji.

---

## 4. Zasady danych i zapisu

### 4.1 Minimalne obiekty

Minimalny model funkcjonalny:
- Character — profil postaci.
- Event — pojedyncze wydarzenie fabularne.
- Memory — zapis zakończonego wydarzenia, które może być przywoływane w przyszłości.
- EventParticipant — powiązanie postaci z wydarzeniem i jej rola.
- EventTurn — pojedyncza tura graczki albo odpowiedź narracyjna.
- NPCInteraction — zapis interakcji NPC poza bezpośrednim udziałem postaci graczki (docelowo; szczegółowy model OPEN).
- AppSettings — ustawienia lokalne, w tym konfiguracja integracji AI bez przechowywania sekretów w zwykłym tekście.

To lista robocza, a nie zatwierdzony schemat bazy danych. Dokładny model relacyjny należy określić w etapie Data Architecture.

### 4.2 Wymagania trwałości

- Każdy rekord ma stabilny identyfikator.
- Dane pozostają dostępne po zamknięciu i ponownym uruchomieniu aplikacji.
- Zapis tury gracza następuje przed wywołaniem AI.
- Błąd generowania nie usuwa wcześniejszej historii.
- Edycja profilu postaci nie może przypadkowo usuwać tur scen.
- Usuwanie postaci powiązanej z wydarzeniem jest blokowane, aby nie naruszyć uczestnictwa i archiwum zapisanej sceny.

### 4.3 Prywatność i wiedza postaci

Już w MVP model danych powinien umożliwiać odróżnienie:
- treści wpisanej przez gracza,
- treści wygenerowanej przez AI,
- informacji prywatnych / sekretów,
- informacji dostępnych uczestnikom sceny.

Nie wolno przekazywać każdej postaci całej bazy świata jako jej wiedzy. Szczegółowy system CharacterKnowledge może zostać wdrożony później, ale architektura nie powinna go blokować.

## 5. Warstwa AI

### 5.1 Status

**IN PROGRESS:** wybrano bezpłatny lokalny runtime Ollama i model Qwen3.5 4B (`qwen3.5:4b`). Właścicielka potwierdziła poprawne działanie modelu w ręcznym teście narracyjnym. Adapter aplikacyjny został dodany, ale wymaga testu lokalnego. ChatGPT Free nie jest automatycznie API dla lokalnej aplikacji.

### 5.2 Wymagania dla adaptera

Warstwa AI powinna:
- być odseparowana od logiki ekranów i bazy danych;
- przyjmować ustrukturyzowany kontekst sceny;
- otrzymywać wyłącznie informacje potrzebne do danej tury;
- zwracać tekst odpowiedzi oraz ewentualne metadane techniczne;
- zgłaszać błędy i timeouty w sposób obsługiwany przez aplikację;
- pozwalać na wymianę dostawcy bez przebudowy całej aplikacji.

Bieżący adapter komunikuje się z Ollama przez `http://127.0.0.1:11434/api/chat` i może zostać zastąpiony bez przebudowy logiki Story. Domyślny model to `qwen3.5:4b`; adres i model można zmienić przez `OLLAMA_BASE_URL` oraz `OLLAMA_MODEL`.

### 5.3 Tryb bez skonfigurowanego AI

Aplikacja powinna uruchamiać się i pozwalać zarządzać postaciami oraz scenami nawet wtedy, gdy AI nie jest skonfigurowane. Wysłanie tury w takim stanie powinno pokazać jasny komunikat, a nie pozorować odpowiedź AI.

Jeśli Ollama jest niedostępna lub generowanie się nie powiedzie, tura gracza pozostaje zapisana, a UI udostępnia ponowienie generowania bez duplikowania tury. Model ma zwracać wyłącznie JSON z uporządkowanymi segmentami narratora i NPC. Serwer odrzuca nieznane identyfikatory postaci i niedozwolone typy mówców; Player Character nigdy nie może być autorem segmentu AI. Typowe znaczniki rozumowania `<think>...</think>` są usuwane, a prompt wymaga wyłącznie danych wyjściowych bez analizy i planowania. Do promptu nie są przekazywane pola sekretów postaci.

## 6. UX i kierunek wizualny

Wymagania:
- Desktop-first.
- Dark Academia, Gothic, Old Money jako kierunek estetyczny.
- Czytelność ważniejsza niż ozdobniki.
- Ciemna, stonowana paleta i wyraźna hierarchia typograficzna.
- Czytelne formularze, przyciski i stany błędów.
- Brak wymogu generowania zdjęć i grafik; opcjonalny, ręcznie wgrywany avatar postaci jest obsługiwany.
- Interfejs nie powinien imitować ekranu smartfona.

Konkretne kolory, fonty, ikony i komponenty UI pozostają decyzją projektową do późniejszego dopracowania; nie są kanonem świata.

## 7. Wymagania jakościowe i ograniczenia sprzętowe

- Docelowe środowisko: laptop MSI Katana 17 B13V, Intel Core i9 (wariant nieustalony), NVIDIA RTX 4070 Laptop GPU, 16 GB RAM.
- Aplikacja powinna działać bez uruchomionego lokalnego modelu AI.
- Nie zakładać jednoczesnego działania wielu modeli ani ciężkich procesów symulacji.
- Długie historie powinny być ładowane w sposób kontrolowany; nie trzeba renderować całego archiwum tur naraz.
- Operacje zapisu nie mogą blokować interfejsu na czas generowania odpowiedzi.
- Błędy integracji AI nie mogą uszkadzać lokalnych danych.

Zatwierdzony stack: Next.js (App Router), React, TypeScript, SQLite i Prisma. Aplikacja jest uruchamiana lokalnie przez npm / Next.js. Sposób spakowania jej jako samodzielnej aplikacji desktopowej pozostaje OPEN.

## 8. Kryteria akceptacji MVP

MVP można uznać za funkcjonalnie gotowe, gdy wszystkie poniższe scenariusze przechodzą testy:

1. Aplikacja uruchamia się lokalnie bez skonfigurowanego AI.
2. Można utworzyć postać z wymaganym imieniem.
3. Utworzona postać pojawia się na liście i ma własny profil.
4. Można edytować profil i po restarcie zobaczyć zmiany.
4a. Można wgrać avatar postaci w obsługiwanym formacie, zobaczyć podgląd i zachować plik po ponownym uruchomieniu aplikacji.
4b. Avatar jest widoczny na karcie postaci i w nagłówku profilu; edycja innych pól nie usuwa istniejącego avatara.
5. Można utworzyć pojedyncze wydarzenie i przypisać do niego stałą postać gracza oraz wybrane NPC.
6. Można otworzyć wydarzenie i zobaczyć jego kontekst oraz uczestników.
7. Można wpisać i zapisać turę gracza; autor tury jest ustalany po stronie serwera na podstawie Player Character.
7a. Można zakończyć wydarzenie i utworzyć powiązane wspomnienie, które zachowuje pełną historię tur.
8. Jeśli Ollama jest skonfigurowana, odpowiedź AI pojawia się jako osobne, uporządkowane tury narratora i/lub NPC; serwer waliduje autorów i nie dopuszcza Player Character.
9. Jeśli AI nie jest skonfigurowane lub zwróci błąd, aplikacja pokazuje komunikat, zachowuje turę gracza i pozwala ponowić próbę.
10. Po restarcie aplikacji historia sceny i wszystkie zapisane tury są dostępne.
11. Żaden element interfejsu nie tworzy niezatwierdzonego lore ani fikcyjnych danych jako faktów.
12. Moduły poza zakresem są jednoznacznie oznaczone jako niedostępne / planowane.

## 9. Kolejność implementacji

### MVP-0 — fundament aplikacji
- Ustalenie stacku i sposobu uruchamiania.
- Utworzenie szkieletu aplikacji i nawigacji.
- Lokalna konfiguracja i obsługa błędów.

### MVP-1 — postacie
- Model Character.
- Lista postaci.
- Formularz dodawania i edycji.
- Profil postaci.
- Trwały zapis.

### MVP-2 — wydarzenia i wspomnienia
- Model Event / EventParticipant / EventTurn.
- Lista wydarzeń i wspomnień.
- Kreator pojedynczego wydarzenia.
- Widok wydarzenia i zapis tur.
- Zakończenie wydarzenia i zachowanie go jako wspomnienia.

### MVP-3 — integracja narracyjna
- Interfejs adaptera AI.
- Obsługa braku konfiguracji, błędów i ponawiania.
- Testy zasady kontroli postaci gracza.
- Testy ciągłości kontekstu.

### MVP-4 — stabilizacja
- Testy pełnego przepływu.
- Obsługa kopii zapasowej / eksportu w zakresie ustalonym dla pierwszego wydania.
- Poprawki UX i wydajności.

Kolejność jest propozycją implementacyjną. Stack jest zatwierdzony: Next.js (App Router), React, TypeScript, SQLite i Prisma. Dostawca AI: lokalny Ollama z modelem Qwen3.5 4B.

## 10. Otwarte decyzje do zatwierdzenia

1. Czy miejsce i czas wydarzenia mają pozostać dowolnymi polami tekstowymi w MVP?
2. Jak szczegółowo i jak często symulować interakcje NPC w tle?
3. [x] Dostawca i model: bezpłatny lokalny Ollama + Qwen3.5 4B; test aplikacyjny pozostaje do wykonania.
5. Czy backup/eksport ma być częścią pierwszego MVP, czy osobnym etapem bezpośrednio po nim?

### 9.1 Zaimplementowany zakres Story (fundament i integracja AI w trakcie testów)

- Jedno wydarzenie odpowiada jednej scenie; nie ma struktury rozdziałów ani kampanii wieloscenowej.
- Player Character jest dołączany do wydarzenia automatycznie. Właścicielka może wybrać NPC obecnych w scenie.
- Gracz zapisuje własne tury. Autor tury jest ustalany po stronie serwera na podstawie Player Character.
- Zakończenie wydarzenia tworzy rekord Memory, powiązany z wydarzeniem i jego pełną historią tur.
- Opcjonalna notatka Memory jest wpisywana ręcznie; aplikacja nie generuje podsumowania ani nie udaje odpowiedzi AI.
- Adapter Ollama generuje kontynuację po turze gracza, zapisuje osobne segmenty narratora/NPC i obsługuje błąd oraz ponowienie; funkcjonalność nie jest jeszcze potwierdzona testem właścicielki.

## 11. Historia zmian

| Wersja | Data | Zmiana | Status |
|---|---|---|---|
| 0.1 | 2026-11-17 | Pierwszy draft zakresu MVP, ekranów, przepływów i kryteriów akceptacji na podstawie Master Planu. | Draft |
| 0.2 | 2026-11-17 | Doprecyzowano: jedna historia to jedno wydarzenie/scena zapisywane jako wspomnienie; graczka odgrywa jedną postać, a NPC mogą autonomicznie wchodzić w interakcje w tle. | Draft |
| 0.3 | 2026-11-17 | Zatwierdzono wariant formularza postaci „expanded”; dodano sekcje podstawowe, wygląd, osobowość, psychologia, historia, motywacje, mocne/słabe strony, relacje, sekrety, komunikacja i notatki. | Kierunek formularza zatwierdzony; typy danych i UX do dopracowania |
| 0.4 | 2026-11-17 | Ujednolicono model wydarzeń i wspomnień oraz zasadę jednej stałej postaci graczki; usunięto sprzeczne założenia o wyborze grywalnej postaci dla każdej sceny. | Zgodne z decyzjami właścicielki |
| 0.5 | 2026-11-17 | Uporządkowano opis stałej postaci grywalnej i modelu pojedynczego wydarzenia; audyt potwierdził, że repozytorium nie zawiera jeszcze implementacji. | Zgodność specyfikacji z zatwierdzonym modelem rozgrywki |\n| 0.6 | 2026-11-17 | Zaktualizowano specyfikację po wdrożeniu modułu Characters i zatwierdzeniu Next.js/React/SQLite/Prisma; język UI określono jako angielski. | Dokumentacja zgodna z aktualnym stanem repozytorium |
| 0.7 | 2026-11-17 | Dodano osobną zakładkę Appearance, opis wyglądu i lokalny upload avatara z podglądem; avatar jest widoczny na karcie i profilu postaci. | Nowy wymóg właścicielki |
| 0.8 | 2026-11-17 | Dodano fundament Story: wydarzenia, uczestników, tury gracza i finalizację wydarzenia jako wspomnienia. | Kontynuacja implementacji MVP |
| 0.9 | 2026-11-17 | Zablokowano usuwanie postaci powiązanych z zapisanymi wydarzeniami, aby chronić integralność archiwum. | Ochrona danych historycznych |


| 1.0 | 2026-11-17 | Wybrano bezpłatny lokalny runtime Ollama i Qwen3.5 4B jako model testowy. | Decyzja właścicielki |
| 1.1 | 2026-11-17 | Właścicielka potwierdziła, że model generuje satysfakcjonującą narrację w teście ręcznym. | Test modelu zakończony pozytywnie |
| 1.2 | 2026-11-17 | Dodano adapter Ollama, zapis segmentów narratora/NPC, walidację autorów, obsługę błędu i ponowienia. | Integracja oczekuje na test aplikacyjny |
| 1.3 | 2026-11-17 | Zmieniono prezentację historii sceny: narrator jako osobne bloki prozy, dialogi postaci jako dymki z avatarami i subtelnym wyróżnieniem Player Character. | Zmiana UI na podstawie testu i feedbacku właścicielki |
| 1.4 | 2026-11-17 | Naprawiono wyświetlanie avatarów w dialogach: stały rozmiar koła, przycinanie obrazu i mniejszy rozmiar na urządzeniach mobilnych. | Poprawka po teście właścicielki |
| 1.5 | 2026-11-17 | Rozdzielono dialog i akcję: NPC mówią wyłącznie w dymkach, narrator opisuje ich zachowania; `*...*` w turze gracza oznacza akcję, tekst poza gwiazdkami — dialog. | Wersja pośrednia, zastąpiona przez 1.6 |
| 1.6 | 2026-11-17 | Połączono działania i dialogi w dymkach postaci. NPC mają w swoich dymkach dialog i opis własnych działań; narrator opisuje wyłącznie otoczenie. Akcje gracza oznaczone `*...*` są kursywą w jej dymku. | Korekta właścicielki po teście |\n| 1.7 | 2026-11-17 | Wzmocniono granicę kontroli postaci: AI generuje wyłącznie środowisko i NPC, nie tworzy wypowiedzi, działań, myśli ani reakcji Player Character. Ostatnia tura gracza jest przekazywana oddzielnie jako niezmienny wkład; profil gracza nie jest przekazywany w zestawie profili NPC. | Problem zgłoszony podczas testu |

---

**Zasada zatwierdzania:** ta specyfikacja jest projektem roboczym. Propozycje nie stają się wymaganiami, dopóki właścicielka ich wyraźnie nie zaakceptuje.
