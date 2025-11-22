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
    *   **Meniu Utilizator Derulant:** Butonul de delogare a fost înlocuit cu o iconiță de utilizator care, la click, deschide un meniu elegant cu opțiunile "Schimbă parola" și "Delogare".
    *   **Buton de Autentificare Premium:** Butonul "Intră în cont" are un design deosebit, cu un fundal întunecat, o iconiță `Sparkles` și un chenar cu gradient animat.
    *   **Fundal Dinamic "Aurora":** Un fundal animat, subtil, care adaugă profunzime și un aspect vizual plăcut.
    *   **Corecturi de text:** Am ajustat textul pentru a folosi diacriticele corecte (ex: "Centrală").
*   **Design Responsiv:**
    *   Interfața este optimizată pentru dispozitive mobile și desktop.
*   **Structura Proiectului:**
    *   Hook-uri personalizate (`useDarkMode`, `useAuth`) pentru o logică curată.
    *   Stilizare modulară cu fișiere CSS dedicate.

## Planul Curent: Implementarea Paginii de Schimbare a Parolei

**Solicitare:** Crearea unei pagini noi unde utilizatorii își pot schimba parola. Pagina trebuie să conțină câmpuri pentru parola veche, parola nouă și confirmarea parolei noi.

**Plan de Acțiune:**
1.  **Creează Pagina Nouă:** Adaugă un nou fișier `src/pages/ChangePassword.jsx` pentru formularul de schimbare a parolei.
2.  **Stilizează Pagina:** Creează `src/pages/ChangePassword.css` pentru a alinia designul cu restul aplicației.
3.  **Adaugă Rută Nouă:** Definește o nouă rută protejată `/change-password` în `src/App.jsx`.
4.  **Actualizează Meniul:** Fă ca opțiunea "Schimbă parola" din `Header.jsx` să navigheze către noua pagină.
5.  **Implementează Logica Firebase:** Adaugă logica pentru re-autentificare și actualizarea parolei în `ChangePassword.jsx`.
6.  **Oferă Feedback Vizual:** Folosește `react-toastify` pentru a afișa mesaje de succes sau de eroare.
