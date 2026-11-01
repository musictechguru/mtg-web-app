import { supabase } from '../config/supabase';

// First-party funnel events, stored in the app_events table
// (supabase/migrations/20261031120000_app_events.sql).
// No cookies or browser storage: the visit id only lives in memory for this page load.
const visitId = (() => {
    try {
        return crypto.randomUUID();
    } catch {
        return null;
    }
})();

// Local dev and the owner's dev_mode flag log to the console instead,
// so testing never adds rows to the live table.
const isDevSession = () => {
    if (import.meta.env.DEV) return true;
    try {
        return localStorage.getItem('dev_mode') === 'true';
    } catch {
        return false;
    }
};

export const track = (event, { item = null, ...props } = {}) => {
    const row = {
        event,
        visit_id: visitId,
        item: item ? String(item).slice(0, 120) : null,
        props
    };

    if (isDevSession()) {
        console.info('[analytics]', event, row.item || '', props);
        return;
    }

    supabase
        .from('app_events')
        .insert(row)
        .then(({ error }) => {
            if (error) console.warn('Analytics event not recorded:', error.message);
        });
};
