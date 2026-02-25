import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    
    await page.goto('http://localhost:5173/');
    
    // We need to navigate to the Audio Effects Quiz
    // Looking for a button or link to Topic 35 or Interactive Quizzes
    // Let's just wait for 2 seconds to see initial errors
    await new Promise(r => setTimeout(r, 2000));
    
    // Evaluate to find the quiz button
    const links = await page.$$eval('a, button, div', els => els.map(e => ({text: e.innerText, textContent: e.textContent, className: e.className})).filter(e => e.textContent && e.textContent.includes('Audio Effects')));
    console.log("Found links:", links.slice(0, 5));
    
    await browser.close();
})();
