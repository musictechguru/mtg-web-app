-- Add Stripe columns to tracking subscriptions
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_subscription_id text;

-- Run this to give all your current testing users premium access for free
UPDATE profiles SET is_premium = true;
