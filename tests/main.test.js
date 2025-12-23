const fs = require('fs');
const path = require('path');

describe('Main Script Tests', () => {
    beforeEach(() => {
        // 1. Préparer le DOM nécessaire au script
        document.body.innerHTML = `
            <div id="wrapper">
                <header id="header">
                    <a href="http://external-link.com">Lien Externe</a>
                </header>
                <div id="main">
                    <div class="thumb">
                        <a href="fulls/01.jpg" class="image">
                            <img src="thumbs/01.jpg" data-position="top" />
                        </a>
                    </div>
                </div>
                <footer id="footer">
                    <div class="copyright">© Test</div>
                </footer>
            </div>
            <div id="panel-test" class="panel"></div>
        `;

        // 2. Charger le contenu du script manuellement
        const scriptPath = path.resolve(__dirname, '../assets/js/main.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');

        // 3. Exécuter le script dans l'environnement global du test
        // Cela va attacher tous les événements jQuery au DOM ci-dessus
        eval(scriptContent);
    });

    test('doit supprimer la classe is-preload après le chargement', (done) => {
        document.body.className = 'is-preload';
        
        // Simuler l'événement 'load' sur la fenêtre
        $(window).trigger('load');

        // On attend 150ms car le script a un timeout de 100ms
        setTimeout(() => {
            expect(document.body.classList.contains('is-preload')).toBe(false);
            done();
        }, 150);
    });

    test('doit neutraliser les liens externes du header', () => {
        const link = document.querySelector('#header a');
        // Le script exécute .removeAttr('href')
        expect(link.getAttribute('href')).toBeNull();
    });

    test('doit transformer les images en background-image pour les vignettes', () => {
        const thumbImage = document.querySelector('.thumb .image');
        // Vérifie que le style inline a été ajouté par le script
        expect(thumbImage.style.backgroundImage).toContain('url(thumbs/01.jpg)');
        expect(thumbImage.style.backgroundPosition).toBe('top');
    });

    test('doit initialiser Poptrox sur le conteneur main', () => {
        // Vérifie si le plugin poptrox a été appelé (grâce au mock dans jest.setup.js)
        expect($.fn.poptrox).toHaveBeenCalled();
    });
});