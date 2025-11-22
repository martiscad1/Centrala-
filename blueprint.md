# Blueprint-ul Proiectului

## Prezentare Generală

Acest document descrie arhitectura și planul de dezvoltare pentru o aplicație web modernă, construită cu React și Firebase. Aplicația oferă o experiență de autentificare sigură și o interfață modernă, adaptabilă.

## Caracteristici Implementate

*   **Autentificare cu Firebase:**
    *   Integrare completă cu Firebase Authentication.
    *   Pagina de autentificare (`/login`) cu funcționalitate de login securizată.
*   **Navigare și Rutare:**
    *   Utilizează `react-router-dom` pentru a gestiona navigarea.
    *   O rută privată (`/`) accesibilă doar utilizatorilor autentificați.
    *   Pagină principală (`/`) cu mesaj de bun venit și delogare.
*   **Design Modern și Atractiv:**
    *   **Temă Duală (Dark/Light Mode):** Comutator de temă disponibil pe toate paginile principale.
    *   **Buton de Autentificare Premium:** Butonul "Intră în cont" are un design deosebit, cu un fundal întunecat, o iconiță `Sparkles` și un chenar cu gradient animat (albastru, turcoaz, roz) care creează un efect vizual dinamic și modern. Iconița are, de asemenea, o animație subtilă la survolare.
    *   **Fundal Dinamic "Aurora":** Un fundal animat, subtil, cu pete de culoare care se mișcă lent, adaugă profunzime și un aspect vizual plăcut.
    *   **Corecturi de text:** Am ajustat textul pentru a folosi diacriticele corecte (ex: "Centrală").
*   **Design Responsiv:**
    *   Interfața este optimizată pentru dispozitive mobile și desktop.
*   **Structura Proiectului:**
    *   Hook-uri personalizate (`useDarkMode`) pentru o logică curată.
    *   Stilizare modulară cu fișiere CSS dedicate.

## Planul Curent: Corectură Text în Header

**Solicitare:** Corectarea titlului din header pentru a folosi diacritice: "Centrala" -> "Centrală".

**Acțiuni Finalizate:**
1.  **Modificat `src/components/Header/Header.jsx`:**
    *   Am înlocuit `<h1>Centrala</h1>` cu `<h1>Centrală</h1>` pentru a afișa corect numele aplicației.
2.  **Actualizat `blueprint.md`:** Am documentat această corectură.

**Status:** Complet. Titlul din header este acum afișat corect. Aștept instrucțiunile următoare.
