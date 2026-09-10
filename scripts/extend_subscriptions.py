import stripe
import os
import time

# Set your Stripe Secret Key here or as an environment variable
# stripe.api_key = "sk_live_..." 
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# August 31, 2026, 23:59:59 UTC
AUGUST_2026_EXPIRY = 1788220799

def extend_all_subscriptions():
    if not stripe.api_key:
        print("Error: STRIPE_SECRET_KEY environment variable not set.")
        return

    print("Fetching active subscriptions...")
    
    try:
        # Get all active and trialing subscriptions
        subscriptions = stripe.Subscription.list(status="all", limit=100)
        
        count = 0
        for sub in subscriptions.auto_paging_iter():
            # Only process active or trialing ones
            if sub.status in ["active", "trialing"]:
                print(f"Extending subscription {sub.id} (Customer: {sub.customer})...")
                
                try:
                    stripe.Subscription.modify(
                        sub.id,
                        trial_end=AUGUST_2026_EXPIRY,
                        cancel_at_period_end=True,
                        description="Extended access until August 2026 (Auto-renew disabled)"
                    )
                    print(f"  Successfully extended billing/trial to August 2026.")
                    count += 1
                except Exception as e:
                    print(f"  Failed to update {sub.id}: {str(e)}")
            
            # Small sleep to avoid rate limits
            time.sleep(0.1)

        print(f"\nDone! Extended {count} subscriptions.")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    extend_all_subscriptions()
