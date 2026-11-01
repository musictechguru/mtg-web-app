// Paid plans shown on the landing page and the upgrade page.
// priceId values are the live Stripe prices used by create-checkout-session.
export const PLANS = [
    { key: 'student', name: 'Student Plan', priceId: 'price_1UCgIwLxDAAultYKqyui6Qvv', price: '£12.99', seats: 1, checkoutType: 'standard' },
    { key: 'class5', name: '5 Student Pack', priceId: 'price_1UD0U9LxDAAultYK3m7LkYHI', price: '£50', seats: 5, checkoutType: 'classroom' },
    { key: 'class10', name: '10 Student Pack', priceId: 'price_1UD0UYLxDAAultYKzuhuzFdx', price: '£100', seats: 10, checkoutType: 'classroom' }
];

export const findPlan = (key) => PLANS.find(plan => plan.key === key) || null;

// Checkout needs an account. When a visitor picks a plan before signing up, we
// remember it for this tab so the app can reopen the plans page once they're in.
const UPGRADE_INTENT_KEY = 'mtg_resume_upgrade';

export const rememberUpgradeIntent = () => {
    try {
        sessionStorage.setItem(UPGRADE_INTENT_KEY, '1');
    } catch {
        // Storage blocked: they'll just land on the dashboard after signing up
    }
};

export const takeUpgradeIntent = () => {
    try {
        const pending = sessionStorage.getItem(UPGRADE_INTENT_KEY) === '1';
        sessionStorage.removeItem(UPGRADE_INTENT_KEY);
        return pending;
    } catch {
        return false;
    }
};
