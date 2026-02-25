import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 2000));

        // Find and click Interactive Quizzes
        const buttons = await page.$$('div, button, a');
        for (const btn of buttons) {
            const text = await page.evaluate(el => el.textContent, btn);
            if (text && text.includes('Interactive Quizzes')) {
                await btn.click();
                break;
            }
        }
        await new Promise(r => setTimeout(r, 1000));

        // Find Effects chain quiz
        const quizzes = await page.$$('button, div');
        for (const q of quizzes) {
            const text = await page.evaluate(el => el.textContent, q);
            if (text && text.includes('Effects Chain Quiz')) {
                await q.click();
                break;
            }
        }
        await new Promise(r => setTimeout(r, 1000));

        // Click Test AUDIO
        const testAudio = await page.$$('button');
        for (const btn of testAudio) {
            const text = await page.evaluate(el => el.textContent, btn);
            if (text && text.includes('Test AUDIO')) {
                console.log("Clicking Test Audio...");
                await btn.click();
                break;
            }
        }

        await new Promise(r => setTimeout(r, 2000));
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
